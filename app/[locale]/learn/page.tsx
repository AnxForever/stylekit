import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/learn/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "前端设计基础：色彩、排版、间距与层次",
        description: "通过色彩、字体、字号、间距、设计原则和视觉层次文章，建立可复用的前端界面设计基础。",
        keywords: ["前端设计基础", "网页设计教程", "UI 排版", "视觉层次", "设计系统"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/learn");
}

export default Page;
