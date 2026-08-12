import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/animations/vocabulary/page";
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
        title: "动效术语词典：CSS 与网页动画实例",
        description: "通过 12 个分类和 48 个核心术语理解网页动效，每个术语都配有可运行的 StyleKit 动画示例。",
        keywords: ["动效术语", "网页动画", "CSS 动画词典", "交互设计术语", "动画实例"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/animations/vocabulary");
}

export default Page;
