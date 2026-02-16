// @stylekit/core - Quality module
// Re-exports from the main lib/quality

export type {
  QualityScore,
  QualityReport,
} from "@/lib/quality/index";

export {
  scoreStyleQuality,
  scoreAllStyles,
  generateQualityReport,
} from "@/lib/quality/index";
