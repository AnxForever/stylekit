import type { Metadata } from "next";
import Page, {
  generateMetadata as baseGenerateMetadata,
} from "@/app/collections/[theme]/page";
import { getAllCollections } from "@/lib/styles/collections";
import { isLocale, LOCALES } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/translations";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getAllCollections().map((collection) => ({ locale, theme: collection.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; theme: string }>;
}): Promise<Metadata> {
  const { locale, theme } = await params;
  const validLocale: Locale = isLocale(locale) ? locale : "en";
  const metadata = await baseGenerateMetadata({
    params: Promise.resolve({ theme }),
    locale: validLocale,
  });
  return isLocale(locale)
    ? localizeMetadata(metadata, validLocale, `/collections/${theme}`)
    : metadata;
}

export default Page;
