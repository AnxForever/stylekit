import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StyleAdvisorStandalone } from "@/components/bailian/style-advisor-standalone";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return localizeMetadata(
    locale === "zh"
      ? { title: "AI 风格顾问 | StyleKit", description: "用自然语言匹配 StyleKit 的已验证设计风格。" }
      : { title: "AI Style Advisor | StyleKit", description: "Match a verified StyleKit visual style from a natural-language brief." },
    locale,
    "/style-advisor",
  );
}

export default async function LocalizedStyleAdvisorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <StyleAdvisorStandalone />;
}
