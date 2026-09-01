import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ChapterMarker } from "@/components/ui/editorial";
import { INDUSTRIES } from "@/content/industries";
import { SITE_URL, buildBreadcrumbs } from "@/lib/seo";

/**
 * Index for the industry pages.
 *
 * Without it the nine pages had two inbound links each and their breadcrumb
 * named "Industries" while pointing at /services. This is the parent that
 * makes both correct.
 */
const Industries = () => {
  const pageUrl = `${SITE_URL}/industries`;

  return (
    <>
      <Helmet>
        <title>AI Automation by Industry</title>
        <meta
          name="description"
          content="How AI automation, custom AI software and embedded engineers apply across freight brokerage, DTC, construction, healthcare, finance and more."
        />
        <meta property="og:title" content="AI Automation by Industry — ApexifyLabs" />
        <meta
          property="og:description"
          content="The operational problems we automate in nine industries, and what changes when they run as systems."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${SITE_URL}/hero-automation.jpg`} />
        <meta name="twitter:title" content="AI Automation by Industry — ApexifyLabs" />
        <meta
          name="twitter:description"
          content="The operational problems we automate in nine industries."
        />
        <meta name="twitter:image" content={`${SITE_URL}/hero-automation.jpg`} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Industries", url: pageUrl },
        ])}
      />

      <div className="min-h-screen">
        <Header />
        <main>
          <section className="relative overflow-hidden gradient-hero pb-16 pt-28 md:pb-24 md:pt-40">
            <div className="absolute inset-0 opacity-25" aria-hidden="true">
              <div className="absolute -right-32 top-0 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-3xl" />
            </div>
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <ChapterMarker number="" label="Industries" />
                <h1 className="mt-8 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                  Automation, <span className="text-gradient-accent">by industry.</span>
                </h1>
                <p className="mt-8 max-w-3xl text-lg leading-relaxed text-primary-foreground/80">
                  Every industry loses time in a different place. These pages set out where it
                  goes, what a cited benchmark says it costs, and which of our three engagements
                  fits.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[hsl(var(--section-alt))] py-20 md:py-28">
            <div className="container mx-auto px-4">
              <ul className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
                {INDUSTRIES.map((industry) => (
                  <li key={industry.path} className="bg-[hsl(var(--section-alt))]">
                    <Link
                      to={industry.path}
                      className="group flex h-full cursor-pointer flex-col gap-3 p-7 transition-colors duration-200 hover:bg-white/[0.03]"
                    >
                      <span className="font-display text-xl font-bold text-primary-foreground transition-colors duration-200 group-hover:text-accent md:text-2xl">
                        {industry.name}
                      </span>
                      <span className="text-sm italic text-accent/85">{industry.cardStat}</span>
                      <span className="text-sm leading-relaxed text-primary-foreground/65">
                        {industry.workflows.items.slice(0, 3).join(" · ")}
                      </span>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-accent">
                        Read
                        <ArrowUpRight size={14} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Industries;
