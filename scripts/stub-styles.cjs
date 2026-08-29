// Payload v2's compiled admin bundle contains raw `require('./foo.scss')` calls
// intended to be resolved by webpack's sass-loader during a real client bundle
// build. When Payload's server-side code is required directly under plain
// Node (no webpack in the loop), Node has no handler for these extensions and
// falls back to parsing them as JavaScript, which crashes.
//
// This preload script registers no-op handlers for style extensions so these
// `require()` calls resolve to an empty object instead of crashing the
// process. This only matters for booting the Express/REST/GraphQL server;
// it does not affect how the admin UI is actually built/served.
const Module = require('module')

for (const ext of ['.scss', '.css', '.less']) {
  Module._extensions[ext] = function stubStyleLoader(module) {
    module.exports = {}
  }
}
