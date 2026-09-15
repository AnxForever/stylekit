import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/resources/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "网页设计资源：字体、渐变、阴影、背景与着色器",
        description: "复制即用的网页设计资源：字体搭配、CSS 渐变、box-shadow 阴影预设、背景纹理和 WebGL2 着色器背景，快速加入你的前端项目。",
        keywords: ["网页设计资源", "CSS 渐变", "CSS 阴影", "字体搭配", "背景纹理", "WebGL 背景", "着色器"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/resources");
}

export default Page;
