/**
 * @module @stylekit/core/linter
 *
 * Style linter for validating code against StyleKit design guidelines.
 * Checks Tailwind CSS classes for forbidden patterns, missing required classes,
 * and generates fix suggestions.
 */

export type {
  /** A single lint violation with class name, reason, severity, and optional location. */
  Violation,
  /** Complete lint result with violations, suggestions, fix prompt, and statistics. */
  LintResult,
  /** A fix suggestion with original class, replacement, and description. */
  Suggestion,
  /** An extracted CSS class with its source location context. */
  ExtractedClass,
} from "@/lib/linter/index";

export {
  /**
   * Lints code or a class string against a style's guidelines.
   * Combines token-based validation and lint-rule-based validation.
   * @param styleSlug - The style identifier (e.g. "neo-brutalist").
   * @param code - The code or class string to lint.
   * @returns A {@link LintResult} with violations, suggestions, and fix prompt.
   */
  lintCode,
  /**
   * Lints multiple code blocks against a single style.
   * @param codeBlocks - Array of `{ code, name? }` objects to lint.
   * @param styleSlug - The style identifier.
   * @returns Results for each block and a pass/fail summary.
   */
  lintMultiple,
  /**
   * Extracts actionable fix suggestions from a lint result.
   * Combines suggestions from token analysis and lint rules.
   * @param result - A {@link LintResult} from `lintCode`.
   * @returns An array of human-readable fix instruction strings.
   */
  getFixSuggestions,
  /**
   * Formats a lint result into a human-readable multi-line string.
   * Includes status, violation details, and suggestions.
   * @param result - A {@link LintResult} from `lintCode`.
   * @returns A formatted string suitable for CLI or log output.
   */
  formatLintResult,
  /**
   * Extracts CSS class names from code (JSX, HTML, or plain class strings).
   * @param code - The source code to extract classes from.
   * @returns An array of {@link ExtractedClass} with class name and location.
   */
  extractClasses,
} from "@/lib/linter/index";
