import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminSessionCookieValue,
} from "@/lib/auth/admin-session";

export const metadata: Metadata = {
  title: "Style Insights — StyleKit Admin",
};

interface StyleCount {
  slug: string;
  views?: number;
  exports?: number;
}

interface InsightsSnapshot {
  generatedAt: string;
  windowDays: number;
  totals: { pv: number; events: number; sessions: number };
  topStyles: StyleCount[];
  topExports: StyleCount[];
  dailyPv: { day: string; pv: number }[];
}

// No hardcoded fallback: this repository is public, and a analytics host
// address is infrastructure detail. Configure NEXT_PUBLIC_UMAMI_INSIGHTS_URL
// in the deployment environment; the page degrades to an empty state without it.
const INSIGHTS_URL = process.env.NEXT_PUBLIC_UMAMI_INSIGHTS_URL ?? "";

export const revalidate = 300;

export default async function StyleInsightsPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (!(await verifyAdminSessionCookieValue(sessionCookie))) {
    notFound();
  }

  const snapshot = await loadSnapshot();

  return (
    <div className="admin-shell space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Style Insights</h1>
        <p className="text-sm text-muted-foreground">
          Aggregated from self-hosted Umami · {snapshot?.windowDays}-day window
          {snapshot?.generatedAt
            ? ` · snapshot ${formatAgo(snapshot.generatedAt)}`
            : ""}
        </p>
      </header>

      {snapshot ? (
        <>
          <section className="grid grid-cols-3 gap-4">
            <StatCard label="Page Views" value={snapshot.totals.pv} />
            <StatCard label="Tracked Events" value={snapshot.totals.events} />
            <StatCard label="Sessions" value={snapshot.totals.sessions} />
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RankTable
              title="Top Styles by Views (style_view)"
              rows={snapshot.topStyles}
              valueKey="views"
            />
            <RankTable
              title="Top Exports (style_export)"
              rows={snapshot.topExports}
              valueKey="exports"
            />
          </section>

          <section className="rounded-lg border p-4">
            <h2 className="mb-3 text-sm font-semibold">Daily Page Views (7d)</h2>
            <DailyBars data={snapshot.dailyPv} />
          </section>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Insights snapshot unavailable — check the Umami host cron.
        </p>
      )}
    </div>
  );
}

async function loadSnapshot(): Promise<InsightsSnapshot | null> {
  if (!INSIGHTS_URL) return null;
  try {
    const res = await fetch(INSIGHTS_URL, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as InsightsSnapshot;
    return data.totals ? data : null;
  } catch {
    return null;
  }
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">
        {value.toLocaleString("en-US")}
      </p>
    </div>
  );
}

function RankTable({
  title,
  rows,
  valueKey,
}: {
  title: string;
  rows: StyleCount[];
  valueKey: "views" | "exports";
}) {
  const max = rows[0]?.[valueKey] ?? 1;
  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data yet.</p>
      ) : (
        <ol className="space-y-2">
          {rows.map((row, i) => {
            const value = row[valueKey] ?? 0;
            return (
              <li key={row.slug} className="flex items-center gap-3 text-sm">
                <span className="w-6 shrink-0 text-right font-mono text-xs text-muted-foreground">
                  {i + 1}
                </span>
                <span className="w-44 shrink-0 truncate font-mono text-xs">{row.slug}</span>
                <span className="h-3 min-w-0 flex-1 overflow-hidden rounded-sm bg-muted">
                  <span
                    className="block h-full rounded-sm bg-primary/60"
                    style={{ width: `${Math.max((value / max) * 100, 2)}%` }}
                  />
                </span>
                <span className="w-12 shrink-0 text-right font-mono text-xs tabular-nums">
                  {value.toLocaleString("en-US")}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function DailyBars({ data }: { data: { day: string; pv: number }[] }) {
  const max = Math.max(...data.map((d) => d.pv), 1);
  return (
    <div className="flex h-32 items-end gap-2">
      {data.map((d) => (
        <div key={d.day} className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
            {d.pv.toLocaleString("en-US")}
          </span>
          <div
            className="w-full rounded-t-sm bg-primary/60"
            style={{ height: `${Math.max((d.pv / max) * 100, 2)}%` }}
          />
          <span className="font-mono text-[10px] text-muted-foreground">
            {d.day.slice(5)}
          </span>
        </div>
      ))}
    </div>
  );
}

function formatAgo(iso: string): string {
  const diffMin = Math.max(
    0,
    Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  );
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  return `${Math.round(diffMin / 60)}h ago`;
}
