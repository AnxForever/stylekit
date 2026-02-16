// @stylekit/core - Styles module
// Re-exports from the main lib/styles

// Types
export type {
  StyleCategory,
  StyleType,
  StyleTag,
  StyleMeta,
} from "@/lib/styles/meta";

export type {
  DesignStyle,
  StyleVariant,
  ComponentTemplate,
  ExamplePrompt,
} from "@/lib/styles/index";

// Metadata (lightweight, no component templates)
export {
  stylesMeta,
  getAllStylesMeta,
  getStyleMetaBySlug,
} from "@/lib/styles/meta";

// Full style data
export {
  styles,
  getStyleBySlug,
} from "@/lib/styles/index";

// Token system
export type { StyleTokens } from "@/lib/styles/tokens";

export {
  buildComponentClass,
  validateClasses,
} from "@/lib/styles/tokens";

export {
  styleTokensRegistry,
  getStyleTokens,
  hasStyleTokens,
} from "@/lib/styles/tokens-registry";
