import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { KitContent } from "./_content";

export const metadata: Metadata = {
  title: "My Kit | StyleKit Design Kit Builder",
  description:
    "Collect styles, animations and font pairings across StyleKit, then export them as one coherent design kit: merged AI prompt, design spec, tokens and code.",
  robots: { index: false, follow: false },
};

export default function KitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <KitContent />
      </main>
      <Footer />
    </div>
  );
}
