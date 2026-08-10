import { NextResponse } from "next/server";
import { z } from "zod";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
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

  const { data, error } = await supabase
    .from("site_announcements")
    .upsert(
      {
        locale: parsed.data.locale,
        enabled: parsed.data.enabled,
        title: parsed.data.title,
        body: parsed.data.body,
        cta_label: parsed.data.ctaLabel || null,
        cta_href: parsed.data.ctaHref || null,
        starts_at: parsed.data.startsAt || null,
        ends_at: parsed.data.endsAt || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "locale" },
    )
    .select("locale, enabled, title, body, cta_label, cta_href, starts_at, ends_at, updated_at")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "保存站点公告失败，请检查 migration 和数据库连接。" }, { status: 502 });
  }

  await recordAdminAuditEvent(request, {
    action: "site_announcement.update",
    targetType: "site_announcement",
    targetId: parsed.data.locale,
    actor: access.actor,
    metadata: { enabled: parsed.data.enabled },
  });

  return NextResponse.json({ announcement: data });
}
