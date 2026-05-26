import type { PropsWithChildren } from "react";
import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { PageLoader } from "@/components/PageLoader";
import { ScrollToHash } from "@/components/ScrollToHash";

// Both Toasters are lazy-loaded — they only need to mount before the first
// toast actually fires. Keeping them out of the eager bundle saves the
// radix-toast (~53 KiB gzip) and sonner (~16 KiB gzip) chunks from first
// paint. They land in the background and are ready well before any user
// interaction triggers a toast.
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

const ChatbotWidget = lazy(() =>
  import("@/components/chatbot/ChatbotWidget").then((m) => ({ default: m.ChatbotWidget }))
);

// Index is eager-imported. main.tsx uses createRoot().render() (not
// hydrateRoot), so React discards the prerendered DOM and re-renders from
// scratch on boot. If Index were lazy, the route-level <Suspense> below
// would paint <PageLoader /> for the duration of the chunk download — a
// visible "prerendered DOM → Loading… → real DOM" flash on first paint.
//
// Trade-off: pages aren't in manualChunks (vite.config.ts), so Index now
// ships in the entry chunk and other-route visitors download it too.
// Accepted because the homepage is the dominant landing. Structural fix
// (kills the same flash on every prerendered route, drops the cost) is
// hydrateRoot at src/main.tsx — left as follow-up because react-helmet
// and framer-motion need a careful hydration-mismatch pass first.
import Index from "./pages/Index";
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
  // No TooltipProvider here — the only consumer of @radix-ui/react-tooltip
  // was the dead-code sidebar.tsx scaffold file, so wrapping the app in a
  // provider was paying ~30 KB gzip for radix-tooltip + Floating UI without
  // ever rendering a tooltip. Both Toasters are also lazy-loaded.
  <LazyMotion features={domAnimation} strict>
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
    </Suspense>
    {children}
    <ClientOnlyChatbot />
  </LazyMotion>
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

// AppRoutesStatic (eager-imported variant for scripts/prerender.tsx) lives
// in src/AppStatic.tsx so the eager page imports never enter the client
// bundle's static import graph.

const App = () => (
  <BrowserRouter>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </BrowserRouter>
);

export default App;
