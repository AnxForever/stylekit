// @stylekit/core - Knowledge module
// Re-exports from the main lib/knowledge

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
  RecommendationContext,
  SmartRecommendation,
  ScoredRecommendation,
  StyleScore,
} from "@/lib/knowledge/index";

export {
  searchKnowledge,
  getDesignRecommendation,
  getDomains,
  getDomainDescription,
  detectDomain,
  BM25,
  getSmartRecommendation,
  compareStyles,
  suggestStyleByConstraints,
} from "@/lib/knowledge/index";

// Data accessors
export {
  productRecommendations,
  colorPalettes,
  fontPairings,
  landingPatterns,
  chartRecommendations,
  iconEntries,
  uxGuidelines,
  searchUXGuidelines,
  webGuidelines,
  reactGuidelines,
  reasoningRules,
} from "@/lib/knowledge/index";

// Stack accessors
export {
  getStackIds,
  getStack,
  getStackGuidelines,
  getStacksByCategory,
  getCriticalGuidelines,
  searchStackGuidelines,
  searchAllStackGuidelines,
} from "@/lib/knowledge/index";
