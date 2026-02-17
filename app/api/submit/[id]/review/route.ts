import { NextResponse } from "next/server";
import { z } from "zod";
import { approveSubmission, rejectSubmission } from "@/lib/submit/reviewer";
import {
  isSupabaseConfigured,
  approveSubmissionSupabase,
  rejectSubmissionSupabase,
} from "@/lib/submit/reviewer-supabase";
import { isValidSubmissionId } from "@/lib/submit/reviewer";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const reviewSchema = z.object({
  action: z.enum(["approve", "reject"]),
  note: z.string().trim().max(500).optional(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const originCheck = verifyTrustedOrigin(request);
    if (!originCheck.ok) {
      return NextResponse.json(
        { success: false, error: originCheck.error },
        { status: originCheck.status ?? 403 }
      );
    }

    const access = await checkAdminApiAccess(request);
    if (!access.allowed) {
      return NextResponse.json(
        { success: false, error: access.error },
        { status: access.status ?? 403 }
      );
    }

    const { id } = await params;

    if (!isValidSubmissionId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid submission ID" },
        { status: 400 }
      );
    }

    const parsed = reviewSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { action, note } = parsed.data;

    const useSupabase = isSupabaseConfigured();

    if (action === "approve") {
      const result = useSupabase
        ? await approveSubmissionSupabase(id, note)
        : await approveSubmission(id, note);

      if (!result) {
        return NextResponse.json(
          { success: false, error: "Submission not found" },
          { status: 404 }
        );
      }

      await recordAdminAuditEvent(request, {
        action: "submission.approve",
        targetType: "submission",
        targetId: id,
        actor: access.actor,
        metadata: {
          slug: result.slug,
          noteProvided: typeof note === "string" && note.length > 0,
        },
      });

      return NextResponse.json({ success: true, submission: result });
    }

    if (action === "reject") {
      const result = useSupabase
        ? await rejectSubmissionSupabase(id, note)
        : await rejectSubmission(id, note);

      if (!result) {
        return NextResponse.json(
          { success: false, error: "Submission not found" },
          { status: 404 }
        );
      }

      await recordAdminAuditEvent(request, {
        action: "submission.reject",
        targetType: "submission",
        targetId: id,
        actor: access.actor,
        metadata: {
          slug: result.slug,
          noteProvided: typeof note === "string" && note.length > 0,
        },
      });

      return NextResponse.json({ success: true, submission: result });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Use 'approve' or 'reject'" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
