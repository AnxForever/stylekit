/**
 * Candidate rendering for the style planner.
 *
 * The whole catalog goes in — 146 styles — because a recommendation chosen
 * from everything beats one chosen from a sample. Enriched lines carry the
 * facets the model needs to discriminate: Chinese name, category, tags, and
 * primary hex.
 *
 * Built from stylekit-core only. This package never reaches into the web
 * app's lib/, so it stays a standalone install.
 */

import { stylesMeta } from "stylekit-core/styles";

export interface PlannerCandidate {
  slug: string;
  nameEn: string;
  description: string;
  name?: string;
  category?: string;
  tags?: string[];
  primaryColor?: string;
}

/** All styles in the catalog, rendered ready for the planner prompt. */
export function buildStyleCandidates(): PlannerCandidate[] {
  return stylesMeta.map((meta) => ({
    slug: meta.slug,
    nameEn: meta.nameEn,
    description: meta.descriptionEn?.trim() || meta.description,
    name: meta.name,
    category: meta.category,
    tags: [...meta.tags],
    primaryColor: meta.colors.primary,
  }));
}

function renderCandidateLine(candidate: PlannerCandidate): string {
  const title = candidate.name
    ? `${candidate.nameEn} / ${candidate.name}`
    : candidate.nameEn;

  const facets = [
    candidate.category,
    candidate.tags?.length ? candidate.tags.join(",") : undefined,
    candidate.primaryColor,
  ].filter(Boolean);

  const facetText = facets.length > 0 ? ` [${facets.join(" · ")}]` : "";

  return `- ${candidate.slug}: ${title}${facetText} — ${candidate.description}`;
}

export function renderCandidateList(candidates: PlannerCandidate[]): string {
  return candidates.map(renderCandidateLine).join("\n");
}
