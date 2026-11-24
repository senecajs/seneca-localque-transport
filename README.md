# @seneca/localque-transport

> _Seneca Localque-Transport_ is a plugin for [Seneca](http://senecajs.org)

    An in-process queue transport for Seneca messages, for local development and testing.

[![npm version](https://img.shields.io/npm/v/@seneca/localque-transport.svg)](https://npmjs.com/package/@seneca/localque-transport)
[![build](https://github.com/senecajs/seneca-localque-transport/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-localque-transport/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-localque-transport/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-localque-transport?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-localque-transport/badge.svg)](https://snyk.io/test/github/senecajs/seneca-localque-transport)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/20872/branches/581541/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=20872&bid=581541)
[![Maintainability](https://api.codeclimate.com/v1/badges/8242b80adb8acb685afd/maintainability)](https://codeclimate.com/github/senecajs/seneca-localque-transport/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |

## Install

This plugin needs Seneca 4 and Node.js 24 or later.

```sh
$ npm install seneca@^4 @seneca/localque-transport
```

## Quick Example

Messages sent with the `localque` transport are queued in process and
then acted locally. They are fire-and-forget: the sender gets no reply.

```js
const Seneca = require('seneca')

const seneca = Seneca({ legacy: false })
  .use('@seneca/localque-transport')
  .message('a:1', async function (msg) {
    console.log('a:1 received', msg.x)
  })
  .listen({ type: 'localque', pin: 'a:1' })
  .client({ type: 'localque', pin: 'a:1' })

await seneca.ready()
await seneca.post('a:1,x:1') // resolves to null; the action runs from the queue
```

Entities in messages keep their type when `@seneca/entity` is loaded.

Load `@seneca/transport` 9 or later if you also need its transports.
The older `seneca-transport` 8 replaces the `transport/utils` export
that this plugin uses, and the plugin then stops at load with an error.

<!--START:options-->


## Options

* `debug` : boolean
* `log` : array
* `init$` : boolean


<!--END:options-->

<!--START:action-list-->


## Action Patterns

* [role:transport,hook:client,type:localque](#-roletransporthookclienttypelocalque-)
* [role:transport,hook:listen,type:localque](#-roletransporthooklistentypelocalque-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `role:transport,hook:client,type:localque` &raquo;

No description provided.



----------
### &laquo; `role:transport,hook:listen,type:localque` &raquo;

No description provided.



----------


<!--END:action-desc-->

## More Examples

## Motivation

## Support

## API

## Contributing

## Background
