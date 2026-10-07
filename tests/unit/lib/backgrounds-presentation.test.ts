import { describe, expect, it } from "vitest";
import { backgrounds } from "@/lib/backgrounds";
import { getBackgroundPatternPresentation } from "@/lib/backgrounds/presentation";

describe("background pattern presentation", () => {
  it("copies complete CSS declarations that match the preview", () => {
    const background = backgrounds.find((candidate) => candidate.id === "dot-grid");
    expect(background).toBeDefined();
    if (!background) return;

    const presentation = getBackgroundPatternPresentation(background);

    expect(presentation.style).toEqual({
      background: background.css,
      backgroundSize: "20px 20px",
    });
    expect(presentation.css).toBe(
      `background: ${background.css};\nbackground-size: 20px 20px;`,
    );
  });

  it("keeps every CSS layer and the final background color in Tailwind output", () => {
    const background = backgrounds.find((candidate) => candidate.id === "honeycomb");
    expect(background).toBeDefined();
    if (!background) return;

    const presentation = getBackgroundPatternPresentation(background);

    expect(presentation.tailwind).toContain(
      "[background:radial-gradient(circle_farthest-side_at_0%_50%",
    );
    expect(presentation.tailwind).toContain("linear-gradient(150deg");
    expect(presentation.tailwind).toContain("linear-gradient(30deg");
    expect(presentation.tailwind).toContain("linear-gradient(90deg");
    expect(presentation.tailwind).toContain("#ffffff]");
    expect(presentation.tailwind).toContain("[background-size:20px_20px]");
  });

  it("preserves SVG data URLs while making them safe as Tailwind class tokens", () => {
    const background = backgrounds.find((candidate) => candidate.id === "topography");
    expect(background).toBeDefined();
    if (!background) return;

    const presentation = getBackgroundPatternPresentation(background);

    expect(presentation.css).toContain('url("data:image/svg+xml,%3Csvg');
    expect(presentation.tailwind).toContain("url(data:image/svg+xml,%3Csvg");
    expect(presentation.tailwind).not.toContain('url("data:image/svg+xml');
    expect(presentation.tailwind).toContain("%22");
  });

  it("uses one consistent preview size for every catalog pattern", () => {
    for (const background of backgrounds) {
      const presentation = getBackgroundPatternPresentation(background);

      expect(presentation.style.backgroundSize).toBe("20px 20px");
      expect(presentation.css).toContain("background-size: 20px 20px;");
      expect(presentation.tailwind).toContain("[background-size:20px_20px]");
    }
  });
});
