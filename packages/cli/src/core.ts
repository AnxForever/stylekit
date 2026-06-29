/**
 * Data access for the CLI — discovery helpers from stylekit-core/discovery,
 * with thin list/search adapters that preserve the full match `total`.
 */

export {
  getStyleDetail,
  getComponentRecipe,
  knownSlug,
  shadcnInstallCommand,
  registryUrl,
  getTokens,
  STYLEKIT_SITE_URL as SITE_URL,
} from "stylekit-core/discovery";

export type {
  StyleSummary,
  StyleDetail,
  RecipeResult,
  DiscoveryCategory as StyleCategory,
} from "stylekit-core/discovery";

import {
  searchStyles as coreSearch,
  type DiscoveryCategory,
  type StyleSummary,
} from "stylekit-core/discovery";

/** List styles (optionally by category), capped at `limit`, with full total. */
export function listStyles(
  category?: DiscoveryCategory,
  limit?: number,
): { total: number; results: StyleSummary[] } {
  return coreSearch({ category, limit });
}

/** Keyword search, capped at `limit`, with full total. */
export function searchStyles(
  query: string,
  limit?: number,
): { total: number; results: StyleSummary[] } {
  return coreSearch({ query, limit });
}
