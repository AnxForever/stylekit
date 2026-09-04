import { NextResponse } from "next/server";

import { listCommunityStylesMeta } from "@/lib/styles/community-runtime";

const COMMUNITY_CACHE_CONTROL =
  "public, max-age=15, s-maxage=60, stale-while-revalidate=300";

/**
 * Approved community submissions.
 *
 * Separate from `/api/styles` so a client can tell curated styles from
 * submitted ones. Community entries are rendered dynamically from the
 * submission record and are not indexed until a maintainer promotes them into
 * the curated library.
 */
export async function GET() {
  try {
    const styles = await listCommunityStylesMeta();
    return NextResponse.json(
      { total: styles.length, styles },
      { headers: { "Cache-Control": COMMUNITY_CACHE_CONTROL } },
    );
  } catch {
    // A submissions table that is unreachable must not take the page down; an
    // empty community catalog is the honest answer.
    return NextResponse.json(
      { total: 0, styles: [] },
      { status: 200, headers: { "Cache-Control": COMMUNITY_CACHE_CONTROL } },
    );
  }
}
