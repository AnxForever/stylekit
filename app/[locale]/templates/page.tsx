import type { Metadata } from "next";
import Page from "@/app/templates/page";
import TemplatesLayout, { baseTemplateMetadata } from "@/app/templates/layout";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale)
    ? localizeMetadata(baseTemplateMetadata, locale, "/templates")
    : baseTemplateMetadata;
}

export default function LocalizedTemplatesPage() {
  return (
    <TemplatesLayout>
      <Page />
    </TemplatesLayout>
  );
}
