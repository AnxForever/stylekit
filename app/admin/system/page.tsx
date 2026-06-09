import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminSystemContent } from "./_content";

export const metadata: Metadata = {
  title: "System Overview - StyleKit Admin",
  description: "Service health, database status, and runtime information.",
};

export default function AdminSystemPage() {
  return (
    <AdminPage
      title="System Overview"
      description="Check service health, Supabase connectivity, table state, runtime information, and admin configuration."
    >
      <AdminSystemContent />
    </AdminPage>
  );
}
