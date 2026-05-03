import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { CONTACT_EMAIL } from "@/config/constants";
import { ChapterMarker } from "@/components/ui/editorial";

const SECTIONS = [
  {
    heading: "Information we collect",
    body: "We collect information you provide through contact forms, consultation bookings, and client onboarding activities. This may include your name, email address, company details, and project requirements.",
  },
  {
    heading: "How we use your information",
    body: "We use collected information to respond to inquiries, deliver automation services, improve our offerings, and share relevant updates. We do not sell or trade your data.",
  },
  {
    heading: "Data security",
    body: "We implement administrative and technical safeguards to protect your data. Access is restricted to team members who need the information to deliver our services.",
  },
  {
    heading: "Third-party services",
    body: "We may share data with trusted service providers (such as automation platforms or email services) only when necessary to complete your project, and always under confidentiality obligations.",
  },
];

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
        <main className="pt-28 md:pt-40 pb-16 md:pb-24">
          <section className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <ChapterMarker number="" label="Legal" />
              <h1 className="mt-8 text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl md:text-7xl">
                Privacy <span className="font-normal text-gradient">policy.</span>
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
                    <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">Your rights</h2>
                    <p className="mt-4 text-base leading-relaxed text-primary-foreground/75 md:text-lg">
                      You may request access to, correction of, or deletion of your personal data. Contact us at{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent/80">
                        {CONTACT_EMAIL}
                      </a>{" "}
                      to make a request.
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

export default PrivacyPolicy;
