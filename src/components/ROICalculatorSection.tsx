import { Button } from "./ui/button";
import { Calculator } from "lucide-react";
import { useState, useMemo, useId } from "react";
import { Slider } from "./ui/slider";
import { CALENDLY_LINK } from "@/config/constants";
import { ChapterMarker, BentoTile } from "@/components/ui/editorial";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const WEEKS_IN_YEAR = 52;

const formatUSD = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const formatCompact = (n: number) =>
  n.toLocaleString("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });

export const ROICalculatorSection = () => {
  const [teamMembers, setTeamMembers] = useState([10]);
  const [hoursPerWeek, setHoursPerWeek] = useState([20]);
  const [hourlyCost, setHourlyCost] = useState([50]);
  const teamLabelId = useId();
  const hoursLabelId = useId();
  const costLabelId = useId();

  const calculations = useMemo(() => {
    const employees = teamMembers[0];
    const hours = hoursPerWeek[0];
    const cost = hourlyCost[0];

    const weekly = employees * hours * cost;
    const monthly = weekly * 4;
    const annual = weekly * WEEKS_IN_YEAR;

    return {
      weekly,
      monthly,
      annual,
      weeklyFmt: formatUSD(weekly),
      monthlyFmt: formatUSD(monthly),
      annualFmt: formatUSD(annual),
    };
  }, [teamMembers, hoursPerWeek, hourlyCost]);

  // Cumulative weekly savings curve, week 1 → 52
  const chartData = useMemo(() => {
    return Array.from({ length: WEEKS_IN_YEAR }).map((_, i) => ({
      week: i + 1,
      saved: calculations.weekly * (i + 1),
    }));
  }, [calculations.weekly]);

  return (
    <section className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Editorial header */}
          <div className="mb-16 grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <ChapterMarker label="Calculator" />
              <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                Calculate your
                <span className="block text-3xl font-normal text-primary-foreground/85 md:text-5xl">
                  automation <span className="text-gradient">ROI.</span>
                </span>
              </h2>
            </div>
            <div className="md:col-span-6 md:pt-16">
              <p className="text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
                Three sliders. A live cumulative-savings curve. An honest first read on the time and money
                currently tied up in repetitive work.
              </p>
            </div>
          </div>

          {/* Two-pane: inputs (flat) + outputs (feature with live chart) */}
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            {/* Inputs */}
            <BentoTile tone="flat" rounded="lg" className="md:col-span-5 p-6 md:p-12 space-y-8 md:space-y-10">
              <SliderInput
                labelId={teamLabelId}
                label="Team members on manual work"
                value={teamMembers}
                onChange={setTeamMembers}
                min={1}
                max={50}
                step={1}
                suffix="employees"
              />
              <div className="hairline-soft" aria-hidden="true" />
              <SliderInput
                labelId={hoursLabelId}
                label="Hours spent per week"
                value={hoursPerWeek}
                onChange={setHoursPerWeek}
                min={1}
                max={40}
                step={1}
                suffix="hrs/week"
              />
              <div className="hairline-soft" aria-hidden="true" />
              <SliderInput
                labelId={costLabelId}
                label="Average hourly cost"
                value={hourlyCost}
                onChange={setHourlyCost}
                min={10}
                max={200}
                step={5}
                prefix="$"
                suffix="/hour"
              />
            </BentoTile>

            {/* Outputs — live chart + KPIs */}
            <BentoTile tone="feature" rounded="lg" className="md:col-span-7 p-6 md:p-10">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calculator className="h-5 w-5 text-accent" />
                  <span className="tech-label text-[0.7rem] text-primary-foreground/85">
                    cumulative savings · 52 weeks
                  </span>
                </div>
                <span className="tech-numeral text-xs text-accent">live</span>
              </div>

              {/* Live chart */}
              <div className="h-56 w-full md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="roiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="hsl(var(--accent) / 0.12)"
                      strokeDasharray="2 4"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
                      stroke="hsl(var(--primary-foreground) / 0.4)"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      ticks={[1, 13, 26, 39, 52]}
                      tickFormatter={(v) => `wk ${v}`}
                    />
                    <YAxis
                      stroke="hsl(var(--primary-foreground) / 0.4)"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `$${formatCompact(Number(v))}`}
                      width={50}
                    />
                    <Tooltip
                      cursor={{ stroke: "hsl(var(--accent) / 0.4)", strokeWidth: 1 }}
                      contentStyle={{
                        background: "hsl(var(--primary))",
                        border: "1px solid hsl(var(--accent) / 0.4)",
                        borderRadius: 6,
                        fontSize: 12,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                      labelFormatter={(label) => `Week ${label}`}
                      formatter={(value: number) => [formatUSD(value), "saved"]}
                      labelStyle={{ color: "hsl(var(--primary-foreground) / 0.7)" }}
                      itemStyle={{ color: "hsl(var(--accent))" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="saved"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      fill="url(#roiGrad)"
                      animationDuration={400}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* KPI strip */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-accent/15 pt-6">
                <KPI label="weekly" value={calculations.weeklyFmt} />
                <KPI label="monthly" value={calculations.monthlyFmt} />
                <KPI label="annual" value={calculations.annualFmt} accent />
              </div>

              <p className="mt-8 text-xs text-primary-foreground/60">
                <span className="tech-numeral text-accent">avg ROI: 3 months.</span> Based on engagements
                where the automation absorbed the full identified workload.
              </p>
            </BentoTile>
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              size="lg"
              className="gradient-accent text-accent-foreground font-semibold px-10 py-6 hover-lift glow-accent"
              asChild
            >
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Get your custom ROI report
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SliderInput = ({
  labelId,
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  labelId: string;
  label: string;
  value: number[];
  onChange: (v: number[]) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) => (
  <div>
    <label id={labelId} className="tech-label block text-[0.65rem] text-primary-foreground/70">
      {label}
    </label>
    <Slider
      value={value}
      onValueChange={onChange}
      max={max}
      min={min}
      step={step}
      className="mt-4 mb-3"
      aria-labelledby={labelId}
    />
    <div className="flex items-baseline justify-between">
      <span className="tech-numeral text-xs text-primary-foreground/55">
        {prefix}{min}
      </span>
      <p className="tech-numeral text-2xl font-medium text-primary-foreground">
        {prefix}{value[0]}{" "}
        <span className="tech-label text-[0.6rem] text-primary-foreground/55">{suffix}</span>
      </p>
      <span className="tech-numeral text-xs text-primary-foreground/55">
        {prefix}{max}
      </span>
    </div>
  </div>
);

const KPI = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div>
    <span className="tech-label text-[0.6rem] text-primary-foreground/55">{label}</span>
    <p
      className={`tech-numeral mt-1 text-2xl font-semibold md:text-3xl ${
        accent ? "text-accent" : "text-primary-foreground"
      }`}
    >
      {value}
    </p>
  </div>
);
