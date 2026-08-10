![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](http://senecajs.org) plugin

# @seneca/localque-transport

[![npm version](https://img.shields.io/npm/v/@seneca/localque-transport.svg)](https://npmjs.com/package/@seneca/localque-transport)
[![build](https://github.com/senecajs/seneca-localque-transport/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-localque-transport/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-localque-transport/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-localque-transport?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-localque-transport/badge.svg)](https://snyk.io/test/github/senecajs/seneca-localque-transport)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/20872/branches/581541/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=20872&bid=581541)
[![Maintainability](https://api.codeclimate.com/v1/badges/8242b80adb8acb685afd/maintainability)](https://codeclimate.com/github/senecajs/seneca-localque-transport/maintainability)

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|

User localque-transportral business logic plugin for the Seneca platform.

## Install

```sh
$ npm install @seneca/localque-transport
```

## Quick Example

```js
// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca().use('localque-transport', {})

TODO
```

## More Examples

See [test/](test/) for more usage examples.

## Motivation

A [Seneca.js](http://senecajs.org) plugin.

## Support

If you're using this module and need help, you can:

- Post a [github issue](https://github.com/senecajs/seneca-localque-transport/issues)
- Tweet to [@senecajs](http://twitter.com/senecajs)
- Ask on the [Gitter](https://gitter.im/senecajs/seneca)

## API

### Options

* `debug` : boolean
* `log` : array
* `init$` : boolean

### Action Patterns

* [role:transport,hook:client,type:localque](#-roletransporthookclienttypelocalque-)
* [role:transport,hook:listen,type:localque](#-roletransporthooklistentypelocalque-)

### Action Descriptions

### &laquo; `role:transport,hook:client,type:localque` &raquo;

No description provided.



----------
### &laquo; `role:transport,hook:listen,type:localque` &raquo;

No description provided.



----------

## Contributing

The [Senecajs org](https://github.com/senecajs/) encourages open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features please get in touch.

### Running tests

```sh
npm run test
```

## Background

Part of the [Senecajs org](https://github.com/senecajs/).
