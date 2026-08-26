import { buildConfig } from 'payload/config'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${process.env.PORT || 3001}`,
  admin: {
    user: 'users',
  },
  editor: slateEditor({}),
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
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
