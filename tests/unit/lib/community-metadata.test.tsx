import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const mocks = vi.hoisted(() => ({ context: vi.fn(), catalog: vi.fn(), discussions: vi.fn() }));
vi.mock("@/lib/i18n/request", () => ({ getRequestLocaleContext: mocks.context }));
vi.mock("@/lib/community/catalog", () => ({ getCommunityCatalog: mocks.catalog }));
vi.mock("@/lib/community/discussions", () => ({ getRecentDiscussions: mocks.discussions }));
vi.mock("@/components/layout/header", () => ({ Header: () => null }));
vi.mock("@/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("@/components/ui/breadcrumb", () => ({ Breadcrumb: () => null }));
vi.mock("@/components/i18n/localized-link", () => ({ LocalizedLink: () => null }));
vi.mock("@/components/community/community-catalog", () => ({ CommunityCatalog: () => null }));
vi.mock("@/components/community/community-discussions", () => ({ CommunityDiscussions: () => null }));
vi.mock("@/components/community/community-participation", () => ({ CommunityParticipation: () => null }));
vi.mock("@/components/community/community-retry-button", () => ({ CommunityRetryButton: () => null }));
import CommunityPage, { generateMetadata } from "@/app/community/page";
import { getStyleMetaBySlug } from "@/lib/styles/meta";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.context.mockResolvedValue({
    locale: "en", canonicalUrl: "https://www.stylekit.top/en/community",
    languageAlternates: { en: "https://www.stylekit.top/en/community", "zh-CN": "https://www.stylekit.top/zh/community" },
    baseUrl: "https://www.stylekit.top", openGraphLocale: "en_US",
  });
  mocks.catalog.mockResolvedValue({ status: "ready", styles: [] });
  mocks.discussions.mockResolvedValue({ status: "ready", items: [] });
});

describe("community search metadata", () => {
  it("sets the brand exactly once even when the page shares its root-layout segment", async () => {
    const metadata = await generateMetadata();
    expect(metadata.title).toEqual({ absolute: "Community Styles & UI Design Discussions | StyleKit" });
    expect(metadata.openGraph?.title).toBe("Community Styles & UI Design Discussions | StyleKit");
    expect(metadata.alternates?.canonical).toBe("https://www.stylekit.top/en/community");
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });

  it("keeps hub indexability stable but does not claim an empty CollectionPage during a partial outage", async () => {
    mocks.catalog.mockResolvedValue({ status: "unavailable", styles: [] });
    expect((await generateMetadata()).robots).toEqual({ index: true, follow: true });
    expect(mocks.catalog).not.toHaveBeenCalled();
    const html = renderToStaticMarkup(await CommunityPage());
    expect(html).not.toContain('"@type":"CollectionPage"');
    expect(html).toContain("Contributions are temporarily unavailable");
  });

  it("describes only the server-visible filtered contributions in structured data", async () => {
    const dark = getStyleMetaBySlug("dark-mode");
    const glass = getStyleMetaBySlug("glassmorphism");
    if (!dark || !glass) throw new Error("Fixture styles missing");
    mocks.catalog.mockResolvedValue({
      status: "ready",
      styles: [{ ...dark, curated: true }, glass],
    });
    const html = renderToStaticMarkup(await CommunityPage({ searchParams: Promise.resolve({ q: "dark mode" }) }));
    const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
    if (!match) throw new Error("Collection schema missing");
    const schema = JSON.parse(match[1]);
    expect(schema.mainEntity.numberOfItems).toBe(1);
    expect(schema.mainEntity.itemListElement[0].item.url).toBe("https://www.stylekit.top/en/styles/dark-mode");
  });
});
