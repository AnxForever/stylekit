import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ResourcesContent } from "@/components/resources/resources-content";

export const metadata: Metadata = {
  title: "Design Resources — Fonts, Gradients, Shadows & Backgrounds",
  description:
    "Copy-ready design assets in one place: curated font pairings, CSS gradients, box-shadow presets and background textures. Copy the CSS or add them to your kit.",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense>
          <ResourcesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
