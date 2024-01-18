"use strict";
/* Copyright © 2024 Seneca Project Contributors, MIT License. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = __importDefault(require("async"));
// Default options.
const defaults = {
    debug: false,
    log: [],
};
function LocalqueTransport(options) {
    const seneca = this;
    const queMap = {};
    const log = options.debug && (options.log || []);
    const tu = seneca.export('transport/utils');
    seneca.add('role:transport,hook:listen,type:localque', hook_listen_localque);
    seneca.add('role:transport,hook:client,type:localque', hook_client_localque);
    function hook_listen_localque(config, ready) {
        const seneca = this.root.delegate();
        const pg = seneca.util.pincanon(config.pin || config.pins);
        function handle_msg(data, done) {
            const msgdata = JSON.parse(data);
            const meta = msgdata.meta$;
            const msg = tu.internalize_msg(seneca, msgdata);
            log && log.push({
                hook: 'listen', entry: 'handle', pat: meta === null || meta === void 0 ? void 0 : meta.pattern, w: Date.now(), m: meta === null || meta === void 0 ? void 0 : meta.id
            });
            // Convert que msg into a new local msg - avoid que loop
            let localmsg = seneca.util.clean(msg);
            localmsg.local$ = true;
            seneca.act(localmsg, function (_err, _out, _meta) {
                // Reply not returned as que messages are asynchronous.
            });
            return done();
        }
        queMap[pg + '~IN'] = async_1.default.queue(handle_msg);
        return ready(config);
    }
    function hook_client_localque(config, ready) {
        const seneca = this.root.delegate();
        const pg = seneca.util.pincanon(config.pin || config.pins);
        function send_msg(msg, reply, meta) {
            //  queMap[pg + '~OUT'] = Async.queue(handle_reply)
            const msgstr = JSON.stringify(tu.externalize_msg(seneca, msg, meta));
            log && log.push({
                hook: 'client', entry: 'send', pat: meta.pattern, w: Date.now(), m: meta.id
            });
            queMap[pg + '~IN'].push(msgstr);
            // No reply as que messages as asynchronous
            reply();
        }
        /*
        function handle_reply(data: any, done: Function) {
          const reply = tu.internalize_reply(seneca, JSON.parse(data))
          log && log.push({ hook: 'client', entry: 'reply', reply })
    
          seneca.reply(reply)
          return done()
        }
        */
        return ready({
            config: config,
            send: send_msg
        });
    }
    return {
        exports: {}
    };
}
Object.assign(LocalqueTransport, { defaults });
exports.default = LocalqueTransport;
if ('undefined' !== typeof module) {
    module.exports = LocalqueTransport;
}
//# sourceMappingURL=LocalqueTransport.js.map