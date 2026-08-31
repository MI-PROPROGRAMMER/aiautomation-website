import type { IndustryPageContent } from "./types";

import { construction } from "./construction";
import { ecommerce } from "./ecommerce";
import { education } from "./education";
import { finance } from "./finance";
import { healthcare } from "./healthcare";
import { logistics } from "./logistics";
import { manufacturing } from "./manufacturing";
import { realEstate } from "./realEstate";
import { saas } from "./saas";

/**
 * Every industry page, in the order they appear on the homepage.
 *
 * This is the single source of truth: the pages, the routes registered for
 * prerendering, and the homepage `IndustrySection` cards all read from here.
 * The homepage previously held its own hardcoded copy of this data, which is
 * the drift `src/content/portfolio.ts` warns about — one surface saying
 * something the other contradicts.
 *
 * The first three carry a `vertical` and list their published posts. The rest
 * have no blog coverage yet and deliberately show no further-reading section
 * rather than an empty one.
 */
export const INDUSTRIES: IndustryPageContent[] = [
  ecommerce,
  logistics,
  construction,
  healthcare,
  finance,
  manufacturing,
  realEstate,
  education,
  saas,
];

export const INDUSTRY_PATHS = INDUSTRIES.map((industry) => industry.path);

export const getIndustryByPath = (path: string) =>
  INDUSTRIES.find((industry) => industry.path === path);

export type { IndustryPageContent };
