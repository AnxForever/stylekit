import { describe, expect, it } from "vitest";

import {
  searchStyles,
  getStyleDetail,
  shadcnInstallCommand,
  registryUrl,
  getComponentRecipe,
  getTokens,
  knownSlug,
} from "@/lib/discovery";

describe("discovery", () => {
  it("lists all styles when no query", () => {
    const { total, results } = searchStyles();
    expect(total).toBeGreaterThan(100);
    expect(results.length).toBe(total);
  });

  it("filters by category", () => {
    const { results } = searchStyles({ category: "retro" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.category === "retro")).toBe(true);
  });

  it("searches by query", () => {
    const { results } = searchStyles({ query: "glass" });
    expect(results.some((r) => r.slug === "glassmorphism")).toBe(true);
  });

  it("respects limit while reporting full total", () => {
    const { total, results } = searchStyles({ limit: 5 });
    expect(results.length).toBe(5);
    expect(total).toBeGreaterThan(5);
  });

  it("gets style detail with keywords, hasRecipes, and install command", () => {
    const d = getStyleDetail("neo-brutalist");
    expect(d?.slug).toBe("neo-brutalist");
    expect(d?.shadcnInstall).toContain("/r/neo-brutalist.json");
    expect(Array.isArray(d?.doList)).toBe(true);
    expect(Array.isArray(d?.keywords)).toBe(true);
    expect(typeof d?.hasTokens).toBe("boolean");
    expect(typeof d?.hasRecipes).toBe("boolean");
  });

  it("returns null for an unknown slug", () => {
    expect(getStyleDetail("nope-xyz")).toBeNull();
    expect(knownSlug("nope-xyz")).toBe(false);
    expect(knownSlug("glassmorphism")).toBe(true);
  });

  it("builds registry URL and install command on the canonical (www) host", () => {
    expect(registryUrl("synthwave")).toBe(
      "https://www.stylekit.top/r/synthwave.json",
    );
    expect(shadcnInstallCommand("synthwave")).toBe(
      "npx shadcn add https://www.stylekit.top/r/synthwave.json",
    );
  });

  it("returns tokens or null", () => {
    expect(getTokens("neo-brutalist")).not.toBeNull();
    expect(getTokens("nope-xyz")).toBeNull();
  });

  it("renders a component recipe", () => {
    const r = getComponentRecipe("glassmorphism", "button");
    expect(r).not.toBeNull();
    expect((r?.className.length ?? 0) > 0).toBe(true);
    expect(r?.code).toMatch(/^<button\b/);
    expect(r?.code).not.toContain("CSS fallback");
    expect(getComponentRecipe("glassmorphism", "nonexistent")).toBeNull();
  });

  it.each(["button", "input", "nav"])("keeps the optical implementation requirement with copied Liquid Glass %s code", (component) => {
    const recipe = getComponentRecipe("liquid-glass", component);

    expect(recipe?.code).toMatch(/^\/\* Liquid Glass: CSS fallback only/);
    expect(recipe?.code).toContain("https://www.stylekit.top/api/design/liquid-glass/design.md?locale=en");
    expect(recipe?.code).toContain("Keep foreground text separate from the filtered backdrop layer.");
    expect(recipe?.code).toContain(`*/\n<${component}`);
    expect(recipe?.className).not.toContain("CSS fallback");
    expect(Object.keys(recipe ?? {}).sort()).toEqual(["className", "code", "component", "slug"]);
  });
});
