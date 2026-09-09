import { describe, expect, it } from "vitest";
import { previewAssetsSchema, type PreviewAssets } from "@/lib/style-preview/preview-assets";
import { componentCodeWithAssets, componentMotionCss } from "@/lib/style-preview/motion-css";
import { extractedStyleToManifest } from "@/lib/submit/extract-to-manifest";

const assets: PreviewAssets = {
  fonts: [{ family: "Captured Face", sourceUrl: "https://cdn.example.com/face.woff2", dataUrl: "data:font/woff2;base64,d09GMgAAAAEAAAAA", weight: "100 900" }],
  motion: { button: {
    transition: { property: "transform", duration: "0.25s", timingFunction: "ease-out", delay: "0s" },
    base: { transform: "none" },
    states: { hover: { transform: "translateY(-4px)" }, focus: { outlineWidth: "3px", outlineColor: "#0044cc" } },
    animations: [{ name: "lift", duration: 800, delay: 0, iterations: "infinite", direction: "alternate", fill: "both", easing: "ease-in-out", keyframes: [
      { offset: 0, styles: { transform: "translateY(0px)" } },
      { offset: 1, styles: { transform: "translateY(-8px)" } },
    ] }],
  } },
};

describe("extracted preview assets", () => {
  it("retains font sources, durations and state evidence in the manifest and AI rules", () => {
    const result = extractedStyleToManifest({
      fonts: assets.fonts,
      page: { styles: { backgroundColor: "#ffffff", color: "#111111", fontFamily: '"Captured Face", sans-serif', fontSize: "16px" } },
      components: { button: [{ inViewport: true, styles: { backgroundColor: "#111111", color: "#ffffff", borderRadius: "8px" }, motion: assets.motion?.button }] },
    });
    expect(result.manifest.formData.previewAssets).toEqual(assets);
    expect(result.manifest.formData.aiRules.join("\n")).toContain("duration: 0.25s");
    expect(result.manifest.formData.aiRules.join("\n")).toContain("translateY(-4px)");
    expect(result.manifest.formData.aiRules.join("\n")).toContain("https://cdn.example.com/face.woff2");
    expect(result.manifest.formData.aiRules.join("\n")).toContain("prefers-reduced-motion");
    expect(result.needsReview).not.toContain("fonts");
  });

  it("flags uncaptured font files instead of claiming full typography fidelity", () => {
    const result = extractedStyleToManifest({ fonts: [{ family: "Unavailable Face" }] });
    expect(result.needsReview).toContain("fonts");
    expect(result.manifest.formData.previewAssets?.fonts).toEqual([{ family: "Unavailable Face" }]);
  });

  it.each([
    { fonts: [{ family: "Bad", dataUrl: "data:text/html;base64,PHNjcmlwdD4=" }] },
    { fonts: [{ family: "Bad", sourceUrl: "javascript:alert(1)" }] },
    { fonts: [{ family: "Bad", sourceUrl: "https://user:password@example.com/font.woff2" }] },
    { motion: { button: { states: { hover: { transform: "translateY(2px); position: fixed" } } } } },
    { motion: { button: { states: { hover: { filter: "url(https://example.com/track)" } } } } },
    { motion: { button: { states: { hover: { color: "var(--secret)" } } } } },
  ])("rejects active content and injected CSS at the submission boundary (%#)", (input) => {
    expect(previewAssetsSchema.safeParse(input).success).toBe(false);
  });

  it("bounds the combined font payload as well as individual files", () => {
    const dataUrl = `data:font/woff2;base64,${"A".repeat(300_000)}`;
    expect(previewAssetsSchema.safeParse({ fonts: [{ family: "A", dataUrl }] }).success).toBe(true);
    expect(previewAssetsSchema.safeParse({ fonts: [{ family: "A", dataUrl }, { family: "B", dataUrl }] }).success).toBe(false);
  });

  it("fits a common variable font inside a submission", () => {
    const dataUrl = `data:font/woff2;base64,${"A".repeat(Math.ceil(352_240 / 3) * 4)}`;
    const result = extractedStyleToManifest({ fonts: [{ family: "Variable Face", dataUrl }] });
    expect(result.manifest.formData.previewAssets?.fonts?.[0].dataUrl).toBe(dataUrl);
    expect(new TextEncoder().encode(JSON.stringify(result.manifest)).length).toBeLessThan(480 * 1024);
    expect(result.needsReview).not.toContain("fonts");
  });

  it("retains font references when embedding would crowd out the rest of a submission", () => {
    const dataUrl = `data:font/woff2;base64,${"A".repeat(491_200)}`;
    const sourceUrl = "https://cdn.example.com/large.woff2";
    const result = extractedStyleToManifest({ fonts: [{ family: "Large Face", dataUrl, sourceUrl }] });
    expect(result.manifest.formData.previewAssets?.fonts).toEqual([{ family: "Large Face", sourceUrl }]);
    expect(result.needsReview).toContain("fonts");
    expect(new TextEncoder().encode(JSON.stringify(result.manifest)).length).toBeLessThan(480 * 1024);
  });

  it("scopes animation names and selectors and omits playback until requested", () => {
    const stopped = componentMotionCss(assets.motion?.button, "sample-a", false);
    const playing = componentMotionCss(assets.motion?.button, "sample-b", true);
    expect(stopped).not.toContain("@keyframes");
    expect(stopped).toContain('[data-stylekit-preview="sample-a"] > :first-child:hover');
    expect(stopped).toContain(":focus-visible");
    expect(playing).toContain("@keyframes sk-sample-b-0");
    expect(playing).toContain("prefers-reduced-motion: reduce");
    expect(playing).not.toContain("transform: none !important");
    expect(componentMotionCss(assets.motion?.button, 'bad"] body')).toBe("");
  });

  it("copies font files, keyframes, states and the component as a portable sample", () => {
    const code = componentCodeWithAssets('<button type="button">Continue</button>', assets, "button");
    expect(code).toContain("@font-face");
    expect(code).toContain("data:font/woff2;base64,");
    expect(code).not.toContain("https://cdn.example.com/");
    expect(code).toContain("@keyframes sk-extracted-button-0");
    expect(code).toContain('data-stylekit-preview="extracted-button"');
    expect(code).toContain('<button type="button">Continue</button>');
  });
});
