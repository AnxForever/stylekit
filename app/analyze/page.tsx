import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnalyzeContent } from "./_content";

export const metadata: Metadata = {
  title: "Analyze Style",
  description:
    "Analyze your component code to detect which StyleKit design style it most closely matches.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://stylekit.top"}/analyze`,
  },
};

export default function AnalyzePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
              <div className="animate-pulse space-y-6">
                <div className="h-8 w-48 bg-muted/20 rounded" />
                <div className="h-64 bg-muted/20 rounded" />
              </div>
            </div>
          }
        >
          <AnalyzeContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
