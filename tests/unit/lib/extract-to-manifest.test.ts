import { describe, expect, it } from "vitest";

import { extractedStyleToManifest, type ExtractedStyle } from "@/lib/submit/extract-to-manifest";
import { validateStyleSubmissionManifest } from "@/lib/submit/manifest-validator";
import { runStyleGates } from "@/lib/submission/gates/style-gates";

// Shaped exactly like the extractor's `stylekit.normalized` payload measured
// from a real site (linear.app): semantic roles plus a confidence-ranked palette.
const LINEAR_LIKE: ExtractedStyle = {
  name: "Linear – The system for product development",
  source: { url: "https://linear.app" },
  tokens: {
    colors: {
      semantic: { text: "#f7f8f8", background: "#5e6ad2" },
      palette: {
        "color-29": { value: "#f7f8f8", usage: ["text", "border"], confidence: "high" },
        "color-2": { value: "#ffffff", usage: ["text", "border"], confidence: "medium" },
        "color-1": { value: "#5e6ad2", usage: ["background"], confidence: "low" },
        "color-12": { value: "#8a8f98", usage: ["text", "border"], confidence: "high" },
      },
    },
    typography: {
      fontFamily: { primary: '"Inter Variable", Inter, sans-serif' },
      fontSize: { base: "16px", "2xl": "40px" },
    },
  },
};

describe("extractedStyleToManifest", () => {
  it("maps semantic colors, cleans the name, and slugifies", () => {
    const { manifest } = extractedStyleToManifest(LINEAR_LIKE);
    const f = manifest.formData;

    expect(f.name).toBe("Linear"); // tagline after the en-dash dropped
    expect(f.slug).toBe("linear");
    expect(f.background).toBe("#5e6ad2");
    expect(f.foreground).toBe("#f7f8f8");
    // The brand indigo is the most chromatic hue, so it becomes primary even
    // though it was captured as the background — not the gray palette entry.
    expect(f.primaryColor).toBe("#5e6ad2");
    // Every core color is a valid hex.
    for (const hex of [f.primaryColor, f.secondaryColor, f.background, f.foreground]) {
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("synthesizes at least three concrete AI rules from real tokens", () => {
    const { manifest } = extractedStyleToManifest(LINEAR_LIKE);
    const rules = manifest.formData.aiRules;

    expect(rules.length).toBeGreaterThanOrEqual(3);
    expect(rules.join("\n")).toContain("#5e6ad2"); // background named
    expect(rules.some((r) => r.includes("Inter"))).toBe(true); // typeface named
  });

  it("takes the brand name from the shortest title segment and the saturated brand color", () => {
    const { manifest } = extractedStyleToManifest({
      name: "Agentic Infrastructure - Vercel",
      source: { url: "https://vercel.com" },
      tokens: {
        colors: {
          semantic: { background: "#ffffff", text: "#000000" },
          palette: { c1: { value: "#0070f3", usage: ["link"], confidence: "high" } },
        },
      },
    });
    // Brand name is "Vercel", not the longer leading phrase.
    expect(manifest.formData.name).toBe("Vercel");
    // The saturated blue is the brand color, not black text or white background.
    expect(manifest.formData.primaryColor).toBe("#0070f3");
  });

  it("keeps in-word hyphens in a single-segment name", () => {
    const { manifest } = extractedStyleToManifest({
      name: "Neo-Brutalist",
      source: { url: "https://example.com" },
      tokens: { colors: { semantic: {}, palette: {} } },
    });
    expect(manifest.formData.name).toBe("Neo-Brutalist");
  });

  it("flags machine-unknowable fields for review", () => {
    const { needsReview } = extractedStyleToManifest(LINEAR_LIKE);
    expect(needsReview).toContain("name");
    expect(needsReview).toContain("category");
    expect(needsReview).toContain("description");
  });

  it("honors explicit overrides and does not flag them", () => {
    const { manifest, needsReview } = extractedStyleToManifest(LINEAR_LIKE, {
      name: "Aurora",
      category: "expressive",
      description: "A vivid indigo product UI with high-contrast type.",
    });
    expect(manifest.formData.name).toBe("Aurora");
    expect(manifest.formData.category).toBe("expressive");
    expect(needsReview).not.toContain("name");
    expect(needsReview).not.toContain("category");
    expect(needsReview).not.toContain("description");
  });

  it("produces a manifest the shared validator accepts", () => {
    const { manifest } = extractedStyleToManifest(LINEAR_LIKE);
    const parsed = validateStyleSubmissionManifest(manifest);
    expect(parsed.ok).toBe(true);
  });

  it("clears every blocking submission gate (slug clash aside)", async () => {
    const { manifest } = extractedStyleToManifest(LINEAR_LIKE, { slug: "linear-extracted-demo" });
    const report = await runStyleGates(manifest, { slugTaken: false });
    const blockingFails = report.gates.filter((g) => g.severity === "blocking" && !g.passed);
    expect(blockingFails.map((g) => `${g.id}: ${g.detail}`)).toEqual([]);
  });

  it("falls back to safe neutrals when there is no usable color signal", () => {
    const { manifest, needsReview } = extractedStyleToManifest({
      name: "Bare",
      source: { url: "https://bare.example" },
      tokens: { colors: { palette: {} } },
    });
    const f = manifest.formData;
    for (const hex of [f.primaryColor, f.secondaryColor, f.background, f.foreground]) {
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    }
    expect(needsReview).toContain("colors");
  });
});
