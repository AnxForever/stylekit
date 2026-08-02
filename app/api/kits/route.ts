import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { normalizeKits, resolveActiveKitId } from "@/lib/kit/storage";
import { mergeKitCollections } from "@/lib/kit/merge";
import type { Kit } from "@/lib/kit/types";

const KIT_TABLE = "user_kits";

// Loose shape check; normalizeKits does the real validation server-side.
const kitPayloadSchema = z.object({
  kits: z.array(z.unknown()).max(50),
  activeKitId: z.string().max(64).optional(),
});

function adminClient() {
  return import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  );
}

async function getRequestUser(request: Request) {
  const cookieUser = await getServerUser();
  if (cookieUser) return cookieUser;

  const auth = request.headers.get("authorization");
  const token = auth?.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : null;
  if (!token) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const {
    data: { user },
  } = await sb.auth.getUser(token);
  return user ?? null;
}

/** Loads the caller's stored kits. */
export async function GET(request: Request) {
  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: true, kits: [], activeKitId: "" });
  }

  const sb = await adminClient();
  const { data, error } = await sb
    .from(KIT_TABLE)
    .select("kits, active_kit_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error && !isMissingTable(error)) {
    return NextResponse.json({ success: false, error: "Failed to load kits" }, { status: 500 });
  }

  const kits = normalizeKits(data?.kits);
  return NextResponse.json({
    success: true,
    kits,
    activeKitId: resolveActiveKitId(kits, data?.active_kit_id),
  });
}

/**
 * Merges the client's kits with what's stored and persists the union.
 * Returns the merged collection so the client can adopt it. Idempotent.
 */
export async function PUT(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: false, error: "Database not configured" }, { status: 503 });
  }

  let incoming: Kit[];
  let requestedActive: string | undefined;
  try {
    const parsed = kitPayloadSchema.parse(await request.json());
    incoming = normalizeKits(parsed.kits);
    requestedActive = parsed.activeKitId;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }

  const sb = await adminClient();
  const existing = await sb
    .from(KIT_TABLE)
    .select("kits, active_kit_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing.error && !isMissingTable(existing.error)) {
    return NextResponse.json({ success: false, error: "Failed to load kits" }, { status: 500 });
  }

  const stored = normalizeKits(existing.data?.kits);
  const merged = mergeKitCollections(incoming, stored);
  const activeKitId = resolveActiveKitId(
    merged,
    requestedActive ?? existing.data?.active_kit_id
  );

  const upsert = await sb.from(KIT_TABLE).upsert(
    {
      user_id: user.id,
      kits: merged,
      active_kit_id: activeKitId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (upsert.error) {
    if (isMissingTable(upsert.error)) {
      // Migration 025 not applied yet: don't hard-fail the client.
      return NextResponse.json({ success: true, kits: merged, activeKitId, persisted: false });
    }
    return NextResponse.json({ success: false, error: "Failed to save kits" }, { status: 500 });
  }

  return NextResponse.json({ success: true, kits: merged, activeKitId, persisted: true });
}

function isMissingTable(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error && typeof error.code === "string" ? error.code : "";
  if (code === "42P01" || code === "PGRST205" || code === "PGRST116") return true;
  const message =
    "message" in error && typeof error.message === "string" ? error.message.toLowerCase() : "";
  return message.includes("does not exist") || message.includes("not found");
}
