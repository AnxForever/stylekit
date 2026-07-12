import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/liquid-glass/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale)
    ? localizeMetadata(baseMetadata, locale, "/liquid-glass")
    : baseMetadata;
}

export default Page;
