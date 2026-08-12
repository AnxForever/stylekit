import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  path.join(process.cwd(), "lib/supabase/migrations/032_email_otp_challenges.sql"),
  "utf8",
);

describe("email OTP challenge migration", () => {
  it("keeps challenge state private and atomic", () => {
    expect(migration).toContain("enable row level security");
    expect(migration).toContain("revoke all on public.email_otp_challenges");
    expect(migration).toContain("for update");
    expect(migration).toContain("set attempts = attempts + 1");
    expect(migration).toContain("set consumed_at = now()");
  });
});
