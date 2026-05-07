# ApexifyLabs — AI Automation Agency Website

<div align="center">

![ApexifyLabs](https://img.shields.io/badge/ApexifyLabs-AI%20Automation-00B5E2?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Analyze. Automate. Apexify.**

[Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Architecture](#architecture) • [Deployment](#deployment)

</div>

---

## Overview

The marketing site for ApexifyLabs — a Vite + React 18 + TypeScript SPA with a custom prerender step that emits static HTML for every route into `dist/` so search engines and AI crawlers see fully populated pages, not an empty SPA shell. The visual language is editorial-dark: a single dark theme, brand cyan accents, and aggressive performance budgets (eager bundle ~84 KiB gzip).

## Features

- **Prerendered routes** — every page is rendered to static HTML at build time via `scripts/prerender.tsx` so SEO and AI Overviews see real content.
- **Lazy everything** — pages and heavy landing sections are `React.lazy()` boundaries; the ROI calculator is gated behind an IntersectionObserver so its bundle never loads above the fold.
- **MDX blog** — posts live in `src/content/blog/*.mdx`, are auto-discovered by `import.meta.glob`, and are picked up by both the runtime and the prerender route collector.
- **Schema markup + llms.txt** — JSON-LD on every page, plus `public/llms.txt` and `public/pricing.md` for AI search engines.
- **Self-hosted fonts** — fonts shipped from `public/fonts/` to keep the client entry small (~33 KiB gzip).
- **Inlined critical CSS** — `beasties` inlines per-route critical CSS at prerender time; below-the-fold content uses `content-visibility: auto`.
- **EmailJS contact form** — no backend; the contact form posts directly to EmailJS from the client.
- **Umami analytics** — privacy-friendly tracker injected during prerender.
- **Interactive ROI calculator** — Recharts-powered with industry presets.
- **Global reach map** — `react-simple-maps` world map with regional pins.

## Tech Stack

### Core

- **[React 18.3](https://react.dev/)** + **[TypeScript 5.8](https://www.typescriptlang.org/)**
- **[Vite 5.4](https://vitejs.dev/)** — dev server (port `8080`) and bundler with manual chunk splitting (react / router / icons / radix / maps / charts).
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** — HSL CSS variables defined in `src/index.css`.

### UI

- **[shadcn/ui](https://ui.shadcn.com/)** — only the primitives the site actually uses (accordion, button, dialog, input, label, slider, slot, sonner, toast, toggle, tooltip-style accordion). Add more via `npx shadcn@latest add <component>`.
- **[Radix UI](https://www.radix-ui.com/)** — accessible primitives behind shadcn.
- **[Lucide React](https://lucide.dev/)** — icon set.
- **[Framer Motion](https://www.framer.com/motion/)** — used via `LazyMotion` so only the features each page uses are loaded.

### Routing, content & forms

- **[React Router DOM 6](https://reactrouter.com/)** — `BrowserRouter` at runtime, `StaticRouter` during prerender.
- **[React Helmet](https://github.com/nfl/react-helmet)** — per-page titles, meta and canonical URLs (rendered into the prerendered HTML via `Helmet.renderStatic()`).
- **[@mdx-js/rollup](https://mdxjs.com/)** + **[@mdx-js/react](https://mdxjs.com/)** — MDX blog posts.
- **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** — contact-form validation.
- **[@emailjs/browser](https://www.emailjs.com/)** — client-side form submission.

### Data viz & misc

- **[Recharts](https://recharts.org/)** — ROI calculator charts (lazy-loaded).
- **[react-simple-maps](https://www.react-simple-maps.io/)** — world map.
- **[Sonner](https://sonner.emilkowal.dev/)** — toast notifications (theme hardcoded to `dark`).
- **[date-fns](https://date-fns.org/)** — date utilities.
- **[beasties](https://github.com/danielroe/beasties)** — critical-CSS inlining at build time.

## Getting Started

### Prerequisites

- **Node.js 18+** and npm.

### Installation

```bash
git clone <your-repo-url>
cd "Apexifylabs Website"
npm install
```

### Environment variables

Create a `.env` file in the project root:

```
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
VITE_EMAILJS_RECIPIENT_EMAIL=team@yourcompany.com
VITE_CONTACT_EMAIL=contact@apexifylabs.com
VITE_LINKEDIN_URL=https://www.linkedin.com/company/apexifylabs
VITE_INSTAGRAM_URL=https://www.instagram.com/apexifylabs/
```

All of these have hardcoded fallbacks in `src/config/constants.ts`, so the site builds without a `.env`. See `EMAILJS_SETUP.md` for EmailJS setup.

### Available scripts

```bash
npm run dev          # Vite dev server on http://localhost:8080
npm run build        # vite build only — does NOT run prerender
npm run prerender    # tsx scripts/prerender.tsx — must run AFTER build
npm run build:dev    # vite build with development mode
npm run preview      # serve the built dist/
npm run lint         # eslint .
```

> **Important:** for an SEO-correct production build run **`npm run build && npm run prerender`**. Without the prerender step, only `/` is fully populated — every other route falls back to the SPA shell.

There is no test runner configured. Type-check with `npx tsc --noEmit` (note that `tsconfig.app.json` has `noImplicitAny: false`, `strictNullChecks: false`).

## Architecture

### Routing & code splitting

- `src/App.tsx` exports `AppProviders` and `AppRoutes` separately so they can be reused by `src/main.tsx` (`BrowserRouter`) and `scripts/prerender.tsx` (`StaticRouter`). **Never** put `<BrowserRouter>` inside `AppRoutes` — prerender will break.
- All page components are `React.lazy()`-imported and wrapped in `<Suspense fallback={<PageLoader />}>`.
- `src/pages/Index.tsx` further lazy-loads each landing section with individual `Suspense` boundaries. The ROI calculator uses an additional IntersectionObserver gate (`LazyROICalculator`) so its bundle doesn't load until it scrolls into view.
- `vite.config.ts` defines `manualChunks` (react, router, icons, radix, maps, charts).

### Prerendering

- `scripts/prerender.tsx` lists `staticRoutes` explicitly. **When adding a new top-level route, add it to that array** or the page won't be prerendered.
- Blog post routes are auto-collected by globbing `src/content/blog/*.mdx`.
- The script renders each route via `renderToString` + `StaticRouter`, then injects `react-helmet`'s `Helmet.renderStatic()` output into the `<!-- SSR_HEAD_OUTLET -->` placeholder in `dist/index.html`.
- Output layout: `/` → `dist/index.html`, `/services` → `dist/services/index.html`, etc.
- `public/sitemap.xml` is hand-maintained — update it when adding routes.

### Blog (MDX)

- Posts live in `src/content/blog/*.mdx` and export a `frontmatter` const (a real JS export at the top of the file — **not** YAML).
- `src/content/blog/posts.ts` builds the post index via `import.meta.glob('./*.mdx', { eager: true })`. `BlogFrontmatter` requires `title`, `excerpt`, `heroImage`, `date`; posts with `draft: true` are filtered out.
- Adding a post = drop a new `.mdx` file in `src/content/blog/` with the correct `frontmatter` export — both the runtime and the prerender route collector pick it up automatically.
- MDX content is styled by the custom `.mdx-content` class in `src/index.css` (the Tailwind typography plugin was intentionally removed for bundle size).

### Design system

- Brand palette: primary `#002347` (dark blue), accent `#00B5E2` (cyan), white. The site is **dark-only** — `<html>` doesn't toggle a `.dark` class.
- Tailwind tokens are HSL CSS variables in `src/index.css` under `:root`.
- shadcn/ui is configured via `components.json` with `@/components/ui` as the install target.
- Path alias `@/*` → `src/*` (configured in `vite.config.ts` and `tsconfig.json`).
- `design-system/ai-automation-agency/MASTER.md` is the source of truth for visual decisions; per-page deviations live in `design-system/ai-automation-agency/pages/`.
- Visual constraints: SVG icons (not emojis), `cursor-pointer` on every interactive element, sufficient contrast for the dark theme, `transition-colors duration-200` for hover states, no layout-shifting hover scales.

## Routes

| Route               | Page       | Description                              |
|---------------------|------------|------------------------------------------|
| `/`                 | Index      | Home page with all main sections         |
| `/services`         | Services   | Detailed services breakdown              |
| `/about`            | About      | Company information                      |
| `/contact`          | Contact    | Contact form (EmailJS)                   |
| `/blog`             | Blog       | Blog post listing                        |
| `/blog/:slug`       | BlogPost   | Individual MDX blog post                 |
| `/privacy-policy`   | Privacy    | Privacy policy                           |
| `/terms-of-service` | Terms      | Terms of service                         |
| `*`                 | NotFound   | 404 page (must remain last in `AppRoutes`) |

All routes are lazy-loaded with React Suspense and prerendered to static HTML.

## Project Structure

```
├── public/                       # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml               # Hand-maintained — update when adding routes
│   ├── llms.txt                  # AI search engine context
│   ├── pricing.md                # Pricing reference for LLMs
│   ├── fonts/                    # Self-hosted fonts
│   └── resources/                # Portfolio images, blog assets, media
│
├── scripts/
│   └── prerender.tsx             # Static site generation script
│
├── src/
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui primitives (only the ones used)
│   │   ├── blog/                 # Blog-specific components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ServicesCTASection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── ToolsSection.tsx
│   │   ├── IndustrySection.tsx
│   │   ├── ROICalculatorSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SocialProofSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── LogoWall.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── GlobalReachMap.tsx
│   │   ├── PremiumBackground.tsx
│   │   ├── JsonLd.tsx
│   │   ├── PageLoader.tsx
│   │   └── ScrollToHash.tsx
│   │
│   ├── config/
│   │   └── constants.ts          # EmailJS config, social links, Calendly
│   │
│   ├── content/
│   │   └── blog/                 # MDX blog posts + auto-loader (posts.ts)
│   │
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilities (cn helper, etc.)
│   │
│   ├── pages/                    # Page components (lazy-loaded)
│   │   ├── Index.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Privacy.tsx
│   │   ├── Terms.tsx
│   │   └── NotFound.tsx
│   │
│   ├── App.tsx                   # AppProviders + AppRoutes (no router inside)
│   ├── index.css                 # Global styles + design tokens
│   ├── main.tsx                  # Browser entry (BrowserRouter)
│   └── vite-env.d.ts
│
├── design-system/                # Source of truth for visual rules
│   └── ai-automation-agency/
│       ├── MASTER.md
│       └── pages/
│
├── components.json               # shadcn/ui configuration
├── tailwind.config.ts
├── vite.config.ts                # MDX plugin + manualChunks
├── tsconfig.{json,app.json,node.json}
├── vercel.json                   # SPA rewrites (overridden by prerendered folders)
└── EMAILJS_SETUP.md
```

## Performance

The site has an actively managed performance budget. Recent commits track the work:

- Eager bundle: **138 KiB → 84 KiB gzip** via `LazyMotion` and dead-code removal.
- Client entry: **102 KiB → 33 KiB gzip** via self-hosted fonts.
- Recharts no longer loads on first paint — gated behind an IntersectionObserver.
- All CSS inlined per route at prerender time; the async stylesheet request is killed entirely.
- Below-the-fold sections use `content-visibility: auto`.

When adding heavy dependencies, decide whether they belong in an existing `manualChunks` group or warrant a new chunk, and gate them behind `React.lazy` + Suspense (or an additional IntersectionObserver) when possible.

## Deployment

### Vercel (configured)

`vercel.json` rewrites all paths to `/index.html`, but prerendered route folders (`dist/services/index.html`, etc.) take precedence. Build command: `npm run build && npm run prerender`.

### Other static hosts

Anything that serves `dist/` works (Netlify, GitHub Pages, S3 + CloudFront, Firebase Hosting). Make sure your host serves `dist/<route>/index.html` for `/<route>` requests and falls back to `dist/index.html` for unknown paths.

## License

This project is proprietary and confidential.

## Support

- Email: [contact@apexifylabs.com](mailto:contact@apexifylabs.com)
- Website: [apexifylabs.com](https://apexifylabs.com)
- LinkedIn: [linkedin.com/company/apexifylabs](https://www.linkedin.com/company/apexifylabs)
- Instagram: [@apexifylabs](https://www.instagram.com/apexifylabs/)

---

<div align="center">

**Built by ApexifyLabs**

*Empowering businesses with intelligent automation*

</div>
