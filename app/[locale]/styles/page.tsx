import type { Metadata } from "next";
import StylesPage, { metadata as baseMetadata } from "@/app/styles/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;

  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: `${CURATED_STYLE_COUNT} 种网页与 UI 设计风格`,
        description:
          `浏览 ${CURATED_STYLE_COUNT} 种网页设计风格与 UI 风格，包含设计 tokens、组件配方、Tailwind 实现约束和适用于 ChatGPT、Claude、Cursor、v0 的前端提示词。`,
        keywords: [
          "前端风格",
          "网页设计风格",
          "UI 风格",
          "设计风格大全",
          "AI 前端设计",
          "网站风格参考",
        ],
        openGraph: {
          ...(baseMetadata.openGraph ?? {}),
          title: `${CURATED_STYLE_COUNT} 种网页与 UI 设计风格 | StyleKit`,
          description:
            `浏览 ${CURATED_STYLE_COUNT} 种网页设计风格与 UI 风格，以及可供 AI 编码工具使用的设计约束和前端提示词。`,
        },
      }
    : baseMetadata;

  return localizeMetadata(localized, locale, "/styles");
}

export default StylesPage;
