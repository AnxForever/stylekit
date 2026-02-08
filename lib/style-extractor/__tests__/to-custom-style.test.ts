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

  it("applies typography, border width, and explicit shadows when provided", () => {
    const base = structuredClone(defaultStyleDefinition);

    const next = applyExtractedDraftToCustomStyle(
      {
        headingFont: "\"Playfair Display\", serif",
        bodyFont: "\"Inter\", system-ui, sans-serif",
        borderRadius: "12px",
        borderWidth: "2px",
        shadowSm: "0 1px 2px rgba(0,0,0,0.10)",
        shadowMd: "0 8px 20px rgba(0,0,0,0.12)",
        shadowLg: "0 18px 40px rgba(0,0,0,0.16)",
      },
      base
    );

    expect(next.typography.headingFont).toBe("\"Playfair Display\", serif");
    expect(next.typography.bodyFont).toBe("\"Inter\", system-ui, sans-serif");
    expect(next.borders.radius).toBe("12px");
    expect(next.borders.width).toBe("2px");
    expect(next.shadows.sm).toBe("0 1px 2px rgba(0,0,0,0.10)");
    expect(next.shadows.md).toBe("0 8px 20px rgba(0,0,0,0.12)");
    expect(next.shadows.lg).toBe("0 18px 40px rgba(0,0,0,0.16)");
  });

  it("keeps existing values when extracted draft is sparse", () => {
    const base = structuredClone(defaultStyleDefinition);

    const next = applyExtractedDraftToCustomStyle({}, base);

    expect(next.colors.primary).toBe(base.colors.primary);
    expect(next.colors.secondary).toBe(base.colors.secondary);
    expect(next.borders.radius).toBe(base.borders.radius);
  });
});
