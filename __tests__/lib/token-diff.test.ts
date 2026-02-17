import { describe, it, expect, beforeAll } from "vitest";
import { diffTokens, type TokenDiffResult } from "@/lib/styles/token-diff";
import { getStyleTokens } from "@/lib/styles/tokens-registry";

describe("token-diff", () => {
  const neoBrutalist = getStyleTokens("neo-brutalist")!;
  const glassmorphism = getStyleTokens("glassmorphism")!;

  describe("diffTokens with identical tokens", () => {
    it("returns zero overall score when comparing a style with itself", () => {
      const result = diffTokens(neoBrutalist, neoBrutalist);
      expect(result.summary.overallScore).toBe(0);
      expect(result.summary.differentProperties).toBe(0);
    });

    it("returns entries with all diffScores at zero", () => {
      const result = diffTokens(neoBrutalist, neoBrutalist);
      for (const entry of result.entries) {
        expect(entry.diffScore).toBe(0);
      }
    });

    it("has totalProperties matching the flattened property count", () => {
      const result = diffTokens(neoBrutalist, neoBrutalist);
      expect(result.summary.totalProperties).toBeGreaterThan(0);
      expect(result.entries).toHaveLength(result.summary.totalProperties);
    });
  });

  describe("diffTokens with different tokens", () => {
    let result: TokenDiffResult;

    beforeAll(() => {
      result = diffTokens(neoBrutalist, glassmorphism);
    });

    it("returns a positive overall score", () => {
      expect(result.summary.overallScore).toBeGreaterThan(0);
    });

    it("identifies some different properties", () => {
      expect(result.summary.differentProperties).toBeGreaterThan(0);
    });

    it("entries are sorted by diffScore descending", () => {
      for (let i = 1; i < result.entries.length; i++) {
        expect(result.entries[i - 1].diffScore).toBeGreaterThanOrEqual(
          result.entries[i].diffScore
        );
      }
    });

    it("each entry has required fields", () => {
      for (const entry of result.entries) {
        expect(entry.property).toBeTruthy();
        expect(typeof entry.valueA).toBe("string");
        expect(typeof entry.valueB).toBe("string");
        expect(typeof entry.diffScore).toBe("number");
        expect(entry.diffScore).toBeGreaterThanOrEqual(0);
        expect(entry.diffScore).toBeLessThanOrEqual(1);
        expect(entry.category).toBeTruthy();
      }
    });

    it("summary has all six category scores", () => {
      const categories = [
        "colors",
        "typography",
        "spacing",
        "shadows",
        "borders",
        "interaction",
      ] as const;
      for (const cat of categories) {
        expect(typeof result.summary.categoryScores[cat]).toBe("number");
      }
    });

    it("category scores are between 0 and 1", () => {
      for (const score of Object.values(result.summary.categoryScores)) {
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
      }
    });
  });

  describe("diffTokens border category detection", () => {
    it("detects differences in border radius between neo-brutalist and glassmorphism", () => {
      const result = diffTokens(neoBrutalist, glassmorphism);
      const borderEntries = result.entries.filter(
        (e) => e.category === "borders"
      );
      expect(borderEntries.length).toBeGreaterThan(0);

      // neo-brutalist uses rounded-none, glassmorphism uses rounded-3xl
      const radiusEntry = borderEntries.find((e) => e.property === "radius");
      expect(radiusEntry).toBeDefined();
      expect(radiusEntry!.diffScore).toBeGreaterThan(0);
    });
  });
});
