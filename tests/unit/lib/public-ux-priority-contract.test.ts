import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "../../..");

async function read(relativePath: string) {
  return readFile(path.join(ROOT, relativePath), "utf8");
}

describe("public UX priority contract", () => {
  it("localizes mobile navigation and makes the fourth action an explicit search", async () => {
    const source = await read("components/layout/mobile-bottom-nav.tsx");

    expect(source).toContain('locale === "zh" ? "首页" : "Home"');
    expect(source).toContain('locale === "zh" ? "风格" : "Styles"');
    expect(source).toContain('locale === "zh" ? "模板" : "Templates"');
    expect(source).toContain('locale === "zh" ? "搜索" : "Search"');
    expect(source).not.toContain("<span>More</span>");
  });

  it("anchors the support entry below the featured carousel, after discovery", async () => {
    const source = await read("components/home/home-content.tsx");

    // Owner decision 2026-07-26: the support button lives directly under the
    // featured carousel (desktop popover + mobile drawer) and must not be lost
    // in future homepage redesigns; discovery still leads, support follows.
    expect(source).toContain("<HomeSupportCard");
    expect(source.indexOf("<FeaturedCarousel")).toBeGreaterThan(-1);
    expect(source.indexOf("<HomeSupportCard")).toBeGreaterThan(
      source.indexOf("<FeaturedCarousel")
    );
    expect(source).toContain('className="mt-5 sm:mt-6 hidden md:block"');
  });

  it("makes hard-prompt copy the primary style-detail action", async () => {
    const source = await read("app/styles/[slug]/_content.tsx");
    const button = await read("components/style-preview/hard-prompt-copy-button.tsx");

    expect(source).toContain("<HardPromptCopyButton");
    expect(button).toContain('locale === "zh" ? "复制硬性提示词" : "Copy Hard Prompt"');
    expect(button).toContain('aria-live="polite"');
  });

  it("renders the catalog progressively and announces result changes", async () => {
    const source = await read("components/styles/styles-content.tsx");

    expect(source).toContain("const INITIAL_VISIBLE_STYLE_COUNT = 24");
    expect(source).toContain("filteredStyles.slice(0, visibleStyleCount)");
    expect(source).toContain('locale === "zh" ? "加载更多风格" : "Load more styles"');
    expect(source).toContain('aria-live="polite"');
  });

  it("serves modern images and defers below-the-fold homepage rendering", async () => {
    const config = await read("next.config.ts");
    const home = await read("components/home/home-content.tsx");

    expect(config).toContain('formats: ["image/avif", "image/webp"]');
    expect(home).toContain("[content-visibility:auto]");
    expect(home).toContain("[contain-intrinsic-size:auto_720px]");
    expect(home).toContain('id="home-hero" className="home-hero-surface relative overflow-hidden border-b');
    expect(home).not.toContain(
      'id="home-hero" className="[content-visibility:auto]'
    );
  });
});
