import { ShoppingCart, Home, Heart, GraduationCap, Factory, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { ChapterMarker } from "@/components/ui/editorial";

export const IndustrySection = () => {
  const industries = [
    {
      icon: ShoppingCart,
      title: "E-commerce",
      outcome: "Order processing 2 days → 2 hours",
      features: [
        "Inventory synchronisation",
        "Order processing automation",
        "Customer journey optimisation",
        "Review management systems",
      ],
    },
    {
      icon: Home,
      title: "Real Estate",
      outcome: "Lead-to-tour cycle cut 4× on average",
      features: [
        "Lead qualification workflows",
        "Property listing automation",
        "Client communication sequences",
        "Contract management systems",
      ],
    },
    {
      icon: Heart,
      title: "Healthcare",
      outcome: "+60% appointment capacity, no headcount add",
      features: [
        "Patient appointment scheduling",
        "Insurance verification",
        "Medical record management",
        "Compliance reporting",
      ],
    },
    {
      icon: GraduationCap,
      title: "Education",
      outcome: "Enrollment ops down 70% in admin time",
      features: [
        "Student enrollment processes",
        "Grade management systems",
        "Parent communication automation",
        "Course scheduling optimisation",
      ],
    },
    {
      icon: Factory,
      title: "Finance",
      outcome: "Invoice cycle days → minutes",
      features: [
        "Invoice processing automation",
        "Payment reconciliation",
        "Financial reporting workflows",
        "Compliance documentation",
      ],
    },
    {
      icon: DollarSign,
      title: "Manufacturing",
      outcome: "Supply-chain exceptions caught 8× faster",
      features: [
        "Supply chain optimisation",
        "Quality control workflows",
        "Production scheduling",
        "Inventory management",
      ],
    },
  ];

  return (
    <section className="py-32 bg-[hsl(var(--section-alt))]">
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

          {/* Magazine table — two columns of three rows, hairlines between, NO boxes */}
          <div className="grid gap-x-16 gap-y-2 md:grid-cols-2">
            {industries.map((industry, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.article
                  key={industry.title}
                  className="group border-b border-primary-foreground/10 py-10"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <industry.icon className="h-6 w-6 text-accent" />
                      <h3 className="text-2xl font-bold text-primary-foreground md:text-3xl">
                        {industry.title}
                      </h3>
                    </div>
                    <span className="num-display text-sm text-primary-foreground/45">
                      {String(index + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm italic text-accent/85 md:text-base">
                    {industry.outcome}
                  </p>
                  <ul className="mt-6 grid gap-2 text-sm text-primary-foreground/70 md:grid-cols-2 md:text-base">
                    {industry.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 transition-colors group-hover:text-primary-foreground/90"
                      >
                        <span
                          className="mt-2 inline-block h-px w-3 bg-accent/70"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/* faint vertical hairline between left+right columns on desktop */}
                  {isLeft && (
                    <div
                      className="absolute hidden"
                      aria-hidden="true"
                    />
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
