// Style Version Data - Content-hash based version tracking
//
// Computes a hash of each style's tokens + recipes at load time.
// Compares against stored hashes to detect changes and auto-bump versions.
// Stored snapshots live in version-snapshots.json (generated, gitignored).

import type { StyleVersionRegistry, ChangeCategory } from "./types";
import type { StyleTokens } from "../styles/tokens";
import { styles } from "../styles";
import { getStyleTokens } from "../styles/tokens-registry";
import { getStyleRecipes } from "../recipes";

// ============ CONTENT HASHING ============

/**
 * Simple deterministic hash (djb2) for content comparison.
 * Not cryptographic — just fast and stable for change detection.
 */
function djb2Hash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

/** Compute a content hash from a style's tokens and recipes */
export function computeStyleHash(slug: string): string {
  const tokens = getStyleTokens(slug);
  const recipes = getStyleRecipes(slug);

  // Deterministic serialization (sorted keys)
  const payload = JSON.stringify({ tokens, recipes }, Object.keys({ tokens, recipes }).sort());
  return djb2Hash(payload);
}

// ============ CHANGE DETECTION ============

/** Detect which token categories changed between two token snapshots */
function detectChangedCategories(
  oldTokens: StyleTokens | undefined,
  newTokens: StyleTokens | undefined,
  oldRecipes: unknown,
  newRecipes: unknown
): ChangeCategory[] {
  const changed: ChangeCategory[] = [];

  if (!oldTokens || !newTokens) {
    // If either is missing, everything is "changed"
    return ["colors", "typography", "spacing", "shadows", "borders", "interaction", "forbidden", "required", "recipes"];
  }

  const compare = (a: unknown, b: unknown): boolean =>
    JSON.stringify(a) !== JSON.stringify(b);

  if (compare(oldTokens.colors, newTokens.colors)) changed.push("colors");
  if (compare(oldTokens.typography, newTokens.typography)) changed.push("typography");
  if (compare(oldTokens.spacing, newTokens.spacing)) changed.push("spacing");
  if (compare(oldTokens.shadow, newTokens.shadow)) changed.push("shadows");
  if (compare(oldTokens.border, newTokens.border)) changed.push("borders");
  if (compare(oldTokens.interaction, newTokens.interaction)) changed.push("interaction");
  if (compare(oldTokens.forbidden, newTokens.forbidden)) changed.push("forbidden");
  if (compare(oldTokens.required, newTokens.required)) changed.push("required");
  if (compare(oldRecipes, newRecipes)) changed.push("recipes");

  return changed;
}

/** Generate human-readable changelog entries from changed categories */
function generateChangelog(categories: ChangeCategory[]): string[] {
  const descriptions: Record<ChangeCategory, string> = {
    colors: "Updated color palette",
    typography: "Updated typography settings",
    spacing: "Adjusted spacing scale",
    shadows: "Modified shadow definitions",
    borders: "Changed border styling",
    interaction: "Updated interaction animations",
    forbidden: "Revised forbidden class rules",
    required: "Updated required class patterns",
    recipes: "Modified component recipes",
  };

  return categories.map((cat) => descriptions[cat]);
}

// ============ SEMVER UTILS ============

function bumpPatch(version: string): string {
  const parts = version.split(".").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return "1.0.1";
  parts[2]++;
  return parts.join(".");
}

function bumpMinor(version: string): string {
  const parts = version.split(".").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return "1.1.0";
  parts[1]++;
  parts[2] = 0;
  return parts.join(".");
}

/** Minor bump if recipes or colors changed (user-visible), patch for everything else */
function determineNextVersion(current: string, categories: ChangeCategory[]): string {
  const majorCategories: ChangeCategory[] = ["colors", "recipes", "typography"];
  const hasMajorChange = categories.some((c) => majorCategories.includes(c));
  return hasMajorChange ? bumpMinor(current) : bumpPatch(current);
}

// ============ SNAPSHOT STORAGE ============

/**
 * In-memory snapshot store.
 *
 * On first load, all styles get "1.0.0" with current hash.
 * On subsequent loads (same process), changes are detected against stored hashes.
 * For persistence across restarts, the registry can be serialized via getVersionSnapshot().
 */
let snapshotRegistry: StyleVersionRegistry = {};
let initialized = false;

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

/** Initialize the version registry by computing hashes for all styles */
function initializeRegistry(): StyleVersionRegistry {
  const registry: StyleVersionRegistry = {};
  const today = todayISO();

  for (const style of styles) {
    const hash = computeStyleHash(style.slug);
    registry[style.slug] = {
      current: "1.0.0",
      contentHash: hash,
      versions: [
        {
          version: "1.0.0",
          date: today,
          changes: ["Initial release"],
        },
      ],
    };
  }

  return registry;
}

/** Load stored snapshot and reconcile with current content */
export function loadVersionSnapshot(stored: StyleVersionRegistry | null): StyleVersionRegistry {
  if (!stored) {
    const fresh = initializeRegistry();
    snapshotRegistry = fresh;
    initialized = true;
    return fresh;
  }

  const registry: StyleVersionRegistry = {};
  const today = todayISO();

  for (const style of styles) {
    const currentHash = computeStyleHash(style.slug);
    const existing = stored[style.slug];

    if (!existing) {
      // New style not in stored snapshot
      registry[style.slug] = {
        current: "1.0.0",
        contentHash: currentHash,
        versions: [{ version: "1.0.0", date: today, changes: ["Initial release"] }],
      };
      continue;
    }

    if (existing.contentHash === currentHash) {
      // No changes — keep as-is
      registry[style.slug] = existing;
    } else {
      // Content changed — detect what and bump version
      const changedCategories = detectChangedCategories(
        undefined, // We don't store old tokens, so use hash mismatch as trigger
        getStyleTokens(style.slug),
        undefined,
        getStyleRecipes(style.slug)
      );

      const changelog = changedCategories.length > 0
        ? generateChangelog(changedCategories)
        : ["Updated style definition"];

      const nextVersion = determineNextVersion(existing.current, changedCategories);

      registry[style.slug] = {
        current: nextVersion,
        contentHash: currentHash,
        versions: [
          ...existing.versions,
          {
            version: nextVersion,
            date: today,
            changes: changelog,
          },
        ],
      };
    }
  }

  snapshotRegistry = registry;
  initialized = true;
  return registry;
}

// ============ PUBLIC API ============

/** Get the live version data (initializes on first access) */
export function getVersionData(): StyleVersionRegistry {
  if (!initialized) {
    // First access: initialize with fresh hashes
    snapshotRegistry = initializeRegistry();
    initialized = true;
  }
  return snapshotRegistry;
}

/** Get a serializable snapshot for persistence */
export function getVersionSnapshot(): StyleVersionRegistry {
  return { ...getVersionData() };
}

/**
 * Force re-check all styles against stored hashes.
 * Call this after a hot-reload or style file update.
 */
export function refreshVersions(): StyleVersionRegistry {
  const current = getVersionData();
  const today = todayISO();
  let changed = false;

  for (const style of styles) {
    const newHash = computeStyleHash(style.slug);
    const entry = current[style.slug];

    if (!entry) {
      current[style.slug] = {
        current: "1.0.0",
        contentHash: newHash,
        versions: [{ version: "1.0.0", date: today, changes: ["Initial release"] }],
      };
      changed = true;
      continue;
    }

    if (entry.contentHash !== newHash) {
      const nextVersion = bumpPatch(entry.current);
      entry.versions.push({
        version: nextVersion,
        date: today,
        changes: ["Updated style definition"],
      });
      entry.current = nextVersion;
      entry.contentHash = newHash;
      changed = true;
    }
  }

  if (changed) {
    snapshotRegistry = { ...current };
  }

  return snapshotRegistry;
}

// Legacy export for backward compatibility
export const versionData: StyleVersionRegistry = new Proxy({} as StyleVersionRegistry, {
  get(_target, prop: string) {
    return getVersionData()[prop];
  },
  ownKeys() {
    return Object.keys(getVersionData());
  },
  getOwnPropertyDescriptor(_target, prop: string) {
    const data = getVersionData();
    if (prop in data) {
      return { configurable: true, enumerable: true, value: data[prop] };
    }
    return undefined;
  },
  has(_target, prop: string) {
    return prop in getVersionData();
  },
});
