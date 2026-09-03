import { NextResponse } from "next/server";

import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import {
  listCommunityReports,
  resolveCommunityReport,
  setSubmissionVisibility,
  type ReportStatus,
} from "@/lib/community/moderation";

const VALID_STATUSES: ReportStatus[] = ["open", "reviewed", "dismissed"];

/** Moderation queue: open reports first, oldest first. */
export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 },
    );
  }

  const status = new URL(request.url).searchParams.get("status") ?? "open";
  const filter =
    status === "all" || VALID_STATUSES.includes(status as ReportStatus)
      ? (status as ReportStatus | "all")
      : "open";

  const reports = await listCommunityReports(filter);
  return NextResponse.json({ reports, total: reports.length });
}

/**
 * Act on a report.
 *
 * Hiding and resolving are one call because they are one decision: a moderator
 * who upholds a report almost always wants the style gone at the same moment,
 * and splitting it would leave a window where the report reads "handled" while
 * the style is still public.
 */
export async function POST(request: Request) {
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

  const body = await parseJsonBodyWithLimit<{
    reportId?: unknown;
    action?: unknown;
    note?: unknown;
  }>(request, {
    maxBytes: 4 * 1024,
    tooLargeMessage: "Request is too long.",
    invalidJsonMessage: "Could not parse the request.",
  });
  if (!body.ok) {
    return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  }

  const reportId = typeof body.data?.reportId === "string" ? body.data.reportId : "";
  const action = body.data?.action;
  const note = typeof body.data?.note === "string" ? body.data.note : null;

  if (!reportId || (action !== "uphold" && action !== "dismiss" && action !== "restore")) {
    return NextResponse.json(
      { success: false, error: "Provide a report id and a valid action." },
      { status: 400 },
    );
  }

  const resolved = await resolveCommunityReport(
    reportId,
    action === "dismiss" ? "dismissed" : "reviewed",
    note,
  );
  if (!resolved) {
    return NextResponse.json(
      { success: false, error: "Report not found." },
      { status: 404 },
    );
  }

  let visibility: string | null = null;
  if (action === "uphold" || action === "restore") {
    const updated = await setSubmissionVisibility(
      resolved.submissionId,
      action === "uphold" ? "hidden" : "community",
    );
    visibility = updated?.visibility ?? null;
  }

  await recordAdminAuditEvent(request, {
    action: action === "uphold" ? "community.hide" : "community.report.resolve",
    targetType: "submission",
    targetId: resolved.submissionId,
    actor: access.actor,
    metadata: {
      reportId,
      reportAction: action,
      slug: resolved.submissionSlug ?? null,
      visibility,
    },
  });

  return NextResponse.json({
    success: true,
    report: resolved,
    visibility,
  });
}
