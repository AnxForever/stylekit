import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TypographyContent } from "@/components/typography/typography-content";

export const metadata: Metadata = {
  title: "Curated Font Pairings",
  description:
    "Explore a curated collection of expressive open-source font pairings for editorial, technical, playful, elegant, and display-focused interfaces.",
};

export default function TypographyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TypographyContent />
      </main>
      <Footer />
    </div>
  );
}
