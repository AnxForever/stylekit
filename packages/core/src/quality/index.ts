/**
 * @module @stylekit/core/quality
 *
 * Quality scoring engine for design styles.
 * Evaluates recipe coverage, token completeness, definition quality,
 * and color palette to produce a 0-100 quality score with letter grade.
 */

export type {
  /** Quality score for a single style with sub-scores and missing items. */
  QualityScore,
  /** Full quality report with statistics, grade distribution, and rankings. */
  QualityReport,
} from "@/lib/quality/index";

export {
  /**
   * Scores a single style's quality across four dimensions:
   * recipe coverage (40pts), token completeness (25pts),
   * definition completeness (25pts), and color palette (10pts).
   * @param slug - The style identifier.
   * @returns A {@link QualityScore}, or `null` if style not found.
   */
  scoreStyleQuality,
  /**
   * Scores all registered styles for quality.
   * @returns A record mapping style slugs to {@link QualityScore}.
   */
  scoreAllStyles,
  /**
   * Generates a comprehensive quality report across all styles.
   * Includes average scores, grade distribution, top/bottom rankings.
   * @returns A {@link QualityReport}.
   */
  generateQualityReport,
} from "@/lib/quality/index";
