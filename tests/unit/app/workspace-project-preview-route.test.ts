import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
  getAuthServerClient: vi.fn(),
}));

import { GET as getPreview } from "@/app/api/workspace/projects/[projectId]/preview/route";
import {
  getAuthServerClient,
  getServerUser,
} from "@/lib/auth/supabase-server";

const PROJECT_ID = "11111111-1111-4111-8111-111111111111";
const ROW = {
  name: "客户数据后台",
  description: "面向运营团队的 B2B SaaS",
  project_type: "dashboard",
  stack: ["nextjs", "typescript"],
  brief: {
    audience: "运营团队",
    primaryGoal: "查看收入和账户风险",
    requiredPages: ["概览"],
    requiredStates: ["loading", "empty", "error", "success"],
    brandPersonality: ["专业"],
    antiReferences: [],
    notes: "",
  },
  selected_style_slug: "neo-brutalist",
  status: "active",
  current_revision_number: 3,
};

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedGetAuthServerClient = vi.mocked(getAuthServerClient);

function authenticated(row: Record<string, unknown> | null, error: unknown = null) {
  const maybeSingle = vi.fn().mockResolvedValue({ data: row, error });
  const eq = vi.fn().mockReturnValue({ maybeSingle });
  const select = vi.fn().mockReturnValue({ eq });
  mockedGetServerUser.mockResolvedValue({ id: "user-a" } as never);
  mockedGetAuthServerClient.mockResolvedValue({
    from: vi.fn().mockReturnValue({ select }),
  } as never);
  return { select, eq, maybeSingle };
}

function previewRequest(query = "") {
  return new Request(
    "https://stylekit.top/api/workspace/projects/" + PROJECT_ID + "/preview" + query,
    { method: "GET" }
  );
}

const context = {
  params: Promise.resolve({ projectId: PROJECT_ID }),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("/api/workspace/projects/[projectId]/preview", () => {
  it("requires a session before touching the database", async () => {
    const from = vi.fn();
    mockedGetServerUser.mockResolvedValue(null);
    mockedGetAuthServerClient.mockResolvedValue({ from } as never);

    const response = await getPreview(previewRequest(), context);

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({ success: false });
    expect(from).not.toHaveBeenCalled();
  });

  it("rejects a project id that is not a uuid", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-a" } as never);
    mockedGetAuthServerClient.mockResolvedValue({ from: vi.fn() } as never);

    const response = await getPreview(new Request("https://stylekit.top/x"), {
      params: Promise.resolve({ projectId: "not-a-uuid" }),
    });

    expect(response.status).toBe(400);
  });

  it("returns 404 when the project is gone", async () => {
    authenticated(null);

    const response = await getPreview(previewRequest(), context);

    expect(response.status).toBe(404);
  });

  it("renders the saved project and reports its revision", async () => {
    authenticated(ROW);

    const response = await getPreview(previewRequest(), context);

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      preview: {
        styleSlug: "neo-brutalist",
        templateType: "dashboard",
        unsavedStyle: false,
        revisionNumber: 3,
      },
    });
    const payload = (await (await getPreview(previewRequest(), context)).json()) as {
      preview: { html: string };
    };
    expect(payload.preview.html).toContain("客户数据后台");
  });

  it("renders a style the user is still deciding on", async () => {
    authenticated(ROW);

    const saved = (await (await getPreview(previewRequest(), context)).json()) as {
      preview: { html: string };
    };
    const response = await getPreview(previewRequest("?style=editorial"), context);

    expect(response.status).toBe(200);
    const payload = (await response.json()) as {
      preview: { html: string; styleSlug: string; unsavedStyle: boolean };
    };
    expect(payload.preview).toMatchObject({ styleSlug: "editorial", unsavedStyle: true });
    expect(payload.preview.html).not.toBe(saved.preview.html);
  });

  it("refuses a style the generator does not support", async () => {
    authenticated(ROW);

    const response = await getPreview(previewRequest("?style=not-a-style"), context);

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({
      code: "UNSUPPORTED_CAPABILITY",
    });
  });

  it("refuses an incomplete project row", async () => {
    authenticated({ ...ROW, brief: { audience: 42 } });

    const response = await getPreview(previewRequest(), context);

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({ success: false });
  });
});
