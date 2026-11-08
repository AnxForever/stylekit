import type { DesignSpec } from "../types";
import { collectVariables, printVariableGroups } from "./shared";

/**
 * Plain `:root` variables — everything the spec knows, including layout and
 * surface aliases that Tailwind cannot generate utilities from. This is the
 * export for a project that owns its own CSS.
 */
export function renderCssVariables(spec: DesignSpec): string {
  const groups = collectVariables(spec);
  return `:root {\n${printVariableGroups(groups)}\n}\n`;
}
