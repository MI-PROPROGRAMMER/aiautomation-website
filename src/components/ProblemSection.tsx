import { motion } from "framer-motion";
import { ChapterMarker, HairlineRule, StatLine } from "@/components/ui/editorial";
import { TimeBleedInfographic } from "@/components/infographics/TimeBleedInfographic";

export const ProblemSection = () => {
  const problems = [
    {
      title: "Manual data entry",
      description: "Hours each day funnelled into copying fields between apps that should be talking to each other.",
    },
    {
      title: "Lost inquiries",
      description: "Customer messages buried in inboxes, slipping past handoffs, costing trust and revenue.",
    },
    {
      title: "Error-prone processes",
      description: "Inconsistent steps, missed edge cases, downstream cleanup — every week, a new fire to put out.",
    },
    {
      title: "No strategic time",
      description: "Your team is busy working in the business, never on it. The important work always waits.",
    },
  ];

  return (
    <section className="py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Editorial header — left-aligned, asymmetric */}
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <ChapterMarker number="02" label="The Problem" />
              <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                Is your team's potential
                <span className="block font-normal text-gradient">trapped in repetition?</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:pt-16">
              <p className="text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
                Every minute spent on manual, repetitive work is a minute stolen from innovation, strategy, and growth.
                The cost compounds quietly — until it doesn't.
              </p>
            </div>
          </div>

          {/* Problems as enumerated hairline list — NO box grid */}
          <div className="mt-24">
            <HairlineRule />
            <ol>
              {problems.map((problem, index) => (
                <motion.li
                  key={problem.title}
                  className="group grid items-baseline gap-6 border-b border-primary-foreground/8 py-10 md:grid-cols-12 md:gap-12"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
                >
                  <div className="md:col-span-2">
                    <span className="num-display text-5xl text-accent transition-colors group-hover:text-accent-foreground/0 md:text-6xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="md:col-span-4 text-2xl font-semibold leading-tight text-primary-foreground md:text-3xl">
                    {problem.title}
                  </h3>
                  <p className="md:col-span-6 text-base leading-relaxed text-primary-foreground/70 md:text-lg">
                    {problem.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* The hidden cost — Gantt infographic + supporting numerals */}
          <div className="mt-24">
            <div className="text-center">
              <span className="eyebrow">The hidden cost of manual work</span>
            </div>
            <div className="mt-10">
              <TimeBleedInfographic />
            </div>
            <div className="mt-12">
              <StatLine
                size="md"
                items={[
                  { value: "40%", label: "of work time on repetition" },
                  { value: "$15K", label: "annual cost per employee" },
                  { value: "73%", label: "of employees want this gone" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
