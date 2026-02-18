import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { stylesMeta } from "@/lib/styles/meta";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") ?? "name";
  const order = searchParams.get("order") ?? "desc";
  const search = searchParams.get("search");

  // Filter by category
  let filtered = [...stylesMeta];
  if (category) {
    filtered = filtered.filter((s) => s.category === category);
  }

  // Filter by search
  if (search && search.trim().length > 0) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.slug.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q)
    );
  }

  // Fetch dynamic stats from Supabase (if available)
  const sb = getSupabaseAdmin();

  const viewsMap = new Map<string, number>();
  const ratingsMap = new Map<string, { sum: number; count: number }>();
  const commentsMap = new Map<string, number>();
  const favoritesMap = new Map<string, number>();

  if (sb) {
    const [viewsRes, ratingsRes, commentsRes, favoritesRes] =
      await Promise.all([
        sb
          .from("analytics_events")
          .select("style_slug")
          .eq("event_type", "style_view")
          .limit(10000),
        sb.from("style_ratings").select("style_slug, rating").limit(10000),
        sb.from("style_comments").select("style_slug").limit(10000),
        sb.from("style_favorites").select("style_slug").limit(10000),
      ]);

    // Group views by slug
    if (viewsRes.data) {
      for (const row of viewsRes.data) {
        const slug = row.style_slug as string;
        viewsMap.set(slug, (viewsMap.get(slug) ?? 0) + 1);
      }
    }

    // Group ratings by slug
    if (ratingsRes.data) {
      for (const row of ratingsRes.data) {
        const slug = row.style_slug as string;
        const rating = row.rating as number;
        const existing = ratingsMap.get(slug) ?? { sum: 0, count: 0 };
        existing.sum += rating;
        existing.count += 1;
        ratingsMap.set(slug, existing);
      }
    }

    // Group comments by slug
    if (commentsRes.data) {
      for (const row of commentsRes.data) {
        const slug = row.style_slug as string;
        commentsMap.set(slug, (commentsMap.get(slug) ?? 0) + 1);
      }
    }

    // Group favorites by slug
    if (favoritesRes.data) {
      for (const row of favoritesRes.data) {
        const slug = row.style_slug as string;
        favoritesMap.set(slug, (favoritesMap.get(slug) ?? 0) + 1);
      }
    }
  }

  // Merge static metadata with dynamic stats
  const styles = filtered.map((style) => {
    const ratingData = ratingsMap.get(style.slug);
    return {
      slug: style.slug,
      name: style.name,
      nameEn: style.nameEn,
      category: style.category,
      tags: style.tags,
      colors: style.colors,
      stats: {
        views: viewsMap.get(style.slug) ?? 0,
        avgRating:
          ratingData && ratingData.count > 0
            ? Math.round((ratingData.sum / ratingData.count) * 10) / 10
            : 0,
        totalRatings: ratingData?.count ?? 0,
        totalComments: commentsMap.get(style.slug) ?? 0,
        totalFavorites: favoritesMap.get(style.slug) ?? 0,
      },
    };
  });

  // Sort
  const sortMultiplier = order === "asc" ? 1 : -1;
  styles.sort((a, b) => {
    switch (sort) {
      case "views":
        return (a.stats.views - b.stats.views) * sortMultiplier;
      case "rating":
        return (a.stats.avgRating - b.stats.avgRating) * sortMultiplier;
      case "comments":
        return (a.stats.totalComments - b.stats.totalComments) * sortMultiplier;
      case "favorites":
        return (a.stats.totalFavorites - b.stats.totalFavorites) * sortMultiplier;
      case "name":
      default:
        return a.nameEn.localeCompare(b.nameEn) * sortMultiplier;
    }
  });

  return NextResponse.json({ styles });
}
