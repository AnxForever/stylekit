import type { Metadata } from "next";
import Page from "@/app/guide/page";
import { metadata as baseMetadata } from "@/app/guide/layout";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "StyleKit 入门指南：从风格到设计 tokens",
        description: "学习浏览网页设计风格、导出 design tokens、生成 AI 前端提示词，并把 StyleKit 接入 React 与 Tailwind 工作流。",
        keywords: ["StyleKit 教程", "设计 tokens", "AI 前端提示词", "React 设计系统", "Tailwind 工作流"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/guide");
}

export default Page;
