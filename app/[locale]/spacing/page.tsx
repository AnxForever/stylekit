import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/spacing/page";
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
        title: "间距系统与布局网格",
        description: "交互式 8 点间距系统与 12 栏布局网格：预设、吸附检查器，以及可复制的 CSS 变量或 Tailwind v4 token。",
        keywords: ["间距系统", "8 点网格", "布局网格", "CSS 变量", "Tailwind v4"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/spacing");
}

export default Page;
