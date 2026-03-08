import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import dynamic from "next/dynamic";

export const metadata = {
  title: "提交风格",
  description: "提交你发现的优质设计风格，一起丰富 StyleKit 风格集合。",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top"}/submit`,
  },
  robots: {
    index: false,
    follow: false,
  },
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
        <SubmissionWizard />
      </main>
      <Footer />
    </div>
  );
}
