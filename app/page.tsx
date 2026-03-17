import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeContent } from "@/components/home/home-content";
import { getAllStylesMeta } from "@/lib/styles/meta";

export const metadata: Metadata = {
  title: "StyleKit - UI Design Prompts, Visual Styles & AI-Friendly Design System",
  description:
    "Browse 120+ visual styles with design tokens, component recipes, and AI prompts. Export to Tailwind, shadcn, Figma, and IDE configs for consistent website UI generation.",
  keywords: [
    "UI design prompts",
    "web design prompts",
    "AI-friendly design system",
    "website style guides",
    "Tailwind UI prompts",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top",
  },
};

export default function Home() {
  const styles = getAllStylesMeta();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HomeContent styles={styles} />
      </main>
      <Footer />
    </div>
  );
}
