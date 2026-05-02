import { motion } from "framer-motion";
import { ChapterMarker, HairlineRule, StatLine } from "@/components/ui/editorial";

export const SocialProofSection = () => {
  const locations = [
    { country: "United States", projects: 25 },
    { country: "United Kingdom", projects: 12 },
    { country: "Australia", projects: 8 },
    { country: "Canada", projects: 15 },
  ];

  const industries = [
    { name: "Enterprise", count: "20+ Companies" },
    { name: "E-commerce", count: "10+ Stores" },
    { name: "Healthcare", count: "8+ Practices" },
    { name: "Startups", count: "15+ Companies" },
  ];

  return (
    <section className="py-32 bg-[hsl(var(--section-alt))]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Editorial header */}
          <div className="text-center">
            <ChapterMarker label="Global Reach" align="center" />
            <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
              Trusted by{" "}
              <span className="font-normal text-gradient">50+ businesses</span>
              <br className="hidden md:block" /> across five continents.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/75">
              Delivering automation across industries, from early-stage startups to Fortune 500 companies.
            </p>
          </div>

          {/* Oversized stat line, NOT three boxes */}
          <div className="mt-20 mb-20">
            <HairlineRule />
            <div className="py-16">
              <StatLine
                size="lg"
                items={[
                  { value: "4+", label: "Years Experience" },
                  { value: "50+", label: "Clients Served" },
                  { value: "10K+", label: "Hours Automated" },
                ]}
              />
            </div>
            <HairlineRule variant="soft" />
          </div>

          {/* Global reach — text columns with hairlines, no boxes */}
          <div className="grid gap-16 md:grid-cols-2 md:gap-20">
            <div>
              <span className="eyebrow">Global Impact, Local Excellence</span>
              <h3 className="mt-4 text-3xl font-bold text-primary-foreground md:text-4xl">
                Active in <span className="font-normal text-gradient">five continents.</span>
              </h3>
              <ul className="mt-10 divide-y divide-primary-foreground/10">
                {locations.map((location, idx) => (
                  <motion.li
                    key={location.country}
                    className="grid grid-cols-12 items-baseline gap-4 py-5"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <span className="col-span-7 smallcaps text-sm text-primary-foreground/85">
                      {location.country}
                    </span>
                    <span className="col-span-3 text-right num-display text-2xl text-accent">
                      {location.projects}
                    </span>
                    <span className="col-span-2 text-right text-xs text-primary-foreground/55">
                      projects
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <span className="eyebrow">Industries We Serve</span>
              <h3 className="mt-4 text-3xl font-bold text-primary-foreground md:text-4xl">
                From SaaS founders to <span className="font-normal text-gradient">global enterprise.</span>
              </h3>
              <ul className="mt-10 divide-y divide-primary-foreground/10">
                {industries.map((industry, idx) => (
                  <motion.li
                    key={industry.name}
                    className="grid grid-cols-12 items-baseline gap-4 py-5"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <span className="col-span-7 text-xl font-semibold text-primary-foreground">
                      {industry.name}
                    </span>
                    <span className="col-span-5 text-right text-sm text-primary-foreground/70">
                      {industry.count}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
