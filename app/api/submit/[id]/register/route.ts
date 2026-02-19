import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { isValidSubmissionId, getSubmission } from "@/lib/submit/reviewer";
import {
  isSupabaseConfigured,
  getSubmissionSupabase,
} from "@/lib/submit/reviewer-supabase";
import { autoRegisterStyle } from "@/lib/submit/auto-register";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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

    const useSupabase = isSupabaseConfigured();
    const submission = useSupabase
      ? await getSubmissionSupabase(id)
      : await getSubmission(id);

    if (!submission) {
      return NextResponse.json(
        { success: false, error: "Submission not found" },
        { status: 404 },
      );
    }

    if (submission.status !== "approved") {
      return NextResponse.json(
        { success: false, error: "Submission must be approved before registration" },
        { status: 409 },
      );
    }

    const registerResult = await autoRegisterStyle(submission);

    await recordAdminAuditEvent(request, {
      action: "submission.register",
      targetType: "submission",
      targetId: id,
      actor: access.actor,
      metadata: {
        slug: submission.slug,
        filesWritten: registerResult.filesWritten.length,
        registriesPatched: registerResult.registriesPatched.length,
        errors: registerResult.errors,
        success: registerResult.success,
      },
    });

    if (!registerResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Auto-registration completed with errors",
          details: registerResult,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      result: registerResult,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 500 },
    );
  }
}
