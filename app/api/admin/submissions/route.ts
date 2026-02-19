import { NextResponse } from "next/server";
import { listSubmissions } from "@/lib/submit/reviewer";
import {
  isSupabaseConfigured,
  listSubmissionsSupabase,
} from "@/lib/submit/reviewer-supabase";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("status") as
    | "pending"
    | "approved"
    | "rejected"
    | null;

  const submissions = isSupabaseConfigured()
    ? await listSubmissionsSupabase(filter ?? undefined)
    : await listSubmissions(filter ?? undefined);

  return NextResponse.json({
    submissions,
    total: submissions.length,
  });
}
