import { NextResponse } from "next/server";
import { ASSET_KINDS, isAssetKind, listPublicAssets } from "@/lib/assets";

export const runtime = "nodejs";

const HEADERS = { "Cache-Control": "public, max-age=60, s-maxage=300" };

function integer(value: string | null, fallback: number, min: number, max: number) {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= min && parsed <= max ? parsed : null;
}

/** Public, curated assets only. User kits and unpublished submissions stay private. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const kind = params.get("kind");
  if (kind !== null && !isAssetKind(kind)) {
    return NextResponse.json({ error: "Invalid asset kind", kinds: ASSET_KINDS }, { status: 400 });
  }
  const offset = integer(params.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER);
  const limit = integer(params.get("limit"), 20, 1, 100);
  const query = params.get("q") ?? undefined;
  if (offset === null || limit === null || (query?.length ?? 0) > 500) {
    return NextResponse.json({ error: "Use offset >= 0, limit 1-100 and q up to 500 characters" }, { status: 400 });
  }
  return NextResponse.json(listPublicAssets({ kind: kind ?? undefined, query, offset, limit }), { headers: HEADERS });
}
