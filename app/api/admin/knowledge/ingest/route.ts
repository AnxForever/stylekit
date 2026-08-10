import { NextResponse } from "next/server";

import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  buildKnowledgeIngestPlan,
  loadKnowledgeCatalog,
  toKnowledgeResourceRecord,
  buildKnowledgeDocuments,
  type ExistingKnowledgeResource,
} from "@/lib/knowledge";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });
  }

  const body = await readBody(request);
  const commit = body.commit === true;
  const resources = await loadKnowledgeCatalog({ includeUnpublished: true });
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    if (commit) {
      return NextResponse.json(
        { error: "Supabase is not configured; use dry-run or configure the service role first." },
        { status: 503 },
      );
    }

    return NextResponse.json({ mode: "dry-run", storage: "unconfigured", plan: buildKnowledgeIngestPlan(resources) });
  }

  const { data: existingRows, error: existingError } = await supabase
    .from("knowledge_resources")
    .select("id, manifest_hash, review_status, publication_status");
  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }

  const existing = (Array.isArray(existingRows) ? existingRows : []) as ExistingKnowledgeResource[];
  const plan = buildKnowledgeIngestPlan(resources, existing);
  if (!commit) {
    return NextResponse.json({ mode: "dry-run", storage: "configured", plan });
  }

  const syncableIds = new Set(
    plan.items
      .filter((item) => item.action === "create-pending" || item.action === "update-pending")
      .map((item) => item.id),
  );
  const resourcesById = new Map(resources.map((resource) => [resource.id, resource]));
  const rows = plan.items
    .filter((item) => syncableIds.has(item.id))
    .map((item) => toKnowledgeResourceRecord(resourcesById.get(item.id)!, item.manifestHash));

  const run = await supabase
    .from("knowledge_ingest_runs")
    .insert({
      source_type: "git-manifests",
      status: "running",
      manifest_count: plan.total,
      summary: { counts: plan.counts, skipped: plan.counts["re-review-required"] },
      initiated_by: access.actor?.type === "user" ? access.actor.id : null,
    })
    .select("id")
    .single();
  if (run.error) {
    return NextResponse.json({ error: run.error.message }, { status: 500 });
  }

  const upsert = await supabase.from("knowledge_resources").upsert(rows, { onConflict: "id" });
  if (upsert.error) {
    await supabase
      .from("knowledge_ingest_runs")
      .update({ status: "failed", error_summary: upsert.error.message, finished_at: new Date().toISOString() })
      .eq("id", run.data.id);
    return NextResponse.json({ error: upsert.error.message }, { status: 500 });
  }

  const documents = rows.flatMap((row) => {
    const resource = resourcesById.get(row.id);
    return resource ? buildKnowledgeDocuments(resource).map((document) => ({
      resource_id: row.id,
      locale: document.locale,
      document: document.text,
    })) : [];
  });
  if (documents.length > 0) {
    const documentUpsert = await supabase
      .from("knowledge_search_documents")
      .upsert(documents, { onConflict: "resource_id,locale" });
    if (documentUpsert.error) {
      return NextResponse.json({ error: documentUpsert.error.message }, { status: 500 });
    }
  }

  if (rows.length > 0) {
    await supabase.from("knowledge_audit_events").insert(
      rows.map((row) => ({
        resource_id: row.id,
        action: "manifest-sync",
        actor_id: access.actor?.type === "user" ? access.actor.id : null,
        payload: { ingestRunId: run.data.id, manifestHash: row.manifest_hash },
      })),
    );
  }

  await supabase
    .from("knowledge_ingest_runs")
    .update({ status: "passed", finished_at: new Date().toISOString() })
    .eq("id", run.data.id);

  return NextResponse.json({ mode: "committed", ingestRunId: run.data.id, plan });
}

async function readBody(request: Request): Promise<{ commit?: boolean }> {
  try {
    const value = await request.json();
    return value && typeof value === "object" ? value as { commit?: boolean } : {};
  } catch {
    return {};
  }
}
