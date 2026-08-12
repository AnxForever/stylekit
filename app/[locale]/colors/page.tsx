import type { Metadata } from "next";
import Page, {
  metadata as baseMetadata,
} from "@/app/colors/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";

export const revalidate = 86400;

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
        title: `${CURATED_STYLE_COUNT} 种网页设计风格配色与色值`,
        description: `搜索并复制 ${CURATED_STYLE_COUNT} 种网页与 UI 设计风格的色板、Hex 色值和 Tailwind 映射，适合 CSS、设计系统和 AI 前端提示词。`,
        keywords: ["网页配色", "UI 配色", "设计风格色板", "Hex 色值", "Tailwind 颜色"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/colors");
}

export default Page;
