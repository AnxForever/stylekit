import { NextResponse } from "next/server";
import { listSubmissions } from "@/lib/submit/reviewer";
import {
  isSupabaseConfigured,
  listSubmissionsSupabase,
} from "@/lib/submit/reviewer-supabase";

export async function GET(request: Request) {
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
