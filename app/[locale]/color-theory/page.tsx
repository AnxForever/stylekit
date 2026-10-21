import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/color-theory/page";
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
        title: "色彩理论：HSL 配色与对比度",
        description: "交互式色彩理论：HSL 模型、配色和谐生成器、WCAG 对比度检查器，以及面向设计师与开发者的实用用色指南。",
        keywords: ["色彩理论", "HSL 配色", "配色方案", "WCAG 对比度", "界面配色"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/color-theory");
}

export default Page;
