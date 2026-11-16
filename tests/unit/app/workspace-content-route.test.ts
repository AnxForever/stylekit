import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
  getRequestClientKey: vi.fn(() => "client-key"),
}));

import { POST as requestContent } from "@/app/api/workspace/projects/[projectId]/content/route";
import { getAuthServerClient, getServerUser } from "@/lib/auth/supabase-server";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const PROJECT_ID = "11111111-1111-4111-8111-111111111111";

const ROW = {
  name: "客户数据后台",
  description: "面向运营团队的 B2B SaaS",
  project_type: "dashboard",
  brief: { audience: "运营团队", primaryGoal: "查看收入和账户风险" },
  status: "active",
};

function request(method = "POST") {
  return new Request("https://stylekit.top/api/workspace/projects/" + PROJECT_ID + "/content", {
    method,
    headers: { "content-type": "application/json", origin: "https://stylekit.top" },
    body: method === "GET" ? undefined : "{}",
  });
}

const context = { params: Promise.resolve({ projectId: PROJECT_ID }) };

function authenticated(row: Record<string, unknown> | null) {
  const maybeSingle = vi.fn().mockResolvedValue({ data: row, error: null });
  const eq = vi.fn().mockReturnValue({ maybeSingle });
  const select = vi.fn().mockReturnValue({ eq });
  const from = vi.fn().mockReturnValue({ select });
  vi.mocked(getServerUser).mockResolvedValue({ id: "user-a" } as never);
  vi.mocked(getAuthServerClient).mockResolvedValue({ from } as never);
  return { from, maybeSingle };
}

const originalApiKey = process.env.DASHSCOPE_API_KEY;
const originalProvider = process.env.STYLE_ADVISOR_PROVIDER;

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(verifyTrustedOrigin).mockReturnValue({ ok: true });
  vi.mocked(parseJsonBodyWithLimit).mockResolvedValue({ ok: true, data: { mode: "replay" } });
  vi.mocked(checkRateLimit).mockReturnValue({
    allowed: true,
    limit: 10,
    remaining: 9,
    resetAt: Date.now() + 60_000,
    retryAfterSec: 60,
  });
  delete process.env.DASHSCOPE_API_KEY;
  process.env.STYLE_ADVISOR_PROVIDER = "dashscope";
});

afterEach(() => {
  vi.unstubAllGlobals();
  if (originalApiKey === undefined) delete process.env.DASHSCOPE_API_KEY;
  else process.env.DASHSCOPE_API_KEY = originalApiKey;
  if (originalProvider === undefined) delete process.env.STYLE_ADVISOR_PROVIDER;
  else process.env.STYLE_ADVISOR_PROVIDER = originalProvider;
});

describe("/api/workspace/projects/[projectId]/content", () => {
  it("rejects a cross-origin request before reading the body", async () => {
    vi.mocked(verifyTrustedOrigin).mockReturnValue({ ok: false, status: 403, error: "请求来源不可信。" });

    const response = await requestContent(request(), context);

    expect(response.status).toBe(403);
    expect(parseJsonBodyWithLimit).not.toHaveBeenCalled();
  });

  it("requires a session before touching the database", async () => {
    const from = vi.fn();
    vi.mocked(getServerUser).mockResolvedValue(null);
    vi.mocked(getAuthServerClient).mockResolvedValue({ from } as never);

    const response = await requestContent(request(), context);

    expect(response.status).toBe(401);
    expect(from).not.toHaveBeenCalled();
  });

  it("rate limits before reading the project", async () => {
    vi.mocked(checkRateLimit).mockReturnValue({
      allowed: false,
      limit: 10,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      retryAfterSec: 60,
    });
    const { from } = authenticated(ROW);

    const response = await requestContent(request(), context);

    expect(response.status).toBe(429);
    expect(from).not.toHaveBeenCalled();
  });

  it("returns 404 when the project is gone", async () => {
    authenticated(null);

    const response = await requestContent(request(), context);

    expect(response.status).toBe(404);
  });

  it("refuses an archived project", async () => {
    authenticated({ ...ROW, status: "archived" });

    const response = await requestContent(request(), context);

    expect(response.status).toBe(409);
  });

  it("refuses a template that does not have interface copy yet", async () => {
    authenticated({ ...ROW, project_type: "landing" });

    const response = await requestContent(request(), context);

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({ code: "UNSUPPORTED_CAPABILITY" });
  });

  it("returns the replay copy validated against the dashboard template", async () => {
    authenticated(ROW);

    const response = await requestContent(request(), context);

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    const payload = (await response.json()) as {
      source: string;
      fieldCount: number;
      content: Record<string, Record<string, string>>;
      summary: Array<{ label: string }>;
    };
    expect(payload).toMatchObject({ success: true, source: "replay", model: "fixture", fieldCount: 28 });
    expect(payload.content.kpi.sectionTitle).toBe("本季度收入概览");
    expect(payload.summary.some((entry) => entry.label === "图表标题")).toBe(true);
  });

  it("asks for a configured key instead of pretending live generation worked", async () => {
    vi.mocked(parseJsonBodyWithLimit).mockResolvedValue({ ok: true, data: { mode: "live" } });
    authenticated(ROW);

    const response = await requestContent(request(), context);

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ code: "CONFIGURATION_ERROR" });
  });

  it("rejects model copy that names a field the template does not have", async () => {
    process.env.DASHSCOPE_API_KEY = "test-key";
    vi.mocked(parseJsonBodyWithLimit).mockResolvedValue({ ok: true, data: { mode: "live" } });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            choices: [
              {
                message: {
                  content: '{"sections":{"kpi":{"sectionTitle":"X","heroUrl":"https://example.com"}}}',
                },
              },
            ],
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        )
      )
    );
    authenticated(ROW);

    const response = await requestContent(request(), context);

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({ code: "INVALID_MODEL_OUTPUT" });
  });
});
