import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/downloads/page";
import { localizeMetadata } from "@/lib/i18n/metadata";
import { isLocale } from "@/lib/i18n/routing";

export const revalidate = 3600;

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
        title: "3D 模型库",
        description: "预览不同美术风格的 3D 模型，按风格与题材浏览，查看文件清单、发布状态与授权信息。",
        keywords: ["3D 模型", "模型库", "美术风格", "模型题材"],
      }
    : baseMetadata;

  return localizeMetadata(localized, locale, "/downloads");
}

export default Page;
