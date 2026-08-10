import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LaunchContent } from "@/components/launch/launch-content";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const localized = locale === "zh"
    ? {
        title: "StyleKit — AI 网页设计风格与提示词工作流",
        description: "StyleKit 把视觉风格、设计 Token、组件配方和 AI Rules 连接起来，让 AI 生成的网站从能用到有风格。",
      }
    : {
        title: "StyleKit — A visual workflow for AI-generated websites",
        description: "StyleKit connects visual styles, design tokens, component recipes, and AI Rules so AI-generated websites can ship with a point of view.",
      };

  return localizeMetadata(localized, locale, "/launch");
}

export default async function LaunchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <LaunchContent />
      </main>
      <Footer />
    </div>
  );
}
