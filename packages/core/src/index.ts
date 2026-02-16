// @stylekit/core - Main entry point
// Barrel export from all sub-modules

export * from './styles'
export * from './recipes'
export * from './linter'
export * from './knowledge'

// Accessibility and Quality both export `scoreAllStyles`,
// so we re-export them with explicit disambiguation.
export {
  hexToRgb,
  relativeLuminance,
  contrastRatio,
  meetsAA,
  meetsAAA,
  extractHexFromClass,
  scoreStyle,
  scoreAllStyles as scoreAllStylesAccessibility,
} from './accessibility'
export type {
  AccessibilityScore,
  ContrastScore,
  ReadabilityScore,
  ColorPair,
} from './accessibility'

export {
  scoreStyleQuality,
  scoreAllStyles as scoreAllStylesQuality,
  generateQualityReport,
} from './quality'
export type {
  QualityScore,
  QualityReport,
} from './quality'
