import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimationsContent } from "@/components/animations/animations-content";
import { getAllAnimationsMeta } from "@/lib/animations/meta";

export const metadata: Metadata = {
  title: "CSS Animation Patterns | Copy-Ready Code Snippets",
  description:
    "Browse CSS animation patterns with code snippets ready to copy. Each animation includes CSS keyframes and Tailwind utility classes for modern web projects.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top"}/animations`,
  },
};

export default function AnimationsPage() {
  const allAnimations = getAllAnimationsMeta();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimationsContent allAnimations={allAnimations} />
      </main>
      <Footer />
    </div>
  );
}
