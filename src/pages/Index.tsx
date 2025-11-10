import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Suspense, lazy } from "react";
import { PageLoader } from "@/components/PageLoader";

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
const ROICalculatorSection = lazy(() =>
  import("@/components/ROICalculatorSection").then((module) => ({ default: module.ROICalculatorSection })),
);
const CaseStudiesSection = lazy(() =>
  import("@/components/CaseStudiesSection").then((module) => ({ default: module.CaseStudiesSection })),
);
const ServicesCTASection = lazy(() =>
  import("@/components/ServicesCTASection").then((module) => ({ default: module.ServicesCTASection })),
);
const FAQSection = lazy(() =>
  import("@/components/FAQSection").then((module) => ({ default: module.FAQSection })),
);
const CTASection = lazy(() =>
  import("@/components/CTASection").then((module) => ({ default: module.CTASection })),
);

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ApexifyLabs - Analyze. Automate. Apexify. | Reclaim Your Time</title>
        <meta
          name="description"
          content="Transform your business with custom AI automation. We help teams eliminate repetitive tasks and focus on strategic work. Book your free automation audit today."
        />
        <meta
          name="keywords"
          content="AI automation, business automation, workflow automation, custom automation, AI solutions"
        />
        <meta property="og:title" content="ApexifyLabs - AI Automation Agency" />
        <meta
          property="og:description"
          content="Reclaim your time with custom AI automation solutions. Trusted by 50+ businesses worldwide."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://apexifylabs.com/" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Suspense fallback={<PageLoader />}>
            <ProblemSection />
          </Suspense>
          <Suspense fallback={<PageLoader />}>
            <ServicesSection />
          </Suspense>
          <Suspense fallback={null}>
            <SocialProofSection />
          </Suspense>
          <Suspense fallback={null}>
            <ProcessSection />
          </Suspense>
          <Suspense fallback={null}>
            <ToolsSection />
          </Suspense>
          <Suspense fallback={null}>
            <IndustrySection />
          </Suspense>
          <Suspense fallback={<PageLoader />}>
            <ROICalculatorSection />
          </Suspense>
          <Suspense fallback={null}>
            <CaseStudiesSection />
          </Suspense>
          <Suspense fallback={null}>
            <ServicesCTASection />
          </Suspense>
          <Suspense fallback={null}>
            <FAQSection />
          </Suspense>
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
