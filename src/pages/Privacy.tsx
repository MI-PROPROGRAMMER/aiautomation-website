import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { CONTACT_EMAIL } from "@/config/constants";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - ApexifyLabs</title>
        <meta
          name="description"
          content="Learn how ApexifyLabs collects, uses, and safeguards your information when you engage with our automation services."
        />
        <link rel="canonical" href="https://apexifylabs.com/privacy-policy" />
      </Helmet>
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="pt-32 pb-20">
          <section className="container mx-auto px-4 max-w-4xl space-y-10 text-primary-foreground">
            <header className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
              <p className="text-primary-foreground/80">Last updated: November 10, 2025</p>
            </header>
            <article className="space-y-6 glass-card p-8 rounded-2xl">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
                <p className="text-primary-foreground/80">
                  We collect information you provide through contact forms, consultation bookings, and client onboarding
                  activities. This may include your name, email address, company details, and project requirements.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
                <p className="text-primary-foreground/80">
                  We use collected information to respond to inquiries, deliver automation services, improve our
                  offerings, and share relevant updates. We do not sell or trade your data.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">3. Data Security</h2>
                <p className="text-primary-foreground/80">
                  We implement administrative and technical safeguards to protect your data. Access is restricted to team
                  members who need the information to deliver our services.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">4. Third-Party Services</h2>
                <p className="text-primary-foreground/80">
                  We may share data with trusted service providers (such as automation platforms or email services) only
                  when necessary to complete your project and always under confidentiality obligations.
                </p>
              </section>
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold">5. Your Rights</h2>
                <p className="text-primary-foreground/80">
                  You may request access to, correction of, or deletion of your personal data. Contact us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
                    {CONTACT_EMAIL}
                  </a>{" "}
                  to make a request.
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

export default PrivacyPolicy;


