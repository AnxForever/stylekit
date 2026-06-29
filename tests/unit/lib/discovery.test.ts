import { describe, expect, it } from "vitest";

import {
  searchStyles,
  getStyleDetail,
  shadcnInstallCommand,
  getComponentRecipe,
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

  it("gets style detail with install command and lists", () => {
    const d = getStyleDetail("neo-brutalist");
    expect(d?.slug).toBe("neo-brutalist");
    expect(d?.shadcnInstall).toContain("/r/neo-brutalist.json");
    expect(Array.isArray(d?.doList)).toBe(true);
    expect(typeof d?.hasTokens).toBe("boolean");
  });

  it("returns null for an unknown slug", () => {
    expect(getStyleDetail("nope-xyz")).toBeNull();
    expect(knownSlug("nope-xyz")).toBe(false);
    expect(knownSlug("glassmorphism")).toBe(true);
  });

  it("builds the shadcn install command", () => {
    expect(shadcnInstallCommand("synthwave")).toBe(
      "npx shadcn add https://stylekit.top/r/synthwave.json",
    );
  });

  it("renders a component recipe", () => {
    const r = getComponentRecipe("glassmorphism", "button");
    expect(r).not.toBeNull();
    expect((r?.className.length ?? 0) > 0).toBe(true);
    expect(getComponentRecipe("glassmorphism", "nonexistent")).toBeNull();
  });
});
