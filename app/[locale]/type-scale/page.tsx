import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/type-scale/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? localizeMetadata(baseMetadata, locale, "/type-scale") : baseMetadata;
}

export default Page;
