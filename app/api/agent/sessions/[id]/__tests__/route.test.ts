import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
}));

vi.mock("@/lib/agent/provider", () => ({
  isAgentModelConfigured: vi.fn(),
}));

vi.mock("@/lib/agent/storage", () => ({
  isAgentStorageConfigured: vi.fn(),
  getAgentSessionDetail: vi.fn(),
}));

import { GET } from "@/app/api/agent/sessions/[id]/route";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isAgentModelConfigured } from "@/lib/agent/provider";
import {
  getAgentSessionDetail,
  isAgentStorageConfigured,
} from "@/lib/agent/storage";

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedIsAgentModelConfigured = vi.mocked(isAgentModelConfigured);
const mockedIsAgentStorageConfigured = vi.mocked(isAgentStorageConfigured);
const mockedGetAgentSessionDetail = vi.mocked(getAgentSessionDetail);

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/agent/sessions/[id]", () => {
  it("requires authentication", async () => {
    mockedIsAgentStorageConfigured.mockReturnValue(true);
    mockedIsAgentModelConfigured.mockReturnValue(true);
    mockedGetServerUser.mockResolvedValue(null);

    const response = await GET(new Request("https://stylekit.top/api/agent/sessions/s1"), {
      params: Promise.resolve({ id: "s1" }),
    });

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Authentication required",
    });
  });

  it("returns the session detail when the session exists", async () => {
    mockedIsAgentStorageConfigured.mockReturnValue(true);
    mockedIsAgentModelConfigured.mockReturnValue(true);
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedGetAgentSessionDetail.mockResolvedValue({
      id: "session-1",
      locale: "en",
      title: "Agent test",
      status: "plan_ready",
      createdAt: "2026-04-14T00:00:00.000Z",
      updatedAt: "2026-04-14T00:00:00.000Z",
      lastMessageAt: "2026-04-14T00:00:00.000Z",
      messages: [
        {
          id: "m1",
          role: "user",
          content: "Hello",
          createdAt: "2026-04-14T00:00:00.000Z",
          planner: null,
          codePrompt: null,
          toolTrace: [],
          promptSnapshot: null,
          decisionTrace: [],
        },
      ],
    });

    const response = await GET(new Request("https://stylekit.top/api/agent/sessions/session-1"), {
      params: Promise.resolve({ id: "session-1" }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        success: true,
        session: expect.objectContaining({
          id: "session-1",
          messages: [
            expect.objectContaining({
              id: "m1",
              content: "Hello",
            }),
          ],
        }),
      })
    );
  });
});
