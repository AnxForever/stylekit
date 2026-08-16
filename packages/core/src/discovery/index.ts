/**
 * @module stylekit-core/discovery
 *
 * High-level style discovery: search/list, full detail, the shadcn install
 * command, and component recipe rendering. A convenience layer over the styles
 * and recipes systems, used by stylekit-mcp and stylekit-cli.
 */

export {
  STYLEKIT_SITE_URL,
  registryUrl,
  shadcnInstallCommand,
  knownSlug,
  getTokens,
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
export type {
  CapabilityStatus,
  StyleCapabilities,
  StyleQuality,
  StyleQualityTier,
} from "@/lib/styles/quality";

/**
 * Live-first variants. The exports above read the catalogue bundled at build
 * time, which is correct until the catalogue grows; these read the published
 * one and fall back to the bundle when offline.
 */
export {
  searchStylesLive,
  getStyleDetailLive,
  getTokensLive,
  getComponentRecipeLive,
  knownSlugLive,
  clearRemoteCache,
} from "./remote";

export type { DataOrigin, Sourced, RemoteOptions } from "./remote";
