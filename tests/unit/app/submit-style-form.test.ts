import { describe, expect, it } from "vitest";

import {
  EMPTY_STYLE_FORM,
  formToPromptInput,
  manifestToForm,
  toManifest,
} from "@/app/submit/_style-form";
import { validateStyleSubmissionManifest } from "@/lib/submit/manifest-validator";
import { deriveDesignStyle } from "@/lib/submission/adapters/style";

const BASE = {
  ...EMPTY_STYLE_FORM,
  nameEn: "Neon Washi",
  slug: "neon-washi",
  description: "A washi-paper base lit by restrained neon accents.",
  rules: "Rule one\nRule two\nRule three",
};

describe("submit form -> manifest", () => {
  it("carries the optional do/dont/keywords lists when they are filled", () => {
    const manifest = toManifest({
      ...BASE,
      doList: "Lead with a serif headline\nKeep generous whitespace",
      dontList: "No drop shadows",
      // Mixed separators and scripts: commas, a full-width comma, and CJK.
      keywords: "editorial, serif，高对比",
    }) as { formData: Record<string, unknown> };

    expect(manifest.formData.aiRules).toEqual(["Rule one", "Rule two", "Rule three"]);
    expect(manifest.formData.doList).toEqual([
      "Lead with a serif headline",
      "Keep generous whitespace",
    ]);
    expect(manifest.formData.dontList).toEqual(["No drop shadows"]);
    expect(manifest.formData.keywords).toEqual(["editorial", "serif", "高对比"]);
  });

  it("omits empty optional lists so the schema default applies", () => {
    const manifest = toManifest(BASE) as { formData: Record<string, unknown> };

    expect("doList" in manifest.formData).toBe(false);
    expect("dontList" in manifest.formData).toBe(false);
    expect("keywords" in manifest.formData).toBe(false);
  });

  it("produces a manifest the shared validator accepts", () => {
    const parsed = validateStyleSubmissionManifest(
      toManifest({ ...BASE, keywords: "a, b" }),
    );

    expect(parsed.ok).toBe(true);
  });
});

describe("submit form -> preview prompt input", () => {
  it("feeds the optional lists into the preview so it is not all (none)", () => {
    const input = formToPromptInput(
      {
        ...BASE,
        rules: "Rule one",
        doList: "Prefer this",
        dontList: "Avoid that",
        keywords: "alpha, beta",
      },
      "en",
    );

    expect(input.doList).toEqual(["Prefer this"]);
    expect(input.dontList).toEqual(["Avoid that"]);
    expect(input.keywords).toEqual(["alpha", "beta"]);
    // English locale reads the English name; the community path leaves the
    // token spec and localized rules empty.
    expect(input.styleName).toBe("Neon Washi");
    expect(input.enhancedRules).toBeNull();
    expect(input.aiRulesEn).toBeUndefined();
  });

  it("uses the Chinese name for the zh preview", () => {
    const input = formToPromptInput(
      { ...BASE, name: "霓虹和纸", rules: "Rule one" },
      "zh",
    );

    expect(input.styleName).toBe("霓虹和纸");
  });
});


describe("extracted manifest -> editable form -> submission", () => {
  it("preserves measured components, typography, accents and the source", () => {
    const source = { assistant: "other" as const, model: "style-extractor", notes: "Extracted from https://example.com" };
    const formData = {
      nameEn: "Field Notes", slug: "field-notes", description: "Warm paper and orange actions.",
      primaryColor: "#de5b35", secondaryColor: "#ffffff", background: "#f3efe4", foreground: "#172c23",
      aiRules: ["Use orange actions.", "Use Georgia, serif.", "Keep the measured component shapes."],
      accentColors: ["#436345"], bodyFont: "Georgia, serif", headingFont: "Georgia, serif",
      fontSizeBase: "16px", fontSizeHeading: "64px", borderRadius: "32px",
      buttonCode: '<button style="border-radius: 32px">Start</button>',
      cardCode: '<article style="padding: 32px">A card</article>',
      inputCode: '<input style="border-radius: 32px" aria-label="Email" />',
    };
    const assets = { coverSvg: '<svg viewBox="0 0 10 10"></svg>' };
    const form = manifestToForm(formData, { source, assets });
    const parsed = validateStyleSubmissionManifest(toManifest({ ...form, nameEn: "Edited name" }));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    for (const key of ["buttonCode", "cardCode", "inputCode", "bodyFont", "headingFont", "fontSizeBase", "fontSizeHeading", "borderRadius", "accentColors"] as const) {
      expect(parsed.data.formData[key]).toEqual(formData[key]);
    }
    expect(parsed.data.formData.nameEn).toBe("Edited name");
    expect(parsed.data.assets).toEqual(assets);
    expect(parsed.data.source).toEqual(source);
  });
});


it("keeps fonts and motion through editing, validation and the published style adapter", () => {
  const previewAssets = {
    fonts: [{ family: "Captured Face", sourceUrl: "https://example.com/font.woff2", weight: "100 900" }],
    motion: { button: { transition: { property: "transform", duration: "0.3s", timingFunction: "ease", delay: "0s" }, states: { hover: { transform: "translateY(-4px)" } } } },
  };
  const form = manifestToForm({ ...BASE, aiRules: BASE.rules.split("\n"), previewAssets });
  const parsed = validateStyleSubmissionManifest(toManifest({ ...form, nameEn: "Edited name" }));
  expect(parsed.ok).toBe(true);
  if (!parsed.ok) return;
  expect(parsed.data.formData.previewAssets).toEqual(previewAssets);
  expect(deriveDesignStyle(parsed.data.formData, "").previewAssets).toEqual(previewAssets);
});
