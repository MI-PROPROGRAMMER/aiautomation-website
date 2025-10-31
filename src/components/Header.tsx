import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-primary-foreground">
            UX<span className="text-gradient">PILOT</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
              Home
            </a>
            <a href="/services" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
              Services
            </a>
            <a href="/about" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
              About Us
            </a>
            <a href="#case-studies" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
              Case Studies
            </a>
            <a href="#process" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
              Process
            </a>
            <a href="/contact" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
              Contact Us
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="gradient-accent hover-lift glow-accent">
              Get Free Audit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a
              href="/"
              className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/services"
              className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="/about"
              className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#process"
              className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </a>
            <a
              href="#case-studies"
              className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </a>
            <a
              href="/contact"
              className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button className="w-full gradient-accent">Get Free Audit</Button>
          </div>
        )}
      </div>
    </header>
  );
};
