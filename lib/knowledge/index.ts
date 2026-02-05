// Knowledge Base - Unified Public API
// Single entry point for all knowledge modules

import type {
  SearchDomain,
  SearchResult,
  DesignRecommendation,
  ProductRecommendation,
  ColorPalette,
  FontPairing,
  LandingPattern,
  ChartRecommendation,
  IconEntry,
  UXGuideline,
  WebGuideline,
  ReactGuideline,
  ReasoningRule,
} from "./types";
import { detectDomain } from "./search";
import { searchProducts } from "./products";
import { searchColors, getColorsByProductType } from "./colors";
import { searchTypography, getFontPairingsByMood } from "./typography";
import { searchLandingPatterns, getLandingPatternByName } from "./landing-patterns";
import { searchCharts } from "./charts";
import { searchIcons } from "./icons";
import { searchUXGuidelines } from "./ux-guidelines";
import { searchWebGuidelines } from "./web-guidelines";
import { searchReactGuidelines } from "./react-guidelines";
import { searchReasoning, getReasoningForProduct } from "./reasoning";
import {
  searchStackGuidelines,
  searchAllStackGuidelines,
  getStackGuidelines,
  getStack,
  getStackIds,
  getStacksByCategory,
  getCriticalGuidelines,
} from "./stacks";
import type { StackGuideline, StackId } from "./stacks/types";

// Re-export types
export type {
  SearchDomain,
  SearchResult,
  DesignRecommendation,
  ProductRecommendation,
  ColorPalette,
  FontPairing,
  LandingPattern,
  ChartRecommendation,
  IconEntry,
  UXGuideline,
  WebGuideline,
  ReactGuideline,
  ReasoningRule,
  StackGuideline,
  StackId,
};

// Re-export search utility
export { detectDomain } from "./search";
export { BM25 } from "./search";

// Re-export data accessors
export { productRecommendations } from "./products";
export { colorPalettes } from "./colors";
export { fontPairings } from "./typography";
export { landingPatterns } from "./landing-patterns";
export { chartRecommendations } from "./charts";
export { iconEntries } from "./icons";
export { uxGuidelines, searchUXGuidelines } from "./ux-guidelines";
export { webGuidelines } from "./web-guidelines";
export { reactGuidelines } from "./react-guidelines";
export { reasoningRules } from "./reasoning";

// Re-export stack accessors
export {
  getStackIds,
  getStack,
  getStackGuidelines,
  getStacksByCategory,
  getCriticalGuidelines,
  searchStackGuidelines,
  searchAllStackGuidelines,
};

// ============ UNIFIED SEARCH ============

type AnyResult =
  | ProductRecommendation
  | ColorPalette
  | FontPairing
  | LandingPattern
  | ChartRecommendation
  | IconEntry
  | UXGuideline
  | WebGuideline
  | ReactGuideline
  | ReasoningRule
  | StackGuideline;

/**
 * Search across all knowledge domains
 * Auto-detects the most relevant domain if not specified
 */
export function searchKnowledge(
  query: string,
  domain?: SearchDomain,
  maxResults = 5
): SearchResult<AnyResult> {
  const resolvedDomain = domain || (detectDomain(query) as SearchDomain);

  let results: AnyResult[];

  switch (resolvedDomain) {
    case "product":
      results = searchProducts(query, maxResults);
      break;
    case "color":
      results = searchColors(query, maxResults);
      break;
    case "typography":
      results = searchTypography(query, maxResults);
      break;
    case "landing":
      results = searchLandingPatterns(query, maxResults);
      break;
    case "chart":
      results = searchCharts(query, maxResults);
      break;
    case "icon":
      results = searchIcons(query, maxResults);
      break;
    case "ux":
      results = searchUXGuidelines(query, maxResults);
      break;
    case "web":
      results = searchWebGuidelines(query, maxResults);
      break;
    case "react":
      results = searchReactGuidelines(query, maxResults);
      break;
    case "reasoning":
      results = searchReasoning(query, maxResults);
      break;
    case "stack":
      results = searchAllStackGuidelines(query, maxResults).map(
        (r) => r.guideline
      );
      break;
    default:
      results = searchProducts(query, maxResults);
  }

  return {
    domain: resolvedDomain,
    query,
    count: results.length,
    results,
  };
}

// ============ DESIGN RECOMMENDATION ENGINE ============

/**
 * Generate a comprehensive design recommendation for a product query.
 * Aggregates multi-domain search like the Python DesignSystemGenerator.
 *
 * @param productQuery - Product type or description (e.g., "SaaS dashboard")
 * @param options - Optional configuration
 */
export function getDesignRecommendation(
  productQuery: string,
  options?: {
    stackId?: StackId;
    maxGuidelines?: number;
  }
): DesignRecommendation {
  const maxGuidelines = options?.maxGuidelines ?? 5;

  // 1. Detect product type
  const products = searchProducts(productQuery, 1);
  const product = products[0];
  const productType = product?.type || productQuery;

  // 2. Get reasoning rules
  const reasoning =
    getReasoningForProduct(productType) ||
    searchReasoning(productQuery, 1)[0] ||
    null;

  // 3. Get style recommendations
  const style = {
    primary: product?.primaryStyle || reasoning?.stylePriority[0] || "Minimalism",
    secondary: product?.secondaryStyles || reasoning?.stylePriority.slice(1) || [],
  };

  // 4. Get color palette
  const colors =
    getColorsByProductType(productType) ||
    searchColors(productQuery, 1)[0] ||
    null;

  // 5. Get typography recommendation
  const typographyMood = reasoning?.typographyMood || "Professional";
  const typography =
    getFontPairingsByMood(typographyMood.split("+")[0].trim())[0] ||
    searchTypography(productQuery, 1)[0] ||
    null;

  // 6. Get landing pattern
  const landingPatternName = product?.landingPattern;
  const landingPattern = landingPatternName
    ? getLandingPatternByName(landingPatternName) ||
      searchLandingPatterns(productQuery, 1)[0]
    : searchLandingPatterns(productQuery, 1)[0] || null;

  // 7. Get chart recommendations
  const charts = searchCharts(productQuery, 3);

  // 8. Get icon recommendations
  const icons = searchIcons(productQuery, 5);

  // 9. Get UX guidelines
  const uxGuidelines = searchUXGuidelines(productQuery, maxGuidelines);

  // 10. Get stack guidelines
  const stackGuidelines = options?.stackId
    ? searchStackGuidelines(options.stackId, productQuery, maxGuidelines)
    : [];

  return {
    productType,
    reasoning,
    style,
    colors,
    typography,
    landingPattern: landingPattern || null,
    charts,
    icons,
    uxGuidelines,
    stackGuidelines,
  };
}

// ============ CONVENIENCE FUNCTIONS ============

/**
 * Get all knowledge domain names
 */
export function getDomains(): SearchDomain[] {
  return [
    "product",
    "color",
    "typography",
    "landing",
    "chart",
    "icon",
    "ux",
    "web",
    "react",
    "reasoning",
    "stack",
  ];
}

/**
 * Get domain description
 */
export function getDomainDescription(domain: SearchDomain): string {
  const descriptions: Record<SearchDomain, string> = {
    product: "Product type recommendations (SaaS, E-commerce, etc.)",
    color: "Color palettes by product type",
    typography: "Font pairing recommendations",
    landing: "Landing page conversion patterns",
    chart: "Chart and visualization recommendations",
    icon: "Icon recommendations (Lucide React)",
    ux: "Cross-cutting UX best practices",
    web: "Web interface guidelines",
    react: "React performance guidelines",
    reasoning: "Product type design decision rules",
    stack: "Stack-specific coding guidelines",
  };
  return descriptions[domain];
}

// ============ SMART RECOMMENDER ============

export {
  getSmartRecommendation,
  compareStyles,
  suggestStyleByConstraints,
  type RecommendationContext,
  type SmartRecommendation,
  type ScoredRecommendation,
  type StyleScore,
} from "./smart-recommender";
