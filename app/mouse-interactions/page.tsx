import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MouseInteractionsContent } from "@/components/mouse-interactions/mouse-interactions-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Cursor Lab — Pointer Interactions by Design Style",
  description:
    "An interactive lab where the same cursor takes on three different characters across Neo-Brutalist, Glassmorphism, and Editorial design languages. Magnetic CTA, drag physics, ambient aura, parallax depth, and serif repulsion.",
};

export default function MouseInteractionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <MouseInteractionsContent />
      </main>
      <Footer />
    </div>
  );
}
