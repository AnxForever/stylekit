import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminCommentsContent } from "./_content";

export const metadata: Metadata = {
  title: "Comment Moderation - StyleKit Admin",
  description: "Review and manage user comments across all styles.",
};

export default function AdminCommentsPage() {
  return (
    <AdminPage
      title="Comment Moderation"
      description="Review, filter, and remove user comments across the style catalog."
    >
      <AdminCommentsContent />
    </AdminPage>
  );
}
