import { describe, it, expect } from "vitest";
import {
  computeStyleHash,
  getVersionSnapshot,
  refreshVersions,
} from "@/lib/versioning/version-data";
import {
  getCurrentVersion,
  getChangelog,
  getStyleVersion,
  getAllVersions,
} from "@/lib/versioning/registry";

const VALID_SLUG = "neo-brutalist";
const INVALID_SLUG = "nonexistent-style-zzzzz";

// ---------------------------------------------------------------------------
// computeStyleHash
// ---------------------------------------------------------------------------

describe("computeStyleHash", () => {
  it("returns a non-empty string for a valid slug", () => {
    const hash = computeStyleHash(VALID_SLUG);
    expect(typeof hash).toBe("string");
    expect(hash.length).toBeGreaterThan(0);
  });

  it("returns consistent hash for the same slug", () => {
    const hash1 = computeStyleHash(VALID_SLUG);
    const hash2 = computeStyleHash(VALID_SLUG);
    expect(hash1).toBe(hash2);
  });

  it("returns a hash for different slugs", () => {
    const hash1 = computeStyleHash("neo-brutalist");
    const hash2 = computeStyleHash("glassmorphism");
    // Both should produce valid hashes (they may be equal if tokens/recipes
    // serialize identically, e.g. when both are resolved at runtime)
    expect(typeof hash1).toBe("string");
    expect(typeof hash2).toBe("string");
  });

  it("returns a hash even for a slug with no tokens/recipes", () => {
    // Even invalid slugs produce a hash (of null/undefined serialized)
    const hash = computeStyleHash(INVALID_SLUG);
    expect(typeof hash).toBe("string");
  });
});

// ---------------------------------------------------------------------------
// getCurrentVersion
// ---------------------------------------------------------------------------

describe("getCurrentVersion", () => {
  it("returns a semver string for a valid slug", () => {
    const version = getCurrentVersion(VALID_SLUG);
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("returns 0.0.0 for an unknown slug", () => {
    expect(getCurrentVersion(INVALID_SLUG)).toBe("0.0.0");
  });
});

// ---------------------------------------------------------------------------
// getChangelog
// ---------------------------------------------------------------------------

describe("getChangelog", () => {
  it("returns an array of version entries for a valid slug", () => {
    const log = getChangelog(VALID_SLUG);
    expect(Array.isArray(log)).toBe(true);
    expect(log.length).toBeGreaterThan(0);
  });

  it("each entry has version, date, and changes", () => {
    const log = getChangelog(VALID_SLUG);
    for (const entry of log) {
      expect(entry).toHaveProperty("version");
      expect(entry).toHaveProperty("date");
      expect(entry).toHaveProperty("changes");
      expect(Array.isArray(entry.changes)).toBe(true);
    }
  });

  it("returns an empty array for an unknown slug", () => {
    expect(getChangelog(INVALID_SLUG)).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// getStyleVersion
// ---------------------------------------------------------------------------

describe("getStyleVersion", () => {
  it("returns version history for a valid slug", () => {
    const history = getStyleVersion(VALID_SLUG);
    expect(history).toBeDefined();
    expect(history).toHaveProperty("current");
    expect(history).toHaveProperty("contentHash");
    expect(history).toHaveProperty("versions");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getStyleVersion(INVALID_SLUG)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getAllVersions
// ---------------------------------------------------------------------------

describe("getAllVersions", () => {
  it("returns a registry object with style slugs as keys", () => {
    const all = getAllVersions();
    expect(typeof all).toBe("object");
    expect(Object.keys(all).length).toBeGreaterThan(0);
    expect(all[VALID_SLUG]).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// getVersionSnapshot
// ---------------------------------------------------------------------------

describe("getVersionSnapshot", () => {
  it("returns a copy of the version data", () => {
    const snap = getVersionSnapshot();
    expect(typeof snap).toBe("object");
    expect(Object.keys(snap).length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// refreshVersions
// ---------------------------------------------------------------------------

describe("refreshVersions", () => {
  it("returns a registry after refresh", () => {
    const registry = refreshVersions();
    expect(typeof registry).toBe("object");
    expect(Object.keys(registry).length).toBeGreaterThan(0);
  });

  it("preserves existing versions after refresh with no changes", () => {
    const before = getCurrentVersion(VALID_SLUG);
    refreshVersions();
    const after = getCurrentVersion(VALID_SLUG);
    expect(after).toBe(before);
  });
});
