/**
 * @module stylekit-core/styles
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

export type {
  /** Source of the frontend readiness profile: curated or fallback. */
  ReadinessSource,
  /** Support quality for a readiness area. */
  ReadinessSupport,
  /** Supported theme modes for a style. */
  ThemeMode,
  /** Production UI states tracked by the readiness layer. */
  ComponentState,
  /** Component families tracked by the readiness layer. */
  ReadinessComponent,
  /** A single readiness check with implementation guidance. */
  ReadinessCheck,
  /** Readiness guidance for a component family. */
  ComponentReadiness,
  /** Numeric coverage summary for readiness areas. */
  ReadinessCoverage,
  /** Full frontend readiness profile for a style. */
  FrontendReadinessProfile,
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

export {
  /**
   * Returns the frontend readiness profile for a style, including dark mode,
   * interaction states, motion, accessibility, and performance guidance.
   */
  getFrontendReadiness,
  /**
   * Checks whether a style has a curated readiness profile instead of fallback guidance.
   */
  hasCuratedFrontendReadiness,
  /**
   * Lists style slugs with curated frontend readiness profiles.
   */
  getCuratedReadinessSlugs,
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

export type {
  /** A single rule violation found in linted code. */
  StyleLintViolation,
  /** Required classes a style expects but the linted code never used. */
  StyleLintMissingRequired,
  /** Full result of linting code against a style. */
  StyleLintReport,
  /** Options controlling what {@link lintStyleCode} checks. */
  StyleLintOptions,
  /** Which component a required-class check applies to. */
  StyleLintComponent,
} from "@/lib/styles/style-linter";

export {
  /**
   * Lints source code against a style's forbidden and required class rules.
   * Understands JSX/HTML class attributes, `cn()`/`clsx()` calls, and template
   * literals; variant prefixes are resolved before matching.
   * @param slug - The style identifier, e.g. "glassmorphism".
   * @param code - Source to check. JSX/TSX, HTML, or a bare class string.
   * @param options - Optionally check components for missing required classes.
   * @returns A {@link StyleLintReport} listing violations and missing requirements.
   */
  lintStyleCode,
  /**
   * Extracts Tailwind class tokens from source code, with line numbers.
   * @param code - Source to scan.
   * @returns Every statically resolvable class token and the line it sits on.
   */
  extractClassNames,
  /**
   * Strips Tailwind variant prefixes from a class, keeping the utility.
   * Opacity modifiers are preserved; a leading `!` is dropped.
   * @param className - A class token, e.g. "dark:md:shadow-lg".
   * @returns The bare utility, e.g. "shadow-lg".
   */
  stripVariants,
  /**
   * Reports whether a style has any lintable rules registered.
   * @param slug - The style identifier.
   * @returns `true` when at least one rule source covers the style.
   */
  hasLintableRules,
} from "@/lib/styles/style-linter";

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
