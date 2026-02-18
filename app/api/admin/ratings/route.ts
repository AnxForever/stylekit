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
  const ratingParam = searchParams.get("rating");
  const anomalies = searchParams.get("anomalies") === "true";

  const limit = Number.isFinite(limitParam) ? limitParam : 20;
  const offset = Number.isFinite(offsetParam) ? offsetParam : 0;
  const ratingFilter = ratingParam
    ? Number.parseInt(ratingParam, 10)
    : null;

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({
      ratings: [],
      total: 0,
      limit,
      offset,
      distribution: [],
    });
  }

  // Anomaly detection: find session_ids with >= 5 ratings on the same style
  let anomalousSessionIds: string[] = [];
  if (anomalies) {
    const { data: allRatings } = await sb
      .from("style_ratings")
      .select("session_id, style_slug");

    if (allRatings && allRatings.length > 0) {
      const counts = new Map<string, number>();
      for (const r of allRatings) {
        if (!r.session_id) continue;
        const key = `${r.session_id}::${r.style_slug}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
      const flaggedSessions = new Set<string>();
      for (const [key, count] of counts) {
        if (count >= 5) {
          flaggedSessions.add(key.split("::")[0]);
        }
      }
      anomalousSessionIds = [...flaggedSessions];
    }

    if (anomalousSessionIds.length === 0) {
      return NextResponse.json({
        ratings: [],
        total: 0,
        limit,
        offset,
        distribution: [],
      });
    }
  }

  // Main query
  let query = sb
    .from("style_ratings")
    .select("*", { count: "exact" });

  if (slug) {
    query = query.eq("style_slug", slug);
  }
  if (ratingFilter !== null && ratingFilter >= 1 && ratingFilter <= 5) {
    query = query.eq("rating", ratingFilter);
  }
  if (anomalies && anomalousSessionIds.length > 0) {
    query = query.in("session_id", anomalousSessionIds);
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

  // Distribution query
  let distQuery = sb
    .from("style_ratings")
    .select("rating");

  if (slug) {
    distQuery = distQuery.eq("style_slug", slug);
  }

  const { data: distData } = await distQuery;

  const distMap = new Map<number, number>();
  for (let i = 1; i <= 5; i++) {
    distMap.set(i, 0);
  }
  if (distData) {
    for (const row of distData) {
      const r = row.rating;
      if (r >= 1 && r <= 5) {
        distMap.set(r, (distMap.get(r) ?? 0) + 1);
      }
    }
  }
  const distribution = Array.from(distMap.entries()).map(([rating, cnt]) => ({
    rating,
    count: cnt,
  }));

  return NextResponse.json({
    ratings: data ?? [],
    total: count ?? 0,
    limit,
    offset,
    distribution,
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
    .from("style_ratings")
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
      action: "rating.delete",
      targetType: "rating",
      targetId: id,
      actor: access.actor,
      metadata: { count: ids.length },
    });
  }

  return NextResponse.json({ deleted: ids.length });
}
