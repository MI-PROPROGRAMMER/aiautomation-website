import { Code2, Zap, Workflow, Shield, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { BentoTile, ChapterMarker } from "@/components/ui/editorial";
import { WorkflowPreview } from "@/components/infographics/WorkflowPreview";

export const ServicesSection = () => {
  const lowCodeFeatures = [
    "Rapid deployment in days, not months",
    "Visual workflow builders",
    "Seamless app integrations",
    "Cost-effective for clear playbooks",
  ];

  const customFeatures = [
    "Unlimited customisation",
    "Advanced data processing",
    "Complex business logic",
    "Scalable architecture",
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-[hsl(var(--section-alt))]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Editorial header */}
          <div className="mb-20 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <ChapterMarker number="03" label="What We Build" />
              <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                Your business,
                <span className="block font-normal text-gradient">running on autopilot.</span>
              </h2>
            </div>
            <div className="md:col-span-5 md:pt-16">
              <p className="text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
                We combine the speed of no-code platforms with the precision of custom development —
                building automation that fits the shape of your business, not the other way around.
              </p>
            </div>
          </div>

          {/* Asymmetric bento — one feature tile (large) + one tall companion */}
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            {/* Feature tile — Low-Code/No-Code (spans 7) */}
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <BentoTile tone="feature" rounded="xl" withSheen className="p-7 md:p-14 h-full">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span className="eyebrow">Service · 01</span>
                    <h3 className="mt-4 text-3xl font-bold text-primary-foreground md:text-5xl">
                      Low-Code <span className="font-normal text-gradient">Agility</span>
                    </h3>
                    <p className="mt-4 text-lg text-primary-foreground/80">Fast, flexible, and powerful.</p>
                  </div>
                  <div className="hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/30">
                    <Zap className="h-7 w-7 text-accent" />
                  </div>
                </div>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                  We leverage Zapier, Make, n8n, and Bubble to ship automation in days — without sacrificing
                  rigor or maintainability.
                </p>

                {/* Workflow diagram preview */}
                <div className="mt-8 rounded-xl border border-accent/20 bg-primary/40 p-4 md:p-5 scan-rule">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="tech-label text-[0.6rem] text-primary-foreground/60">
                      pattern · linear-pipeline
                    </span>
                    <span className="tech-numeral text-[0.65rem] text-accent">live</span>
                  </div>
                  <WorkflowPreview variant="linear" className="h-12 w-full" />
                </div>

                <div className="hairline mt-10 mb-8" aria-hidden="true" />

                <ul className="grid gap-3 md:grid-cols-2">
                  {lowCodeFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-primary-foreground/85"
                    >
                      <span className="mt-2 inline-block h-1 w-4 bg-accent" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </BentoTile>
            </motion.div>

            {/* Tall companion — Custom-Coded (spans 5) */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <BentoTile tone="flat" rounded="xl" className="p-7 md:p-12 h-full">
                <span className="eyebrow">Service · 02</span>
                <h3 className="mt-4 text-2xl font-bold text-primary-foreground md:text-4xl">
                  Custom-Coded <span className="italic font-normal">Precision</span>
                </h3>
                <p className="mt-3 text-base text-primary-foreground/80">Complex problems, tailored solutions.</p>

                <div className="hairline-soft my-8" aria-hidden="true" />

                <p className="text-sm leading-relaxed text-primary-foreground/70 md:text-base">
                  When the problem is unique or the surface area is wide, we build with Python, TypeScript,
                  cloud functions, and proper APIs.
                </p>

                {/* Workflow diagram preview — branching */}
                <div className="mt-8 rounded-xl border border-accent/20 bg-primary/40 p-4 md:p-5 scan-rule">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="tech-label text-[0.6rem] text-primary-foreground/60">
                      pattern · fan-out / merge
                    </span>
                    <span className="tech-numeral text-[0.65rem] text-accent">async</span>
                  </div>
                  <WorkflowPreview variant="branching" className="h-20 w-full" />
                </div>

                <ul className="mt-8 space-y-3">
                  {customFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-primary-foreground/85"
                    >
                      <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </BentoTile>
            </motion.div>

            {/* Wide bare strip — "Hybrid by design" (spans 12, low height) */}
            <motion.div
              className="md:col-span-12"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            >
              <BentoTile tone="bare" rounded="md" className="p-8 md:px-12 md:py-10">
                <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
                  <div className="md:col-span-4">
                    <span className="eyebrow">The hybrid advantage</span>
                    <h4 className="mt-3 text-2xl font-bold text-primary-foreground md:text-3xl">
                      Start fast.
                      <span className="block font-normal text-gradient">Scale smart.</span>
                    </h4>
                  </div>
                  <div className="md:col-span-4 flex gap-5">
                    <Workflow className="mt-1 h-7 w-7 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-primary-foreground/80 md:text-base">
                      Begin with no-code for quick wins, then graduate to custom code where the unit economics demand it.
                    </p>
                  </div>
                  <div className="md:col-span-4 flex gap-5">
                    <Shield className="mt-1 h-7 w-7 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-primary-foreground/80 md:text-base">
                      Get the speed of no-code with the power and flexibility of custom development — never one or the other.
                    </p>
                  </div>
                </div>
              </BentoTile>
            </motion.div>
          </div>

          {/* Inline closing line */}
          <div className="mt-16 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <p className="display-italic text-lg italic text-primary-foreground/70 md:text-xl">
              Built for businesses that move on conviction, not on cycles.
            </p>
            <a
              href="#process"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-foreground"
            >
              See how we deliver
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
