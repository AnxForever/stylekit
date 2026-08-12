import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/component-patterns/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "可复用 UI 组件模式",
        description: "浏览面包屑、手风琴、标签页、分页和侧边栏等可复用 UI 组件模式，获取适合 React 与 Tailwind 项目的界面方向。",
        keywords: ["UI 组件模式", "React 组件", "Tailwind 组件", "面包屑", "标签页"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/component-patterns");
}

export default Page;
