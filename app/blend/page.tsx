import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlendContent } from "./_content";

export const metadata: Metadata = {
  title: "Blend Styles - StyleKit",
  description:
    "Mix and match design token dimensions from different styles. Pick colors from one style, typography from another, and create unique hybrid designs.",
};

export default function BlendPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
              <div className="animate-pulse space-y-6">
                <div className="h-8 w-48 bg-muted/20 rounded" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="h-64 bg-muted/20 rounded" />
                    <div className="h-32 bg-muted/20 rounded" />
                  </div>
                  <div className="h-96 bg-muted/20 rounded" />
                </div>
              </div>
            </div>
          }
        >
          <BlendContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
