import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/ai-generator/style-generator", () => ({
  generateStyleFromDescription: vi.fn(),
}));

import { runGenerateStage } from "@/lib/pipeline/adapters/generate";
import { generateStyleFromDescription } from "@/lib/ai-generator/style-generator";

const mockedGenerateStyleFromDescription = vi.mocked(generateStyleFromDescription);

describe("runGenerateStage", () => {
  it("composes description from draft and passes matched slug as base style", async () => {
    mockedGenerateStyleFromDescription.mockReturnValue({
      name: "Generated",
      description: "Generated from test",
      tokens: {} as never,
      sourceStyles: [{ slug: "apple-style", weight: 1 }],
      confidence: 80,
    } as never);

    await runGenerateStage(
      {
        description: "Calm enterprise UI",
        philosophy: "Prioritize clarity over ornament",
        keywords: ["professional", "clean"],
      },
      "apple-style",
      { framework: "react" },
      { run: {} as never }
    );

    expect(mockedGenerateStyleFromDescription).toHaveBeenCalledWith({
      description:
        "Calm enterprise UI. Prioritize clarity over ornament. professional, clean",
      baseStyle: "apple-style",
    });
  });

  it("uses fallback description when draft has no descriptive fields", async () => {
    mockedGenerateStyleFromDescription.mockReturnValue({
      name: "Fallback",
      description: "Generated from fallback",
      tokens: {} as never,
      sourceStyles: [{ slug: "corporate-clean", weight: 1 }],
      confidence: 45,
    } as never);

    await runGenerateStage(
      {},
      undefined,
      { framework: "html" },
      { run: {} as never }
    );

    expect(mockedGenerateStyleFromDescription).toHaveBeenCalledWith({
      description: "modern clean style",
      baseStyle: undefined,
    });
  });

  it("returns generator output including structured insights", async () => {
    const generated = {
      name: "Future Clean Fusion",
      description: "Generated from: Apple Style, Mecha.",
      tokens: {} as never,
      sourceStyles: [{ slug: "apple-style", weight: 0.6 }],
      confidence: 84,
      reasoning: ["Anchored to Apple Style."],
      insights: {
        baseStyle: "apple-style",
        detectedStyles: ["apple-style"],
        avoidedStyles: ["neo-brutalist"],
        matchedKeywords: ["futuristic", "clean"],
        negativeKeywords: ["brutalist"],
      },
    };

    mockedGenerateStyleFromDescription.mockReturnValue(generated as never);

    const result = await runGenerateStage(
      { description: "Futuristic clean interface" },
      "apple-style",
      { framework: "react" },
      { run: {} as never }
    );

    expect(result).toEqual(generated);
    expect(result.insights?.avoidedStyles).toContain("neo-brutalist");
  });
});
