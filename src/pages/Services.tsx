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
import { ChapterMarker, StatLine } from "@/components/ui/editorial";
import { JsonLd } from "@/components/JsonLd";
import {
  buildBreadcrumbs,
  buildFAQPage,
  buildHowTo,
  ORG_ID,
  SITE_URL,
} from "@/lib/seo";

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services - AI Solutions | ApexifyLabs</title>
        <meta
          name="description"
          content="Explore our comprehensive automation services: Sales & Marketing, Operations & Workflow, and Customer Support automation. Custom solutions tailored to your business needs."
        />
        <meta property="og:title" content="Our Services - ApexifyLabs" />
        <meta
          property="og:description"
          content="Transform your business with our comprehensive automation services across sales, operations, and customer support."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://apexifylabs.com/services" />
        <meta property="og:image" content="https://apexifylabs.com/hero-automation.jpg" />
        <meta name="twitter:title" content="Our Services - ApexifyLabs" />
        <meta
          name="twitter:description"
          content="Sales, operations, and support automation built to fit your business — not the other way around."
        />
        <meta name="twitter:image" content="https://apexifylabs.com/hero-automation.jpg" />
        <link rel="canonical" href="https://apexifylabs.com/services" />
      </Helmet>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${SITE_URL}/services#service`,
          name: "AI automation services",
          url: `${SITE_URL}/services`,
          provider: { "@id": ORG_ID },
          areaServed: "Worldwide",
          serviceType: "AI automation",
          description:
            "Custom AI automation across sales, operations, and customer support — combining low-code platforms (Zapier, Make, n8n) with custom-coded systems (Python, TypeScript) to ship in 2–6 weeks.",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "ApexifyLabs automation services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Low-Code Agility",
                  description:
                    "Rapid automation built on Zapier, Make, n8n, and Bubble — shipped in days for clear playbooks.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Custom-Coded Precision",
                  description:
                    "Python, TypeScript, and cloud-function systems for complex business logic, advanced data processing, and scalable architecture.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Sales & Marketing automation",
                  description:
                    "Lead enrichment, outbound sequencing, attribution, and CRM hygiene workflows.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Operations & Workflow automation",
                  description:
                    "Internal tools, approval workflows, data sync, and reporting automation.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Customer Support automation",
                  description:
                    "Chatbots, ticket routing, knowledge-base sync, and SLA monitoring.",
                },
              },
            ],
          },
        }}
      />

      <JsonLd data={buildHowTo()} />

      <JsonLd data={buildFAQPage()} />

      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Services", url: `${SITE_URL}/services` },
        ])}
      />

      <div className="min-h-screen">
        <Header />
        <main>
          {/* Editorial hero — left aligned, no centered card */}
          <section className="relative overflow-hidden pt-28 md:pt-40 pb-16 md:pb-24 gradient-hero">
            <div className="absolute inset-0 opacity-25" aria-hidden="true">
              <div className="absolute -right-32 top-0 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -left-32 bottom-0 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <ChapterMarker number="" label="Services" />
                <h1 className="mt-8 max-w-5xl text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl md:text-7xl lg:text-8xl">
                  We don't sell tools.
                  <span className="block font-normal text-gradient">We deliver outcomes.</span>
                </h1>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
                  Our automation work tackles the most time-consuming, error-prone, judgment-light tasks
                  across your business — and gives that capacity back to your team.
                </p>

                <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Button size="lg" className="gradient-accent hover-lift glow-accent px-10 py-6 sheen-card" asChild>
                    <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                      Book free consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="group text-primary-foreground/85 hover:bg-transparent hover:text-accent"
                    asChild
                  >
                    <a href="#case-studies">
                      <span className="border-b border-primary-foreground/30 pb-1 transition-colors group-hover:border-accent">
                        See real outcomes
                      </span>
                    </a>
                  </Button>
                </div>

                <div className="mt-20">
                  <div className="hairline mb-12 max-w-md" aria-hidden="true" />
                  <StatLine
                    size="md"
                    items={[
                      { value: "4+", label: "Years experience" },
                      { value: "50+", label: "Clients served" },
                      { value: "10K+", label: "Hours automated" },
                    ]}
                  />
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
