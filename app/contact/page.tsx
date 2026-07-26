import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SupportContent } from "@/components/support/support-content";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "Where to ask questions, report bugs, and support ongoing StyleKit maintenance.",
  openGraph: {
    title: "Contact & Support | StyleKit",
    description:
      "Where to ask questions, report bugs, and support ongoing StyleKit maintenance.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border/80 py-4">
              <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                <Heart className="h-3 w-3" />
                Support
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                SK / Correspondence
              </p>
            </div>
            <div className="py-12 md:py-16">
              <h1 className="text-4xl leading-tight md:text-5xl">Contact & Support</h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                StyleKit currently handles support through public channels. Use the path that best matches your question so launch issues, product feedback, and maintenance support can be triaged quickly.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <SupportContent />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
