import { Routes, Route } from "react-router-dom";
import { ScrollToHash } from "@/components/ScrollToHash";

import IndexEager from "./pages/Index";
import ServicesEager from "./pages/Services";
import AboutEager from "./pages/About";
import ContactEager from "./pages/Contact";
import PrivacyEager from "./pages/Privacy";
import TermsEager from "./pages/Terms";
import BlogEager from "./pages/Blog";
import BlogPostEager from "./pages/BlogPost";
import NotFoundEager from "./pages/NotFound";

/**
 * Eager-import variant of AppRoutes used **only** by scripts/prerender.tsx.
 *
 * The runtime client uses AppRoutes from ./App, which lazy-loads each page
 * inside <Suspense> for a small initial bundle. During SSR via renderToString,
 * however, lazy components render the Suspense fallback — so per-page
 * <Helmet> content (titles, canonical, JSON-LD) never lands in the static
 * HTML. Bypassing lazy here makes prerender ship full SEO.
 *
 * This file is intentionally separate from App.tsx so the eager page imports
 * never enter the client bundle's static import graph (and never bloat the
 * entry chunk that ships to real users).
 */
export const AppRoutesStatic = () => (
  <>
    <ScrollToHash />
    <Routes>
      <Route path="/" element={<IndexEager />} />
      <Route path="/services" element={<ServicesEager />} />
      <Route path="/about" element={<AboutEager />} />
      <Route path="/contact" element={<ContactEager />} />
      <Route path="/blog" element={<BlogEager />} />
      <Route path="/blog/:slug" element={<BlogPostEager />} />
      <Route path="/privacy-policy" element={<PrivacyEager />} />
      <Route path="/terms-of-service" element={<TermsEager />} />
      <Route path="*" element={<NotFoundEager />} />
    </Routes>
  </>
);
