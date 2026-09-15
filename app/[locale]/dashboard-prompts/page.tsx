import type { Metadata } from "next";
import Page, {
  metadata as baseMetadata,
} from "@/app/dashboard-prompts/page";
import { isLocale } from "@/lib/i18n/routing";
import { getLocalizedPromptMetadata } from "@/lib/seo/prompt-metadata";

export const revalidate = 86400;
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale)
    ? getLocalizedPromptMetadata(baseMetadata, locale, "/dashboard-prompts")
    : baseMetadata;
}

export default async function LocalizedDashboardPromptsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <Page locale={isLocale(locale) ? locale : "en"} />;
}
