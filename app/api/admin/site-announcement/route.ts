import { NextResponse } from "next/server";
import { z } from "zod";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { clearSiteAnnouncementCache } from "@/lib/site-announcements";
import {
  getNextAnnouncementUpdatedAt,
  hasSameAnnouncementContent,
  SITE_ANNOUNCEMENT_SELECT_FIELDS,
  toAnnouncementWriteRow,
} from "@/lib/site-announcement-write";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const locales = ["zh-CN", "en"] as const;
const localeSchema = z.enum(locales);
const ctaHrefSchema = z.string().trim().max(500).refine(
  (value) => {
    if (!value) return true;
    if (value.startsWith("/") && !value.startsWith("//")) return true;
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  },
  "按钮链接必须是站内路径或 http(s) 链接",
);
const announcementSchema = z.object({
  locale: localeSchema,
  enabled: z.boolean(),
  title: z.string().trim().min(1).max(180),
  body: z.string().trim().max(1000),
  ctaLabel: z.string().trim().max(80).nullable().optional(),
  ctaHref: ctaHrefSchema.nullable().optional(),
  startsAt: z.string().datetime({ offset: true }).nullable().optional(),
  endsAt: z.string().datetime({ offset: true }).nullable().optional(),
  // Optional to keep existing clients compatible while allowing the admin UI
  // to guard drafts against concurrent edits from another tab or editor.
  expectedUpdatedAt: z.string().datetime({ offset: true }).nullable().optional(),
});

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase 未配置，无法读取站点公告。" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("site_announcements")
    .select("locale, enabled, title, body, cta_label, cta_href, starts_at, ends_at, updated_at")
    .in("locale", locales)
    .order("locale", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "站点公告数据表还不可用，请先执行 Supabase migration。" }, { status: 503 });
  }

  return NextResponse.json({ announcements: data ?? [] });
}

export async function PUT(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "请求内容不是有效 JSON。" }, { status: 400 });
  }

  const parsed = announcementSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "公告内容不完整或格式不正确。", issues: parsed.error.flatten() }, { status: 400 });
  }

  const startsAt = parsed.data.startsAt ? Date.parse(parsed.data.startsAt) : null;
  const endsAt = parsed.data.endsAt ? Date.parse(parsed.data.endsAt) : null;
  if (startsAt !== null && endsAt !== null && startsAt >= endsAt) {
    return NextResponse.json({ error: "结束时间必须晚于开始时间。" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase 未配置，无法保存站点公告。" }, { status: 503 });
  }

  const input = parsed.data;
  let data: Record<string, unknown> | null = null;
  let error: { message?: string } | null = null;

  if (!Object.hasOwn(input, "expectedUpdatedAt")) {
    // Preserve the existing write contract for callers that have not adopted
    // the optional revision guard yet.
    const result = await supabase
      .from("site_announcements")
      .upsert(
        toAnnouncementWriteRow(input, getNextAnnouncementUpdatedAt(null)),
        { onConflict: "locale" },
      )
      .select(SITE_ANNOUNCEMENT_SELECT_FIELDS)
      .single();
    data = result.data;
    error = result.error;
  } else {
    const expectedUpdatedAt = input.expectedUpdatedAt ?? null;
    const currentResult = await supabase
      .from("site_announcements")
      .select(SITE_ANNOUNCEMENT_SELECT_FIELDS)
      .eq("locale", input.locale)
      .maybeSingle();

    if (currentResult.error) {
      return NextResponse.json(
        { error: "读取站点公告版本失败，请稍后重试。" },
        { status: 502 },
      );
    }

    const current = currentResult.data;
    // A client can retry after a lost response. If its exact submitted
    // snapshot is already stored, acknowledge that snapshot without creating
    // another revision or changing the timestamp.
    if (current && hasSameAnnouncementContent(current, input)) {
      data = current;
    } else if ((current?.updated_at ?? null) !== expectedUpdatedAt) {
      return NextResponse.json(
        {
          error: "公告已被其他管理员更新。请检查服务器版本后再保存。",
          latestAnnouncement: current,
        },
        { status: 409 },
      );
    } else if (current) {
      const result = await supabase
        .from("site_announcements")
        .update(toAnnouncementWriteRow(input, getNextAnnouncementUpdatedAt(current.updated_at)))
        .eq("locale", input.locale)
        .eq("updated_at", expectedUpdatedAt)
        .select(SITE_ANNOUNCEMENT_SELECT_FIELDS)
        .maybeSingle();

      if (result.error) {
        error = result.error;
      } else if (result.data) {
        data = result.data;
      } else {
        const latestResult = await supabase
          .from("site_announcements")
          .select(SITE_ANNOUNCEMENT_SELECT_FIELDS)
          .eq("locale", input.locale)
          .maybeSingle();

        if (latestResult.error) {
          error = latestResult.error;
        } else if (latestResult.data && hasSameAnnouncementContent(latestResult.data, input)) {
          data = latestResult.data;
        } else {
          return NextResponse.json(
            {
              error: "公告已被其他管理员更新。请检查服务器版本后再保存。",
              latestAnnouncement: latestResult.data,
            },
            { status: 409 },
          );
        }
      }
    } else {
      const result = await supabase
        .from("site_announcements")
        .insert(toAnnouncementWriteRow(input, getNextAnnouncementUpdatedAt(null)))
        .select(SITE_ANNOUNCEMENT_SELECT_FIELDS)
        .maybeSingle();

      if (result.error || !result.data) {
        const latestResult = await supabase
          .from("site_announcements")
          .select(SITE_ANNOUNCEMENT_SELECT_FIELDS)
          .eq("locale", input.locale)
          .maybeSingle();

        if (latestResult.error) {
          error = latestResult.error;
        } else if (latestResult.data && hasSameAnnouncementContent(latestResult.data, input)) {
          data = latestResult.data;
        } else if (latestResult.data) {
          return NextResponse.json(
            {
              error: "公告已被其他管理员更新。请检查服务器版本后再保存。",
              latestAnnouncement: latestResult.data,
            },
            { status: 409 },
          );
        } else {
          error = result.error ?? { message: "公告 insert 未返回数据。" };
        }
      } else {
        data = result.data;
      }
    }
  }

  if (error || !data) {
    return NextResponse.json({ error: "保存站点公告失败，请检查 migration 和数据库连接。" }, { status: 502 });
  }

  clearSiteAnnouncementCache(parsed.data.locale);

  await recordAdminAuditEvent(request, {
    action: "site_announcement.update",
    targetType: "site_announcement",
    targetId: parsed.data.locale,
    actor: access.actor,
    metadata: { enabled: parsed.data.enabled },
  });

  return NextResponse.json({ announcement: data });
}
