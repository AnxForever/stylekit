import type { Metadata } from "next";
import { AiIntentPage, getAiIntentMetadata } from "@/components/seo/ai-intent-page";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getAiIntentMetadata("ai-ui-generator", locale);
}

export default async function AiUiGeneratorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AiIntentPage keyName="ai-ui-generator" locale={locale} />;
}
