import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnalyticsDashboard } from "./_content";

export const metadata: Metadata = {
  title: "Analytics Dashboard - StyleKit Admin",
  description: "View usage analytics, popular styles, and engagement metrics.",
};

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted mb-8">
            Usage metrics, popular styles, and engagement trends.
          </p>
          <AnalyticsDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
