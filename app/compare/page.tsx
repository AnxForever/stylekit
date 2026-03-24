import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CompareContent } from "./_content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Compare Styles",
  description:
    "Compare design styles side-by-side. Analyze token differences in colors, typography, spacing, shadows, and more.",
};

export default function ComparePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
              <div className="animate-pulse space-y-6">
                <div className="h-8 w-48 bg-muted/20 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-12 bg-muted/20 rounded" />
                  <div className="h-12 bg-muted/20 rounded" />
                </div>
                <div className="h-64 bg-muted/20 rounded" />
              </div>
            </div>
          }
        >
          <CompareContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
