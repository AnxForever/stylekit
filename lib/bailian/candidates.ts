import { stylesMeta } from "@/lib/styles/meta";
import type { StyleIntentCandidate } from "./prompt";

/**
 * Builds the candidate list the style planner chooses from.
 *
 * The demo path deliberately offers four styles because the workspace
 * generator can only render those. Everything else — the Feishu bot, the MCP
 * tools, anything that just needs a slug back — should see the whole catalog;
 * picking from 146 styles is the difference between a recommendation and a
 * coin flip between four.
 */

export interface BuildStyleCandidatesOptions {
  /** Restrict to these slugs, in this order. Unknown slugs are dropped. */
  only?: readonly string[];
  /** Cap the list. Omit for the full catalog. */
  limit?: number;
}

export function buildStyleCandidates(
  options: BuildStyleCandidatesOptions = {},
): StyleIntentCandidate[] {
  const { only, limit } = options;

  const source = only
    ? only
        .map((slug) => stylesMeta.find((meta) => meta.slug === slug))
        .filter((meta): meta is (typeof stylesMeta)[number] => Boolean(meta))
    : stylesMeta;

  const candidates = source.map((meta) => ({
    slug: meta.slug,
    nameEn: meta.nameEn,
    description: meta.descriptionEn?.trim() || meta.description,
    name: meta.name,
    category: meta.category,
    tags: [...meta.tags],
    primaryColor: meta.colors.primary,
  }));

  return typeof limit === "number" ? candidates.slice(0, limit) : candidates;
}

/** How many styles the planner can currently choose from. */
export function styleCandidateCount(): number {
  return stylesMeta.length;
}
