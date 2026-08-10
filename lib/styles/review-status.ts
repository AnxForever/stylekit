/**
 * Styles that have implementations but do not yet have approved visual
 * screenshots/source hashes. They remain available for local review, while
 * approved-preview checks intentionally exclude them until an owner approves
 * their visual baselines.
 */
export const PENDING_STYLE_SLUGS = [
  "mobile-editorial",
  "pastel-ui",
  "soft-utility",
] as const;

export type PendingStyleSlug = (typeof PENDING_STYLE_SLUGS)[number];

const pendingStyleSlugSet = new Set<string>(PENDING_STYLE_SLUGS);

export function isPendingStyleSlug(slug: string): slug is PendingStyleSlug {
  return pendingStyleSlugSet.has(slug);
}
