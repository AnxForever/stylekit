import { NextResponse } from "next/server";
import { listCommunityFeed } from "@/lib/community/feed";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseLimit(value: string | null): number {
  if (!value) return 12;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 12;
  return Math.max(1, Math.min(parsed, 48));
}

function parseOffset(value: string | null): number {
  if (!value) return 0;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, parsed);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseLimit(searchParams.get("limit"));
  const offset = parseOffset(searchParams.get("offset"));
  const slugParam = searchParams.get("slug");

  if (slugParam && !SLUG_RE.test(slugParam)) {
    return NextResponse.json(
      { error: "Invalid style slug" },
      { status: 400 }
    );
  }

  const { items, total } = await listCommunityFeed({
    limit,
    offset,
    slug: slugParam ?? undefined,
  });

  return NextResponse.json({
    items,
    total,
    limit,
    offset,
  });
}
