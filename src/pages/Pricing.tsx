import { ArrowRight, Check } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { BentoTile, ChapterMarker } from "@/components/ui/editorial";
import {
  PRICING_FAQS,
  PRICING_INCLUDED,
  PRICING_INTRO,
  PRICING_PAYMENT,
  PRICING_TIERS,
  PRICING_UPDATED,
} from "@/content/pricing";
import { ORG_ID, SITE_URL, buildBreadcrumbs, buildFAQPage } from "@/lib/seo";

/**
 * Published pricing.
 *
 * Every figure comes from `src/content/pricing.ts`, which also generates
 * `public/pricing.md` — so the page a buyer reads and the file an AI agent
 * parses cannot quote different numbers. The FAQ list and the FAQPage JSON-LD
 * likewise render from one array.
 */
const Pricing = () => {
  const pageUrl = `${SITE_URL}/pricing`;

  return (
    <>
      <Helmet>
        <title>Pricing — AI Automation Projects & Retainers</title>
        <meta
          name="description"
          content="What AI automation costs at ApexifyLabs: focused workflows from $2,000, comprehensive systems $10,000–$50,000, and custom enterprise engagements. Written cost-benefit analysis before any work begins."
        />
        <meta property="og:title" content="AI Automation Pricing — ApexifyLabs" />
        <meta
          property="og:description"
          content="Focused workflows from $2,000. Comprehensive systems $10,000–$50,000. Source code delivered to your repository, 30-day defect warranty."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${SITE_URL}/hero-automation.jpg`} />
        <meta name="twitter:title" content="AI Automation Pricing — ApexifyLabs" />
        <meta
          name="twitter:description"
          content="Focused workflows from $2,000. Comprehensive systems $10,000–$50,000."
        />
        <meta name="twitter:image" content={`${SITE_URL}/hero-automation.jpg`} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${pageUrl}#service`,
          name: "AI automation services",
          url: pageUrl,
          description:
            "Custom AI automation and agentic systems, scoped per engagement with written acceptance criteria and source-code delivery.",
          provider: { "@id": ORG_ID },
          areaServed: "Worldwide",
          offers: PRICING_TIERS.filter((tier) => tier.schema).map((tier) => ({
            "@type": "Offer",
            name: tier.name,
            description: tier.bestFor,
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: tier.schema?.minPrice,
              ...(tier.schema?.maxPrice ? { maxPrice: tier.schema.maxPrice } : {}),
            },
          })),
        }}
      />

      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Pricing", url: pageUrl },
        ])}
      />

      <JsonLd data={buildFAQPage(PRICING_FAQS)} />

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero */}
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
                    <li className="text-primary-foreground/80">Pricing</li>
                  </ol>
                </nav>

                <h1 className="mt-8 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl lg:text-7xl">
                  What AI automation{" "}
                  <span className="text-gradient-accent">actually costs.</span>
                </h1>

                <p className="mt-10 max-w-3xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
                  {PRICING_INTRO}
                </p>
              </div>
            </div>
          </section>

          {/* Tiers */}
          <section className="bg-[hsl(var(--section-alt))] py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                  {PRICING_TIERS.map((tier) => (
                    <BentoTile
                      key={tier.name}
                      tone={tier.featured ? "feature" : undefined}
                      rounded="xl"
                      className="flex flex-col p-7 md:p-9"
                    >
                      {tier.featured && (
                        <span className="smallcaps mb-4 inline-block w-fit rounded-sm bg-accent/15 px-2.5 py-1 text-[0.6rem] text-accent">
                          Most common
                        </span>
                      )}

                      <h2 className="text-xl font-bold leading-tight text-primary-foreground md:text-2xl">
                        {tier.name}
                      </h2>

                      <p className="mt-5 font-display text-3xl font-bold text-accent md:text-4xl">
                        {tier.price}
                      </p>

                      <p className="mt-3 text-base text-primary-foreground/75">{tier.summary}</p>

                      <div className="hairline my-7" aria-hidden="true" />

                      <dl className="flex flex-col gap-4 text-sm">
                        <div>
                          <dt className="smallcaps text-[0.6rem] text-primary-foreground/50">
                            Typical scope
                          </dt>
                          <dd className="mt-1.5 leading-relaxed text-primary-foreground/80">
                            {tier.scope}
                          </dd>
                        </div>
                        <div>
                          <dt className="smallcaps text-[0.6rem] text-primary-foreground/50">
                            Timeline
                          </dt>
                          <dd className="mt-1.5 text-primary-foreground/80">{tier.timeline}</dd>
                        </div>
                        <div>
                          <dt className="smallcaps text-[0.6rem] text-primary-foreground/50">
                            Includes
                          </dt>
                          <dd className="mt-2">
                            <ul className="flex flex-col gap-2">
                              {tier.includes.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-2.5 leading-relaxed text-primary-foreground/80"
                                >
                                  <Check
                                    size={15}
                                    className="mt-0.5 shrink-0 text-accent"
                                    aria-hidden="true"
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                        <div>
                          <dt className="smallcaps text-[0.6rem] text-primary-foreground/50">
                            Best for
                          </dt>
                          <dd className="mt-1.5 leading-relaxed text-primary-foreground/80">
                            {tier.bestFor}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-auto pt-8">
                        <Button
                          asChild
                          className={
                            tier.featured
                              ? "gradient-accent hover-lift glow-accent w-full"
                              : "w-full"
                          }
                          variant={tier.featured ? "default" : "outline"}
                        >
                          <Link to="/contact" className="cursor-pointer">
                            Scope this engagement
                            <ArrowRight size={16} className="ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </BentoTile>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Included in everything */}
          <section className="bg-primary py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 md:grid-cols-12 md:gap-16">
                  <div className="md:col-span-5">
                    <ChapterMarker number="01" label="Every engagement" />
                    <h2 className="mt-6 text-3xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
                      Included at every tier.
                    </h2>
                  </div>
                  <div className="md:col-span-7">
                    <ul className="flex flex-col gap-4">
                      {PRICING_INCLUDED.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-base leading-relaxed text-primary-foreground/80 md:text-lg"
                        >
                          <Check
                            size={18}
                            className="mt-1 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="hairline my-10" aria-hidden="true" />

                    <h3 className="smallcaps text-[0.65rem] text-primary-foreground/55">
                      Payment terms
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {PRICING_PAYMENT.map((item) => (
                        <li
                          key={item}
                          className="text-base leading-relaxed text-primary-foreground/65"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ — same array as the FAQPage JSON-LD */}
          <section className="bg-[hsl(var(--section-alt))] py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <ChapterMarker number="02" label="Questions" />
                <h2 className="mt-6 text-3xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
                  Questions about cost.
                </h2>

                <div className="mt-14 flex flex-col gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
                  {PRICING_FAQS.map((faq) => (
                    <div
                      key={faq.question}
                      className="bg-[hsl(var(--section-alt))] px-6 py-7 md:px-9"
                    >
                      <h3 className="text-lg font-bold text-primary-foreground md:text-xl">
                        {faq.question}
                      </h3>
                      <p className="mt-3 max-w-4xl text-base leading-relaxed text-primary-foreground/75">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="smallcaps mt-8 text-[0.65rem] text-primary-foreground/45">
                  Pricing last updated {PRICING_UPDATED}
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] px-6 py-12 md:px-12 md:py-16">
                  <ChapterMarker number="" label="Next step" />
                  <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-primary-foreground md:text-4xl">
                    Get the arithmetic before you commit.
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/75">
                    A free 30-minute consultation, then a written cost-benefit analysis for the
                    workflow you want automated. If the numbers do not work, that is a reason not
                    to build it.
                  </p>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Button asChild className="gradient-accent hover-lift glow-accent">
                      <Link to="/contact" className="cursor-pointer">
                        Book a free automation audit
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                    <Link
                      to="/services"
                      className="cursor-pointer text-sm font-semibold text-primary-foreground/70 underline decoration-primary-foreground/25 underline-offset-4 transition-colors duration-200 hover:text-accent"
                    >
                      Or see what we build
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
