import type { Metadata } from "next";
import Page, {
  metadata as baseMetadata,
} from "@/app/collections/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

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
        title: "按主题浏览网页与 UI 设计风格",
        description:
          "按暗色模式、复古、动漫、游戏 UI、强烈配色和手绘等主题浏览 135 种设计风格，快速找到适合产品与前端提示词的视觉方向。",
        keywords: [
          "暗黑 UI 风格",
          "复古网页风格",
          "游戏 UI",
          "二次元 UI",
          "手绘网页风格",
          "设计风格分类",
        ],
      }
    : baseMetadata;

  return localizeMetadata(localized, locale, "/collections");
}

export default Page;
