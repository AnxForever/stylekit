import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { SubmissionsReview } from "./_content";

export const metadata: Metadata = {
  title: "Review Submissions - StyleKit Admin",
  description: "Review and manage community-submitted styles.",
};

export default function AdminSubmissionsPage() {
  return (
    <AdminPage
      title="Style Submissions"
      description="Review community-submitted styles, edit metadata, archive approved entries, or reject with feedback."
    >
      <SubmissionsReview />
    </AdminPage>
  );
}
