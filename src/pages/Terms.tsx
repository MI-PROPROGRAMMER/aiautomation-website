import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { CONTACT_EMAIL } from "@/config/constants";

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
        <main className="pt-32 pb-20">
          <section className="container mx-auto px-4 max-w-4xl space-y-10 text-primary-foreground">
            <header className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
              <p className="text-primary-foreground/80">Last updated: November 10, 2025</p>
            </header>
            <article className="space-y-6 glass-card p-8 rounded-2xl">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">1. Engagement</h2>
                <p className="text-primary-foreground/80">
                  By engaging ApexifyLabs, you agree to provide accurate project requirements and timely feedback so that
                  we can deliver the agreed-upon automation services.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">2. Deliverables</h2>
                <p className="text-primary-foreground/80">
                  Milestones, timelines, and deliverables will be defined in your project proposal or statement of work.
                  Adjustments require mutual written approval.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">3. Payment</h2>
                <p className="text-primary-foreground/80">
                  Payment terms are outlined in each proposal. Late payments may pause work until balances are resolved.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
                <p className="text-primary-foreground/80">
                  Upon full payment, ownership of custom automation assets transfers to you, unless otherwise specified in
                  the agreement. We reserve the right to showcase anonymized project outcomes for portfolio purposes.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">5. Contact</h2>
                <p className="text-primary-foreground/80">
                  Questions about these terms can be sent to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </section>
            </article>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;


