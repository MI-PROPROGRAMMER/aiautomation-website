import { Link } from "react-router-dom";

import type { ClusteredPosts } from "@/content/industries/clusters";

/**
 * Further reading, drawn as a hub-and-branch network: the industry at the
 * centre, its topic clusters branching left and right, each article hanging off
 * its cluster.
 *
 * Two constraints shaped the implementation.
 *
 * Every article is a real `<Link>` carrying its full title as anchor text. This
 * section is the reason the covered industry pages have any internal-link
 * support at all — roughly 33 links each — so the graph could not be drawn onto
 * a canvas or assembled by script: it has to survive into the prerendered HTML
 * exactly as a list of anchors would.
 *
 * The connectors are CSS, not measured SVG paths. A spine and a stub per branch
 * stay aligned at any block height or viewport width without JavaScript, where
 * an SVG path would need real element positions and would drift the moment a
 * title wrapped onto another line.
 *
 * Below the `lg` breakpoint the branches stack and the connectors are hidden: a
 * radial graph at 375px is unreadable, and the same markup reads perfectly well
 * as a grouped list.
 */

type ArticleNetworkProps = {
  /** Centre label — the industry this page covers. */
  hub: string;
  clusters: ClusteredPosts[];
  totalPosts: number;
};

const ClusterBranch = ({
  cluster,
  side,
}: {
  cluster: ClusteredPosts;
  side: "left" | "right";
}) => (
  <li
    className={[
      "relative py-5",
      // Stub: runs from the block's inner edge out to the spine. Sits at the
      // heading's optical centre rather than the block's, so it meets the dot.
      "lg:before:absolute lg:before:top-[2.15rem] lg:before:h-px lg:before:w-6",
      "lg:before:bg-primary-foreground/20 lg:before:content-['']",
      side === "left"
        ? "lg:pr-6 lg:text-right lg:before:right-0"
        : "lg:pl-6 lg:before:left-0",
    ].join(" ")}
  >
    <h3
      className={[
        "flex items-center gap-2.5 text-base font-bold text-primary-foreground",
        side === "left" ? "lg:flex-row-reverse" : "",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full bg-accent ring-4 ring-accent/15"
      />
      {cluster.name}
    </h3>

    <ul className="mt-3 flex flex-col gap-1.5">
      {cluster.posts.map((post) => (
        <li key={post.slug}>
          <Link
            to={`/blog/${post.slug}`}
            className="cursor-pointer text-sm leading-snug text-primary-foreground/65 transition-colors duration-200 hover:text-accent focus-visible:text-accent"
          >
            {post.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);

const Side = ({
  clusters,
  side,
}: {
  clusters: ClusteredPosts[];
  side: "left" | "right";
}) => (
  <div className="relative">
    {/* Spine — the vertical the stubs meet. Inset so it stops short of the
        first and last headings instead of running past them. */}
    <span
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-y-10 hidden w-px bg-primary-foreground/15 lg:block",
        side === "left" ? "right-0" : "left-0",
      ].join(" ")}
    />
    <ul className="flex flex-col gap-2">
      {clusters.map((cluster) => (
        <ClusterBranch key={cluster.name} cluster={cluster} side={side} />
      ))}
    </ul>
  </div>
);

export const ArticleNetwork = ({ hub, clusters, totalPosts }: ArticleNetworkProps) => {
  // Balance the sides by article count, not cluster count. Splitting the list
  // down the middle put 21 articles left and 12 right on logistics, which left
  // the hub floating against a half-empty column. Largest-first onto whichever
  // side is currently shorter keeps both columns within an article or two, and
  // the clusters carry no meaningful order of their own to preserve.
  const left: ClusteredPosts[] = [];
  const right: ClusteredPosts[] = [];
  let leftCount = 0;
  let rightCount = 0;

  for (const cluster of [...clusters].sort((a, b) => b.posts.length - a.posts.length)) {
    if (leftCount <= rightCount) {
      left.push(cluster);
      leftCount += cluster.posts.length;
    } else {
      right.push(cluster);
      rightCount += cluster.posts.length;
    }
  }

  return (
    <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
      <Side clusters={left} side="left" />

      {/* Hub. Leads the stack on small screens — with the connectors hidden it
          is a grouped list, and the industry label belongs at the top of one
          rather than buried between the third and fourth cluster. */}
      <div className="relative order-first flex items-center justify-center lg:order-none lg:px-10">
        {/* Short leads from the hub out to each spine. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-10 bg-primary-foreground/15 lg:block"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-10 bg-primary-foreground/15 lg:block"
        />

        <div className="relative flex flex-col items-center gap-1 rounded-full border border-accent/30 bg-accent/[0.07] px-8 py-6 text-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-2xl"
          />
          <span className="font-display text-xl font-bold leading-tight text-primary-foreground">
            {hub}
          </span>
          <span className="smallcaps text-[0.6rem] text-accent/90">
            {totalPosts} articles
          </span>
        </div>
      </div>

      <Side clusters={right} side="right" />
    </div>
  );
};
