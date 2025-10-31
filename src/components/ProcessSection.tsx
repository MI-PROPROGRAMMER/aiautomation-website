import { Search, Palette, Rocket, HeadphonesIcon } from "lucide-react";

export const ProcessSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Discovery & Analysis",
      description:
        "We deep-dive into your current processes to identify automation opportunities",
    },
    {
      icon: Palette,
      title: "Strategy & Planning",
      description: "Custom automation roadmap aligned with your business objectives",
    },
    {
      icon: Rocket,
      title: "Development & Testing",
      description: "Build, test, and refine automations in a controlled environment",
    },
    {
      icon: HeadphonesIcon,
      title: "Deploy & Optimize",
      description: "Launch with ongoing monitoring and continuous improvement",
    },
  ];

  return (
    <section id="process" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Our Proven Implementation <span className="text-gradient">Process</span>
          </h2>
          <p className="text-xl text-primary-foreground/80">
            From discovery to deployment, we ensure every automation delivers measurable results
          </p>
        </div>

        {/* Process Steps - Horizontal Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-card-light rounded-3xl p-8 hover-lift text-center"
            >
              <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 glow-accent">
                <step.icon className="w-10 h-10 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-4">{step.title}</h3>
              <p className="text-primary-foreground/80 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
