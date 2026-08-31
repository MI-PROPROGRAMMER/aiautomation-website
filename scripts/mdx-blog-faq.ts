import type { Plugin } from "vite";

/**
 * Extracts FAQPage-eligible question/answer pairs from blog post source at
 * build time and appends them to each MDX module as `export const faq`.
 *
 * 80% of the H2 headings across the archive are already written as questions,
 * with the answer in the paragraph directly beneath. That is exactly the shape
 * FAQPage schema wants, so the data already exists — it just was not being
 * emitted. Doing this as a source transform rather than a remark plugin keeps
 * it to string handling: MDX accepts ESM exports anywhere at the top level, so
 * appending an export to the source is enough, and the alternative (injecting
 * an `mdxjsEsm` node) would mean hand-building an estree for no gain.
 *
 * Schema answers must match what a reader actually sees on the page, so the
 * answer text is always the real paragraph from the article, only stripped of
 * Markdown syntax. Nothing is invented or summarised.
 */

/** Answers shorter than this are fragments; longer ones read as truncated. */
const MIN_ANSWER = 40;
const MAX_ANSWER = 500;
/** Cap per post. A page listing every H2 as an FAQ reads as keyword stuffing. */
const MAX_ITEMS = 6;

export type FaqItem = { question: string; answer: string };

/** Reduces inline Markdown/MDX to the plain text a reader sees. */
const toPlainText = (markdown: string): string =>
  markdown
    // Images first — otherwise the link rule below eats the alt text.
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1$2")
    .replace(/_{1,2}([^_]+)_{1,2}/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Second-person sales prompts ("Curious what this is costing you?") are written
 * as question headings but are calls to action, not information. Marking them
 * up as FAQ answers is exactly the pattern that reads as schema spam.
 */
const CTA_QUESTION =
  /^(curious|want|wondering|ready|interested|shall we|should we talk|can we|need help)\b/i;

/** A short paragraph that runs straight into a list or table is a lead-in. */
const LEAD_IN_MAX = 200;

const isStructural = (line: string): boolean =>
  line.startsWith("#") ||
  line.startsWith("|") ||
  line.startsWith(">") ||
  line.startsWith("<") ||
  line.startsWith("export ") ||
  line.startsWith("import ") ||
  /^[-*+]\s/.test(line) ||
  /^\d+\.\s/.test(line);

export const extractFaq = (source: string): FaqItem[] => {
  const lines = source.split(/\r?\n/);
  const items: FaqItem[] = [];
  const seen = new Set<string>();

  let inFence = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const heading = line.match(/^##\s+(.*\?)\s*$/);
    if (!heading) continue;

    const question = toPlainText(heading[1]);
    if (!question || seen.has(question.toLowerCase())) continue;
    if (CTA_QUESTION.test(question)) continue;

    // Collect the first plain paragraph beneath the heading. A list, table or
    // fence directly under the question means there is no clean prose answer,
    // so the heading is skipped rather than answered with a fragment.
    const paragraph: string[] = [];
    let followedByBlock = false;

    for (let j = i + 1; j < lines.length; j += 1) {
      const next = lines[j].trim();

      if (next === "") {
        if (paragraph.length > 0) {
          // Look past the blank line: a list or table here means the paragraph
          // was introducing it rather than answering on its own.
          const after = lines.slice(j + 1).find((l) => l.trim() !== "")?.trim() ?? "";
          followedByBlock =
            after.startsWith("|") || /^[-*+]\s/.test(after) || /^\d+\.\s/.test(after);
          break;
        }
        continue;
      }
      if (next.startsWith("```") || isStructural(next)) {
        followedByBlock = !next.startsWith("#");
        break;
      }

      paragraph.push(next);
    }

    if (paragraph.length === 0) continue;

    const answer = toPlainText(paragraph.join(" "));
    if (answer.length < MIN_ANSWER || answer.length > MAX_ANSWER) continue;
    // A paragraph ending in a colon introduces a table or list rather than
    // answering the question ("the comparison looks like this:"), so it would
    // stand alone badly as a schema answer.
    if (answer.endsWith(":")) continue;
    if (followedByBlock && answer.length < LEAD_IN_MAX) continue;

    seen.add(question.toLowerCase());
    items.push({ question, answer });

    if (items.length >= MAX_ITEMS) break;
  }

  return items;
};

const BLOG_SOURCE = /[\\/]src[\\/]content[\\/]blog[\\/][^\\/]+\.mdx$/;

export const mdxBlogFaq = (): Plugin => ({
  name: "mdx-blog-faq",
  // Must beat @mdx-js/rollup to the source, which runs as a normal plugin.
  enforce: "pre",
  transform(code, id, options) {
    const [filePath] = id.split("?");
    if (!BLOG_SOURCE.test(filePath)) return null;

    // Emitted only into the SSR graph, which is deliberate. The FAQ data exists
    // solely to render a JSON-LD <script> that the prerender step bakes into
    // each post's static HTML, so the browser never reads it — and posts.ts
    // eagerly globs all 104 posts into one chunk, where shipping it to the
    // client cost 113 KB (~9%) on a bundle that is already over budget.
    //
    // Consequence worth knowing: `faq` is empty in dev and in the client build,
    // so the schema is verifiable in `dist/` after `npm run prerender`, not in
    // `npm run dev`. If prerendering is ever removed, this export has to move
    // back into the client graph or the FAQ schema disappears with it.
    if (!options?.ssr) return null;

    const faq = extractFaq(code);
    if (faq.length === 0) return null;

    return {
      code: `${code}\n\nexport const faq = ${JSON.stringify(faq)};\n`,
      map: null,
    };
  },
});
