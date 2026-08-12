import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/recipes/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "网页设计配方：风格、布局与动效组合",
        description: "按 SaaS、电商、作品集和博客等使用场景浏览风格、布局与动画组合，复制一套完整的前端设计方向。",
        keywords: ["网页设计配方", "UI 风格组合", "SaaS 设计", "落地页设计", "前端设计方案"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/recipes");
}

export default Page;
