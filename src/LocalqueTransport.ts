/* Copyright © 2024 Seneca Project Contributors, MIT License. */


import Async from 'async'


type Options = {
  debug: boolean
  log: any[]
}

export type LocalqueTransportOptions = Partial<Options>

// Default options.
const defaults: Options = {
  debug: false,
  log: [],
}


function LocalqueTransport(this: any, options: Options) {
  const seneca: any = this

  const queMap: any = {}
  const log = options.debug && (options.log || [])

  const tu = seneca.export('transport/utils')

  seneca.add('role:transport,hook:listen,type:localque', hook_listen_localque)
  seneca.add('role:transport,hook:client,type:localque', hook_client_localque)


  function hook_listen_localque(this: any, config: any, ready: Function) {
    const seneca = this.root.delegate()

    const pg = seneca.util.pincanon(config.pin || config.pins)

    function handle_msg(data: string, done: Function) {
      const msgdata = JSON.parse(data)
      const listenMeta = msgdata.meta$
      const msg = tu.internalize_msg(seneca, msgdata)
      log && log.push({ hook: 'listen', entry: 'handle', msg })

      // Convert que msg into a new local msg - avoid que loop
      let localmsg = seneca.util.clean(msg)
      localmsg.local$ = true

      seneca.act(localmsg, function(err: Error | null | undefined, out: any, _meta: any) {
        // use the listen meta so that seneca.reply will the correct msg id
        const reply = JSON.stringify(tu.externalize_reply(seneca, err, out, listenMeta))

        log && log.push({ hook: 'listen', entry: 'que', reply })
        queMap[pg + '~OUT'].push(reply)
      })

      return done()
    }

    queMap[pg + '~IN'] = Async.queue(handle_msg)
    return ready(config)
  }


  function hook_client_localque(this: any, config: any, ready: Function) {
    const seneca = this.root.delegate()

    const pg = seneca.util.pincanon(config.pin || config.pins)

    function send_msg(msg: any, _reply_not_used_here: any, meta: any) {
      queMap[pg + '~OUT'] = Async.queue(handle_reply)

      const msgstr = JSON.stringify(tu.externalize_msg(seneca, msg, meta))
      log && log.push({ hook: 'client', entry: 'send', msg: msgstr })

      queMap[pg + '~IN'].push(msgstr)
    }

    function handle_reply(data: any, done: Function) {
      const reply = tu.internalize_reply(seneca, JSON.parse(data))
      log && log.push({ hook: 'client', entry: 'reply', reply })

      seneca.reply(reply)
      return done()
    }

    return ready({
      config: config,
      send: send_msg
    })
  }


  return {
    exports: {
    }
  }
}




Object.assign(LocalqueTransport, { defaults })

export default LocalqueTransport

if ('undefined' !== typeof module) {
  module.exports = LocalqueTransport
}
