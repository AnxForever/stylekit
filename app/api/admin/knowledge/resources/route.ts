import { NextResponse } from "next/server";

import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  evaluateKnowledgeApproval,
  loadKnowledgeCatalog,
  toKnowledgeResourcePayload,
  type KnowledgeAdminResource,
} from "@/lib/knowledge";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });

  const resources: KnowledgeAdminResource[] = (await loadKnowledgeCatalog({ includeUnpublished: true })).map((resource) => ({
    ...toKnowledgeResourcePayload(resource),
    approval: evaluateKnowledgeApproval(resource),
  }));
  const ready = resources.filter((resource) => resource.approval.ok).length;

  return NextResponse.json({
    schemaVersion: "knowledge-admin-resources-v1",
    source: "git-manifests",
    counts: {
      total: resources.length,
      pending: resources.filter((resource) => resource.reviewStatus === "pending").length,
      blocked: resources.length - ready,
      ready,
    },
    resources,
  });
}
