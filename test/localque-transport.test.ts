/* Copyright © 2022-2026 Seneca Project Contributors, MIT License. */

import Seneca from 'seneca'

import LocalqueTransportDoc from '../src/LocalqueTransportDoc'
import LocalqueTransport from '../src/LocalqueTransport'


// Run the transport tests on the core transport/utils export, and with
// @seneca/transport loaded first, which replaces that export.
const setups: [string, (seneca: any) => any][] = [
  ['core transport/utils', (seneca: any) => seneca],
  ['@seneca/transport loaded first',
    (seneca: any) => seneca.use('@seneca/transport')],
]


describe('localque-transport', () => {
  test('happy', async () => {
    expect(LocalqueTransportDoc).toBeDefined()
    const seneca = Seneca({ legacy: false })
      .test()
      .use('@seneca/entity')
      .use(LocalqueTransport)
    await seneca.ready()
    expect(seneca.find_plugin('LocalqueTransport')).toBeDefined()
    await seneca.close()
  })


  test('needs the core transport/utils helpers', async () => {
    const errs: any[] = []
    const seneca = Seneca({ legacy: false, debug: { undead: true } })
      .test((err: any) => errs.push(err), 'silent')

    // Stands in for seneca-transport 8, whose transport/utils export lacks
    // internalize_msg and externalize_msg.
    seneca.use(function transport() {
      return { exportmap: { utils: {} } }
    })
    seneca.use(LocalqueTransport)
    await new Promise((resolve) => seneca.ready(() => resolve(null)))

    expect(errs[0]?.code).toEqual('plugin_define_failed')
    expect(errs[0]?.message).toMatch(/@seneca\/transport 9/)
    await seneca.close()
  })


  test.each(setups)('basic (%s)', async (_label, first) => {
    const log: string[] = []

    const seneca = await first(Seneca({ legacy: false }).test())
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

    await seneca.close()
  })


  test.each(setups)('entity (%s)', async (_label, first) => {
    const log: string[] = []

    const seneca = await first(Seneca({ legacy: false }).test())
      .use('@seneca/entity')
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

    await seneca.close()
  })

})
