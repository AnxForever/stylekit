import type { Metadata } from "next";
import Page from "@/app/guide/page";
import { metadata as baseMetadata } from "@/app/guide/layout";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? localizeMetadata(baseMetadata, locale, "/guide") : baseMetadata;
}

export default Page;
