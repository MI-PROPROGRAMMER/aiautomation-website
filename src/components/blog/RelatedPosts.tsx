import type { BlogPost } from "@/content/blog/posts";
import { getRelatedPosts } from "@/lib/blog-taxonomy";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type RelatedPostsProps = {
  post: BlogPost;
};

/**
 * Tag-matched further reading, rendered at the end of every article.
 *
 * The archive was previously a flat list: posts averaged 0.6 links to each
 * other and 54 of them had exactly one inbound link — the /blog index — so
 * authority earned by any single post stayed trapped on that page instead of
 * lifting the cluster around it. Matching is weighted by tag rarity, so a
 * shared "Detention" counts for far more than a shared "Logistics".
 */
export const RelatedPosts = ({ post }: RelatedPostsProps) => {
  const related = getRelatedPosts(post);

  if (related.length === 0) {
    return null;
  }

  return (
    <nav aria-labelledby="related-posts-heading" className="mt-16">
      <h2
        id="related-posts-heading"
        className="font-display text-2xl font-bold leading-tight text-primary-foreground md:text-3xl"
      >
        Keep reading
      </h2>

      <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
        {related.map((item) => (
          <li key={item.slug} className="bg-background">
            <Link
              to={`/blog/${item.slug}`}
              className="group flex h-full cursor-pointer flex-col gap-3 p-6 transition-colors duration-200 hover:bg-white/[0.03]"
            >
              {item.frontmatter.tags?.[0] && (
                <span className="smallcaps text-[0.65rem] text-accent/85">
                  {item.frontmatter.tags[0]}
                </span>
              )}

              <span className="font-display text-lg font-bold leading-snug text-primary-foreground transition-colors duration-200 group-hover:text-accent">
                {item.frontmatter.title}
              </span>

              <span className="line-clamp-3 text-sm leading-relaxed text-primary-foreground/65">
                {item.frontmatter.excerpt}
              </span>

              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-accent">
                Read
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
