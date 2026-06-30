import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LearnContent } from "@/components/learn/learn-content";

export const metadata: Metadata = {
  title: "Learn — Frontend Foundations - StyleKit",
  description:
    "The visual system of the front end on a single page: color theory, typography, type scale, spacing, design principles (CRAP), and visual hierarchy — interactive, with the why behind each.",
};

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <LearnContent />
      </main>
      <Footer />
    </div>
  );
}
