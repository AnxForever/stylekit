import type { Metadata } from "next";
import Page from "@/app/mobile/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const localized = locale === "zh"
    ? {
        title: "移动端 UI 模式与开源组件推荐",
        description: "在手机预览中比较常见移动端界面模式，按平台筛选开源组件，并复制适合 AI 编码的场景要求。",
        keywords: ["移动端 UI", "手机界面设计", "React Native 组件", "移动端导航", "开源组件库"],
      }
    : {
        title: "Mobile UI Patterns and Open-Source Components",
        description: "Compare mobile interface patterns in an interactive phone preview, filter open-source component libraries by platform, and copy implementation briefs.",
        keywords: ["mobile UI", "mobile design patterns", "React Native components", "open-source UI libraries"],
      };

  return localizeMetadata(localized, locale, "/mobile");
}

export default Page;
