import { describe, expect, it } from "vitest";
import { styleSubmissionManifestSchema } from "@/lib/submit/manifest-validator";
import {
  buildSubmissionBundleFiles,
  createSubmissionBundleFilename,
} from "@/lib/submit/submission-bundle";

const manifest = styleSubmissionManifestSchema.parse({
  schemaVersion: "1.0.0",
  generatedAt: "2026-02-18T12:00:00.000Z",
  source: {
    assistant: "claude",
    model: "claude-3-7-sonnet",
  },
  formData: {
    name: "新粗野主义",
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
    coverSvg: "<svg><rect width='100' height='100' /></svg>",
  },
  selfCheck: {
    schemaValid: true,
    requiredFilesPrepared: ["manifest.json", "cover.svg", "self-check.md"],
    componentCoverage: ["buttonCode", "cardCode", "inputCode"],
    notes: "Looks consistent.",
  },
});

describe("submission bundle", () => {
  it("builds bundle files with core artifacts and scaffold files", () => {
    const files = buildSubmissionBundleFiles(manifest);
    const names = files.map((file) => file.name);

    expect(names).toEqual(
      expect.arrayContaining([
        "manifest.json",
        "cover.svg",
        "self-check.md",
        "submission/form-data.json",
        "submission/design-style.json",
        "submission/style-tokens.json",
        "submission/README.md",
        "lib/styles/neo-brutalist-proposal.ts",
        "lib/styles/neo-brutalist-proposal-tokens.ts",
        "public/styles/neo-brutalist-proposal.svg",
        "scaffold/REGISTER.md",
      ])
    );

    const readme = files.find((file) => file.name === "submission/README.md");
    expect(readme?.content).toContain("neo-brutalist-proposal");
    expect(readme?.content).toContain("claude:claude-3-7-sonnet");
  });

  it("creates safe bundle filenames from slug", () => {
    expect(createSubmissionBundleFilename("neo-brutalist-proposal")).toBe(
      "neo-brutalist-proposal-submission-bundle.zip"
    );
    expect(createSubmissionBundleFilename("Neo Brutalist !!!")).toBe(
      "neo-brutalist-submission-bundle.zip"
    );
    expect(createSubmissionBundleFilename("")).toBe(
      "style-submission-submission-bundle.zip"
    );
  });
});
