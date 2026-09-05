/**
 * LLM wiring: environment → client, with the bot's canonical instructions.
 *
 * The system prompt keeps the planner honest against a catalog of 146 styles:
 * it must choose a real slug and must not invent tokens. Token invention is
 * the one failure that poisons every artifact downstream.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { LlmClient, LlmError, type ChatMessage } from "./provider.js";

export { LlmClient, LlmError };
export type { ChatMessage };

function parseEnvFile(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return out;
  }
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

// Same file the Feishu credentials live in, so one .env drives the whole bot.
const fromEnvFile = parseEnvFile(
  resolve(fileURLToPath(new URL("../..", import.meta.url)), ".env"),
);

function readRequired(name: string): string | undefined {
  return process.env[name]?.trim() || fromEnvFile[name]?.trim() || undefined;
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

You turn a plain-language design brief into a structured intent. Every field
in the example below is REQUIRED — return the complete object, never a
subset. Reply with exactly one JSON object, no prose, no code fences.

Return this exact shape:
{
  "schemaVersion": "style-intent-v1",
  "styleSlug": "one slug from the candidate list, verbatim",
  "confidence": 0.92,
  "rationale": ["why this style over the others, 1-4 short entries"],
  "projectType": "landing | dashboard | portfolio | blog — pick the closest",
  "brief": {
    "audience": "who this is for",
    "primaryGoal": "the single most important outcome",
    "requiredPages": ["page names"],
    "requiredStates": ["from: loading, empty, error, success, disabled"],
    "brandPersonality": ["3-6 short personality words"],
    "antiReferences": ["explicit things it must NOT look like"],
    "notes": "anything else the implementer needs"
  },
  "constraints": ["short implementer constraints"]
}

Hard rules:
- styleSlug must be copied verbatim from the candidate list. Never invent one.
- Do not invent design tokens, CSS values, or component code. StyleKit is the
  single source of truth; you only point at it.
- Preserve every explicit constraint from the user in antiReferences.
- projectType is one of exactly: landing, dashboard, portfolio, blog.
- requiredStates uses only: loading, empty, error, success, disabled.`;
