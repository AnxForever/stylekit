import type { Metadata } from "next";
import Page from "@/app/templates/page";
import TemplatesLayout from "@/app/templates/layout";
import { baseTemplateMetadata } from "@/lib/templates/metadata";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseTemplateMetadata;
  const localized = locale === "zh"
    ? {
        ...baseTemplateMetadata,
        title: "Next.js 与 Tailwind 网页模板",
        description: "浏览可运行的 SaaS、落地页、后台、电商、作品集和博客模板，预览并下载 Next.js + Tailwind 项目。",
        keywords: ["Next.js 模板", "Tailwind 模板", "网页模板", "SaaS 模板", "后台模板"],
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
