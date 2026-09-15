import { NextResponse } from "next/server";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getServerUser } from "@/lib/auth/supabase-server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { checkRateLimit, createRateLimitHeaders, getRequestClientKey } from "@/lib/security/rate-limit";
import {
  CommunityNotificationStoreError,
  listCommunityNotifications,
  markCommunityNotificationsRead,
  parseNotificationCursor,
} from "@/lib/community/notifications";

const PRIVATE_HEADERS = { "Cache-Control": "private, no-store", Vary: "Cookie" };
const readSchema = z.object({ ids: z.array(z.string().uuid()).min(1).max(50) }).strict();

function failure(error: unknown) {
  return NextResponse.json({
    error: "Notifications are temporarily unavailable. Please try again later.",
    code: error instanceof CommunityNotificationStoreError && error.upgradeRequired ? "COMMUNITY_UPGRADE_REQUIRED" : "COMMUNITY_UNAVAILABLE",
  }, { status: 503, headers: PRIVATE_HEADERS });
}

export async function GET(request: Request) {
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Sign in to view notifications." }, { status: 401, headers: PRIVATE_HEADERS });
  const search = new URL(request.url).searchParams;
  const limit = Number(search.get("limit") ?? 20);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 50) {
    return NextResponse.json({ error: "Invalid notification page size." }, { status: 400, headers: PRIVATE_HEADERS });
  }
  let cursor;
  try { cursor = parseNotificationCursor(search.get("cursor")); }
  catch { return NextResponse.json({ error: "Invalid notification cursor." }, { status: 400, headers: PRIVATE_HEADERS }); }
  try {
    const sb: SupabaseClient | null = getSupabaseAdmin();
    if (!sb) return failure(null);
    return NextResponse.json(await listCommunityNotifications(sb, user.id, { limit, cursor }), { headers: PRIVATE_HEADERS });
  } catch (error) { return failure(error); }
}

export async function PATCH(request: Request) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ error: origin.error }, { status: origin.status, headers: PRIVATE_HEADERS });
  const user = await getServerUser();
  if (!user) return NextResponse.json({ error: "Sign in to update notifications." }, { status: 401, headers: PRIVATE_HEADERS });
  const rate = checkRateLimit({ namespace: "community-notifications-read", key: `${user.id}:${getRequestClientKey(request)}`, limit: 120, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429, headers: { ...PRIVATE_HEADERS, ...createRateLimitHeaders(rate) } });
  const parsedBody = await parseJsonBodyWithLimit(request, { maxBytes: 8 * 1024 });
  if (!parsedBody.ok) return NextResponse.json({ error: parsedBody.error }, { status: parsedBody.status, headers: PRIVATE_HEADERS });
  const parsed = readSchema.safeParse(parsedBody.data);
  if (!parsed.success) return NextResponse.json({ error: "Select between 1 and 50 notification IDs." }, { status: 400, headers: PRIVATE_HEADERS });
  try {
    const sb: SupabaseClient | null = getSupabaseAdmin();
    if (!sb) return failure(null);
    await markCommunityNotificationsRead(sb, user.id, [...new Set(parsed.data.ids)]);
    return NextResponse.json({ success: true }, { headers: PRIVATE_HEADERS });
  } catch (error) { return failure(error); }
}
