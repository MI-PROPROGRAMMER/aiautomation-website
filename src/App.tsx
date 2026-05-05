import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { PropsWithChildren } from "react";
import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLoader } from "@/components/PageLoader";
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

const ChatbotWidget = lazy(() =>
  import("@/components/chatbot/ChatbotWidget").then((m) => ({ default: m.ChatbotWidget }))
);

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/Privacy"));
const TermsOfService = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

const ClientOnlyChatbot = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <ChatbotWidget />
    </Suspense>
  );
};

export const AppProviders = ({ children }: PropsWithChildren) => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    {children}
    <ClientOnlyChatbot />
  </TooltipProvider>
);

export const AppRoutes = () => (
  <>
    <ScrollToHash />
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  </>
);

/**
 * Eager-import variant of AppRoutes used only by scripts/prerender.tsx.
 * Lazy + Suspense renders the fallback during renderToString, which
 * strips per-page <Helmet> output (titles, meta, JSON-LD) from the
 * static HTML. Bypassing lazy here makes prerender ship full SEO.
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

const App = () => (
  <BrowserRouter>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </BrowserRouter>
);

export default App;
