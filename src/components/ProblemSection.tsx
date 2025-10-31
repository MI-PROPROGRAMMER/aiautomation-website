import { AlertCircle, Database, MessageSquare, Users } from "lucide-react";

export const ProblemSection = () => {
  const problems = [
    {
      icon: Database,
      title: "Manual Data Entry",
      description: "Manual data entry between apps eating up hours each day?",
    },
    {
      icon: MessageSquare,
      title: "Lost Inquiries",
      description: "Customer inquiries getting lost or delayed in the shuffle?",
    },
    {
      icon: AlertCircle,
      title: "Error-Prone Processes",
      description: "Inconsistent and error-prone internal processes causing headaches?",
    },
    {
      icon: Users,
      title: "No Strategic Time",
      description: "Your team is busy working in the business, but never on it?",
    },
  ];

  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Is Your Team's Potential <span className="text-gradient">Trapped</span> in Repetitive Tasks?
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Every minute your team spends on manual, repetitive work is a minute stolen from innovation, strategy, and
            growth.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="glass-card-light rounded-2xl p-8 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <problem.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">{problem.title}</h3>
              <p className="text-primary-foreground/80 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Card */}
        <div className="max-w-5xl mx-auto glass-card-light rounded-3xl p-12">
          <h3 className="text-2xl font-bold text-center text-primary-foreground mb-12">The Hidden Cost of Manual Work</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "40%", label: "of work time spent on repetitive tasks" },
              { value: "$15K", label: "average annual cost per employee" },
              { value: "73%", label: "of employees want to automate tasks" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-gradient mb-3">{stat.value}</div>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
