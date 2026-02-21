import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface ProfileSubmission {
  id: string;
  slug: string;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
}

function isMissingUserIdColumnError(error: DbErrorLike | null | undefined): boolean {
  const code = error?.code ?? null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }

  const message = `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
  return message.includes("user_id");
}

function mergeSubmissions(
  modernSubmissions: ProfileSubmission[] | null,
  fallbackSubmissions: ProfileSubmission[] | null
): ProfileSubmission[] {
  const seen = new Set<string>();
  const merged: ProfileSubmission[] = [];

  for (const item of [...(modernSubmissions ?? []), ...(fallbackSubmissions ?? [])]) {
    if (!item?.id || seen.has(item.id)) {
      continue;
    }
    seen.add(item.id);
    merged.push(item);
  }

  merged.sort((a, b) => b.submitted_at.localeCompare(a.submitted_at));
  return merged.slice(0, 50);
}

export async function GET() {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ success: true, submissions: [] });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const modernResult = await sb
    .from("submissions")
    .select("id, slug, status, submitted_at")
    .eq("user_id", user.id)
    .order("submitted_at", { ascending: false })
    .limit(50);

  if (modernResult.error && !isMissingUserIdColumnError(modernResult.error as DbErrorLike)) {
    return NextResponse.json(
      { success: false, error: "Failed to load submissions" },
      { status: 500 }
    );
  }

  const fallbackResult = await sb
    .from("submissions")
    .select("id, slug, status, submitted_at")
    .eq("form_data->__author->>userId", user.id)
    .order("submitted_at", { ascending: false })
    .limit(50);

  if (fallbackResult.error && modernResult.error) {
    return NextResponse.json(
      { success: false, error: "Failed to load submissions" },
      { status: 500 }
    );
  }

  const submissions = mergeSubmissions(
    modernResult.error ? [] : ((modernResult.data ?? []) as ProfileSubmission[]),
    fallbackResult.error ? [] : ((fallbackResult.data ?? []) as ProfileSubmission[])
  );

  return NextResponse.json({ success: true, submissions });
}
