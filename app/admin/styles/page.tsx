import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminStylesContent } from "./_content";

export const metadata: Metadata = {
  title: "Style Overview - StyleKit Admin",
  description: "Aggregated engagement metrics for all styles.",
};

export default function AdminStylesPage() {
  return (
    <AdminPage
      title="Style Overview"
      description="Scan style catalog performance by views, ratings, comments, favorites, and category."
    >
      <AdminStylesContent />
    </AdminPage>
  );
}
