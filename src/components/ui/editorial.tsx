import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial chapter marker — "01 / 06   THE PROBLEM"
 * Replaces "Section Header" centered-card pattern.
 */
interface ChapterMarkerProps extends HTMLAttributes<HTMLDivElement> {
  number?: string;
  label: string;
  align?: "left" | "center";
}

export const ChapterMarker = ({
  number,
  label,
  align = "left",
  className,
  ...rest
}: ChapterMarkerProps) => {
  const showNumber = number !== undefined && number !== "";
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "center" && "justify-center",
        className,
      )}
      {...rest}
    >
      {showNumber && (
        <>
          <span className="num-display text-xl text-accent">{number}</span>
          <span className="hairline-soft h-px w-10" aria-hidden="true" />
        </>
      )}
      <span className="eyebrow">{label}</span>
    </div>
  );
};

/**
 * Hairline horizontal rule with optional label inset
 */
interface HairlineRuleProps {
  className?: string;
  variant?: "accent" | "soft";
  label?: string;
}

export const HairlineRule = ({ className, variant = "accent", label }: HairlineRuleProps) => {
  if (label) {
    return (
      <div className={cn("flex items-center gap-6", className)}>
        <span className={cn("h-px flex-1", variant === "accent" ? "hairline" : "hairline-soft")} />
        <span className="eyebrow whitespace-nowrap text-primary-foreground/55" style={{ color: undefined }}>
          {label}
        </span>
        <span className={cn("h-px flex-1", variant === "accent" ? "hairline" : "hairline-soft")} />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "h-px w-full",
        variant === "accent" ? "hairline" : "hairline-soft",
        className,
      )}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};

/**
 * Bento tile — varied surface treatments so neighbouring tiles don't read
 * as cloned. Pick `tone` per tile to mix:
 *   - flat:     translucent panel with hairline border
 *   - bare:     borderless, hairline only on top
 *   - feature:  cinematic deep panel with corner glow
 *   - recessed: pressed-into-the-page, subtle
 */
type BentoTone = "flat" | "bare" | "feature" | "recessed";

interface BentoTileProps extends HTMLAttributes<HTMLDivElement> {
  tone?: BentoTone;
  rounded?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  withSheen?: boolean;
}

const TONE_CLASS: Record<BentoTone, string> = {
  flat: "lux-panel",
  bare: "lux-panel-bare",
  feature: "lux-panel-feature",
  recessed: "lux-panel-recessed",
};

const ROUND_CLASS = {
  sm: "rounded-lg",
  md: "rounded-2xl",
  lg: "rounded-3xl",
  xl: "rounded-[2rem]",
};

export const BentoTile = ({
  tone = "flat",
  rounded = "lg",
  withSheen,
  className,
  children,
  ...rest
}: BentoTileProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        ROUND_CLASS[rounded],
        TONE_CLASS[tone],
        withSheen && "sheen-card",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * EditorialSpread — alternating left/right copy + visual.
 * Replaces uniform 4-card grids with a magazine spread feel.
 */
interface EditorialSpreadProps {
  side?: "left" | "right";
  visual: ReactNode;
  children: ReactNode;
  className?: string;
}

export const EditorialSpread = ({
  side = "left",
  visual,
  children,
  className,
}: EditorialSpreadProps) => {
  return (
    <div
      className={cn(
        "grid gap-12 md:grid-cols-12 md:gap-16 items-center",
        className,
      )}
    >
      <div
        className={cn(
          "md:col-span-7",
          side === "right" && "md:order-2",
        )}
      >
        {visual}
      </div>
      <div
        className={cn(
          "md:col-span-5",
          side === "right" && "md:order-1",
        )}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Marquee row — infinite horizontal scroll for tools/logos/wordmarks.
 * Children are duplicated so the scroll loops seamlessly.
 */
interface MarqueeRowProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const MarqueeRow = ({ children, className, ariaLabel }: MarqueeRowProps) => {
  return (
    <div
      className={cn(
        "marquee-pause relative w-full overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="marquee gap-16 py-4 motion-reduce:!animate-none">
        <div className="flex shrink-0 items-center gap-16">{children}</div>
        <div className="flex shrink-0 items-center gap-16" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Inline stat-line — replaces 3-up stat box grid with a single elegant line.
 * Usage: <StatLine items={[{value: '4+', label: 'years'}, ...]} />
 */
interface StatLineProps {
  items: { value: string; label: string }[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const StatLine = ({ items, className, size = "md" }: StatLineProps) => {
  const valueSize = {
    sm: "text-3xl md:text-4xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl",
  }[size];
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-center gap-x-10 gap-y-6",
        className,
      )}
    >
      {items.map((item, i) => (
        <div key={item.label} className="flex items-baseline gap-3">
          <span className={cn("num-display text-shimmer", valueSize)}>{item.value}</span>
          <span className="smallcaps text-xs text-primary-foreground/70">{item.label}</span>
          {i < items.length - 1 && (
            <span
              className="ml-7 hidden h-7 w-px bg-primary-foreground/20 md:inline-block"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
};
