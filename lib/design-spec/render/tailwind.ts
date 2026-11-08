import type { DesignSpec } from "../types";
import { collectVariables, printVariableGroups } from "./shared";

/**
 * Groups that belong in `@theme`. Layout, density and surfaces stay out: Tailwind
 * generates no utilities from them, so including them would only invite someone
 * to write `max-w-page-max-width` and wonder why it does nothing.
 */
const THEME_GROUPS = new Set([
  "Colors",
  "Typography — Font Families",
  "Typography — Scale",
  "Spacing",
  "Border Radius",
]);

/** Tailwind v4 `@theme` block. Paste into a stylesheet, no config file needed. */
export function renderTailwindTheme(spec: DesignSpec): string {
  const groups = collectVariables(spec).filter((group) => THEME_GROUPS.has(group.title));
  return `@theme {\n${printVariableGroups(groups)}\n}\n`;
}
