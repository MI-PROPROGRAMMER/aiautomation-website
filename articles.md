# Articles — Strategy & Writing Rules

Source of truth for ApexifyLabs blog content. Read before drafting any article.

## Goal

Get cited in **AI search** (ChatGPT, Perplexity, Claude, Gemini, Google AI Mode) and **Google search** for our core queries. Aim: top 3 sources cited.

## Target keywords

AI automation · Agentic AI · AI software development · n8n · Chatbot development · AI for [vertical] · ROI / cost of not automating

## ICP — write for these

| Tier | Verticals | Treatment |
|---|---|---|
| **1 (90% of articles)** | Logistics / freight / 3PL · E-commerce ops ($2M–$30M) · Construction (GCs & subs) | Write *for* them by name |
| **2 (accept work, don't target)** | Trucking/fleet · Field services · Insurance · Multi-location healthcare | Don't anchor articles here yet |
| **3 (out of scope)** | Solopreneurs · sub-$1M revenue · $500-chatbot shoppers | Skip |

**Buyer:** owner / COO / Head of Ops at an operation-intensive business. Project budget **$2K–$5K+** or retainer **$1K–$2K+/mo**.

**Prototype vertical: logistics** — we already have a sales solution shipped, so first articles ride that proof.

## The Cardinal Rule — Curiosity, not coaching

We do not teach buyers to DIY. If a reader can replicate our service after reading, the article fails.

**Write:** cost of inaction · post-automation vision · what's now possible · strategic framing · before/after comparisons.

**Don't write:** step-by-step builds · working code · tool tutorials · generic listicles.

**Reader should finish thinking:** *"We're leaving money on the table — I need to talk to someone who does this."*

## Article mix

| % | Type | Purpose |
|---|------|---------|
| 40% | **Before/After comparisons** | Make the transformation obvious — manual ops vs. AI-augmented ops |
| 40% | **Informational ("what is", "why", "X vs Y")** | Catch AI-search & Google for category queries |
| 20% | **Playbooks / original references** | Build authority — high-value framing, never the full recipe |

## Voice

Confident, practical, operator-friendly. Specific numbers over vague claims. Short paragraphs. No hype, no buzzwords, no "revolutionize your business."

## Structural requirements (every article)

- Direct answer in **first paragraph** (40–60 words — snippet-extractable).
- **H2/H3 headings phrased as queries** ("What is X?", "X vs Y", "When to use X?").
- At least **one comparison table** OR **numbered list**.
- **Concrete numbers / examples**; cite external stats.
- **Frontmatter drives all SEO** — `BlogPost.tsx` auto-generates `<Helmet>` + `BlogPosting` JSON-LD. Required fields: `title`, `excerpt`, `seoDescription` (~150–160 chars), `heroImage`, `date`, `author`, `tags`, `readingTime`. Add inline `FAQPage` JSON-LD only if the post has a real Q&A section.
- Update `public/sitemap.xml` on ship.

## Length

- Comparison / informational: **1,200–1,800 words**.
- Playbooks: **2,000–3,000 words**.
- No padding. End when it's done.

## CTA

End with one specific next step — pilot offer, service page, or framework download. **Never** a generic newsletter signup.

## Process

1. Pick topic → confirm tier-1 vertical + intent cluster.
2. Outline headings + claims + **"what we won't give away"** line.
3. Draft → Cardinal Rule check.
4. MDX file in `src/content/blog/`, hero in `public/blog/<slug>/`.
5. Update `public/sitemap.xml`.
6. `npm run build && npm run prerender` to verify.

## Banned

- Generic AI intros ("In today's fast-paced world…")
- Listicles without an editorial POV
- Tutorials a freelancer could ship from
- Pricing / implementation-detail giveaways
- Emojis in body copy
- Unsourced statistics
