/**
 * Data access for the CLI commands. Style discovery (detail, install command,
 * recipe rendering) is shared via @stylekit/core/discovery; this module adapts
 * the shared search into the list/search shapes the commands expect.
 */

export {
  getStyleDetail,
  getComponentRecipe,
  knownSlug,
  shadcnInstallCommand,
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
import { getStyleTokens } from "@stylekit/core/styles";
import type { StyleTokens } from "@stylekit/core/styles";

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

export function getTokens(slug: string): StyleTokens | null {
  return getStyleTokens(slug) ?? null;
}
