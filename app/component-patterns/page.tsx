import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ComponentPatternsContent } from "@/components/component-patterns/component-patterns-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Reusable UI Component Patterns",
  description:
    "Curated component pattern gallery for breadcrumbs, accordions, tabs, pagination, and sidebar navigation. Browse reusable UI directions sourced from StyleKit showcases.",
};

export default function ComponentPatternsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ComponentPatternsContent />
      </main>
      <Footer />
    </div>
  );
}
