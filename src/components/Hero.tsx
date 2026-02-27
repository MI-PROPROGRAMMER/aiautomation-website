import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Zap } from "lucide-react";
import { CALENDLY_LINK } from "@/config/constants";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#011629] via-[#011932] to-[#021a33]" aria-hidden="true" />
        <div
          className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
          role="presentation"
        />
        <div
          className="absolute -bottom-16 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
          role="presentation"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(118,228,247,0.18),transparent_55%)]"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight animate-fade-in-up">
            Reclaim Your Time.
            <br />
            <span className="text-gradient">Revolutionize Your Operations.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto animate-fade-in">
            We design and deploy custom AI solutions that handles the tedious work, so you and your team can focus on
            what truly drives your business forward.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-scale-in">
            <Button size="lg" className="gradient-accent hover-lift glow-accent text-lg px-8 py-6" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Book a Free Automation Audit
                <ArrowRight className="ml-2" size={20} />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 text-lg px-8 py-6" asChild>
              <Link to="/#portfolio">See Our Portfolio</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 animate-fade-in">
            {[
              { icon: Clock, label: "Years Experience", value: "4+" },
              { icon: Users, label: "Clients Served", value: "50+" },
              { icon: Zap, label: "Hours Automated", value: "10K+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-4xl font-bold text-primary-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F2F2F2] to-transparent z-10"></div>
    </section>
  );
};
