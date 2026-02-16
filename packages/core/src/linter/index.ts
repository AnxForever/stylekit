// @stylekit/core - Linter module
// Re-exports from the main lib/linter

export type {
  Violation,
  LintResult,
  Suggestion,
  ExtractedClass,
} from "@/lib/linter/index";

export {
  lintCode,
  lintMultiple,
  getFixSuggestions,
  formatLintResult,
  extractClasses,
} from "@/lib/linter/index";
