import type { Metadata } from "next";
import { readdirSync } from "fs";
import { join } from "path";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeContent } from "@/components/home/home-content";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getAllAnimationsMeta } from "@/lib/animations/meta";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import { HOME_SOCIAL_IMAGE } from "@/lib/seo/site-metadata";

export const metadata: Metadata = {
  // Use `absolute` so the root "%s | StyleKit" template does not append a second
  // "StyleKit" (the brand is already in the title). Kept under ~60 chars so it
  // renders in full in the SERP with the highest-value keywords front-loaded.
  title: {
    absolute: `StyleKit — UI Design Prompts & ${CURATED_STYLE_COUNT} Visual Styles`,
  },
  description:
    `Browse ${CURATED_STYLE_COUNT} visual styles with design tokens, component recipes, and AI prompts. Export to Tailwind, shadcn, Figma, and IDE configs.`,
  keywords: [
    "UI design prompts",
    "web design prompts",
    "AI-friendly design system",
    "website style guides",
    "Tailwind UI prompts",
  ],
  openGraph: {
    images: [
      {
        url: HOME_SOCIAL_IMAGE.path,
        width: HOME_SOCIAL_IMAGE.width,
        height: HOME_SOCIAL_IMAGE.height,
        alt: HOME_SOCIAL_IMAGE.alt,
        type: "image/png",
      },
    ],
  },
};

function getTemplateCount() {
  return readdirSync(join(process.cwd(), "app/templates"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .length;
}

export default function Home() {
  const styles = getAllStylesMeta();
  const stats = {
    styles: styles.length,
    animations: getAllAnimationsMeta().length,
    templates: getTemplateCount(),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HomeContent styles={styles} stats={stats} />
      </main>
      <Footer />
    </div>
  );
}
