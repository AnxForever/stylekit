import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getStylesWithLintRules } from "@/lib/styles/lint-rules";
import { RepairWorkbench } from "./_content";

export const metadata: Metadata = {
  title: "修好 AI 生成的网页 | StyleKit",
  description:
    "粘贴 AI 生成的 JSX 或 HTML，用选定风格的真实规则找出偏离，并直接拿到改好的代码。",
};

export default function RepairPage() {
  const styles = getAllStylesMeta();
  // Curated styles carry hand-written reasons, so they make the strongest demo.
  const curated = new Set(getStylesWithLintRules());

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <RepairWorkbench
          styles={styles.map((style) => ({
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
