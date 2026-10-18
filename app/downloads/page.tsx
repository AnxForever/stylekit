import type { Metadata } from "next";
import { Suspense } from "react";
import { DownloadsContent } from "@/components/downloads/downloads-content";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "3D models",
  description:
    "Preview 3D models in different art styles. Browse by style and theme, and inspect file lists, publication status, and license details.",
  keywords: ["3D models", "model library", "art styles", "model themes"],
};

export default function DownloadsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <DownloadsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
