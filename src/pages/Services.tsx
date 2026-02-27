import { Header } from "@/components/Header";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ToolsSection } from "@/components/ToolsSection";
import { IndustrySection } from "@/components/IndustrySection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { ServicesCTASection } from "@/components/ServicesCTASection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CALENDLY_LINK } from "@/config/constants";

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services - AI Solutions | ApexifyLabs</title>
        <meta
          name="description"
          content="Explore our comprehensive automation services: Sales & Marketing, Operations & Workflow, and Customer Support automation. Custom solutions tailored to your business needs."
        />
        <meta
          name="keywords"
          content="automation services, sales automation, marketing automation, workflow automation, customer support automation, AI solutions"
        />
        <meta property="og:title" content="Our Services - ApexifyLabs" />
        <meta
          property="og:description"
          content="Transform your business with our comprehensive automation services across sales, operations, and customer support."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://apexifylabs.com/services" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
                  We don't just sell tools, We deliver{" "}
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-accent to-white">
                    outcomes.
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
                  Our comprehensive AI system services tackle the most time-consuming challenges across your entire
                  business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gradient-accent hover-lift glow-accent text-lg px-8 py-6" asChild>
                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                      Book Free Consultation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
                    asChild
                  >
                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                      Watch Demo
                    </a>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">500+</div>
                    <div className="text-primary-foreground/80">Processes Automated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">98%</div>
                    <div className="text-primary-foreground/80">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">24/7</div>
                    <div className="text-primary-foreground/80">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ServicesSection />
          <ProcessSection />
          <ToolsSection />
          <IndustrySection />
          <CaseStudiesSection />
          <ServicesCTASection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Services;
