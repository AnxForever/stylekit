import { NextResponse } from "next/server";

import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  evaluateKnowledgeApproval,
  isKnowledgeReviewDecision,
  loadKnowledgeCatalog,
} from "@/lib/knowledge";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });

  const resourceId = new URL(request.url).searchParams.get("resourceId")?.trim();
  if (!resourceId) return NextResponse.json({ error: "resourceId is required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("knowledge_reviews")
    .select("id, resource_id, reviewer_id, decision, notes, evidence, created_at")
    .eq("resource_id", resourceId)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ resourceId, reviews: Array.isArray(data) ? data : [] });
}

export async function POST(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });

  const body = await readBody(request);
  const resourceId = typeof body.resourceId === "string" ? body.resourceId.trim() : "";
  if (!resourceId || !isKnowledgeReviewDecision(body.decision)) {
    return NextResponse.json({ error: "resourceId and a valid decision are required" }, { status: 400 });
  }

  const resource = (await loadKnowledgeCatalog({ includeUnpublished: true })).find((item) => item.id === resourceId);
  if (!resource) return NextResponse.json({ error: "Knowledge resource not found" }, { status: 404 });

  const decision = body.decision;
  const approval = evaluateKnowledgeApproval(resource);
  if (decision === "approve" && !approval.ok) {
    return NextResponse.json(
      { error: "Resource is not ready for approval", blockers: approval.blockers },
      { status: 422 },
    );
  }

  const notes = typeof body.notes === "string" ? body.notes.trim() : "";
  if (decision !== "approve" && decision !== "revoke" && !notes) {
    return NextResponse.json({ error: "notes are required for this decision" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });

  const evidence = isRecord(body.evidence) ? body.evidence : {};
  const review = await supabase
    .from("knowledge_reviews")
    .insert({
      resource_id: resourceId,
      reviewer_id: access.actor?.type === "user" ? access.actor.id : null,
      decision,
      notes: notes || null,
      evidence: { ...evidence, approvalGate: approval },
    })
    .select("id, resource_id, decision, notes, evidence, created_at")
    .single();
  if (review.error) return NextResponse.json({ error: review.error.message }, { status: 500 });

  await supabase.from("knowledge_audit_events").insert({
    resource_id: resourceId,
    action: `review-${decision}`,
    actor_id: access.actor?.type === "user" ? access.actor.id : null,
    payload: { reviewId: review.data.id, approvalGate: approval },
  });

  return NextResponse.json({ review: review.data }, { status: 201 });
}

interface ReviewBody {
  resourceId?: unknown;
  decision?: unknown;
  notes?: unknown;
  evidence?: unknown;
}

async function readBody(request: Request): Promise<ReviewBody> {
  try {
    const value = await request.json();
    return isRecord(value) ? value : {};
  } catch {
    return {};
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
