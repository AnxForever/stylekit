import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";

const LEGACY_USER_SESSION_PREFIX = "user:";

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface ProfileRating {
  id: string;
  style_slug: string;
  rating: number;
  created_at: string;
}

function isMissingUserIdColumnError(error: DbErrorLike | null | undefined): boolean {
  const code = error?.code ?? null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }

  const message = `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
  return message.includes("user_id");
}

function buildLegacySessionValues(userId: string): string[] {
  return [`${LEGACY_USER_SESSION_PREFIX}${userId}`, userId];
}

function mergeRatings(
  modernRatings: ProfileRating[] | null,
  legacyRatings: ProfileRating[] | null
): ProfileRating[] {
  const latestBySlug = new Map<string, ProfileRating>();

  for (const item of [...(modernRatings ?? []), ...(legacyRatings ?? [])]) {
    if (!item?.style_slug) {
      continue;
    }

    const existing = latestBySlug.get(item.style_slug);
    if (!existing || item.created_at > existing.created_at) {
      latestBySlug.set(item.style_slug, item);
    }
  }

  return Array.from(latestBySlug.values())
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 50);
}

export async function GET() {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: true, ratings: [] });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const modernResult = await sb
    .from("style_ratings")
    .select("id, style_slug, rating, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (modernResult.error && !isMissingUserIdColumnError(modernResult.error as DbErrorLike)) {
    return NextResponse.json(
      { success: false, error: "Failed to load ratings" },
      { status: 500 }
    );
  }

  const legacyResult = await sb
    .from("style_ratings")
    .select("id, style_slug, rating, created_at")
    .in("session_id", buildLegacySessionValues(user.id))
    .order("created_at", { ascending: false })
    .limit(50);

  if (legacyResult.error && modernResult.error) {
    return NextResponse.json(
      { success: false, error: "Failed to load ratings" },
      { status: 500 }
    );
  }

  const ratings = mergeRatings(
    modernResult.error ? [] : ((modernResult.data ?? []) as ProfileRating[]),
    legacyResult.error ? [] : ((legacyResult.data ?? []) as ProfileRating[])
  );

  return NextResponse.json({ success: true, ratings });
}
