import { describe, it, expect } from "vitest";
import { createStyleTokens } from "../token-defaults";

describe("createStyleTokens", () => {
  it("returns complete StyleTokens with empty overrides", () => {
    const tokens = createStyleTokens({});
    expect(tokens.border.width).toBe("border");
    expect(tokens.shadow.sm).toBe("shadow-sm");
    expect(tokens.typography.heading).toBe("font-bold tracking-tight");
    expect(tokens.spacing.section).toBeTruthy();
    expect(tokens.colors.background.primary).toBe("bg-white");
    expect(tokens.forbidden.classes).toEqual([]);
    expect(tokens.required.button).toEqual([]);
  });

  it("overrides scalar values while preserving defaults", () => {
    const tokens = createStyleTokens({
      border: { radius: "rounded-none" },
    });
    expect(tokens.border.radius).toBe("rounded-none");
    expect(tokens.border.width).toBe("border");
    expect(tokens.border.color).toBe("border-gray-200");
  });

  it("overrides nested objects deeply", () => {
    const tokens = createStyleTokens({
      colors: {
        background: { primary: "bg-black" },
      },
    });
    expect(tokens.colors.background.primary).toBe("bg-black");
    expect(tokens.colors.background.secondary).toBe("bg-gray-50");
    expect(tokens.colors.text.primary).toBe("text-gray-900");
  });

  it("replaces arrays entirely", () => {
    const tokens = createStyleTokens({
      colors: {
        background: { accent: ["bg-red-500", "bg-red-600"] },
      },
    });
    expect(tokens.colors.background.accent).toEqual(["bg-red-500", "bg-red-600"]);
  });

  it("overrides required arrays", () => {
    const tokens = createStyleTokens({
      required: {
        button: ["bg-black", "text-white"],
      },
    });
    expect(tokens.required.button).toEqual(["bg-black", "text-white"]);
    expect(tokens.required.card).toEqual([]);
  });

  it("overrides forbidden with custom values", () => {
    const tokens = createStyleTokens({
      forbidden: {
        classes: ["rounded-lg", "shadow-xl"],
        patterns: ["gradient"],
        reasons: { "rounded-lg": "This style uses sharp edges" },
      },
    });
    expect(tokens.forbidden.classes).toEqual(["rounded-lg", "shadow-xl"]);
    expect(tokens.forbidden.patterns).toEqual(["gradient"]);
    expect(tokens.forbidden.reasons["rounded-lg"]).toBe("This style uses sharp edges");
  });

  it("handles multiple nested overrides at once", () => {
    const tokens = createStyleTokens({
      border: { width: "border-2", color: "border-red-500", radius: "rounded-none" },
      typography: { heading: "font-serif italic", sizes: { hero: "text-8xl" } },
      spacing: { gap: { sm: "gap-1" } },
    });
    expect(tokens.border.width).toBe("border-2");
    expect(tokens.border.color).toBe("border-red-500");
    expect(tokens.typography.heading).toBe("font-serif italic");
    expect(tokens.typography.sizes.hero).toBe("text-8xl");
    expect(tokens.typography.sizes.h1).toBe("text-3xl md:text-5xl");
    expect(tokens.spacing.gap.sm).toBe("gap-1");
    expect(tokens.spacing.gap.md).toBe("gap-4 md:gap-6");
  });
});
