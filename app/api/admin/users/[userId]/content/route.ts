import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { z } from "zod";

const bodySchema = z.object({
  types: z.array(z.enum(["comments", "ratings"])).min(1),
});

export async function DELETE(
  request: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { userId } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { types } = parsed.data;

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  const deletedCounts: Record<string, number> = {};

  for (const type of types) {
    if (type === "comments") {
      const { count } = await sb
        .from("style_comments")
        .delete({ count: "exact" })
        .eq("user_id", userId);
      deletedCounts.comments = count ?? 0;
    }
    if (type === "ratings") {
      const { count } = await sb
        .from("style_ratings")
        .delete({ count: "exact" })
        .eq("user_id", userId);
      deletedCounts.ratings = count ?? 0;
    }
  }

  await recordAdminAuditEvent(request, {
    action: "user.content.delete",
    targetType: "user",
    targetId: userId,
    actor: access.actor,
    metadata: { types, deletedCounts },
  });

  return NextResponse.json({ deleted: true, types, deletedCounts });
}
