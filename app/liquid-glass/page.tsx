import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LiquidGlassLab } from "@/components/liquid-glass/liquid-glass-lab";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Liquid Glass Lab — Real SVG Refraction, Not Just Blur",
  description:
    "Apple-style liquid glass built with SVG displacement filters (feImage, feTurbulence, feDisplacementMap). The backdrop bends, magnifies, and splits into rainbow fringes at the rim. Tune light, refraction, depth, dispersion, frost, and spread live.",
};

export default function LiquidGlassPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <LiquidGlassLab />
      </main>
      <Footer />
    </div>
  );
}
