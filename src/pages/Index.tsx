import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogoWall } from "@/components/LogoWall";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { PageLoader } from "@/components/PageLoader";
import { PremiumBackground } from "@/components/PremiumBackground";

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
        <link rel="canonical" href="https://apexifylabs.com/" />
      </Helmet>

      <div className="min-h-screen relative">
        <PremiumBackground />
        <Header />
        <main>
          {/* 1. Hero */}
          <Hero />

          {/* 2. Logo wall — proof in the first scroll */}
          <LogoWall />

          {/* 3. Case Studies — credibility before capability */}
          <Suspense fallback={null}>
            <CaseStudiesSection />
          </Suspense>

          {/* 4. Problem */}
          <Suspense fallback={<PageLoader />}>
            <ProblemSection />
          </Suspense>

          {/* 5. Services */}
          <Suspense fallback={<PageLoader />}>
            <ServicesSection />
          </Suspense>

          {/* 6. Process */}
          <Suspense fallback={null}>
            <ProcessSection />
          </Suspense>

          {/* 7. Industries */}
          <Suspense fallback={null}>
            <IndustrySection />
          </Suspense>

          {/* 8. Tools / Integrations */}
          <Suspense fallback={null}>
            <ToolsSection />
          </Suspense>

          {/* 9. Selected Work — what we actually built */}
          <Suspense fallback={null}>
            <PortfolioSection />
          </Suspense>

          {/* 10. Testimonials — named voices */}
          <Suspense fallback={null}>
            <TestimonialsSection />
          </Suspense>

          {/* 10. ROI Calculator */}
          <LazyROICalculator />

          {/* 11. Social proof / global reach */}
          <Suspense fallback={null}>
            <SocialProofSection />
          </Suspense>

          {/* 12. FAQ */}
          <Suspense fallback={null}>
            <FAQSection />
          </Suspense>

          {/* 13. Final CTA */}
          <Suspense fallback={null}>
            <CTASection />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
