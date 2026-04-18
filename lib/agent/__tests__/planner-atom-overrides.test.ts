/**
 * Phase 3.x planner round-trip: verify that atomOverrides survives the loop.
 *
 * Strategy: mock `requestAgentWithTools` to capture the user payload and
 * feed back a scripted finalize call, then assert both directions:
 *   - Incoming overrides (from UI / history) show up inside confirmedSlots
 *   - Finalize args containing atomOverrides land on the resulting AgentPlannerResult
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AgentConversationMessage, AgentToolTurnResult } from "../provider";

vi.mock("../provider", async () => {
  const actual = await vi.importActual<typeof import("../provider")>("../provider");
  return {
    ...actual,
    requestAgentWithTools: vi.fn(),
  };
});

import { runPlannerWithTools } from "../planner-with-tools";
import { requestAgentWithTools } from "../provider";
import { isEmptyOverrides, type AtomOverrides } from "../atom-overrides";
import type { AgentMessage, AgentPlannerResult } from "../types";

function userMsg(id: string, content: string): AgentMessage {
  return {
    id,
    role: "user",
    content,
    createdAt: new Date().toISOString(),
    planner: null,
    codePrompt: null,
    toolTrace: [],
    promptSnapshot: null,
    decisionTrace: [],
  };
}

function assistantMsg(id: string, planner: AgentPlannerResult): AgentMessage {
  return {
    id,
    role: "assistant",
    content: "...",
    createdAt: new Date().toISOString(),
    planner,
    codePrompt: null,
    toolTrace: [],
    promptSnapshot: null,
    decisionTrace: [],
  };
}

function scriptedFinalizeCall(finalizeArgs: Record<string, unknown>): AgentToolTurnResult {
  return {
    stopReason: "tool_use",
    content: null,
    toolCalls: [
      {
        id: "call_1",
        name: "finalize_planner_result",
        argumentsJson: JSON.stringify(finalizeArgs),
      },
    ],
    rawAssistantMessage: {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_1",
          type: "function",
          function: {
            name: "finalize_planner_result",
            arguments: JSON.stringify(finalizeArgs),
          },
        },
      ],
    },
  };
}

function captureUserPayload(): string {
  const calls = vi.mocked(requestAgentWithTools).mock.calls;
  const last = calls.at(-1)?.[0];
  if (!last) throw new Error("requestAgentWithTools was not called");
  const userMsg = (last.messages as AgentConversationMessage[]).find((m) => m.role === "user");
  if (!userMsg || typeof userMsg.content !== "string") {
    throw new Error("user message missing");
  }
  return userMsg.content;
}

describe("isEmptyOverrides", () => {
  it("treats undefined as empty", () => {
    expect(isEmptyOverrides(undefined)).toBe(true);
  });
  it("treats {} as empty", () => {
    expect(isEmptyOverrides({})).toBe(true);
  });
  it("treats whitespace-only values as empty", () => {
    expect(isEmptyOverrides({ motion: "   " } as AtomOverrides)).toBe(true);
  });
  it("returns false when at least one dimension has a non-empty slug", () => {
    expect(isEmptyOverrides({ motion: "cyberpunk-neon" })).toBe(false);
  });
});

describe("runPlannerWithTools atomOverrides round-trip", () => {
  beforeEach(() => {
    vi.mocked(requestAgentWithTools).mockReset();
  });

  it("injects incoming UI overrides into confirmedSlots so the LLM sees them", async () => {
    vi.mocked(requestAgentWithTools).mockResolvedValueOnce(
      scriptedFinalizeCall({
        ready: false,
        phase: "feel",
        normalizedQuery: "portfolio",
        productType: "Portfolio",
        audience: "",
        visualTone: "",
        styleSlug: "",
        mustHave: [],
        constraints: [],
        followUpQuestion: "Pick a vibe.",
        suggestedOptions: [],
        reasoning: [],
        context: {},
      })
    );

    const messages: AgentMessage[] = [userMsg("u1", "做个作品集")];

    await runPlannerWithTools({
      locale: "en",
      messages,
      atomOverrides: { motion: "cyberpunk-neon", color: "apple-style" },
    });

    const payload = captureUserPayload();
    expect(payload).toContain("atomOverrides");
    expect(payload).toContain("cyberpunk-neon");
    expect(payload).toContain("apple-style");
  });

  it("echoes atomOverrides from finalize args onto the planner result", async () => {
    const echoed = { motion: "glassmorphism" };
    vi.mocked(requestAgentWithTools).mockResolvedValueOnce(
      scriptedFinalizeCall({
        ready: false,
        phase: "confirm",
        normalizedQuery: "q",
        productType: "Portfolio",
        audience: "Designers",
        visualTone: "Expressive",
        styleSlug: "neo-brutalist",
        mustHave: [],
        constraints: [],
        followUpQuestion: "",
        suggestedOptions: [],
        reasoning: [],
        context: {},
        atomOverrides: echoed,
      })
    );

    const messages: AgentMessage[] = [userMsg("u1", "ok")];

    const result = await runPlannerWithTools({
      locale: "en",
      messages,
      atomOverrides: echoed,
    });

    expect(result.planner.atomOverrides).toEqual(echoed);
  });

  it("drops empty atomOverrides from the planner result (undefined, not {})", async () => {
    vi.mocked(requestAgentWithTools).mockResolvedValueOnce(
      scriptedFinalizeCall({
        ready: false,
        phase: "goal",
        normalizedQuery: "q",
        productType: "",
        audience: "",
        visualTone: "",
        styleSlug: "",
        mustHave: [],
        constraints: [],
        followUpQuestion: "?",
        suggestedOptions: [],
        reasoning: [],
        context: {},
        atomOverrides: {},
      })
    );

    const messages: AgentMessage[] = [userMsg("u1", "hi")];

    const result = await runPlannerWithTools({
      locale: "en",
      messages,
    });

    expect(result.planner.atomOverrides).toBeUndefined();
  });

  it("accumulates atomOverrides from prior assistant planner turns when no new overrides arrive", async () => {
    const messages: AgentMessage[] = [
      userMsg("u1", "hi"),
      assistantMsg("a1", {
        ready: false,
        phase: "feel",
        normalizedQuery: "q",
        productType: "Portfolio",
        audience: "Designers",
        visualTone: "Expressive",
        styleSlug: "neo-brutalist",
        mustHave: [],
        constraints: [],
        followUpQuestion: "",
        suggestedOptions: [],
        reasoning: [],
        context: {},
        atomOverrides: { motion: "cyberpunk-neon" },
      }),
      userMsg("u2", "next"),
    ];

    vi.mocked(requestAgentWithTools).mockResolvedValueOnce(
      scriptedFinalizeCall({
        ready: false,
        phase: "confirm",
        normalizedQuery: "q",
        productType: "Portfolio",
        audience: "Designers",
        visualTone: "Expressive",
        styleSlug: "neo-brutalist",
        mustHave: [],
        constraints: [],
        followUpQuestion: "",
        suggestedOptions: [],
        reasoning: [],
        context: {},
      })
    );

    await runPlannerWithTools({ locale: "en", messages });

    const payload = captureUserPayload();
    expect(payload).toContain("atomOverrides");
    expect(payload).toContain("cyberpunk-neon");
  });
});
