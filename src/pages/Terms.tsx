import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { CONTACT_EMAIL } from "@/config/constants";
import { ChapterMarker } from "@/components/ui/editorial";

const SECTIONS = [
  {
    heading: "Engagement",
    body: "By engaging ApexifyLabs, you agree to provide accurate project requirements and timely feedback so that we can deliver the agreed-upon automation services.",
  },
  {
    heading: "Deliverables",
    body: "Milestones, timelines, and deliverables will be defined in your project proposal or statement of work. Adjustments require mutual written approval.",
  },
  {
    heading: "Payment",
    body: "Payment terms are outlined in each proposal. Late payments may pause work until balances are resolved.",
  },
  {
    heading: "Intellectual property",
    body: "Upon full payment, ownership of custom automation assets transfers to you, unless otherwise specified in the agreement. We reserve the right to showcase anonymised project outcomes for portfolio purposes.",
  },
];

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - ApexifyLabs</title>
        <meta
          name="description"
          content="Review the engagement terms, responsibilities, and service guidelines for working with ApexifyLabs."
        />
        <link rel="canonical" href="https://apexifylabs.com/terms-of-service" />
      </Helmet>
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="pt-28 md:pt-40 pb-16 md:pb-24">
          <section className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <ChapterMarker number="" label="Legal" />
              <h1 className="mt-8 text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl md:text-7xl">
                Terms of <span className="font-normal text-gradient">service.</span>
              </h1>
              <p className="mt-6 smallcaps text-xs text-primary-foreground/60">
                Last updated · November 10, 2025
              </p>

              <div className="hairline mt-16 mb-12" aria-hidden="true" />

              <ol className="space-y-12">
                {SECTIONS.map((section, i) => (
                  <li key={section.heading} className="grid gap-6 md:grid-cols-12 md:gap-12">
                    <div className="md:col-span-3">
                      <span className="num-display text-3xl text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="md:col-span-9">
                      <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
                        {section.heading}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                        {section.body}
                      </p>
                    </div>
                  </li>
                ))}
                <li className="grid gap-6 md:grid-cols-12 md:gap-12 border-t border-primary-foreground/10 pt-12">
                  <div className="md:col-span-3">
                    <span className="num-display text-3xl text-accent">05</span>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">Contact</h2>
                    <p className="mt-4 text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                      Questions about these terms can be sent to{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent/80">
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;
