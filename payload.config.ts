import path from 'path'

// NOTE: '@payloadcms/db-mongodb' and '@payloadcms/bundler-vite' MUST use named
// imports. This config file is also loaded client-side by Payload's Vite dev
// server (to hydrate the admin UI), which aliases these two server-only
// packages to a stub ESM module (mock.js) that only exports named bindings
// (no default export). A default import would throw "doesn't provide an
// export named 'default'" in the browser. Named imports work here in both
// the server (tsx/Node) and client (Vite) contexts because Node's static
// cjs-module-lexer can statically detect these packages' named exports.
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { viteBundler } from '@payloadcms/bundler-vite'

// NOTE: 'payload/config' and '@payloadcms/richtext-slate' are SWC-compiled
// CJS modules with `__esModule: true` and ONLY named exports (via a generic
// getter-loop helper, e.g. `_export(exports, { buildConfig: () => ... })`).
// This dynamic pattern can NOT be statically detected by Node's
// cjs-module-lexer, so a literal `import { buildConfig } from 'payload/config'`
// fails server-side under tsx with "does not provide an export named
// 'buildConfig'". We can't work around this with a top-level `await
// import(...)` either — Payload's own admin/Root.js does a synchronous
// `require('payload-config')` (this file, aliased) when esbuild pre-bundles
// the admin UI's dependencies, and a module with top-level await cannot be
// required synchronously (hard esbuild error: "this require call is not
// allowed because the imported file contains a top-level await").
//
// The one construct that works everywhere is a plain, synchronous namespace
// import with a dual-shape fallback:
//   - Node/tsx: cjs-module-lexer can't see the named exports, so the
//     namespace only exposes `{ __esModule, default }`, where `default` is
//     the WHOLE module.exports object (Node's CJS-interop fallback) — so we
//     need `ns.default.buildConfig`.
//   - esbuild/Vite (client): for a CJS module that already declares
//     `__esModule: true`, esbuild's `__toESM` interop returns the module
//     object itself (unwrapped) as the namespace — so the real named getter
//     is directly on the namespace as `ns.buildConfig`, and `ns.default`
//     does not exist.
// Checking both shapes synchronously handles both contexts correctly.
import * as payloadConfigNS from 'payload/config'
const payloadConfigModule = payloadConfigNS as typeof payloadConfigNS & {
  default?: typeof payloadConfigNS
}
const buildConfig = payloadConfigModule.buildConfig ?? payloadConfigModule.default?.buildConfig
import * as richtextSlateNS from '@payloadcms/richtext-slate'
const richtextSlateModule = richtextSlateNS as typeof richtextSlateNS & {
  default?: typeof richtextSlateNS
}
const slateEditor = richtextSlateModule.slateEditor ?? richtextSlateModule.default?.slateEditor

// Payload's Vite admin evaluates this config in the browser as well as on the
// server. Keep the shared config free of Node-only APIs and only read server
// environment variables in the server branch. In the browser, using the
// current origin also keeps Admin API requests on the Payload server that
// served the page.
const serverURL =
  typeof window === 'undefined'
    ? process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${process.env.PORT || 3001}`
    : window.location.origin
const mongoURL =
  typeof window === 'undefined'
    ? process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octavise'
    : ''

export default buildConfig({
  serverURL,
  admin: {
    user: 'users',
    bundler: viteBundler(),
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: mongoURL,
  }),
  collections: [
    // Users collection for admin access
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    // Features collection
    {
      slug: 'features',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // Why Cards collection
    {
      slug: 'why-cards',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // Operators collection
    {
      slug: 'operators',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // Integrations collection
    {
      slug: 'integrations',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Practice Management', value: 'practice' },
            { label: 'Advertising Platform', value: 'advertising' },
          ],
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // Security Features collection
    {
      slug: 'security-features',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // FAQ collection
    {
      slug: 'faq',
      admin: {
        useAsTitle: 'question',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
  ],
  globals: [
    // Hero section
    {
      slug: 'hero',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
        },
        {
          name: 'eyebrowLink',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'ctaText',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaLink',
          type: 'text',
          required: true,
        },
      ],
    },
    // Why Section
    {
      slug: 'why-section',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // Testimonial Section
    {
      slug: 'testimonial',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'videoUrl',
          type: 'text',
          required: true,
        },
      ],
    },
    // Feature Grid Section
    {
      slug: 'feature-grid-section',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // Operators Section
    {
      slug: 'operators-section',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
      ],
    },
    // Integrations Section
    {
      slug: 'integrations-section',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    // Data Security Section
    {
      slug: 'data-security-section',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
      ],
    },
    // FAQ Section
    {
      slug: 'faq-section',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
      ],
    },
    // Founder Offer Section
    {
      slug: 'founder-offer',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'ctaText',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaLink',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  typescript: {
    // Payload v2.32 generates a module augmentation that conflicts with its
    // own exported GeneratedTypes alias. Keep the generated schema types,
    // but omit that known-broken declaration block.
    declare: false,
    outputFile: path.resolve('payload-types.ts'),
  },
})
