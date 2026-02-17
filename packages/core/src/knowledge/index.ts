/**
 * @module @stylekit/core/knowledge
 *
 * Design knowledge base with multi-domain search.
 * Provides product recommendations, color palettes, font pairings,
 * landing page patterns, chart/icon suggestions, UX/web/React guidelines,
 * reasoning rules, and stack-specific coding guidelines.
 */

export type {
  /** Knowledge search domain identifier. */
  SearchDomain,
  /** Generic search result wrapper with domain, query, count, and results. */
  SearchResult,
  /** Aggregated design recommendation for a product type. */
  DesignRecommendation,
  /** Product type recommendation with primary/secondary styles. */
  ProductRecommendation,
  /** Color palette recommendation for a product type. */
  ColorPalette,
  /** Font pairing recommendation with heading/body fonts. */
  FontPairing,
  /** Landing page conversion pattern. */
  LandingPattern,
  /** Chart/visualization recommendation. */
  ChartRecommendation,
  /** Icon entry from the Lucide React library. */
  IconEntry,
  /** Cross-cutting UX best practice guideline. */
  UXGuideline,
  /** Web interface guideline. */
  WebGuideline,
  /** React performance guideline. */
  ReactGuideline,
  /** Design reasoning rule for product-to-style mapping. */
  ReasoningRule,
  /** Stack-specific coding guideline (e.g. Next.js, Tailwind). */
  StackGuideline,
  /** Identifier for a supported tech stack. */
  StackId,
  /** Context for the smart recommendation engine. */
  RecommendationContext,
  /** Result from the smart recommendation engine. */
  SmartRecommendation,
  /** A scored recommendation with match score and reasoning. */
  ScoredRecommendation,
  /** Score breakdown for a style match evaluation. */
  StyleScore,
} from "@/lib/knowledge/index";

export {
  /**
   * Searches across all knowledge domains.
   * Auto-detects the most relevant domain if not specified.
   * @param query - Natural language search query.
   * @param domain - Optional domain to restrict search to.
   * @param maxResults - Maximum number of results (default 5).
   * @returns A {@link SearchResult} with matched items.
   */
  searchKnowledge,
  /**
   * Generates a comprehensive design recommendation for a product query.
   * Aggregates results from multiple knowledge domains.
   * @param productQuery - Product type or description (e.g. "SaaS dashboard").
   * @param options - Optional config: stackId, maxGuidelines.
   * @returns A {@link DesignRecommendation} with style, color, typography, etc.
   */
  getDesignRecommendation,
  /**
   * Returns all available knowledge domain names.
   * @returns An array of {@link SearchDomain} values.
   */
  getDomains,
  /**
   * Returns a human-readable description for a knowledge domain.
   * @param domain - The domain identifier.
   * @returns A description string.
   */
  getDomainDescription,
  /**
   * Detects the most relevant knowledge domain for a query.
   * @param query - The search query to analyze.
   * @returns The detected {@link SearchDomain}.
   */
  detectDomain,
  /**
   * BM25 text search algorithm implementation.
   * Used internally for relevance-ranked search across knowledge entries.
   */
  BM25,
  /**
   * Smart recommendation engine that scores styles against constraints.
   * @param context - Recommendation context with product type, constraints, etc.
   * @returns A {@link SmartRecommendation} with ranked style matches.
   */
  getSmartRecommendation,
  /**
   * Compares two or more styles side-by-side with scored criteria.
   * @param slugs - Array of style slugs to compare.
   * @returns Comparison data with per-style scores.
   */
  compareStyles,
  /**
   * Suggests the best matching style based on a set of constraints.
   * @param constraints - Desired attributes (e.g. dark mode, minimal, etc.).
   * @returns Ranked style suggestions.
   */
  suggestStyleByConstraints,
} from "@/lib/knowledge/index";

// Data accessors
export {
  /** Array of all product type recommendations. */
  productRecommendations,
  /** Array of all color palette recommendations. */
  colorPalettes,
  /** Array of all font pairing recommendations. */
  fontPairings,
  /** Array of all landing page patterns. */
  landingPatterns,
  /** Array of all chart/visualization recommendations. */
  chartRecommendations,
  /** Array of all Lucide icon entries. */
  iconEntries,
  /** Array of all UX best practice guidelines. */
  uxGuidelines,
  /**
   * Searches UX guidelines by query.
   * @param query - Search query.
   * @param maxResults - Maximum results.
   * @returns Matching {@link UXGuideline} array.
   */
  searchUXGuidelines,
  /** Array of all web interface guidelines. */
  webGuidelines,
  /** Array of all React performance guidelines. */
  reactGuidelines,
  /** Array of all design reasoning rules. */
  reasoningRules,
} from "@/lib/knowledge/index";

// Stack accessors
export {
  /**
   * Returns all registered stack identifiers.
   * @returns An array of {@link StackId} values.
   */
  getStackIds,
  /**
   * Returns the full stack definition for a given ID.
   * @param id - The stack identifier.
   * @returns The stack object, or `undefined`.
   */
  getStack,
  /**
   * Returns all guidelines for a specific stack.
   * @param id - The stack identifier.
   * @returns Array of {@link StackGuideline}.
   */
  getStackGuidelines,
  /**
   * Returns stacks grouped by category.
   * @param category - The category to filter by.
   * @returns Array of matching stacks.
   */
  getStacksByCategory,
  /**
   * Returns only critical-severity guidelines for a stack.
   * @param id - The stack identifier.
   * @returns Array of critical {@link StackGuideline}.
   */
  getCriticalGuidelines,
  /**
   * Searches guidelines within a specific stack.
   * @param id - The stack identifier.
   * @param query - Search query.
   * @param maxResults - Maximum results.
   * @returns Matching {@link StackGuideline} array.
   */
  searchStackGuidelines,
  /**
   * Searches guidelines across all stacks.
   * @param query - Search query.
   * @param maxResults - Maximum results.
   * @returns Array of `{ stackId, guideline }` matches.
   */
  searchAllStackGuidelines,
} from "@/lib/knowledge/index";
