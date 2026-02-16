// Style Version Data - Version history for all registered styles
//
// Each style starts at version 1.0.0. When a style is updated,
// add a new entry to its versions array and bump `current`.

import type { StyleVersionRegistry } from "./types";
import { styles } from "../styles";

/**
 * Generate initial version data for all registered styles.
 * Every style begins at 1.0.0 with a single "Initial release" entry.
 */
function buildInitialVersionData(): StyleVersionRegistry {
  const registry: StyleVersionRegistry = {};
  for (const style of styles) {
    registry[style.slug] = {
      current: "1.0.0",
      versions: [
        {
          version: "1.0.0",
          date: "2025-01-01",
          changes: ["Initial release"],
        },
      ],
    };
  }
  return registry;
}

export const versionData: StyleVersionRegistry = buildInitialVersionData();
