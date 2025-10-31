import { Globe, Building2, Store, Heart } from "lucide-react";

export const SocialProofSection = () => {
  const locations = [
    { country: "USA", projects: 25 },
    { country: "UK", projects: 12 },
    { country: "Australia", projects: 8 },
    { country: "Canada", projects: 15 },
  ];

  const industries = [
    { icon: Building2, name: "Enterprise", count: "20+ Companies", color: "bg-blue-500/10 text-blue-500" },
    { icon: Store, name: "E-commerce", count: "10+ Stores", color: "bg-purple-500/10 text-purple-500" },
    { icon: Heart, name: "Healthcare", count: "8+ Practices", color: "bg-green-500/10 text-green-500" },
    { icon: Globe, name: "Startups", count: "15+ Companies", color: "bg-orange-500/10 text-orange-500" },
  ];

  return (
    <section className="py-24 bg-[#F2F2F2]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Trusted by <span className="text-gradient">50+ Businesses</span> Across the Globe
          </h2>
          <p className="text-xl text-primary/80">
            Delivering automation solutions across industries from startups to Fortune 500 companies.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {[
            { value: "4+", label: "Years Experience" },
            { value: "50+", label: "Clients Served" },
            { value: "10K+", label: "Hours Automated", subtext: "Time returned to our clients for strategic work" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-card-light rounded-3xl p-8 text-center hover-lift"
            >
              <div className="text-5xl font-bold text-gradient mb-3">{stat.value}</div>
              <div className="text-lg font-semibold text-primary mb-2">{stat.label}</div>
              {stat.subtext && <p className="text-sm text-primary/80">{stat.subtext}</p>}
            </div>
          ))}
        </div>

        {/* Global Reach */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-center text-primary mb-8">Global Impact, Local Excellence</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="text-center p-6 glass-card-light rounded-xl hover-lift">
                <div className="text-3xl font-bold text-accent mb-2">{location.projects}</div>
                <div className="text-sm text-primary/80">Active Projects</div>
                <div className="text-lg font-semibold text-primary mt-2">{location.country}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-primary mb-8">Industries We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="glass-card-light rounded-xl p-6 text-center hover-lift">
                <div className={`w-16 h-16 rounded-xl ${industry.color} flex items-center justify-center mx-auto mb-4`}>
                  <industry.icon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-primary mb-1">{industry.name}</h4>
                <p className="text-sm text-primary/80">{industry.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
