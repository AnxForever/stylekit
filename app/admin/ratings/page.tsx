import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminRatingsContent } from "./_content";

export const metadata: Metadata = {
  title: "Rating Management - StyleKit Admin",
  description: "Monitor and manage style ratings.",
};

export default function AdminRatingsPage() {
  return (
    <AdminPage
      title="Rating Management"
      description="Monitor style ratings, inspect distribution patterns, and remove suspicious feedback."
    >
      <AdminRatingsContent />
    </AdminPage>
  );
}
