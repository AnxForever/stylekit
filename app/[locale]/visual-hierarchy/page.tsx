import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/visual-hierarchy/page";
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
        title: "视觉层次指南",
        description: "控制视线先落在哪里：交互式杠杆调节器（大小、字重、颜色、留白）按视觉权重给元素排序，附可复制的文本层级 token。",
        keywords: ["视觉层次", "视觉权重", "排版层级", "注意力设计"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/visual-hierarchy");
}

export default Page;
