import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/ui-prompts/page";
import { isLocale } from "@/lib/i18n/routing";
import { getLocalizedPromptMetadata } from "@/lib/seo/prompt-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale)
    ? getLocalizedPromptMetadata(baseMetadata, locale, "/ui-prompts")
    : baseMetadata;
}

export default Page;
