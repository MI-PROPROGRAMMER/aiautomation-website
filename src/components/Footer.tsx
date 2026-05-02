import { Mail, Linkedin, Twitter } from "lucide-react";
import { CALENDLY_LINK, CONTACT_EMAIL, SOCIAL_LINKS } from "@/config/constants";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="relative bg-[hsl(var(--footer-bg))] text-primary-foreground">
      {/* Top hairline */}
      <div className="hairline" aria-hidden="true" />

      <div className="container mx-auto px-4 py-20">
        {/* Editorial top row — wordmark + manifesto */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 mb-20">
          <div className="md:col-span-6">
            <Link
              to="/"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("resetSection"));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-display text-4xl text-primary-foreground transition-opacity hover:opacity-90 md:text-5xl"
            >
              Apexify<span className="text-gradient italic font-normal">Labs</span>
            </Link>
            <p className="display-italic mt-8 text-2xl italic leading-snug text-primary-foreground/80 md:text-3xl">
              Analyze. Automate. Apexify.
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-primary-foreground/65">
              Empowering businesses with intelligent AI automation. We help teams reclaim their time and focus on what
              actually matters.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow">Navigate</span>
            <ul className="mt-6 space-y-3">
              {[
                { to: "/services", label: "Services" },
                { to: "/#case-studies", label: "Work" },
                { to: "/about", label: "About" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="text-base text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow">Get in touch</span>
            <ul className="mt-6 space-y-3 text-base text-primary-foreground/80">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-accent"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href="tel:+923315183565" className="transition-colors hover:text-accent">
                  +92 331 5183565
                </a>
              </li>
              <li className="pt-3">
                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-foreground"
                >
                  Book a free audit →
                </a>
              </li>
            </ul>

            <div className="mt-8 flex gap-3">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-primary-foreground/15 hover:border-accent/60 hover:bg-accent/10 flex items-center justify-center transition-colors"
                aria-label="ApexifyLabs on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-primary-foreground/15 hover:border-accent/60 hover:bg-accent/10 flex items-center justify-center transition-colors"
                aria-label="ApexifyLabs on X"
              >
                <Twitter size={16} />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="h-9 w-9 rounded-full border border-primary-foreground/15 hover:border-accent/60 hover:bg-accent/10 flex items-center justify-center transition-colors"
                aria-label="Email ApexifyLabs"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Hairline + colophon */}
        <div className="hairline-soft" aria-hidden="true" />
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
          <p className="smallcaps text-xs text-primary-foreground/55">
            © {new Date().getFullYear()} ApexifyLabs · All rights reserved
          </p>
          <div className="flex gap-8 text-xs text-primary-foreground/55">
            <Link to="/privacy-policy" className="smallcaps hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="smallcaps hover:text-accent transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
