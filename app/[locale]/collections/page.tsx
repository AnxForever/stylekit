import type { Metadata } from "next";
import Page, {
  metadata as baseMetadata,
} from "@/app/collections/page";
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
    ? localizeMetadata(baseMetadata, locale, "/collections")
    : baseMetadata;
}

export default Page;
