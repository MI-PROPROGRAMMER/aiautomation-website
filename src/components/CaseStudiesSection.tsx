import { TrendingUp, Clock, DollarSign, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ChapterMarker, BentoTile } from "@/components/ui/editorial";
import { BeforeAfterBar } from "@/components/infographics/Sparkline";

export const CaseStudiesSection = () => {
  // TODO: replace with named clients once NDAs allow. Until then, these are
  // anonymised representative engagements — same numbers, identifying details
  // generalised by industry + region.
  const caseStudies = [
    {
      company: "Series-B SaaS",
      region: "United States",
      challenge: "Manual lead qualification was costing the sales team 15 hours per week and bottlenecking pipeline velocity.",
      result: "90% time saved on lead processing",
      bar: { before: 15, after: 1.5, beforeLabel: "before", afterLabel: "after", unit: "hrs/wk" },
      stats: [
        { icon: Clock, value: "15hrs", label: "saved weekly" },
        { icon: TrendingUp, value: "3×", label: "more leads processed" },
        { icon: DollarSign, value: "$78K", label: "annual savings" },
      ],
    },
    {
      company: "D2C E-commerce",
      region: "United Kingdom",
      challenge: "Order processing took two days end-to-end, creating delivery delays and customer-service overhead.",
      result: "Same-day fulfilment achieved",
      bar: { before: 48, after: 2, beforeLabel: "before", afterLabel: "after", unit: "hrs" },
      stats: [
        { icon: Clock, value: "2 days → 2hrs", label: "fulfilment cycle" },
        { icon: TrendingUp, value: "98%", label: "customer satisfaction" },
        { icon: DollarSign, value: "$120K", label: "annual savings" },
      ],
    },
    {
      company: "Multi-site Healthcare",
      region: "Australia",
      challenge: "Patient appointment scheduling overwhelmed front-desk staff and capped weekly capacity.",
      result: "Fully automated scheduling system",
      bar: { before: 25, after: 0.5, beforeLabel: "before", afterLabel: "after", unit: "hrs/wk" },
      stats: [
        { icon: Clock, value: "25hrs", label: "saved weekly" },
        { icon: TrendingUp, value: "60%", label: "more appointments" },
        { icon: DollarSign, value: "$95K", label: "annual savings" },
      ],
    },
  ];

  return (
    <section id="case-studies" className="py-32 bg-[hsl(var(--section-alt))]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Editorial header */}
          <div className="mb-20 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <ChapterMarker number="01" label="Case Studies" />
              <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                Client success
                <span className="block font-normal text-gradient">stories.</span>
              </h2>
            </div>
            <div className="md:col-span-6 md:pt-16">
              <p className="text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
                Selected work from the past four years. Each engagement begins with a single problem statement
                and ends with a measurable shift in how the business runs.
              </p>
            </div>
          </div>

          {/* Editorial spreads — alternating left/right, NOT a 3-card grid */}
          <div className="space-y-20">
            {caseStudies.map((study, index) => {
              const isReversed = index % 2 === 1;
              return (
                <motion.article
                  key={study.company}
                  className="grid gap-10 md:grid-cols-12 md:gap-16 md:items-start"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Numeral + meta column */}
                  <div className={`md:col-span-3 ${isReversed ? "md:order-3" : ""}`}>
                    <div className="num-display text-7xl text-accent md:text-8xl">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="hairline mt-6 mb-6" aria-hidden="true" />
                    <span className="eyebrow">{study.region}</span>
                    <h3 className="mt-2 text-3xl font-bold text-primary-foreground">{study.company}</h3>
                    <span className="mt-2 block smallcaps text-[0.6rem] text-accent/60">
                      Representative engagement
                    </span>
                  </div>

                  {/* Body */}
                  <div className="md:col-span-5 md:order-2">
                    <p className="display-italic text-xl italic leading-relaxed text-primary-foreground/85 md:text-2xl">
                      "{study.challenge}"
                    </p>
                    <p className="mt-8 text-lg font-semibold text-accent">
                      {study.result}
                    </p>
                  </div>

                  {/* Stat tile — sparkline + KPI list */}
                  <div className={`md:col-span-4 ${isReversed ? "md:order-1" : ""}`}>
                    <BentoTile tone={index === 0 ? "feature" : index === 1 ? "flat" : "recessed"} rounded="lg" className="p-7 md:p-8">
                      <div className="flex items-center justify-between">
                        <span className="tech-label text-[0.65rem] text-primary-foreground/85">Outcome</span>
                        <span className="tech-numeral text-[0.65rem] text-accent">live</span>
                      </div>

                      <BeforeAfterBar
                        beforeValue={study.bar.before}
                        afterValue={study.bar.after}
                        beforeLabel={study.bar.beforeLabel}
                        afterLabel={study.bar.afterLabel}
                        unit={study.bar.unit}
                        className="mt-5"
                      />

                      <div className="hairline-soft mt-6 mb-6" aria-hidden="true" />

                      <div className="space-y-4">
                        {study.stats.map((stat) => (
                          <div key={stat.label} className="flex items-baseline justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <stat.icon className="h-4 w-4 text-accent" />
                              <span className="tech-label text-[0.6rem] text-primary-foreground/65">{stat.label}</span>
                            </div>
                            <span className="tech-numeral text-xl font-semibold text-primary-foreground md:text-2xl">
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </BentoTile>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-20 flex justify-center">
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="group text-primary-foreground/85 hover:bg-transparent hover:text-accent"
            >
              <Link to="/contact">
                <span className="border-b border-primary-foreground/30 pb-1 transition-colors group-hover:border-accent">
                  Talk to us about a similar engagement
                </span>
                <ArrowUpRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
