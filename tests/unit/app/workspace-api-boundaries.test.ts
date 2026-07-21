import { createHash } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
  getAuthServerClient: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/security/json-body", () => ({
  parseJsonBodyWithLimit: vi.fn(),
}));

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(),
  createRateLimitHeaders: vi.fn(() => ({ "retry-after": "60" })),
}));

vi.mock("@/lib/styles", () => ({
  getStyleBySlug: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import {
  GET as getProjects,
  POST as createProject,
} from "@/app/api/workspace/projects/route";
import {
  DELETE as deleteProject,
  GET as getProject,
  PATCH as patchProject,
} from "@/app/api/workspace/projects/[projectId]/route";
import {
  POST as appendRevision,
} from "@/app/api/workspace/projects/[projectId]/revisions/route";
import {
  POST as restoreRevision,
} from "@/app/api/workspace/projects/[projectId]/restore/route";
import {
  POST as createExport,
} from "@/app/api/workspace/projects/[projectId]/exports/route";
import {
  POST as generateProject,
} from "@/app/api/workspace/projects/[projectId]/generate/route";
import {
  GET as downloadExport,
} from "@/app/api/workspace/exports/[exportId]/download/route";
import {
  getAuthServerClient,
  getServerUser,
} from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const PROJECT_ID = "11111111-1111-4111-8111-111111111111";
const EXPORT_ID = "22222222-2222-4222-8222-222222222222";

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedGetAuthServerClient = vi.mocked(getAuthServerClient);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

function request(method: string) {
  return new Request("https://stylekit.top/api/workspace/test", {
    method,
    headers: {
      "content-type": "application/json",
      origin: "https://stylekit.top",
    },
    ...(method === "GET" ? {} : { body: "{}" }),
  });
}

function params<T extends string>(key: T, value: string) {
  return { params: Promise.resolve({ [key]: value }) } as {
    params: Promise<Record<T, string>>;
  };
}

function authenticated(client: unknown) {
  mockedGetServerUser.mockResolvedValue({ id: "user-a" } as never);
  mockedGetAuthServerClient.mockResolvedValue(client as never);
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
  mockedCheckRateLimit.mockReturnValue({ allowed: true, limit: 10, remaining: 9, resetAt: Date.now() + 60_000, retryAfterSec: 60 });
  mockedGetSupabaseAdmin.mockReturnValue(null);
});

describe("workspace API security and request boundaries", () => {
  it("returns 401 for an unauthenticated project list without querying the database", async () => {
    const from = vi.fn();
    mockedGetServerUser.mockResolvedValue(null);
    mockedGetAuthServerClient.mockResolvedValue({ from } as never);

    const response = await getProjects();

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({ success: false });
    expect(from).not.toHaveBeenCalled();
  });

  it("creates project and revision one through the atomic RPC instead of a table insert", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: {
        name: "客户数据后台",
        description: "运营工作区",
        projectType: "dashboard",
        stack: ["nextjs", "typescript"],
        selectedStyleSlug: null,
        brief: {
          audience: "运营团队",
          primaryGoal: "查看风险",
          requiredPages: ["概览"],
          requiredStates: ["success"],
          brandPersonality: ["克制"],
          antiReferences: [],
          notes: "",
        },
      },
    });
    const rpc = vi.fn().mockResolvedValue({
      data: { projectId: PROJECT_ID, revisionId: "33333333-3333-4333-8333-333333333333", revisionNumber: 1 },
      error: null,
    });
    const maybeSingle = vi.fn().mockResolvedValue({
      data: { id: PROJECT_ID, name: "客户数据后台", current_revision_number: 1 },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    const insert = vi.fn();
    authenticated({ rpc, from: vi.fn().mockReturnValue({ select, insert }) });

    const response = await createProject(request("POST"));

    expect(response.status).toBe(201);
    expect(rpc).toHaveBeenCalledWith("create_stylekit_project", expect.objectContaining({
      revision_schema_version: 1,
      revision_content_sha256: expect.stringMatching(/^sha256:[0-9a-f]{64}$/),
    }));
    expect(insert).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toMatchObject({
      project: { id: PROJECT_ID, current_revision_number: 1 },
    });
  });

  it("returns 400 for an invalid project UUID", async () => {
    authenticated({ from: vi.fn() });

    const response = await getProject(
      request("GET"),
      params("projectId", "not-a-uuid"),
    );

    expect(response?.status).toBe(400);
  });

  it("rejects a cross-origin project update before parsing or authentication", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      status: 403,
      error: "请求来源不可信。",
    });

    const response = await patchProject(
      request("PATCH"),
      params("projectId", PROJECT_ID),
    );

    expect(response?.status).toBe(403);
    expect(mockedParseJsonBodyWithLimit).not.toHaveBeenCalled();
    expect(mockedGetServerUser).not.toHaveBeenCalled();
    expect(mockedGetAuthServerClient).not.toHaveBeenCalled();
  });

  it("returns 413 for an oversized project update before authentication", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: false,
      status: 413,
      error: "请求体过大。",
    });

    const response = await patchProject(
      request("PATCH"),
      params("projectId", PROJECT_ID),
    );

    expect(response?.status).toBe(413);
    expect(mockedParseJsonBodyWithLimit).toHaveBeenCalledWith(
      expect.any(Request),
      { maxBytes: 16 * 1024 },
    );
    expect(mockedGetServerUser).not.toHaveBeenCalled();
    expect(mockedGetAuthServerClient).not.toHaveBeenCalled();
  });

  it("updates projects through the controlled RPC instead of direct table mutation", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({ ok: true, data: { name: "新版工作区" } });
    const rpc = vi.fn().mockResolvedValue({
      data: { id: PROJECT_ID, name: "新版工作区", current_revision_number: 3 },
      error: null,
    });
    const from = vi.fn();
    authenticated({ rpc, from });

    const response = await patchProject(request("PATCH"), params("projectId", PROJECT_ID));

    expect(response?.status).toBe(200);
    expect(rpc).toHaveBeenCalledWith("update_stylekit_project", {
      target_project_id: PROJECT_ID,
      project_patch: { name: "新版工作区" },
    });
    expect(from).not.toHaveBeenCalled();
  });

  it("deletes projects through the owner-scoped RPC instead of direct table mutation", async () => {
    const rpc = vi.fn().mockResolvedValue({ data: true, error: null });
    const from = vi.fn();
    authenticated({ rpc, from });

    const response = await deleteProject(request("DELETE"), params("projectId", PROJECT_ID));

    expect(response?.status).toBe(200);
    expect(rpc).toHaveBeenCalledWith("delete_stylekit_project", { target_project_id: PROJECT_ID });
    expect(from).not.toHaveBeenCalled();
  });

  it("returns 404 when RLS hides another user's project", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    authenticated({
      from: vi.fn().mockReturnValue({ select }),
    });

    const response = await getProject(
      request("GET"),
      params("projectId", PROJECT_ID),
    );

    expect(response?.status).toBe(404);
    expect(eq).toHaveBeenCalledWith("id", PROJECT_ID);
  });

  it("returns 400 when appending a revision to an invalid project UUID", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: {
        expectedRevisionNumber: 0,
        snapshot: {
          name: "Workspace",
          projectType: "landing",
        },
      },
    });
    authenticated({ rpc: vi.fn() });

    const response = await appendRevision(
      request("POST"),
      params("projectId", "not-a-uuid"),
    );

    expect(response.status).toBe(400);
  });

  it("returns 422 instead of silently degrading an unsupported generation target", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { expectedRevisionNumber: 0, target: "react" },
    });

    const response = await generateProject(
      request("POST"),
      params("projectId", PROJECT_ID),
    );

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({ code: "UNSUPPORTED_CAPABILITY" });
    expect(mockedGetServerUser).not.toHaveBeenCalled();
  });

  it("rate limits authenticated generation before reading the project", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { expectedRevisionNumber: 1, target: "nextjs" },
    });
    mockedCheckRateLimit.mockReturnValue({ allowed: false, limit: 10, remaining: 0, resetAt: Date.now() + 60_000, retryAfterSec: 60 });
    const from = vi.fn();
    authenticated({ from });

    const response = await generateProject(
      request("POST"),
      params("projectId", PROJECT_ID),
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("60");
    expect(mockedCheckRateLimit).toHaveBeenCalledWith(expect.objectContaining({ namespace: "workspace-generate", key: "user-a", limit: 10 }));
    expect(from).not.toHaveBeenCalled();
  });

  it("returns 404 when RLS hides another user's revision during restore", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { revisionNumber: 2, expectedRevisionNumber: 3 },
    });
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const secondEq = vi.fn().mockReturnValue({ maybeSingle });
    const firstEq = vi.fn().mockReturnValue({ eq: secondEq });
    const select = vi.fn().mockReturnValue({ eq: firstEq });
    const rpc = vi.fn();
    authenticated({
      from: vi.fn().mockReturnValue({ select }),
      rpc,
    });

    const response = await restoreRevision(
      request("POST"),
      params("projectId", PROJECT_ID),
    );

    expect(response.status).toBe(404);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("writes a restore revision through service role after the user-owned source is read", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { revisionNumber: 2, expectedRevisionNumber: 3 },
    });
    const maybeSingle = vi.fn().mockResolvedValue({
      data: {
        snapshot: { name: "客户数据后台", projectType: "dashboard", status: "active" },
        document_schema_version: 1,
        content_sha256: `sha256:${"a".repeat(64)}`,
        revision_number: 2,
      },
      error: null,
    });
    const secondEq = vi.fn().mockReturnValue({ maybeSingle });
    const firstEq = vi.fn().mockReturnValue({ eq: secondEq });
    const select = vi.fn().mockReturnValue({ eq: firstEq });
    const userRpc = vi.fn();
    authenticated({ from: vi.fn().mockReturnValue({ select }), rpc: userRpc });
    const adminRpc = vi.fn().mockResolvedValue({
      data: { revisionNumber: 4 },
      error: null,
    });
    mockedGetSupabaseAdmin.mockReturnValue({ rpc: adminRpc } as never);

    const response = await restoreRevision(
      request("POST"),
      params("projectId", PROJECT_ID),
    );

    expect(response.status).toBe(201);
    expect(userRpc).not.toHaveBeenCalled();
    expect(adminRpc).toHaveBeenCalledWith(
      "append_stylekit_project_revision",
      expect.objectContaining({
        target_project_id: PROJECT_ID,
        target_owner_id: "user-a",
        revision_source: "restore",
        revision_parent_number: 2,
      }),
    );
  });

  it("returns 404 when RLS hides another user's project during export", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { revisionNumber: 1 },
    });
    const projectMaybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const revisionMaybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const from = vi.fn((table: string) => {
      if (table === "stylekit_projects") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({ maybeSingle: projectMaybeSingle }),
          }),
        };
      }
      return {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({ maybeSingle: revisionMaybeSingle }),
          }),
        }),
      };
    });
    authenticated({ from });

    const response = await createExport(
      request("POST"),
      params("projectId", PROJECT_ID),
    );

    expect(response.status).toBe(404);
    expect(from).toHaveBeenCalledWith("stylekit_projects");
    expect(from).toHaveBeenCalledWith("stylekit_project_revisions");
  });

  it("upserts one authoritative export identity for repeated artifact requests", async () => {
    mockedParseJsonBodyWithLimit.mockResolvedValue({ ok: true, data: { revisionNumber: 2 } });
    const content = "export test";
    const generation = {
      engineVersion: "workspace-generator-v1",
      target: "nextjs",
      templateType: "dashboard",
      styleSlug: "editorial",
      files: [{ name: "README.md", type: "md", content, sha256: `sha256:${createHash("sha256").update(content).digest("hex")}` }],
      quality: { errors: [], warnings: [] },
    };
    const projectMaybeSingle = vi.fn().mockResolvedValue({ data: { name: "客户数据后台", status: "active" }, error: null });
    const revisionMaybeSingle = vi.fn().mockResolvedValue({ data: { snapshot: { name: "客户数据后台", generation }, created_at: "2026-07-11T00:00:00.000Z" }, error: null });
    const from = vi.fn((table: string) => table === "stylekit_projects"
      ? { select: vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({ maybeSingle: projectMaybeSingle }) }) }
      : { select: vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({ eq: vi.fn().mockReturnValue({ maybeSingle: revisionMaybeSingle }) }) }) });
    authenticated({ from });

    const single = vi.fn().mockResolvedValue({ data: { id: EXPORT_ID, artifact_sha256: `sha256:${"f".repeat(64)}` }, error: null });
    const select = vi.fn().mockReturnValue({ single });
    const upsert = vi.fn().mockReturnValue({ select });
    mockedGetSupabaseAdmin.mockReturnValue({ from: vi.fn().mockReturnValue({ upsert }) } as never);

    const response = await createExport(request("POST"), params("projectId", PROJECT_ID));

    expect(response.status).toBe(201);
    expect(upsert).toHaveBeenCalledWith(expect.objectContaining({ project_id: PROJECT_ID, revision_number: 2, format: "zip" }), {
      onConflict: "project_id,revision_number,format,artifact_sha256",
    });
  });

  it("returns 401 for an unauthenticated export download without querying the database", async () => {
    const from = vi.fn();
    mockedGetServerUser.mockResolvedValue(null);
    mockedGetAuthServerClient.mockResolvedValue({ from } as never);

    const response = await downloadExport(
      request("GET"),
      params("exportId", EXPORT_ID),
    );

    expect(response.status).toBe(401);
    expect(from).not.toHaveBeenCalled();
  });

  it("returns 404 when RLS hides another user's export", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: null });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    authenticated({
      from: vi.fn().mockReturnValue({ select }),
    });

    const response = await downloadExport(
      request("GET"),
      params("exportId", EXPORT_ID),
    );

    expect(response.status).toBe(404);
    expect(eq).toHaveBeenCalledWith("id", EXPORT_ID);
  });

  it("does not disguise an export database failure as a missing export", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({ data: null, error: { message: "database unavailable" } });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    authenticated({ from: vi.fn().mockReturnValue({ select }) });

    const response = await downloadExport(
      request("GET"),
      params("exportId", EXPORT_ID),
    );

    expect(response.status).toBe(500);
  });

  it("rejects downloads whose export record is not generated", async () => {
    const maybeSingle = vi.fn().mockResolvedValue({
      data: {
        project_id: PROJECT_ID,
        revision_number: 1,
        artifact_sha256: `sha256:${"a".repeat(64)}`,
        status: "failed",
        verification: {},
      },
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ maybeSingle });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    authenticated({ from });

    const response = await downloadExport(
      request("GET"),
      params("exportId", EXPORT_ID),
    );

    expect(response.status).toBe(409);
    expect(from).toHaveBeenCalledTimes(1);
  });
});
