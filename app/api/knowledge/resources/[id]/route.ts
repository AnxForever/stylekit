import { NextResponse } from "next/server";

import { getPublishedKnowledgeResource, toKnowledgeResourcePayload } from "@/lib/knowledge";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const resource = await getPublishedKnowledgeResource(id);

  if (!resource) {
    return NextResponse.json(
      { error: "Knowledge resource not found" },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  }

  return NextResponse.json(
    {
      schemaVersion: "knowledge-resource-response-v1",
      resource: toKnowledgeResourcePayload(resource),
    },
    { headers: NO_STORE_HEADERS },
  );
}
