import type { Metadata } from "next";
import Page from "@/app/components/page";
import { metadata as baseMetadata } from "@/app/components/layout";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "Radix UI 与 Tailwind 组件库",
        description: "浏览 25 多个基于 Radix UI 和 Tailwind CSS 的可访问组件，查看按钮、卡片、输入框等组件在不同设计风格下的预览。",
        keywords: ["UI 组件库", "Radix UI", "Tailwind CSS 组件", "可访问组件", "React 组件"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/components");
}

export default Page;
