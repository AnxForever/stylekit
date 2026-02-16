"use client";

import { Header } from "@/components/layout/header";
import { PlaygroundContainer } from "@/components/playground/playground-container";

export function PlaygroundPage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <PlaygroundContainer />
    </div>
  );
}
