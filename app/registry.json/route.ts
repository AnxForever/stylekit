import { NextResponse } from "next/server";

import { styles } from "@/lib/styles/registry";
import { toRegistryIndex } from "@/lib/registry/registry-index";

const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

/**
 * Serves the shadcn registry index at GET /registry.json — lists every
 * StyleKit style available via `npx shadcn add`.
 */
export async function GET() {
  try {
    return NextResponse.json(toRegistryIndex(styles), {
      headers: { "Cache-Control": CACHE_CONTROL },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to build registry index" },
      { status: 500 },
    );
  }
}
