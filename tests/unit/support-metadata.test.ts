import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const mocks = vi.hoisted(() => ({ context: vi.fn() }));
vi.mock("@/lib/i18n/request", () => ({ getRequestLocaleContext: mocks.context }));
vi.mock("@/components/layout/header", () => ({ Header: () => null }));
vi.mock("@/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("@/components/i18n/localized-link", () => ({ LocalizedLink: () => null }));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("@/lib/support/acknowledgments", () => ({
  getPublishedThankYouEntries: async () => [],
}));
vi.mock("@/components/support/thank-you-list", () => ({
  ThankYouList: () => null,
}));

import SupportPage, { generateMetadata } from "@/app/support/page";
import { getBaseUrl } from "@/lib/i18n/routing";

function requestContext(locale: "en" | "zh") {
  return {
    locale,
    localePath: `/${locale}/support`,
    contentPath: "/support",
    canonicalUrl: `${getBaseUrl()}/${locale}/support`,
    languageAlternates: {
      en: `${getBaseUrl()}/en/support`,
      "zh-CN": `${getBaseUrl()}/zh/support`,
      "x-default": `${getBaseUrl()}/en/support`,
    },
    htmlLang: locale === "zh" ? "zh-CN" : "en",
    openGraphLocale: locale === "zh" ? "zh_CN" : "en_US",
    baseUrl: getBaseUrl(),
  };
}

beforeEach(() => vi.clearAllMocks());

describe("localized support metadata", () => {
  it.each([
    {
      locale: "en" as const,
      title: "Support StyleKit",
      description:
        "Support StyleKit's servers, domain and maintenance with a voluntary tip and see the acknowledgments.",
      canonical: "/en/support",
      ogLocale: "en_US",
    },
    {
      locale: "zh" as const,
      title: "支持 StyleKit",
      description:
        "扫码赞赏支持 StyleKit 的服务器、域名与持续维护，并查看赞助鸣谢。",
      canonical: "/zh/support",
      ogLocale: "zh_CN",
    },
  ])(
    "uses $locale copy, canonical metadata, and page language",
    async ({ locale, title, description, canonical, ogLocale }) => {
      mocks.context.mockResolvedValue(requestContext(locale));

      const metadata = await generateMetadata();
      const html = renderToStaticMarkup(await SupportPage());

      expect(metadata.title).toBe(title);
      expect(metadata.description).toBe(description);
      expect(metadata.alternates?.canonical).toBe(`${getBaseUrl()}${canonical}`);
      expect(metadata.alternates?.languages).toEqual(requestContext(locale).languageAlternates);
      expect(metadata.openGraph?.locale).toBe(ogLocale);
      expect(html).toContain(locale === "zh" ? "支持 StyleKit" : "Support StyleKit");
      expect(mocks.context).toHaveBeenCalledTimes(2);
    }
  );
});
