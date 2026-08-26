# Implementation Plan — Commercial SEO Pages and Blog Clusters

Date: 2026-08-26
Branch: `codex/commercial-seo-pages` (from `main` @ `9784020`, clean worktree)
Spec: `docs/superpowers/specs/2026-08-26-commercial-keyword-architecture.md`

## Verified baseline (not assumed)

| Fact | Verified value | How |
| --- | --- | --- |
| Published MDX articles | 95 | `ls src/content/blog/*.mdx \| wc -l` |
| Core routes | 7 | `CORE_ROUTES` in `scripts/seo-routes.ts` |
| Indexable URLs | 102 | 7 + 95, matches Phase 1 build log |
| Sitemap | generated, not hand-maintained | `scripts/generate-sitemap.ts` |
| Prerender | streaming SSR + full-CSS inline | `scripts/prerender.tsx` |
| Real 404 | `dist/404.html`, `noindex, follow`, no SPA catch-all rewrite | `vercel.json`, `src/pages/NotFound.tsx` |
| SEO validation | dependency-free, runs in `vercel-build` | `scripts/validate-seo.ts` |

Expected post-change count: **105** (102 + 3 specialist pages). No article is deleted,
merged, or redirected in this pass, so nothing subtracts from the baseline.

`docs/` is gitignored in this repo. The two documents this plan produces
(`docs/superpowers/plans/…` and `docs/seo/commercial-content-cluster-map.md`) are
force-added so the branch diff carries them for review.

## Architecture decisions

### 1. Typed content model + one layout component

Three pages that each need identical SEO plumbing (Helmet, canonical, OG, `Service`
schema, `BreadcrumbList`, `FAQPage`) and structurally similar buyer sections. Writing
three hand-rolled pages would triple the chance that one drifts (a stale canonical, an
FAQ answer edited in the JSON-LD but not in the visible list).

- `src/content/services/types.ts` — `ServicePageContent`, `ServiceFaq`.
- `src/content/services/{aiChatbotDevelopment,forwardDeployedEngineer,customAiSoftware}.ts`
  — all substantive copy, unique per file.
- `src/components/services/ServicePageLayout.tsx` — renders the backbone and derives
  **both** the visible FAQ list and the `FAQPage` JSON-LD from `content.faqs`, so they
  cannot drift by construction.
- `src/pages/services/*.tsx` — thin route components (`<ServicePageLayout content={…} />`).

Every section is required, so the layout has no conditional-section engine. Each page
fills the same slots with genuinely different material (different comparison table,
different capabilities, different fit rules, different FAQs, different articles).

### 2. Route registration

`CORE_ROUTES` in `scripts/seo-routes.ts` is the single generator for sitemap + prerender.
`scripts/validate-seo.ts` keeps its own deliberately duplicated list so it can disagree
with the generator (Phase 1 decision, preserved).

Client router (`src/App.tsx`, lazy) and prerender router (`src/AppStatic.tsx`, eager)
both gain the three routes above the catch-all.

### 3. Homepage H1

The desktop hero's split display headline (`Automate` / `the grind.`) is a tagline, not a
page heading, and its two halves are size-constrained by the scroll-cut animation — the
category phrase does not fit without breaking the layout. So:

- the split headline becomes a non-heading display element (identical visual output,
  identical animation, `aria-label` preserved as a plain label);
- the existing hero lead paragraph becomes the single `<h1>` and gains the category:
  "ApexifyLabs is an AI automation agency that hands your team back 40% of their week."

Same change in `MobileHero` so the mobile DOM matches. This keeps visual hierarchy and
brand voice intact while putting the category in the one heading crawlers weigh most.

### 4. No fabrication

Copy may reuse only claims already published consistently on this site: 4+ years,
50+ clients, five continents, 10K+ hours automated, the ROI/cost ranges already on
`/services` FAQs, the day-one deliverables list from `/about`, and the tool list from
`ToolsSection` (Zapier, Make, n8n, Bubble, OpenAI, Anthropic, Python, TypeScript,
Node.js, AWS, Airtable, GitHub, HubSpot, Notion, PostgreSQL, Slack, Stripe, Supabase,
Vercel). No new client names, no new percentages, no new dollar figures, no new
timelines, no certifications, no invented integrations. Pricing is described as
scope-after-discovery, reusing the ranges already published in `FAQ_ITEMS`.

## Tasks

1. **Failing coverage first** — add the three routes to `seo-routes.ts` and
   `validate-seo.ts`, extend the validator with the new per-page assertions, run
   `npm run vercel-build`, and record the failure. Nothing committed while broken.
2. **Content model + layout + three pages** — unique copy per page.
3. **Structured data** — `Service` (provider = org `@id`), `BreadcrumbList`, `FAQPage`
   from the same typed FAQ array. No ratings, reviews, offers, or prices.
4. **Routing / prerender / sitemap** — client + static routers, verify 105 URLs and three
   real static documents.
5. **Homepage** — title, description, H1, opening copy, internal links to `/services`
   and the three specialist pages.
6. **`/services` hub** — title, description, H1, opening paragraph, specialist cards
   that say who each service is for; footer sub-nav.
7. **Cluster map** — inventory 95 posts, select 18, write
   `docs/seo/commercial-content-cluster-map.md`.
8. **Contextual links** — one parent link + two or three related-article links per
   selected post, varied descriptive anchors, body-context placement; service pages link
   back to their supporting articles.
9. **Overlap analysis** — document candidate pairs and evidence; recommend no
   consolidation this pass unless a pair is unequivocal (the repo has no tested
   permanent-redirect pattern, so redirects would be untested infrastructure).
10. **Link validation** — extend `validate-seo.ts` to resolve every internal `href` in
    every built document against the indexable route set, plus the FAQ-parity,
    "AI customer software", and forward-deployed-engineer-introduction checks.

## Cluster assignment (18 of 95)

| Parent | Articles |
| --- | --- |
| `/services/ai-chatbot-development` | `ai-wismo-tickets-dtc-brand`, `dtc-refund-reflex-delivered-not-received-claims`, `freight-check-calls-before-after-ai`, `follow-up-gap-freight-leads`, `cancellation-reason-capture-dtc-winback-blind-spot` |
| `/services/forward-deployed-engineer` | `agentic-ai-blueprint`, `manual-vs-ai-order-exception-handling`, `carrier-vetting-manual-vs-ai-assisted-scoring`, `subcontractor-bid-leveling-ai-assisted`, `daily-reports-gc-jobs-forms-to-ai-summaries` |
| `/services/custom-ai-software` | `spot-load-carrier-sourcing-agentic-ai`, `ai-pricing-engines-freight-broker-quote-desks`, `freight-bill-audit-sampled-vs-ai-line-item-review`, `multi-channel-inventory-drift-dtc`, `hidden-cost-manual-submittal-tracking-gcs` |
| `/services` | `automation-roi-playbook`, `hidden-cost-manual-freight-sales-desk`, `manual-tender-acceptance-brokerage-routing-guide` |

Rationale, primary informational query, related-article pairs, and cannibalization notes
live in `docs/seo/commercial-content-cluster-map.md`.

## Success criteria

- `git diff --check` clean.
- `npx tsc --noEmit` exits 0.
- `npm run lint` exits 0 (5 pre-existing warnings documented in Phase 1 stay).
- `npm run vercel-build` exits 0 and reports **105** indexable URLs, **106** documents
  inlined (105 routes + `dist/404.html`), and SEO validation passing for 105 routes.
- Three real files exist: `dist/services/{ai-chatbot-development,forward-deployed-engineer,custom-ai-software}/index.html`,
  each with one `<h1>`, its own canonical, substantive body text, and no NotFound copy.
- Every internal link in every built document resolves to an indexable route.
- `AI customer software` appears in zero built documents.

## Out of scope

Deploying, pushing, merging, `robots.txt` edits, hand-edited `sitemap.xml`, new
dependencies, article deletions/merges/redirects, and the six new content briefs listed
in the spec (those are a later publishing pass).
