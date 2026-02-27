import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { blogPosts } from "@/content/blog/posts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Insights & Playbooks - ApexifyLabs Blog</title>
        <meta
          name="description"
          content="Stay on top of AI automation trends, agentic AI blueprints, and ROI playbooks from the ApexifyLabs team."
        />
        <meta property="og:title" content="ApexifyLabs Blog" />
        <meta
          property="og:description"
          content="Articles, frameworks, and case studies that help you ship AI solutions with confidence."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://apexifylabs.com/blog" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="relative overflow-hidden bg-primary pt-32 pb-24">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-[-10%] left-[10%] h-80 w-80 rounded-full bg-accent blur-3xl" />
              <div className="absolute bottom-[-20%] right-[15%] h-96 w-96 rounded-full bg-primary/60 blur-3xl" />
              <div className="absolute left-1/4 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-accent/30" />
            </div>
            <div className="container relative z-10 mx-auto px-4 text-center md:max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent">
                Insights, Playbooks & Stories
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
                Ship Agentic AI solutions With Confidence
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Learn how growth teams across the globe design, launch, and scale automation that actually moves revenue,
                retention, and team happiness.
              </p>
            </div>
          </section>

          <section className="bg-[hsl(var(--section-alt))] py-20">
            <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 xl:grid-cols-3">
              {blogPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
              {blogPosts.length === 0 && (
                <div className="md:col-span-2 xl:col-span-3">
                  <div className="rounded-lg border border-dashed border-white/20 bg-white/5 p-12 text-center">
                    <h2 className="text-2xl font-semibold text-primary-foreground">New content coming soon</h2>
                    <p className="mt-2 text-primary-foreground/70">
                      We are busy writing actionable guides on AI automation. Be the first to know when they ship.
                    </p>
                    <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link to="/contact">Join the waitlist</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;

