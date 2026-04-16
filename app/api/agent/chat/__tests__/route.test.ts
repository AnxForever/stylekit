import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
}));

vi.mock("@/lib/agent/provider", () => ({
  isAgentModelConfigured: vi.fn(),
  AgentProviderError: class AgentProviderError extends Error {
    code: string;
    status: number;

    constructor(message: string, code = "AGENT_PROVIDER_ERROR", status = 500) {
      super(message);
      this.code = code;
      this.status = status;
    }
  },
}));

vi.mock("@/lib/agent/storage", () => ({
  isAgentStorageConfigured: vi.fn(),
  getAgentSessionDetail: vi.fn(),
  createAgentSessionForUser: vi.fn(),
  appendAgentMessage: vi.fn(),
  listAgentSessionsForUser: vi.fn(),
}));

vi.mock("@/lib/agent/orchestrator", () => ({
  runAgentTurn: vi.fn(),
}));

import { POST } from "@/app/api/agent/chat/route";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isAgentModelConfigured } from "@/lib/agent/provider";
import {
  appendAgentMessage,
  createAgentSessionForUser,
  getAgentSessionDetail,
  isAgentStorageConfigured,
  listAgentSessionsForUser,
} from "@/lib/agent/storage";
import { runAgentTurn } from "@/lib/agent/orchestrator";
import type { AgentPlannerResult, AgentPromptSnapshot, AgentWorkflowSnapshot } from "@/lib/agent/types";

const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedGetServerUser = vi.mocked(getServerUser);
const mockedIsAgentModelConfigured = vi.mocked(isAgentModelConfigured);
const mockedIsAgentStorageConfigured = vi.mocked(isAgentStorageConfigured);
const mockedGetAgentSessionDetail = vi.mocked(getAgentSessionDetail);
const mockedCreateAgentSessionForUser = vi.mocked(createAgentSessionForUser);
const mockedAppendAgentMessage = vi.mocked(appendAgentMessage);
const mockedListAgentSessionsForUser = vi.mocked(listAgentSessionsForUser);
const mockedRunAgentTurn = vi.mocked(runAgentTurn);

afterEach(() => {
  vi.clearAllMocks();
});

const sampleCodePrompt = {
  title: "Landing - Glassmorphism",
  prompt: "You are building a...",
  styleName: "Glassmorphism",
  styleSlug: "glassmorphism",
  templateType: "Landing",
};

const samplePlanner: AgentPlannerResult = {
  ready: true,
  phase: "done",
  normalizedQuery: "enterprise saas dashboard",
  productType: "SaaS dashboard",
  audience: "Enterprise buyers",
  visualTone: "Professional",
  styleSlug: "",
  mustHave: ["Value proposition", "Primary KPIs"],
  constraints: ["Prioritize accessibility"],
  followUpQuestion: "",
  suggestedOptions: [],
  reasoning: ["productType=dashboard", "audience=enterprise buyers"],
  context: {
    targetAudience: "enterprise",
    primaryDevice: "mobile",
    accessibilityPriority: true,
  },
};

const sampleWorkflow: AgentWorkflowSnapshot = {
  state: "plan_ready",
  reason: "initial_plan_ready",
  missingSlots: [],
  hadExistingPlan: false,
};

const samplePromptSnapshot: AgentPromptSnapshot = {
  planner: {
    system: "planner system",
    user: "{\"conversation\":\"Help me design a SaaS dashboard\"}",
    summary: ["Recent conversation turns: 1", "Latest user input: Help me design a SaaS dashboard"],
  },
  responder: {
    system: "responder system",
    user: "{\"planner\":{\"normalizedQuery\":\"enterprise saas dashboard\"}}",
    summary: ["Normalized query: enterprise saas dashboard", "Recommendations: 1"],
  },
};

function mockConfiguredUser() {
  mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
  mockedIsAgentModelConfigured.mockReturnValue(true);
  mockedIsAgentStorageConfigured.mockReturnValue(true);
  mockedGetServerUser.mockResolvedValue({
    id: "user-1",
  } as never);
}

describe("POST /api/agent/chat", () => {
  it("returns 503 when the model is not configured", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedIsAgentStorageConfigured.mockReturnValue(true);
    mockedIsAgentModelConfigured.mockReturnValue(false);

    const response = await POST(
      new Request("https://stylekit.top/api/agent/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ locale: "en", message: "Help me pick a style" }),
      })
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Agent model is not configured.",
    });
  });

  it("creates a session on the first turn and persists both messages", async () => {
    mockConfiguredUser();
    mockedGetAgentSessionDetail.mockResolvedValue(null);
    mockedCreateAgentSessionForUser.mockResolvedValue({
      id: "session-1",
      locale: "en",
      title: "Help me design a SaaS dashboard",
      status: "needs_input",
      createdAt: "2026-04-14T00:00:00.000Z",
      updatedAt: "2026-04-14T00:00:00.000Z",
      lastMessageAt: "2026-04-14T00:00:00.000Z",
    });
    mockedAppendAgentMessage
      .mockResolvedValueOnce({
        id: "msg-user",
        role: "user",
        content: "Help me design a SaaS dashboard",
        createdAt: "2026-04-14T00:00:01.000Z",
        planner: null,
        codePrompt: null,
        toolTrace: [],
        promptSnapshot: null,
        decisionTrace: [],
      })
      .mockResolvedValueOnce({
        id: "msg-assistant",
        role: "assistant",
        content: "Start with a more professional visual direction.",
        createdAt: "2026-04-14T00:00:02.000Z",
        planner: samplePlanner,
        codePrompt: sampleCodePrompt,
        toolTrace: [{ tool: "searchKnowledge", ok: true }],
        promptSnapshot: samplePromptSnapshot,
        decisionTrace: [],
      });
    mockedRunAgentTurn.mockResolvedValue({
      assistantMessage: "Start with a more professional visual direction.",
      followUpNeeded: false,
      workflowState: "plan_ready",
      workflow: sampleWorkflow,
      planner: samplePlanner,
      codePrompt: sampleCodePrompt,
      toolTrace: [{ tool: "searchKnowledge", ok: true }],
      promptSnapshot: samplePromptSnapshot,
      decisionTrace: [],
    });
    mockedListAgentSessionsForUser.mockResolvedValue([
      {
        id: "session-1",
        locale: "en",
        title: "Help me design a SaaS dashboard",
        status: "plan_ready",
        createdAt: "2026-04-14T00:00:00.000Z",
        updatedAt: "2026-04-14T00:00:02.000Z",
        lastMessageAt: "2026-04-14T00:00:02.000Z",
      },
    ]);

    const response = await POST(
      new Request("https://stylekit.top/api/agent/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          locale: "en",
          message: "Help me design a SaaS dashboard",
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(mockedCreateAgentSessionForUser).toHaveBeenCalledWith({
      userId: "user-1",
      locale: "en",
      titleSeed: "Help me design a SaaS dashboard",
    });
    expect(mockedAppendAgentMessage).toHaveBeenNthCalledWith(1, {
      sessionId: "session-1",
      role: "user",
      content: "Help me design a SaaS dashboard",
    });
    expect(mockedAppendAgentMessage).toHaveBeenNthCalledWith(2, {
      sessionId: "session-1",
      role: "assistant",
      content: "Start with a more professional visual direction.",
      planner: samplePlanner,
      codePrompt: sampleCodePrompt,
      toolTrace: [{ tool: "searchKnowledge", ok: true }],
      promptSnapshot: samplePromptSnapshot,
      decisionTrace: [],
      sessionStatus: "plan_ready",
    });
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        success: true,
        sessionId: "session-1",
        assistantMessage: "Start with a more professional visual direction.",
        followUpNeeded: false,
        workflowState: "plan_ready",
        workflow: sampleWorkflow,
        planner: samplePlanner,
        codePrompt: sampleCodePrompt,
        promptSnapshot: samplePromptSnapshot,
        decisionTrace: [],
      })
    );
  });

  it("continues an existing session instead of creating a new one", async () => {
    mockConfiguredUser();
    mockedGetAgentSessionDetail.mockResolvedValue({
      id: "session-2",
      locale: "zh",
      title: "企业官网建议",
      status: "needs_input",
      createdAt: "2026-04-14T00:00:00.000Z",
      updatedAt: "2026-04-14T00:00:00.000Z",
      lastMessageAt: "2026-04-14T00:00:00.000Z",
      messages: [
        {
          id: "m1",
          role: "user",
          content: "我要做企业官网",
          createdAt: "2026-04-14T00:00:00.000Z",
          planner: null,
          codePrompt: null,
          toolTrace: [],
          promptSnapshot: null,
          decisionTrace: [],
        },
      ],
    });
    mockedAppendAgentMessage
      .mockResolvedValueOnce({
        id: "m2",
        role: "user",
        content: "更偏专业，而且移动端优先",
        createdAt: "2026-04-14T00:00:01.000Z",
        planner: null,
        codePrompt: null,
        toolTrace: [],
        promptSnapshot: null,
        decisionTrace: [],
      })
      .mockResolvedValueOnce({
        id: "m3",
        role: "assistant",
        content: "那我会把可访问性和移动端一起纳入推荐。",
        createdAt: "2026-04-14T00:00:02.000Z",
        planner: {
          ...samplePlanner,
          ready: false,
          normalizedQuery: "企业官网",
          productType: "企业官网",
          audience: "",
          visualTone: "专业",
          followUpQuestion: "你更偏向展示品牌形象，还是更偏向收集销售线索？",
        },
        codePrompt: null,
        toolTrace: [],
        promptSnapshot: {
          planner: {
            system: "planner system",
            user: "{\"conversation\":\"I need something cleaner\"}",
            summary: ["Recent conversation turns: 3"],
          },
          responder: null,
        },
        decisionTrace: [],
      });
    mockedRunAgentTurn.mockResolvedValue({
      assistantMessage: "那我会把可访问性和移动端一起纳入推荐。",
      followUpNeeded: true,
      workflowState: "needs_input",
      workflow: {
        state: "needs_input",
        reason: "missing_slots",
        missingSlots: ["audience", "constraints"],
        hadExistingPlan: false,
      },
      planner: {
        ...samplePlanner,
        ready: false,
        normalizedQuery: "企业官网",
        productType: "企业官网",
        audience: "",
        visualTone: "专业",
        followUpQuestion: "你更偏向展示品牌形象，还是更偏向收集销售线索？",
      },
      codePrompt: null,
      toolTrace: [],
      promptSnapshot: {
        planner: {
          system: "planner system",
          user: "{\"conversation\":\"I need something cleaner\"}",
          summary: ["Recent conversation turns: 3"],
        },
        responder: null,
      },
      decisionTrace: [],
    });
    mockedListAgentSessionsForUser.mockResolvedValue([
      {
        id: "session-2",
        locale: "zh",
        title: "企业官网建议",
        status: "needs_input",
        createdAt: "2026-04-14T00:00:00.000Z",
        updatedAt: "2026-04-14T00:00:02.000Z",
        lastMessageAt: "2026-04-14T00:00:02.000Z",
      },
    ]);

    const response = await POST(
      new Request("https://stylekit.top/api/agent/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sessionId: "session-2",
          locale: "zh",
          message: "更偏专业，而且移动端优先",
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(mockedCreateAgentSessionForUser).not.toHaveBeenCalled();
    expect(mockedRunAgentTurn).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: "zh",
        messages: expect.arrayContaining([
          expect.objectContaining({ id: "m1", content: "我要做企业官网" }),
          expect.objectContaining({ id: "m2", content: "更偏专业，而且移动端优先" }),
        ]),
      })
    );
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        success: true,
        sessionId: "session-2",
        followUpNeeded: true,
        workflowState: "needs_input",
        workflow: expect.objectContaining({
          state: "needs_input",
          reason: "missing_slots",
        }),
      })
    );
  });
});
