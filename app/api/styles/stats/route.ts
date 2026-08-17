import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getUsageStats } from "@/lib/analytics";
import {
  emptyStyleStatsEntry,
  type StyleStatsEntry,
  type StyleStatsPayload,
} from "@/lib/styles/catalog-stats";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";

/**
 * Public aggregate signals per style: usage counters from the in-process
 * tracker plus favorite counts and rating summaries from Supabase.
 *
 * Only aggregates are exposed - never session ids, user ids, or timestamps -
 * so the catalog can offer popularity sorting without leaking who liked what.
 */

// Route handlers are dynamic by default today; stay explicit so a future
// Cache Components rollout cannot prerender these counters at build time.
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 5 * 60 * 1000;
// Favorites are aggregated in JS because the row count is small (hundreds).
// If it ever approaches this ceiling, move the group-by into a Postgres view
// next to style_rating_summary instead of raising the limit.
const MAX_FAVORITE_ROWS = 50_000;
const FAVORITES_TABLE_CANDIDATES = ["user_favorites", "style_favorites"] as const;

interface CacheEntry {
  payload: StyleStatsPayload;
  expiresAt: number;
}

let cache: CacheEntry | null = null;

function readUsageSignals(stats: Record<string, StyleStatsEntry>): void {
  const usage = getUsageStats();

  for (const [slug, entry] of Object.entries(usage.styles)) {
    const target = stats[slug] ?? emptyStyleStatsEntry();
    target.views = entry.pageViews;
    target.usage = entry.total;
    stats[slug] = target;
  }
}

async function readFavoriteCounts(
  sb: SupabaseClient,
  tableName: string
): Promise<Record<string, number> | null> {
  const { data, error } = await sb
    .from(tableName)
    .select("style_slug")
    .limit(MAX_FAVORITE_ROWS);

  if (error) {
    // A missing legacy table is expected on fresh databases; treat it as "no
    // rows here" rather than failing the whole endpoint.
    return null;
  }

  const counts: Record<string, number> = {};
  for (const row of (data ?? []) as { style_slug?: string | null }[]) {
    const slug = row.style_slug;
    if (typeof slug !== "string" || slug.length === 0) continue;
    counts[slug] = (counts[slug] ?? 0) + 1;
  }

  return counts;
}

async function readRatingSummaries(
  sb: SupabaseClient
): Promise<{ slug: string; averageRating: number; totalRatings: number }[] | null> {
  const { data, error } = await sb
    .from("style_rating_summary")
    .select("style_slug, average_rating, total_ratings");

  if (error) return null;

  const rows = (data ?? []) as {
    style_slug?: string | null;
    average_rating?: number | string | null;
    total_ratings?: number | string | null;
  }[];

  return rows
    .filter((row): row is typeof row & { style_slug: string } =>
      typeof row.style_slug === "string" && row.style_slug.length > 0
    )
    .map((row) => ({
      slug: row.style_slug,
      averageRating: Number(row.average_rating ?? 0),
      totalRatings: Number(row.total_ratings ?? 0),
    }));
}

export async function buildStyleStats(): Promise<StyleStatsPayload> {
  const stats: Record<string, StyleStatsEntry> = {};
  const degraded: string[] = [];

  readUsageSignals(stats);

  if (!isSupabaseConfigured()) {
    degraded.push("favorites", "ratings");
    return {
      generatedAt: new Date().toISOString(),
      degraded,
      stats,
    };
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const [favoriteResults, ratingRows] = await Promise.all([
    Promise.all(
      FAVORITES_TABLE_CANDIDATES.map((tableName) =>
        readFavoriteCounts(sb, tableName)
      )
    ),
    readRatingSummaries(sb),
  ]);

  if (favoriteResults.every((result) => result === null)) {
    degraded.push("favorites");
  } else {
    for (const counts of favoriteResults) {
      if (!counts) continue;
      for (const [slug, count] of Object.entries(counts)) {
        const target = stats[slug] ?? emptyStyleStatsEntry();
        target.favorites += count;
        stats[slug] = target;
      }
    }
  }

  if (ratingRows === null) {
    degraded.push("ratings");
  } else {
    for (const row of ratingRows) {
      const target = stats[row.slug] ?? emptyStyleStatsEntry();
      target.averageRating = row.averageRating;
      target.totalRatings = row.totalRatings;
      stats[row.slug] = target;
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    degraded,
    stats,
  };
}

export async function GET() {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return NextResponse.json(cache.payload, {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
    });
  }

  const payload = await buildStyleStats();
  cache = { payload, expiresAt: now + CACHE_TTL_MS };

  return NextResponse.json(payload, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
  });
}
