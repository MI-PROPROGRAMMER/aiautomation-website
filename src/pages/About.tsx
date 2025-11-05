import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Zap, Globe, Code2, Wrench } from "lucide-react";
import { GlobalReachMap } from "@/components/GlobalReachMap";
import { CALENDLY_LINK } from "@/config/constants";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - ApexifyLabs | Analyze. Automate. Apexify.</title>
        <meta
          name="description"
          content="Learn about ApexifyLabs's journey from scripters to strategic partners, helping 50+ global clients reclaim their time through intelligent automation."
        />
        <meta
          name="keywords"
          content="about ApexifyLabs, automation agency, business automation, AI solutions, company story"
        />
        <meta property="og:title" content="About Us - ApexifyLabs" />
        <meta
          property="og:description"
          content="Freeing businesses from the grind of repetitive work. For over four years, we've been helping teams reclaim their time."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
            {/* Background decoration with geometric patterns */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-3xl"></div>
              {/* Geometric patterns */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-accent/30 rotate-45"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-accent/20 rotate-12"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
                  Freeing Businesses from the Grind of{" "}
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent to-white">
                    Repetitive Work
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
                  For over four years, we've been helping teams reclaim their time through intelligent automation
                </p>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="py-24 bg-primary">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* Left: Abstract visualization */}
                <div className="relative h-[400px] flex items-center justify-center rounded-xl overflow-hidden">
                  {/* Image placeholder - Replace with actual journey timeline visualization image */}
                  <div className="w-full h-full bg-primary/50 flex items-center justify-center border-2 border-dashed border-accent/30 rounded-xl">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-primary-foreground/60">Journey Timeline Visualization</p>
                      <p className="text-xs text-primary-foreground/40 mt-1">Image placeholder</p>
                    </div>
                  </div>
                  {/* Uncomment below and add image path when ready */}
                  {/* <img
                    src="/path/to/journey-timeline-visualization.jpg"
                    alt="Our Journey - Growth Timeline"
                    className="w-full h-full object-cover rounded-xl"
                  /> */}
                </div>

                {/* Right: Our Journey text */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                    Our <span className="text-gradient">Journey</span>
                  </h2>
                  <p className="text-lg text-primary-foreground/80 mb-4 leading-relaxed">
                    What started as a team of scripters automating simple tasks has evolved into something much bigger.
                    Over the past four years, we've transformed from technicians into strategic partners.
                  </p>
                  <p className="text-lg text-primary-foreground/80 mb-4 leading-relaxed">
                    Today, we serve 50+ global clients across five continents, helping them eliminate repetitive work
                    and focus on what truly drives their business forward. Our journey has been marked by continuous
                    learning, adapting to new technologies, and most importantly, understanding that every business has
                    unique challenges that require thoughtful solutions.
                  </p>
                  <p className="text-lg text-primary-foreground/80 leading-relaxed">
                    We've learned that automation isn't just about writing code—it's about understanding workflows,
                    identifying bottlenecks, and creating systems that grow with your business.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Values Section */}
          <section className="py-24 bg-[hsl(var(--section-alt))]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-primary-foreground">Why We Do</span>{" "}
                  <span className="text-accent">What We Do</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Value Card 1 */}
                <div className="glass-card p-8 rounded-xl hover-lift">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-4">Client-Centric</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    We start with your problem, not our solution. Every automation we build is tailored to your specific
                    needs, workflows, and goals.
                  </p>
                </div>

                {/* Value Card 2 */}
                <div className="glass-card p-8 rounded-xl hover-lift">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-4">Efficiency Obsessed</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    We believe there's always a better, faster, smarter way. We continuously refine our processes and
                    explore new technologies to deliver maximum value.
                  </p>
                </div>

                {/* Value Card 3 */}
                <div className="glass-card p-8 rounded-xl hover-lift">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-4">Transparent & Collaborative</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    You're involved in the process, every step of the way. We believe in open communication, regular
                    updates, and making sure you understand exactly what we're building.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Global Reach Visualization */}
          <section className="py-24 bg-primary">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <div className="text-center glass-card p-8 rounded-xl hover-lift">
                    <div className="text-5xl md:text-6xl font-bold text-gradient mb-2">50+</div>
                    <div className="text-xl text-primary-foreground/80">Clients</div>
                  </div>
                  <div className="text-center glass-card p-8 rounded-xl hover-lift">
                    <div className="text-5xl md:text-6xl font-bold text-gradient mb-2">5</div>
                    <div className="text-xl text-primary-foreground/80">Continents</div>
                  </div>
                  <div className="text-center glass-card p-8 rounded-xl hover-lift">
                    <div className="text-5xl md:text-6xl font-bold text-gradient mb-2">4+</div>
                    <div className="text-xl text-primary-foreground/80">Years</div>
                  </div>
                </div>

                {/* World Map Visualization */}
                <div className="relative glass-card p-12 rounded-xl overflow-hidden">
                  <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
                    <GlobalReachMap />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Philosophy Section */}
          <section className="py-24 bg-[hsl(var(--section-alt))]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                      Our <span className="text-gradient">Approach</span>
                    </h2>
                    <p className="text-lg text-primary-foreground/80 mb-4 leading-relaxed">
                      We don't believe in one-size-fits-all solutions. Our team combines deep expertise in both coded
                      automation and low-code platforms, giving us the flexibility to choose the right tool for each
                      problem.
                    </p>
                    <p className="text-lg text-primary-foreground/80 mb-6 leading-relaxed">
                      Sometimes the best solution is a custom Python script. Other times, it's a no-code workflow that
                      your team can modify themselves. We assess each situation objectively and recommend what will work
                      best for your specific needs, timeline, and budget.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
                        <Code2 className="w-5 h-5 text-accent" />
                        <span className="text-primary-foreground">Custom Code</span>
                      </div>
                      <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
                        <Wrench className="w-5 h-5 text-accent" />
                        <span className="text-primary-foreground">Low-Code</span>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-8 rounded-xl">
                    {/* Image placeholder - Replace with team/collaboration image */}
                    <div className="relative h-[300px] mb-6 rounded-xl overflow-hidden">
                      <div className="w-full h-full bg-primary/50 flex items-center justify-center border-2 border-dashed border-accent/30 rounded-xl">
                        <div className="text-center p-8">
                          <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-accent" />
                          </div>
                          <p className="text-sm text-primary-foreground/60">Team/Collaboration Image</p>
                          <p className="text-xs text-primary-foreground/40 mt-1">Image placeholder</p>
                        </div>
                      </div>
                      {/* Uncomment below and add image path when ready */}
                      {/* <img
                        src="/path/to/team-philosophy.jpg"
                        alt="Our Team Philosophy - Hybrid Approach"
                        className="w-full h-full object-cover rounded-xl"
                      /> */}
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gradient mb-4">Hybrid Expertise</div>
                      <p className="text-primary-foreground/80 mb-6">
                        We leverage the best of both worlds to deliver solutions that are powerful, maintainable, and
                        cost-effective.
                      </p>
                      <Button className="gradient-accent hover-lift glow-accent" asChild>
                        <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                          Let's Discuss Your Project
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;

