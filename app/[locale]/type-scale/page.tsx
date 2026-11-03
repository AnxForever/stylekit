import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/type-scale/page";
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
        title: "模块化字号阶梯",
        description: "交互式模块化字号阶梯与流式（clamp）排版：选择基准字号与比例，预览每一级，并复制 CSS 变量或 Tailwind v4 token。",
        keywords: ["字号阶梯", "模块化比例", "流式排版", "clamp", "Tailwind v4"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/type-scale");
}

export default Page;
