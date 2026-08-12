import type { Metadata } from "next";
import { AiIntentPage, getAiIntentMetadata } from "@/components/seo/ai-intent-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getAiIntentMetadata("ai-ui-design", locale);
}

export default async function AiUiDesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AiIntentPage keyName="ai-ui-design" locale={locale} />;
}
