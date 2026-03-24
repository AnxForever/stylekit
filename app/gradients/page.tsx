import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GradientsContent } from "@/components/gradients/gradients-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Gradients - StyleKit",
  description:
    "Browse 40+ beautiful gradient presets for your design system. Copy CSS or Tailwind classes instantly.",
};

export default function GradientsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <GradientsContent />
      </main>
      <Footer />
    </div>
  );
}
