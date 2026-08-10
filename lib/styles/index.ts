// Public style catalog entrypoint.

export type { StyleAtoms, StyleAtomField, StyleAtomKey } from "./atoms";
export { readAtom, hasCompleteAtoms } from "./atoms";

export {
  type StyleCategory,
  type StyleType,
  type StyleTag,
  type StyleMeta,
  stylesMeta,
  getAllStylesMeta,
  getStyleMetaBySlug,
} from "./meta";

export type {
  StyleVariant,
  DesignStyle,
  ExamplePrompt,
  ComponentTemplate,
} from "./types";

export type {
  ReadinessSource,
  ReadinessSupport,
  ThemeMode,
  ComponentState,
  ReadinessComponent,
  ReadinessCheck,
  ComponentReadiness,
  ReadinessCoverage,
  FrontendReadinessProfile,
} from "./readiness";
export type {
  CapabilityStatus,
  StyleCapabilities,
  StyleQuality,
  StyleQualityTier,
} from "./quality";
export {
  calculateReadinessCoverage,
  getFrontendReadiness,
  hasCuratedFrontendReadiness,
  getCuratedReadinessSlugs,
} from "./readiness";
export { getStyleQuality } from "./quality";

export { styles, getStyleBySlug } from "./registry";

export {
  PENDING_STYLE_SLUGS,
  isPendingStyleSlug,
  type PendingStyleSlug,
} from "./review-status";

export {
  STYLE_PACK_SCHEMA_VERSION,
  stylePackSchema,
  getStylePack,
  getStylePacks,
  type StylePack,
} from "./style-pack";
