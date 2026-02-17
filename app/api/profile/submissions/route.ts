import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";

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

  const { data, error } = await sb
    .from("submissions")
    .select("id, slug, status, submitted_at")
    .eq("user_id", user.id)
    .order("submitted_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json(
      { success: false, error: "Failed to load submissions" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, submissions: data ?? [] });
}
