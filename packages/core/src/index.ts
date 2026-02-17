/**
 * @module @stylekit/core
 *
 * Main entry point for the StyleKit core library.
 * Re-exports all sub-modules: styles, recipes, linter, knowledge,
 * accessibility, and quality.
 *
 * For tree-shaking, prefer importing from specific sub-modules:
 * ```ts
 * import { getStyleBySlug } from '@stylekit/core/styles'
 * import { lintCode } from '@stylekit/core/linter'
 * ```
 */

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
