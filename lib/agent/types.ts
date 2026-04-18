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
export type AgentConsultPhase =
  | "goal"
  | "audience"
  | "feel"
  | "feel-layout"
  | "confirm"
  | "revise"
  | "refine"
  | "done";
export type AgentWorkflowReason =
  | "missing_slots"
  | "consulting"
  | "awaiting_confirmation"
  | "revising"
  | "initial_plan_ready"
  | "plan_refined"
  | "legacy_active";

export interface AgentSuggestedOption {
  id: string;
  label: string;
  description: string;
}

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
  /* Phase 3.x: per-dimension atom source overrides from the Blend UI. */
  atomOverrides?: import("./atom-overrides").AtomOverrides;
}

export interface AgentChatResponse {
  success: true;
  sessionId: string;
  userMessage: AgentMessage;
  assistantMessage: string;
  followUpNeeded: boolean;
  workflowState: AgentSessionStatus;
  workflow: AgentWorkflowSnapshot;
  planner: AgentPlannerResult | null;
  codePrompt: AgentCodePrompt | null;
  suggestedOptions: AgentSuggestedOption[];
  toolTrace: AgentToolTrace[];
  promptSnapshot: AgentPromptSnapshot | null;
  decisionTrace: AgentDecisionTraceItem[];
  session: AgentSessionSummary;
  assistant: AgentMessage;
}

export interface AgentPlannerResult {
  ready: boolean;
  phase: AgentConsultPhase;
  normalizedQuery: string;
  productType: string;
  audience: string;
  visualTone: string;
  styleSlug: string;
  mustHave: string[];
  constraints: string[];
  followUpQuestion: string;
  suggestedOptions: AgentSuggestedOption[];
  reasoning: string[];
  context: RecommendationContext;
  /* Phase 2: multi-dimensional brief — all optional, populated progressively by feel-layout / refine sub-phases. */
  layoutHint?: string;
  motionHint?: string;
  colorHint?: string;
  typographyHint?: string;
  /* Phase 3.x: per-dimension atom source overrides for cross-style blending.
   * Keys: StyleAtomKey; values: source style slug with hasCompleteAtoms === true.
   * Consumed by prompt-composer to build a multi-source atoms section. */
  atomOverrides?: import("./atom-overrides").AtomOverrides;
}
