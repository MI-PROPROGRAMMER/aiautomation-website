---
name: article-writer
description: Write, draft, and publish a new blog article for the ApexifyLabs marketing site (apexifylabs.com). Use this skill whenever the user asks to write an article, draft a blog post, create a new blog entry, suggest blog topics, generate content ideas for the marketing site, or publish content for this repo. Also use it whenever a scheduled or autonomous agent needs to produce the daily article. The skill drafts the MDX following articles.md (Tier 1 verticals — logistics, e-com ops, construction; before/after format; free-audit CTA; no DIY coaching), generates a 3:2 hero SVG, updates the sitemap, verifies the build, and commits + pushes the article to main as its own commit. Runs end-to-end without a review gate (use the `--auto` flag for cron / non-interactive use).
---

# Article Writer

You are operating as the article-writer skill for the ApexifyLabs marketing site. Your job is to draft a high-quality blog article that obeys every rule in `articles.md` (the editorial source of truth at the repo root) and ship it to production via a single git commit on `main`.

**Before you do anything else, read these two files in order:**

1. `articles.md` at the repo root — editorial source of truth (tone, structure, length, banned patterns, the Cardinal Rule).
2. `.claude/skills/article-writer/published-articles.md` — the **topics ledger**. The list of every article already shipped, plus the title shapes, headline numbers, and recurring phrases that are now off-limits because they have been used to saturation. The ledger is non-optional. Do not propose or draft a topic without reading it first, and do not consider the run finished until the new article has been appended to it.

The rest of this file describes the operational workflow that wraps those editorial rules.

## Mental model

You are doing one of three things on every run:

1. **Title given** → draft an article on that exact topic.
2. **No title, interactive** → propose 3 topic options (rotated by vertical), let the user pick, draft.
3. **No title, non-interactive (`--auto` flag, scheduled agent, or no human in the loop)** → propose 3 topics, auto-pick option 1, draft. Log the choice for visibility.

In all three cases, the back half of the workflow is identical: write files → verify → commit → push.

## Step 1 — Decide the topic

### Path A: title given

Use the title verbatim. Pick the cluster (before/after, informational, or playbook) that fits the title most naturally. Skip to step 2.

### Path B: no title — generate 3 options

**Pick the vertical first.** Count how many published posts exist for each Tier 1 vertical by reading the `tags` field of every `src/content/blog/*.mdx` file:

- **logistics** — tags include "Logistics", "Freight Sales", or related
- **e-com ops** — tags include "E-commerce", "DTC", "Order Ops", or related
- **construction** — tags include "Construction", "GC", "Submittals", or related
- **other / unclassified** — ignore for rotation purposes

The vertical with the **fewest** posts is the next vertical. Tie-break alphabetically (construction → e-com ops → logistics).

**Generate 3 working titles** within the chosen vertical. Each one a different cluster:

1. A **before/after comparison** (cost-of-inaction angle — "The Hidden Cost of X" / "Manual X vs AI-augmented X")
2. An **informational** "what is" / "why" / "X vs Y" piece
3. A **playbook / framework** piece (high-value, never the full implementation recipe)

Each title must:
- Hit at least one keyword anchor from `articles.md` (AI automation, Agentic AI, n8n, chatbot, AI for [vertical], ROI / cost of not automating).
- Be concrete enough to write a real article — not a generic listicle prompt.
- Be ≤ 60 characters where possible (SERP friendliness — Helmet appends ` | ApexifyLabs Journal` so the rendered title stays under ~80 chars).
- **Pass the topic-uniqueness check below.**

### Topic-uniqueness check (mandatory, runs every time)

Slug-uniqueness is not enough — two articles with different slugs can still cover the same idea, which is worse than useless (it's spammy and Google penalises it). The single source of truth for what's already on the blog is `.claude/skills/article-writer/published-articles.md`. Before proposing or finalising **any** topic:

1. **Read the ledger** (`published-articles.md`). Look at every article entry AND the "Burned patterns" section at the top. The ledger is canonical — if it disagrees with what `src/content/blog/*.mdx` shows, update the ledger.
2. **Thesis-overlap check.** Reject any proposed topic whose thesis substantially overlaps an existing entry — even if the slug, vertical sub-problem, or wording would differ. Same idea = duplicate, regardless of phrasing.
   - Existing: *"The Hidden Cost of a Manual Freight Sales Desk"* → REJECT *"Why Your Freight Sales Team Is Losing Money"*, *"What Manual Freight Sales Really Costs"*, or any new angle on manual freight sales waste.
   - Existing: *"The Follow-Up Gap: Where 80% of Freight Leads Die"* → REJECT new pieces on freight lead conversion, sales follow-up cadence, or dropped freight leads.
3. **Title-shape diversity check.** Compare your proposed title's syntactic template against the title shapes used by the **most recent 5 articles** in the ledger. Reject any proposal that reuses a saturated template (the ledger lists which templates are currently saturated). At most one of the most recent 5 articles may share any given template.
4. **Headline-number diversity check.** If your proposed title, excerpt, or seoDescription anchors on a number (a percentage, dollar figure, time saving, etc.), check whether that exact number is already on the ledger's "Banned headline numbers" list. If yes, pick a different anchor stat. The ledger explicitly bans **80%** as a headline number for now — use a different framing even if 80% is the most familiar shorthand.
5. **Recurring-phrase check.** Read the ledger's "Banned recurring phrases" list. If your draft uses any of those phrases or a close paraphrase, rewrite. These are saturated.
6. **Narrow the scope when in doubt.** *"AI for logistics"* (overlap risk) → *"AI carrier-matching for FTL brokers under 100 trucks"* (specific, fresh).
7. **Drift the vertical rotation if needed.** If you cannot find 3 fresh angles in the rotated vertical without triggering a banned pattern, rotate to the next vertical instead. Better to drift the rotation than ship a near-duplicate.

**Present the 3 options** to the user with one-line angles for each. If the run is non-interactive (see next section), skip the wait and go with option 1.

### Detecting non-interactive mode

Treat the run as non-interactive (auto-pick option 1) when **any** of the following is true:

- The invocation includes a `--auto` flag in the args.
- The invocation includes args like `auto`, `cron`, `scheduled`, `non-interactive`, `headless`.
- The skill was invoked by a scheduled remote agent (recognizable from the agent context — e.g., the user message mentions a cron run, or the conversation has no human responsiveness signal).
- The args contain something like "pick the first" or "go ahead".

Default to interactive (wait for user pick) when none of these signal applies.

## Step 2 — Draft the article

1. **Outline first.** Write the H2/H3 structure phrased as queries ("What is X?", "Why does X happen?", "What changes when…?", "Three signs worth checking…"). Decide the cluster type. Note your "what we won't give away" line — the line that prevents a reader from DIY-ing the answer. This is your Cardinal Rule guardrail.

2. **Draft the body.**
   - **First paragraph: 40–60 words, snippet-extractable direct answer.** This is what AI search engines pull as a citation. It must stand alone without context.
   - **Length:** 1,200–1,800 words for comparison/informational articles. 2,000–3,000 for playbooks. No padding to hit a count.
   - **Structure:** at least one comparison table OR a numbered list. Tables in MDX work because `remark-gfm` is wired in — write standard `| col | col |` syntax.
   - **Stats:** every number should be sourced. Cite generically when needed ("industry surveys consistently report…") but never fabricate specifics.
   - **Voice:** professional, welcoming, helping, non-pushy. Observation over blame. See `articles.md` Voice section.

3. **Write the closing CTA.** Always the **completely free automation audit**, linking `/contact`. Frame it as helpful diagnosis, not a sales call. Vary the wording each article — sample phrasings live in `articles.md` CTA section.

4. **Cardinal Rule self-check.** Before finalizing, re-read and ask: *"If a reader hands this article to a $20/hr freelancer, can they ship our service?"* If yes, rewrite. We describe outcomes and possibilities, never steps and tools.

## Step 3 — Slug and frontmatter

### Slug derivation

- Take the title.
- Drop leading `the`, `a`, `an`.
- Lowercase, ASCII-only, kebab-case (replace spaces and punctuation with `-`).
- Drop common stopwords mid-slug if needed to keep length reasonable.
- Truncate to ~60 characters at a word boundary.
- **Check `src/content/blog/` for collisions.** If the slug exists, append a single distinguishing word (e.g., `-pt2`, `-deepdive`) — do NOT silently overwrite.

### Frontmatter (all fields required)

```js
export const frontmatter = {
  title: "<Working title — under 60 chars when possible>",
  excerpt:
    "<~150 chars; shows on the blog index card; differs in wording from seoDescription>",
  date: "<today, YYYY-MM-DD — compute from system date>",
  author: "ApexifyLabs Team",
  tags: ["<Vertical>", "<Topic>", "<Intent>", "<Optional>"],
  heroImage: "/blog/<slug>/hero.svg",
  seoDescription:
    "<150–160 chars; ships as <meta name=description>; differs from excerpt>",
  readingTime: "<computed: word_count ÷ 400, rounded up. e.g. '4 min read'. We use 400 wpm (not the conventional 200) because the user has confirmed published times feel high; halving lands closer to perceived reading speed.>",
};
```

The MDX wrapper (`src/pages/BlogPost.tsx`) auto-generates `<Helmet>` + `BlogPosting` JSON-LD from this frontmatter. **Do not** add an inline `<Helmet>` block. The body of the MDX is just the article content (starting with the 40–60 word lead paragraph).

## Step 4 — Hero SVG

Write to `public/blog/<slug>/hero.svg`. Mandatory specs:

- **`viewBox="0 0 1500 1000"`** — 3:2 aspect, matches the blog index card exactly.
- **Content stays inside the centered safe zone (x: 100–1400, y: 125–875).** This is so the wider full-page hero (~2:1, which crops top/bottom of the SVG) doesn't lose anything important.
- **Brand colors only:**
  - `#001a36` / `#002347` — deep blue base (gradient).
  - `#00B5E2` — cyan accent.
  - `#cfe5f1` / `#7fb6d6` / `#5e8aa6` / `#0a3a66` — supporting tones.
- **Typography:** `Georgia, 'Times New Roman', serif` for serif (matches the site's blog hero font).
- **Layout:**
  - Small `THE JOURNAL` label, cyan, letter-spaced ~6, in upper section.
  - Title in white, large serif (~84 px), bold.
  - Optional subtitle in `#cfe5f1` opacity 0.9 (~36–40 px).
  - One thematic visual element below or beside the title — **vary this per article** (bar chart, before/after split, timeline, pipeline arrow, etc.). Do not reuse the same visual on every post.
- **Bottom-edge accent:** a 6px-tall accent bar at y=994 using a horizontal gradient stop pattern — gives the article visual identity. See existing `public/blog/follow-up-gap-freight-leads/hero.svg` for an example.

## Step 5 — Sitemap

Insert a new `<url>` entry into `public/sitemap.xml`, placed right before the `/privacy-policy` entry:

```xml
  <url>
    <loc>https://apexifylabs.com/blog/<slug></loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
```

Do **not** alter the order of existing entries.

## Step 6 — Verify

```bash
npm run build && npm run prerender
```

Both must succeed. **If either fails, do NOT commit.** Surface the failing output and stop. Common failure modes:
- Malformed MDX (unbalanced braces in frontmatter, JSX expressions in plain text).
- Missing required frontmatter field.
- Slug collision producing duplicate routes.
- Broken markdown table syntax.

After success, optionally spot-check `dist/blog/<slug>/index.html`:
- `<title>` is set (non-empty, includes the article title).
- `<meta name="description">` is present and matches the seoDescription.
- Body text length > 1,000 chars (full content prerendered, not a Suspense bailout).

## Step 7 — Update the topics ledger

Do this **before** the commit, so the ledger entry ships in the same commit as the article. The run is not finished until `published-articles.md` records the new article.

1. Open `.claude/skills/article-writer/published-articles.md`.
2. Add a one-line entry at the **top** of the `## Articles (newest first)` list, in the format shown at the bottom of that file: `- YYYY-MM-DD — <title> · <vertical> · `<slug>``.
3. Update the **Burned patterns** section at the top of the ledger if this article saturates a new pattern (e.g. a title shape, headline number, or phrase that has now appeared in 2+ articles within the last 5). Add it to the list. Conversely, remove an item if enough fresh articles have shipped on top that it's safe again. Keep the section short — only patterns that are genuinely saturated belong there.

## Step 8 — Commit and push

Each article is its **own** commit. Never bundle multiple articles in one commit. The ledger entry for this article ships in the same commit as the article — they are atomically linked, so reverting one reverts the other.

```bash
git add src/content/blog/<slug>.mdx public/blog/<slug>/ public/sitemap.xml \
        .claude/skills/article-writer/published-articles.md
git commit -m "Add: <article title>"
git push origin main
```

Commit message format: `Add: <article title>`. Short, descriptive. No conventional-commit prefix (matches existing repo style).

If `git push` fails (network, remote rejection, etc.), surface the error explicitly. Do not silently swallow failures — the scheduler needs to know if the routine broke.

## Operating in non-interactive (scheduled) mode

When invoked by a scheduled agent or with `--auto`:

- Generate 3 topic options as usual but **auto-pick option 1**.
- Run draft → write files → verify → commit → push end-to-end without pausing.
- Log every step to stdout: chosen vertical, picked title, slug, build status, commit hash, push result.
- On any failure (build, prerender, push), exit non-zero so the scheduler logs the failure.

## Things this skill must never do

- Write step-by-step technical tutorials with code or tool names. (Violates Cardinal Rule.)
- Use a byline other than `ApexifyLabs Team` unless the user explicitly overrides.
- Skip the build + prerender verification.
- Bundle multiple articles in one commit.
- Use a CTA other than the free automation audit.
- Open with a generic AI introduction ("In today's fast-paced world…").
- Include emojis in body copy.
- Use em dashes (—) in any article content (title, excerpt, seoDescription, body, headings, tables). Em dashes read as AI-generated boilerplate to readers and are explicitly banned. Use commas, periods, semicolons, colons, or parentheses instead. En dashes for numeric ranges (e.g. "50–70%", "$15M–$30M") are fine; only the wider em dash is banned.
- Cite unsourced numbers as if they were facts.
- Push directly to main if the build failed.
- Re-use a slug that already exists.
- Reuse a title shape, headline number, or recurring phrase listed under "Burned patterns" in `published-articles.md`. If the new topic genuinely needs one of these, surface a different angle in the title and excerpt and cite the saturated stat with a source inside the body.
- Ship an article without appending its entry to `published-articles.md`.

## Quick reference

| Field | Value |
|---|---|
| Source of truth (editorial) | `articles.md` at repo root |
| Source of truth (topics shipped) | `.claude/skills/article-writer/published-articles.md` (the ledger) |
| Tier 1 verticals | logistics · e-com ops · construction |
| Author byline | `ApexifyLabs Team` |
| CTA | Free automation audit → `/contact` |
| Hero SVG size | 1500×1000 (3:2), brand colors, content in safe zone |
| Frontmatter required | title, excerpt, seoDescription, date, author, tags, heroImage, readingTime |
| Verify command | `npm run build && npm run prerender` |
| Ship command | `git commit -m "Add: <title>" && git push origin main` |
| Auto-run flag | `--auto` (skips interactive pick, defaults to option 1) |
