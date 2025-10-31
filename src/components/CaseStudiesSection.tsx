import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { Button } from "./ui/button";

export const CaseStudiesSection = () => {
  const caseStudies = [
    {
      company: "TechCorp",
      industry: "SaaS",
      challenge: "Manual lead qualification wasting 15 hours per week",
      result: "90% time saved on lead processing",
      stats: [
        { icon: Clock, value: "15hrs", label: "saved weekly" },
        { icon: TrendingUp, value: "3x", label: "more leads processed" },
        { icon: DollarSign, value: "$78K", label: "annual savings" },
      ],
    },
    {
      company: "RetailHub",
      industry: "E-commerce",
      challenge: "Order processing taking 2 days, causing delivery delays",
      result: "Same-day order fulfillment achieved",
      stats: [
        { icon: Clock, value: "2 days", label: "reduced to 2 hours" },
        { icon: TrendingUp, value: "98%", label: "customer satisfaction" },
        { icon: DollarSign, value: "$120K", label: "annual savings" },
      ],
    },
    {
      company: "HealthFirst",
      industry: "Healthcare",
      challenge: "Patient appointment scheduling overwhelming staff",
      result: "Fully automated scheduling system",
      stats: [
        { icon: Clock, value: "25hrs", label: "saved weekly" },
        { icon: TrendingUp, value: "60%", label: "more appointments" },
        { icon: DollarSign, value: "$95K", label: "annual savings" },
      ],
    },
  ];

  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Client Success <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Real results from businesses that automated with us
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="glass-card-light rounded-3xl p-8 hover-lift"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-lg bg-accent"></div>
                </div>
                <div>
                  <h3 className="font-bold text-primary-foreground">{study.company}</h3>
                  <p className="text-sm text-primary-foreground/80">{study.industry}</p>
                </div>
              </div>

              <p className="text-sm text-primary-foreground/80 mb-4">
                <span className="font-semibold text-primary-foreground">Challenge:</span> {study.challenge}
              </p>

              <p className="text-accent font-semibold mb-6">{study.result}</p>

              <div className="space-y-4">
                {study.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <stat.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold text-primary-foreground">{stat.value}</p>
                      <p className="text-xs text-primary-foreground/80">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            View All Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
};
