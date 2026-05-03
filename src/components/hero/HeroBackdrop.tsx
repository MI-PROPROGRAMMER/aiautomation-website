import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

/**
 * HeroBackdrop — schematic, animated, on-brand for an AI/tech shop.
 * Three layers, all SVG, no external assets:
 *   1. Blueprint grid (CSS via class)
 *   2. Slowly-pulsing node mesh with traveling edge highlights
 *   3. Soft champagne/cyan radial glow corners (vignette-ish)
 *
 * Mobile (<768px): infinite framer-motion loops are skipped (they pegged
 * the GPU on iOS) and the corner glow blur radius is reduced.
 */

const NODES = [
  { x: 12, y: 18 }, { x: 28, y: 9 }, { x: 44, y: 22 }, { x: 62, y: 12 },
  { x: 78, y: 26 }, { x: 90, y: 14 }, { x: 8, y: 42 }, { x: 24, y: 50 },
  { x: 40, y: 38 }, { x: 56, y: 48 }, { x: 72, y: 40 }, { x: 88, y: 54 },
  { x: 18, y: 70 }, { x: 36, y: 80 }, { x: 52, y: 72 }, { x: 70, y: 82 },
  { x: 86, y: 76 },
];

const EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [0, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
  [6, 12], [12, 13], [13, 14], [14, 15], [15, 16],
  [2, 8], [4, 10], [8, 14], [10, 15],
];

export const HeroBackdrop = () => {
  const isMobile = useIsMobile();
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1 — blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-50" />

      {/* Layer 2 — node mesh */}
      <svg
        className="absolute inset-0 h-full w-full opacity-65"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Static edges */}
        {EDGES.map(([a, b], i) => (
          <line
            key={`edge-${i}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="hsl(var(--accent))"
            strokeOpacity="0.18"
            strokeWidth="0.12"
          />
        ))}

        {/* Pulse-traveling highlights on selected edges (desktop only) */}
        {!isMobile &&
          [1, 5, 9, 13, 17].map((edgeIdx, i) => {
            const [a, b] = EDGES[edgeIdx];
            return (
              <motion.line
                key={`pulse-${i}`}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="hsl(var(--accent))"
                strokeWidth="0.35"
                strokeDasharray="0.5 6"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -12 }}
                transition={{
                  duration: 4 + i * 0.7,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            );
          })}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Glow halo on a few nodes (desktop only — pulsing opacity is
                cheap on a desktop GPU but compounds with everything else on
                mobile) */}
            {!isMobile && i % 3 === 0 && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="1.4"
                fill="url(#node-glow)"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{
                  duration: 3 + (i % 5) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            )}
            {isMobile && i % 3 === 0 && (
              <circle cx={node.x} cy={node.y} r="1.2" fill="url(#node-glow)" opacity="0.6" />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r="0.5"
              fill="hsl(var(--accent))"
              fillOpacity="0.85"
            />
          </g>
        ))}
      </svg>

      {/* Layer 3 — corner glows / vignette. Smaller and less blurry on mobile
          to dodge the per-frame blur cost on mobile GPUs. */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-[60px] md:-left-32 md:-top-32 md:h-[36rem] md:w-[36rem] md:blur-[140px]" />
      <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-accent/10 blur-[60px] md:-right-32 md:-bottom-32 md:h-[36rem] md:w-[36rem] md:blur-[140px] md:bg-accent/8" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/80" />
    </div>
  );
};
