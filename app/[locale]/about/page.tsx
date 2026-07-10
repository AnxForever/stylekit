import type { Metadata } from "next";
import Page from "@/app/about/page";
import { metadata as baseMetadata } from "@/app/about/layout";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? localizeMetadata(baseMetadata, locale, "/about") : baseMetadata;
}

export default Page;
