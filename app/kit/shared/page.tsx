import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SharedKitContent } from "./_content";

export const metadata: Metadata = {
  title: "Shared Design Kit | StyleKit",
  description:
    "A design kit shared from StyleKit: styles, animations and font pairings composed into one direction. Import it into your own kit or export it directly.",
  robots: { index: false, follow: true },
};

export default function SharedKitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense>
          <SharedKitContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
