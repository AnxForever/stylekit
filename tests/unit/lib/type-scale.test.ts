import { describe, expect, it } from "vitest";

import {
  SCALE_RATIOS,
  generateScale,
  generateFluidScale,
  generateScaleCSS,
  generateScaleTailwind,
  generateFluidCSS,
} from "@/lib/type-scale";

describe("type-scale static", () => {
  it("step 0 equals the base size", () => {
    const scale = generateScale(16, 1.25);
    const base = scale.find((s) => s.step === 0)!;
    expect(base.px).toBe(16);
    expect(base.rem).toBe(1);
  });

  it("each positive step multiplies by the ratio", () => {
    const scale = generateScale(16, 1.25);
    expect(scale.find((s) => s.step === 1)!.px).toBeCloseTo(20, 2); // 16 * 1.25
    expect(scale.find((s) => s.step === 2)!.px).toBeCloseTo(25, 2); // 16 * 1.25^2
  });

  it("negative steps go below the base", () => {
    const scale = generateScale(16, 1.25);
    expect(scale.find((s) => s.key === "sm")!.px).toBeCloseTo(12.8, 2); // 16 / 1.25
  });

  it("covers xs through 5xl (9 steps)", () => {
    const scale = generateScale(16, 1.2);
    expect(scale).toHaveLength(9);
    const keys = scale.map((s) => s.key);
    expect(keys).toContain("base");
    expect(keys).toContain("5xl");
  });

  it("exposes 8 named ratios from Minor Second to Golden Ratio", () => {
    expect(SCALE_RATIOS).toHaveLength(8);
    expect(SCALE_RATIOS[0].value).toBe(1.067);
    expect(SCALE_RATIOS[SCALE_RATIOS.length - 1].name).toBe("Golden Ratio");
  });
});

describe("type-scale fluid (Utopia clamp)", () => {
  it("reproduces the Utopia reference clamp for step 0", () => {
    // Utopia calculator c=360,18,1.2,1240,20,1.25 → step 0:
    //   clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem)
    const fluid = generateFluidScale({
      minViewport: 360,
      maxViewport: 1240,
      minBase: 18,
      maxBase: 20,
      minRatio: 1.2,
      maxRatio: 1.25,
    });
    expect(fluid.find((s) => s.step === 0)!.clamp).toBe(
      "clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem)",
    );
  });

  it("min and max px track the two end scales", () => {
    const fluid = generateFluidScale({
      minViewport: 360,
      maxViewport: 1240,
      minBase: 16,
      maxBase: 20,
      minRatio: 1.25,
      maxRatio: 1.25,
    });
    const base = fluid.find((s) => s.step === 0)!;
    expect(base.minPx).toBe(16);
    expect(base.maxPx).toBe(20);
  });
});

describe("type-scale code generation", () => {
  it("CSS emits --text-* custom properties", () => {
    const css = generateScaleCSS(generateScale(16, 1.25));
    expect(css).toContain(":root {");
    expect(css).toContain("--text-base: 1rem;");
    expect(css).toMatch(/--text-2xl:/);
  });

  it("Tailwind emits an @theme block", () => {
    const tw = generateScaleTailwind(generateScale(16, 1.25));
    expect(tw).toContain("@theme {");
    expect(tw).toContain("--text-base:");
  });

  it("fluid CSS emits clamp() values", () => {
    const css = generateFluidCSS(
      generateFluidScale({
        minViewport: 360,
        maxViewport: 1240,
        minBase: 16,
        maxBase: 20,
        minRatio: 1.2,
        maxRatio: 1.2,
      }),
    );
    expect(css).toContain("clamp(");
    expect(css).toContain("vw,");
  });
});
