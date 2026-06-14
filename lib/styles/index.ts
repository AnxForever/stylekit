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
export {
  calculateReadinessCoverage,
  getFrontendReadiness,
  hasCuratedFrontendReadiness,
  getCuratedReadinessSlugs,
} from "./readiness";

export { styles, getStyleBySlug } from "./registry";
