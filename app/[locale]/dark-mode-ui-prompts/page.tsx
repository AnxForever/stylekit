import type { Metadata } from "next";
import Page, {
  metadata as baseMetadata,
} from "@/app/dark-mode-ui-prompts/page";
import { isLocale } from "@/lib/i18n/routing";
import { getLocalizedPromptMetadata } from "@/lib/seo/prompt-metadata";

export const revalidate = 86400;
// Match the localized style pages: supply the locale from params rather than
// depending on request headers and a streamed, JavaScript-revealed body.
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale)
    ? getLocalizedPromptMetadata(baseMetadata, locale, "/dark-mode-ui-prompts")
    : baseMetadata;
}

export default async function LocalizedDarkModePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Page locale={isLocale(locale) ? locale : "en"} />;
}
