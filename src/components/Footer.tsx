import { Mail, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              UX<span className="text-gradient">PILOT</span>
            </div>
            <p className="text-primary-foreground/70 mb-6 max-w-md">
              Empowering businesses with intelligent AI automation. We help teams reclaim their time and focus on what
              truly matters.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#process" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Process
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>contact@uxpilot.ai</li>
              <li>+1 (555) 123-4567</li>
              <li className="pt-2">
                <a href="#" className="text-accent hover:underline">
                  Book Free Audit →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">© 2024 UX Pilot. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
