import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/resources/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "网页设计资源：字体、渐变、阴影与背景",
        description: "复制即用的网页设计资源：字体搭配、CSS 渐变、box-shadow 阴影预设和背景纹理，快速加入你的前端项目。",
        keywords: ["网页设计资源", "CSS 渐变", "CSS 阴影", "字体搭配", "背景纹理"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/resources");
}

export default Page;
