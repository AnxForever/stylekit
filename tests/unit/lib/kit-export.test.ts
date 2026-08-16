import { describe, expect, it } from "vitest";
import { normalizeKitItems } from "@/lib/kit/storage";
import { buildKitFiles, resolveKitItems } from "@/lib/kit/export";
import type { KitItem } from "@/lib/kit/types";

const at = "2026-08-01T00:00:00.000Z";

describe("normalizeKitItems", () => {
  it("keeps valid items and preserves order", () => {
    const items = normalizeKitItems([
      { type: "style", slug: "glassmorphism", addedAt: at },
      { type: "animation", slug: "fade-in-up", addedAt: at },
      { type: "font-pairing", slug: "gallery-gloock", addedAt: at },
    ]);
    expect(items.map((i) => `${i.type}:${i.slug}`)).toEqual([
      "style:glassmorphism",
      "animation:fade-in-up",
      "font-pairing:gallery-gloock",
    ]);
  });

  it("drops malformed entries, unknown types and duplicates", () => {
    const items = normalizeKitItems([
      { type: "style", slug: "glassmorphism", addedAt: at },
      { type: "style", slug: "glassmorphism", addedAt: at },
      { type: "color", slug: "sunset", addedAt: at },
      { type: "style", slug: "Bad Slug!", addedAt: at },
      "style:glassmorphism",
      null,
    ]);
    expect(items).toHaveLength(1);
  });

  it("truncates overlong notes and drops empty ones", () => {
    const [withNote, withoutNote] = normalizeKitItems([
      { type: "style", slug: "glassmorphism", addedAt: at, note: "x".repeat(600) },
      { type: "animation", slug: "fade-in-up", addedAt: at, note: "   " },
    ]);
    expect(withNote.note).toHaveLength(500);
    expect(withoutNote.note).toBeUndefined();
  });

  it("returns empty array for non-array input", () => {
    expect(normalizeKitItems({ items: [] })).toEqual([]);
    expect(normalizeKitItems(undefined)).toEqual([]);
  });
});

describe("resolveKitItems", () => {
  it("resolves known slugs and reports missing ones", () => {
    const items: KitItem[] = [
      { type: "style", slug: "glassmorphism", addedAt: at },
      { type: "style", slug: "does-not-exist", addedAt: at },
      { type: "animation", slug: "fade-in-up", addedAt: at },
      { type: "font-pairing", slug: "gallery-gloock", addedAt: at },
      { type: "gradient", slug: "sunrise-warmth", addedAt: at },
      { type: "shadow", slug: "soft-sm", addedAt: at },
      { type: "background", slug: "dot-grid", addedAt: at },
    ];
    const kit = resolveKitItems(items);
    expect(kit.styles.map((s) => s.slug)).toEqual(["glassmorphism"]);
    expect(kit.animations.map((a) => a.slug)).toEqual(["fade-in-up"]);
    expect(kit.fontPairings.map((p) => p.id)).toEqual(["gallery-gloock"]);
    expect(kit.gradients.map((g) => g.id)).toEqual(["sunrise-warmth"]);
    expect(kit.shadows.map((s) => s.id)).toEqual(["soft-sm"]);
    expect(kit.backgrounds.map((b) => b.id)).toEqual(["dot-grid"]);
    expect(kit.missing).toEqual(["style:does-not-exist"]);
  });
});

describe("buildKitFiles", () => {
  const items: KitItem[] = [
    { type: "style", slug: "glassmorphism", addedAt: at, note: "hero section" },
    { type: "style", slug: "neo-brutalist", addedAt: at },
    { type: "animation", slug: "fade-in-up", addedAt: at },
    { type: "font-pairing", slug: "gallery-gloock", addedAt: at },
    { type: "gradient", slug: "sunrise-warmth", addedAt: at },
    { type: "shadow", slug: "soft-sm", addedAt: at },
    { type: "background", slug: "dot-grid", addedAt: at },
  ];
  const files = buildKitFiles(items, { generatedAt: "2026-08-01" });
  const paths = files.map((f) => f.path);
  const fileByPath = (path: string) => files.find((f) => f.path === path);

  it("always emits README, prompt and spec", () => {
    expect(paths).toContain("README.md");
    expect(paths).toContain("AI_PROMPT.md");
    expect(paths).toContain("DESIGN_SPEC.md");
  });

  it("emits tokens, tailwind preset and css per style", () => {
    for (const slug of ["glassmorphism", "neo-brutalist"]) {
      expect(paths).toContain(`tokens/${slug}.tokens.json`);
      expect(paths).toContain(`tokens/${slug}.tailwind.preset.js`);
      expect(paths).toContain(`tokens/${slug}.css`);
    }
    const tokens = fileByPath("tokens/glassmorphism.tokens.json");
    expect(() => JSON.parse(tokens!.content)).not.toThrow();
  });

  it("emits animation code files", () => {
    expect(paths.some((p) => p.startsWith("animations/fade-in-up."))).toBe(true);
  });

  it("emits fonts.md only when a pairing is selected", () => {
    expect(paths).toContain("fonts.md");
    const withoutFonts = buildKitFiles(
      [{ type: "style", slug: "glassmorphism", addedAt: at }],
      { generatedAt: "2026-08-01" }
    );
    expect(withoutFonts.map((f) => f.path)).not.toContain("fonts.md");
  });

  it("emits surfaces.css with gradient/shadow/background rules", () => {
    expect(paths).toContain("surfaces.css");
    const surfaces = fileByPath("surfaces.css")!.content;
    expect(surfaces).toContain(".bg-sunrise-warmth");
    expect(surfaces).toContain(".shadow-soft-sm");
    expect(surfaces).toContain(".pattern-dot-grid");
    const withoutSurfaces = buildKitFiles(
      [{ type: "style", slug: "glassmorphism", addedAt: at }],
      { generatedAt: "2026-08-01" }
    );
    expect(withoutSurfaces.map((f) => f.path)).not.toContain("surfaces.css");
  });

  it("synthesizes one coherent prompt: first style is base, second is accent", () => {
    const prompt = fileByPath("AI_PROMPT.md")!.content;
    expect(prompt).toContain("Base style rules");
    expect(prompt).toContain("Accent style: Neo-Brutalist");
    expect(prompt).toContain("User note: hero section");
    expect(prompt).toContain("## Typography");
    expect(prompt).toContain("## Motion");
    expect(prompt).toContain("prefers-reduced-motion");
    expect(prompt.match(/^## Surfaces$/gm)).toHaveLength(1);
  });

  it("includes palette and do/don't lists in the design spec", () => {
    const spec = fileByPath("DESIGN_SPEC.md")!.content;
    expect(spec).toContain("| Primary |");
    expect(spec).toContain("**Do:**");
    expect(spec).toContain("Google Fonts:");
  });
});
