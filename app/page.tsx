import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeContent } from "@/components/home/home-content";
import { getAllStylesMeta } from "@/lib/styles/meta";

export const metadata: Metadata = {
  title: "StyleKit - AI-Friendly Design System | 130+ Visual Styles",
  description:
    "Browse 130+ visual styles with design tokens, component recipes, and AI prompts. Export to Tailwind, shadcn, Figma, and IDE configs for consistent UI generation.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top",
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
