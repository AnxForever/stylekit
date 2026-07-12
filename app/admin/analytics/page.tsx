import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminPage } from "@/components/admin/admin-page";
import { AnalyticsDashboard, DashboardSkeleton } from "./_content";

export const metadata: Metadata = {
  title: "网站数据分析 - StyleKit 管理后台",
  description: "查看流量、浏览路径、注册情况和产品使用行为。",
};

export default function AdminAnalyticsPage() {
  return (
    <AdminPage
      eyebrow="网站洞察"
      title="数据分析"
      description="了解谁在访问 StyleKit、他们浏览了什么、从哪里进入，以及访问流量是否转化为注册用户。"
    >
      <Suspense fallback={<DashboardSkeleton />}>
        <AnalyticsDashboard />
      </Suspense>
    </AdminPage>
  );
}
