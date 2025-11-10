import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ToolsSection } from "@/components/ToolsSection";
import { IndustrySection } from "@/components/IndustrySection";
import { ROICalculatorSection } from "@/components/ROICalculatorSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { ServicesCTASection } from "@/components/ServicesCTASection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

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
          {/* <SocialProofSection /> */}
          <ServicesSection />
          <ProcessSection />
          <ToolsSection />
          <IndustrySection />
          <ROICalculatorSection />
          <CaseStudiesSection />
          <ServicesCTASection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
