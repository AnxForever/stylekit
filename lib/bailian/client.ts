import { getStyleDetail } from "@/lib/discovery";
import {
  buildStyleIntentPrompt,
  STYLE_INTENT_SYSTEM_PROMPT,
  type StyleIntentCandidate,
  type StyleIntentKnowledgeReference,
} from "./prompt";
import { parseDemoGenerationStyleIntent, type DemoGenerationStyleIntent } from "./style-intent";

const DEMO_STYLE_SLUGS = [
  "neo-brutalist",
  "glassmorphism",
  "neumorphism",
  "editorial",
] as const;

export const DEFAULT_DASHSCOPE_MODEL = "qwen3.7-max";
export const DEFAULT_DASHSCOPE_BASE_URL =
  "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
export const DEFAULT_DEEPSEEK_MODEL = "deepseek-chat";
export const DEFAULT_DEEPSEEK_BASE_URL = "https://api.deepseek.com/chat/completions";

export type StyleIntentProvider = "dashscope" | "deepseek";

export class BailianClientError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "CONFIGURATION_ERROR"
      | "UPSTREAM_ERROR"
      | "INVALID_MODEL_OUTPUT",
    public readonly status = 502,
  ) {
    super(message);
    this.name = "BailianClientError";
  }
}

function candidates(): StyleIntentCandidate[] {
  return DEMO_STYLE_SLUGS.map((slug) => {
    const detail = getStyleDetail(slug);
    if (!detail) throw new BailianClientError(`Missing demo style: ${slug}`, "CONFIGURATION_ERROR", 500);
    return { slug, nameEn: detail.nameEn, description: detail.description };
  });
}

function stripJsonFence(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return (match?.[1] ?? trimmed).trim();
}

function extractText(value: unknown): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  const record = value as Record<string, unknown>;
  for (const key of ["text", "content", "output_text"]) {
    if (typeof record[key] === "string") return record[key] as string;
  }

  for (const key of ["message", "output"]) {
    if (record[key] && typeof record[key] === "object") {
      const nested = extractText(record[key]);
      if (nested) return nested;
    }
  }

  if (Array.isArray(record.choices) && record.choices.length > 0) {
    return extractText(record.choices[0]);
  }

  return "";
}

export interface RequestStyleIntentOptions {
  request: string;
  apiKey: string;
  provider?: StyleIntentProvider;
  model?: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  knowledge?: StyleIntentKnowledgeReference[];
}

export async function requestStyleIntent({
  request,
  apiKey,
  provider = "dashscope",
  model,
  baseUrl,
  timeoutMs = 30_000,
  fetchImpl = fetch,
  knowledge = [],
}: RequestStyleIntentOptions): Promise<DemoGenerationStyleIntent> {
  const resolvedModel = model ?? (provider === "deepseek" ? DEFAULT_DEEPSEEK_MODEL : DEFAULT_DASHSCOPE_MODEL);
  const resolvedBaseUrl = baseUrl ?? (provider === "deepseek" ? DEFAULT_DEEPSEEK_BASE_URL : DEFAULT_DASHSCOPE_BASE_URL);
  const providerName = provider === "deepseek" ? "DeepSeek" : "DashScope";

  if (!apiKey.trim()) {
    throw new BailianClientError(
      `${providerName} API key is not configured.`,
      "CONFIGURATION_ERROR",
      503,
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(resolvedBaseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: resolvedModel,
        temperature: 0.2,
        messages: [
          { role: "system", content: STYLE_INTENT_SYSTEM_PROMPT },
          { role: "user", content: buildStyleIntentPrompt(request, candidates(), knowledge) },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new BailianClientError(
        `${providerName} returned HTTP ${response.status}.`,
        "UPSTREAM_ERROR",
        502,
      );
    }

    const payload = (await response.json()) as unknown;
    const text = extractText(payload);
    if (!text) {
      throw new BailianClientError(
        `${providerName} returned no text content.`,
        "INVALID_MODEL_OUTPUT",
      );
    }

    try {
      return parseDemoGenerationStyleIntent(JSON.parse(stripJsonFence(text)));
    } catch {
      throw new BailianClientError(
        `${providerName} returned invalid StyleIntent JSON.`,
        "INVALID_MODEL_OUTPUT",
      );
    }
  } catch (error) {
    if (error instanceof BailianClientError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new BailianClientError(`${providerName} request timed out.`, "UPSTREAM_ERROR", 504);
    }
    throw new BailianClientError(`${providerName} request failed.`, "UPSTREAM_ERROR");
  } finally {
    clearTimeout(timeout);
  }
}
