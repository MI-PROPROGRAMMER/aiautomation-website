import { Mail, Linkedin, Twitter } from "lucide-react";
import { CALENDLY_LINK, CONTACT_EMAIL, SOCIAL_LINKS } from "@/config/constants";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4 text-primary-foreground">
              Apexify<span className="text-gradient">Labs</span>
            </div>
            <p className="text-primary-foreground/85 mb-6 max-w-md">
              Empowering businesses with intelligent AI automation. We help teams reclaim their time and focus on what
              truly matters.
            </p>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                aria-label="Visit ApexifyLabs on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                aria-label="Read ApexifyLabs updates on X"
              >
                <Twitter size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                aria-label="Email ApexifyLabs"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-primary-foreground/85 hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/85 hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary-foreground/85 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/#process" className="text-primary-foreground/85 hover:text-accent transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/#case-studies" className="text-primary-foreground/85 hover:text-accent transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/85 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-primary-foreground">Get In Touch</h3>
            <ul className="space-y-2 text-primary-foreground/85">
              <li>{CONTACT_EMAIL}</li>
              <li>+92 331 5183565</li>
              <li className="pt-2">
                <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  Book Free Audit →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/80 text-sm">© 2024 ApexifyLabs. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-primary-foreground/80">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
