import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ColorTheoryContent } from "@/components/color-theory/color-theory-content";

export const metadata: Metadata = {
  title: "Color Theory - StyleKit",
  description:
    "Interactive color theory: the HSL model, a harmony generator, a WCAG contrast checker, and a practical usage guide for designers and developers.",
};

export default function ColorTheoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ColorTheoryContent />
      </main>
      <Footer />
    </div>
  );
}
