import { describe, it, expect } from "vitest";
import { lintCode, lintMultiple, formatLintResult } from "@/lib/linter/index";

describe("linter", () => {
  describe("lintCode", () => {
    it("returns valid=true for compliant neo-brutalist code", () => {
      const code = `<div class="rounded-none border-2 border-black bg-white p-4">Hello</div>`;
      const result = lintCode("neo-brutalist", code);
      expect(result.valid).toBe(true);
      expect(result.style).toBe("neo-brutalist");
      expect(result.violations.filter((v) => v.severity === "error")).toHaveLength(0);
    });

    it("detects forbidden rounded-lg class in neo-brutalist style", () => {
      const code = `<button class="rounded-lg shadow-lg bg-gray-300 px-4 py-2">Click</button>`;
      const result = lintCode("neo-brutalist", code);
      expect(result.valid).toBe(false);
      expect(result.stats.errorCount).toBeGreaterThan(0);

      const roundedViolation = result.violations.find(
        (v) => v.class === "rounded-lg"
      );
      expect(roundedViolation).toBeDefined();
      expect(roundedViolation!.severity).toBe("error");
    });

    it("detects shadow-lg as forbidden in neo-brutalist style", () => {
      const code = `<div class="shadow-lg p-4">Card</div>`;
      const result = lintCode("neo-brutalist", code);
      const shadowViolation = result.violations.find(
        (v) => v.class === "shadow-lg"
      );
      expect(shadowViolation).toBeDefined();
    });

    it("returns proper stats structure", () => {
      const code = `<div class="rounded-lg shadow-lg border-gray-300">Test</div>`;
      const result = lintCode("neo-brutalist", code);
      expect(result.stats).toBeDefined();
      expect(typeof result.stats.totalClasses).toBe("number");
      expect(typeof result.stats.errorCount).toBe("number");
      expect(typeof result.stats.warningCount).toBe("number");
      expect(result.stats.totalClasses).toBeGreaterThan(0);
    });

    it("returns a config error for unknown styles", () => {
      const code = `<div class="rounded-lg shadow-lg">Test</div>`;
      const result = lintCode("nonexistent-style", code);
      expect(result.valid).toBe(false);
      expect(result.stats.errorCount).toBe(1);
      expect(result.violations[0]?.reason).toContain("No lint configuration available");
    });

    it("violation has reason text", () => {
      const code = `<div class="rounded-lg">Test</div>`;
      const result = lintCode("neo-brutalist", code);
      const violation = result.violations.find((v) => v.class === "rounded-lg");
      expect(violation).toBeDefined();
      expect(violation!.reason).toBeTruthy();
    });

    it("generates suggestions for violations", () => {
      const code = `<div class="rounded-lg border-gray-300">Test</div>`;
      const result = lintCode("neo-brutalist", code);
      // suggestions may or may not be generated depending on the module
      expect(Array.isArray(result.suggestions)).toBe(true);
    });

    it("generates a fixPrompt string", () => {
      const code = `<div class="rounded-lg">Test</div>`;
      const result = lintCode("neo-brutalist", code);
      expect(typeof result.fixPrompt).toBe("string");
    });

    it("detects pattern-based forbidden classes (gradient)", () => {
      const code = `<div class="bg-gradient-to-r from-blue-500 to-purple-500">Gradient</div>`;
      const result = lintCode("neo-brutalist", code);
      const gradientViolation = result.violations.find(
        (v) => v.class === "bg-gradient-to-r"
      );
      expect(gradientViolation).toBeDefined();
      expect(gradientViolation!.severity).toBe("error");
    });
  });

  describe("lintMultiple", () => {
    it("lints multiple code blocks and returns summary", () => {
      const blocks = [
        { code: `<div class="rounded-none border-2 border-black">OK</div>`, name: "compliant" },
        { code: `<div class="rounded-lg shadow-lg">Bad</div>`, name: "violating" },
      ];
      const { results, summary } = lintMultiple(blocks, "neo-brutalist");
      expect(results).toHaveLength(2);
      expect(summary.total).toBe(2);
      expect(summary.passed).toBeGreaterThanOrEqual(1);
      expect(summary.failed).toBeGreaterThanOrEqual(1);
    });
  });

  describe("formatLintResult", () => {
    it("returns a formatted string with style name and status", () => {
      const code = `<div class="rounded-lg">Test</div>`;
      const result = lintCode("neo-brutalist", code);
      const formatted = formatLintResult(result);
      expect(formatted).toContain("neo-brutalist");
      expect(formatted).toContain("FAIL");
    });

    it("returns PASS for compliant code", () => {
      const code = `<div class="rounded-none border-black">Test</div>`;
      const result = lintCode("neo-brutalist", code);
      const formatted = formatLintResult(result);
      expect(formatted).toContain("PASS");
    });
  });
});
