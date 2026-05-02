import { motion } from "framer-motion";
import { Search, PenLine, Map, Boxes, Activity, RotateCcw } from "lucide-react";
import { ChapterMarker } from "@/components/ui/editorial";

export const ProcessSection = () => {
  const steps = [
    {
      title: "Discover",
      meta: "Week 1",
      icon: Search,
      description:
        "We map your current workflows and identify the highest-leverage automation opportunities.",
      artifact: "audit.md",
    },
    {
      title: "Design",
      meta: "Week 2",
      icon: PenLine,
      description:
        "Architecture, integrations, and acceptance criteria — written down before any code is.",
      artifact: "spec.md",
    },
    {
      title: "Plan",
      meta: "Week 3",
      icon: Map,
      description:
        "Custom roadmap with sprints, ROI targets, and named owners aligned with your objectives.",
      artifact: "roadmap.json",
    },
    {
      title: "Build",
      meta: "Weeks 4–5",
      icon: Boxes,
      description:
        "We code, test, and harden the automation in a controlled environment before production.",
      artifact: "workflow.yml",
    },
    {
      title: "Ship",
      meta: "Ongoing",
      icon: Activity,
      description:
        "Launch with monitoring, alerting, and a continuous-improvement loop — never a hand-off.",
      artifact: "metrics.live",
    },
  ];

  return (
    <section id="process" className="relative py-32 bg-primary">
      {/* Subtle blueprint grid behind the section */}
      <div className="absolute inset-0 blueprint-grid-fine opacity-60" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Editorial header */}
          <div className="mb-24 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <ChapterMarker number="04" label="Our Process" />
              <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                Five stages,
                <span className="block text-3xl font-normal text-primary-foreground/85 md:text-5xl">
                  one <span className="text-gradient">promise.</span>
                </span>
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-16">
              <p className="text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
                From discovery to deployment, every automation we ship is a deliberate, measurable step —
                with named owners, written acceptance criteria, and clear ROI targets. We iterate every
                stage until you're satisfied.
              </p>
            </div>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="relative hidden md:block">
            {/* Continuous hairline running through the row */}
            <div className="absolute left-0 right-0 top-[5.25rem] h-px hairline" aria-hidden="true" />
            <ol className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                >
                  {/* Top: numeral + glyph */}
                  <div className="flex items-center justify-between">
                    <div className="num-display text-2xl text-primary-foreground/60">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="rounded-md border border-accent/30 bg-primary/60 p-2 backdrop-blur">
                      <step.icon className="h-4 w-4 text-accent" />
                    </div>
                  </div>

                  {/* Anchor dot sitting on the hairline */}
                  <div className="relative mt-7 mb-7 flex h-7 items-center">
                    <span
                      className="relative inline-block h-3 w-3 rounded-full bg-accent"
                      aria-hidden="true"
                    >
                      <span className="absolute inset-0 -m-2 rounded-full bg-accent/20 blur-md" />
                    </span>
                  </div>

                  {/* Step content */}
                  <span className="tech-label text-[0.65rem] text-primary-foreground/65">{step.meta}</span>
                  <h3 className="mt-2 text-2xl font-bold text-primary-foreground md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                    {step.description}
                  </p>

                  {/* Artifact tag */}
                  <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-accent/20 bg-primary/40 px-2.5 py-1">
                    <span className="inline-block h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                    <span className="mono text-[0.65rem] text-primary-foreground/65">
                      {step.artifact}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Mobile vertical timeline */}
          <div className="relative md:hidden">
            <div
              className="absolute bottom-0 left-2 top-0 w-px bg-gradient-to-b from-transparent via-accent/55 to-transparent"
              aria-hidden="true"
            />
            <ol className="space-y-12 pl-10">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  className="relative"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <span
                    className="absolute -left-[2.4rem] top-2 inline-block h-3 w-3 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3">
                    <step.icon className="h-4 w-4 text-accent" />
                    <span className="num-display text-xl text-primary-foreground/55">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="tech-label text-[0.6rem] text-primary-foreground/65">{step.meta}</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-primary-foreground">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-primary-foreground/75">
                    {step.description}
                  </p>
                  <span className="mt-3 inline-block mono text-[0.65rem] text-primary-foreground/55">
                    {step.artifact}
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Iterate-until-satisfied callout — mirrors the loop in the Hero foreground */}
          <motion.div
            className="mt-20 flex flex-col items-center gap-4 md:mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="hairline w-32" aria-hidden="true" />
            <div className="inline-flex items-center gap-3 rounded-full border border-accent/30 px-5 py-2">
              <RotateCcw className="h-4 w-4 text-accent" />
              <span className="tech-label text-[0.65rem] text-accent">
                Iterate · Until satisfied
              </span>
            </div>
            <p className="display-italic max-w-2xl text-center text-lg italic leading-snug text-primary-foreground/85 md:text-xl">
              We iterate every stage until you're satisfied — never a hand-off, always a hand-back.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
