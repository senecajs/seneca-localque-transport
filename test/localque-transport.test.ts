/* Copyright © 2022-2024 Seneca Project Contributors, MIT License. */

import Seneca from 'seneca'
// import SenecaMsgTest from 'seneca-msg-test'
// import { Maintain } from '@seneca/maintain'

import LocalqueTransportDoc from '../src/LocalqueTransportDoc'
import LocalqueTransport from '../src/LocalqueTransport'



describe('localque-transport', () => {
  test('happy', async () => {
    expect(LocalqueTransportDoc).toBeDefined()
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use(LocalqueTransport)
    await seneca.ready()
  })


  test('basic', async () => {
    const log = []

    const seneca = await Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use(LocalqueTransport)
      .message('a:1', async function a1(this: any, msg: any) {
        log.push('a1x=' + msg.x)
        this.post({ b: 1, x: 0.5 + msg.x })
      })
      .message('b:1', async function b1(this: any, msg: any) {
        log.push('b1x=' + msg.x)
      })

      .listen({ type: 'localque', pin: 'a:1' })
      .client({ type: 'localque', pin: 'a:1' })

      .listen({ type: 'localque', pin: 'b:1' })
      .client({ type: 'localque', pin: 'b:1' })

      .ready()

    let o1 = await seneca.post('a:1,x:1')
    expect(null).toEqual(o1)

    let o2 = await seneca.post('a:1,x:2')
    expect(null).toEqual(o2)

    await seneca.ready()

    // console.log(log)
    expect(log).toMatchObject([
      "a1x=1",
      "a1x=2",
      "b1x=1.5",
      "b1x=2.5",
    ])
  })


  test('entity', async () => {
    const log = []

    const seneca = await Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use('entity')
      .use(LocalqueTransport)
      .message('a:1', async function a1(this: any, msg: any) {
        log.push('a1x=' + msg.x + ';f=' + msg.f.data$().y)
        this.post({ b: 1, x: 0.5 + msg.x, f: msg.f })
      })
      .message('b:1', async function b1(this: any, msg: any) {
        log.push('b1x=' + msg.x + ';f=' + msg.f.data$().y)
      })

      .listen({ type: 'localque', pin: 'a:1' })
      .client({ type: 'localque', pin: 'a:1' })

      .listen({ type: 'localque', pin: 'b:1' })
      .client({ type: 'localque', pin: 'b:1' })

      .ready()

    let o1 = await seneca.post('a:1,x:1', { f: seneca.entity('foo', { y: 11 }) })
    expect(null).toEqual(o1)

    let o2 = await seneca.post('a:1,x:2', { f: seneca.entity('foo', { y: 22 }) })
    expect(null).toEqual(o2)

    await seneca.ready()

    // console.log(log)
    expect(log).toMatchObject([
      "a1x=1;f=11",
      "a1x=2;f=22",
      "b1x=1.5;f=11",
      "b1x=2.5;f=22",
    ])
  })

})
