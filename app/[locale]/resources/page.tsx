import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/resources/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

// Keep normal static rendering so useSearchParams can defer to the page's
// Suspense boundary. force-static supplies empty query params during prerender
// and hydrates the default font tab against the visitor's requested tab.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "开源网站与网页设计资源",
        description: "浏览源码、许可和技术栈均已核对的开源网站，也可复制字体搭配、CSS 渐变、阴影预设、背景纹理和 WebGL2 着色器。",
        keywords: ["开源设计网站", "开源网页模板", "网页设计资源", "CSS 渐变", "CSS 阴影", "字体搭配", "背景纹理", "WebGL 背景", "着色器"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/resources");
}

export default Page;
