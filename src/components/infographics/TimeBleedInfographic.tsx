import { motion } from "framer-motion";

/**
 * TimeBleedInfographic — visualizes the typical 8-hour workday split.
 * Three labelled bands stacked horizontally: Manual / Coordination / Strategic.
 * Reads like an engineering Gantt chart — not a marketing pie chart.
 */

interface Band {
  label: string;
  width: number; // percent
  variant: "manual" | "coord" | "strategic";
  hours: string;
}

const BANDS: Band[] = [
  { label: "Manual / repetitive", width: 40, variant: "manual", hours: "3.2h" },
  { label: "Coordination & meetings", width: 35, variant: "coord", hours: "2.8h" },
  { label: "Strategic / focus work", width: 25, variant: "strategic", hours: "2.0h" },
];

const VARIANT_CLASS: Record<Band["variant"], string> = {
  manual: "bg-accent/55 border-accent/70",
  coord: "bg-accent/25 border-accent/40",
  strategic: "bg-primary-foreground/15 border-primary-foreground/25",
};

const VARIANT_LABEL: Record<Band["variant"], string> = {
  manual: "← what we automate",
  coord: "shared tools help here",
  strategic: "→ this is what they should be doing",
};

export const TimeBleedInfographic = () => {
  return (
    <div className="lux-panel-feature relative overflow-hidden rounded-2xl border border-accent/25 p-6 md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <span className="tech-label text-[0.65rem] text-primary-foreground/85">
          a typical 8-hour day · knowledge worker
        </span>
        <span className="tech-numeral text-xs text-accent">n=2.4k surveys</span>
      </div>

      {/* Hour ticks */}
      <div className="mb-2 grid grid-cols-8" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-start">
            <span className="mono text-[0.55rem] text-primary-foreground/45">
              {String(i).padStart(2, "0")}h
            </span>
          </div>
        ))}
      </div>

      {/* Stacked Gantt bar */}
      <div className="relative mb-4 flex h-10 w-full overflow-hidden rounded-md border border-accent/25 bg-primary/40">
        {BANDS.map((band, i) => (
          <motion.div
            key={band.label}
            className={`relative h-full border-r last:border-r-0 ${VARIANT_CLASS[band.variant]}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${band.width}%` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
            aria-label={`${band.label}: ${band.hours}`}
          >
            <div className="absolute inset-y-0 left-2 flex items-center">
              <span className="tech-numeral text-xs font-semibold text-primary-foreground/95">
                {band.hours}
              </span>
            </div>
          </motion.div>
        ))}
        {/* axis ticks across the bar */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0, transparent calc(12.5% - 1px), hsl(var(--primary-foreground) / 0.12) calc(12.5% - 1px), hsl(var(--primary-foreground) / 0.12) 12.5%)",
          }}
        />
      </div>

      {/* Legend */}
      <ul className="mt-6 grid gap-3 text-xs md:grid-cols-3">
        {BANDS.map((band) => (
          <li key={band.label} className="flex items-start gap-2">
            <span
              className={`mt-1 inline-block h-3 w-3 rounded-sm border ${VARIANT_CLASS[band.variant]}`}
              aria-hidden="true"
            />
            <div>
              <div className="text-sm font-semibold text-primary-foreground">
                {band.label}
              </div>
              <div className="tech-label text-[0.6rem] text-primary-foreground/55">
                {VARIANT_LABEL[band.variant]}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Annotation strip */}
      <div className="mt-6 border-t border-accent/15 pt-4">
        <p className="text-sm leading-relaxed text-primary-foreground/75 md:text-base">
          On average <span className="text-accent font-semibold">3.2 hours per person, per day</span>{" "}
          go to manual, automatable tasks. Across a 20-person team, that's{" "}
          <span className="text-accent font-semibold">320+ hours a week</span> recoverable.
        </p>
      </div>
    </div>
  );
};
