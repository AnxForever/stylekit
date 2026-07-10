import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ShadowsContent } from "@/components/shadows/shadows-content";

export const metadata: Metadata = {
  title: "CSS Box Shadow Presets",
  description:
    "Browse 30+ box-shadow presets for your design system. From soft to hard, colored to glow. Copy CSS or Tailwind instantly.",
};

export default function ShadowsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ShadowsContent />
      </main>
      <Footer />
    </div>
  );
}
