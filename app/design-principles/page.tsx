import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DesignPrinciplesContent } from "@/components/design-principles/design-principles-content";

export const metadata: Metadata = {
  title: "Design Principles (CRAP) - StyleKit",
  description:
    "Contrast, Repetition, Alignment, Proximity — the four design principles, taught with live before/after demos, a copyable self-review checklist, and minimal code.",
};

export default function DesignPrinciplesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <DesignPrinciplesContent />
      </main>
      <Footer />
    </div>
  );
}
