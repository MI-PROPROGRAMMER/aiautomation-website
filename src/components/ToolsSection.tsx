import { Shield, TrendingUp, Clock } from "lucide-react";

export const ToolsSection = () => {
  const tools = [
    { name: "Make.com", description: "Visual Automation" },
    { name: "n8n", description: "Open Source" },
    { name: "Zapier", description: "App Integration" },
    { name: "Botpress", description: "Chatbot Platform" },
    { name: "Python", description: "Custom Scripts" },
    { name: "Node.js", description: "Backend Logic" },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance standards",
    },
    {
      icon: TrendingUp,
      title: "Infinite Scalability",
      description: "Automations that grow with your business",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Proactive maintenance and instant issue resolution",
    },
  ];

  return (
    <section className="py-24 bg-[#F2F2F2]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Tool-Agnostic, <span className="text-gradient">Expert in the Best</span>
          </h2>
          <p className="text-xl text-primary/80">
            We choose the right technology to solve your problem efficiently, not the other way around
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-16">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="glass-card-light rounded-2xl p-6 text-center hover-lift"
            >
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent"></div>
              </div>
              <h3 className="font-bold text-primary mb-2">{tool.name}</h3>
              <p className="text-sm text-primary/80">{tool.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{benefit.title}</h3>
              <p className="text-primary/80 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
