"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";

const PlaygroundContainer = dynamic(
  () =>
    import("@/components/playground/playground-container").then(
      (mod) => mod.PlaygroundContainer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted">Loading editor...</p>
        </div>
      </div>
    ),
  }
);

export function PlaygroundPage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <PlaygroundContainer />
    </div>
  );
}
