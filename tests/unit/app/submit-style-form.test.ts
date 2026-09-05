import { describe, expect, it } from "vitest";

import {
  EMPTY_STYLE_FORM,
  formToPromptInput,
  toManifest,
} from "@/app/submit/_style-form";
import { validateStyleSubmissionManifest } from "@/lib/submit/manifest-validator";

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
