import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import type { RequestLocaleContext } from "@/lib/i18n/request";
import {
  canonicalizeEnglishMetadata,
  localizeMetadata,
} from "@/lib/i18n/metadata";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import {
  generateBlogPostJsonLd,
  generateStyleJsonLd,
} from "@/lib/seo/json-ld";
import { getLocalizedPromptMetadata } from "@/lib/seo/prompt-metadata";
import {
  buildSiteMetadata,
  HOME_SOCIAL_IMAGE,
} from "@/lib/seo/site-metadata";
import { generateRss } from "@/lib/rss";

const BASE_URL = "https://www.stylekit.top";

function requestContext(
  locale: "en" | "zh",
  path: string
): RequestLocaleContext {
  const htmlLang = locale === "zh" ? "zh-CN" : "en";
  return {
    locale,
    localePath: path,
    contentPath: path.replace(/^\/(en|zh)(?=\/|$)/, "") || "/",
    canonicalUrl: `${BASE_URL}${path}`,
    languageAlternates: {
      en: `${BASE_URL}/en/styles`,
      "zh-CN": `${BASE_URL}/zh/styles`,
      "x-default": `${BASE_URL}/en/styles`,
    },
    htmlLang,
    openGraphLocale: locale === "zh" ? "zh_CN" : "en_US",
    baseUrl: BASE_URL,
  };
}

describe("SEO truth invariants", () => {
  it("keeps root metadata neutral so child routes own canonical URLs", () => {
    const metadata = buildSiteMetadata(requestContext("zh", "/zh/backgrounds"));

    expect(metadata.alternates?.canonical).toBeUndefined();
    expect(metadata.openGraph).not.toHaveProperty("url");
    expect(metadata.openGraph).toMatchObject({ locale: "zh_CN" });
    expect(metadata.description).toContain(`Browse ${CURATED_STYLE_COUNT} curated styles`);
  });

  it("uses a real PNG homepage capture for large social cards", () => {
    const metadata = buildSiteMetadata(requestContext("en", "/en"));
    const expectedImage = `${BASE_URL}${HOME_SOCIAL_IMAGE.path}`;

    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: expectedImage,
        width: 1200,
        height: 630,
        type: "image/png",
      }),
    ]);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      images: [
        expect.objectContaining({
          url: expectedImage,
          width: 1200,
          height: 630,
        }),
      ],
    });
  });

  it("always aligns localized Open Graph and canonical URLs", () => {
    const metadata = localizeMetadata(
      { title: "Backgrounds" },
      "zh",
      "/backgrounds"
    );

    expect(metadata.alternates?.canonical).toBe(`${BASE_URL}/zh/backgrounds`);
    expect(metadata.openGraph).toMatchObject({
      url: `${BASE_URL}/zh/backgrounds`,
      locale: "zh_CN",
      alternateLocale: ["en_US"],
    });
  });

  it("does not advertise English-only documents as Chinese alternates", () => {
    const metadata = canonicalizeEnglishMetadata(
      { title: "Blog" },
      "/blog"
    );

    expect(metadata.alternates).toEqual({ canonical: `${BASE_URL}/en/blog` });
    expect(metadata.openGraph).toMatchObject({
      url: `${BASE_URL}/en/blog`,
      locale: "en_US",
      alternateLocale: [],
    });
  });

  it("publishes Chinese metadata for the core UI prompt hub", () => {
    const metadata = getLocalizedPromptMetadata(
      { title: "UI Design Prompts Library", description: "English" },
      "zh",
      "/ui-prompts"
    );

    expect(metadata.title).toBe("UI 设计提示词库");
    expect(metadata.description).toContain("ChatGPT");
    expect(metadata.description).toContain("Claude Code");
    expect(metadata.alternates?.canonical).toBe(`${BASE_URL}/zh/ui-prompts`);
  });

  it("keeps style and article JSON-LD on their canonical localized URLs", () => {
    const styleUrl = `${BASE_URL}/zh/styles/neo-brutalist`;
    const styleSchema = generateStyleJsonLd({
      name: "新野兽派",
      description: "粗边框与硬阴影的网页设计风格。",
      keywords: ["前端风格"],
      category: "expressive",
      url: styleUrl,
      language: "zh-CN",
    });
    expect(styleSchema).toMatchObject({
      url: styleUrl,
      mainEntityOfPage: styleUrl,
      inLanguage: "zh-CN",
    });

    const articleUrl = `${BASE_URL}/en/blog/example`;
    const articleSchema = generateBlogPostJsonLd(
      {
        slug: "example",
        title: "Example",
        description: "Example description",
        date: "2026-07-10",
        modified: "2026-07-11",
        author: "StyleKit Team",
        tags: ["example"],
        content: "",
      },
      { url: articleUrl, language: "en" }
    );
    expect(articleSchema).toMatchObject({
      url: articleUrl,
      mainEntityOfPage: articleUrl,
      inLanguage: "en",
      dateModified: "2026-07-11",
    });
  });

  it("keeps the sitemap canonical, indexable, and free of placeholders", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith(`${BASE_URL}/en`) || url.startsWith(`${BASE_URL}/zh`))).toBe(true);
    expect(urls.some((url) => url.includes("["))).toBe(false);
    expect(urls.some((url) => url.includes("/showcase"))).toBe(false);
    expect(urls.some((url) => /\/zh\/(blog|guides)(?:\/|$)/.test(url))).toBe(false);
    expect(urls.some((url) => /\/(color-theory|design-principles|spacing|type-scale|visual-hierarchy)(?:$|\/)/.test(url))).toBe(false);
    expect(urls).toContain(`${BASE_URL}/en/recipes/saas-modern-glass`);
    expect(urls).toContain(`${BASE_URL}/en/liquid-glass`);
    expect(urls).toContain(`${BASE_URL}/zh/liquid-glass`);
  });

  it("allows search crawlers and the read-only style Markdown route", () => {
    const policy = JSON.stringify(robots());
    expect(policy).toContain("OAI-SearchBot");
    expect(policy).toContain("Claude-SearchBot");
    expect(policy).toContain("PerplexityBot");
    expect(policy).toContain("/api/styles/*/md$");
    expect(policy).not.toContain('"/api/styles/"');
  });

  it("generates deterministic RSS self links and build dates", () => {
    const xml = generateRss({
      title: "Styles",
      description: "Style updates",
      link: `${BASE_URL}/en/styles`,
      selfUrl: `${BASE_URL}/feed/styles.xml`,
      language: "en-us",
      items: [
        {
          title: "Neo-Brutalist",
          description: "Style description",
          link: `${BASE_URL}/en/styles/neo-brutalist`,
          pubDate: "2026-07-10",
          guid: `${BASE_URL}/en/styles/neo-brutalist`,
          author: "StyleKit",
        },
      ],
    });

    expect(xml).toContain(`atom:link href="${BASE_URL}/feed/styles.xml"`);
    expect(xml).toContain("<lastBuildDate>Fri, 10 Jul 2026 00:00:00 GMT</lastBuildDate>");
    expect(xml).toContain("<dc:creator>StyleKit</dc:creator>");
  });
});
