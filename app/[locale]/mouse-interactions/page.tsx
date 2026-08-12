import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/mouse-interactions/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "网页鼠标交互实验室：光标、拖拽与视差",
        description: "体验同一个光标在新野兽派、毛玻璃和编辑风格中的不同交互表现，包含磁性按钮、拖拽物理、环境光晕与视差深度。",
        keywords: ["鼠标交互", "网页交互", "光标动画", "视差效果", "前端动效"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/mouse-interactions");
}

export default Page;
