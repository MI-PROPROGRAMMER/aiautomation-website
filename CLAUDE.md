# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ApexifyLabs marketing site — a Vite + React 18 + TypeScript SPA with shadcn/ui (Radix) components, Tailwind, react-router-dom, and a custom prerender step that emits static HTML for each route into `dist/` for SEO.

## Commands

```bash
npm run dev          # Vite dev server on http://localhost:8080 (host "::" — note port is 8080, not 5173)
npm run build        # vite build only — does NOT run prerender
npm run prerender    # tsx scripts/prerender.tsx — must be run AFTER build (reads dist/index.html)
npm run build:dev    # vite build with development mode
npm run preview      # serve the built dist/
npm run lint         # eslint .
```

There is no test runner configured. There is no `typecheck` script — run `npx tsc --noEmit` if needed (note `tsconfig.app.json` has `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedParameters: false`).

To produce a fully prerendered static build the way Vercel ships it: `npm run build && npm run prerender`. The prerender step is required for SEO — without it routes other than `/` will only have the SPA shell. `vercel.json` rewrites all paths to `/index.html`, but prerendered route folders (`dist/services/index.html`, etc.) take precedence.

## Architecture

### Routing & code splitting
- `src/App.tsx` exports `AppProviders` and `AppRoutes` separately so they can be reused by both `main.tsx` (BrowserRouter) and `scripts/prerender.tsx` (StaticRouter). Don't put `<BrowserRouter>` inside `AppRoutes` — prerender will break.
- All page components are `React.lazy()`-imported and wrapped in a `<Suspense fallback={<PageLoader />}>`.
- `src/pages/Index.tsx` further lazy-loads each landing section (`ProblemSection`, `ServicesSection`, etc.) with individual `Suspense` boundaries. The ROI calculator uses an additional IntersectionObserver gate (`LazyROICalculator`) so its bundle doesn't load until it scrolls into view. Keep this pattern when adding heavy sections — initial bundle size is actively managed.
- `vite.config.ts` defines `manualChunks` (react, router, icons, radix, maps, charts) — when adding heavy deps, decide whether they belong in an existing chunk or a new one.
- The catch-all `<Route path="*" element={<NotFound />} />` must remain last in `AppRoutes`.

### Prerendering
- `scripts/prerender.tsx` lists `staticRoutes` explicitly. **When adding a new top-level route, add it to that array** or the page won't be prerendered. Blog post routes are auto-collected by globbing `src/content/blog/*.mdx`.
- The script renders each route via `renderToString` + `StaticRouter`, then injects `react-helmet`'s `Helmet.renderStatic()` output into the `<!-- SSR_HEAD_OUTLET -->` placeholder in `dist/index.html`. Per-page `<Helmet>` blocks (titles, meta, canonical) are how SEO metadata gets baked in — every page component should include one.
- Output layout: `/` → `dist/index.html`, `/services` → `dist/services/index.html`, etc.
- `public/sitemap.xml` is hand-maintained — update it when adding routes.

### Blog (MDX)
- `@mdx-js/rollup` is registered in `vite.config.ts`. Posts live in `src/content/blog/*.mdx` and export a `frontmatter` const (NOT YAML frontmatter — it's a real JS export at the top of the file).
- `src/content/blog/posts.ts` uses `import.meta.glob('./*.mdx', { eager: true })` to build the post index. `BlogFrontmatter` requires `title`, `excerpt`, `heroImage`, `date`; posts with `draft: true` are filtered out. The slug is derived from the filename unless `frontmatter.slug` is explicitly set.
- Adding a post = drop a new `.mdx` file in `src/content/blog/` with the correct `frontmatter` export — it's auto-picked-up by both the runtime and the prerender route collector.
- MDX content is styled by the custom `.mdx-content` class in `src/index.css` (the Tailwind typography plugin was intentionally removed for bundle size — don't re-add it).

### Design system & styling
- Tailwind tokens are HSL CSS variables defined in `src/index.css` under `:root`. Brand palette: primary `#002347` (dark blue), accent `#00B5E2` (cyan), white. The site is dark-only — `<html>` doesn't toggle a `.dark` class even though `darkMode: ["class"]` is set in `tailwind.config.ts`.
- shadcn/ui is configured via `components.json` with `@/components/ui` as the install target. Use `npx shadcn@latest add <component>` for new primitives.
- Path alias `@/*` → `src/*` (configured in `vite.config.ts` and `tsconfig.json`).
- `design-system/ai-automation-agency/MASTER.md` is the persisted output from the `ui-ux-pro-max` Cursor skill and documents the agreed-upon style/typography/color rules. Treat it as the source of truth for visual decisions; per-page deviations live in `design-system/ai-automation-agency/pages/`.

### Configuration & env
- All external links and EmailJS credentials live in `src/config/constants.ts` and read from `import.meta.env.VITE_*` with hardcoded fallbacks. **Don't scatter URLs across components** — add them to constants.
- Required env vars (see `EMAILJS_SETUP.md` for the contact-form flow): `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_RECIPIENT_EMAIL`, `VITE_CONTACT_EMAIL`, `VITE_LINKEDIN_URL`, `VITE_TWITTER_URL`.

## Cursor skill: ui-ux-pro-max

`.cursor/skills/ui-ux-pro-max/SKILL.md` defines a Python-backed design-system search tool. When doing UI/UX work, the established workflow is to run `python3 scripts/search.py "<query>" --design-system -p "<project>"` (the path is relative to the skill dir). Key constraints from that skill that apply here: use SVG icons (not emojis), `cursor-pointer` on every interactive element, sufficient contrast for the dark theme, `transition-colors duration-200` for hover states, no layout-shifting hover scales.
