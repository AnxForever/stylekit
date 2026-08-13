import type { Metadata } from "next";
import Page, { animationsMetadata as baseMetadata } from "@/app/animations/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

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
        title: "CSS 动画模式与可复制代码",
        description: "浏览可直接复制的 CSS 动画模式，包含关键帧、Tailwind 工具类和适合现代网站的交互动效代码。",
        keywords: ["CSS 动画", "网页动效", "Tailwind 动画", "前端动画代码", "交互设计"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/animations");
}

export default Page;
