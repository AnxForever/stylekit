import type { Metadata } from "next";
import { SubmissionsReview } from "./_content";

export const metadata: Metadata = {
  title: "Review Submissions - StyleKit Admin",
  description: "Review and manage community-submitted styles.",
};

export default function AdminSubmissionsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Style Submissions</h1>
      <p className="text-muted mb-8">
        Review community-submitted styles. Approve to add to the catalog or reject with feedback.
      </p>
      <SubmissionsReview />
    </>
  );
}
