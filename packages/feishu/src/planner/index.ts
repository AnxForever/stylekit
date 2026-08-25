/**
 * The planner: plain-language brief → one real style slug.
 *
 * The model sees the full 146-style catalog and must choose from it. The
 * result is checked against the registry before it leaves this module, so a
 * hallucinated slug can never reach the artifact generators.
 */

import { getStyleBySlug } from "stylekit-core/styles";
import { STYLE_PLANNER_SYSTEM_PROMPT, type ChatMessage, type LlmClient } from "../llm/index.js";
import { parseStyleIntent, type StyleIntent } from "./intent.js";
import { buildStyleCandidates, renderCandidateList } from "./prompt.js";

export type { StyleIntent };
export { parseStyleIntent };

export interface PlanRequest {
  brief: string;
}

export async function planStyle(
  llm: LlmClient,
  request: PlanRequest,
): Promise<StyleIntent> {
  const candidates = buildStyleCandidates();

  const messages: ChatMessage[] = [
    { role: "system", content: STYLE_PLANNER_SYSTEM_PROMPT },
    {
      role: "user",
      content: [
        `Candidate styles (${candidates.length} total — read every one before choosing):`,
        renderCandidateList(candidates),
        "",
        "User brief:",
        request.brief.trim(),
      ].join("\n"),
    },
  ];

  const raw = await llm.chatJson<unknown>(messages, {
    temperature: 0.2,
    timeoutMs: 120_000,
  });

  const intent = parseStyleIntent(raw);

  // The schema only proves the slug is well-formed. Confirm the style
  // actually exists before it is allowed to drive everything downstream.
  if (!getStyleBySlug(intent.styleSlug)) {
    throw new Error(
      `Planner chose a style that is not in the catalog: ${intent.styleSlug}`,
    );
  }

  return intent;
}
