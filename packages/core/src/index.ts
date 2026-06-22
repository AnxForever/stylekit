/**
 * @module @stylekit/core
 *
 * Main entry point for the StyleKit core library.
 * Re-exports all public sub-modules: styles, recipes, and accessibility.
 *
 * For tree-shaking, prefer importing from specific sub-modules:
 * ```ts
 * import { getStyleBySlug } from '@stylekit/core/styles'
 * import { contrastRatio } from '@stylekit/core/accessibility'
 * ```
 */

// Barrel export from all sub-modules

export * from './styles'
export * from './recipes'

// Accessibility exports `scoreAllStyles`; expose it with a scoped name from
// the root entry to avoid collisions with future scoring modules.
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
