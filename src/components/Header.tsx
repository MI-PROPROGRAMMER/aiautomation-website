import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CALENDLY_LINK } from "@/config/constants";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/#case-studies", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-4 right-4 top-4 z-50 rounded-2xl transition-all duration-500 ${
        scrolled ? "premium-glass lux-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Wordmark */}
          <Link
            to="/"
            onClick={() => {
              // Reset the Hero scroll-jacking back to its initial state and
              // scroll to absolute top. Works both when already on /  (no
              // location change → ScrollToHash wouldn't fire) and after navigation.
              window.dispatchEvent(new CustomEvent("resetSection"));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display text-2xl tracking-tight text-primary-foreground transition-opacity hover:opacity-90"
          >
            Apexify<span className="text-gradient italic font-normal">Labs</span>
          </Link>

          {/* Desktop Navigation — letterspaced uppercase, editorial */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className="smallcaps text-[0.7rem] text-primary-foreground/80 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button
              size="sm"
              className="gradient-accent hover-lift glow-accent sheen-card px-5 py-5 text-sm"
              asChild
            >
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Free Audit
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="md:hidden text-primary-foreground cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            id="primary-navigation"
            className="md:hidden pb-6 pt-2 space-y-4 border-t border-white/10"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className="smallcaps block text-xs text-primary-foreground/85 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button className="w-full gradient-accent hover-lift glow-accent" asChild>
              <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                Free Audit
              </a>
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
};
