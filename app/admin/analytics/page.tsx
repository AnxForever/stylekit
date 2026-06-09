import type { Metadata } from "next";
import { AdminPage } from "@/components/admin/admin-page";
import { AnalyticsDashboard } from "./_content";

export const metadata: Metadata = {
  title: "Analytics Dashboard - StyleKit Admin",
  description: "View usage analytics, popular styles, and engagement metrics.",
};

export default function AdminAnalyticsPage() {
  return (
    <AdminPage
      title="Analytics Dashboard"
      description="Usage metrics, popular styles, engagement trends, and moderation trace in one operational view."
    >
      <AnalyticsDashboard />
    </AdminPage>
  );
}
