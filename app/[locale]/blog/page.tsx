import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/blog/page";
import { isLocale } from "@/lib/i18n/routing";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;

  return {
    ...canonicalizeEnglishMetadata(baseMetadata, "/blog"),
    ...(locale === "zh"
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default Page;
