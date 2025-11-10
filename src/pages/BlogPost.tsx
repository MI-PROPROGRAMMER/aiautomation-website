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
    <blockquote className="my-6 border-l-4 border-accent/60 bg-accent/10 px-6 py-4 italic text-primary-foreground/90">
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
        <title>{`${title} | ApexifyLabs Blog`}</title>
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
            <section className="relative overflow-hidden bg-primary pt-32 pb-20">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[-15%] left-[5%] h-96 w-96 rounded-full bg-accent blur-3xl" />
                <div className="absolute bottom-[-10%] right-[10%] h-[26rem] w-[26rem] rounded-full bg-primary/60 blur-3xl" />
              </div>
              <div className="container relative z-10 mx-auto grid gap-10 px-4 lg:grid-cols-[3fr,2fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-3 text-sm text-accent/90">
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 uppercase tracking-[0.2em]">
                      ApexifyLabs Blog
                    </span>
                  </div>
                  <h1 className="mt-6 text-4xl font-semibold leading-tight text-primary-foreground md:text-6xl">
                    {title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">{excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={18} />
                      {formattedDate}
                    </span>
                    {author && (
                      <span className="inline-flex items-center gap-2">
                        <Tag size={18} />
                        {author}
                      </span>
                    )}
                    {readingTime && (
                      <span className="inline-flex items-center gap-2">
                        <Clock size={18} />
                        {readingTime}
                      </span>
                    )}
                  </div>
                  {tags && tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild variant="default" className="gradient-accent glow-accent">
                      <Link to="/contact">Talk to us about automation</Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-accent/50 bg-accent/10 text-accent hover:bg-accent/20"
                    >
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(canonicalUrl)}&title=${encodeURIComponent(title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                      >
                        <Share2 size={16} className="mr-2" />
                        Share on LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
                  <img
                    src={heroImage}
                    alt={title}
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </section>

            <section className="bg-background pb-24">
              <div className="container mx-auto px-4">
                <div className="mx-auto -mt-32 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl md:p-12">
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

