import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/developers/page";
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
        title: "StyleKit 开发者工具与 shadcn 主题",
        description: "通过 shadcn registry 安装 StyleKit 主题，并使用公开 Beta CLI、MCP、Core Package 与 Agent Skill。",
        keywords: ["shadcn 主题", "StyleKit 开发者", "React 设计系统", "Tailwind 主题", "设计 tokens"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/developers");
}

export default Page;
