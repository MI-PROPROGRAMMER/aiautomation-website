import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  PRICING_FAQS,
  PRICING_INCLUDED,
  PRICING_INTRO,
  PRICING_PAYMENT,
  PRICING_TIERS,
  PRICING_UPDATED,
} from "../src/content/pricing";
import { CALENDLY_LINK, CONTACT_EMAIL } from "../src/config/constants";

/**
 * Regenerates `public/pricing.md` from `src/content/pricing.ts`.
 *
 * The markdown file is what AI agents read when comparing vendors on a buyer's
 * behalf, and the /pricing page is what the buyer reads. Both are published, so
 * two hand-maintained copies would eventually quote different prices to the
 * agent and the human. This makes the TypeScript module the only place a figure
 * is edited.
 *
 * Runs ahead of the build (see the `prebuild`-style wiring in package.json), so
 * a price change reaches both surfaces in the same commit.
 */

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const render = (): string => {
  const lines: string[] = [
    "# Pricing — ApexifyLabs",
    "",
    `> ${PRICING_INTRO}`,
    "",
    "<!-- Generated from src/content/pricing.ts by scripts/generate-pricing-md.ts.",
    "     Edit that module, not this file. -->",
    "",
  ];

  for (const tier of PRICING_TIERS) {
    lines.push(`## ${tier.name}`, "");
    lines.push(`- Price: ${tier.price}`);
    lines.push(`- Typical scope: ${tier.scope}`);
    lines.push(`- Timeline: ${tier.timeline}`);
    lines.push(`- Includes: ${tier.includes.join(", ")}`);
    lines.push(`- Best for: ${tier.bestFor}`);
    lines.push("");
  }

  lines.push("## What every engagement includes", "");
  for (const item of PRICING_INCLUDED) lines.push(`- ${item}`);
  lines.push("");

  lines.push("## Payment", "");
  for (const item of PRICING_PAYMENT) lines.push(`- ${item}`);
  lines.push("");

  lines.push("## Questions", "");
  for (const faq of PRICING_FAQS) {
    lines.push(`### ${faq.question}`, "", faq.answer, "");
  }

  lines.push("## Contact", "");
  lines.push(`- Email: ${CONTACT_EMAIL}`);
  lines.push(`- Free consultation: ${CALENDLY_LINK}`);
  lines.push(`- Pricing page: https://apexifylabs.com/pricing`);
  lines.push("");
  lines.push(`Last updated: ${PRICING_UPDATED}`);
  lines.push("");

  return lines.join("\n");
};

export const generatePricingMd = async (root = projectRoot): Promise<string> => {
  const outputPath = path.resolve(root, "public/pricing.md");
  const markdown = render();
  await fs.writeFile(outputPath, markdown, "utf-8");
  return outputPath;
};

const isDirectRun =
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  const written = await generatePricingMd();
  console.log(`${path.relative(projectRoot, written)} written from src/content/pricing.ts.`);
}
