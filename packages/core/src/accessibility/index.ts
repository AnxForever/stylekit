/**
 * @module stylekit-core/accessibility
 *
 * WCAG 2.1 accessibility scoring for design styles.
 * Provides color contrast calculations, AA/AAA compliance checks,
 * and a scoring engine that evaluates styles for accessibility.
 */

export type {
  /** Overall accessibility score with contrast, readability, and grade. */
  AccessibilityScore,
  /** Contrast evaluation with score, ratio, AA/AAA compliance, and color pairs. */
  ContrastScore,
  /** Readability evaluation based on typography tokens. */
  ReadabilityScore,
  /** A foreground/background color pair with its contrast ratio and compliance. */
  ColorPair,
} from "@/lib/accessibility/index";

export {
  /**
   * Parses a hex color string to RGB components.
   * Supports 3-digit (#abc) and 6-digit (#aabbcc) formats.
   * @param hex - The hex color string (with or without `#`).
   * @returns An object with `r`, `g`, `b` values (0-255).
   */
  hexToRgb,
  /**
   * Calculates relative luminance per WCAG 2.1.
   * L = 0.2126*R + 0.7152*G + 0.0722*B (after linearization).
   * @param r - Red component (0-255).
   * @param g - Green component (0-255).
   * @param b - Blue component (0-255).
   * @returns Relative luminance value (0-1).
   */
  relativeLuminance,
  /**
   * Calculates the WCAG contrast ratio between two hex colors.
   * Result range: 1:1 (identical) to 21:1 (black/white).
   * @param color1 - First hex color string.
   * @param color2 - Second hex color string.
   * @returns The contrast ratio as a number.
   */
  contrastRatio,
  /**
   * Checks WCAG AA compliance for a contrast ratio.
   * Normal text requires 4.5:1; large text requires 3:1.
   * @param ratio - The contrast ratio to check.
   * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold).
   * @returns `true` if the ratio meets AA requirements.
   */
  meetsAA,
  /**
   * Checks WCAG AAA compliance for a contrast ratio.
   * Normal text requires 7:1; large text requires 4.5:1.
   * @param ratio - The contrast ratio to check.
   * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold).
   * @returns `true` if the ratio meets AAA requirements.
   */
  meetsAAA,
  /**
   * Extracts a hex color from a Tailwind CSS class string.
   * Handles bracket notation (e.g. `bg-[#ff006e]`) and common named colors.
   * @param cls - The Tailwind class string.
   * @returns The hex color string, or `null` if not extractable.
   */
  extractHexFromClass,
  /**
   * Scores a single design style for accessibility.
   * Evaluates contrast ratios and readability from style tokens.
   * @param slug - The style identifier.
   * @returns An {@link AccessibilityScore}, or `null` if style not found.
   */
  scoreStyle,
  /**
   * Scores all registered design styles for accessibility.
   * @returns A record mapping style slugs to {@link AccessibilityScore}.
   */
  scoreAllStyles,
} from "@/lib/accessibility/index";
