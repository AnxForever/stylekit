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
  return isLocale(locale) ? localizeMetadata(baseMetadata, locale, "/") : baseMetadata;
}

export default HomePage;
