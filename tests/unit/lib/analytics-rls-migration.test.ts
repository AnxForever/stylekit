import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("analytics RLS", () => {
  it("keeps public clients from inserting analytics rows directly", () => {
    const initial = readFileSync(
      path.join(process.cwd(), "lib/supabase/migrations/001_initial_schema.sql"),
      "utf8",
    );
    const lockdown = readFileSync(
      path.join(
        process.cwd(),
        "lib/supabase/migrations/014_lock_down_analytics_inserts.sql",
      ),
      "utf8",
    );

    expect(initial).not.toContain('create policy "Anyone can log events"');
    expect(initial).toContain(
      "revoke insert on table public.analytics_events from anon, authenticated",
    );
    expect(lockdown).toContain(
      'drop policy if exists "Anyone can log events" on public.analytics_events',
    );
    expect(lockdown).toContain(
      "revoke insert on table public.analytics_events from anon, authenticated",
    );
  });
});
