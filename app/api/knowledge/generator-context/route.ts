import { NextResponse } from "next/server";

import { retrieveGeneratorKnowledge } from "@/lib/knowledge";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() ?? "";
  const references = await retrieveGeneratorKnowledge(query);
  return NextResponse.json({
    schemaVersion: "knowledge-generator-context-v1",
    query,
    references,
  }, { headers: { "Cache-Control": "no-store, max-age=0" } });
}
