import { describe, it, expect } from "vitest";
import { scoreStyle, scoreAllStyles } from "@/lib/accessibility/scorer";

describe("accessibility-scorer", () => {
  describe("scoreStyle", () => {
    it("returns null for a nonexistent style", () => {
      const result = scoreStyle("nonexistent-style");
      expect(result).toBeNull();
    });

    it("returns a valid AccessibilityScore for neo-brutalist", () => {
      const result = scoreStyle("neo-brutalist");
      expect(result).not.toBeNull();
      expect(typeof result!.overall).toBe("number");
      expect(result!.overall).toBeGreaterThanOrEqual(0);
      expect(result!.overall).toBeLessThanOrEqual(100);
    });

    it("has a grade that is A, B, C, D, or F", () => {
      const result = scoreStyle("neo-brutalist");
      expect(["A", "B", "C", "D", "F"]).toContain(result!.grade);
    });

    it("has a contrast property with score, ratio, pairs", () => {
      const result = scoreStyle("neo-brutalist")!;
      expect(result.contrast).toBeDefined();
      expect(typeof result.contrast.score).toBe("number");
      expect(typeof result.contrast.ratio).toBe("number");
      expect(typeof result.contrast.meetsAA).toBe("boolean");
      expect(typeof result.contrast.meetsAAA).toBe("boolean");
      expect(Array.isArray(result.contrast.pairs)).toBe(true);
    });

    it("contrast pairs have fg, bg, ratio, aa, aaa, context", () => {
      const result = scoreStyle("neo-brutalist")!;
      if (result.contrast.pairs.length > 0) {
        const pair = result.contrast.pairs[0];
        expect(typeof pair.fg).toBe("string");
        expect(typeof pair.bg).toBe("string");
        expect(typeof pair.ratio).toBe("number");
        expect(typeof pair.aa).toBe("boolean");
        expect(typeof pair.aaa).toBe("boolean");
        expect(typeof pair.context).toBe("string");
      }
    });

    it("has a readability property with score, fontSize, fontWeight", () => {
      const result = scoreStyle("neo-brutalist")!;
      expect(result.readability).toBeDefined();
      expect(typeof result.readability.score).toBe("number");
      expect(typeof result.readability.fontSize).toBe("string");
      expect(typeof result.readability.fontWeight).toBe("string");
      expect(typeof result.readability.lineHeight).toBe("string");
    });

    it("returns a result for glassmorphism", () => {
      const result = scoreStyle("glassmorphism");
      expect(result).not.toBeNull();
      expect(result!.overall).toBeGreaterThanOrEqual(0);
    });

    it("overall score is weighted: 70% contrast + 30% readability", () => {
      const result = scoreStyle("neo-brutalist")!;
      const expected = Math.round(
        result.contrast.score * 0.7 + result.readability.score * 0.3
      );
      expect(result.overall).toBe(expected);
    });
  });

  describe("scoreAllStyles", () => {
    it("returns a record with multiple styles scored", () => {
      const all = scoreAllStyles();
      const keys = Object.keys(all);
      expect(keys.length).toBeGreaterThan(0);
      expect(all["neo-brutalist"]).toBeDefined();
    });

    it("each entry is a valid AccessibilityScore", () => {
      const all = scoreAllStyles();
      for (const [, score] of Object.entries(all)) {
        expect(typeof score.overall).toBe("number");
        expect(["A", "B", "C", "D", "F"]).toContain(score.grade);
        expect(score.contrast).toBeDefined();
        expect(score.readability).toBeDefined();
      }
    });
  });
});
