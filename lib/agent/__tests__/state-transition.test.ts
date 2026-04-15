import { describe, expect, it } from "vitest";
import {
  buildWorkflowSnapshot,
  getPlannerCoverage,
  getMissingPlannerSlots,
  getPlannerSlotSnapshots,
} from "@/lib/agent/state-transition";
import type { AgentMessage, AgentPlannerResult } from "@/lib/agent/types";

const basePlanner: AgentPlannerResult = {
  ready: true,
  normalizedQuery: "enterprise saas dashboard",
  productType: "Enterprise SaaS Dashboard",
  audience: "Enterprise operations leaders",
  visualTone: "Professional and clear",
  mustHave: ["Primary KPIs"],
  constraints: ["Keep the first screen concise"],
  followUpQuestion: "",
  reasoning: [],
  context: {
    targetAudience: "enterprise",
    primaryDevice: "mobile",
  },
};

const baseMessages: AgentMessage[] = [
  {
    id: "u1",
    role: "user",
    content: "I need an enterprise dashboard",
    createdAt: "2026-04-14T00:00:00.000Z",
    planner: null,
    codePrompt: null,
    toolTrace: [],
    promptSnapshot: null,
    decisionTrace: [],
  },
];

describe("state-transition", () => {
  it("reports missing planner slots when the brief is not ready", () => {
    const planner: AgentPlannerResult = {
      ...basePlanner,
      ready: false,
      audience: "",
      constraints: [],
    };

    expect(getMissingPlannerSlots(planner)).toEqual(["audience", "constraints"]);

    expect(
      buildWorkflowSnapshot({
        messages: baseMessages,
        planner,
      })
    ).toEqual({
      state: "needs_input",
      reason: "missing_slots",
      missingSlots: ["audience", "constraints"],
      hadExistingPlan: false,
    });
  });

  it("marks the first complete plan as plan_ready", () => {
    expect(
      buildWorkflowSnapshot({
        messages: baseMessages,
        planner: basePlanner,
      })
    ).toEqual({
      state: "plan_ready",
      reason: "initial_plan_ready",
      missingSlots: [],
      hadExistingPlan: false,
    });
  });

  it("returns slot snapshots and coverage for the planner", () => {
    const snapshots = getPlannerSlotSnapshots(basePlanner);

    expect(snapshots).toEqual([
      { slot: "productType", filled: true, value: "Enterprise SaaS Dashboard" },
      { slot: "audience", filled: true, value: "Enterprise operations leaders" },
      { slot: "visualTone", filled: true, value: "Professional and clear" },
      { slot: "mustHave", filled: true, value: "Primary KPIs" },
      { slot: "constraints", filled: true, value: "Keep the first screen concise" },
    ]);

    expect(getPlannerCoverage(basePlanner)).toEqual({
      filledCount: 5,
      total: 5,
      percent: 100,
    });
  });

  it("marks later complete turns as plan_refined when a plan already exists", () => {
    const messages: AgentMessage[] = [
      ...baseMessages,
      {
        id: "a1",
        role: "assistant",
        content: "Here is the first plan.",
        createdAt: "2026-04-14T00:00:10.000Z",
        planner: basePlanner,
        codePrompt: {
          title: "Landing - Glassmorphism",
          prompt: "You are building a...",
          styleName: "Glassmorphism",
          styleSlug: "glassmorphism",
          templateType: "Landing",
        },
        toolTrace: [],
        promptSnapshot: null,
        decisionTrace: [],
      },
    ];

    expect(
      buildWorkflowSnapshot({
        messages,
        planner: basePlanner,
      })
    ).toEqual({
      state: "plan_refined",
      reason: "plan_refined",
      missingSlots: [],
      hadExistingPlan: true,
    });
  });
});
