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

  it("keeps honeycomb layers, offset, and catalog tile size in every output", () => {
    const background = backgrounds.find((candidate) => candidate.id === "honeycomb");
    expect(background).toBeDefined();
    if (!background) return;

    const presentation = getBackgroundPatternPresentation(background);

    expect(background.css).toContain("21px 30px");
    expect(background.tailwind).toContain("bg-[size:42px_60px]");
    expect(presentation.style).toEqual({
      background: background.css,
      backgroundSize: "42px 60px",
    });
    expect(presentation.css).toContain("21px 30px");
    expect(presentation.css).toContain("background-size: 42px 60px;");
    expect(presentation.tailwind).toContain(
      "[background:radial-gradient(circle_farthest-side_at_0%_50%",
    );
    expect(presentation.tailwind).toContain("linear-gradient(150deg");
    expect(presentation.tailwind).toContain("linear-gradient(30deg");
    expect(presentation.tailwind).toContain("linear-gradient(90deg");
    expect(presentation.tailwind).toContain("21px_30px");
    expect(presentation.tailwind).toContain("#ffffff]");
    expect(presentation.tailwind).toContain("[background-size:42px_60px]");
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

  it("uses each catalog size and falls back to 20px for patterns without one", () => {
    const isometricGrid = backgrounds.find((candidate) => candidate.id === "isometric-grid");
    const crossHatch = backgrounds.find((candidate) => candidate.id === "cross-hatch");
    expect(isometricGrid).toBeDefined();
    expect(crossHatch).toBeDefined();
    if (!isometricGrid || !crossHatch) return;

    const sized = getBackgroundPatternPresentation(isometricGrid);
    expect(sized.style.backgroundSize).toBe("80px 140px");
    expect(sized.css).toContain("background-size: 80px 140px;");
    expect(sized.tailwind).toContain("[background-size:80px_140px]");

    const fallback = getBackgroundPatternPresentation(crossHatch);
    expect(fallback.style.backgroundSize).toBe("20px 20px");
    expect(fallback.css).toContain("background-size: 20px 20px;");
    expect(fallback.tailwind).toContain("[background-size:20px_20px]");
  });
});
