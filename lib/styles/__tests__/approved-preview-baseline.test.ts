import { describe, expect, it } from "vitest";
import baseline from "@/tests/visual/approved-preview-baseline.json";
import { styleComponents } from "@/lib/style-components";
import { stylesMeta } from "@/lib/styles/meta-registry";

describe("approved preview baseline", () => {
  it("keeps the frozen catalog slug inventory explicit", () => {
    expect(baseline.baselineCommit).toBe("dee759c2");
    expect(baseline.slugs).toHaveLength(baseline.count);
    expect(new Set(baseline.slugs).size).toBe(baseline.count);
  });

  it("keeps every approved slug in the catalog and curated preview registry", () => {
    const approved = [...baseline.slugs].sort();
    const catalog = stylesMeta.map((style) => style.slug).sort();
    const previews = Object.keys(styleComponents).sort();

    expect(catalog).toEqual(approved);
    expect(previews).toEqual(approved);

    for (const slug of baseline.slugs) {
      expect(styleComponents[slug]?.coverPreview).toBeTypeOf("function");
    }
  });
});
