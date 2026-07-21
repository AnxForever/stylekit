import { AnalyticsPage, createAnalyticsMetadata } from "../_page";
import { getAdminAuditEvents } from "@/lib/admin/audit-log";

export const metadata = createAnalyticsMetadata("audit");

export default async function AdminAuditAnalyticsPage() {
  const audit = await getAdminAuditEvents({ limit: 12, offset: 0, days: 7 });
  return <AnalyticsPage view="audit" initialAudit={audit} />;
}
