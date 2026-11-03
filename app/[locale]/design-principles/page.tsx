import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/design-principles/page";
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
        title: "设计四原则：对比、重复、对齐与亲密性",
        description: "对比、重复、对齐、亲密性——用可交互的前后对比示例讲解设计四原则，附可复制的自检清单与最简代码。",
        keywords: ["设计原则", "CRAP 原则", "对比", "对齐", "亲密性"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/design-principles");
}

export default Page;
