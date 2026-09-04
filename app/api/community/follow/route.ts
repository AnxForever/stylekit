import { NextResponse } from "next/server";

import { getFollowState, setFollow } from "@/lib/community/contributor";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * Follow or unfollow a contributor, addressed by their sequential id.
 *
 * Takes a seq id rather than a uuid so the client never has to hold another
 * reader's account id; the route resolves it server-side.
 */
const FOLLOW_WINDOW_MS = 60 * 60 * 1000;
const FOLLOW_MAX_REQUESTS = 60;

async function resolveUserIdBySeqId(seqId: number): Promise<string | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data } = await sb
    .from("user_seq_ids")
    .select("user_id")
    .eq("seq_id", seqId)
    .maybeSingle();

  return (data as { user_id?: string } | null)?.user_id ?? null;
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 },
    );
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Sign in to follow contributors." },
      { status: 401 },
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:community-follow",
    key: getRequestClientKey(request),
    limit: FOLLOW_MAX_REQUESTS,
    windowMs: FOLLOW_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const body = await parseJsonBodyWithLimit<{
    seqId?: unknown;
    follow?: unknown;
  }>(request, {
    maxBytes: 2 * 1024,
    tooLargeMessage: "Request is too long.",
    invalidJsonMessage: "Could not parse the request.",
  });
  if (!body.ok) {
    return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  }

  const seqId = Number(body.data?.seqId);
  if (!Number.isInteger(seqId) || seqId <= 0 || typeof body.data?.follow !== "boolean") {
    return NextResponse.json(
      { success: false, error: "Provide a contributor id and a follow state." },
      { status: 400 },
    );
  }

  const contributorId = await resolveUserIdBySeqId(seqId);
  if (!contributorId) {
    return NextResponse.json(
      { success: false, error: "Contributor not found." },
      { status: 404 },
    );
  }

  if (contributorId === user.id) {
    return NextResponse.json(
      { success: false, error: "You cannot follow yourself." },
      { status: 400 },
    );
  }

  const ok = await setFollow(user.id, contributorId, body.data.follow);
  if (!ok) {
    // setFollow refuses non-uuid identities and self-follows; both are bad
    // requests rather than server faults.
    return NextResponse.json(
      { success: false, error: "This account cannot follow contributors." },
      { status: 400 },
    );
  }

  const state = await getFollowState(contributorId, user.id);
  return NextResponse.json(
    { success: true, ...state },
    { headers: createRateLimitHeaders(rateLimit) },
  );
}

/** Current follow state for one contributor, from the caller's perspective. */
export async function GET(request: Request) {
  const seqIdParam = new URL(request.url).searchParams.get("seqId");
  const seqId = Number(seqIdParam);
  if (!Number.isInteger(seqId) || seqId <= 0) {
    return NextResponse.json({ followers: 0, following: false });
  }

  const contributorId = await resolveUserIdBySeqId(seqId);
  if (!contributorId) {
    return NextResponse.json({ followers: 0, following: false });
  }

  const user = await getServerUser().catch(() => null);
  const state = await getFollowState(contributorId, user?.id ?? null);
  return NextResponse.json(state);
}
