import type { Metadata } from "next";
import Page, {
  metadata as baseMetadata,
} from "@/app/landing-page-prompts/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale)
    ? localizeMetadata(baseMetadata, locale, "/landing-page-prompts")
    : baseMetadata;
}

export default Page;
