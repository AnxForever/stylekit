import { describe, expect, it } from "vitest";
import { mobileLibraries } from "@/lib/mobile/catalog";
import { buildMobileBrief, filterMobileLibraries } from "@/lib/mobile/helpers";
import { mobilePatterns } from "@/lib/mobile/patterns";
import { getStyleMetaBySlug } from "@/lib/styles/meta";

describe("mobile component selection", () => {
  it("keeps SwiftUI recommendations separate from web results", () => {
    const native = filterMobileLibraries(mobileLibraries, "swiftui", "");
    expect(native.some((library) => library.name === "ChunUI")).toBe(true);
    const web = filterMobileLibraries(mobileLibraries, "web", "");
    expect(web.length).toBeGreaterThan(0);
    expect(web.some((library) => library.name === "ChunUI")).toBe(false);
    expect(web.some((library) => library.platforms.includes("react"))).toBe(true);
    expect(web.some((library) => library.platforms.includes("vue"))).toBe(true);
  });

  it("combines normalized search terms with the selected platform", () => {
    expect(filterMobileLibraries(mobileLibraries, "all", "  ＣＨＵＮＵＩ  mit ").map((library) => library.name)).toEqual(["ChunUI"]);
    expect(filterMobileLibraries(mobileLibraries, "react", "ChunUI")).toEqual([]);
    expect(filterMobileLibraries(mobileLibraries, "all", "nonexistent-mobile-library")).toEqual([]);
    expect(filterMobileLibraries(mobileLibraries, "swiftui", "ios").some((library) => library.name === "ChunUI")).toBe(true);
  });

  it("supports discovery by Chinese component descriptions", () => {
    const query = mobileLibraries.find((library) => library.name === "ChunUI")!.components[0].zh;
    expect(filterMobileLibraries(mobileLibraries, "all", query).some((library) => library.name === "ChunUI")).toBe(true);
  });

  it("copies the selected scenario and only compatible library candidates", () => {
    const pattern = mobilePatterns.find((entry) => entry.id === "commerce")!;
    const brief = buildMobileBrief(pattern, "zh", "swiftui", mobileLibraries);
    expect(brief).toContain("商品购买");
    expect(brief).toContain("SwiftUI / iOS");
    expect(brief).toContain("ChunUI");
    expect(brief).toContain("https://github.com/liseami/ChunUI");
    expect(brief).not.toContain("ant-design-mobile");
    expect(brief).not.toContain("github.com/youzan/vant");
    expect(brief).toContain("不直接运行于 Next.js");
  });

  it("leaves platform selection explicit and localizes the exported brief", () => {
    const brief = buildMobileBrief(mobilePatterns[0], "en", "all", mobileLibraries);
    expect(brief).toContain("Confirm web or native before choosing a library.");
    expect(brief).toContain("Mobile design brief");
    expect(brief).toContain("https://www.stylekit.top/en/styles/mobile-editorial");
    expect(brief).not.toContain("移动端设计要求");
  });

  it("links each scenario to a real existing StyleKit style", () => {
    for (const pattern of mobilePatterns) {
      expect(getStyleMetaBySlug(pattern.styleSlug), pattern.styleSlug).toBeDefined();
    }
  });
});
