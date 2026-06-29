import { NextResponse } from "next/server";

import { getStyleBySlug } from "@/lib/styles/registry";
import { toRegistryItem } from "@/lib/registry/to-registry-item";

// Cache aggressively: registry items are derived from build-time style data.
const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

/**
 * Serves a single shadcn registry-item, e.g. GET /r/glassmorphism.json
 * so consumers can run `npx shadcn add https://stylekit.top/r/glassmorphism.json`.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  try {
    const { name } = await params;
    const slug = name.replace(/\.json$/, "").toLowerCase();
    const style = getStyleBySlug(slug);

    if (!style) {
      return NextResponse.json(
        { error: `Unknown style: ${slug}` },
        { status: 404 },
      );
    }

    return NextResponse.json(toRegistryItem(style), {
      headers: { "Cache-Control": CACHE_CONTROL },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to build registry item" },
      { status: 500 },
    );
  }
}
