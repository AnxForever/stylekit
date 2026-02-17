import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SubmissionsReview } from "./_content";

export const metadata: Metadata = {
  title: "Review Submissions - StyleKit Admin",
  description: "Review and manage community-submitted styles.",
};

export default function AdminSubmissionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <h1 className="text-3xl font-bold mb-2">Style Submissions</h1>
          <p className="text-muted mb-8">
            Review community-submitted styles. Approve to add to the catalog or reject with feedback.
          </p>
          <SubmissionsReview />
        </div>
      </main>
      <Footer />
    </div>
  );
}
