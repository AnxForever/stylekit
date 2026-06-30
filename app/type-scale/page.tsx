import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TypeScaleContent } from "@/components/type-scale/type-scale-content";

export const metadata: Metadata = {
  title: "Type Scale - StyleKit",
  description:
    "Interactive modular type scale with fluid (clamp) typography: pick a base and ratio, preview every step, and copy CSS variables or Tailwind v4 tokens.",
};

export default function TypeScalePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <TypeScaleContent />
      </main>
      <Footer />
    </div>
  );
}
