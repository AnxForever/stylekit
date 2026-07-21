import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("StyleKit workspace database isolation", () => {
  it("binds projects, revisions and exports to auth.uid with RLS", () => {
    const sql = readFileSync(path.join(process.cwd(), "lib/supabase/migrations/016_stylekit_workspace.sql"), "utf8");
    expect(sql.match(/enable row level security/gi)).toHaveLength(3);
    expect(sql).toMatch(/user_id uuid not null default auth\.uid\(\)/i);
    expect(sql).toMatch(/using \(user_id = auth\.uid\(\)\)/i);
    expect(sql).toMatch(/with check \(user_id = auth\.uid\(\)\)/i);
    expect(sql).toMatch(/revoke all on table public\.stylekit_projects from anon/i);
    expect(sql).toMatch(/grant select on table public\.stylekit_projects to authenticated/i);
    expect(sql).not.toMatch(/grant [^;]*(insert|update|delete)[^;]*public\.stylekit_projects[^;]*to authenticated/i);
    expect(sql).toMatch(/update_stylekit_project/i);
    expect(sql).toMatch(/delete_stylekit_project/i);
    expect(sql.match(/force row level security/gi)).toHaveLength(3);
    expect(sql).toMatch(/append_stylekit_project_revision/i);
    expect(sql).toMatch(/for update/i);
    expect(sql).toMatch(/PROJECT_REVISION_CONFLICT/i);
    expect(sql).not.toMatch(/grant select, insert on table public\.stylekit_project_revisions to authenticated/i);
    expect(sql).not.toMatch(/grant select, insert on table public\.stylekit_project_exports to authenticated/i);
    expect(sql).not.toMatch(/grant .* to anon/i);
    expect(sql).not.toMatch(/\bemail\b|ip_address|user_agent/i);
  });
});
