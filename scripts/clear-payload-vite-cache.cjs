const fs = require('node:fs')
const path = require('node:path')

// Payload v2's Vite adapter embeds payload.config.ts in its optimized Root
// dependency. Vite does not reliably invalidate that dependency when only the
// config changes, so an old browser-crashing config can survive restarts.
const cachePath = path.resolve(
  __dirname,
  '../node_modules/@payloadcms/bundler-vite/node_modules/.vite',
)

fs.rmSync(cachePath, { force: true, recursive: true })
