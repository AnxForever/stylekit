/**
 * Lightweight style metadata module.
 *
 * This public entrypoint intentionally exposes only metadata, not component
 * templates, CSS, or AI rules.
 */

import { stylesMeta } from "./meta-registry";
import type { StyleMeta } from "./meta-types";

export type { StyleCategory, StyleType, StyleTag, StyleMeta } from "./meta-types";
export { stylesMeta } from "./meta-registry";

export function getAllStylesMeta(): StyleMeta[] {
  return stylesMeta;
}

export function getStyleMetaBySlug(slug: string): StyleMeta | undefined {
  return stylesMeta.find((style) => style.slug === slug);
}
