import { describe, it, expect } from "vitest";
import {
  scoreStyleQuality,
  scoreAllStyles,
  generateQualityReport,
} from "@/lib/quality";

const VALID_SLUG = "neo-brutalist";
const INVALID_SLUG = "nonexistent-style-zzzzz";

// ---------------------------------------------------------------------------
// scoreStyleQuality
// ---------------------------------------------------------------------------

describe("scoreStyleQuality", () => {
  it("returns a QualityScore for a valid slug", () => {
    const score = scoreStyleQuality(VALID_SLUG);
    expect(score).not.toBeNull();
    expect(score!.slug).toBe(VALID_SLUG);
  });

  it("includes all expected score fields", () => {
    const score = scoreStyleQuality(VALID_SLUG)!;
    expect(score).toHaveProperty("overall");
    expect(score).toHaveProperty("grade");
    expect(score).toHaveProperty("recipeScore");
    expect(score).toHaveProperty("tokenScore");
    expect(score).toHaveProperty("definitionScore");
    expect(score).toHaveProperty("colorScore");
    expect(score).toHaveProperty("missing");
  });

  it("overall score is between 0 and 100", () => {
    const score = scoreStyleQuality(VALID_SLUG)!;
    expect(score.overall).toBeGreaterThanOrEqual(0);
    expect(score.overall).toBeLessThanOrEqual(100);
  });

  it("grade is a valid letter grade", () => {
    const score = scoreStyleQuality(VALID_SLUG)!;
    expect(["A", "B", "C", "D", "F"]).toContain(score.grade);
  });

  it("missing is an array", () => {
    const score = scoreStyleQuality(VALID_SLUG)!;
    expect(Array.isArray(score.missing)).toBe(true);
  });

  it("returns null for an invalid slug", () => {
    expect(scoreStyleQuality(INVALID_SLUG)).toBeNull();
  });

  it("sub-scores do not exceed their max values", () => {
    const score = scoreStyleQuality(VALID_SLUG)!;
    expect(score.recipeScore).toBeLessThanOrEqual(40);
    expect(score.tokenScore).toBeLessThanOrEqual(25);
    expect(score.definitionScore).toBeLessThanOrEqual(25);
    expect(score.colorScore).toBeLessThanOrEqual(10);
  });

  it("works for glassmorphism style", () => {
    const score = scoreStyleQuality("glassmorphism");
    expect(score).not.toBeNull();
    expect(score!.slug).toBe("glassmorphism");
  });
});

// ---------------------------------------------------------------------------
// scoreAllStyles
// ---------------------------------------------------------------------------

describe("scoreAllStyles", () => {
  it("returns a record with multiple styles", () => {
    const all = scoreAllStyles();
    expect(typeof all).toBe("object");
    expect(Object.keys(all).length).toBeGreaterThan(0);
  });

  it("includes known valid slugs", () => {
    const all = scoreAllStyles();
    expect(all[VALID_SLUG]).toBeDefined();
    expect(all["glassmorphism"]).toBeDefined();
  });

  it("each entry has a valid quality score", () => {
    const all = scoreAllStyles();
    for (const score of Object.values(all)) {
      expect(score.overall).toBeGreaterThanOrEqual(0);
      expect(score.overall).toBeLessThanOrEqual(100);
      expect(["A", "B", "C", "D", "F"]).toContain(score.grade);
    }
  });
});

// ---------------------------------------------------------------------------
// generateQualityReport
// ---------------------------------------------------------------------------

describe("generateQualityReport", () => {
  it("returns a QualityReport with required fields", () => {
    const report = generateQualityReport();
    expect(report).toHaveProperty("generated");
    expect(report).toHaveProperty("totalStyles");
    expect(report).toHaveProperty("averageScore");
    expect(report).toHaveProperty("gradeDistribution");
    expect(report).toHaveProperty("scores");
    expect(report).toHaveProperty("topStyles");
    expect(report).toHaveProperty("bottomStyles");
  });

  it("totalStyles is greater than zero", () => {
    const report = generateQualityReport();
    expect(report.totalStyles).toBeGreaterThan(0);
  });

  it("averageScore is between 0 and 100", () => {
    const report = generateQualityReport();
    expect(report.averageScore).toBeGreaterThanOrEqual(0);
    expect(report.averageScore).toBeLessThanOrEqual(100);
  });

  it("gradeDistribution contains all grade letters", () => {
    const report = generateQualityReport();
    for (const grade of ["A", "B", "C", "D", "F"]) {
      expect(report.gradeDistribution).toHaveProperty(grade);
    }
  });

  it("scores are sorted descending by overall", () => {
    const report = generateQualityReport();
    for (let i = 1; i < report.scores.length; i++) {
      expect(report.scores[i - 1].overall).toBeGreaterThanOrEqual(
        report.scores[i].overall
      );
    }
  });

  it("topStyles has at most 5 entries", () => {
    const report = generateQualityReport();
    expect(report.topStyles.length).toBeLessThanOrEqual(5);
  });

  it("bottomStyles has at most 5 entries", () => {
    const report = generateQualityReport();
    expect(report.bottomStyles.length).toBeLessThanOrEqual(5);
  });

  it("grade distribution sums to totalStyles", () => {
    const report = generateQualityReport();
    const sum = Object.values(report.gradeDistribution).reduce(
      (a, b) => a + b,
      0
    );
    expect(sum).toBe(report.totalStyles);
  });
});
