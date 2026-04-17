/**
 * Atom override bookkeeping for Phase 3 cross-style composition.
 *
 * An override binds a specific StyleAtoms dimension (e.g. motion, color) to
 * a different source style's slug. Keys absent from the map fall through to
 * the base style's atoms. Composer consumes this map to build a multi-source
 * "Style atoms" section for the LLM — without any override, the composer
 * keeps its existing single-style path.
 *
 * UI wiring lives in docs/agent-learning/blend-ui-prototype.md; server-side
 * only needs the type, dimension whitelists, and an emptiness check.
 */

import type { StyleAtomKey } from "@/lib/styles/atoms";

/** Map from overridden dimension → source style slug. */
export type AtomOverrides = Partial<Record<StyleAtomKey, string>>;

/** MVP dimensions exposed in the Blend UI (Phase 3.1). */
export const BLENDABLE_DIMENSIONS_MVP: readonly StyleAtomKey[] = [
  "motion",
  "color",
] as const;

/** Full dimension set (Phase 3.2+). */
export const BLENDABLE_DIMENSIONS_FULL: readonly StyleAtomKey[] = [
  "philosophy",
  "layout",
  "motion",
  "color",
  "typography",
] as const;

export function isEmptyOverrides(ov: AtomOverrides | undefined): boolean {
  if (!ov) return true;
  for (const key of Object.keys(ov) as StyleAtomKey[]) {
    if (typeof ov[key] === "string" && ov[key]!.trim().length > 0) return false;
  }
  return true;
}
