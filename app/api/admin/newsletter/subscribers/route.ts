import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * CSV export of newsletter subscribers for the admin console.
 *
 * The list has no other UI: it is the hand-off point to whatever tool the
 * owner sends updates from, so it must stay behind the admin session and be
 * capped.
 */

const MAX_ROWS = 10_000;

function csvCell(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("email, subscribed_at")
    .order("subscribed_at", { ascending: false })
    .limit(MAX_ROWS);

  if (error || !data) {
    return NextResponse.json(
      { error: "Failed to load subscribers" },
      { status: 500 }
    );
  }

  const rows = data as { email: string; subscribed_at: string }[];
  const csv = [
    "email,subscribed_at",
    ...rows.map((row) => `${csvCell(row.email)},${csvCell(row.subscribed_at)}`),
  ].join("\n");

  return new NextResponse(`${csv}\n`, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="newsletter-subscribers-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
      "cache-control": "no-store",
    },
  });
}
