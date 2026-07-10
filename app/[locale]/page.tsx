import type { Metadata } from "next";
import HomePage, { metadata as baseMetadata } from "@/app/page";
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
        title: {
          absolute: "StyleKit — AI 前端设计风格与 UI 提示词工具",
        },
        description:
          "StyleKit 收录 135 种网页与 UI 设计风格，并提供 design tokens、组件配方以及适用于 ChatGPT、Claude、Cursor、Claude Code 和 v0 的前端提示词。",
        keywords: [
          "StyleKit",
          "AI 前端设计",
          "UI 提示词工具",
          "网页设计风格库",
          "Cursor 前端设计",
          "Claude Code UI",
        ],
      }
    : baseMetadata;

  return localizeMetadata(localized, locale, "/");
}

export default HomePage;
