import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RepairWorkbench } from "@/components/repair/repair-workbench";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getStylesWithLintRules } from "@/lib/styles/lint-rules";
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
      ? {
          title: "修好 AI 生成的网页 | StyleKit",
          description: "粘贴 AI 生成的 JSX 或 HTML，用选定风格的真实规则找出偏离，并直接拿到改好的代码。",
        }
      : {
          title: "Repair an AI-generated page | StyleKit",
          description:
            "Paste AI-generated JSX or HTML, see where it drifts from the style you chose, and get the corrected code back.",
        },
    locale,
    "/repair",
  );
}

export default async function LocalizedRepairPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const curated = new Set(getStylesWithLintRules());
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <RepairWorkbench
          styles={getAllStylesMeta().map((style) => ({
            slug: style.slug,
            name: style.name,
            nameEn: style.nameEn,
            curated: curated.has(style.slug),
          }))}
        />
      </main>
      <Footer />
    </div>
  );
}
