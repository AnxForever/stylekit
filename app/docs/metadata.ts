import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/translations";

export const docsRouteMetadata: Metadata = {
  title: "Documentation",
  description:
    "Reference for StyleKit visual styles, design tokens, component recipes, and AI coding tool integrations.",
};

export function getDocsRouteMetadata(locale: Locale): Metadata {
  if (locale === "en") return docsRouteMetadata;

  return {
    ...docsRouteMetadata,
    title: "文档：风格体系与 AI 工具接入",
    description: "了解 StyleKit 的视觉与布局风格、设计令牌、组件 Recipe，以及在 AI 编码工具中的接入方式。",
    keywords: ["StyleKit 文档", "设计令牌", "组件 Recipe", "AI 编码工具"],
  };
}
