/**
 * Minimal OpenAI-compatible chat client.
 *
 * Deliberately provider-agnostic: any endpoint that speaks the chat/completions
 * wire format works (official providers, gateways, self-hosted). The bot reads
 * LLM_BASE_URL / LLM_MODEL / LLM_API_KEY from .env, so the choice of model is
 * a configuration decision, not a code one.
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
  responseFormat?: { type: "json_object" };
}

export class LlmError extends Error {
  constructor(
    message: string,
    public readonly code: "CONFIGURATION" | "UPSTREAM" | "INVALID_OUTPUT",
  ) {
    super(message);
    this.name = "LlmError";
  }
}

export interface LlmConfig {
  baseUrl: string;
  model: string;
  apiKey: string;
}

function extractText(payload: unknown): string {
  if (typeof payload === "string") return payload;
  if (!payload || typeof payload !== "object") return "";

  const record = payload as Record<string, unknown>;
  if (typeof record.content === "string") return record.content;

  for (const key of ["text", "output_text"]) {
    if (typeof record[key] === "string") return record[key];
  }

  if (Array.isArray(record.choices) && record.choices.length > 0) {
    const first = record.choices[0] as { message?: { content?: string } };
    if (typeof first?.message?.content === "string") {
      return first.message.content;
    }
  }

  return "";
}

export class LlmClient {
  constructor(private readonly config: LlmConfig) {}

  async chat(messages: ChatMessage[], options: ChatOptions = {}): Promise<string> {
    const { baseUrl, model, apiKey } = this.config;
    const { temperature = 0.2, maxTokens, timeoutMs = 60_000, responseFormat } = options;

    if (!apiKey.trim()) {
      throw new LlmError("LLM_API_KEY is not configured.", "CONFIGURATION");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature,
          ...(maxTokens ? { max_tokens: maxTokens } : {}),
          ...(responseFormat ? { response_format: responseFormat } : {}),
          messages,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const detail = (await response.text()).slice(0, 300);
        throw new LlmError(
          `LLM endpoint returned HTTP ${response.status}.`,
          "UPSTREAM",
        );
      }

      const text = extractText(await response.json());
      if (!text) {
        throw new LlmError("LLM returned no text content.", "INVALID_OUTPUT");
      }
      return text;
    } catch (error) {
      if (error instanceof LlmError) throw error;
      if (error instanceof Error && error.name === "AbortError") {
        throw new LlmError("LLM request timed out.", "UPSTREAM");
      }
      throw new LlmError(
        `LLM request failed: ${error instanceof Error ? error.message : "unknown"}`,
        "UPSTREAM",
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * chat() constrained to JSON: asks for an object and returns it parsed.
   * Tolerates ```json fences, which models emit even when told not to.
   */
  async chatJson<T>(
    messages: ChatMessage[],
    options: ChatOptions = {},
  ): Promise<T> {
    const raw = await this.chat(messages, {
      ...options,
      responseFormat: { type: "json_object" },
    });
    const stripped = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, "");
    try {
      return JSON.parse(stripped) as T;
    } catch {
      throw new LlmError("LLM returned invalid JSON.", "INVALID_OUTPUT");
    }
  }
}
