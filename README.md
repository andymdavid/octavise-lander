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

- Payload CMS integration for content management
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
