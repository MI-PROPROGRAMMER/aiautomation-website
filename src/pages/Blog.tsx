import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { blogPosts } from "@/content/blog/posts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChapterMarker } from "@/components/ui/editorial";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs, ORG_ID, SITE_URL } from "@/lib/seo";

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
        <meta property="og:url" content="https://apexifylabs.com/blog" />
        <meta property="og:image" content="https://apexifylabs.com/hero-automation.jpg" />
        <meta name="twitter:title" content="ApexifyLabs Blog" />
        <meta
          name="twitter:description"
          content="Frameworks and playbooks for shipping AI automation with confidence."
        />
        <meta name="twitter:image" content="https://apexifylabs.com/hero-automation.jpg" />
        <link rel="canonical" href="https://apexifylabs.com/blog" />
      </Helmet>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          url: `${SITE_URL}/blog`,
          name: "ApexifyLabs Journal",
          description:
            "Playbooks, frameworks, and case studies on AI automation, agentic AI pilots, and automation ROI from the ApexifyLabs team.",
          publisher: { "@id": ORG_ID },
          blogPost: blogPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.frontmatter.title,
            url: `${SITE_URL}/blog/${post.slug}`,
            datePublished: new Date(post.frontmatter.date).toISOString(),
            author: post.frontmatter.author
              ? { "@type": "Person", name: post.frontmatter.author }
              : { "@id": ORG_ID },
            image: post.frontmatter.heroImage.startsWith("http")
              ? post.frontmatter.heroImage
              : `${SITE_URL}${post.frontmatter.heroImage}`,
          })),
        }}
      />

      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ])}
      />

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Editorial hero — left aligned */}
          <section className="relative overflow-hidden bg-primary pt-28 md:pt-40 pb-20">
            <div className="absolute inset-0 opacity-25" aria-hidden="true">
              <div className="absolute top-[-15%] left-[5%] h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute bottom-[-10%] right-[10%] h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl" />
            </div>
            <div className="container relative z-10 mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <ChapterMarker number="" label="The Journal" />
                <h1 className="mt-8 max-w-5xl text-4xl font-bold leading-[1.05] text-primary-foreground sm:text-5xl md:text-7xl lg:text-8xl">
                  Ship agentic AI
                  <span className="block font-normal text-gradient">with confidence.</span>
                </h1>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
                  How growth teams across the globe design, launch, and scale automation that
                  actually moves revenue, retention, and team happiness.
                </p>
              </div>
            </div>
          </section>

          {/* Posts grid — kept, but with hairline above */}
          <section className="bg-[hsl(var(--section-alt))] py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-7xl">
                <div className="hairline mb-16" aria-hidden="true" />
                <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                  {blogPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                  {blogPosts.length === 0 && (
                    <div className="md:col-span-2 xl:col-span-3">
                      <div className="lux-panel rounded-2xl border-dashed p-12 text-center">
                        <h2 className="text-2xl font-semibold text-primary-foreground">
                          New writing coming soon
                        </h2>
                        <p className="mt-2 text-primary-foreground/70">
                          We're busy writing actionable guides on AI automation. Be the first to know.
                        </p>
                        <Button asChild className="mt-6 gradient-accent hover-lift glow-accent">
                          <Link to="/contact">Join the waitlist</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
