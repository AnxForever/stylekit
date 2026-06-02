import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SupportContent } from "@/components/support/support-content";

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
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">Support</p>
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">Contact & Support</h1>
            <p className="text-lg text-muted leading-relaxed max-w-3xl">
              StyleKit currently handles support through public channels. Use the path that best matches your question so launch issues, product feedback, and maintenance support can be triaged quickly.
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 grid gap-10">
            <SupportContent />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
