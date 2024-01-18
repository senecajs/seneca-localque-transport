
const Seneca = require('seneca')

run()

async function run() {
  const log = []
  
  const seneca = await Seneca({legacy:false,timeout:1111})
        .test('print')
        .use('promisify')
        .use('..', {debug:true,log})
        .message('a:1', async function a1(msg) {
          log.push('a1x='+msg.x)
          this.post({b:1,x:0.5+msg.x})
        })
        .message('b:1', async function b1(msg) {
          log.push('b1x='+msg.x)
        })

        .listen({type:'localque',pin:'a:1'})
        .client({type:'localque',pin:'a:1'})

        .listen({type:'localque',pin:'b:1'})
        .client({type:'localque',pin:'b:1'})

        .ready()

  // console.log(seneca.find('a:1'))
  // console.log(seneca.find('b:1'))
  // let b1 = await seneca.post('a:1,b:1,p:1')
  // console.log('b1',b1)
  
  let o1 = await seneca.post('a:1,x:1')
  // let o2 = await seneca.post('a:1,x:2')

  await seneca.ready()
  
  console.log(log)
  // console.log(o1)
  // console.log(o2)
}
