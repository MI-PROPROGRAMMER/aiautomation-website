import { motion } from "framer-motion";

/**
 * HeroFrameSVG — the foreground media that grows from small to full-size as
 * the user scrolls. Renders the company's 5-stage engagement workflow as a
 * minimal typographic timeline (no boxes, premium magazine feel).
 *
 * The screen-filling cover lives in a SEPARATE component (HeroCoverOverlay)
 * that splits to reveal this content as the user scrolls. So this SVG is
 * purely the "what's underneath" — the workflow itself.
 */

interface Props {
  progress: number;
}

const VB_W = 1450;
const VB_H = 840;

const STAGES = [
  { id: "01", label: "Discover", meta: ["intake", "audit", "scope"], active: true },
  { id: "02", label: "Design", meta: ["architecture", "spec"] },
  { id: "03", label: "Plan", meta: ["roadmap", "ROI", "sprints"] },
  { id: "04", label: "Build", meta: ["code", "test", "harden"] },
  { id: "05", label: "Ship", meta: ["deploy", "monitor", "refine"] },
];

const STAGE_Y_DOT = 470;
const STAGE_Y_NUM = 410;
const STAGE_Y_LABEL = 530;
const STAGE_Y_META = 580;
const STAGE_PAD = 80;
const STAGE_W = (VB_W - STAGE_PAD * 2) / STAGES.length;
const POS_X = STAGES.map((_, i) => STAGE_PAD + STAGE_W * i + STAGE_W / 2);

export const HeroFrameSVG = ({ progress }: Props) => {
  // Workflow fades in as the cover parts (so users don't see workflow content
  // peeking through before the cover splits).
  const reveal = clamp01((progress - 0.2) / 0.6);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full"
      aria-label="Animated 5-stage process: discover, design, plan, build, ship — with an iteration loop."
      role="img"
    >
      <Defs />

      <g style={{ opacity: reveal }}>
        {/* Background card */}
        <rect width={VB_W} height={VB_H} fill="url(#hero-frame-bg)" rx="20" />
        <rect width={VB_W} height={VB_H} fill="url(#hero-grid)" rx="20" />
        <circle cx="0" cy="0" r="320" fill="url(#hero-corner-glow)" />
        <g transform={`translate(${VB_W} ${VB_H}) rotate(180)`}>
          <circle cx="0" cy="0" r="320" fill="url(#hero-corner-glow)" />
        </g>
        <rect
          x="2"
          y="2"
          width={VB_W - 4}
          height={VB_H - 4}
          fill="none"
          stroke="hsl(192 100% 44%)"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          rx="18"
        />

        {/* Header */}
        <g>
          <line x1="40" y1="64" x2={VB_W - 40} y2="64" stroke="hsl(192 100% 44%)" strokeOpacity="0.18" />
          <motion.circle
            cx="48"
            cy="40"
            r="5"
            fill="hsl(192 100% 60%)"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <text
            x="64"
            y="44"
            fontFamily="JetBrains Mono, monospace"
            fontSize="12"
            fontWeight="500"
            fill="hsl(0 0% 100%)"
            fillOpacity="0.7"
            letterSpacing="3"
          >
            APEXIFY · ENGAGEMENT WORKFLOW
          </text>
          <text
            x={VB_W - 48}
            y="44"
            fontFamily="JetBrains Mono, monospace"
            fontSize="12"
            fontWeight="500"
            fill="hsl(192 100% 60%)"
            textAnchor="end"
            letterSpacing="3"
          >
            STATUS · LIVE
          </text>
        </g>

        {/* Editorial title block */}
        <text
          x={STAGE_PAD}
          y="170"
          fontFamily="JetBrains Mono, monospace"
          fontSize="13"
          fill="hsl(192 100% 60%)"
          fillOpacity="0.85"
          letterSpacing="4"
        >
          HOW WE WORK
        </text>
        <text
          x={STAGE_PAD}
          y="252"
          fontFamily="Playfair Display, Inter, serif"
          fontSize="68"
          fontWeight="700"
          fill="hsl(0 0% 100%)"
          letterSpacing="-2"
        >
          Five stages, one promise.
        </text>
        <text
          x={STAGE_PAD}
          y="298"
          fontFamily="Inter, sans-serif"
          fontSize="20"
          fill="hsl(0 0% 100%)"
          fillOpacity="0.7"
        >
          We iterate every stage until you're satisfied — never a hand-off, always a hand-back.
        </text>

        {/* Connector line through the dots */}
        <line
          x1={POS_X[0]}
          y1={STAGE_Y_DOT}
          x2={POS_X[POS_X.length - 1]}
          y2={STAGE_Y_DOT}
          stroke="hsl(192 100% 44%)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />

        {/* Animated traveling packet on the connector */}
        {POS_X.slice(0, -1).map((x, i) => (
          <motion.circle
            key={`pkt-${i}`}
            cy={STAGE_Y_DOT}
            r="5"
            fill="hsl(192 100% 60%)"
            filter="url(#hero-glow)"
            initial={{ cx: x, opacity: 0 }}
            animate={{ cx: [x, POS_X[i + 1]], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.55,
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1],
            }}
          />
        ))}

        {/* Stage entries — typographic, no boxes */}
        {STAGES.map((stage, i) => (
          <Stage
            key={stage.id}
            x={POS_X[i]}
            id={stage.id}
            label={stage.label}
            meta={stage.meta}
            active={stage.active}
          />
        ))}

        {/* Iterate loop */}
        <IterateLoop />

        {/* Footer */}
        <g transform={`translate(0 ${VB_H - 64})`}>
          <line x1="40" y1="0" x2={VB_W - 40} y2="0" stroke="hsl(192 100% 44%)" strokeOpacity="0.15" />
          <Telemetry x={STAGE_PAD} k="ENGAGEMENTS" v="50+" />
          <Telemetry x={STAGE_PAD + 220} k="AVG TIME-TO-SHIP" v="3-5 wks" />
          <Telemetry x={STAGE_PAD + 470} k="ITERATIONS" v="∞ until satisfied" accent />
          <Telemetry x={STAGE_PAD + 770} k="WARRANTY" v="30 days defect" />
          <text
            x={VB_W - 48}
            y="40"
            fontFamily="JetBrains Mono, monospace"
            fontSize="12"
            fontWeight="500"
            fill="hsl(0 0% 100%)"
            fillOpacity="0.45"
            textAnchor="end"
            letterSpacing="3"
          >
            APEXIFY · RUNTIME
          </text>
        </g>
      </g>
    </svg>
  );
};

// ============================================================================
// Stages — minimal typographic timeline (no boxes)
// ============================================================================

interface StageProps {
  x: number;
  id: string;
  label: string;
  meta: string[];
  active?: boolean;
}

const Stage = ({ x, id, label, meta, active }: StageProps) => {
  const numColor = active ? "hsl(192 100% 60%)" : "hsl(0 0% 100%)";
  const numOpacity = active ? 1 : 0.45;

  return (
    <g>
      <text
        x={x}
        y={STAGE_Y_NUM}
        fontFamily="JetBrains Mono, monospace"
        fontSize="14"
        fontWeight="500"
        fill={numColor}
        fillOpacity={numOpacity}
        textAnchor="middle"
        letterSpacing="3"
      >
        {id}
      </text>

      {active && (
        <text
          x={x}
          y={STAGE_Y_NUM + 22}
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fontWeight="500"
          fill="hsl(192 100% 60%)"
          textAnchor="middle"
          letterSpacing="3"
        >
          ACTIVE
        </text>
      )}

      {active && (
        <motion.circle
          cx={x}
          cy={STAGE_Y_DOT}
          r="14"
          fill="hsl(192 100% 60%)"
          fillOpacity="0.16"
          filter="url(#hero-glow)"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <circle
        cx={x}
        cy={STAGE_Y_DOT}
        r={active ? 8 : 5}
        fill={active ? "hsl(192 100% 60%)" : "hsl(192 100% 44%)"}
        stroke={active ? "hsl(0 0% 100%)" : "hsl(192 100% 44%)"}
        strokeOpacity={active ? 0.4 : 0}
        strokeWidth="1.5"
      />

      <text
        x={x}
        y={STAGE_Y_LABEL}
        fontFamily="Playfair Display, Inter, serif"
        fontSize="34"
        fontWeight="700"
        fill="hsl(0 0% 100%)"
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        {label}
      </text>

      {active && (
        <line
          x1={x - 28}
          y1={STAGE_Y_LABEL + 12}
          x2={x + 28}
          y2={STAGE_Y_LABEL + 12}
          stroke="hsl(192 100% 60%)"
          strokeWidth="1.5"
        />
      )}

      {meta.map((m, i) => (
        <text
          key={i}
          x={x}
          y={STAGE_Y_META + i * 22}
          fontFamily="JetBrains Mono, monospace"
          fontSize="12"
          fontWeight="400"
          fill="hsl(0 0% 100%)"
          fillOpacity="0.55"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          {m}
        </text>
      ))}
    </g>
  );
};

const IterateLoop = () => {
  const shipX = POS_X[STAGES.length - 1];
  const planX = POS_X[2];
  const yStart = STAGE_Y_LABEL + 100;
  const yLoop = yStart + 90;
  const path = `M ${shipX} ${yStart} C ${shipX} ${yLoop}, ${planX} ${yLoop}, ${planX} ${yStart}`;

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="hsl(192 100% 60%)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <motion.path
        d={path}
        fill="none"
        stroke="hsl(192 100% 60%)"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeDasharray="10 14"
        strokeLinecap="round"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -24 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />
      <polygon
        points={`${planX - 5},${yStart + 10} ${planX + 5},${yStart + 10} ${planX},${yStart + 1}`}
        fill="hsl(192 100% 60%)"
      />
      <g transform={`translate(${(shipX + planX) / 2} ${yLoop + 24})`}>
        <text
          x="0"
          y="0"
          fontFamily="JetBrains Mono, monospace"
          fontSize="12"
          fontWeight="500"
          fill="hsl(192 100% 60%)"
          fillOpacity="0.95"
          textAnchor="middle"
          letterSpacing="3"
        >
          ↺  ITERATE  ·  UNTIL SATISFIED
        </text>
      </g>
    </g>
  );
};

const Telemetry = ({ x, k, v, accent }: { x: number; k: string; v: string; accent?: boolean }) => (
  <g>
    <text
      x={x}
      y="26"
      fontFamily="JetBrains Mono, monospace"
      fontSize="10"
      fontWeight="500"
      fill="hsl(0 0% 100%)"
      fillOpacity="0.45"
      letterSpacing="2"
    >
      {k}
    </text>
    <text
      x={x}
      y="46"
      fontFamily="JetBrains Mono, monospace"
      fontSize="15"
      fontWeight="500"
      fill={accent ? "hsl(192 100% 60%)" : "hsl(0 0% 100%)"}
      fillOpacity={accent ? 1 : 0.85}
    >
      {v}
    </text>
  </g>
);

// ============================================================================
// Defs
// ============================================================================

const Defs = () => (
  <defs>
    <linearGradient id="hero-frame-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(210 100% 12%)" />
      <stop offset="100%" stopColor="hsl(210 100% 7%)" />
    </linearGradient>
    <radialGradient id="hero-corner-glow" cx="0%" cy="0%" r="60%">
      <stop offset="0%" stopColor="hsl(192 100% 44%)" stopOpacity="0.32" />
      <stop offset="100%" stopColor="hsl(192 100% 44%)" stopOpacity="0" />
    </radialGradient>
    <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path
        d="M 60 0 L 0 0 0 60"
        fill="none"
        stroke="hsl(192 100% 44%)"
        strokeOpacity="0.08"
        strokeWidth="1"
      />
    </pattern>
    <filter id="hero-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
