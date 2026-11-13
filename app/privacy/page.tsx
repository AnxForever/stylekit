import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { applyRequestMetadata } from "@/lib/i18n/metadata";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { getLegalMetadata } from "@/lib/legal/content";

export async function generateMetadata(): Promise<Metadata> {
  const context = await getRequestLocaleContext();
  return applyRequestMetadata(getLegalMetadata("privacy", context.locale), context);
}

export default async function PrivacyPage() {
  const { locale } = await getRequestLocaleContext();
  return <LegalPage document="privacy" locale={locale} />;
}
