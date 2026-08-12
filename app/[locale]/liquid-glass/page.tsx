import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/liquid-glass/page";
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
        title: "Liquid Glass 液态玻璃 SVG 折射实验室",
        description: "使用 SVG 位移滤镜实现真正的液态玻璃折射效果，而不只是模糊；实时调节光照、折射、深度、色散、磨砂和扩散参数。",
        keywords: ["液态玻璃", "Liquid Glass", "SVG 折射", "feDisplacementMap", "网页视觉效果"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/liquid-glass");
}

export default Page;
