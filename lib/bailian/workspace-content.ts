// Asks the configured chat model for interface copy that fills the dashboard
// template. Mirrors requestAgentPlan: same providers, same timeout and error
// codes, so the API routes stay consistent.

import {
  BailianClientError,
  DEFAULT_DASHSCOPE_BASE_URL,
  DEFAULT_DASHSCOPE_MODEL,
  DEFAULT_DEEPSEEK_BASE_URL,
  DEFAULT_DEEPSEEK_MODEL,
  extractText,
  stripJsonFence,
  type StyleIntentProvider,
} from "./client";
import {
  WORKSPACE_CONTENT_SYSTEM_PROMPT,
  buildWorkspaceContentPrompt,
  type WorkspaceContentBrief,
} from "@/lib/workspace/content";
import { z } from "zod";

// `sections` stays unknown here: the route validates it against the live
// template, exactly like the agent route validates steps against a snapshot.
const workspaceContentPlanSchema = z
  .object({
    sections: z.unknown(),
    note: z.string().max(300).optional(),
  })
  .strict();

export interface WorkspaceContentPlan {
  sections: unknown;
  note?: string;
}

export interface RequestWorkspaceContentOptions {
  project: WorkspaceContentBrief;
  apiKey: string;
  provider?: StyleIntentProvider;
  model?: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export async function requestWorkspaceContent({
  project,
  apiKey,
  provider = "dashscope",
  model,
  baseUrl,
  timeoutMs = 30_000,
  fetchImpl = fetch,
}: RequestWorkspaceContentOptions): Promise<WorkspaceContentPlan> {
  const resolvedModel =
    model ?? (provider === "deepseek" ? DEFAULT_DEEPSEEK_MODEL : DEFAULT_DASHSCOPE_MODEL);
  const resolvedBaseUrl =
    baseUrl ??
    (provider === "deepseek" ? DEFAULT_DEEPSEEK_BASE_URL : DEFAULT_DASHSCOPE_BASE_URL);
  const providerName = provider === "deepseek" ? "DeepSeek" : "DashScope";

  if (!apiKey.trim()) {
    throw new BailianClientError(
      `${providerName} API key is not configured.`,
      "CONFIGURATION_ERROR",
      503
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
        temperature: 0.4,
        messages: [
          { role: "system", content: WORKSPACE_CONTENT_SYSTEM_PROMPT },
          { role: "user", content: buildWorkspaceContentPrompt(project) },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new BailianClientError(
        `${providerName} returned HTTP ${response.status}.`,
        "UPSTREAM_ERROR",
        502
      );
    }

    const payload = (await response.json()) as unknown;
    const text = extractText(payload);
    if (!text) {
      throw new BailianClientError(
        `${providerName} returned no text content.`,
        "INVALID_MODEL_OUTPUT"
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(stripJsonFence(text));
    } catch {
      throw new BailianClientError(
        `${providerName} returned invalid content JSON.`,
        "INVALID_MODEL_OUTPUT"
      );
    }

    const plan = workspaceContentPlanSchema.safeParse(parsed);
    if (!plan.success) {
      throw new BailianClientError(
        `${providerName} returned content outside the allowed shape.`,
        "INVALID_MODEL_OUTPUT"
      );
    }
    return plan.data;
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
