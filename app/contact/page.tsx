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
        <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_35%)]">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted backdrop-blur">
                <Heart className="h-3 w-3" />
                Support
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl leading-tight mb-5">Contact & Support</h1>
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-3xl">
              StyleKit currently handles support through public channels. Use the path that best matches your question so launch issues, product feedback, and maintenance support can be triaged quickly.
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <SupportContent />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
