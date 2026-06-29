/**
 * @module @stylekit/core/discovery
 *
 * High-level style discovery: search/list, full detail, the shadcn install
 * command, and component recipe rendering. A convenience layer over the styles
 * and recipes systems, used by @stylekit/mcp and @stylekit/cli.
 */

export {
  STYLEKIT_SITE_URL,
  shadcnInstallCommand,
  knownSlug,
  searchStyles,
  getStyleDetail,
  getComponentRecipe,
} from "@/lib/discovery";

export type {
  DiscoveryCategory,
  StyleSummary,
  StyleDetail,
  RecipeResult,
  SearchOptions,
} from "@/lib/discovery";
