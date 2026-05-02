import type { BlogPost } from "@/content/blog/posts";
import { format } from "date-fns";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
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
    <article className="group relative">
      <Link to={`/blog/${slug}`} className="block overflow-hidden rounded-xl">
        <div className="aspect-[3/2] overflow-hidden">
          <img
            src={heroImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Link>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
          <span className="smallcaps text-[0.7rem] text-primary-foreground/55">
            <Calendar size={12} className="mr-1.5 inline-block" />
            {formattedDate}
          </span>
          {readingTime && (
            <span className="smallcaps text-[0.7rem] text-primary-foreground/55">
              <Clock size={12} className="mr-1.5 inline-block" />
              {readingTime}
            </span>
          )}
        </div>

        <Link to={`/blog/${slug}`}>
          <h3 className="font-display text-2xl font-bold leading-tight text-primary-foreground transition-colors group-hover:text-accent md:text-3xl">
            {title}
          </h3>
        </Link>

        <p className="text-base leading-relaxed text-primary-foreground/70">{excerpt}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="smallcaps text-[0.65rem] text-accent/85"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/blog/${slug}`}
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-foreground"
        >
          <span className="border-b border-accent/40 pb-0.5 transition-colors group-hover:border-accent">
            Read essay
          </span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
};
