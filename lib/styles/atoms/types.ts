/**
 * StyleAtoms — atomic decomposition of a design style.
 *
 * Phase 3 introduces this alongside (not replacing) the existing `aiRules` text
 * on `DesignStyle`. When a style provides `atoms`, the prompt composer can mix
 * and match primitives across styles (e.g. style A's philosophy + style B's
 * motion tokens), producing combinations that were impossible with monolithic
 * aiRules text.
 *
 * All fields are intentionally natural-language strings rather than strict
 * token objects, so that downstream composers (themselves LLMs) can reason
 * over them flexibly. Each field should be focused on ONE concern and avoid
 * restating content from other fields.
 */

export interface StyleAtomField {
  /** Primary phrasing, in Simplified Chinese. */
  zh: string;
  /** Optional English phrasing. If omitted, composer falls back to zh. */
  en?: string;
}

export interface StyleAtoms {
  /** Short philosophy: what visual/emotional promise the style makes. 1-2 sentences. */
  philosophy: StyleAtomField;

  /**
   * Layout atoms: spatial rhythm, density, section patterns, grid usage.
   * DO NOT describe colors, motion, or typography here.
   */
  layout: StyleAtomField;

  /**
   * Motion atoms: transition pace, hover behavior, keyframe usage, reduced-motion stance.
   * DO NOT describe layout structure or color.
   */
  motion: StyleAtomField;

  /**
   * Color atoms: palette behavior, contrast strategy, surface/accent usage.
   * Not specific hex values (those live in `colors`) — the BEHAVIOR of color.
   */
  color: StyleAtomField;

  /**
   * Typography atoms: type pairing mood, weight strategy, scale tension, case usage.
   * DO NOT include specific font names (those live in design-recommendations).
   */
  typography: StyleAtomField;

  /**
   * Optional: non-negotiable "do not" rules specific to this style.
   * Kept as a list because violations matter individually.
   */
  forbiddens?: StyleAtomField[];
}

export type StyleAtomKey = keyof Omit<StyleAtoms, "forbiddens">;
