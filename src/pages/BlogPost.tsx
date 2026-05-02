import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/content/blog/posts";
import { MDXProvider } from "@mdx-js/react";
import { format } from "date-fns";
import { Calendar, Clock, Share2, Tag } from "lucide-react";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChapterMarker } from "@/components/ui/editorial";

const mdxComponents = {
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent/90 hover:decoration-accent/20"
    />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <img
      {...props}
      className="my-6 w-full rounded-xl border border-white/10 object-cover shadow-xl"
      loading={props.loading ?? "lazy"}
      decoding="async"
    />
  ),
  blockquote: ({ children }: PropsWithChildren) => (
    <blockquote className="my-6 border-l-2 border-accent/60 px-6 py-4 italic text-primary-foreground/90 bg-accent/5">
      {children}
    </blockquote>
  ),
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const {
    frontmatter: { title, excerpt, heroImage, date, tags, author, readingTime, seoDescription },
    Content,
  } = post;

  const formattedDate = format(new Date(date), "MMMM d, yyyy");
  const canonicalUrl = `https://apexifylabs.com/blog/${post.slug}`;

  return (
    <>
      <Helmet>
        <title>{`${title} | ApexifyLabs Journal`}</title>
        <meta name="description" content={seoDescription ?? excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={seoDescription ?? excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={heroImage} />
        <meta property="article:published_time" content={new Date(date).toISOString()} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <article>
            {/* Editorial hero — full-width image, large serif title below */}
            <section className="relative overflow-hidden bg-primary pt-32">
              <div className="absolute inset-0 opacity-25" aria-hidden="true">
                <div className="absolute top-[-15%] left-[5%] h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute bottom-[-10%] right-[10%] h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl" />
              </div>

              <div className="container relative z-10 mx-auto px-4 pb-16">
                <div className="mx-auto max-w-5xl">
                  <ChapterMarker number="" label="The Journal" />
                  <h1 className="mt-8 font-display text-4xl font-bold leading-[1.05] text-primary-foreground md:text-6xl lg:text-7xl">
                    {title}
                  </h1>
                  <p className="mt-8 max-w-3xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
                    {excerpt}
                  </p>
                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-primary-foreground/60">
                    <span className="smallcaps inline-flex items-center gap-2">
                      <Calendar size={14} />
                      {formattedDate}
                    </span>
                    {author && (
                      <span className="smallcaps inline-flex items-center gap-2">
                        <Tag size={14} />
                        {author}
                      </span>
                    )}
                    {readingTime && (
                      <span className="smallcaps inline-flex items-center gap-2">
                        <Clock size={14} />
                        {readingTime}
                      </span>
                    )}
                  </div>
                  {tags && tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {tags.map((tag) => (
                        <span key={tag} className="smallcaps text-[0.65rem] text-accent/90">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Button asChild className="gradient-accent hover-lift glow-accent sheen-card">
                      <Link to="/contact">Talk to us about automation</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      asChild
                      className="text-primary-foreground/85 hover:bg-white/5 hover:text-accent"
                    >
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(canonicalUrl)}&title=${encodeURIComponent(title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                      >
                        <Share2 size={14} className="mr-2" />
                        Share
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hero image — full-bleed slab */}
              <div className="relative">
                <div className="container mx-auto px-4">
                  <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl">
                    <img
                      src={heroImage}
                      alt={title}
                      className="h-[26rem] w-full object-cover md:h-[36rem]"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Content — narrow column, no glass card wrapper */}
            <section className="bg-background pb-32 pt-20">
              <div className="container mx-auto px-4">
                <div className="hairline mx-auto max-w-3xl mb-16" aria-hidden="true" />
                <div className="mx-auto max-w-3xl">
                  <div className="mdx-content">
                    <MDXProvider components={mdxComponents}>
                      <Content />
                    </MDXProvider>
                  </div>
                </div>
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
