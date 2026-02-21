import { describe, expect, it } from "vitest";
import type { GeneratedStyle } from "@/lib/ai-generator";
import {
  buildSubmissionFormFromGeneratedStyle,
  makeUniqueGeneratedSlug,
} from "@/lib/ai-generator/submission";
import { wizardFormSchema } from "@/lib/submit/validator";

const generatedStyle: GeneratedStyle = {
  name: "Futuristic Fusion",
  description: "Generated from blended sources with futuristic balance.",
  confidence: 82,
  sourceStyles: [
    { slug: "apple-style", weight: 0.6 },
    { slug: "neo-brutalist", weight: 0.4 },
  ],
  reasoning: [
    "Use clean spacing with assertive contrast.",
    "Balance sharp borders with soft background layers.",
  ],
  insights: {
    baseStyle: "apple-style",
    detectedStyles: ["apple-style", "neo-brutalist"],
    avoidedStyles: ["vaporwave"],
    matchedKeywords: ["futuristic", "clean"],
    negativeKeywords: ["vaporwave"],
  },
  tokens: {
    colors: {
      background: {
        primary: "bg-[#0f172a]",
        secondary: "bg-[#111827]",
        accent: ["bg-[#22d3ee]"],
      },
      text: {
        primary: "text-[#f8fafc]",
        secondary: "text-[#cbd5e1]",
        muted: "text-[#64748b]",
      },
      button: {
        primary: "bg-[#22d3ee] text-[#0f172a]",
        secondary: "bg-[#0f172a] text-[#f8fafc]",
      },
    },
    typography: {
      heading: "font-bold",
      body: "font-normal",
      sizes: {
        hero: "text-5xl",
        h1: "text-4xl",
        h2: "text-3xl",
        h3: "text-2xl",
        body: "text-base",
        small: "text-sm",
      },
    },
    spacing: {
      section: "py-16",
      container: "px-6",
      card: "p-6",
      gap: {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-8",
      },
    },
    border: {
      width: "border",
      color: "border-[#334155]",
      radius: "rounded-xl",
      style: "border-solid",
    },
    shadow: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      none: "shadow-none",
      hover: "hover:shadow-lg",
      focus: "focus:shadow-md",
    },
    interaction: {
      transition: "transition-all duration-300",
      hoverScale: "hover:scale-[1.01]",
      active: "active:scale-[0.99]",
    },
    forbidden: {
      classes: [],
      patterns: [],
      reasons: {},
    },
    required: {
      button: ["inline-flex"],
      card: ["p-6"],
      input: ["border"],
    },
  },
};

describe("ai-generator submission adapter", () => {
  it("builds a schema-valid submission form payload", () => {
    const payload = buildSubmissionFormFromGeneratedStyle(generatedStyle, {
      existingSlugs: ["futuristic-fusion", "futuristic-fusion-ai"],
    });

    expect(payload.slug).toBe("futuristic-fusion-ai-2");
    expect(payload.primaryColor).toMatch(/^#/);
    expect(payload.accentColors.length).toBeGreaterThan(0);
    expect(payload.doList.length).toBeGreaterThan(0);

    const parsed = wizardFormSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
  });

  it("creates deterministic unique slugs for generated names", () => {
    const slug = makeUniqueGeneratedSlug("Futuristic Fusion", [
      "futuristic-fusion",
      "futuristic-fusion-ai",
      "futuristic-fusion-ai-2",
    ]);
    expect(slug).toBe("futuristic-fusion-ai-3");
  });
});
