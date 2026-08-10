import { NextResponse } from "next/server";
import {
  loadKnowledgeCatalog,
  searchKnowledgeCatalog,
  toKnowledgeResourcePayload,
  type KnowledgeResourceKind,
} from "@/lib/knowledge";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };
const RESOURCE_KINDS = new Set<KnowledgeResourceKind>([
  "design-system",
  "component-library",
  "animation",
  "typography",
  "font",
  "gradient",
  "shadow",
  "background-pattern",
  "icon",
  "illustration",
  "chart",
  "design-md",
  "agent-skill",
  "design-to-code-tool",
  "accessibility-guideline",
]);

function positiveLimit(value: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requestedKind = url.searchParams.get("kind") as KnowledgeResourceKind | null;
  const resourceKind = requestedKind && RESOURCE_KINDS.has(requestedKind) ? requestedKind : undefined;
  const resources = await loadKnowledgeCatalog();
  const hits = searchKnowledgeCatalog(resources, {
    query: url.searchParams.get("q") ?? undefined,
    resourceKind,
    framework: url.searchParams.get("framework") ?? undefined,
    limit: positiveLimit(url.searchParams.get("limit")),
  });

  return NextResponse.json(
    {
      schemaVersion: "knowledge-search-v1",
      total: hits.length,
      resources: hits.map(({ resource, score, matchedFields }) => ({
        ...toKnowledgeResourcePayload(resource),
        score,
        matchedFields,
      })),
    },
    { headers: NO_STORE_HEADERS },
  );
}
