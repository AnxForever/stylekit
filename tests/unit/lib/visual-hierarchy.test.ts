import { describe, it, expect } from "vitest";
import {
  HIERARCHY_LEVERS,
  SAMPLE_ELEMENTS,
  visualWeight,
  rankByWeight,
  TEXT_LEVELS,
  generateHierarchyCSS,
  type LeverId,
} from "@/lib/visual-hierarchy";

const ALL: LeverId[] = ["size", "weight", "color", "space"];

describe("visual hierarchy", () => {
  it("defines the four levers", () => {
    expect(HIERARCHY_LEVERS.map((l) => l.id)).toEqual(["size", "weight", "color", "space"]);
    for (const l of HIERARCHY_LEVERS) {
      expect(l.name.length).toBeGreaterThan(0);
      expect(l.nameZh.length).toBeGreaterThan(0);
      expect(l.descZh.length).toBeGreaterThan(0);
    }
  });

  it("gives every sample element complete bilingual content and all four lever values", () => {
    for (const el of SAMPLE_ELEMENTS) {
      expect(el.label.length).toBeGreaterThan(0);
      expect(el.labelZh.length).toBeGreaterThan(0);
      expect(el.roleZh.length).toBeGreaterThan(0);
      for (const lever of ALL) {
        expect(typeof el.levers[lever]).toBe("number");
      }
    }
  });

  it("scores zero when no levers are active (flat composition)", () => {
    for (const el of SAMPLE_ELEMENTS) {
      expect(visualWeight(el, [])).toBe(0);
    }
  });

  it("ranks the title first when all levers are on", () => {
    const ranked = rankByWeight(SAMPLE_ELEMENTS, ALL);
    expect(ranked[0].id).toBe("title");
    expect(ranked[0].rank).toBe(1);
    expect(ranked.map((r) => r.id)).toEqual(["title", "cta", "eyebrow", "body", "meta"]);
  });

  it("ranks the CTA first when only color is on", () => {
    const ranked = rankByWeight(SAMPLE_ELEMENTS, ["color"]);
    expect(ranked[0].id).toBe("cta");
  });

  it("assigns a 1-based contiguous rank to every element", () => {
    const ranked = rankByWeight(SAMPLE_ELEMENTS, ALL);
    expect(ranked.map((r) => r.rank)).toEqual([1, 2, 3, 4, 5]);
  });

  it("emits a three-tier text hierarchy CSS", () => {
    expect(TEXT_LEVELS.map((t) => t.name)).toEqual(["primary", "secondary", "tertiary"]);
    const css = generateHierarchyCSS();
    expect(css).toContain(".text-primary");
    expect(css).toContain(".text-secondary");
    expect(css).toContain(".text-tertiary");
    expect(css).toContain("font-weight: 700;");
  });
});
