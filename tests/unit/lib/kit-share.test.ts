import { describe, expect, it } from "vitest";
import { encodeKitToSearch, parseKitFromSearch } from "@/lib/kit/share";
import type { KitItem } from "@/lib/kit/types";

const at = "2026-08-02T00:00:00.000Z";

describe("kit share codec", () => {
  const items: KitItem[] = [
    { type: "style", slug: "neo-brutalist", addedAt: at, note: "personal note" },
    { type: "style", slug: "glassmorphism", addedAt: at },
    { type: "animation", slug: "fade-in-up", addedAt: at },
    { type: "font-pairing", slug: "gallery-gloock", addedAt: at },
  ];

  it("round-trips items and preserves style order (first = base)", () => {
    const search = encodeKitToSearch(items);
    const parsed = parseKitFromSearch(new URLSearchParams(search));
    expect(parsed.filter((i) => i.type === "style").map((i) => i.slug)).toEqual([
      "neo-brutalist",
      "glassmorphism",
    ]);
    expect(parsed).toHaveLength(4);
  });

  it("does not leak personal notes into the share link", () => {
    const search = encodeKitToSearch(items);
    expect(search).not.toContain("personal");
    const parsed = parseKitFromSearch(new URLSearchParams(search));
    expect(parsed.every((i) => i.note === undefined)).toBe(true);
  });

  it("produces a compact human-readable query", () => {
    const search = encodeKitToSearch(items);
    expect(search).toBe(
      "s=neo-brutalist%2Cglassmorphism&a=fade-in-up&f=gallery-gloock"
    );
  });

  it("rejects garbage slugs and unknown params, dedupes repeats", () => {
    const parsed = parseKitFromSearch(
      new URLSearchParams(
        "s=ok-style,ok-style,Bad Slug!,<script>&a=fade-in-up&x=ignored&f="
      )
    );
    expect(parsed.map((i) => `${i.type}:${i.slug}`)).toEqual([
      "style:ok-style",
      "animation:fade-in-up",
    ]);
  });

  it("caps absurdly long lists", () => {
    const many = Array.from({ length: 200 }, (_, i) => `slug-${i}`).join(",");
    const parsed = parseKitFromSearch(new URLSearchParams(`s=${many}`));
    expect(parsed.length).toBeLessThanOrEqual(50);
  });

  it("returns empty for empty or missing params", () => {
    expect(parseKitFromSearch(new URLSearchParams(""))).toEqual([]);
    expect(parseKitFromSearch(new URLSearchParams("s="))).toEqual([]);
  });
});
