import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ResourcesContent } from "@/components/resources/resources-content";

export const metadata: Metadata = {
  title: "Open-Source Designs & Resources — UI Inspiration and Assets",
  description:
    "Explore complete open-source websites with verified source and licenses, plus copy-ready font pairings, CSS gradients, shadows, textures and shaders.",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* ResourcesContent reads ?tab= through useSearchParams, so this subtree
            is client-rendered and the server ships an empty <main>. Without a
            fallback the footer renders directly under the header and is then
            shoved 13,000px down on hydration -- the single largest layout shift
            on the page. Reserving the space keeps the jump off screen. */}
        <Suspense fallback={<div className="min-h-[200vh]" aria-hidden="true" />}>
          <ResourcesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
