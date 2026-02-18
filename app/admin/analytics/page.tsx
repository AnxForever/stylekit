import type { Metadata } from "next";
import { AnalyticsDashboard } from "./_content";

export const metadata: Metadata = {
  title: "Analytics Dashboard - StyleKit Admin",
  description: "View usage analytics, popular styles, and engagement metrics.",
};

export default function AdminAnalyticsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
      <p className="text-muted mb-8">
        Usage metrics, popular styles, and engagement trends.
      </p>
      <AnalyticsDashboard />
    </>
  );
}
