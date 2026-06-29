/**
 * Data access for the CLI — discovery helpers from @stylekit/core/discovery,
 * with thin list/search adapters in the shapes the commands expect.
 */

export {
  getStyleDetail,
  getComponentRecipe,
  knownSlug,
  shadcnInstallCommand,
  registryUrl,
  getTokens,
  STYLEKIT_SITE_URL as SITE_URL,
} from "@stylekit/core/discovery";

export type {
  StyleSummary,
  StyleDetail,
  RecipeResult,
  DiscoveryCategory as StyleCategory,
} from "@stylekit/core/discovery";

import {
  searchStyles as coreSearch,
  type DiscoveryCategory,
  type StyleSummary,
} from "@stylekit/core/discovery";

/** List styles (optionally by category), capped at `limit`. */
export function listStyles(
  category?: DiscoveryCategory,
  limit?: number,
): StyleSummary[] {
  return coreSearch({ category, limit }).results;
}

/** Keyword search, capped at `limit`. */
export function searchStyles(query: string, limit = 20): StyleSummary[] {
  return coreSearch({ query, limit }).results;
}
