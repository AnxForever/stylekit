import { describe, expect, it } from "vitest";
import {
  getManifestSummary,
  validateStyleSubmissionManifest,
} from "@/lib/submit/manifest-validator";

const baseManifest = {
  schemaVersion: "1.0.0",
  generatedAt: "2026-02-18T12:00:00.000Z",
  source: {
    assistant: "claude",
    model: "claude-sonnet",
  },
  formData: {
    name: "Neo Brutalist CN",
    nameEn: "Neo Brutalist",
    slug: "neo-brutalist-proposal",
    description: "High contrast, bold blocks, and strong hierarchy.",
    category: "modern",
    styleType: "visual",
    tags: ["modern", "high-contrast"],
    primaryColor: "#111111",
    secondaryColor: "#ffffff",
    accentColors: ["#ff3b30"],
    background: "#ffffff",
    foreground: "#111111",
    muted: "#666666",
    keywords: ["brutalist", "high-contrast"],
    philosophy: "Function first, bold visuals second.",
    headingFont: "Inter, sans-serif",
    bodyFont: "Inter, sans-serif",
    fontSizeBase: "1rem",
    fontSizeHeading: "2rem",
    fontSizeSmall: "0.875rem",
    fontWeightNormal: "400",
    fontWeightBold: "700",
    lineHeightNormal: "1.5",
    lineHeightTight: "1.25",
    borderRadius: "0.5rem",
    spacingSm: "0.5rem",
    spacingMd: "1rem",
    spacingLg: "2rem",
    doList: ["Use bold borders"],
    dontList: ["Avoid soft shadows"],
    aiRules: ["Prefer strong contrast and sharp blocks."],
    buttonCode: "<button className='border-2'>Action</button>",
    cardCode: "<div className='border-2 p-4'>Card</div>",
    inputCode: "<input className='border-2 px-3 py-2' />",
  },
  assets: {
    coverSvg: "<svg></svg>",
  },
  selfCheck: {
    schemaValid: true,
    requiredFilesPrepared: ["manifest.json", "cover.svg", "self-check.md"],
    componentCoverage: ["buttonCode", "cardCode", "inputCode"],
    notes: "Looks consistent.",
  },
} as const;

describe("manifest validator", () => {
  it("accepts valid manifests", () => {
    const result = validateStyleSubmissionManifest(baseManifest);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.formData.slug).toBe("neo-brutalist-proposal");
  });

  it("returns issues for invalid manifests", () => {
    const result = validateStyleSubmissionManifest({
      ...baseManifest,
      formData: {
        ...baseManifest.formData,
        slug: "Bad Slug",
      },
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((issue) => issue.path === "formData.slug")).toBe(true);
  });

  it("creates a summary from valid manifest", () => {
    const result = validateStyleSubmissionManifest(baseManifest);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const summary = getManifestSummary(result.data);
    expect(summary).toEqual({
      slug: "neo-brutalist-proposal",
      name: "Neo Brutalist CN",
      nameEn: "Neo Brutalist",
      category: "modern",
      styleType: "visual",
    });
  });
});
