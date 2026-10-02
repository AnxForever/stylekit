/**
 * Data access for the MCP tools — fully delegated to stylekit-core/discovery.
 *
 * The *Live variants read the published catalogue and fall back to the bundled
 * snapshot when the network is unavailable. The snapshot is whatever existed
 * when this package was built, and it has already gone stale once in a way no
 * version number revealed, so tools prefer the live source and report when
 * they could not reach it.
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
  searchStylesLive,
  getStyleDetailLive,
  getTokensLive,
  getComponentRecipeLive,
  knownSlugLive,
  getImplementationBriefLive,
} from "stylekit-core/discovery";

export type {
  StyleSummary,
  StyleDetail,
  RecipeResult,
  SearchOptions,
  DiscoveryCategory as StyleCategory,
  DataOrigin,
  SourceFailureKind,
  Sourced,
} from "stylekit-core/discovery";

export { lintStyleCode, hasLintableRules } from "stylekit-core/styles";

export type {
  StyleLintReport,
  StyleLintViolation,
  StyleLintMissingRequired,
  StyleLintComponent,
} from "stylekit-core/styles";

export {
  ASSET_KINDS,
  PUBLIC_ASSET_KINDS,
  listPublicAssets,
  getPublicAsset,
  listPublicAssetsLive,
  getPublicAssetLive,
} from "stylekit-core/assets";

export type {
  AssetKind,
  AssetAvailability,
  AssetContentLevel,
  AssetLicense,
  AssetAttribution,
  AssetSummary,
  PublicAssetDetail,
  PublicAssetListResponse,
  ListPublicAssetsOptions,
} from "stylekit-core/assets";
