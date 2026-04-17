/**
 * Agent observability primitives: token counting, cost estimation,
 * per-turn metric tracking.
 *
 * Design:
 *   - Pure TypeScript (no external telemetry SDK) — ready to wire into
 *     OpenTelemetry / PostHog / Datadog later.
 *   - Zero-cost when disabled: TurnTracker's overhead is one Map.set per
 *     LLM call and Date.now().
 *   - Cost table is a deliberate snapshot, not live — update alongside
 *     model deprecations. Prices in USD per 1M tokens.
 */

export type LLMCallPurpose =
  | "planner"
  | "reflector"
  | "responder"
  | "follow_up"
  | "responder_stream"
  | "other";

export interface LLMUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  /** Tokens served from prompt cache — billed at a deep discount. */
  cachedTokens?: number;
}

export interface LLMCallRecord {
  purpose: LLMCallPurpose;
  model: string;
  usage: LLMUsage;
  durationMs: number;
  costUsd: number;
  timestamp: string;
}

export interface TurnMetrics {
  sessionId?: string;
  totalDurationMs: number;
  llmCallCount: number;
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalCostUsd: number;
  reflectionTriggered: boolean;
  calls: LLMCallRecord[];
}

/* ---------- Pricing table (USD per 1M tokens, snapshot) ----------
 *
 * Update whenever OpenAI/Anthropic shifts prices. Unknown models fall back
 * to a conservative default so cost is never reported as $0 by accident.
 */
export interface ModelPricing {
  input: number; // $/1M
  output: number;
  cachedInput?: number;
}

const PRICING_TABLE: Record<string, ModelPricing> = {
  /* OpenAI */
  "gpt-4o-mini": { input: 0.15, output: 0.6, cachedInput: 0.075 },
  "gpt-4o": { input: 2.5, output: 10.0, cachedInput: 1.25 },
  "gpt-4.1-mini": { input: 0.15, output: 0.6, cachedInput: 0.075 },
  "gpt-4.1": { input: 3.0, output: 12.0, cachedInput: 1.5 },
  "gpt-4.1-nano": { input: 0.1, output: 0.4 },
  "o1-mini": { input: 1.1, output: 4.4 },
  "o1-preview": { input: 15.0, output: 60.0 },
  "o3-mini": { input: 1.1, output: 4.4 },

  /* Anthropic (for future) */
  "claude-haiku-4-5": { input: 1.0, output: 5.0 },
  "claude-sonnet-4-6": { input: 3.0, output: 15.0 },
  "claude-opus-4-7": { input: 15.0, output: 75.0 },
};

const DEFAULT_PRICING: ModelPricing = { input: 1.0, output: 3.0 };

/**
 * Approximate token count without a real tokenizer.
 * Rough rule: ~3.5 chars/token for mixed EN+ZH content.
 * Accuracy ±20% — good enough for budget estimation, not billing.
 */
export function approxTokenCount(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 3.5);
}

/**
 * Estimate cost in USD for an LLM call.
 * Uses the pricing table; unknown models fall back to DEFAULT_PRICING.
 */
export function estimateCost(model: string, usage: LLMUsage): number {
  const pricing = PRICING_TABLE[model] ?? DEFAULT_PRICING;
  const cachedTokens = usage.cachedTokens ?? 0;
  const billablePrompt = Math.max(0, usage.promptTokens - cachedTokens);
  const cachedCost =
    cachedTokens > 0 && pricing.cachedInput
      ? (cachedTokens * pricing.cachedInput) / 1_000_000
      : 0;
  const promptCost = (billablePrompt * pricing.input) / 1_000_000;
  const completionCost = (usage.completionTokens * pricing.output) / 1_000_000;
  return promptCost + completionCost + cachedCost;
}

/**
 * Per-turn metric collector. Pass its `record` method as an onUsage
 * callback to provider functions; at turn end call `snapshot()`.
 */
export class TurnTracker {
  private readonly startedAt = Date.now();
  private readonly calls: LLMCallRecord[] = [];
  private readonly sessionId?: string;
  private reflectionTriggered = false;

  constructor(sessionId?: string) {
    this.sessionId = sessionId;
  }

  record(args: {
    purpose: LLMCallPurpose;
    model: string;
    usage: LLMUsage;
    durationMs: number;
  }): void {
    const costUsd = estimateCost(args.model, args.usage);
    this.calls.push({
      purpose: args.purpose,
      model: args.model,
      usage: args.usage,
      durationMs: args.durationMs,
      costUsd,
      timestamp: new Date(Date.now()).toISOString(),
    });
  }

  markReflectionTriggered(): void {
    this.reflectionTriggered = true;
  }

  snapshot(): TurnMetrics {
    const totalPromptTokens = this.calls.reduce((sum, c) => sum + c.usage.promptTokens, 0);
    const totalCompletionTokens = this.calls.reduce(
      (sum, c) => sum + c.usage.completionTokens,
      0
    );
    const totalCostUsd = this.calls.reduce((sum, c) => sum + c.costUsd, 0);

    return {
      sessionId: this.sessionId,
      totalDurationMs: Date.now() - this.startedAt,
      llmCallCount: this.calls.length,
      totalPromptTokens,
      totalCompletionTokens,
      totalCostUsd,
      reflectionTriggered: this.reflectionTriggered,
      calls: [...this.calls],
    };
  }
}

/**
 * Callback signature for provider functions to report usage back to the
 * caller without breaking the return type.
 */
export type OnUsageCallback = (args: {
  purpose: LLMCallPurpose;
  model: string;
  usage: LLMUsage;
  durationMs: number;
}) => void;
