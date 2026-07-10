import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/translations";
import { localizeMetadata } from "@/lib/i18n/metadata";

type PromptPath =
  | "/ui-prompts"
  | "/landing-page-prompts"
  | "/dashboard-prompts"
  | "/tailwind-ui-prompts"
  | "/dark-mode-ui-prompts";

const ZH_PROMPT_METADATA: Record<
  PromptPath,
  { title: string; description: string; keywords: string[] }
> = {
  "/ui-prompts": {
    title: "UI 设计提示词库",
    description:
      "可直接复制的中文 UI 设计提示词，覆盖网站、仪表盘、落地页、暗色模式与 Tailwind UI，适用于 ChatGPT、Claude、Cursor、Claude Code 和 v0。",
    keywords: ["UI 设计提示词", "网页设计提示词", "前端提示词", "ChatGPT UI 提示词", "Claude UI 提示词", "Cursor 前端提示词", "v0 提示词"],
  },
  "/landing-page-prompts": {
    title: "落地页设计提示词",
    description:
      "用于 SaaS、产品发布、定价页和营销网站的落地页设计提示词，可复制到 ChatGPT、Claude、Cursor、Claude Code 与 v0。",
    keywords: ["落地页提示词", "Landing Page 提示词", "SaaS 网页设计", "营销页面提示词", "v0 落地页"],
  },
  "/dashboard-prompts": {
    title: "仪表盘 UI 设计提示词",
    description:
      "面向数据仪表盘、后台管理、KPI 卡片、图表和复杂数据界面的 UI 提示词，适用于 ChatGPT、Claude、Cursor 与 v0。",
    keywords: ["仪表盘提示词", "后台 UI 提示词", "Dashboard UI", "数据可视化提示词", "管理后台设计"],
  },
  "/tailwind-ui-prompts": {
    title: "Tailwind CSS UI 提示词",
    description:
      "生成 React、Next.js、Tailwind CSS 与 shadcn/ui 界面的前端提示词，适用于 ChatGPT、Claude、Cursor、Claude Code 和 v0。",
    keywords: ["Tailwind UI 提示词", "Tailwind CSS 提示词", "shadcn 提示词", "React UI 提示词", "Next.js 前端提示词"],
  },
  "/dark-mode-ui-prompts": {
    title: "暗色模式 UI 设计提示词",
    description:
      "用于暗色仪表盘、SaaS 产品、媒体应用与深色网站的 UI 设计提示词，包含可读性、对比度、状态和交互约束。",
    keywords: ["暗色模式提示词", "深色 UI 设计", "Dark Mode UI", "暗色仪表盘", "黑色网站设计提示词"],
  },
};

export function getLocalizedPromptMetadata(
  baseMetadata: Metadata,
  locale: Locale,
  pathname: PromptPath
): Metadata {
  if (locale !== "zh") {
    return localizeMetadata(baseMetadata, locale, pathname);
  }

  const localized = ZH_PROMPT_METADATA[pathname];
  return localizeMetadata(
    {
      ...baseMetadata,
      title: localized.title,
      description: localized.description,
      keywords: localized.keywords,
      openGraph: {
        ...(baseMetadata.openGraph ?? {}),
        title: `${localized.title} | StyleKit`,
        description: localized.description,
      },
      twitter: {
        ...(baseMetadata.twitter ?? {}),
        title: `${localized.title} | StyleKit`,
        description: localized.description,
      },
    },
    locale,
    pathname
  );
}
