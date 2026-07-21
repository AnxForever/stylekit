import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  path.join(process.cwd(), "lib/supabase/migrations/016_stylekit_workspace.sql"),
  "utf8",
);
const restoreRoute = readFileSync(
  path.join(process.cwd(), "app/api/workspace/projects/[projectId]/restore/route.ts"),
  "utf8",
);
const generateRoute = readFileSync(
  path.join(process.cwd(), "app/api/workspace/projects/[projectId]/generate/route.ts"),
  "utf8",
);

function normalizeWhitespace(source: string) {
  return source.replace(/\s+/g, " ").trim().toLowerCase();
}

function appendRevisionFunctionBody() {
  const match = migration.match(
    /create or replace function public\.append_stylekit_project_revision\([\s\S]*?\)\s*returns jsonb[\s\S]*?as \$\$([\s\S]*?)\$\$;/i,
  );

  expect(match, "append_stylekit_project_revision should exist in migration 016").not.toBeNull();
  return normalizeWhitespace(match?.[1] ?? "");
}

describe("StyleKit workspace revision transaction contract", () => {
  it("creates a project and immutable revision one in a single database function", () => {
    const sql = normalizeWhitespace(migration);
    const start = sql.indexOf("create or replace function public.create_stylekit_project(");
    const end = sql.indexOf("create or replace function public.append_stylekit_project_revision(");
    const body = sql.slice(start, end);

    expect(start).toBeGreaterThanOrEqual(0);
    const ownerLock = body.indexOf(
      "perform pg_advisory_xact_lock(hashtextextended(owner_id::text, 0))",
    );
    const projectLimitCheck = body.indexOf(
      "if (select count(*) from public.stylekit_projects where user_id = owner_id and status = 'active') >= 50 then",
    );
    const projectInsert = body.indexOf("insert into public.stylekit_projects");

    expect(ownerLock).toBeGreaterThanOrEqual(0);
    expect(projectLimitCheck).toBeGreaterThan(ownerLock);
    expect(projectInsert).toBeGreaterThan(projectLimitCheck);
    expect(body).toContain("insert into public.stylekit_projects");
    expect(body).toContain("status = 'active') >= 50");
    expect(body).toContain("raise exception 'project_limit_reached'");
    expect(body).toContain("if project_snapshot ? 'generation' then");
    expect(body).toContain("raise exception 'server_revision_required'");
    expect(body).toContain("current_revision_number");
    expect(body).toContain("'active', 1");
    expect(body).toContain("insert into public.stylekit_project_revisions");
    expect(body).toContain("created_project_id, owner_id, 1, project_snapshot");
    expect(body).toContain("'manual_save', null, '创建项目'");
    expect(body).toContain("'revisionnumber', 1");
    expect(sql).toContain(
      "grant execute on function public.create_stylekit_project(jsonb, integer, text) to authenticated",
    );
  });

  it("locks the owned project row before validating and appending a revision", () => {
    const body = appendRevisionFunctionBody();
    const lock = body.indexOf(
      "select * into project_row from public.stylekit_projects where id = target_project_id and user_id = owner_id for update",
    );
    const archivedCheck = body.indexOf("if project_row.status = 'archived' then");
    const conflictCheck = body.indexOf(
      "if project_row.current_revision_number <> expected_revision_number then",
    );
    const revisionInsert = body.indexOf("insert into public.stylekit_project_revisions");
    const projectUpdate = body.indexOf("update public.stylekit_projects");

    expect(lock).toBeGreaterThanOrEqual(0);
    expect(archivedCheck).toBeGreaterThan(lock);
    expect(conflictCheck).toBeGreaterThan(archivedCheck);
    expect(revisionInsert).toBeGreaterThan(conflictCheck);
    expect(projectUpdate).toBeGreaterThan(revisionInsert);
  });

  it("rejects archived projects and stale expected revisions", () => {
    const body = appendRevisionFunctionBody();

    expect(body).toContain("if project_row.status = 'archived' then");
    expect(body).toContain("raise exception 'project_archived'");
    expect(body).toContain(
      "if project_row.current_revision_number <> expected_revision_number then",
    );
    expect(body).toContain("raise exception 'project_revision_conflict'");
    expect(body).toContain("if project_row.current_revision_number >= 200 then");
    expect(body).toContain("raise exception 'revision_limit_reached'");
  });

  it("always appends the next immutable revision before advancing the project pointer", () => {
    const body = appendRevisionFunctionBody();

    expect(body).toContain(
      "next_revision := project_row.current_revision_number + 1",
    );
    expect(body).toContain("insert into public.stylekit_project_revisions");
    expect(body).toContain(
      "target_project_id, owner_id, next_revision, revision_snapshot",
    );
    expect(body).toContain("current_revision_number = next_revision");
    expect(body).not.toMatch(/update public\.stylekit_project_revisions/);
  });

  it("keeps revision and export writes behind the authenticated append RPC", () => {
    const sql = normalizeWhitespace(migration);
    const body = appendRevisionFunctionBody();

    expect(sql).toContain(
      "grant select on table public.stylekit_project_revisions to authenticated",
    );
    expect(sql).toContain(
      "grant select on table public.stylekit_project_exports to authenticated",
    );
    expect(sql).not.toMatch(
      /grant [^;]*(insert|update|delete)[^;]*public\.stylekit_project_(revisions|exports)[^;]*to authenticated/,
    );
    expect(sql).toContain(
      "drop function if exists public.append_stylekit_project_revision(uuid, integer, jsonb, integer, text, text, text, integer)",
    );
    expect(sql).toContain(
      "revoke all on function public.append_stylekit_project_revision(uuid, integer, jsonb, integer, text, text, text, integer, uuid) from public, anon",
    );
    expect(sql).toContain(
      "grant execute on function public.append_stylekit_project_revision(uuid, integer, jsonb, integer, text, text, text, integer, uuid) to authenticated, service_role",
    );
    expect(body).toContain("if caller_role = 'service_role' then");
    expect(body).toContain("if revision_source not in ('generation', 'restore', 'import') then");
    expect(body).toContain("elsif caller_role = 'authenticated' then");
    expect(body).toContain("revision_source <> 'manual_save'");
    expect(body).toContain("revision_snapshot ? 'generation'");
    expect(body).toContain("raise exception 'server_revision_required'");
    expect(sql).toContain(
      "create unique index if not exists stylekit_exports_artifact_identity_idx on public.stylekit_project_exports (project_id, revision_number, format, artifact_sha256)",
    );
  });

  it("keeps project mutations behind quota-aware authenticated RPCs", () => {
    const sql = normalizeWhitespace(migration);

    expect(sql).toContain("grant select on table public.stylekit_projects to authenticated");
    expect(sql).not.toMatch(/grant [^;]*(insert|update|delete)[^;]*public\.stylekit_projects[^;]*to authenticated/);
    expect(sql).toContain("create or replace function public.update_stylekit_project(");
    expect(sql).toContain("project_patch - array['name', 'description', 'projecttype', 'stack', 'brief', 'selectedstyleslug', 'status']");
    expect(sql).toContain("perform pg_advisory_xact_lock(hashtextextended(owner_id::text, 0))");
    expect(sql).toContain("raise exception 'project_limit_reached'");
    expect(sql).toContain("create or replace function public.delete_stylekit_project(target_project_id uuid)");
    expect(sql).toContain("where id = target_project_id and user_id = owner_id");
  });
});

describe("StyleKit workspace restore contract", () => {
  it("restores by appending a child revision from the selected historical snapshot", () => {
    const route = normalizeWhitespace(restoreRoute);
    const sourceRead = route.indexOf('.from("stylekit_project_revisions")');
    const appendCall = route.indexOf('.rpc("append_stylekit_project_revision",');

    expect(sourceRead).toBeGreaterThanOrEqual(0);
    expect(appendCall).toBeGreaterThan(sourceRead);
    expect(route).toContain("revision_snapshot: source.snapshot");
    expect(route).toContain('revision_source: "restore"');
    expect(route).toContain("revision_parent_number: source.revision_number");
    expect(route).toContain("const admin = getsupabaseadmin()");
    expect(route).toContain('admin.rpc("append_stylekit_project_revision",');
    expect(route).toContain("target_owner_id: user.id");
    expect(route).not.toMatch(
      /\.from\("stylekit_project_revisions"\)\s*\.update\(/,
    );
    expect(route).not.toMatch(
      /\.from\("stylekit_project_revisions"\)\s*\.upsert\(/,
    );
  });

  it("passes optimistic concurrency through the RPC and maps conflicts to HTTP 409", () => {
    const route = normalizeWhitespace(restoreRoute);

    expect(route).toContain(
      "expected_revision_number: parsed.data.expectedrevisionnumber",
    );
    expect(route).toContain('includes("project_revision_conflict")');
    expect(route).toContain('code: "project_revision_conflict"');
    expect(route).toContain("status: 409");
    expect(route).toContain("status: 201");
  });

  it("uses the service role for server-authored generation revisions", () => {
    const route = normalizeWhitespace(generateRoute);

    expect(route).toContain("const admin = getsupabaseadmin()");
    expect(route).toContain('admin.rpc("append_stylekit_project_revision",');
    expect(route).toContain('revision_source: "generation"');
    expect(route).toContain("target_owner_id: user.id");
    expect(route).not.toContain('client.rpc("append_stylekit_project_revision",');
  });
});
