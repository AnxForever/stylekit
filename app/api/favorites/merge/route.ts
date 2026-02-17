import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const mergeSchema = z.object({
  slugs: z.array(z.string().regex(SLUG_RE)).max(200),
});

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const parsed = mergeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid slugs array" },
        { status: 400 }
      );
    }

    if (parsed.data.slugs.length === 0) {
      return NextResponse.json({ success: true, merged: 0 });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Bulk upsert: ignore duplicates
    const rows = parsed.data.slugs.map((slug) => ({
      user_id: user.id,
      style_slug: slug,
    }));

    const { error } = await sb
      .from("user_favorites")
      .upsert(rows, { onConflict: "user_id,style_slug", ignoreDuplicates: true });

    if (error) {
      return NextResponse.json(
        { success: false, error: "Failed to merge favorites" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, merged: rows.length });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
