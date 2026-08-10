import { NextResponse } from "next/server";

import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { evaluateKnowledgeApproval, loadKnowledgeCatalog } from "@/lib/knowledge";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PUBLICATION_ACTIONS = ["publish", "deprecate", "revoke"] as const;
type PublicationAction = (typeof PUBLICATION_ACTIONS)[number];

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });

  const resourceId = new URL(request.url).searchParams.get("resourceId")?.trim();
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });

  let query = supabase
    .from("knowledge_publications")
    .select("id, resource_id, action, content_hash, publisher_id, notes, created_at")
    .order("created_at", { ascending: false });
  if (resourceId) query = query.eq("resource_id", resourceId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ resourceId: resourceId || null, publications: Array.isArray(data) ? data : [] });
}

export async function POST(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });

  const body = await readBody(request);
  const resourceId = typeof body.resourceId === "string" ? body.resourceId.trim() : "";
  const action = isPublicationAction(body.action) ? body.action : null;
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";
  const contentHash = typeof body.contentHash === "string" ? body.contentHash.trim() : "";

  if (!resourceId || !action) {
    return NextResponse.json({ error: "resourceId and a valid action are required" }, { status: 400 });
  }
  if (action !== "publish" && !notes) {
    return NextResponse.json({ error: "notes are required for deprecate and revoke" }, { status: 400 });
  }

  const resource = (await loadKnowledgeCatalog({ includeUnpublished: true })).find((item) => item.id === resourceId);
  if (!resource) return NextResponse.json({ error: "Knowledge resource not found" }, { status: 404 });

  const approval = evaluateKnowledgeApproval(resource);
  if (action === "publish") {
    const blockers = [...approval.blockers];
    if (resource.reviewStatus !== "approved") blockers.push("Git manifest reviewStatus must be approved");
    if (resource.publicationStatus !== "published") blockers.push("Git manifest publicationStatus must be published");
    if (!resource.contentHash) blockers.push("contentHash is missing");
    if (contentHash && contentHash !== resource.contentHash) blockers.push("contentHash does not match the Git manifest");
    if (blockers.length > 0) {
      return NextResponse.json(
        {
          error: "Resource is not ready for publication",
          blockers,
          requiresManifestSync: true,
        },
        { status: 422 },
      );
    }
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });

  const publication = await supabase
    .from("knowledge_publications")
    .insert({
      resource_id: resourceId,
      action,
      content_hash: contentHash || resource.contentHash || null,
      publisher_id: access.actor?.type === "user" ? access.actor.id : null,
      notes: notes || null,
    })
    .select("id, resource_id, action, content_hash, publisher_id, notes, created_at")
    .single();
  if (publication.error) return NextResponse.json({ error: publication.error.message }, { status: 500 });

  const audit = await supabase.from("knowledge_audit_events").insert({
    resource_id: resourceId,
    action: `publication-${action}`,
    actor_id: access.actor?.type === "user" ? access.actor.id : null,
    payload: {
      publicationId: publication.data.id,
      approvalGate: approval,
      manifestStatus: {
        reviewStatus: resource.reviewStatus,
        publicationStatus: resource.publicationStatus,
      },
    },
  });
  if (audit.error) return NextResponse.json({ error: audit.error.message }, { status: 500 });

  return NextResponse.json(
    {
      publication: publication.data,
      requiresManifestSync: true,
      message: "Publication event recorded. Git manifest remains the public source of truth.",
    },
    { status: 201 },
  );
}

interface PublicationBody {
  resourceId?: unknown;
  action?: unknown;
  contentHash?: unknown;
  notes?: unknown;
}

function isPublicationAction(value: unknown): value is PublicationAction {
  return typeof value === "string" && (PUBLICATION_ACTIONS as readonly string[]).includes(value);
}

async function readBody(request: Request): Promise<PublicationBody> {
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
