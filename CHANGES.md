# Changes

## 0.3.0 2026-11-21

First entry of this change log. Earlier versions are on npm and in the
git history.

* Seneca 4: the peer dependency is `seneca` `^4.0.0` (was
  `>=3||>=4.0.0-rc2`). Seneca 3 users stay on
  `@seneca/localque-transport@0.2`.
* Node.js 24 or later (`engines.node` `>=24`).
* Entities: the required peer dependency `seneca-entity` `>=26` is
  replaced by an optional peer dependency `@seneca/entity` `^29.0.0`.
  The plugin does not need entities itself; entities in messages keep
  their type when `@seneca/entity` is loaded. The old peer made npm
  install `seneca-entity` 28, which Seneca 4 rejects with
  `plugin_gubu_shape`.
* The peer dependency `seneca-promisify` is removed. Seneca 4 has
  promises built in, and the tests no longer load the plugin (D4).
* The plugin stops at load with a clear message when the
  `transport/utils` export lacks `internalize_msg` and
  `externalize_msg`, as it does when `seneca-transport` 8 or older is
  loaded first. `@seneca/transport` 9 keeps them.
* TypeScript: the plugin function is typed `this: Seneca.Instance`, with
  a type-only import of `seneca` (B10). The declaration file now
  imports the `seneca` types.
* Tests load `@seneca/entity` by its full name (B14), and run the
  transport with and without `@seneca/transport` loaded first.
* Development dependencies: `seneca` `^4.0.0`, `@seneca/entity`
  `^29.0.0`, `@seneca/transport` `^9.0.0`, `@seneca/doc` `^9.0.0` and
  `@types/node` `^24.0.0`; the unused `@seneca/maintain` is removed.
* `repository.url` uses `git+https`, `publishConfig.access` is
  `public`, and README.md and CHANGES.md are in the package. The local
  publish scripts are removed.
* README: install with `seneca@^4`, and a working example.
