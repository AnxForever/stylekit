import type { Metadata } from "next";
import Page from "@/app/templates/page";
import TemplatesLayout from "@/app/templates/layout";
import { baseTemplateMetadata } from "@/lib/templates/metadata";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseTemplateMetadata;
  const localized = locale === "zh"
    ? {
        ...baseTemplateMetadata,
        title: "完整网站与页面模板",
        description: "精选个人站、博客与商业网站开源项目，提供真实预览和完整源码；另有可下载的 Next.js 页面示例，方便接入自己的数据与业务。",
        keywords: ["个人网站模板", "博客模板", "开源网站", "Next.js 模板", "Astro 模板", "Tailwind 模板"],
      }
    : baseTemplateMetadata;
  return localizeMetadata(localized, locale, "/templates");
}

export default function LocalizedTemplatesPage() {
  return (
    <TemplatesLayout>
      <Page />
    </TemplatesLayout>
  );
}
