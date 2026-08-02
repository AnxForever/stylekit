import { describe, expect, it } from "vitest";
import { mergeKitCollections } from "@/lib/kit/merge";
import type { Kit } from "@/lib/kit/types";

const kit = (id: string, name: string, updatedAt: string, slugs: string[] = []): Kit => ({
  id,
  name,
  updatedAt,
  items: slugs.map((slug) => ({ type: "style" as const, slug, addedAt: updatedAt })),
});

describe("mergeKitCollections", () => {
  it("keeps kits unique to either side", () => {
    const local = [kit("aaa", "Local", "2026-08-02T10:00:00Z", ["glassmorphism"])];
    const remote = [kit("bbb", "Remote", "2026-08-02T09:00:00Z", ["neo-brutalist"])];
    const merged = mergeKitCollections(local, remote);
    expect(merged.map((k) => k.id).sort()).toEqual(["aaa", "bbb"]);
  });

  it("resolves same-id conflicts by newest updatedAt", () => {
    const local = [kit("aaa", "Local newer", "2026-08-02T12:00:00Z", ["a", "b"])];
    const remote = [kit("aaa", "Remote older", "2026-08-02T08:00:00Z", ["c"])];
    const merged = mergeKitCollections(local, remote);
    expect(merged).toHaveLength(1);
    expect(merged[0].name).toBe("Local newer");
    expect(merged[0].items.map((i) => i.slug)).toEqual(["a", "b"]);
  });

  it("prefers remote when it is newer for the same id", () => {
    const local = [kit("aaa", "Local older", "2026-08-02T08:00:00Z", ["a"])];
    const remote = [kit("aaa", "Remote newer", "2026-08-02T12:00:00Z", ["x", "y"])];
    const merged = mergeKitCollections(local, remote);
    expect(merged[0].name).toBe("Remote newer");
    expect(merged[0].items.map((i) => i.slug)).toEqual(["x", "y"]);
  });

  it("orders the result most-recently-updated first", () => {
    const local = [kit("aaa", "Old", "2026-08-01T00:00:00Z")];
    const remote = [kit("bbb", "New", "2026-08-02T00:00:00Z")];
    const merged = mergeKitCollections(local, remote);
    expect(merged.map((k) => k.id)).toEqual(["bbb", "aaa"]);
  });

  it("handles empty sides", () => {
    const remote = [kit("bbb", "Remote", "2026-08-02T00:00:00Z")];
    expect(mergeKitCollections([], remote).map((k) => k.id)).toEqual(["bbb"]);
    expect(mergeKitCollections(remote, [])).toHaveLength(1);
    expect(mergeKitCollections([], [])).toEqual([]);
  });

  it("drops malformed kits during merge", () => {
    const local = [kit("aaa", "Valid", "2026-08-02T00:00:00Z")];
    const remote = [{ id: "", name: "bad" } as unknown as Kit];
    const merged = mergeKitCollections(local, remote);
    expect(merged.map((k) => k.id)).toEqual(["aaa"]);
  });
});
