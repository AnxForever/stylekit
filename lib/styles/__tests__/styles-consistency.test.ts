import { describe, it, expect } from "vitest";
import { styles } from "@/lib/styles";
import { stylesMeta } from "@/lib/styles/meta";

describe("styles registry consistency", () => {
  it("styles and stylesMeta contain the same slugs (prevents drift)", () => {
    const metaSlugs = stylesMeta.map((s) => s.slug);
    const styleSlugs = styles.map((s) => s.slug);

    expect(new Set(metaSlugs).size).toBe(metaSlugs.length);
    expect(new Set(styleSlugs).size).toBe(styleSlugs.length);

    const metaSet = new Set(metaSlugs);
    const styleSet = new Set(styleSlugs);

    const onlyMeta = metaSlugs.filter((slug) => !styleSet.has(slug));
    const onlyStyles = styleSlugs.filter((slug) => !metaSet.has(slug));

    expect(onlyMeta).toEqual([]);
    expect(onlyStyles).toEqual([]);
  });
});

