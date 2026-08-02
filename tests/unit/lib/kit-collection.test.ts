import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  KIT_COLLECTION_KEY,
  KIT_STORAGE_KEY,
  makeKit,
  readKitCollection,
  sanitizeKitName,
  writeKitCollection,
} from "@/lib/kit/storage";
import type { KitItem } from "@/lib/kit/types";

const at = "2026-08-02T00:00:00.000Z";

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, String(v)),
    removeItem: (k) => void map.delete(k),
    clear: () => map.clear(),
    key: (i) => Array.from(map.keys())[i] ?? null,
    get length() {
      return map.size;
    },
  } as Storage;
}

beforeEach(() => {
  vi.stubGlobal("localStorage", memoryStorage());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("kit collection storage", () => {
  it("returns a single default kit when nothing is stored", () => {
    const { kits, activeKitId } = readKitCollection();
    expect(kits).toHaveLength(1);
    expect(kits[0].items).toEqual([]);
    expect(activeKitId).toBe(kits[0].id);
  });

  it("migrates a legacy v1 single-kit snapshot into one named kit", () => {
    const legacyItems: KitItem[] = [
      { type: "style", slug: "glassmorphism", addedAt: at },
      { type: "animation", slug: "fade-in-up", addedAt: at },
    ];
    localStorage.setItem(KIT_STORAGE_KEY, JSON.stringify({ version: 1, items: legacyItems }));

    const { kits, activeKitId } = readKitCollection();
    expect(kits).toHaveLength(1);
    expect(kits[0].items.map((i) => `${i.type}:${i.slug}`)).toEqual([
      "style:glassmorphism",
      "animation:fade-in-up",
    ]);
    expect(activeKitId).toBe(kits[0].id);
  });

  it("round-trips a v2 collection and preserves the active id", () => {
    const kitA = makeKit("Landing", [{ type: "style", slug: "neo-brutalist", addedAt: at }]);
    const kitB = makeKit("Dashboard", []);
    writeKitCollection([kitA, kitB], kitB.id);

    const { kits, activeKitId } = readKitCollection();
    expect(kits.map((k) => k.name)).toEqual(["Landing", "Dashboard"]);
    expect(activeKitId).toBe(kitB.id);
  });

  it("falls back to the first kit when activeKitId is stale", () => {
    const kitA = makeKit("A", []);
    writeKitCollection([kitA], "nonexistent");
    const { activeKitId } = readKitCollection();
    expect(activeKitId).toBe(kitA.id);
  });

  it("drops malformed kits and recovers if all are invalid", () => {
    localStorage.setItem(
      KIT_COLLECTION_KEY,
      JSON.stringify({ version: 2, kits: [{ name: "no id" }, null, 42], activeKitId: "x" })
    );
    const { kits } = readKitCollection();
    expect(kits).toHaveLength(1);
    expect(kits[0].items).toEqual([]);
  });

  it("prefers a v2 collection over a legacy v1 snapshot", () => {
    localStorage.setItem(
      KIT_STORAGE_KEY,
      JSON.stringify({ version: 1, items: [{ type: "style", slug: "legacy-style", addedAt: at }] })
    );
    const kit = makeKit("Current", [{ type: "style", slug: "glassmorphism", addedAt: at }]);
    writeKitCollection([kit], kit.id);

    const { kits } = readKitCollection();
    expect(kits).toHaveLength(1);
    expect(kits[0].items[0].slug).toBe("glassmorphism");
  });
});

describe("sanitizeKitName", () => {
  it("trims, caps length and falls back for empty names", () => {
    expect(sanitizeKitName("  Landing  ")).toBe("Landing");
    expect(sanitizeKitName("")).toBe("Untitled kit");
    expect(sanitizeKitName("x".repeat(100))).toHaveLength(60);
  });
});
