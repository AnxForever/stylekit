/**
 * Data access for the MCP tools — fully delegated to stylekit-core/discovery.
 */

export {
  searchStyles,
  getStyleDetail,
  getComponentRecipe,
  getTokens,
  knownSlug,
  shadcnInstallCommand,
  registryUrl,
  STYLEKIT_SITE_URL as SITE_URL,
} from "stylekit-core/discovery";

export type {
  StyleSummary,
  StyleDetail,
  RecipeResult,
  SearchOptions,
  DiscoveryCategory as StyleCategory,
} from "stylekit-core/discovery";
