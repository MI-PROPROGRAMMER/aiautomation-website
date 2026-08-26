import type { ReactNode } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { BentoTile, ChapterMarker, HairlineRule } from "@/components/ui/editorial";
import { CALENDLY_LINK } from "@/config/constants";
import { getPortfolioItem } from "@/content/portfolio";
import type { ServicePageContent } from "@/content/services/types";
import { ORG_ID, SITE_URL, buildBreadcrumbs, buildFAQPage } from "@/lib/seo";

/**
 * Shared shell for the three specialist commercial service pages.
 *
 * It owns the page's SEO surface and section rhythm; every word of the copy
 * comes from the `content` object. The FAQ list below and the FAQPage JSON-LD
 * are both derived from `content.faqs`, which is the whole point of routing
 * these pages through one layout: structured data cannot describe an answer the
 * page does not show.
 *
 * These sections are deliberately static — no framer-motion reveals. The pages
 * are long-form buyer reading, and scroll-triggered `opacity: 0` would leave
 * their substance invisible until JavaScript runs.
 */
export const ServicePageLayout = ({ content }: { content: ServicePageContent }) => {
  const pageUrl = `${SITE_URL}${content.path}`;

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
        }}
      />

      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Services", url: `${SITE_URL}/services` },
          { name: content.breadcrumbName, url: pageUrl },
        ])}
      />

      <JsonLd data={buildFAQPage(content.faqs)} />

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero — editorial, left aligned, matching /services and /about */}
          <section className="relative overflow-hidden pt-28 md:pt-40 pb-16 md:pb-24 gradient-hero">
            <div className="absolute inset-0 opacity-25" aria-hidden="true">
              <div className="absolute -right-32 top-0 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -left-32 bottom-0 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <nav aria-label="Breadcrumb" className="smallcaps text-[0.65rem] text-primary-foreground/55">
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
                    <li>
                      <Link
                        to="/services"
                        className="cursor-pointer transition-colors duration-200 hover:text-accent"
                      >
                        Services
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="text-accent/90">
                      {content.breadcrumbName}
                    </li>
                  </ol>
                </nav>

                <div className="mt-8">
                  <ChapterMarker number="" label={content.eyebrow} />
                </div>

                <h1 className="mt-8 max-w-5xl text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  {content.headline.lead}
                  <span className="block font-normal text-gradient">{content.headline.emphasis}</span>
                </h1>

                {/* The direct answer: what it is, who it is for, the outcome. */}
                <p className="mt-10 max-w-3xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                  {content.answer}
                </p>

                <p className="mt-6 max-w-3xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
                  {content.intro}
                </p>

                <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Button
                    size="lg"
                    className="gradient-accent hover-lift glow-accent sheen-card cursor-pointer px-10 py-6"
                    asChild
                  >
                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                      Book a free consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="group cursor-pointer text-primary-foreground/85 transition-colors duration-200 hover:bg-transparent hover:text-accent"
                    asChild
                  >
                    <Link to="/contact">
                      <span className="border-b border-primary-foreground/30 pb-1 transition-colors duration-200 group-hover:border-accent">
                        Send us the details instead
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Problems solved */}
          <Section tone="alt">
            <SectionHeader number="01" label="Problems Solved" heading={content.problems.heading} intro={content.problems.intro} />
            <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
              {content.problems.items.map((item, index) => (
                <div key={item.title}>
                  <div className="num-display text-2xl text-primary-foreground/45">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-primary-foreground md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-primary-foreground/70">{item.body}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Use cases */}
          <Section tone="primary">
            <SectionHeader number="02" label="Use Cases" heading={content.useCases.heading} intro={content.useCases.intro} />
            <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
              {content.useCases.items.map((item, index) => (
                <BentoTile
                  key={item.title}
                  tone={index % 3 === 0 ? "feature" : index % 3 === 1 ? "flat" : "recessed"}
                  rounded="lg"
                  className="p-7 md:p-9"
                >
                  <h3 className="text-lg font-bold text-primary-foreground md:text-xl">{item.title}</h3>
                  <div className="hairline-soft my-5" aria-hidden="true" />
                  <p className="text-base leading-relaxed text-primary-foreground/75">{item.body}</p>
                </BentoTile>
              ))}
            </div>
          </Section>

          {/* Deliverables + process */}
          <Section tone="alt">
            <div className="grid gap-16 md:grid-cols-12 md:gap-20">
              <div className="md:col-span-5">
                <ChapterMarker number="03" label="Deliverables" />
                <h2 className="mt-6 text-3xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
                  {content.deliverables.heading}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75">
                  {content.deliverables.intro}
                </p>
                <ul className="mt-10 space-y-6">
                  {content.deliverables.items.map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                      <span>
                        <span className="block font-semibold text-primary-foreground">{item.title}</span>
                        <span className="mt-1 block text-base leading-relaxed text-primary-foreground/70">
                          {item.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-7">
                <ChapterMarker number="04" label="How Delivery Works" />
                <h2 className="mt-6 text-3xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
                  {content.process.heading}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75">{content.process.intro}</p>
                <ol className="mt-10 space-y-8">
                  {content.process.steps.map((step, index) => (
                    <li key={step.name} className="grid grid-cols-[auto_1fr] gap-6">
                      <span className="num-display text-3xl text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="flex flex-wrap items-baseline gap-x-4">
                          <span className="text-xl font-bold text-primary-foreground">{step.name}</span>
                          <span className="smallcaps text-[0.65rem] text-primary-foreground/55">{step.meta}</span>
                        </span>
                        <span className="mt-2 block text-base leading-relaxed text-primary-foreground/70">
                          {step.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Section>

          {/* Technical capabilities */}
          <Section tone="primary">
            <SectionHeader
              number="05"
              label="Capabilities"
              heading={content.capabilities.heading}
              intro={content.capabilities.intro}
            />
            <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
              {content.capabilities.groups.map((group) => (
                <BentoTile key={group.name} tone="bare" rounded="lg" className="p-7 md:p-9">
                  <span className="eyebrow">{group.name}</span>
                  <ul className="mt-6 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-primary-foreground/85">
                        <span className="mt-2 inline-block h-1 w-4 bg-accent" aria-hidden="true" />
                        <span className="text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </BentoTile>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-primary-foreground/60">
              {content.capabilities.note}
            </p>
          </Section>

          {/* Comparison table */}
          <Section tone="alt">
            <SectionHeader
              number="06"
              label="How It Compares"
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
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-primary-foreground/60">
              {content.comparison.note}
            </p>
          </Section>

          {/* Good fit / not a good fit */}
          <Section tone="primary">
            <SectionHeader number="07" label="Fit" heading={content.fit.heading} intro={content.fit.intro} />
            <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
              <BentoTile tone="feature" rounded="xl" className="p-7 md:p-10">
                <h3 className="text-xl font-bold text-primary-foreground md:text-2xl">{content.fit.goodHeading}</h3>
                <div className="hairline my-7" aria-hidden="true" />
                <ul className="space-y-4">
                  {content.fit.good.map((item) => (
                    <li key={item} className="flex gap-4 text-base leading-relaxed text-primary-foreground/85">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </BentoTile>

              <BentoTile tone="recessed" rounded="xl" className="p-7 md:p-10">
                <h3 className="text-xl font-bold text-primary-foreground md:text-2xl">{content.fit.badHeading}</h3>
                <div className="hairline-soft my-7" aria-hidden="true" />
                <ul className="space-y-4">
                  {content.fit.bad.map((item) => (
                    <li key={item} className="flex gap-4 text-base leading-relaxed text-primary-foreground/75">
                      <X className="mt-1 h-4 w-4 shrink-0 text-primary-foreground/40" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </BentoTile>
            </div>
          </Section>

          {/* Engagement and pricing approach */}
          <Section tone="alt">
            <SectionHeader
              number="08"
              label="Engagement"
              heading={content.engagement.heading}
              intro={content.engagement.intro}
            />
            <div className="mt-14 grid gap-16 md:grid-cols-12 md:gap-20">
              <div className="space-y-6 text-lg leading-relaxed text-primary-foreground/80 md:col-span-7">
                {content.engagement.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="text-base text-primary-foreground/65">
                  Everything we build is handed over the way it is described on our{" "}
                  <Link
                    to="/about"
                    className="cursor-pointer text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                  >
                    about page
                  </Link>{" "}
                  — source in your repository, credentials in your accounts, a written runbook, and a 30-day
                  defect warranty.
                </p>
              </div>
              <ul className="space-y-8 md:col-span-5">
                {content.engagement.points.map((point) => (
                  <li key={point.title}>
                    <span className="eyebrow">{point.title}</span>
                    <p className="mt-3 text-base leading-relaxed text-primary-foreground/70">{point.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* FAQs — rendered from the same array that feeds FAQPage JSON-LD */}
          <Section tone="primary">
            <SectionHeader number="09" label="Frequently Asked" heading="Questions buyers actually ask." intro="" />
            <HairlineRule className="mt-12" />
            <dl className="mt-4">
              {content.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-white/[0.08] py-8 last:border-b-0">
                  <dt className="text-xl font-bold text-primary-foreground md:text-2xl">{faq.question}</dt>
                  <dd className="mt-4 max-w-4xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          {/*
            Proof. Every project here is one already published in Selected Work
            on the homepage, rendered from the same data — see
            src/content/portfolio.ts. The page contributes only the `relevance`
            line; it never restates a project as something it is not, and it
            claims no metric the demo does not show.
          */}
          <Section tone="alt">
            <SectionHeader
              number="10"
              label="Relevant Work"
              heading={content.work.heading}
              intro={content.work.intro}
            />
            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {content.work.items.map(({ id, relevance }) => {
                const project = getPortfolioItem(id);
                return (
                  <article key={id}>
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                      {project.media.kind === "video" ? (
                        <video
                          src={project.media.src}
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={project.media.alt}
                          className="aspect-[16/10] w-full bg-black object-contain"
                        />
                      ) : (
                        <img
                          src={project.media.src}
                          alt={project.media.alt}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[16/10] w-full object-contain p-3"
                        />
                      )}
                    </div>
                    <span className="eyebrow mt-6 block">{project.eyebrow}</span>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-primary-foreground md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-primary-foreground/75">{project.body}</p>
                    <p className="mt-4 text-base leading-relaxed text-primary-foreground/60">{relevance}</p>
                  </article>
                );
              })}
            </div>
            <p className="mt-12 text-base text-primary-foreground/65">
              The full set, with the demos playable, is in{" "}
              <Link
                to="/#selected-work"
                className="cursor-pointer text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
              >
                selected work on the homepage
              </Link>
              . These are working systems rather than case studies: we publish no client names, revenue figures,
              or performance percentages we cannot stand behind.
            </p>
          </Section>

          {/* Supporting articles — the informational half of the topic cluster */}
          <Section tone="alt">
            <SectionHeader
              number="11"
              label="Further Reading"
              heading={content.articles.heading}
              intro={content.articles.intro}
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
              {content.articles.items.map((article) => (
                <BentoTile key={article.slug} tone="flat" rounded="lg" className="p-7 md:p-8">
                  <h3 className="text-lg font-bold leading-snug text-primary-foreground md:text-xl">
                    <Link
                      to={`/blog/${article.slug}`}
                      className="cursor-pointer transition-colors duration-200 hover:text-accent"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-primary-foreground/70">{article.blurb}</p>
                </BentoTile>
              ))}
            </div>
            <p className="mt-10 text-base text-primary-foreground/65">
              More operator write-ups live in{" "}
              <Link
                to="/blog"
                className="cursor-pointer text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
              >
                the ApexifyLabs journal
              </Link>
              , and the full engagement menu is on{" "}
              <Link
                to="/services"
                className="cursor-pointer text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
              >
                our AI automation services page
              </Link>
              .
            </p>
          </Section>

          {/* Single conversion action, same one used across the site */}
          <Section tone="primary">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
                {content.cta.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75">{content.cta.body}</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="gradient-accent hover-lift glow-accent sheen-card cursor-pointer px-10 py-6"
                  asChild
                >
                  <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                    Book a free consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-accent/40 px-10 py-6 text-primary-foreground transition-colors duration-200 hover:bg-accent/10 hover:text-accent"
                  asChild
                >
                  <Link to="/contact">Contact ApexifyLabs</Link>
                </Button>
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
      <h2 className="mt-6 text-3xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">{heading}</h2>
    </div>
    {intro !== "" && (
      <div className="md:col-span-6 md:pt-14">
        <p className="text-lg leading-relaxed text-primary-foreground/75">{intro}</p>
      </div>
    )}
  </div>
);
