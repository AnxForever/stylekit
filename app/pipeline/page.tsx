import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PipelineContent } from "./_content";

export const metadata: Metadata = {
  title: "Style Pipeline - StyleKit",
  description:
    "Extract, analyze, match, and transform web styles into reusable design systems.",
};

export default function PipelinePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
              <div className="animate-pulse space-y-6">
                <div className="h-8 w-48 bg-muted/20 rounded" />
                <div className="h-4 w-96 bg-muted/20 rounded" />
                <div className="space-y-4 mt-8">
                  <div className="h-12 bg-muted/20 rounded" />
                  <div className="h-12 bg-muted/20 rounded" />
                  <div className="h-12 bg-muted/20 rounded" />
                </div>
              </div>
            </div>
          }
        >
          <PipelineContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
