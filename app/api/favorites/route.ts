import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugSchema = z.string().regex(SLUG_RE);
const FAVORITES_TABLE_CANDIDATES = ["user_favorites", "style_favorites"] as const;
const LEGACY_USER_SESSION_PREFIX = "user:";

export async function GET(request: Request) {
  return handleGetWithRequest(request);
}

async function handleGetWithRequest(request: Request) {
  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: true, favorites: [] });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const favorites = new Set<string>();

  for (const tableName of FAVORITES_TABLE_CANDIDATES) {
    try {
      const slugs = await readFavoriteSlugsForUser(sb, tableName, user.id);
      if (slugs === null) {
        continue;
      }
      for (const slug of slugs) {
        favorites.add(slug);
      }
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to load favorites" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    favorites: Array.from(favorites),
  });
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const slug = slugSchema.parse(body.slug);

    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let inserted = false;

    for (const tableName of FAVORITES_TABLE_CANDIDATES) {
      try {
        const didInsert = await insertFavoriteForUser(sb, tableName, user.id, slug);
        if (didInsert) {
          inserted = true;
        }
      } catch {
        if (!inserted) {
          return NextResponse.json(
            { success: false, error: "Failed to add favorite" },
            { status: 500 }
          );
        }
      }
    }

    if (!inserted) {
      return NextResponse.json(
        { success: false, error: "Failed to add favorite" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = slugSchema.parse(searchParams.get("slug"));

    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let removed = false;

    for (const tableName of FAVORITES_TABLE_CANDIDATES) {
      try {
        const didRemove = await deleteFavoriteForUser(sb, tableName, user.id, slug);
        if (didRemove) {
          removed = true;
        }
      } catch {
        if (!removed) {
          return NextResponse.json(
            { success: false, error: "Failed to remove favorite" },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

function readStyleSlug(row: unknown): string | null {
  if (!row || typeof row !== "object") {
    return null;
  }
  const value = (row as { style_slug?: unknown }).style_slug;
  return typeof value === "string" ? value : null;
}

async function getRequestUser(request: Request) {
  const cookieUser = await getServerUser();
  if (cookieUser) {
    return cookieUser;
  }

  const token = getBearerToken(request);
  if (!token) {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return null;
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const {
    data: { user },
  } = await sb.auth.getUser(token);
  return user ?? null;
}

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (!auth) return null;
  const [scheme, token] = auth.split(" ");
  if (!scheme || scheme.toLowerCase() !== "bearer") {
    return null;
  }
  const trimmed = token?.trim();
  return trimmed ? trimmed : null;
}

function buildLegacyUserSessionId(userId: string): string {
  return `${LEGACY_USER_SESSION_PREFIX}${userId}`;
}

async function readFavoriteSlugsForUser(
  sb: any,
  tableName: string,
  userId: string
): Promise<string[] | null> {
  const userScoped = await sb
    .from(tableName)
    .select("style_slug")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!userScoped.error) {
    const userSlugs: Array<string | null> = (userScoped.data ?? []).map((row: unknown) =>
      readStyleSlug(row)
    );
    return userSlugs.filter((slug): slug is string => typeof slug === "string");
  }

  if (isMissingUserIdColumnError(userScoped.error)) {
    const legacyScoped = await sb
      .from(tableName)
      .select("style_slug")
      .in("session_id", [buildLegacyUserSessionId(userId), userId])
      .order("created_at", { ascending: false });

    if (!legacyScoped.error) {
      const legacySlugs: Array<string | null> = (legacyScoped.data ?? []).map(
        (row: unknown) => readStyleSlug(row)
      );
      return legacySlugs.filter((slug): slug is string => typeof slug === "string");
    }

    if (isSkippableFavoritesSchemaError(legacyScoped.error)) {
      return null;
    }

    throw legacyScoped.error;
  }

  if (isSkippableFavoritesSchemaError(userScoped.error)) {
    return null;
  }

  throw userScoped.error;
}

async function insertFavoriteForUser(
  sb: any,
  tableName: string,
  userId: string,
  slug: string
): Promise<boolean> {
  const directInsert = await sb
    .from(tableName)
    .insert({ user_id: userId, style_slug: slug });

  if (!directInsert.error || directInsert.error.code === "23505") {
    return true;
  }

  if (isMissingUserIdColumnError(directInsert.error)) {
    const legacyInsert = await sb
      .from(tableName)
      .insert({ session_id: buildLegacyUserSessionId(userId), style_slug: slug });

    if (!legacyInsert.error || legacyInsert.error.code === "23505") {
      return true;
    }

    if (isSkippableFavoritesSchemaError(legacyInsert.error)) {
      return false;
    }

    throw legacyInsert.error;
  }

  if (isSkippableFavoritesSchemaError(directInsert.error)) {
    return false;
  }

  throw directInsert.error;
}

async function deleteFavoriteForUser(
  sb: any,
  tableName: string,
  userId: string,
  slug: string
): Promise<boolean> {
  const directDelete = await sb
    .from(tableName)
    .delete()
    .eq("user_id", userId)
    .eq("style_slug", slug);

  if (!directDelete.error) {
    return true;
  }

  if (isMissingUserIdColumnError(directDelete.error)) {
    const legacyDelete = await sb
      .from(tableName)
      .delete()
      .eq("session_id", buildLegacyUserSessionId(userId))
      .eq("style_slug", slug);

    if (!legacyDelete.error) {
      return true;
    }

    if (isSkippableFavoritesSchemaError(legacyDelete.error)) {
      return false;
    }

    throw legacyDelete.error;
  }

  if (isSkippableFavoritesSchemaError(directDelete.error)) {
    return false;
  }

  throw directDelete.error;
}

function isMissingUserIdColumnError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const code = "code" in error && typeof error.code === "string" ? error.code : null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }

  const message = readErrorMessage(error).toLowerCase();
  return message.includes("user_id");
}

function isSkippableFavoritesSchemaError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const code = "code" in error && typeof error.code === "string" ? error.code : null;
  if (
    code === "42P01" ||
    code === "PGRST205" ||
    code === "PGRST204" ||
    code === "42703" ||
    code === "23502"
  ) {
    return true;
  }

  const message = readErrorMessage(error).toLowerCase();
  return (
    (message.includes("relation") && message.includes("does not exist")) ||
    (message.includes("table") && message.includes("not found")) ||
    (message.includes("column") && message.includes("does not exist")) ||
    (message.includes("null value") && message.includes("session_id"))
  );
}

function readErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }
  if (typeof error === "string") {
    return error;
  }
  return "Unknown error";
}
