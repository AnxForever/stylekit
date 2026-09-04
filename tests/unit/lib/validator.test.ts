import { describe, expect, it } from "vitest";
import { wizardFormSchema } from "@/lib/submit/validator";
import { STYLE_TAGS } from "@/lib/styles/meta-types";

/** A fully valid form data fixture. */
function validFormData() {
  return {
    name: "Test Style",
    nameEn: "Test Style En",
    slug: "test-style",
    description: "A test style",
    category: "modern" as const,
    styleType: "visual" as const,
    tags: ["retro", "high-contrast"] as const,
    primaryColor: "#ff0000",
    secondaryColor: "#00ff00",
    accentColors: ["#0000ff"],
    background: "#ffffff",
    foreground: "#000000",
    muted: "#cccccc",
    keywords: ["clean"],
    philosophy: "Less is more",
    headingFont: "Inter",
    bodyFont: "Inter",
    fontSizeBase: "16px",
    fontSizeHeading: "32px",
    fontSizeSmall: "12px",
    fontWeightNormal: "400",
    fontWeightBold: "700",
    lineHeightNormal: "1.5",
    lineHeightTight: "1.2",
    borderRadius: "8px",
    spacingSm: "4px",
    spacingMd: "8px",
    spacingLg: "16px",
    doList: ["Use consistent spacing"],
    dontList: ["Avoid clutter"],
    aiRules: ["Keep it simple"],
    buttonCode: "<button>Click</button>",
    cardCode: "<div class='card'>Card</div>",
    inputCode: "<input />",
  };
}

describe("wizardFormSchema", () => {
  // ── Full valid submission ─────────────────────────────────────────
  it("accepts a complete valid submission", () => {
    const result = wizardFormSchema.safeParse(validFormData());
    expect(result.success).toBe(true);
  });

  // ── Name validation (top-level refine) ────────────────────────────
  describe("name validation", () => {
    it("fails when both name and nameEn are empty", () => {
      const data = { ...validFormData(), name: "", nameEn: "" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("fails when both name and nameEn are whitespace-only", () => {
      const data = { ...validFormData(), name: "   ", nameEn: "  " };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("passes when only name is provided", () => {
      const data = { ...validFormData(), name: "Style", nameEn: "" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("passes when only nameEn is provided", () => {
      const data = { ...validFormData(), name: "", nameEn: "Style" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("passes when both name and nameEn are provided", () => {
      const data = { ...validFormData(), name: "Style", nameEn: "Style EN" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  // ── Slug validation ───────────────────────────────────────────────
  describe("slug validation", () => {
    it("fails when empty", () => {
      const data = { ...validFormData(), slug: "" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("fails with uppercase letters", () => {
      const data = { ...validFormData(), slug: "My-Style" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("fails with special characters", () => {
      const data = { ...validFormData(), slug: "my_style!" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("fails with consecutive hyphens", () => {
      const data = { ...validFormData(), slug: "my--style" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("fails with leading hyphen", () => {
      const data = { ...validFormData(), slug: "-my-style" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("fails with trailing hyphen", () => {
      const data = { ...validFormData(), slug: "my-style-" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("passes with lowercase letters and hyphens", () => {
      const data = { ...validFormData(), slug: "my-style" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("passes with letters and numbers", () => {
      const data = { ...validFormData(), slug: "style2" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("passes with single word", () => {
      const data = { ...validFormData(), slug: "modern" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  // ── Color validation ──────────────────────────────────────────────
  describe("color validation", () => {
    const colorFields = [
      "primaryColor",
      "secondaryColor",
      "background",
      "foreground",
      "muted",
    ] as const;

    for (const field of colorFields) {
      describe(field, () => {
        it("passes with 3-digit hex", () => {
          const data = { ...validFormData(), [field]: "#000" };
          const result = wizardFormSchema.safeParse(data);
          expect(result.success).toBe(true);
        });

        it("passes with 6-digit hex", () => {
          const data = { ...validFormData(), [field]: "#ff0000" };
          const result = wizardFormSchema.safeParse(data);
          expect(result.success).toBe(true);
        });

        it("passes with uppercase hex", () => {
          const data = { ...validFormData(), [field]: "#AABBCC" };
          const result = wizardFormSchema.safeParse(data);
          expect(result.success).toBe(true);
        });

        it("fails with named color", () => {
          const data = { ...validFormData(), [field]: "red" };
          const result = wizardFormSchema.safeParse(data);
          expect(result.success).toBe(false);
        });

        it("fails with invalid hex chars", () => {
          const data = { ...validFormData(), [field]: "#gggggg" };
          const result = wizardFormSchema.safeParse(data);
          expect(result.success).toBe(false);
        });

        it("fails with empty string", () => {
          const data = { ...validFormData(), [field]: "" };
          const result = wizardFormSchema.safeParse(data);
          expect(result.success).toBe(false);
        });

        it("fails without hash prefix", () => {
          const data = { ...validFormData(), [field]: "ff0000" };
          const result = wizardFormSchema.safeParse(data);
          expect(result.success).toBe(false);
        });
      });
    }

    describe("accentColors", () => {
      it("accepts an empty array now that accents are optional", () => {
        // Prompt-first submissions describe a style through its core palette
        // and rules; accents are derived from the primary color when absent.
        const data = { ...validFormData(), accentColors: [] };
        const result = wizardFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });

      it("passes with one valid hex", () => {
        const data = { ...validFormData(), accentColors: ["#abc"] };
        const result = wizardFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });

      it("passes with multiple valid hexes", () => {
        const data = {
          ...validFormData(),
          accentColors: ["#ff0000", "#00ff00", "#0000ff"],
        };
        const result = wizardFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      });

      it("fails when any entry is invalid", () => {
        const data = {
          ...validFormData(),
          accentColors: ["#ff0000", "invalid"],
        };
        const result = wizardFormSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  // ── doList validation (nonEmptyStringList) ────────────────────────
  describe("doList validation", () => {
    it("accepts empty entries now that doList is optional", () => {
      const data = { ...validFormData(), doList: [""] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("accepts whitespace-only entries now that doList is optional", () => {
      const data = { ...validFormData(), doList: ["  ", "\t"] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("passes with one non-empty entry", () => {
      const data = { ...validFormData(), doList: ["rule1"] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("passes when at least one entry is non-empty among empties", () => {
      const data = { ...validFormData(), doList: ["", "rule2"] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  // ── dontList relaxed ──────────────────────────────────────────────
  describe("dontList relaxed", () => {
    it("passes with empty array", () => {
      const data = { ...validFormData(), dontList: [] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("passes with all-empty entries", () => {
      const data = { ...validFormData(), dontList: [""] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  // ── aiRules relaxed ───────────────────────────────────────────────
  describe("aiRules relaxed", () => {
    it("passes with empty array", () => {
      const data = { ...validFormData(), aiRules: [] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("passes with all-empty entries", () => {
      const data = { ...validFormData(), aiRules: [""] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  // ── description relaxed ───────────────────────────────────────────
  describe("description relaxed", () => {
    it("passes with empty string", () => {
      const data = { ...validFormData(), description: "" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  // ── category enum ─────────────────────────────────────────────────
  describe("category validation", () => {
    it.each(["modern", "retro", "minimal", "expressive"])(
      "passes with valid value: %s",
      (value) => {
        const data = { ...validFormData(), category: value };
        const result = wizardFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      }
    );

    it("fails with invalid value", () => {
      const data = { ...validFormData(), category: "futuristic" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  // ── styleType enum ────────────────────────────────────────────────
  describe("styleType validation", () => {
    it.each(["visual", "layout"])(
      "passes with valid value: %s",
      (value) => {
        const data = { ...validFormData(), styleType: value };
        const result = wizardFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      }
    );

    it("fails with invalid value", () => {
      const data = { ...validFormData(), styleType: "theme" };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  // ── tags validation ───────────────────────────────────────────────
  describe("tags validation", () => {
    it("passes with valid tag values", () => {
      const data = {
        ...validFormData(),
        tags: ["glassmorphic", "high-contrast", "responsive"],
      };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it.each(["modern", "minimal", "expressive"])(
      "rejects %s, retired from the tag vocabulary when it duplicated a category",
      (retired) => {
        const data = { ...validFormData(), tags: [retired] };
        expect(wizardFormSchema.safeParse(data).success).toBe(false);
      },
    );

    it("accepts every tag in the shared vocabulary", () => {
      const data = { ...validFormData(), tags: [...STYLE_TAGS] };
      expect(wizardFormSchema.safeParse(data).success).toBe(true);
    });

    it("passes with empty array", () => {
      const data = { ...validFormData(), tags: [] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("fails with invalid tag value", () => {
      const data = { ...validFormData(), tags: ["invalid-tag"] };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  // ── Component codes (relaxed strings) ─────────────────────────────
  describe("component codes relaxed", () => {
    it.each(["buttonCode", "cardCode", "inputCode"])(
      "%s allows empty string",
      (field) => {
        const data = { ...validFormData(), [field]: "" };
        const result = wizardFormSchema.safeParse(data);
        expect(result.success).toBe(true);
      }
    );
  });

  // ── Minimal valid submission ──────────────────────────────────────
  describe("minimal valid submission", () => {
    it("passes with empty optional strings and minimal required fields", () => {
      const data = {
        name: "Minimal",
        nameEn: "",
        slug: "minimal",
        description: "",
        category: "minimal",
        styleType: "visual",
        tags: [],
        primaryColor: "#000",
        secondaryColor: "#000",
        accentColors: ["#000"],
        background: "#fff",
        foreground: "#000",
        muted: "#aaa",
        keywords: [],
        philosophy: "",
        headingFont: "",
        bodyFont: "",
        fontSizeBase: "",
        fontSizeHeading: "",
        fontSizeSmall: "",
        fontWeightNormal: "",
        fontWeightBold: "",
        lineHeightNormal: "",
        lineHeightTight: "",
        borderRadius: "",
        spacingSm: "",
        spacingMd: "",
        spacingLg: "",
        doList: ["At least one rule"],
        dontList: [],
        aiRules: [],
        buttonCode: "",
        cardCode: "",
        inputCode: "",
      };
      const result = wizardFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
