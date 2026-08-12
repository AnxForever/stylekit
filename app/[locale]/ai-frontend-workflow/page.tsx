import type { Metadata } from "next";
import { AiIntentPage, getAiIntentMetadata } from "@/components/seo/ai-intent-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getAiIntentMetadata("ai-frontend-workflow", locale);
}

export default async function AiFrontendWorkflowPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AiIntentPage keyName="ai-frontend-workflow" locale={locale} />;
}
