import { Code2, Zap, Workflow, Shield } from "lucide-react";

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-[hsl(var(--section-alt))]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Your Business, Running on <span className="text-gradient">Autopilot</span>
          </h2>
          <p className="text-xl text-primary-foreground/80">
            We combine the speed of no-code solutions with the power of custom development to create automation that
            perfectly fits your unique needs.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Low-Code/No-Code */}
          <div className="glass-card-light rounded-3xl p-10 hover-lift">
            <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center mb-6">
              <Zap className="w-10 h-10 text-accent-foreground" />
            </div>
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">Low-Code/No-Code Agility</h3>
            <p className="text-lg text-primary-foreground mb-6">Fast, Flexible, and Powerful</p>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              We leverage platforms like Zapier, Make, and Bubble to get your automation up and running in days, not
              months.
            </p>
            <ul className="space-y-3">
              {[
                "Rapid deployment and iteration",
                "Visual workflow builders",
                "Seamless app integrations",
                "Cost-effective solutions",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-primary-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Custom-Coded */}
          <div className="glass-card-light rounded-3xl p-10 hover-lift">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6">
              <Code2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">Custom-Coded Precision</h3>
            <p className="text-lg text-primary-foreground mb-6">Complex Problems, Tailored Solutions</p>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              When your needs are unique or complex, we build custom solutions using Python, JavaScript, APIs, and cloud
              processes.
            </p>
            <ul className="space-y-3">
              {[
                "Unlimited customization possibilities",
                "Advanced data processing",
                "Complex business logic",
                "Scalable architecture",
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-primary-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hybrid Approach Benefits */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
          {[
            {
              icon: Workflow,
              title: "Start Fast, Scale Smart",
              description: "Begin with no-code for quick wins, then enhance with custom code as your needs evolve.",
            },
            {
              icon: Shield,
              title: "Best of Both Worlds",
              description: "Get the speed of no-code with the power and flexibility of custom development.",
            },
          ].map((benefit, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-primary-foreground mb-2">{benefit.title}</h4>
                <p className="text-primary-foreground/80 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
