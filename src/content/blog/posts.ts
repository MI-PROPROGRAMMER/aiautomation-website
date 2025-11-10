import type { ComponentType } from "react";

export type BlogFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  tags?: string[];
  heroImage: string;
  seoDescription?: string;
  readingTime?: string;
  draft?: boolean;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  Content: ComponentType<Record<string, unknown>>;
};

type MdxModule = {
  default: ComponentType<Record<string, unknown>>;
  frontmatter?: Partial<BlogFrontmatter> & { slug?: string };
};

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
    seoDescription,
    author,
    tags,
    readingTime,
    draft,
  } = frontmatter;

  if (!title || !excerpt || !heroImage || !date) {
    throw new Error(`Blog post "${fallbackSlug}" is missing required frontmatter fields.`);
  }

  return {
    title,
    excerpt,
    heroImage,
    date,
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
      Content: module.default,
    };
  })
  .filter((post) => post.frontmatter.draft !== true)
  .sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );

export const getPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

