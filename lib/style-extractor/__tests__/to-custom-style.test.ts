import { defaultStyleDefinition } from "@/lib/style-creator/types";
import { applyExtractedDraftToCustomStyle } from "@/lib/style-extractor/to-custom-style";

describe("applyExtractedDraftToCustomStyle", () => {
  it("maps extracted palette into custom style colors", () => {
    const base = structuredClone(defaultStyleDefinition);

    const next = applyExtractedDraftToCustomStyle(
      {
        primaryColor: "#111827",
        secondaryColor: "#f8fafc",
        accentColors: ["#22d3ee", "#a855f7"],
      },
      base
    );

    expect(next.colors.primary).toBe("#111827");
    expect(next.colors.secondary).toBe("#f8fafc");
    expect(next.colors.accent).toEqual(["#22d3ee", "#a855f7", "#111827"]);
    expect(next.colors.background).toBe("#f8fafc");
    expect(next.colors.foreground).toBe("#0f172a");
  });

  it("infers rounded/glow profile from motion evidence", () => {
    const base = structuredClone(defaultStyleDefinition);

    const next = applyExtractedDraftToCustomStyle(
      {
        primaryColor: "#14b8a6",
        styleType: "animation",
        category: "expressive",
      },
      base,
      {
        hasAnimation: true,
        hasNeonEffect: true,
      }
    );

    expect(next.borders.radius).toBe("0.75rem");
    expect(next.shadows.lg).toContain("rgba(");
    expect(next.shadows.lg).not.toBe(base.shadows.lg);
  });

  it("keeps existing values when extracted draft is sparse", () => {
    const base = structuredClone(defaultStyleDefinition);

    const next = applyExtractedDraftToCustomStyle({}, base);

    expect(next.colors.primary).toBe(base.colors.primary);
    expect(next.colors.secondary).toBe(base.colors.secondary);
    expect(next.borders.radius).toBe(base.borders.radius);
  });
});
