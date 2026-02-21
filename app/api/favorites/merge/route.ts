import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FAVORITES_TABLE_CANDIDATES = ["user_favorites", "style_favorites"] as const;
const LEGACY_USER_SESSION_PREFIX = "user:";

const mergeSchema = z.object({
  slugs: z.array(z.string().regex(SLUG_RE)).max(200),
});

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
    const parsed = mergeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid slugs array" },
        { status: 400 }
      );
    }

    if (parsed.data.slugs.length === 0) {
      return NextResponse.json({ success: true, merged: 0 });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let merged = false;

    for (const tableName of FAVORITES_TABLE_CANDIDATES) {
      try {
        const didMerge = await upsertFavoritesForUser(
          sb,
          tableName,
          user.id,
          parsed.data.slugs
        );
        if (didMerge) {
          merged = true;
        }
      } catch {
        if (!merged) {
          return NextResponse.json(
            { success: false, error: "Failed to merge favorites" },
            { status: 500 }
          );
        }
      }
    }

    if (!merged) {
      return NextResponse.json(
        { success: false, error: "Failed to merge favorites" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, merged: parsed.data.slugs.length });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

function buildLegacyUserSessionId(userId: string): string {
  return `${LEGACY_USER_SESSION_PREFIX}${userId}`;
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

async function upsertFavoritesForUser(
  sb: any,
  tableName: string,
  userId: string,
  slugs: string[]
): Promise<boolean> {
  const userRows = slugs.map((slug) => ({
    user_id: userId,
    style_slug: slug,
  }));

  const userScopedUpsert = await sb
    .from(tableName)
    .upsert(userRows, { onConflict: "user_id,style_slug", ignoreDuplicates: true });

  if (!userScopedUpsert.error) {
    return true;
  }

  if (isMissingUserIdColumnError(userScopedUpsert.error)) {
    const sessionRows = slugs.map((slug) => ({
      session_id: buildLegacyUserSessionId(userId),
      style_slug: slug,
    }));

    const legacyScopedUpsert = await sb
      .from(tableName)
      .upsert(sessionRows, { onConflict: "session_id,style_slug", ignoreDuplicates: true });

    if (!legacyScopedUpsert.error) {
      return true;
    }

    if (isSkippableFavoritesSchemaError(legacyScopedUpsert.error)) {
      return false;
    }

    throw legacyScopedUpsert.error;
  }

  if (isSkippableFavoritesSchemaError(userScopedUpsert.error)) {
    return false;
  }

  throw userScopedUpsert.error;
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
