import SiteDocument from "@/components/layout/site-document";
import { getLocaleDocumentContext } from "@/lib/i18n/request";
import { buildSiteMetadata } from "@/lib/seo/site-metadata";
import { notFound } from "next/navigation";
import {
  isLocale,
  LOCALES,
} from "@/lib/i18n/routing";

export { viewport } from "@/components/layout/site-document";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return buildSiteMetadata(getLocaleDocumentContext(locale));
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
