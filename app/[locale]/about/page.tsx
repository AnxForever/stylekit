import type { Metadata } from "next";
import Page from "@/app/about/page";
import { metadata as baseMetadata } from "@/app/about/layout";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "关于 StyleKit：面向 AI 编码的设计系统工具",
        description: "了解 StyleKit 如何用网页设计风格、design tokens、组件配方和前端提示词帮助开发者构建一致的 AI 生成界面。",
        keywords: ["StyleKit", "AI 设计系统", "前端设计工具", "网页设计风格", "design tokens"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/about");
}

export default Page;
