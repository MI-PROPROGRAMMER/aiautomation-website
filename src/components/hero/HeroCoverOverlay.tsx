import { motion } from "framer-motion";

/**
 * HeroCoverOverlay — premium minimal cover.
 *
 * No card, no panel, no chrome. Just two headlines and a hairline rule
 * between them — the same hairline language used in every other section of
 * the site. As the user scrolls, the two headlines slide apart along the
 * hairline (top up, bottom down) and the seam glows briefly as the "cut"
 * happens, revealing the workflow beneath.
 */

interface Props {
  progress: number;
}

export const HeroCoverOverlay = ({ progress }: Props) => {
  const topY = -progress * 60;
  const bottomY = progress * 60;
  // Headline text fades out as it slides off the viewport
  const contentOpacity = clamp01(1 - progress * 1.4);
  // The hairline is only meaningful while the cover is the focus — gone before
  // the workflow underneath becomes visible (which starts at progress 0.2).
  const baseHairlineOpacity = clamp01(1 - progress * 2.5) * 0.6;
  // Scan-line glow peaks during the cut (~progress 0.25), fully gone by 0.5,
  // so it never overlaps with the revealed workflow.
  const scanOpacity = peakAt(progress, 0.25, 0.22);
  // Pulse beacon belongs to the cover; fades with the line.
  const beaconOpacity = clamp01(1 - progress * 2.5);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
      <div
        className="flex w-full flex-col items-center"
        style={{ maxWidth: "min(64vw, 64rem)" }}
      >
        {/* Top headline */}
        <h1
          className="font-display text-center font-bold leading-[0.85] tracking-[-0.04em] text-primary-foreground will-change-transform"
          style={{
            fontSize: "clamp(2.5rem, 9vw, 9rem)",
            transform: `translate3d(0, ${topY}vh, 0)`,
            opacity: contentOpacity,
          }}
        >
          Automate
        </h1>

        {/* Hairline seam — the cut happens here */}
        <div
          className="relative my-4 w-full md:my-6"
          style={{ height: "14px" }}
          aria-hidden="true"
        >
          {/* Subtle base hairline (always visible while cover is on screen) */}
          <div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
            style={{
              opacity: baseHairlineOpacity,
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.35) 22%, hsl(var(--accent) / 0.6) 50%, hsl(var(--accent) / 0.35) 78%, transparent 100%)",
            }}
          />

          {/* Bright scan-line — peaks during the cut */}
          <div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
            style={{
              opacity: scanOpacity,
              background:
                "linear-gradient(90deg, transparent, hsl(var(--accent)) 15%, hsl(var(--accent-glow)) 50%, hsl(var(--accent)) 85%, transparent)",
              boxShadow: "0 0 20px hsl(var(--accent) / 0.55)",
            }}
          />

          {/* Pulse beacon at the centre seam */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ opacity: beaconOpacity }}
          >
            <span className="relative block h-1.5 w-1.5">
              <motion.span
                className="absolute inset-0 rounded-full bg-accent"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute -inset-1.5 rounded-full border border-accent/45"
                animate={{ scale: [0.6, 1.6, 0.6], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
            </span>
          </div>
        </div>

        {/* Bottom headline */}
        <h1
          className="font-display text-center font-bold italic leading-[0.85] tracking-[-0.04em] text-primary-foreground will-change-transform"
          style={{
            fontSize: "clamp(2.5rem, 9vw, 9rem)",
            transform: `translate3d(0, ${bottomY}vh, 0)`,
            opacity: contentOpacity,
          }}
        >
          the grind.
        </h1>
      </div>
    </div>
  );
};

// ----- helpers --------------------------------------------------------------

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const peakAt = (n: number, peak: number, width: number) => {
  const distance = Math.abs(n - peak) / width;
  return clamp01(1 - distance);
};
