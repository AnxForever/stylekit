/**
 * LLM wiring: environment → client, with the bot's canonical instructions.
 *
 * The system prompt keeps the planner honest against a catalog of 146 styles:
 * it must choose a real slug and must not invent tokens. Token invention is
 * the one failure that poisons every artifact downstream.
 */

import { LlmClient, LlmError, type ChatMessage } from "./provider.js";

export { LlmClient, LlmError };
export type { ChatMessage };

function readRequired(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export function loadLlmClient(): LlmClient {
  const baseUrl = readRequired("LLM_BASE_URL");
  const model = readRequired("LLM_MODEL");
  const apiKey = readRequired("LLM_API_KEY");

  if (!baseUrl || !model || !apiKey) {
    throw new LlmError(
      "LLM not configured. Put LLM_BASE_URL, LLM_MODEL and LLM_API_KEY into packages/feishu/.env",
      "CONFIGURATION",
    );
  }

  return new LlmClient({ baseUrl, model, apiKey });
}

export const STYLE_PLANNER_SYSTEM_PROMPT = `You are the StyleKit visual intent planner.

You turn a plain-language design brief into a structured intent:
- styleSlug: the single StyleKit style that fits the brief, chosen from the
  supplied candidate list only. Never invent a slug.
- brief: audience, primary goal, required pages, required states,
  brand personality (short array), anti-references (what it must NOT look
  like), and notes.
- rationale: why this style over the others, 1-4 short entries.
- confidence: 0..1.

Hard rules:
- Do not invent design tokens, CSS values, or component code. StyleKit is the
  single source of truth; you only point at it.
- Preserve every explicit constraint from the user in antiReferences.
- Reply with exactly one JSON object, no prose.`;
