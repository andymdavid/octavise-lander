# Octavise Landing Page

A high-performance landing page for Octavise, built with Astro for maximum speed and SEO optimization.

## Tech Stack

- **Astro 7.2** - Static site generator with zero JavaScript by default
- **TypeScript** - Type-safe development
- **Custom CSS** - Performance-optimized styling with CSS variables
- **Google Fonts** - Instrument Sans typography

## Project Structure

```
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── HeroSplit.astro
│   │   ├── SystemStrip.astro
│   │   ├── WhySection.astro
│   │   ├── AgentSection.astro
│   │   ├── FeatureGrid.astro
│   │   ├── OperatorsSection.astro
│   │   ├── SecuritySection.astro
│   │   ├── IntegrationsSection.astro
│   │   ├── MathSection.astro
│   │   ├── OfferSection.astro
│   │   └── FAQ.astro
│   ├── layouts/
│   │   └── Layout.astro      # Base layout with header/footer
│   ├── pages/
│   │   └── index.astro       # Main landing page
│   └── styles/
│       └── global.css        # Global styles and CSS variables
├── public/                   # Static assets
├── _original/                # Original HTML/CSS prototype (backup)
└── dist/                     # Built static files
```

## Development

### Requirements

- Node.js 22+ (use nvm to manage versions)
- npm 10+

### Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Using nvm

```bash
# Switch to Node 22
nvm use 22

# Or install and use
nvm install 22 && nvm use 22
```

## Payload CMS (Admin + REST API)

Content is managed via [Payload CMS v2](https://payloadcms.com/docs/local-api/overview) running as a standalone Express server, backed by a local MongoDB instance. This is intentionally **not** Payload v3/Next.js — Payload v2's Admin Panel, REST, and GraphQL APIs run entirely on Express, which is what allows this to pair with an Astro frontend instead of Next.js.

### One-time setup

```bash
# 1. Install and start MongoDB locally via Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb/brew/mongodb-community@7.0

# 2. Copy the env template and fill in a secret
cp .env.example .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# paste the output into PAYLOAD_SECRET in .env
```

### Running the Payload server

```bash
npm run dev:payload
```

This starts Express + Payload on `http://localhost:3001`:

- Admin Panel: `http://localhost:3001/admin` (first visit prompts you to create an admin user)
- REST API: `http://localhost:3001/api/<collection-slug>` (e.g. `/api/features`, `/api/hero`)
- GraphQL: `http://localhost:3001/api/graphql`

By default, Payload v2 requires an authenticated user for all collection operations (including reads) unless a collection explicitly overrides its `access` config. To let the Astro frontend fetch content without auth, add `access: { read: () => true }` to the relevant collections/globals in `payload.config.ts`.

**Note:** `dev:payload` sets `NODE_OPTIONS=--require ./scripts/stub-styles.cjs`. This is required because Payload v2's compiled admin bundle contains `require('./foo.scss')` calls meant for a webpack build step; the stub prevents plain Node from choking on those files when booting the server. See `scripts/stub-styles.cjs` for details. The command also clears Payload's generated Vite dependency cache before startup because the v2 Vite adapter embeds `payload.config.ts` in its optimized admin root and can otherwise continue serving stale config code after a restart.

### Running Astro + Payload together

Run both dev servers in separate terminals:

```bash
npm run dev           # Astro frontend on :4321
npm run dev:payload   # Payload admin/API on :3001
```

Astro pages/components fetch data from Payload via `fetch('http://localhost:3001/api/...')` (or the deployed Payload URL in production via `PAYLOAD_PUBLIC_SERVER_URL`).

## Design Direction

The page is intentionally structured around the **Taito.ai reference system**:

- Light background and high-contrast typography
- Centered, oversized hero typography
- Product-led hero with dense app/dashboard mockup
- Full app shell with sidebar, connected systems, filters, panels, and table
- Octavise blue (#2563eb) as accent color
- Editorial section rhythm with visual product scenes
- Sections built around ad-spend pain, not generic analytics
- Early visibility for integrations and healthcare-data trust
- Dark security/footer bands to anchor trust and final conversion

## Performance Benefits

Astro provides significant performance improvements over traditional SPA frameworks:

- **~0 KB JavaScript** shipped by default (vs ~85 KB for Next.js)
- **Sub-second page loads** with optimized static generation
- **Perfect Lighthouse scores** (typically 95-100)
- **Partial hydration** - only interactive components load JavaScript
- **Better SEO** with true static generation
- **Faster ad campaign performance** with reduced bounce rates

## Content Structure

### Page Sections (in order)

1. **Hero Split** - Main headline with live dashboard preview
2. **System Strip** - Integration logos banner
3. **Why Octavise** - Value proposition with 3-card grid
4. **Practice Intelligence** - Automated workflow explanation
5. **Feature Grid** - 6 key features overview
6. **Different Users** - Owner/Manager/Agency segments
7. **Security** - Healthcare data handling approach
8. **Integrations** - System connections flow
9. **Math** - Key metrics showcase
10. **Founder Offer** - Early access CTA
11. **FAQ** - 5 common questions

### Call-to-Actions

- Primary: "Claim founder access"
- Offer: "FOUNDER30" code for first 10 sign-ups
- Multiple anchor links to `#start` section

## Future Enhancements

### Potential Additions

- Wire Astro pages to fetch content from the Payload REST API instead of hardcoded copy
- A/B testing setup for headline/CTA variants
- Customer testimonials and logos (when available)
- Additional product screenshots
- Analytics integration (privacy-friendly)
- Performance monitoring

### Migration Notes

The original HTML/CSS prototype has been preserved in `_original/` for reference. All sections have been converted to modular Astro components for easier maintenance and optimization.

## Deployment

This is a static site and can be deployed to:

- **Vercel** - Zero-config deployment
- **Netlify** - Drop-in deployment
- **Cloudflare Pages** - Edge deployment
- **AWS S3 + CloudFront** - Traditional hosting
- Any static hosting provider

Simply run `npm run build` and deploy the `dist/` folder.

## Copy Status

Current copy is draft-level and should be reviewed for:

- Tighter, more action-oriented language
- Consistent CTA messaging
- Social proof integration
- Customer testimonial placement
- Pricing transparency

---

**Original prototype**: 52 KB (HTML + CSS)
**Astro build**: ~15 KB (optimized HTML + inlined critical CSS)
**Performance gain**: ~70% size reduction with better caching
