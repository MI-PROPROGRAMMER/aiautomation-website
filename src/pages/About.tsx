import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Zap, Code2, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CALENDLY_LINK } from "@/config/constants";
import { PageLoader } from "@/components/PageLoader";
import { motion } from "framer-motion";
import { ChapterMarker, BentoTile, StatLine, HairlineRule } from "@/components/ui/editorial";

type GlobalReachMapType = typeof import("@/components/GlobalReachMap").default;

const MapSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [MapComponent, setMapComponent] = useState<GlobalReachMapType | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || isVisible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    let cancelled = false;
    if (isVisible && !MapComponent) {
      import("@/components/GlobalReachMap").then((module) => {
        if (!cancelled) setMapComponent(() => module.default);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [isVisible, MapComponent]);

  return (
    <BentoTile tone="flat" rounded="lg" className="relative overflow-hidden p-6 md:p-10">
      <div ref={containerRef} className="relative h-[400px] w-full overflow-hidden rounded-xl">
        {isVisible ? (
          MapComponent ? <MapComponent /> : <PageLoader />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/40">
            <span className="animate-pulse text-sm text-primary-foreground/70">Loading map…</span>
          </div>
        )}
      </div>
    </BentoTile>
  );
};

const VALUES = [
  {
    icon: Users,
    title: "Client-centric",
    description:
      "We start with your problem, never our solution. Every automation we build is shaped to your team's reality.",
  },
  {
    icon: Zap,
    title: "Efficiency obsessed",
    description:
      "There's always a better, faster, smarter way. We refine relentlessly and ship work we can stand behind.",
  },
  {
    icon: Target,
    title: "Transparent",
    description:
      "You're in the loop at every step — open communication, weekly demos, and zero surprises at delivery.",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - ApexifyLabs | Analyze. Automate. Apexify.</title>
        <meta
          name="description"
          content="Learn about ApexifyLabs's journey from scripters to strategic partners, helping 50+ global clients reclaim their time through intelligent automation."
        />
        <meta property="og:title" content="About Us - ApexifyLabs" />
        <meta
          property="og:description"
          content="Freeing businesses from the grind of repetitive work. For over four years, we've been helping teams reclaim their time."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://apexifylabs.com/about" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Editorial hero — left-aligned, not centered card */}
          <section className="relative overflow-hidden pt-40 pb-24 gradient-hero">
            <div className="absolute inset-0 opacity-25" aria-hidden="true">
              <div className="absolute -right-32 top-0 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -left-32 bottom-0 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-3xl" />
            </div>
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <ChapterMarker number="" label="About ApexifyLabs" />
                <h1 className="mt-8 max-w-5xl text-5xl font-bold leading-[1.02] text-primary-foreground md:text-7xl lg:text-8xl">
                  Freeing businesses from
                  <span className="block font-normal text-gradient">repetitive work.</span>
                </h1>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
                  For over four years, we've helped teams across five continents reclaim their time through
                  intelligent automation — and rebuild their businesses around the work that matters.
                </p>
              </div>
            </div>
          </section>

          {/* Our Journey — editorial spread, no placeholder box */}
          <section className="py-32 bg-primary">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="grid items-start gap-16 md:grid-cols-12 md:gap-20">
                  <div className="md:col-span-5 md:sticky md:top-32">
                    <ChapterMarker number="01" label="Our Journey" />
                    <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
                      From scripters to
                      <span className="block font-normal text-gradient">strategic partners.</span>
                    </h2>
                  </div>
                  <div className="md:col-span-7 space-y-6 text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
                    <p>
                      What started as a team of scripters automating simple tasks has evolved into something much
                      bigger. Over the past four years, we've transformed from technicians into strategic partners.
                    </p>
                    <p>
                      Today, we serve <span className="text-accent font-semibold">50+ global clients</span> across five
                      continents, helping them eliminate repetitive work and focus on what truly drives the business
                      forward.
                    </p>
                    <p>
                      We've learned that automation isn't just about writing code — it's about understanding workflows,
                      identifying bottlenecks, and creating systems that grow with the business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values — typographic columns, no boxes */}
          <section className="py-32 bg-[hsl(var(--section-alt))]">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="text-center">
                  <ChapterMarker number="02" label="What We Stand For" align="center" />
                  <h2 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl">
                    Why we do <span className="font-normal text-gradient">what we do.</span>
                  </h2>
                </div>

                <HairlineRule className="mt-16" />

                <div className="grid gap-12 md:grid-cols-3 md:gap-16 mt-16">
                  {VALUES.map((value, i) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <div className="num-display text-2xl text-primary-foreground/45">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <value.icon className="mt-6 h-7 w-7 text-accent" />
                      <h3 className="mt-6 text-2xl font-bold text-primary-foreground md:text-3xl">{value.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-primary-foreground/70">
                        {value.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Global Reach */}
          <section className="py-32 bg-primary">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 md:grid-cols-12 md:items-end md:gap-16 mb-16">
                  <div className="md:col-span-7">
                    <ChapterMarker number="03" label="Global Reach" />
                    <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
                      Active across
                      <span className="block font-normal text-gradient">five continents.</span>
                    </h2>
                  </div>
                  <div className="md:col-span-5">
                    <StatLine
                      size="md"
                      items={[
                        { value: "50+", label: "Clients" },
                        { value: "5", label: "Continents" },
                        { value: "4+", label: "Years" },
                      ]}
                    />
                  </div>
                </div>
                <MapSection />
              </div>
            </div>
          </section>

          {/* How we partner — distinct from Services' "Hybrid" pitch */}
          <section className="py-32 bg-[hsl(var(--section-alt))]">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-16 md:grid-cols-12 md:gap-20">
                  <div className="md:col-span-7">
                    <ChapterMarker label="How We Partner" />
                    <h2 className="mt-6 text-4xl font-bold leading-[1.05] text-primary-foreground md:text-5xl">
                      No black boxes.
                      <span className="block font-normal text-gradient">You own what we ship.</span>
                    </h2>
                    <p className="mt-8 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
                      Every engagement begins with a written acceptance criteria and ends with a clean, documented
                      handoff. We are not a black-box agency: you get the source, the credentials, and a runbook your
                      team can extend on day one — whether or not you renew with us.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm text-primary-foreground">
                        <Code2 className="h-4 w-4 text-accent" />
                        Source delivered
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm text-primary-foreground">
                        <Wrench className="h-4 w-4 text-accent" />
                        Documented runbooks
                      </span>
                    </div>
                  </div>
                  <BentoTile tone="feature" rounded="xl" withSheen className="md:col-span-5 p-10 md:p-12">
                    <span className="eyebrow">What you get on day one</span>
                    <ul className="mt-8 space-y-5 text-base text-primary-foreground/85 md:text-lg">
                      <li className="flex gap-4">
                        <span className="num-display text-accent">01</span>
                        <span>Source code, in your repo, under your licence.</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="num-display text-accent">02</span>
                        <span>All credentials and integrations transferred to your accounts.</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="num-display text-accent">03</span>
                        <span>Written runbook + Loom walkthrough, so your team can extend it.</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="num-display text-accent">04</span>
                        <span>30-day defect warranty, no-questions-asked.</span>
                      </li>
                    </ul>
                    <div className="hairline mt-10 mb-8" aria-hidden="true" />
                    <Button className="gradient-accent hover-lift glow-accent w-full sheen-card" asChild>
                      <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                        Discuss your project
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </BentoTile>
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
