import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { z } from "zod";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limitParam = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const offsetParam = Number.parseInt(searchParams.get("offset") ?? "0", 10);
  const slug = searchParams.get("slug");
  const search = searchParams.get("search");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const limit = Number.isFinite(limitParam) ? limitParam : 20;
  const offset = Number.isFinite(offsetParam) ? offsetParam : 0;

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ comments: [], total: 0, limit, offset });
  }

  let query = sb
    .from("style_comments")
    .select("*", { count: "exact" });

  if (slug) {
    query = query.eq("style_slug", slug);
  }
  if (search) {
    query = query.ilike("content", `%${search}%`);
  }
  if (from) {
    query = query.gte("created_at", from);
  }
  if (to) {
    query = query.lte("created_at", to);
  }

  query = query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    comments: data ?? [],
    total: count ?? 0,
    limit,
    offset,
  });
}

const deleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(50),
});

export async function DELETE(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = deleteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { ids } = parsed.data;

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const { error } = await sb
    .from("style_comments")
    .delete()
    .in("id", ids);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  for (const id of ids) {
    await recordAdminAuditEvent(request, {
      action: "comment.delete",
      targetType: "comment",
      targetId: id,
      actor: access.actor,
      metadata: { count: ids.length },
    });
  }

  return NextResponse.json({ deleted: ids.length });
}
