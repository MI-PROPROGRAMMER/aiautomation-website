import { motion } from "framer-motion";

/**
 * BeforeAfterBar — minimal horizontal bar comparison.
 * Two bars stacked, one for "before", one for "after". Width represents the
 * relative magnitude. Useful for showing time-cycle reductions per case study.
 */

interface Props {
  beforeValue: number;
  afterValue: number;
  beforeLabel: string;
  afterLabel: string;
  unit: string;
  className?: string;
}

export const BeforeAfterBar = ({
  beforeValue,
  afterValue,
  beforeLabel,
  afterLabel,
  unit,
  className,
}: Props) => {
  const max = Math.max(beforeValue, afterValue, 1);
  const beforePct = Math.max((beforeValue / max) * 100, 4);
  const afterPct = Math.max((afterValue / max) * 100, 4);

  return (
    <div className={className}>
      <div className="space-y-3">
        <Row
          label={beforeLabel}
          value={beforeValue}
          unit={unit}
          widthPct={beforePct}
          variant="before"
        />
        <Row
          label={afterLabel}
          value={afterValue}
          unit={unit}
          widthPct={afterPct}
          variant="after"
        />
      </div>
    </div>
  );
};

const Row = ({
  label,
  value,
  unit,
  widthPct,
  variant,
}: {
  label: string;
  value: number;
  unit: string;
  widthPct: number;
  variant: "before" | "after";
}) => (
  <div className="flex items-center gap-3">
    <span className="tech-label w-14 shrink-0 text-[0.6rem] text-primary-foreground/55">
      {label}
    </span>
    <div className="relative h-4 flex-1 overflow-hidden rounded-sm border border-primary-foreground/10 bg-primary/30">
      <motion.div
        className={`h-full ${
          variant === "before"
            ? "bg-primary-foreground/25"
            : "bg-accent/70 shadow-[0_0_12px_hsl(var(--accent)/0.3)]"
        }`}
        initial={{ width: 0 }}
        whileInView={{ width: `${widthPct}%` }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: variant === "after" ? 0.25 : 0 }}
      />
    </div>
    <span
      className={`tech-numeral w-16 shrink-0 text-right text-xs font-medium ${
        variant === "after" ? "text-accent" : "text-primary-foreground/70"
      }`}
    >
      {value}
      <span className="ml-1 text-[0.6rem] text-primary-foreground/45">{unit}</span>
    </span>
  </div>
);
