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
      "可直接复制的中文 UI 设计提示词，覆盖网站、仪表盘、落地页、暗色模式与 Tailwind UI，适用于 ChatGPT、Claude、Claude Code 和 Codex。",
    keywords: ["UI 设计提示词", "网页设计提示词", "前端提示词", "ChatGPT UI 提示词", "Claude UI 提示词", "Claude Code UI 提示词", "Codex 前端提示词"],
  },
  "/landing-page-prompts": {
    title: "落地页设计提示词",
    description:
      "用于 SaaS、产品发布、定价页和营销网站的落地页设计提示词，可复制到 ChatGPT、Claude、Claude Code 与 Codex。",
    keywords: ["落地页提示词", "Landing Page 提示词", "SaaS 网页设计", "营销页面提示词", "AI 落地页设计"],
  },
  "/dashboard-prompts": {
    title: "仪表盘 UI 提示词：8 个可复制示例",
    description:
      "复制 8 条适用于 ChatGPT、Claude、Cursor 和 v0 的仪表盘 UI 提示词，覆盖数据分析、后台管理、图表、表格和响应式状态。",
    keywords: ["仪表盘提示词", "后台 UI 提示词", "Dashboard UI", "数据可视化提示词", "管理后台设计"],
  },
  "/tailwind-ui-prompts": {
    title: "Tailwind CSS UI 提示词",
    description:
      "生成 React、Next.js、Tailwind CSS 与 shadcn/ui 界面的前端提示词，适用于 ChatGPT、Claude、Claude Code 和 Codex。",
    keywords: ["Tailwind UI 提示词", "Tailwind CSS 提示词", "shadcn 提示词", "React UI 提示词", "Next.js 前端提示词"],
  },
  "/dark-mode-ui-prompts": {
    title: "暗色模式 UI 提示词与 Tailwind v4 示例",
    description:
      "复制适用于 ChatGPT、Claude、Cursor 和 v0 的暗色 UI 提示词，查看 Tailwind v4 主题配置、表面配色和有官方来源的文字对比度检查。",
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
