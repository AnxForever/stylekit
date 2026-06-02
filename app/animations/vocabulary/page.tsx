import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VocabularyContent } from "@/components/animations/vocabulary/vocabulary-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Animation Vocabulary | Motion Design Terms with Live Demos",
  description:
    "A motion design glossary: 12 categories and 48 core terms used by designers, engineers, and AI tools. Every term is paired with a working StyleKit animation.",
};

export default function VocabularyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <VocabularyContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
