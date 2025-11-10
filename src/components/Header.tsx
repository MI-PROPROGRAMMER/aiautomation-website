import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { CALENDLY_LINK } from "@/config/constants";
import { Link } from "react-router-dom";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-foreground">
            Apexify<span className="text-gradient">Labs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-primary-foreground/95 hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm text-primary-foreground/95 hover:text-accent transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-sm text-primary-foreground/95 hover:text-accent transition-colors">
              About Us
            </Link>
            <Link to="/blog" className="text-sm text-primary-foreground/95 hover:text-accent transition-colors">
              Blog
            </Link>
            <Link to="/#case-studies" className="text-sm text-primary-foreground/95 hover:text-accent transition-colors">
              Case Studies
            </Link>
            <Link to="/#process" className="text-sm text-primary-foreground/95 hover:text-accent transition-colors">
              Process
            </Link>
            <Link to="/contact" className="text-sm text-primary-foreground/95 hover:text-accent transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="gradient-accent hover-lift glow-accent" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Get Free Audit
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="primary-navigation" className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-sm text-primary-foreground/90 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block text-sm text-primary-foreground/90 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block text-sm text-primary-foreground/90 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/blog"
              className="block text-sm text-primary-foreground/90 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/#process"
              className="block text-sm text-primary-foreground/90 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </Link>
            <Link
              to="/#case-studies"
              className="block text-sm text-primary-foreground/90 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link
              to="/contact"
              className="block text-sm text-primary-foreground/90 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="w-full gradient-accent" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Get Free Audit
              </a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
