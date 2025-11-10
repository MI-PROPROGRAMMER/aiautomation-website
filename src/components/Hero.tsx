import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, Zap } from "lucide-react";
import { CALENDLY_LINK } from "@/config/constants";
import { Link } from "react-router-dom";

export const Hero = () => {
  const heroImage = "/hero-automation.jpg";

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AI Automation Dashboard"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary"></div>
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
            We design and deploy custom AI automation that handles the tedious work, so you and your team can focus on
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
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 text-lg px-8 py-6"
              asChild
            >
              <Link to="/#case-studies">See Our Success Stories</Link>
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
