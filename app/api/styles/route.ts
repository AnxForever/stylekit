import { NextResponse } from "next/server";

import { getAllStylesMeta } from "@/lib/styles/meta";

// The curated catalog is build-time data. A short browser TTL plus a longer
// shared-cache TTL keeps SDK/catalog consumers off the Node process while a
// new deployment still becomes visible without a manual purge.
const CATALOG_CACHE_CONTROL =
  "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

/**
 * The curated style catalog.
 *
 * Curated only, deliberately. This endpoint used to merge in approved
 * submissions via `listCatalogStylesMeta()`, which contradicted
 * `app/styles/[slug]/page.tsx`: that route sets `dynamicParams = false`, so
 * every community slug advertised here returned a 404 when opened. The npm
 * client (`packages/core/src/discovery/remote.ts`) reads the same payload and
 * hit the same dead ends.
 *
 * Community submissions are served by `/api/community/styles`.
 */
export async function GET() {
  const styleMeta = getAllStylesMeta();

  return NextResponse.json(
    {
      total: styleMeta.length,
      styles: styleMeta,
    },
    { headers: { "Cache-Control": CATALOG_CACHE_CONTROL } },
  );
}
