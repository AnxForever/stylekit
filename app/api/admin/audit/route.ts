import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getAdminAuditEvents } from "@/lib/admin/audit-log";
import {
  getAdminAuditExportMaxRows,
  toAdminAuditCsv,
} from "@/lib/admin/audit-csv";
import type { AdminAuditEvent } from "@/lib/admin/audit-log";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limitParam = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const offsetParam = Number.parseInt(searchParams.get("offset") ?? "0", 10);
  const daysParam = Number.parseInt(searchParams.get("days") ?? "", 10);
  const action = searchParams.get("action");
  const search = searchParams.get("search");
  const format = searchParams.get("format");

  const query = {
    action,
    search,
    days: Number.isFinite(daysParam) ? daysParam : null,
  };

  if (format === "csv") {
    const maxRows = getAdminAuditExportMaxRows();
    const { events, truncated } = await collectAuditEventsForExport(query, maxRows);
    const csv = toAdminAuditCsv(events);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="admin-audit-${new Date().toISOString().slice(0, 10)}.csv"`,
        "x-export-limit": String(maxRows),
        "x-export-truncated": truncated ? "true" : "false",
      },
    });
  }

  const result = await getAdminAuditEvents({
    limit: Number.isFinite(limitParam) ? limitParam : 20,
    offset: Number.isFinite(offsetParam) ? offsetParam : 0,
    ...query,
  });

  return NextResponse.json({
    ...result,
  });
}

async function collectAuditEventsForExport(filters: {
  action: string | null;
  search: string | null;
  days: number | null;
}, maxRows: number) {
  const pageSize = 100;
  const allEvents: AdminAuditEvent[] = [];
  let offset = 0;
  let truncated = false;

  while (allEvents.length < maxRows) {
    const page = await getAdminAuditEvents({
      ...filters,
      limit: pageSize,
      offset,
    });
    const remainingRows = maxRows - allEvents.length;
    allEvents.push(...page.events.slice(0, remainingRows));

    const truncatedOnCurrentPage = page.events.length > remainingRows;
    if (allEvents.length >= maxRows && (page.hasMore || truncatedOnCurrentPage)) {
      truncated = true;
      break;
    }

    if (!page.hasMore || page.nextOffset == null) {
      break;
    }
    offset = page.nextOffset;
  }

  return { events: allEvents, truncated };
}
