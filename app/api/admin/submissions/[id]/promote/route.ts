import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { isValidSubmissionId } from "@/lib/submit/reviewer";
import {
  isSupabaseConfigured,
  promoteSubmissionSupabase,
} from "@/lib/submit/reviewer-supabase";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";

/**
 * Promote an approved submission into the curated catalog.
 *
 * Unlike `/register`, this writes no code and needs no deploy, so it is not
 * gated to non-production: the style already renders from its submission
 * record, and promotion only changes where it is surfaced. That is what makes
 * running an active community catalog practical.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 },
    );
  }

  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { success: false, error: access.error },
      { status: access.status ?? 403 },
    );
  }

  const { id } = await params;
  if (!isValidSubmissionId(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid submission ID" },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, error: "Promotion requires database configuration." },
      { status: 503 },
    );
  }

  // The update is scoped to approved rows, so a missing result means the
  // submission does not exist or has not cleared review yet.
  const promoted = await promoteSubmissionSupabase(id);
  if (!promoted) {
    return NextResponse.json(
      {
        success: false,
        error: "Submission not found, or it has not been approved yet.",
      },
      { status: 409 },
    );
  }

  await recordAdminAuditEvent(request, {
    action: "submission.promote",
    targetType: "submission",
    targetId: id,
    actor: access.actor,
    metadata: {
      slug: promoted.slug,
      promotedAt: promoted.promotedAt ?? null,
    },
  });

  return NextResponse.json({
    success: true,
    submission: {
      id: promoted.id,
      slug: promoted.slug,
      visibility: promoted.visibility ?? "promoted",
      promotedAt: promoted.promotedAt ?? null,
    },
  });
}
