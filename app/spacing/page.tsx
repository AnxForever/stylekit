import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SpacingContent } from "@/components/spacing/spacing-content";

export const metadata: Metadata = {
  title: "Spacing & Grid - StyleKit",
  description:
    "Interactive 8-point spacing scale and 12-column layout grid: presets, a snap checker, and copyable CSS variables or Tailwind v4 tokens.",
};

export default function SpacingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SpacingContent />
      </main>
      <Footer />
    </div>
  );
}
