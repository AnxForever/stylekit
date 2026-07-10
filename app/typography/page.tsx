import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TypographyContent } from "@/components/typography/typography-content";

export const metadata: Metadata = {
  title: "Typography & Font Pairings",
  description:
    "Browse 20+ curated font pairings for your design system. Copy CSS or Tailwind classes instantly.",
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
