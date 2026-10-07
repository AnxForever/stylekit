import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileDesignContent } from "@/components/mobile/mobile-design-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mobile UI Design — Patterns & Open-Source Components",
  description:
    "Explore interactive mobile design patterns and choose open-source components for React, Vue, React Native, and SwiftUI, including ChunUI. Compare platform fit, licenses, and integration constraints.",
};

export default function MobileDesignPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MobileDesignContent />
      </main>
      <Footer />
    </div>
  );
}
