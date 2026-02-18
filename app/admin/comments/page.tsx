import type { Metadata } from "next";
import { AdminCommentsContent } from "./_content";

export const metadata: Metadata = {
  title: "Comment Moderation - StyleKit Admin",
  description: "Review and manage user comments across all styles.",
};

export default function AdminCommentsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Comment Moderation</h1>
      <p className="text-muted mb-8">
        Review and manage user comments across all styles.
      </p>
      <AdminCommentsContent />
    </>
  );
}
