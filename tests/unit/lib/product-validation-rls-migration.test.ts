import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("product validation database boundary", () => {
  it("keeps participant and event evidence private and service-role only", () => {
    const sql = readFileSync(
      path.join(
        process.cwd(),
        "lib/supabase/migrations/015_product_validation.sql",
      ),
      "utf8",
    );

    expect(sql).toMatch(/enable row level security/gi);
    expect(sql).toMatch(/revoke all on table public\.product_validation_participants from anon, authenticated/i);
    expect(sql).toMatch(/revoke all on table public\.product_validation_events from anon, authenticated/i);
    expect(sql).toMatch(/revoke all on table public\.product_validation_interviews from anon, authenticated/i);
    expect(sql).not.toMatch(/create policy/i);
    expect(sql).not.toMatch(/\b(?:email|ip_address|user_agent)\s+(?:text|varchar|jsonb)/i);
    expect(sql).toMatch(/withdrawn_at timestamptz/i);
    expect(sql).toMatch(/delete from public\.product_validation_events/i);
    expect(sql).toMatch(/revoke all on function public\.withdraw_product_validation_participant/i);
    expect(sql).toMatch(/grant execute on function public\.withdraw_product_validation_participant\(text, text\) to service_role/i);
  });
});
