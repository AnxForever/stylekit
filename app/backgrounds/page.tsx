import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackgroundsContent } from "@/components/backgrounds/backgrounds-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Backgrounds - StyleKit",
  description:
    "Browse 20+ CSS background patterns for your design system. Copy CSS or Tailwind classes instantly.",
};

export default function BackgroundsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <BackgroundsContent />
      </main>
      <Footer />
    </div>
  );
}
