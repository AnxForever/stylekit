import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getAdminAuditEvents } from "@/lib/admin/audit-log";
import type { OperationsQueueItem } from "@/lib/admin/operations-queue";
import {
  isSupabaseConfigured,
  listSubmissionsSupabase,
} from "@/lib/submit/reviewer-supabase";
import { listSubmissions } from "@/lib/submit/reviewer";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const RECENT_WINDOW_DAYS = 7;

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 },
    );
  }

  const generatedAt = new Date().toISOString();
  const supabase = getSupabaseAdmin();
  const recentSince = new Date(
    Date.now() - RECENT_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  const [database, submissions, knowledge, support, comments, ratings, subscribers, audit] =
    await Promise.all([
      getDatabaseStatus(supabase),
      countRows(supabase, "submissions", { operator: "eq", column: "status", value: "pending" }),
      countRows(supabase, "knowledge_resources", {
        operator: "eq",
        column: "review_status",
        value: "pending",
      }),
      getSupportSignal(supabase),
      countRows(supabase, "style_comments", { operator: "gte", column: "created_at", value: recentSince }),
      countRows(supabase, "style_ratings", { operator: "gte", column: "created_at", value: recentSince }),
      countRows(supabase, "newsletter_subscribers"),
      getRecentAudit(),
    ]);

  const queueItems = await getOperationsQueue(
    supabase,
    knowledge,
    support.pending,
    submissions,
    recentSince,
    comments,
    ratings,
  );

  return NextResponse.json(
    {
      generatedAt,
      windowDays: RECENT_WINDOW_DAYS,
      database,
      queue: {
        pendingSubmissions: submissions,
        pendingKnowledgeReviews: knowledge,
        unpublishedSupport: support.unpublished,
        items: queueItems,
      },
      signals: {
        recentComments: comments,
        recentRatings: ratings,
        newsletterSubscribers: subscribers,
        publishedSupport: support.published,
      },
      latestSupport: support.latest,
      recentAudit: audit,
      runtime: {
        nodeVersion: process.version,
        uptime: process.uptime(),
        memoryRss: process.memoryUsage().rss,
      },
    },
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    },
  );
}

type SupabaseAdmin = ReturnType<typeof getSupabaseAdmin>;
type CountFilter = {
  operator: "eq" | "gte";
  column: string;
  value: string;
};

async function getDatabaseStatus(supabase: SupabaseAdmin) {
  if (!supabase) {
    return { status: "not_configured" as const };
  }

  const { error } = await supabase
    .from("analytics_events")
    .select("id", { head: true, count: "exact" });

  return { status: error ? ("degraded" as const) : ("connected" as const) };
}

async function countRows(
  supabase: SupabaseAdmin,
  table: string,
  filter?: CountFilter,
): Promise<number | null> {
  if (!supabase) return null;

  try {
    let query = supabase.from(table).select("id", { head: true, count: "exact" });
    if (filter?.operator === "eq") query = query.eq(filter.column, filter.value);
    if (filter?.operator === "gte") query = query.gte(filter.column, filter.value);
    const { count, error } = await query;
    return error ? null : count ?? 0;
  } catch {
    return null;
  }
}

async function getSupportSignal(supabase: SupabaseAdmin) {
  if (!supabase) {
    return {
      published: null,
      unpublished: null,
      latest: [] as SupportSignal[],
      pending: [] as SupportSignal[],
    };
  }

  try {
    const [publishedResult, unpublishedResult, latestResult, pendingResult] = await Promise.all([
      supabase
        .from("support_acknowledgments")
        .select("id", { head: true, count: "exact" })
        .eq("published", true),
      supabase
        .from("support_acknowledgments")
        .select("id", { head: true, count: "exact" })
        .eq("published", false),
      supabase
        .from("support_acknowledgments")
        .select("id, donated_on, donor_label, amount, published")
        .order("donated_on", { ascending: false })
        .limit(4),
      supabase
        .from("support_acknowledgments")
        .select("id, donated_on, donor_label, amount, published, created_at")
        .eq("published", false)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    return {
      published: publishedResult.error ? null : publishedResult.count ?? 0,
      unpublished: unpublishedResult.error ? null : unpublishedResult.count ?? 0,
      latest: latestResult.error ? [] : ((latestResult.data ?? []) as SupportSignal[]),
      pending: pendingResult.error ? [] : ((pendingResult.data ?? []) as SupportSignal[]),
    };
  } catch {
    return {
      published: null,
      unpublished: null,
      latest: [] as SupportSignal[],
      pending: [] as SupportSignal[],
    };
  }
}

interface SupportSignal {
  id: string;
  donated_on: string;
  donor_label: string;
  amount: string | null;
  published: boolean;
  created_at?: string;
}

async function getOperationsQueue(
  supabase: SupabaseAdmin,
  pendingKnowledgeReviews: number | null,
  pendingSupport: SupportSignal[],
  pendingSubmissions: number | null,
  recentSince: string,
  recentComments: number | null,
  recentRatings: number | null,
): Promise<OperationsQueueItem[]> {
  const items: OperationsQueueItem[] = [];

  if (pendingKnowledgeReviews !== null && pendingKnowledgeReviews > 0) {
    items.push({
      id: "knowledge-review",
      kind: "knowledge",
      title: "知识库待复核",
      summary: `${pendingKnowledgeReviews} 条资料需要确认来源与许可。`,
      createdAt: new Date().toISOString(),
      href: "/admin/knowledge",
      actionLabel: "打开审核",
      tone: "warning",
    });
  }

  for (const item of pendingSupport) {
    items.push({
      id: `support:${item.id}`,
      kind: "support",
      title: `赞助鸣谢 · ${item.donor_label || "匿名支持者"}`,
      summary: item.amount ? `金额 ${item.amount}，截图已上传但尚未公开。` : "截图已上传但尚未公开。",
      createdAt: item.created_at ?? item.donated_on,
      href: "/admin/support",
      actionLabel: "查看鸣谢",
      tone: "success",
    });
  }

  if (pendingSubmissions === null || pendingSubmissions > 0) {
    try {
      const submissions = isSupabaseConfigured()
        ? await listSubmissionsSupabase("pending")
        : await listSubmissions("pending");

      for (const submission of submissions.slice(0, 5)) {
        const formData = submission.formData as { name?: unknown };
        const name = typeof formData.name === "string" && formData.name.trim()
          ? formData.name.trim()
          : submission.slug;
        items.push({
          id: `submission:${submission.id}`,
          kind: "submission",
          title: `投稿待审核 · ${name}`,
          summary: submission.authorName
            ? `${submission.authorName} 提交于 ${formatQueueDate(submission.submittedAt)}。`
            : `社区投稿提交于 ${formatQueueDate(submission.submittedAt)}。`,
          createdAt: submission.submittedAt,
          href: "/admin/submissions?status=pending",
          actionLabel: "打开投稿",
          tone: "warning",
        });
      }
    } catch {
      // The operations page should still load when the optional submissions store is unavailable.
    }
  }

  if (supabase && (recentComments !== 0 || recentRatings !== 0)) {
    const [commentsResult, ratingsResult] = await Promise.all([
      recentComments === 0
        ? Promise.resolve({ data: [], error: null })
        : supabase
            .from("style_comments")
            .select("id, style_slug, content, created_at")
            .gte("created_at", recentSince)
            .order("created_at", { ascending: false })
            .limit(5),
      recentRatings === 0
        ? Promise.resolve({ data: [], error: null })
        : supabase
            .from("style_ratings")
            .select("id, style_slug, rating, created_at")
            .gte("created_at", recentSince)
            .order("created_at", { ascending: false })
            .limit(5),
    ]);

    if (!commentsResult.error) {
      for (const comment of commentsResult.data ?? []) {
        const excerpt = typeof comment.content === "string"
          ? comment.content.trim().replace(/\s+/g, " ").slice(0, 72)
          : "查看这条评论。";
        items.push({
          id: `comment:${comment.id}`,
          kind: "comment",
          title: `新评论 · ${comment.style_slug}`,
          summary: excerpt || "查看这条评论。",
          createdAt: comment.created_at,
          href: "/admin/comments",
          actionLabel: "查看评论",
          tone: "info",
        });
      }
    }

    if (!ratingsResult.error) {
      for (const rating of ratingsResult.data ?? []) {
        items.push({
          id: `rating:${rating.id}`,
          kind: "rating",
          title: `新评分 · ${rating.style_slug}`,
          summary: `收到 ${rating.rating}/5 评分，可在评分管理中查看。`,
          createdAt: rating.created_at,
          href: "/admin/ratings",
          actionLabel: "查看评分",
          tone: "info",
        });
      }
    }
  }

  return items
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 12);
}

function formatQueueDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "近期" : date.toLocaleDateString("zh-CN");
}

async function getRecentAudit() {
  const result = await getAdminAuditEvents({ limit: 5, days: RECENT_WINDOW_DAYS });
  return result.events.map((event) => ({
    id: event.id,
    action: event.action,
    targetType: event.targetType,
    targetId: event.targetId ?? null,
    createdAt: event.createdAt,
  }));
}
