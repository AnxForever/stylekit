import type {
  AgentMessage,
  AgentPlannerResult,
  AgentPlannerSlot,
  AgentPlannerSlotSnapshot,
  AgentWorkflowSnapshot,
} from "./types";

const SLOT_ORDER: AgentPlannerSlot[] = [
  "productType",
  "audience",
  "visualTone",
  "mustHave",
  "constraints",
];

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function hasList(value: string[]): boolean {
  return value.some((item) => item.trim().length > 0);
}

function getPlannerSlotValue(
  planner: AgentPlannerResult,
  slot: AgentPlannerSlot
): string {
  switch (slot) {
    case "productType":
      return planner.productType.trim();
    case "audience":
      return planner.audience.trim();
    case "visualTone":
      return planner.visualTone.trim();
    case "mustHave":
      return planner.mustHave.filter((item) => item.trim().length > 0).join(", ");
    case "constraints":
      return planner.constraints.filter((item) => item.trim().length > 0).join(", ");
    default:
      return "";
  }
}

export function getMissingPlannerSlots(
  planner: AgentPlannerResult
): AgentPlannerSlot[] {
  return SLOT_ORDER.filter((slot) => {
    if (slot === "mustHave" || slot === "constraints") {
      return !hasList(slot === "mustHave" ? planner.mustHave : planner.constraints);
    }

    return !hasText(getPlannerSlotValue(planner, slot));
  });
}

export function getPlannerSlotSnapshots(
  planner: AgentPlannerResult
): AgentPlannerSlotSnapshot[] {
  return SLOT_ORDER.map((slot) => {
    const value = getPlannerSlotValue(planner, slot);
    return {
      slot,
      filled: value.length > 0,
      value,
    };
  });
}

export function getPlannerCoverage(planner: AgentPlannerResult): {
  filledCount: number;
  total: number;
  percent: number;
} {
  const snapshots = getPlannerSlotSnapshots(planner);
  const filledCount = snapshots.filter((item) => item.filled).length;
  const total = snapshots.length;

  return {
    filledCount,
    total,
    percent: Math.round((filledCount / total) * 100),
  };
}

export function buildWorkflowSnapshot({
  messages,
  planner,
}: {
  messages: AgentMessage[];
  planner: AgentPlannerResult;
}): AgentWorkflowSnapshot {
  const hadExistingPlan = messages.some(
    (message) => message.role === "assistant" && message.codePrompt
  );
  const missingSlots = getMissingPlannerSlots(planner);

  if (!planner.ready) {
    return {
      state: "needs_input",
      reason: "missing_slots",
      missingSlots,
      hadExistingPlan,
    };
  }

  if (hadExistingPlan) {
    return {
      state: "plan_refined",
      reason: "plan_refined",
      missingSlots,
      hadExistingPlan,
    };
  }

  return {
    state: "plan_ready",
    reason: "initial_plan_ready",
    missingSlots,
    hadExistingPlan,
  };
}
