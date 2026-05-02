import { motion } from "framer-motion";

/**
 * WorkflowPreview — small node-graph diagrams used inside service tiles.
 * Two variants:
 *   - "linear":   trigger → filter → transform → action  (low-code feel)
 *   - "branching": single source fans out to 3 destinations + merge (custom feel)
 */

interface Props {
  variant: "linear" | "branching";
  className?: string;
}

export const WorkflowPreview = ({ variant, className }: Props) => {
  if (variant === "linear") return <LinearPreview className={className} />;
  return <BranchingPreview className={className} />;
};

const Node = ({
  x,
  y,
  label,
  active,
}: {
  x: number;
  y: number;
  label: string;
  active?: boolean;
}) => (
  <g>
    <rect
      x={x - 18}
      y={y - 6}
      width="36"
      height="12"
      rx="2.5"
      fill={active ? "hsl(var(--accent) / 0.18)" : "hsl(var(--primary) / 0.7)"}
      stroke={active ? "hsl(var(--accent) / 0.85)" : "hsl(var(--accent) / 0.35)"}
      strokeWidth="0.5"
    />
    <text
      x={x}
      y={y + 1.5}
      textAnchor="middle"
      fontSize="3.5"
      fontFamily="JetBrains Mono, monospace"
      fill={active ? "hsl(var(--accent))" : "hsl(var(--primary-foreground) / 0.85)"}
      fontWeight="500"
    >
      {label}
    </text>
  </g>
);

const Edge = ({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
}) => (
  <>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="hsl(var(--accent) / 0.35)"
      strokeWidth="0.4"
    />
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="hsl(var(--accent))"
      strokeWidth="0.7"
      strokeDasharray="2 8"
      initial={{ strokeDashoffset: 0 }}
      animate={{ strokeDashoffset: -10 }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay }}
    />
  </>
);

const LinearPreview = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 36"
    className={className}
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label="Workflow preview: trigger to filter to transform to action"
  >
    {/* connectors */}
    <Edge x1={28} y1={18} x2={68} y2={18} delay={0} />
    <Edge x1={104} y1={18} x2={132} y2={18} delay={0.6} />
    <Edge x1={168} y1={18} x2={196} y2={18} delay={1.2} />
    {/* nodes */}
    <Node x={28} y={18} label="trigger" />
    <Node x={86} y={18} label="filter" />
    <Node x={150} y={18} label="enrich" active />
    <Node x={196 - 18} y={18} label="action" />
  </svg>
);

const BranchingPreview = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 80"
    className={className}
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label="Workflow preview: source fans out to API, queue, and DB then merges"
  >
    {/* fan-out edges */}
    <Edge x1={36} y1={40} x2={86} y2={14} delay={0} />
    <Edge x1={36} y1={40} x2={86} y2={40} delay={0.3} />
    <Edge x1={36} y1={40} x2={86} y2={66} delay={0.6} />
    {/* fan-in edges */}
    <Edge x1={104} y1={14} x2={154} y2={40} delay={0.9} />
    <Edge x1={104} y1={40} x2={154} y2={40} delay={1.1} />
    <Edge x1={104} y1={66} x2={154} y2={40} delay={1.3} />
    {/* nodes */}
    <Node x={36} y={40} label="webhook" />
    <Node x={86} y={14} label="GPT-4" />
    <Node x={86} y={40} label="db lookup" active />
    <Node x={86} y={66} label="queue" />
    <Node x={170} y={40} label="POST" />
  </svg>
);
