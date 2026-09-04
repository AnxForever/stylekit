import { describe, expect, it } from "vitest";
import baseline from "@/tests/visual/approved-preview-baseline.json";
import { styleComponents } from "@/lib/style-components";
import { stylesMeta } from "@/lib/styles/meta-registry";
import { isPendingStyleSlug } from "@/lib/styles/review-status";

describe("approved preview baseline", () => {
  it("keeps the frozen catalog slug inventory explicit", () => {
    expect(baseline.baselineCommit).toBe("949ea885");
    expect(baseline.slugs).toHaveLength(baseline.count);
    expect(new Set(baseline.slugs).size).toBe(baseline.count);
  });

  it("keeps every approved slug in the catalog and curated preview registry", () => {
    const approved = [...baseline.slugs].sort();
    const catalog = stylesMeta
      .filter((style) => !isPendingStyleSlug(style.slug))
      .map((style) => style.slug)
      .sort();
    const previews = Object.keys(styleComponents)
      .filter((slug) => !isPendingStyleSlug(slug))
      .sort();

    expect(catalog).toEqual(approved);
    expect(previews).toEqual(approved);

    for (const slug of baseline.slugs) {
      expect(styleComponents[slug]?.coverPreview).toBeTypeOf("function");
    }
  });

  it("keeps pending styles outside the approved visual contract", () => {
    const approved = new Set(baseline.slugs);
    const pending = stylesMeta
      .map((style) => style.slug)
      .filter((slug) => !approved.has(slug));

    expect(pending.sort()).toEqual(["mobile-editorial", "pastel-ui", "soft-utility"]);
    for (const slug of pending) {
      expect(isPendingStyleSlug(slug)).toBe(true);
      expect(styleComponents[slug]?.coverPreview).toBeTypeOf("function");
    }
  });
});
