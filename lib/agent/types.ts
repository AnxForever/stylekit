import type { Locale } from "@/lib/i18n/translations";
import type { RecommendationContext } from "@/lib/knowledge";

export type AgentMessageRole = "user" | "assistant";
export type AgentRecommendationType = "style" | "template" | "page";
export type AgentSessionStatus =
  | "active"
  | "needs_input"
  | "plan_ready"
  | "plan_refined";
export type AgentPlannerSlot =
  | "productType"
  | "audience"
  | "visualTone"
  | "mustHave"
  | "constraints";
export type AgentWorkflowReason =
  | "missing_slots"
  | "initial_plan_ready"
  | "plan_refined"
  | "legacy_active";

export interface AgentPageContext {
  path?: string;
  styleSlug?: string;
  templateSlug?: string;
}

export interface AgentRecommendation {
  id: string;
  type: AgentRecommendationType;
  slug?: string;
  href: string;
  title: string;
  reason: string;
  confidence: number;
}

export interface AgentToolTrace {
  tool: string;
  ok: boolean;
  meta?: Record<string, unknown>;
}

export interface AgentPromptSnapshotEntry {
  system: string;
  user: string;
  summary: string[];
}

export interface AgentPromptSnapshot {
  planner: AgentPromptSnapshotEntry;
  responder: AgentPromptSnapshotEntry | null;
}

export type AgentDecisionTraceType =
  | "workflow"
  | "follow_up"
  | "style_selection"
  | "template_selection"
  | "next_step";

export interface AgentDecisionTraceItem {
  type: AgentDecisionTraceType;
  title: string;
  summary: string;
  evidence: string[];
}

export interface AgentWorkflowSnapshot {
  state: AgentSessionStatus;
  reason: AgentWorkflowReason;
  missingSlots: AgentPlannerSlot[];
  hadExistingPlan: boolean;
}

export interface AgentPlannerSlotSnapshot {
  slot: AgentPlannerSlot;
  filled: boolean;
  value: string;
}

export interface AgentPlanSection {
  id: string;
  title: string;
  purpose: string;
}

export interface AgentPlanCard {
  pageType: string;
  pageGoal: string;
  targetAudience: string;
  visualDirection: string;
  templateType: string;
  primaryAction: string;
  secondaryAction: string | null;
  sections: AgentPlanSection[];
  contentPriorities: string[];
  mustInclude: string[];
  constraints: string[];
  risks: string[];
  mobileNotes: string[];
  nextStep: string;
}

export interface AgentCodePrompt {
  title: string;
  prompt: string;
  styleName: string;
  styleSlug: string;
  templateType: string;
}

export interface AgentMessage {
  id: string;
  role: AgentMessageRole;
  content: string;
  createdAt: string;
  planner: AgentPlannerResult | null;
  codePrompt: AgentCodePrompt | null;
  toolTrace: AgentToolTrace[];
  promptSnapshot: AgentPromptSnapshot | null;
  decisionTrace: AgentDecisionTraceItem[];
}

export interface AgentSessionSummary {
  id: string;
  locale: Locale;
  title: string;
  status: AgentSessionStatus;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
}

export interface AgentSessionDetail extends AgentSessionSummary {
  messages: AgentMessage[];
}

export interface AgentChatRequest {
  sessionId?: string;
  message: string;
  locale: Locale;
  pageContext?: AgentPageContext;
}

export interface AgentChatResponse {
  success: true;
  sessionId: string;
  assistantMessage: string;
  followUpNeeded: boolean;
  workflowState: AgentSessionStatus;
  workflow: AgentWorkflowSnapshot;
  planner: AgentPlannerResult | null;
  codePrompt: AgentCodePrompt | null;
  toolTrace: AgentToolTrace[];
  promptSnapshot: AgentPromptSnapshot | null;
  decisionTrace: AgentDecisionTraceItem[];
  session: AgentSessionSummary;
  assistant: AgentMessage;
}

export interface AgentPlannerResult {
  ready: boolean;
  normalizedQuery: string;
  productType: string;
  audience: string;
  visualTone: string;
  mustHave: string[];
  constraints: string[];
  followUpQuestion: string;
  reasoning: string[];
  context: RecommendationContext;
}
