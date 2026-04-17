/**
 * Public surface for StyleAtoms.
 *
 * - Type definitions live in ./types
 * - Per-style atom data lives in sibling files (e.g. ./neo-brutalist.ts)
 * - Helpers here are locale-aware accessors and completeness checks used by
 *   the prompt composer.
 */

import type { StyleAtomField, StyleAtoms } from "./types";

export type { StyleAtomField, StyleAtoms, StyleAtomKey } from "./types";

/** Locale-aware accessor that falls back to zh when en is missing. */
export function readAtom(field: StyleAtomField, locale: "zh" | "en"): string {
  if (locale === "en" && field.en && field.en.trim().length > 0) return field.en;
  return field.zh;
}

/** True when a style has a complete, usable atoms bundle (all 5 core fields non-empty). */
export function hasCompleteAtoms(atoms: StyleAtoms | undefined): atoms is StyleAtoms {
  if (!atoms) return false;
  return (
    atoms.philosophy.zh.trim().length > 0 &&
    atoms.layout.zh.trim().length > 0 &&
    atoms.motion.zh.trim().length > 0 &&
    atoms.color.zh.trim().length > 0 &&
    atoms.typography.zh.trim().length > 0
  );
}

export { neoBrutalistAtoms } from "./neo-brutalist";
