import { describe, expect, it } from "vitest";
import { buildKitHints } from "@/lib/kit/hints";
import { moveKitItemToFront } from "@/lib/kit/storage";
import type { KitItem } from "@/lib/kit/types";
import type { AnimationMeta } from "@/lib/animations/types";

const anim = (
  category: AnimationMeta["category"],
  intensity?: AnimationMeta["intensity"]
) => ({ category, intensity });

describe("buildKitHints", () => {
  it("warns on more than two styles", () => {
    const hints = buildKitHints({ styleCount: 3, fontPairingCount: 0, animations: [] });
    expect(hints.some((h) => h.tone === "warn" && h.en.includes("3 styles"))).toBe(true);
  });

  it("explains base/accent for exactly two styles", () => {
    const hints = buildKitHints({ styleCount: 2, fontPairingCount: 0, animations: [] });
    expect(hints.some((h) => h.tone === "info" && h.en.includes("base"))).toBe(true);
  });

  it("warns on entrance animation overload", () => {
    const hints = buildKitHints({
      styleCount: 1,
      fontPairingCount: 0,
      animations: [anim("entrance"), anim("entrance"), anim("entrance")],
    });
    expect(hints.some((h) => h.en.includes("entrance"))).toBe(true);
  });

  it("warns on multiple ambient animations and high intensity stacking", () => {
    const hints = buildKitHints({
      styleCount: 1,
      fontPairingCount: 0,
      animations: [anim("background", "high"), anim("loading", "high")],
    });
    expect(hints.some((h) => h.en.includes("ambient"))).toBe(true);
    expect(hints.some((h) => h.en.includes("high-intensity"))).toBe(true);
  });

  it("notes multiple font pairings", () => {
    const hints = buildKitHints({ styleCount: 1, fontPairingCount: 2, animations: [] });
    expect(hints.some((h) => h.en.includes("font pairings"))).toBe(true);
  });

  it("praises a disciplined combination and stays quiet otherwise", () => {
    const good = buildKitHints({
      styleCount: 1,
      fontPairingCount: 1,
      animations: [anim("entrance"), anim("hover")],
    });
    expect(good).toHaveLength(1);
    expect(good[0].tone).toBe("good");

    const empty = buildKitHints({ styleCount: 1, fontPairingCount: 0, animations: [] });
    expect(empty).toHaveLength(0);
  });
});

describe("moveKitItemToFront", () => {
  const at = "2026-08-02T00:00:00.000Z";
  const items: KitItem[] = [
    { type: "style", slug: "a", addedAt: at },
    { type: "animation", slug: "x", addedAt: at },
    { type: "style", slug: "b", addedAt: at },
  ];

  it("moves the target to the front and keeps the rest in order", () => {
    const next = moveKitItemToFront(items, "style", "b");
    expect(next.map((i) => i.slug)).toEqual(["b", "a", "x"]);
  });

  it("returns the same array when the target is missing", () => {
    expect(moveKitItemToFront(items, "style", "zzz")).toBe(items);
  });
});
