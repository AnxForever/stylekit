import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminPage } from "@/components/admin/admin-page";
import {
  DashboardSkeleton,
  type AnalyticsView,
} from "./_content";
import { AnalyticsOverviewPage } from "./_overview";
import { AnalyticsTrafficPage } from "./_traffic";
import type { TrafficSnapshots } from "./_traffic";
import { AnalyticsUsersPage } from "./_users";
import { AnalyticsContentPage } from "./_content-page";
import { AnalyticsAuditPage } from "./_audit-page";
import type { AdminAuditData } from "@/lib/swr";
import type { AnalyticsContent, AnalyticsEvents, AnalyticsOverview, AnalyticsRange, AnalyticsRegistrations } from "@/lib/admin/analytics-api-contract";

const PAGE_COPY: Record<AnalyticsView, { title: string; description: string }> = {
  overview: {
    title: "数据概览",
    description: "先看核心趋势和转化信号，再进入对应分区调查细节。",
  },
  traffic: {
    title: "流量分析",
    description: "查看访客从哪里进入、浏览哪些页面，以及他们使用什么设备。",
  },
  content: {
    title: "内容表现",
    description: "查看热门风格、产品行为以及评论、评分、收藏和投稿状态。",
  },
  users: {
    title: "用户与转化",
    description: "查看独立访客、深度访问、注册趋势和访问到注册的转化。",
  },
  audit: {
    title: "操作审计",
    description: "检索投稿、赞助公告和内容管理操作，并导出符合筛选条件的记录。",
  },
};

export function createAnalyticsMetadata(view: AnalyticsView): Metadata {
  const copy = PAGE_COPY[view];
  return {
    title: `${copy.title} - StyleKit 管理后台`,
    description: copy.description,
  };
}

export function AnalyticsPage({
  view,
  initialRange = "7d",
  initialOverview,
  initialTraffic,
  initialContent,
  initialEvents,
  initialRegistrations,
  initialAudit,
}: {
  view: AnalyticsView;
  initialRange?: AnalyticsRange;
  initialOverview?: AnalyticsOverview;
  initialTraffic?: TrafficSnapshots;
  initialContent?: AnalyticsContent;
  initialEvents?: AnalyticsEvents;
  initialRegistrations?: AnalyticsRegistrations;
  initialAudit?: AdminAuditData;
}) {
  const copy = PAGE_COPY[view];

  return (
    <AdminPage eyebrow="网站洞察" title={copy.title} description={copy.description}>
      <Suspense fallback={<DashboardSkeleton />}>
        {view === "overview" ? (
          <AnalyticsOverviewPage initialRange={initialRange} initialData={initialOverview} />
        ) : view === "traffic" ? (
          <AnalyticsTrafficPage initialRange={initialRange} initialData={initialTraffic} />
        ) : view === "users" ? (
          <AnalyticsUsersPage initialRange={initialRange} initialOverview={initialOverview} initialRegistrations={initialRegistrations} />
        ) : view === "content" ? (
          <AnalyticsContentPage initialRange={initialRange} initialData={initialContent} initialEvents={initialEvents} />
        ) : (
          <AnalyticsAuditPage initialData={initialAudit} />
        )}
      </Suspense>
    </AdminPage>
  );
}
