import { describe, it, expect } from "vitest";
import {
  analyzeProjectStyle,
  detectDominantPatterns,
  generateExplanation,
} from "@/lib/analyzer";

// ---------------------------------------------------------------------------
// Sample code snippets for testing
// ---------------------------------------------------------------------------

const NEO_BRUTALIST_CODE = `
<div className="border-2 border-black rounded-none shadow-[4px_4px_0_black] bg-yellow-300 font-mono p-4">
  <h1 className="text-2xl font-bold uppercase">Hello World</h1>
  <button className="border-2 border-black bg-white px-4 py-2 font-mono hover:shadow-[2px_2px_0_black]">
    Click me
  </button>
</div>
`;

const GLASSMORPHISM_CODE = `
<div className="backdrop-blur-lg bg-white/30 rounded-2xl border border-white/20 p-6 shadow-xl">
  <h2 className="text-xl font-semibold">Glass Card</h2>
  <p className="text-gray-600">Translucent layered glass effect</p>
</div>
`;

const MINIMAL_CODE = `
<div className="p-4">
  <span>Hello</span>
</div>
`;

const EMPTY_CODE = `
<div>No classes here</div>
`;

// ---------------------------------------------------------------------------
// analyzeProjectStyle
// ---------------------------------------------------------------------------

describe("analyzeProjectStyle", () => {
  it("returns results with correct structure", () => {
    const result = analyzeProjectStyle({ code: NEO_BRUTALIST_CODE });
    expect(result).toHaveProperty("topMatches");
    expect(result).toHaveProperty("classesFound");
    expect(result).toHaveProperty("dominantPatterns");
    expect(Array.isArray(result.topMatches)).toBe(true);
    expect(Array.isArray(result.classesFound)).toBe(true);
    expect(Array.isArray(result.dominantPatterns)).toBe(true);
  });

  it("extracts classes from code", () => {
    const result = analyzeProjectStyle({ code: NEO_BRUTALIST_CODE });
    expect(result.classesFound.length).toBeGreaterThan(0);
    expect(result.classesFound).toContain("border-2");
    expect(result.classesFound).toContain("font-mono");
  });

  it("returns up to 5 top matches", () => {
    const result = analyzeProjectStyle({ code: NEO_BRUTALIST_CODE });
    expect(result.topMatches.length).toBeLessThanOrEqual(5);
    expect(result.topMatches.length).toBeGreaterThan(0);
  });

  it("each match has required fields", () => {
    const result = analyzeProjectStyle({ code: NEO_BRUTALIST_CODE });
    for (const match of result.topMatches) {
      expect(match).toHaveProperty("slug");
      expect(match).toHaveProperty("name");
      expect(match).toHaveProperty("confidence");
      expect(match).toHaveProperty("matchDetails");
      expect(match).toHaveProperty("explanation");
      expect(match.confidence).toBeGreaterThanOrEqual(0);
      expect(match.confidence).toBeLessThanOrEqual(100);
    }
  });

  it("top matches are sorted by confidence descending", () => {
    const result = analyzeProjectStyle({ code: NEO_BRUTALIST_CODE });
    for (let i = 1; i < result.topMatches.length; i++) {
      expect(result.topMatches[i - 1].confidence).toBeGreaterThanOrEqual(
        result.topMatches[i].confidence
      );
    }
  });

  it("detects neo-brutalist patterns in brutalist code", () => {
    const result = analyzeProjectStyle({ code: NEO_BRUTALIST_CODE });
    expect(result.dominantPatterns).toContain("thick borders");
    expect(result.dominantPatterns).toContain("monospace fonts");
  });

  it("detects glassmorphism patterns in glass code", () => {
    const result = analyzeProjectStyle({ code: GLASSMORPHISM_CODE });
    expect(result.dominantPatterns).toContain("backdrop blur");
    expect(result.dominantPatterns).toContain("rounded corners (large)");
  });

  it("returns empty results for code with no classes", () => {
    const result = analyzeProjectStyle({ code: EMPTY_CODE });
    expect(result.topMatches).toHaveLength(0);
    expect(result.classesFound).toHaveLength(0);
    expect(result.dominantPatterns).toHaveLength(0);
  });

  it("handles code with very few classes", () => {
    const result = analyzeProjectStyle({ code: MINIMAL_CODE });
    // Should still produce results if any classes were extracted
    expect(result).toHaveProperty("topMatches");
    expect(result).toHaveProperty("classesFound");
  });
});

// ---------------------------------------------------------------------------
// detectDominantPatterns
// ---------------------------------------------------------------------------

describe("detectDominantPatterns", () => {
  it("detects rounded corners from large radius classes", () => {
    const patterns = detectDominantPatterns(["rounded-2xl", "rounded-full"]);
    expect(patterns).toContain("rounded corners (large)");
  });

  it("detects sharp corners", () => {
    const patterns = detectDominantPatterns(["rounded-none"]);
    expect(patterns).toContain("sharp corners");
  });

  it("detects gradients", () => {
    const patterns = detectDominantPatterns(["bg-gradient-to-r", "from-blue-500"]);
    expect(patterns).toContain("gradients");
  });

  it("detects backdrop blur", () => {
    const patterns = detectDominantPatterns(["backdrop-blur-lg"]);
    expect(patterns).toContain("backdrop blur");
  });

  it("detects dark backgrounds", () => {
    const patterns = detectDominantPatterns(["bg-gray-900", "bg-black"]);
    expect(patterns).toContain("dark backgrounds");
  });

  it("detects serif fonts", () => {
    const patterns = detectDominantPatterns(["font-serif"]);
    expect(patterns).toContain("serif fonts");
  });

  it("detects monospace fonts", () => {
    const patterns = detectDominantPatterns(["font-mono"]);
    expect(patterns).toContain("monospace fonts");
  });

  it("detects grid layout", () => {
    const patterns = detectDominantPatterns(["grid", "grid-cols-3"]);
    expect(patterns).toContain("grid layout");
  });

  it("returns empty array for non-pattern classes", () => {
    const patterns = detectDominantPatterns(["p-4", "m-2", "text-lg"]);
    expect(patterns).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// generateExplanation
// ---------------------------------------------------------------------------

describe("generateExplanation", () => {
  it("returns a non-empty string", () => {
    const explanation = generateExplanation(
      "neo-brutalist",
      {
        classOverlap: 50,
        forbiddenViolations: 0,
        requiredPresence: 60,
        patternScore: 70,
      },
      ["thick borders", "monospace fonts"]
    );
    expect(typeof explanation).toBe("string");
    expect(explanation.length).toBeGreaterThan(0);
  });

  it("mentions class overlap when high", () => {
    const explanation = generateExplanation(
      "neo-brutalist",
      {
        classOverlap: 50,
        forbiddenViolations: 0,
        requiredPresence: 20,
        patternScore: 50,
      },
      []
    );
    expect(explanation).toContain("50%");
  });

  it("mentions forbidden violations when present", () => {
    const explanation = generateExplanation(
      "neo-brutalist",
      {
        classOverlap: 10,
        forbiddenViolations: 5,
        requiredPresence: 10,
        patternScore: 50,
      },
      []
    );
    expect(explanation).toContain("forbidden");
  });

  it("returns explanation even for poor matches", () => {
    const explanation = generateExplanation(
      "glassmorphism",
      {
        classOverlap: 0,
        forbiddenViolations: 0,
        requiredPresence: 0,
        patternScore: 10,
      },
      []
    );
    // With zero forbidden violations, it still produces an explanation
    expect(typeof explanation).toBe("string");
    expect(explanation.length).toBeGreaterThan(0);
  });
});
