import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VisualHierarchyContent } from "@/components/visual-hierarchy/visual-hierarchy-content";

export const metadata: Metadata = {
  title: "Visual Hierarchy - StyleKit",
  description:
    "Control where the eye goes first: an interactive lever controller (size, weight, color, space) that ranks elements by visual weight, plus copyable text-level tokens.",
};

export default function VisualHierarchyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <VisualHierarchyContent />
      </main>
      <Footer />
    </div>
  );
}
