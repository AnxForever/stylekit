import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import {
  getAlternateLocalePath,
  getIndexableLocalesForPath,
  getLocaleRouteStrategy,
  stripLocaleFromPathname,
} from "@/lib/i18n/routing";
import {
  generateBreadcrumbJsonLd,
  generateCommunityCollectionJsonLd,
  generateCommunityStyleJsonLd,
  generateContributorProfileJsonLd,
} from "@/lib/seo/json-ld";
import { generateFaqJsonLd } from "@/lib/seo/style-faq";
import { serializeJsonLd } from "@/lib/security/json-ld";

const { baseUrl, promotedStyles, forbiddenFetch } = vi.hoisted(() => ({
  baseUrl: "https://www.stylekit.top",
  // Only the fields consumed by the sitemap are needed at this boundary.
  promotedStyles: vi.fn<() => Promise<Array<{ slug: string; publishedAt?: string }>>>(),
  forbiddenFetch: vi.fn(() => {
    throw new Error("Community SEO unit tests must not access the network");
  }),
}));

// Replace entire data modules, not just their methods: no Supabase client,
// submission store, blog filesystem scan, or large registry is initialized.
vi.mock("@/lib/site-url", () => ({ getSiteBaseUrl: () => baseUrl }));
vi.mock("@/lib/styles/community-runtime", () => ({
  listPromotedCommunityStyles: promotedStyles,
}));
vi.mock("@/lib/styles/meta", () => ({ getAllStylesMeta: () => [] }));
vi.mock("@/lib/animations/meta", () => ({ getAllAnimationsMeta: () => [] }));
vi.mock("@/lib/prompts", () => ({ getAllTopicSlugs: () => [] }));
vi.mock("@/lib/blog", () => ({ getAllPosts: () => [] }));
vi.mock("@/lib/seo/style-guides", () => ({ styleGuides: {} }));
vi.mock("@/lib/styles/collections", () => ({ getAllCollections: () => [] }));
vi.mock("@/lib/styles/recipes", () => ({ getAllRecipes: () => [] }));
vi.mock("@/lib/templates/catalog", () => ({ templateCatalog: [] }));
vi.mock("@/lib/styles/color-detail", () => ({
  getAllDetailSwatches: () => [],
  hexToSlug: (hex: string) => hex.replace(/^#/, ""),
}));

beforeEach(() => {
  promotedStyles.mockReset().mockResolvedValue([]);
  forbiddenFetch.mockClear();
  vi.stubGlobal("fetch", forbiddenFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
  expect(forbiddenFetch).not.toHaveBeenCalled();
});

const communityPaths = ["/community", "/community/aurora-grid", "/community/u/42"];
const localeCases = [
  { locale: "en", language: "en", name: "Aurora Grid" },
  { locale: "zh", language: "zh-CN", name: "极光网格" },
] as const;

function languageAlternates(pathname: string) {
  return {
    en: `${baseUrl}/en${pathname}`,
    "zh-CN": `${baseUrl}/zh${pathname}`,
    "x-default": `${baseUrl}/en${pathname}`,
  };
}

function styleInput() {
  return {
    name: "Aurora Grid",
    description: "A community-contributed interface style.",
    keywords: ["grid", "community"],
    category: "modern",
    url: `${baseUrl}/en/community/aurora-grid`,
    language: "en" as const,
  };
}

function profileInput() {
  return {
    name: "Example Contributor",
    description: "An independent community contributor.",
    url: `${baseUrl}/en/community/u/42`,
    language: "en" as const,
    publishedStyles: [{ name: "Aurora Grid", url: styleInput().url }],
  };
}

describe("community locale routing", () => {
  it.each(communityPaths)("rewrites the shared root implementation for %s", (pathname) => {
    // These routes live in app/community, not app/[locale]/community.
    expect(getLocaleRouteStrategy(pathname)).toBe("rewrite");
    expect(getLocaleRouteStrategy(`${pathname}/`)).toBe("rewrite");
  });

  it.each(["/community", "/community/aurora-grid"])(
    "registers both sitemap locales for %s",
    (pathname) => {
      // Eligibility is a route capability; promotion is filtered by the data source.
      expect(getIndexableLocalesForPath(pathname)).toEqual(["en", "zh"]);
      expect(getIndexableLocalesForPath(`${pathname}/`)).toEqual(["en", "zh"]);
    }
  );

  it.each(localeCases)("keeps community canonical paths stable in $locale", ({ locale }) => {
    for (const pathname of communityPaths) {
      const localized = getAlternateLocalePath(`${pathname}/`, locale);
      expect(localized).toBe(`/${locale}${pathname}`);
      expect(stripLocaleFromPathname(localized)).toBe(pathname);
      expect(getAlternateLocalePath(`/en${pathname}`, locale)).toBe(localized);
      expect(getAlternateLocalePath(`/zh${pathname}`, locale)).toBe(localized);
    }
  });

  it("does not match similar prefixes or index account utilities and APIs", () => {
    for (const pathname of ["/community-other", "/communities", "/communityish/u/42"]) {
      expect(getLocaleRouteStrategy(pathname)).toBe("unmatched");
      expect(getIndexableLocalesForPath(pathname)).toEqual([]);
    }
    for (const pathname of ["/login", "/profile", "/submit", "/api/community/styles"]) {
      expect(getIndexableLocalesForPath(pathname)).toEqual([]);
    }
    expect(getLocaleRouteStrategy("/api/community/styles")).toBe("bypass");
  });
});

describe("community sitemap with isolated data sources", () => {
  it("includes both hub URLs with reciprocal alternates even when the catalog is empty", async () => {
    const entries = await sitemap();
    const hubs = entries.filter((entry) => /\/community$/.test(entry.url));

    expect(hubs.map((entry) => entry.url)).toEqual([
      `${baseUrl}/en/community`,
      `${baseUrl}/zh/community`,
    ]);
    for (const entry of hubs) {
      expect(entry.alternates?.languages).toEqual(languageAlternates("/community"));
      expect(entry).not.toHaveProperty("lastModified");
    }
    expect(promotedStyles).toHaveBeenCalledTimes(1);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);
  });

  it("emits both promoted detail locales without inventing publication dates", async () => {
    const publication = "2026-09-01T09:30:00.000Z";
    promotedStyles.mockResolvedValue([
      { slug: "aurora-grid", publishedAt: publication },
      { slug: "missing-date" },
      { slug: "invalid-date", publishedAt: "not-a-date" },
    ]);

    const entries = await sitemap();
    const details = entries.filter((entry) => /\/community\//.test(entry.url));
    expect(details).toHaveLength(6);
    expect(new Set(details.map((entry) => entry.url)).size).toBe(6);
    for (const slug of ["aurora-grid", "missing-date", "invalid-date"]) {
      for (const { locale } of localeCases) {
        const entry = details.find((item) => item.url === `${baseUrl}/${locale}/community/${slug}`);
        expect(entry).toBeDefined();
        expect(entry?.alternates?.languages).toEqual(languageAlternates(`/community/${slug}`));
        if (slug === "aurora-grid") {
          expect(entry?.lastModified).toEqual(new Date(publication));
        } else {
          expect(entry).not.toHaveProperty("lastModified");
        }
      }
    }
  });
});

describe("community JSON-LD helpers", () => {
  it.each(localeCases)("preserves canonical style identity and attribution in $locale", ({ locale, language, name }) => {
    const url = `${baseUrl}/${locale}/community/aurora-grid`;
    const authorUrl = `${baseUrl}/${locale}/community/u/42`;
    const schema = generateCommunityStyleJsonLd({
      ...styleInput(),
      name,
      url,
      language,
      author: { name: "Example Contributor", url: authorUrl },
      datePublished: "2026-09-01T09:30:00.000Z",
      isPromoted: true,
    });

    expect(schema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#creative-work`,
      name,
      url,
      mainEntityOfPage: url,
      inLanguage: language,
      datePublished: "2026-09-01T09:30:00.000Z",
      keywords: "grid, community",
      genre: "modern",
      author: { "@type": "Person", name: "Example Contributor", url: authorUrl },
      publisher: { "@id": `${baseUrl}/#organization`, name: "StyleKit" },
      isPartOf: { "@id": `${baseUrl}/#website` },
      isAccessibleForFree: true,
    });
  });

  it("omits missing dates and author URLs without fabricating ratings or people", () => {
    const anonymous = generateCommunityStyleJsonLd(styleInput());
    expect(anonymous.author["@type"]).not.toBe("Person");
    for (const key of ["datePublished", "dateModified", "aggregateRating", "review"]) {
      expect(anonymous).not.toHaveProperty(key);
    }
    const named = generateCommunityStyleJsonLd({
      ...styleInput(),
      author: { name: "Example Contributor" },
      datePublished: "",
    });
    expect(named.author).toEqual({ "@type": "Person", name: "Example Contributor" });
    expect(named).not.toHaveProperty("datePublished");
  });

  it.each(localeCases)("builds an ordered, localized collection in $locale without mutating inputs", ({ locale, language }) => {
    const url = `${baseUrl}/${locale}/community`;
    const input = {
      name: "Community",
      description: "Approved contributions.",
      url,
      language,
      items: [
        { name: "Aurora Grid", url: `${url}/aurora-grid`, description: "Grid-based UI." },
        { name: "Paper UI", url: `${url}/paper-ui` },
      ],
    };
    const original = structuredClone(input);
    const schema = generateCommunityCollectionJsonLd(input);

    expect(schema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#collection-page`,
      url,
      inLanguage: language,
      isPartOf: { "@id": `${baseUrl}/#website` },
      publisher: { "@id": `${baseUrl}/#organization` },
    });
    expect(schema.mainEntity).toEqual({
      "@type": "ItemList",
      numberOfItems: 2,
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "CreativeWork", ...item },
      })),
    });
    expect(input).toEqual(original);
  });

  it("keeps an empty collection empty instead of adding placeholder works", () => {
    const schema = generateCommunityCollectionJsonLd({
      name: "Community",
      description: "No contributions yet.",
      url: `${baseUrl}/en/community`,
      language: "en",
      items: [],
    });
    expect(schema.mainEntity).toEqual({
      "@type": "ItemList", numberOfItems: 0, itemListElement: [],
    });
  });

  it.each(localeCases)("preserves a public contributor's canonical identity in $locale", ({ locale, language }) => {
    const url = `${baseUrl}/${locale}/community/u/42`;
    const image = `${baseUrl}/example-avatar.png`;
    const schema = generateContributorProfileJsonLd({ ...profileInput(), url, language, image });
    expect(schema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${url}#profile-page`,
      url,
      inLanguage: language,
      mainEntity: { "@type": "Person", name: "Example Contributor", url, image },
    });
  });

  it("omits absent avatar and works from an empty contributor profile", () => {
    const schema = generateContributorProfileJsonLd({ ...profileInput(), publishedStyles: [] });
    expect(schema.mainEntity).not.toHaveProperty("image");
    expect(schema.mainEntity).not.toHaveProperty("subjectOf");
  });

  it("does not invent an employment relationship for an independent contributor", () => {
    const schema = generateContributorProfileJsonLd(profileInput());
    expect(schema.mainEntity).not.toHaveProperty("worksFor");
  });

  it("does not describe authored styles as works about the contributor", () => {
    const schema = generateContributorProfileJsonLd(profileInput());
    // subjectOf means a work about this Person, not a work authored by them.
    expect(schema.mainEntity).not.toHaveProperty("subjectOf");
  });

  it("preserves breadcrumb order and omits a missing terminal URL", () => {
    const schema = generateBreadcrumbJsonLd([
      { name: "首页", url: `${baseUrl}/zh` },
      { name: "社区", url: `${baseUrl}/zh/community` },
      { name: "极光网格" },
    ]);
    expect(schema.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "首页", item: `${baseUrl}/zh` },
      { "@type": "ListItem", position: 2, name: "社区", item: `${baseUrl}/zh/community` },
      { "@type": "ListItem", position: 3, name: "极光网格" },
    ]);
  });

  it("uses the supplied visible FAQ text without rewriting its claims", () => {
    const url = `${baseUrl}/zh/community`;
    const schema = generateFaqJsonLd([
      { question: "什么是社区？", answer: "通过审核的投稿目录。" },
    ], url);
    expect(schema).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: [{
        "@type": "Question",
        name: "什么是社区？",
        acceptedAnswer: { "@type": "Answer", text: "通过审核的投稿目录。" },
      }],
    });
    expect(generateFaqJsonLd([], url).mainEntity).toEqual([]);
  });

  it("serializes user-provided strings safely without losing their JSON-LD content", () => {
    const text = "</script><script>alert(1)</script> & \u2028\u2029";
    const graphs = [
      generateCommunityStyleJsonLd({ ...styleInput(), name: text, author: { name: text } }),
      generateCommunityCollectionJsonLd({
        name: text, description: text, url: `${baseUrl}/en/community`, language: "en",
        items: [{ name: text, description: text, url: styleInput().url }],
      }),
      generateContributorProfileJsonLd({ ...profileInput(), name: text }),
      generateFaqJsonLd([{ question: text, answer: text }], `${baseUrl}/en/community`),
    ];
    for (const graph of graphs) {
      const serialized = serializeJsonLd(graph);
      expect(serialized).not.toMatch(/[<>&\u2028\u2029]/);
      expect(JSON.parse(serialized)).toEqual(graph);
      expect(serializeJsonLd(graph)).toBe(serialized);
    }
  });
});
