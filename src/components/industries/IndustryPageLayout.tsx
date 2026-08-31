import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { BentoTile, ChapterMarker } from "@/components/ui/editorial";
import type { IndustryPageContent } from "@/content/industries/types";
import { SERVICES, getPostsByVertical } from "@/lib/blog-taxonomy";
import { ORG_ID, SITE_URL, buildBreadcrumbs, buildFAQPage } from "@/lib/seo";

/**
 * Shared shell for the industry pages.
 *
 * Same contract as ServicePageLayout: this owns the SEO surface and the section
 * rhythm, every word comes from `content`, and the visible FAQ list and the
 * FAQPage JSON-LD both derive from `content.faqs` so structured data cannot
 * describe an answer the page does not show.
 *
 * The statistic is rendered as visible text with a real outbound anchor to its
 * source. That link is the point — an uncited number is weaker than no number,
 * and the citation is what makes the passage worth quoting.
 *
 * Sections are static, with no scroll-triggered reveals: these are long-form
 * buyer pages, and `opacity: 0` until JavaScript runs would hide their
 * substance from anything reading the prerendered HTML.
 */
export const IndustryPageLayout = ({ content }: { content: IndustryPageContent }) => {
  const pageUrl = `${SITE_URL}${content.path}`;
  const posts = content.vertical ? getPostsByVertical(content.vertical) : [];
  const ctaService = SERVICES[content.cta.service];

  return (
    <>
      <Helmet>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
        <meta property="og:title" content={content.meta.ogTitle} />
        <meta property="og:description" content={content.meta.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${SITE_URL}/hero-automation.jpg`} />
        <meta name="twitter:title" content={content.meta.ogTitle} />
        <meta name="twitter:description" content={content.meta.ogDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/hero-automation.jpg`} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${pageUrl}#service`,
          name: content.schema.name,
          url: pageUrl,
          description: content.schema.description,
          serviceType: content.schema.serviceType,
          provider: { "@id": ORG_ID },
          areaServed: "Worldwide",
          audience: { "@type": "Audience", audienceType: content.schema.audience },
        }}
      />

      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Industries", url: `${SITE_URL}/services` },
          { name: content.name, url: pageUrl },
        ])}
      />

      <JsonLd data={buildFAQPage(content.faqs)} />

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero — answer first, so the extractable passage leads the page */}
          <section className="relative overflow-hidden gradient-hero pb-16 pt-28 md:pb-24 md:pt-40">
            <div className="absolute inset-0 opacity-25" aria-hidden="true">
              <div className="absolute -right-32 top-0 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -left-32 bottom-0 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <nav
                  aria-label="Breadcrumb"
                  className="smallcaps text-[0.65rem] text-primary-foreground/55"
                >
                  <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <li>
                      <Link
                        to="/"
                        className="cursor-pointer transition-colors duration-200 hover:text-accent"
                      >
                        Home
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li className="text-primary-foreground/80">{content.name}</li>
                  </ol>
                </nav>

                <h1 className="mt-8 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl lg:text-7xl">
                  {content.headline.lead}{" "}
                  <span className="text-gradient-accent">{content.headline.emphasis}</span>
                </h1>

                <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-16">
                  <p className="text-lg leading-relaxed text-primary-foreground/80 md:col-span-7 md:text-xl">
                    {content.answer}
                  </p>

                  <div className="md:col-span-5">
                    <BentoTile tone="feature" rounded="xl" className="p-7">
                      <p className="font-display text-4xl font-bold leading-none text-accent md:text-5xl">
                        {content.stat.value}
                      </p>
                      <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
                        {content.stat.label}
                      </p>
                      <a
                        href={content.stat.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="smallcaps mt-5 inline-flex cursor-pointer items-center gap-1.5 text-[0.65rem] text-primary-foreground/60 transition-colors duration-200 hover:text-accent"
                      >
                        {content.stat.source} · {content.stat.asOf}
                        <ExternalLink size={12} />
                      </a>
                    </BentoTile>
                  </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <Button asChild className="gradient-accent hover-lift glow-accent">
                    <Link to="/contact" className="cursor-pointer">
                      Book a free automation audit
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/services" className="cursor-pointer">
                      See all services
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Problems */}
          <Section tone="alt">
            <SectionHeader
              number="01"
              label="The problem"
              heading={content.problems.heading}
              intro={content.problems.intro}
            />
            <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
              {content.problems.items.map((item) => (
                <BentoTile key={item.title} rounded="xl" className="p-7 md:p-9">
                  <h3 className="text-xl font-bold text-primary-foreground md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-primary-foreground/75">
                    {item.body}
                  </p>
                </BentoTile>
              ))}
            </div>
          </Section>

          {/* The three services, applied to this industry */}
          <Section tone="primary">
            <SectionHeader
              number="02"
              label="How it helps"
              heading={content.angles.heading}
              intro={content.angles.intro}
            />
            <div className="mt-16 flex flex-col gap-8">
              {content.angles.items.map((angle) => {
                const service = SERVICES[angle.service];
                return (
                  <BentoTile
                    key={angle.service}
                    tone="feature"
                    rounded="xl"
                    className="p-7 md:p-10"
                  >
                    <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                      <div className="md:col-span-6">
                        <h3 className="text-2xl font-bold leading-tight text-primary-foreground md:text-3xl">
                          {angle.heading}
                        </h3>
                        <p className="mt-5 text-base leading-relaxed text-primary-foreground/75">
                          {angle.body}
                        </p>
                        <Link
                          to={service.path}
                          className="mt-6 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-foreground"
                        >
                          <span className="border-b border-accent/40 pb-0.5">
                            Explore {service.name}
                          </span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                      <ul className="flex flex-col gap-3 md:col-span-6">
                        {angle.outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="flex gap-3 text-base leading-relaxed text-primary-foreground/80"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </BentoTile>
                );
              })}
            </div>
          </Section>

          {/* Workflows */}
          <Section tone="alt">
            <SectionHeader
              number="03"
              label="Workflows"
              heading={content.workflows.heading}
              intro={content.workflows.intro}
            />
            <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
              {content.workflows.items.map((item) => (
                <li
                  key={item}
                  className="bg-[hsl(var(--section-alt))] px-6 py-5 text-base text-primary-foreground/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Comparison */}
          <Section tone="primary">
            <SectionHeader
              number="04"
              label="Comparison"
              heading={content.comparison.heading}
              intro={content.comparison.intro}
            />
            <div className="mt-14 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <thead>
                  <tr className="bg-white/[0.04]">
                    {content.comparison.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="smallcaps border-b border-white/10 px-5 py-4 text-[0.65rem] text-primary-foreground/70"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.comparison.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-white/[0.06] last:border-b-0">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={content.comparison.columns[cellIndex]}
                          className={
                            cellIndex === 0
                              ? "px-5 py-5 align-top text-base font-semibold text-primary-foreground"
                              : "px-5 py-5 align-top text-base leading-relaxed text-primary-foreground/75"
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Further reading — only where the blog actually covers this industry */}
          {posts.length > 0 && (
            <Section tone="alt">
              <SectionHeader
                number="05"
                label="Further reading"
                heading={`Written on ${content.name.toLowerCase()} operations.`}
                intro={`${posts.length} articles on the specific failures this industry runs into, and what changes when they are automated.`}
              />
              <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
                {posts.map((post) => (
                  <li key={post.slug} className="bg-[hsl(var(--section-alt))]">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex h-full cursor-pointer flex-col gap-2 p-6 transition-colors duration-200 hover:bg-white/[0.03]"
                    >
                      <span className="font-display text-lg font-bold leading-snug text-primary-foreground transition-colors duration-200 group-hover:text-accent">
                        {post.frontmatter.title}
                      </span>
                      <span className="text-sm leading-relaxed text-primary-foreground/65">
                        {post.frontmatter.excerpt}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* FAQ — same array as the FAQPage JSON-LD above */}
          <Section tone="primary">
            <SectionHeader
              number={posts.length > 0 ? "06" : "05"}
              label="Questions"
              heading="Questions we get asked."
              intro=""
            />
            <div className="mt-14 flex flex-col gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
              {content.faqs.map((faq) => (
                <div key={faq.question} className="bg-primary px-6 py-7 md:px-9">
                  <h3 className="text-lg font-bold text-primary-foreground md:text-xl">
                    {faq.question}
                  </h3>
                  <p className="mt-3 max-w-4xl text-base leading-relaxed text-primary-foreground/75">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <Section tone="alt">
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] px-6 py-12 md:px-12 md:py-16">
              <ChapterMarker number="" label="Next step" />
              <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-primary-foreground md:text-4xl">
                {content.cta.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
                {content.cta.body}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild className="gradient-accent hover-lift glow-accent">
                  <Link to={ctaService.path} className="cursor-pointer">
                    Explore {ctaService.name}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Link
                  to="/contact"
                  className="cursor-pointer text-sm font-semibold text-primary-foreground/70 underline decoration-primary-foreground/25 underline-offset-4 transition-colors duration-200 hover:text-accent"
                >
                  Or book a free automation audit
                </Link>
              </div>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
};

const Section = ({ tone, children }: { tone: "primary" | "alt"; children: ReactNode }) => (
  <section
    className={`py-20 md:py-28 ${tone === "alt" ? "bg-[hsl(var(--section-alt))]" : "bg-primary"}`}
  >
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  </section>
);

const SectionHeader = ({
  number,
  label,
  heading,
  intro,
}: {
  number: string;
  label: string;
  heading: string;
  intro: string;
}) => (
  <div className="grid gap-10 md:grid-cols-12 md:gap-16">
    <div className="md:col-span-6">
      <ChapterMarker number={number} label={label} />
      <h2 className="mt-6 text-3xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
        {heading}
      </h2>
    </div>
    {intro !== "" && (
      <div className="md:col-span-6 md:pt-14">
        <p className="text-lg leading-relaxed text-primary-foreground/75">{intro}</p>
      </div>
    )}
  </div>
);
