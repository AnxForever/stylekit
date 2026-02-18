import type { Metadata } from "next";
import { AdminUsersContent } from "./_content";

export const metadata: Metadata = {
  title: "User Management - StyleKit Admin",
  description: "View user activity and manage user-generated content.",
};

export default function AdminUsersPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">User Management</h1>
      <p className="text-muted mb-8">
        View user activity and manage user-generated content.
      </p>
      <AdminUsersContent />
    </>
  );
}
