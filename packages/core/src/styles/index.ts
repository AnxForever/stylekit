/**
 * @module @stylekit/core/styles
 *
 * Style definitions, metadata, and token system.
 * Provides access to all registered design styles, their metadata,
 * and the token-based class mapping system for AI-consistent styling.
 */

// Types
export type {
  /** Design style category: modern, retro, minimal, or expressive. */
  StyleCategory,
  /** Style classification: visual, layout, or animation. */
  StyleType,
  /** Searchable tag for filtering styles. */
  StyleTag,
  /** Lightweight metadata for a design style (no component templates). */
  StyleMeta,
} from "@/lib/styles/meta";

export type {
  /** Full design style definition including components, CSS, and AI rules. */
  DesignStyle,
  /** A named variant of a design style with its own color scheme. */
  StyleVariant,
  /** Template for a UI component (button, card, input, etc.). */
  ComponentTemplate,
  /** Example prompt to help users generate content in a given style. */
  ExamplePrompt,
} from "@/lib/styles/index";

// Metadata (lightweight, no component templates)
export {
  /**
   * Static metadata array for all registered styles.
   * Use this in client components to avoid bundling full style definitions.
   */
  stylesMeta,
  /**
   * Returns metadata for all registered styles.
   * @returns An array of {@link StyleMeta} objects.
   */
  getAllStylesMeta,
  /**
   * Looks up a single style's metadata by its URL-friendly slug.
   * @param slug - The style identifier (e.g. "neo-brutalist").
   * @returns The matching {@link StyleMeta}, or `undefined` if not found.
   */
  getStyleMetaBySlug,
} from "@/lib/styles/meta";

// Full style data
export {
  /**
   * Array of all full design style definitions.
   * Includes component templates, globalCss, and aiRules.
   */
  styles,
  /**
   * Looks up a full design style definition by slug.
   * @param slug - The style identifier (e.g. "glassmorphism").
   * @returns The matching {@link DesignStyle}, or `undefined` if not found.
   */
  getStyleBySlug,
} from "@/lib/styles/index";

// Token system
export type {
  /** Token-based CSS class mappings for a design style. */
  StyleTokens,
} from "@/lib/styles/tokens";

export {
  /**
   * Builds a complete CSS class string for a component type from style tokens.
   * @param tokens - The style's token definitions.
   * @param component - The component type ("button" | "card" | "input").
   * @param variant - Optional variant identifier (reserved for future use).
   * @returns A space-separated CSS class string.
   */
  buildComponentClass,
  /**
   * Validates a class string against a style's forbidden rules.
   * @param tokens - The style's token definitions.
   * @param classString - Space-separated CSS classes to validate.
   * @returns An object with `valid` boolean and `violations` array.
   */
  validateClasses,
} from "@/lib/styles/tokens";

export {
  /**
   * Registry mapping style slugs to their {@link StyleTokens} definitions.
   */
  styleTokensRegistry,
  /**
   * Returns the token definitions for a style by slug.
   * @param slug - The style identifier.
   * @returns The matching {@link StyleTokens}, or `undefined` if not registered.
   */
  getStyleTokens,
  /**
   * Checks whether a style has token definitions registered.
   * @param slug - The style identifier.
   * @returns `true` if tokens exist for the given slug.
   */
  hasStyleTokens,
} from "@/lib/styles/tokens-registry";
