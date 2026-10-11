import type { Metadata } from "next";
import Page from "@/app/docs/page";
import { docsRouteMetadata, getDocsRouteMetadata } from "@/app/docs/metadata";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return docsRouteMetadata;

  return localizeMetadata(getDocsRouteMetadata(locale), locale, "/docs");
}

export default Page;
