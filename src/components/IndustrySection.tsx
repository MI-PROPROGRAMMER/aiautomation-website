import {
  Cloud,
  DollarSign,
  Factory,
  GraduationCap,
  HardHat,
  Heart,
  Home,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { ChapterMarker } from "@/components/ui/editorial";
import { INDUSTRIES } from "@/content/industries";

/**
 * Industries covered, read from `src/content/industries`.
 *
 * This section previously held its own hardcoded copy of the industry list,
 * including outcome figures that were not sourced anywhere in the codebase.
 * Both problems are the drift `src/content/portfolio.ts` warns about: one
 * surface stating something another contradicts. Reading the registry means
 * the card and the page it links to cannot disagree, and each card now carries
 * a cited figure rather than an unattributed claim.
 */
const ICONS: Record<string, LucideIcon> = {
  ShoppingCart,
  Truck,
  HardHat,
  Heart,
  DollarSign,
  Factory,
  Home,
  GraduationCap,
  Cloud,
};

export const IndustrySection = () => (
  <section className="bg-[hsl(var(--section-alt))] py-20 md:py-32">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-7xl">
        {/* Editorial header */}
        <div className="mb-20 grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <ChapterMarker number="05" label="Specialisations" />
            <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
              Industry-specific
              <span className="block font-normal text-gradient">solutions.</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:pt-16">
            <p className="text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
              Tailored automation strategies for the operational realities of your industry —
              regulatory, technical, and commercial.
            </p>
          </div>
        </div>

        {/* Magazine table — hairlines between rows, no boxes */}
        <div className="grid gap-x-16 gap-y-2 md:grid-cols-2">
          {INDUSTRIES.map((industry, index) => {
            const Icon = ICONS[industry.icon] ?? Factory;
            return (
              <m.article
                key={industry.path}
                className="group border-b border-primary-foreground/10 py-10"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Icon className="h-6 w-6 text-accent" />
                    <h3 className="text-2xl font-bold text-primary-foreground md:text-3xl">
                      <Link
                        to={industry.path}
                        className="cursor-pointer transition-colors duration-200 hover:text-accent"
                      >
                        {industry.name}
                      </Link>
                    </h3>
                  </div>
                  <span className="num-display text-sm text-primary-foreground/45">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(INDUSTRIES.length).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-3 text-sm italic text-accent/85 md:text-base">
                  {industry.cardStat}
                </p>

                <ul className="mt-6 grid gap-2 text-sm text-primary-foreground/70 md:grid-cols-2 md:text-base">
                  {industry.workflows.items.slice(0, 4).map((workflow) => (
                    <li
                      key={workflow}
                      className="flex items-start gap-2.5 transition-colors group-hover:text-primary-foreground/90"
                    >
                      <span
                        className="mt-2 inline-block h-px w-3 bg-accent/70"
                        aria-hidden="true"
                      />
                      <span>{workflow}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={industry.path}
                  className="mt-6 inline-block cursor-pointer text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-foreground"
                >
                  <span className="border-b border-accent/40 pb-0.5">
                    AI automation for {industry.name.toLowerCase()}
                  </span>
                </Link>
              </m.article>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
