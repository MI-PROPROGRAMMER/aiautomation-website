# SEO Launch Checklist

Everything here is performed **by the account owner**, by hand, after the technical
SEO foundation is deployed. Nothing in this repository submits anything to a search
engine, and no automated step in this project should ever be given credentials to do
so. Work top to bottom: the Vercel preview gate blocks production, and production
verification blocks Search Console submission.

Related build-time guarantees (already automated, no action needed):

- `npm run generate:sitemap` regenerates `public/sitemap.xml` from published content.
- `npm run prerender` writes static HTML per route plus `dist/404.html`.
- `npm run validate:seo` fails the build if titles, descriptions, canonicals, `<h1>`
  counts, sitemap coverage, or the 404 document regress.

---

## 0. Pre-production gate — Vercel preview (hard requirement)

**Do not promote to production until this passes.** `vercel.json` no longer contains a
catch-all rewrite, so page requests are served from static route output. Vite's preview
server cannot verify this: its SPA history fallback answers `200` for every path,
including unknown ones. Only a real Vercel deployment proves the routing.

Deploy a preview through the project's normal Vercel workflow, then:

```bash
SEO_PREVIEW_ORIGIN="https://<preview-deployment>.vercel.app"
curl -I "${SEO_PREVIEW_ORIGIN}/"
curl -I "${SEO_PREVIEW_ORIGIN}/services"
curl -I "${SEO_PREVIEW_ORIGIN}/blog"
curl -I "${SEO_PREVIEW_ORIGIN}/blog/ddp-vs-dap-shipping-dtc-cross-border-margin-story"
curl -I "${SEO_PREVIEW_ORIGIN}/this-page-does-not-exist"
```

| Request | Required response |
| --- | --- |
| `/`, `/services`, `/blog`, any published article | `HTTP/2 200` |
| `/this-page-does-not-exist` | `HTTP/2 404` |

If a **known** route returns anything but `200`, stop and report the exact response.
Do **not** restore a broad SPA rewrite to make it green: a rewrite that returns `200`
for unknown paths is the soft-404 defect this phase removed, and it lets crawlers index
arbitrary URLs as duplicates of the homepage.

---

## 1. Production verification

Run each URL after the production deploy. Check the HTTP status, the canonical tag, the
indexability directive, and whether the URL belongs in the sitemap.

| URL | Status | Canonical | Indexable | In sitemap |
| --- | --- | --- | --- | --- |
| `https://apexifylabs.com/` | 200 | `https://apexifylabs.com/` | yes | yes |
| `https://apexifylabs.com/robots.txt` | 200 | n/a | n/a — must list `Sitemap: https://apexifylabs.com/sitemap.xml` | no |
| `https://apexifylabs.com/sitemap.xml` | 200, `content-type: application/xml` | n/a | n/a | n/a — it is the sitemap |
| `https://apexifylabs.com/services` | 200 | `https://apexifylabs.com/services` | yes | yes |
| `https://apexifylabs.com/blog` | 200 | `https://apexifylabs.com/blog` | yes | yes |
| `https://apexifylabs.com/blog/ddp-vs-dap-shipping-dtc-cross-border-margin-story` | 200 | same URL | yes | yes |
| `https://apexifylabs.com/this-page-does-not-exist` | **404** | **none** | **no** — `<meta name="robots" content="noindex, follow">` | no |

Checks worth running explicitly:

```bash
curl -sI https://apexifylabs.com/sitemap.xml | grep -i '^HTTP/\|^content-type'
curl -s https://apexifylabs.com/sitemap.xml | grep -c '<loc>'          # expect 102
curl -s https://apexifylabs.com/robots.txt | grep -i sitemap
curl -s https://apexifylabs.com/this-page-does-not-exist | grep -o 'content="noindex, follow"'
```

Two things a passing 404 must show: the status line really says `404`, **and** the body
is the branded not-found page carrying `noindex, follow`. A `200` with that page is
still a soft 404 and is a failure.

The canonical URL count is `102` at the time of writing and changes whenever an article
is published. The sitemap is generated, so treat a mismatch as a build problem, not
something to patch by hand.

---

## 2. Google Search Console

1. **Create a Domain property** for `apexifylabs.com`. Domain (not URL-prefix) covers
   `http`/`https`, `www`/apex, and every path in one property.
2. **Verify with a DNS TXT record** at the registrar/DNS host. Verification can take up
   to a few hours to propagate; retry rather than creating a second property.
3. **Submit the sitemap.** Sitemaps → *Add a new sitemap*.

   > **Submit exactly `https://apexifylabs.com/sitemap.xml`.**
   >
   > Before submitting, confirm the file answers `200` with `content-type: application/xml`
   > (see the curl above). **Never submit `/sitemap`.** That path has no file behind it and
   > now returns a real `404` — Search Console records the submission as *Couldn't fetch*
   > and keeps reporting the failure against the property until the bad entry is deleted.
   > If a wrong path was already submitted, delete that sitemap entry, then add the correct
   > `.xml` URL.

4. **Inspect representative URLs** with the URL Inspection tool:
   - `https://apexifylabs.com/`
   - `https://apexifylabs.com/services`
   - `https://apexifylabs.com/blog`
   - the newest article (currently `https://apexifylabs.com/blog/ddp-vs-dap-shipping-dtc-cross-border-margin-story`)

   For each, confirm the crawled page shows the real rendered content and the canonical
   Google selected matches the declared canonical.
5. **Request indexing** for those four URLs. Request indexing for representative pages
   only — it is a per-URL nudge, not a bulk tool, and the sitemap covers the rest.
6. **After data arrives** (typically a few days, longer for Core Web Vitals), review:
   - **Page Indexing** — investigate anything under *Not indexed*, especially
     *Duplicate without user-selected canonical*, *Soft 404*, or *Crawled – currently not
     indexed*. Soft-404 reports were the specific defect this phase fixed; their absence
     is the confirmation that the fix took.
   - **Core Web Vitals** and **Mobile Usability** — field data only appears once the
     property has enough traffic.

---

## 3. Bing Webmaster Tools

1. Add `apexifylabs.com`. The fastest path is **Import from Google Search Console**,
   which carries over verification and the submitted sitemap. Otherwise verify with the
   DNS TXT record method.
2. **Submit `https://apexifylabs.com/sitemap.xml`** — same exact URL, same rule: never
   the extensionless `/sitemap`.
3. Review **Site Explorer** and the crawl error report for 404s and blocked URLs. Expect
   `/this-page-does-not-exist`-style paths to appear as legitimate 404s; that is correct
   behaviour, not an error to fix.
4. **IndexNow is a later enhancement, not part of this launch.** It notifies Bing on
   publish and needs a key file plus a deploy hook. Revisit it once publishing cadence
   justifies it.

---

## 4. Ongoing

- Publishing an article regenerates the sitemap on the next build. No manual sitemap
  edit is ever needed, and hand-editing `public/sitemap.xml` will be overwritten.
- Resubmitting the sitemap after every post is unnecessary — both engines re-fetch a
  submitted sitemap on their own schedule.
- Set `updated: "YYYY-MM-DD"` in an article's frontmatter **only** when its content was
  materially revised. It drives both `<lastmod>` and the `dateModified` in the article's
  structured data, so an inaccurate value misreports freshness.
