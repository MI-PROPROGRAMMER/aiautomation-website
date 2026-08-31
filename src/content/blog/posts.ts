import type { ComponentType } from "react";

export type BlogFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  /** Set only when the article was materially revised; drives schema dateModified. */
  updated?: string;
  author?: string;
  tags?: string[];
  heroImage: string;
  seoDescription?: string;
  readingTime?: string;
  draft?: boolean;
};

/**
 * Question/answer pairs lifted from the post's own question-form H2s at build
 * time by the `mdx-blog-faq` Vite plugin, and used to emit FAQPage schema.
 * Absent when a post has no heading that passes the plugin's quality gates.
 */
export type FaqItem = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  faq: FaqItem[];
  Content: ComponentType<Record<string, unknown>>;
};

// scripts/seo-routes.ts reads these same fields out of the MDX source text to
// build <lastmod>, so both sides have to accept exactly one date shape.
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type MdxModule = {
  default: ComponentType<Record<string, unknown>>;
  frontmatter?: Partial<BlogFrontmatter> & { slug?: string };
  faq?: FaqItem[];
};

// Vite statically analyses `import.meta.glob(...)` and rewrites the call into
// inline imports at build time. That static analysis only fires when the call
// is in this exact shape — assigning `import.meta.glob` to a variable first
// (as this file used to do) suppresses the rewrite, so the call falls through
// to runtime where `import.meta.glob` is `undefined` and no posts load.
const modules = import.meta.glob<MdxModule>("./*.mdx", { eager: true });

const normalizeFrontmatter = (frontmatter: MdxModule["frontmatter"], fallbackSlug: string): BlogFrontmatter => {
  if (!frontmatter) {
    throw new Error(`Missing frontmatter in blog post: ${fallbackSlug}`);
  }

  const {
    title,
    excerpt,
    heroImage,
    date,
    updated,
    seoDescription,
    author,
    tags,
    readingTime,
    draft,
  } = frontmatter;

  if (!title || !excerpt || !heroImage || !date) {
    throw new Error(`Blog post "${fallbackSlug}" is missing required frontmatter fields.`);
  }

  if (updated !== undefined && !ISO_DATE_RE.test(updated)) {
    throw new Error(`Blog post "${fallbackSlug}" has frontmatter "updated" that is not YYYY-MM-DD: ${updated}`);
  }

  return {
    title,
    excerpt,
    heroImage,
    date,
    updated,
    seoDescription: seoDescription ?? excerpt,
    author,
    tags,
    readingTime,
    draft,
  };
};

const deriveSlug = (filePath: string, providedSlug?: string) => {
  if (providedSlug) {
    return providedSlug;
  }

  return filePath.replace("./", "").replace(/\.mdx?$/, "");
};

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([filePath, module]) => {
    const slug = deriveSlug(filePath, module.frontmatter?.slug);
    const frontmatter = normalizeFrontmatter(module.frontmatter, slug);

    return {
      slug,
      frontmatter,
      faq: module.faq ?? [],
      Content: module.default,
    };
  })
  .filter((post) => post.frontmatter.draft !== true)
  .sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );

export const getPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

