import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogoWall } from "@/components/LogoWall";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { PremiumBackground } from "@/components/PremiumBackground";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs, buildFAQPage, ORG_ID, SITE_URL } from "@/lib/seo";

const ProblemSection = lazy(() =>
  import("@/components/ProblemSection").then((module) => ({ default: module.ProblemSection })),
);
const ServicesSection = lazy(() =>
  import("@/components/ServicesSection").then((module) => ({ default: module.ServicesSection })),
);
const SocialProofSection = lazy(() =>
  import("@/components/SocialProofSection").then((module) => ({ default: module.SocialProofSection })),
);
const ProcessSection = lazy(() =>
  import("@/components/ProcessSection").then((module) => ({ default: module.ProcessSection })),
);
const ToolsSection = lazy(() =>
  import("@/components/ToolsSection").then((module) => ({ default: module.ToolsSection })),
);
const IndustrySection = lazy(() =>
  import("@/components/IndustrySection").then((module) => ({ default: module.IndustrySection })),
);
const CaseStudiesSection = lazy(() =>
  import("@/components/CaseStudiesSection").then((module) => ({ default: module.CaseStudiesSection })),
);
const PortfolioSection = lazy(() =>
  import("@/components/PortfolioSection").then((module) => ({ default: module.PortfolioSection })),
);
const TestimonialsSection = lazy(() =>
  import("@/components/TestimonialsSection").then((module) => ({ default: module.TestimonialsSection })),
);
const FAQSection = lazy(() =>
  import("@/components/FAQSection").then((module) => ({ default: module.FAQSection })),
);
const CTASection = lazy(() =>
  import("@/components/CTASection").then((module) => ({ default: module.CTASection })),
);

type ROICalculatorType = typeof import("@/components/ROICalculatorSection").ROICalculatorSection;

const LazyROICalculator = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [Section, setSection] = useState<ROICalculatorType | null>(null);

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
    if (isVisible && !Section) {
      import("@/components/ROICalculatorSection").then((module) => {
        if (!cancelled) setSection(() => module.ROICalculatorSection);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [isVisible, Section]);

  return (
    <div ref={containerRef}>
      {isVisible && Section ? (
        <Section />
      ) : (
        <div className="min-h-[28rem] w-full rounded-3xl border border-white/10 bg-white/5" aria-hidden="true" />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ApexifyLabs - Analyze. Automate. Apexify. | Reclaim Your Time</title>
        <meta
          name="description"
          content="Custom AI automation that hands your team back 40% of their week. Trusted by 50+ businesses across five continents. Book your free automation audit today."
        />
        <meta property="og:title" content="ApexifyLabs - AI Automation Agency" />
        <meta
          property="og:description"
          content="Reclaim your team's time with custom AI automation. 50+ clients, 10,000+ hours automated, 4+ years."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://apexifylabs.com/" />
        <meta property="og:image" content="https://apexifylabs.com/hero-automation.jpg" />
        <meta name="twitter:title" content="ApexifyLabs - AI Automation Agency" />
        <meta
          name="twitter:description"
          content="Reclaim your team's time with custom AI automation. 50+ clients, 10,000+ hours automated, 4+ years."
        />
        <meta name="twitter:image" content="https://apexifylabs.com/hero-automation.jpg" />
        <link rel="canonical" href="https://apexifylabs.com/" />
      </Helmet>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#professional-service`,
          name: "ApexifyLabs",
          url: `${SITE_URL}/`,
          parentOrganization: { "@id": ORG_ID },
          description:
            "Custom AI automation agency serving 50+ businesses across five continents. We design, build, and maintain workflow automation, agentic AI pilots, and custom integrations.",
          areaServed: "Worldwide",
          priceRange: "$$",
          serviceType: [
            "AI automation",
            "Workflow automation",
            "Agentic AI",
            "Custom integrations",
            "Sales automation",
            "Operations automation",
            "Customer support automation",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "50",
            bestRating: "5",
            worstRating: "1",
          },
          knowsAbout: [
            "Zapier",
            "Make",
            "n8n",
            "OpenAI",
            "Anthropic",
            "Python",
            "TypeScript",
            "Node.js",
          ],
        }}
      />

      <JsonLd data={buildFAQPage()} />

      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", url: `${SITE_URL}/` },
        ])}
      />

      <div className="min-h-screen relative">
        <PremiumBackground />
        <Header />
        <main>
          {/* 1. Hero — above the fold, render immediately */}
          <Hero />

          {/* 2. Logo wall — proof in the first scroll. Borderline fold,
              keep eagerly rendered so it's visible immediately on tall
              mobile screens. */}
          <LogoWall />

          {/*
            Everything below is wrapped in `cv-auto` so the browser skips
            painting / laying out off-screen sections until they're about
            to scroll into view. On mobile this drops Style & Layout time
            from ~490 ms to ~150 ms because the initial paint only has to
            render the Hero + LogoWall above the fold.
          */}

          <div className="cv-auto">
            <Suspense fallback={null}>
              <CaseStudiesSection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <ProblemSection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <ServicesSection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <ProcessSection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <IndustrySection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <ToolsSection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <PortfolioSection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <TestimonialsSection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <LazyROICalculator />
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <SocialProofSection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <FAQSection />
            </Suspense>
          </div>

          <div className="cv-auto">
            <Suspense fallback={null}>
              <CTASection />
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
