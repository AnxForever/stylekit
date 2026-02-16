import { Suspense } from "react";
import type { Metadata } from "next";
import { PlaygroundPage } from "./playground-page";

export const metadata: Metadata = {
  title: "Playground - StyleKit",
  description: "Live code playground for StyleKit design styles. Edit HTML with real-time preview across 75+ design styles.",
};

export default function Page() {
  return (
    <Suspense fallback={<PlaygroundFallback />}>
      <PlaygroundPage />
    </Suspense>
  );
}

function PlaygroundFallback() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted">Loading playground...</p>
      </div>
    </div>
  );
}
