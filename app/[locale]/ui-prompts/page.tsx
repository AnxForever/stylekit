import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/ui-prompts/page";
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
        title: "AI UI 与前端设计提示词库",
        description:
          "可直接复制的 AI UI 与前端设计提示词，覆盖网站、仪表盘、落地页、暗色模式与 Tailwind UI，适用于 ChatGPT、Claude Code 和 Codex。",
        keywords: [
          "AI UI 提示词",
          "AI 前端提示词",
          "网页设计提示词",
          "网站设计提示词",
          "Tailwind UI 提示词",
          "ChatGPT UI 提示词",
          "Claude Code 前端",
          "Codex 前端提示词",
        ],
      }
    : {
        ...baseMetadata,
        title: "AI UI & Frontend Design Prompts",
        description:
          "Copy-ready AI UI and frontend design prompts for websites, dashboards, landing pages, dark mode, and Tailwind UI. Use them with ChatGPT, Claude Code, and Codex.",
        keywords: [
          "AI UI prompts",
          "AI frontend prompts",
          "AI web design prompts",
          "website design prompts",
          "frontend design prompts",
          "Tailwind UI prompts",
          "Claude Code frontend",
          "Codex frontend prompts",
        ],
      };

  return localizeMetadata(
    {
      ...localized,
      openGraph: {
        ...(localized.openGraph ?? {}),
        title: `${localized.title} | StyleKit`,
        description: localized.description,
      },
      twitter: {
        ...(localized.twitter ?? {}),
        title: `${localized.title} | StyleKit`,
        description: localized.description,
      },
    },
    locale,
    "/ui-prompts",
  );
}

export default Page;
