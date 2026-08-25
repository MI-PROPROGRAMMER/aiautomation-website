import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChapterMarker } from "@/components/ui/editorial";

const DESTINATIONS = [
  { to: "/", label: "Home", note: "AI automation agency overview" },
  { to: "/services", label: "Services", note: "What we design, build, and maintain" },
  { to: "/blog", label: "Journal", note: "Operator-level automation write-ups" },
  { to: "/contact", label: "Contact", note: "Talk to us about a workflow" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      {/*
        No canonical here: a not-found document must never point search engines
        at a URL as though it were the page they asked for. `follow` keeps the
        navigation below crawlable so the links out of a dead URL still count.
      */}
      <Helmet>
        <title>Page Not Found | ApexifyLabs</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="The requested ApexifyLabs page could not be found." />
      </Helmet>
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="pt-28 md:pt-40 pb-16 md:pb-24">
          <section className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <ChapterMarker number="" label="404" />
              <h1 className="mt-8 text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl md:text-7xl">
                Page <span className="font-normal text-gradient">not found.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
                The URL you followed doesn&apos;t match anything we publish. It may have moved, or
                the link may be mistyped.
              </p>

              <div className="hairline mt-16 mb-12" aria-hidden="true" />

              <ul className="grid gap-px overflow-hidden sm:grid-cols-2">
                {DESTINATIONS.map((destination) => (
                  <li key={destination.to}>
                    <Link
                      to={destination.to}
                      className="block cursor-pointer border border-primary-foreground/10 px-6 py-8 transition-colors duration-200 hover:border-accent/50 hover:bg-accent/5"
                    >
                      <span className="smallcaps text-xs text-accent">{destination.label}</span>
                      <span className="mt-2 block text-primary-foreground/70">
                        {destination.note}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
