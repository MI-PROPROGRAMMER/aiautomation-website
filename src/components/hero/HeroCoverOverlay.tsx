import { m } from "framer-motion";

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
      {/*
        This is the brand tagline, not the page heading — the <h1> is the
        category sentence further down the hero (see Hero.tsx), which is what
        a search engine and a first-time reader both need.

        `display-serif` supplies the Playfair face the base <h1> rule used to
        give this block, so the rendering is unchanged. The two halves read as
        one continuous line to assistive tech; only the decorative seam between
        them is hidden. Only phrasing content may live here, so every node
        below is a <span>.
      */}
      <p
        className="display-serif flex w-full flex-col items-center text-center font-bold leading-[0.85] text-primary-foreground"
        style={{ maxWidth: "min(64vw, 64rem)" }}
      >
        {/* Top headline */}
        <span
          className="block tracking-[-0.04em] will-change-transform"
          style={{
            // src/index.css gives every <span> the Inter stack in @layer base, so
            // the headline halves have to opt back into the tagline's display serif.
            fontFamily: "inherit",
            fontSize: "clamp(2.5rem, 9vw, 9rem)",
            transform: `translate3d(0, ${topY}vh, 0)`,
            opacity: contentOpacity,
          }}
        >
          Automate
        </span>

        {/* Hairline seam — the cut happens here */}
        <span
          className="relative my-4 block w-full md:my-6"
          style={{ height: "14px" }}
          aria-hidden="true"
        >
          {/* Subtle base hairline (always visible while cover is on screen) */}
          <span
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
            style={{
              opacity: baseHairlineOpacity,
              background:
                "linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.35) 22%, hsl(var(--accent) / 0.6) 50%, hsl(var(--accent) / 0.35) 78%, transparent 100%)",
            }}
          />

          {/* Bright scan-line — peaks during the cut */}
          <span
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
            style={{
              opacity: scanOpacity,
              background:
                "linear-gradient(90deg, transparent, hsl(var(--accent)) 15%, hsl(var(--accent-glow)) 50%, hsl(var(--accent)) 85%, transparent)",
              boxShadow: "0 0 20px hsl(var(--accent) / 0.55)",
            }}
          />

          {/* Pulse beacon at the centre seam */}
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ opacity: beaconOpacity }}
          >
            <span className="relative block h-1.5 w-1.5">
              <m.span
                className="absolute inset-0 rounded-full bg-accent"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <m.span
                className="absolute -inset-1.5 rounded-full border border-accent/45"
                animate={{ scale: [0.6, 1.6, 0.6], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
            </span>
          </span>
        </span>

        {/* Bottom headline */}
        <span
          className="block italic tracking-[-0.04em] will-change-transform"
          style={{
            // src/index.css gives every <span> the Inter stack in @layer base, so
            // the headline halves have to opt back into the tagline's display serif.
            fontFamily: "inherit",
            fontSize: "clamp(2.5rem, 9vw, 9rem)",
            transform: `translate3d(0, ${bottomY}vh, 0)`,
            opacity: contentOpacity,
          }}
        >
          the grind.
        </span>
      </p>
    </div>
  );
};

// ----- helpers --------------------------------------------------------------

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const peakAt = (n: number, peak: number, width: number) => {
  const distance = Math.abs(n - peak) / width;
  return clamp01(1 - distance);
};
