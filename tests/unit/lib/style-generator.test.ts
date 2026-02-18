import { describe, expect, it } from "vitest";
import { generateStyleFromDescription } from "@/lib/ai-generator/style-generator";

describe("generateStyleFromDescription", () => {
  it("keeps explicit base style as the primary influence", () => {
    const result = generateStyleFromDescription({
      description: "clean modern product dashboard",
      baseStyle: "apple-style",
    });

    expect(result.sourceStyles[0]?.slug).toBe("apple-style");
    expect(result.sourceStyles[0]?.weight).toBeGreaterThan(0.35);
  });

  it("detects direct style aliases in natural language", () => {
    const result = generateStyleFromDescription({
      description: "Need a neo brutal layout with editorial typography",
    });

    const slugs = result.sourceStyles.map((item) => item.slug);
    expect(slugs[0]).toBe("neo-brutalist");
    expect(slugs).toContain("editorial");
  });

  it("applies negative constraints from phrasing like less/not/without", () => {
    const result = generateStyleFromDescription({
      description: "Futuristic interface but less neon and not brutalist",
    });

    const slugs = result.sourceStyles.map((item) => item.slug);
    expect(slugs).not.toContain("cyberpunk-neon");
    expect(slugs).not.toContain("neo-brutalist");
    expect(result.description).toContain("Avoided:");
  });

  it("enforces hard exclusions for negative style keywords", () => {
    const result = generateStyleFromDescription({
      description: "without neon futuristic dark",
    });

    const slugs = result.sourceStyles.map((item) => item.slug);
    expect(slugs).not.toContain("cyberpunk-neon");
    expect(slugs).not.toContain("synthwave");
    expect(slugs).not.toContain("outrun");
    expect(slugs).not.toContain("neon-samurai");
  });

  it("keeps confidence stable for longer prompts with the same core intent", () => {
    const concise = generateStyleFromDescription({
      description: "dark futuristic neon",
    });

    const verbose = generateStyleFromDescription({
      description:
        "I need a product UI that feels dark and futuristic, with neon accents, layered depth, and a modern visual tone for a launch page",
    });

    expect(verbose.confidence).toBeGreaterThanOrEqual(concise.confidence - 12);
  });

  it("returns reasoning hints for explainability", () => {
    const result = generateStyleFromDescription({
      description: "Like Apple but warmer and less neon",
    });

    expect(result.reasoning).toBeDefined();
    expect(result.reasoning?.length).toBeGreaterThan(0);
    expect(result.reasoning?.some((hint) => hint.toLowerCase().includes("anchored"))).toBe(
      true
    );
    expect(result.insights?.baseStyle).toBe("apple-style");
    expect(result.insights?.negativeKeywords).toContain("neon");
  });

  it("returns structured insight signals for UI rendering", () => {
    const result = generateStyleFromDescription({
      description: "Not brutalist, like Apple and professional",
    });

    expect(result.insights).toBeDefined();
    expect(result.insights?.matchedKeywords.length).toBeGreaterThan(0);
    expect(result.insights?.avoidedStyles).toContain("neo-brutalist");
    expect(result.insights?.detectedStyles).toContain("apple-style");
  });

  it("suppresses base style when prompt explicitly excludes it", () => {
    const result = generateStyleFromDescription({
      description: "Like Apple but not apple",
    });

    const slugs = result.sourceStyles.map((item) => item.slug);
    expect(slugs).not.toContain("apple-style");
    expect(result.insights?.baseStyle).toBeNull();
    expect(result.insights?.avoidedStyles).toContain("apple-style");
  });

  it("assigns higher confidence to strong structured prompts than vague prompts", () => {
    const strong = generateStyleFromDescription({
      description: "Like Apple style, clean professional minimal dashboard",
    });

    const vague = generateStyleFromDescription({
      description: "something interesting please",
    });

    expect(strong.confidence).toBeGreaterThan(vague.confidence);
  });
});
