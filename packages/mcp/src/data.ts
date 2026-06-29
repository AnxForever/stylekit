/**
 * Data access for the MCP tools. Style discovery (search, detail, install
 * command, recipe rendering) is shared via @stylekit/core/discovery; only the
 * token lookup is local.
 */

export {
  searchStyles,
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
  SearchOptions,
  DiscoveryCategory as StyleCategory,
} from "@stylekit/core/discovery";

import { getStyleTokens } from "@stylekit/core/styles";
import type { StyleTokens } from "@stylekit/core/styles";

export function getTokens(slug: string): StyleTokens | null {
  return getStyleTokens(slug) ?? null;
}
