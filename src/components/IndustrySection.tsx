import { ShoppingCart, Home, Heart, GraduationCap, Factory, DollarSign } from "lucide-react";

export const IndustrySection = () => {
  const industries = [
    {
      icon: ShoppingCart,
      title: "E-commerce",
      features: [
        "Inventory synchronization",
        "Order processing automation",
        "Customer journey optimization",
        "Review management systems",
      ],
    },
    {
      icon: Home,
      title: "Real Estate",
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
      features: [
        "Patient appointment scheduling",
        "Insurance verification workflows",
        "Medical record management",
        "Compliance reporting automation",
      ],
    },
    {
      icon: GraduationCap,
      title: "Education",
      features: [
        "Student enrollment processes",
        "Grade management systems",
        "Parent communication automation",
        "Course scheduling optimization",
      ],
    },
    {
      icon: Factory,
      title: "Finance",
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
      features: [
        "Supply chain optimization",
        "Quality control workflows",
        "Production scheduling",
        "Inventory management",
      ],
    },
  ];

  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Industry-Specific <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Tailored automation strategies for your industry's unique challenges
          </p>
        </div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="glass-card-light rounded-2xl p-8 hover-lift"
            >
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <industry.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-6">{industry.title}</h3>
              <ul className="space-y-3">
                {industry.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-primary-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
