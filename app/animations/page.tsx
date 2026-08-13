import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimationsContent } from "@/components/animations/animations-content";
import { getAllAnimationsMeta } from "@/lib/animations/meta";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { applyRequestMetadata } from "@/lib/i18n/metadata";

export const dynamic = "force-static";

export const animationsMetadata: Metadata = {
  title: "CSS Animation Patterns | Copy-Ready Code Snippets",
  description: "Browse CSS animation patterns with code snippets ready to copy. Each animation includes CSS keyframes and Tailwind utility classes for modern web projects.",
};

export async function generateMetadata(): Promise<Metadata> {
  const context = await getRequestLocaleContext();
  const localized = context.locale === "zh"
    ? {
        title: "CSS 动画效果与可复制代码",
        description: "浏览可直接复制的 CSS 动画效果。每个动画都包含 CSS 关键帧与 Tailwind 工具类，适合现代网页项目。",
      }
    : animationsMetadata;

  return applyRequestMetadata(localized, context);
}

export default function AnimationsPage() {
  const allAnimations = getAllAnimationsMeta();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense>
          <AnimationsContent allAnimations={allAnimations} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
