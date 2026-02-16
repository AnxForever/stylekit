// Style Version Registry - Query functions for version history

import type { StyleVersion, StyleVersionHistory } from "./types";
import { getVersionData, getVersionSnapshot, refreshVersions, computeStyleHash } from "./version-data";

/**
 * Get the full version history for a style.
 */
export function getStyleVersion(slug: string): StyleVersionHistory | undefined {
  return getVersionData()[slug];
}

/**
 * Get the current version string for a style.
 * Returns "0.0.0" if the style is not found.
 */
export function getCurrentVersion(slug: string): string {
  return getVersionData()[slug]?.current ?? "0.0.0";
}

/**
 * Get the full changelog (all versions) for a style.
 */
export function getChangelog(slug: string): StyleVersion[] {
  return getVersionData()[slug]?.versions ?? [];
}

/**
 * Get the complete version registry for all styles.
 */
export function getAllVersions() {
  return getVersionData();
}

// Re-export snapshot utilities
export { getVersionSnapshot, refreshVersions, computeStyleHash };
