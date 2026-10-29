import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/prompt-sites/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized =
    locale === "zh"
      ? {
          ...baseMetadata,
          title: "前端风格提示词网站推荐：9 个可直接复制提示词的站点对比",
          description:
            "前端风格提示词网站有哪些？对比 StyleKit、DesignPrompts、UI Prompt、MotionSites 等 9 个站点，看各自给什么、适合什么场景、短板在哪，并附直接可复制的风格提示词入口。",
          keywords: [
            "前端风格提示词网站",
            "风格提示词",
            "UI 提示词库",
            "AI 前端设计",
            "网页设计风格",
          ],
        }
      : baseMetadata;
  return localizeMetadata(localized, locale, "/prompt-sites");
}

export default Page;
