/**
 * Styles that lead the catalog ahead of registry order.
 *
 * The registry appends new styles, so a launch sits at the end of 149 styles
 * and nobody scrolls there. A newly shipped style is listed here while it is
 * news; everything else keeps registry order behind it.
 *
 * Slugs that are not in the registry are ignored, so removing a style from the
 * list (or retiring it) never breaks the order.
 */
export const CATALOG_LEAD_SLUGS: readonly string[] = ["quantized-line-field"];

/**
 * Move the listed styles to the front, in the order listed above. Stability is
 * deliberate: styles the list does not mention keep their incoming order, so
 * this can be applied to an already filtered list and to the full catalog.
 */
export function orderByCatalogPriority<T extends { slug: string }>(
  styles: readonly T[]
): T[] {
  const rank = new Map(CATALOG_LEAD_SLUGS.map((slug, index) => [slug, index]));

  // Nothing to reorder: hand back the same array so callers that compare by
  // reference (and tests that assert identity) keep working.
  if (!styles.some((style) => rank.has(style.slug))) {
    return styles as T[];
  }

  const lead: T[] = [];
  const rest: T[] = [];

  for (const style of styles) {
    if (rank.has(style.slug)) {
      lead.push(style);
    } else {
      rest.push(style);
    }
  }

  lead.sort((left, right) => (rank.get(left.slug) ?? 0) - (rank.get(right.slug) ?? 0));

  return [...lead, ...rest];
}
