import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import dynamic from "next/dynamic";

export const metadata = {
  title: "提交风格",
  description: "提交你发现的优质设计风格，一起丰富 StyleKit 风格集合。",
};

const SubmissionWizard = dynamic(
  () =>
    import("@/components/submit/submission-wizard").then(
      (mod) => mod.SubmissionWizard
    ),
  {
    loading: () => (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    ),
  }
);

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <div className="flex items-center justify-end gap-3 text-sm">
            <span className="text-muted">或</span>
            <Link
              href="/submit/design-md"
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              粘贴 DESIGN.md →
            </Link>
          </div>
        </div>
        <SubmissionWizard />
      </main>
      <Footer />
    </div>
  );
}
