// @stylekit/core - Accessibility module
// Re-exports from the main lib/accessibility

export type {
  AccessibilityScore,
  ContrastScore,
  ReadabilityScore,
  ColorPair,
} from "@/lib/accessibility/index";

export {
  hexToRgb,
  relativeLuminance,
  contrastRatio,
  meetsAA,
  meetsAAA,
  extractHexFromClass,
  scoreStyle,
  scoreAllStyles,
} from "@/lib/accessibility/index";
