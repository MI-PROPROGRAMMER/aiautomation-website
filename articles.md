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

**Professional, welcoming, and genuinely helpful.** We sound like a senior advisor explaining a problem to an operator — not a salesperson pitching them.

- **Confident, practical, operator-friendly.** Specific numbers beat vague claims. Short paragraphs. No hype, no buzzwords, no "revolutionize your business."
- **Welcoming, not aggressive.** Meet the reader where they are. Acknowledge that this work is hard. Avoid blame language ("you're losing money because…") and accusatory framings ("your desk is bleeding…"). Prefer observation: "many freight desks see this pattern."
- **Helpful, not pushy.** Lead with insight that's useful even to a reader who never hires us. Earn the click on the CTA by being valuable first.
- **Direction without pressure.** Throughout the article, hint that this kind of problem is solvable and that we solve it — without hard-pitching mid-content. The pitch lives in the closing CTA.

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

## CTA — always the free audit

Every article ends with the same offer: **a completely free automation audit.**

- Wording can vary, but the offer is always free, always an audit, always low-friction.
- Link to `/contact`.
- Frame it as helpful diagnosis, not a sales call. The reader should feel "this might actually be useful," not "I'm being closed."
- Examples of acceptable phrasings:
  - "If this sounds like your desk, we offer a **completely free automation audit** — no commitment, no slide deck. → [Book yours](/contact)"
  - "We run a **free automation audit** for ops-heavy teams that want a second opinion before committing to anything. → [Request the audit](/contact)"
  - "Curious what this would look like on your desk? **Book a free audit** and we'll map it for you. → [Start here](/contact)"
- **Never** a generic newsletter signup, "Talk to us," or "Schedule a demo" line — those feel transactional.

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
