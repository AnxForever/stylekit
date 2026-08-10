import type { StyleIntent } from "./style-intent";

export interface StyleIntentCandidate {
  slug: string;
  nameEn: string;
  description: string;
}

export interface StyleIntentKnowledgeReference {
  id: string;
  name: string;
  summary: string;
  tags: string[];
  sourceUrl: string;
  usagePolicy: string;
}

export const STYLE_INTENT_SYSTEM_PROMPT = `You are the StyleKit visual intent planner.

Return exactly one JSON object and no Markdown. The JSON must match this shape:
{
  "schemaVersion": "style-intent-v1",
  "styleSlug": "one candidate slug",
  "confidence": 0.0,
  "rationale": ["short reason"],
  "projectType": "dashboard",
  "brief": {
    "audience": "...",
    "primaryGoal": "...",
    "requiredPages": ["..."],
    "requiredStates": ["loading", "empty", "error", "success"],
    "brandPersonality": ["..."],
    "antiReferences": ["..."],
    "notes": "..."
  },
  "constraints": ["...", "..."]
}

Rules:
- Choose styleSlug only from the supplied candidate list.
- Do not invent design tokens, CSS values, component code, or unsupported project types.
- Keep rationale and constraints short and actionable.
- Preserve explicit user constraints in antiReferences or notes.
- Use an integer-like confidence between 0 and 1, where 1 means the brief is a strong match.
- Published knowledge references are context only. Do not claim to have copied code from them.
- Never use a reference whose usage policy is not supplied by StyleKit.
`;

export function buildStyleIntentPrompt(
  request: string,
  candidates: StyleIntentCandidate[],
  knowledge: StyleIntentKnowledgeReference[] = [],
): string {
  const candidateText = candidates
    .map(
      (candidate) =>
        `- ${candidate.slug}: ${candidate.nameEn} — ${candidate.description}`,
    )
    .join("\n");

  const knowledgeText = knowledge.length > 0
    ? knowledge.map((reference) => `- ${reference.id}: ${reference.name} — ${reference.summary} [${reference.usagePolicy}]`).join("\n")
    : "- No published external knowledge references are available for this request.";

  return `${STYLE_INTENT_SYSTEM_PROMPT}

Candidate styles:
${candidateText}

Published knowledge references:
${knowledgeText}

User brief:
${request.trim()}
`;
}

export function isStyleIntent(value: unknown): value is StyleIntent {
  return Boolean(value && typeof value === "object" && "schemaVersion" in value);
}
