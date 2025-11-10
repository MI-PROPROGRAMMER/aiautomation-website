import type { BlogPost } from "@/content/blog/posts";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: BlogPost;
};

export const PostCard = ({ post }: PostCardProps) => {
  const {
    slug,
    frontmatter: { title, excerpt, heroImage, date, tags, readingTime },
  } = post;

  const formattedDate = format(new Date(date), "MMMM d, yyyy");

  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
      <Link to={`/blog/${slug}`}>
        <img
          src={heroImage}
          alt={title}
          className="h-56 w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-wide text-primary-foreground/60">
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} />
            {formattedDate}
          </span>
          {readingTime && (
            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              {readingTime}
            </span>
          )}
        </div>

        <Link to={`/blog/${slug}`}>
          <h3 className="text-2xl font-semibold text-primary-foreground transition-colors hover:text-accent">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-primary-foreground/70">{excerpt}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link
            to={`/blog/${slug}`}
            className="text-sm font-semibold text-accent transition-colors hover:text-accent/80"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};

