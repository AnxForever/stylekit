import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminUsersContent } from "./_content";

export const metadata: Metadata = {
  title: "User Management - StyleKit Admin",
  description: "View user activity and manage user-generated content.",
};

export default function AdminUsersPage() {
  return (
    <AdminPage
      title="User Management"
      description="Search users, inspect activity counts, manage profile titles, and remove user-generated content."
    >
      <AdminUsersContent />
    </AdminPage>
  );
}
