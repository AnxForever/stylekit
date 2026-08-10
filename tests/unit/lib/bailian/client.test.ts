import { requestStyleIntent } from "@/lib/bailian/client";

const intent = {
  schemaVersion: "style-intent-v1",
  styleSlug: "glassmorphism",
  confidence: 0.87,
  rationale: ["Layered panels suit this dashboard."],
  projectType: "dashboard",
  brief: {
    audience: "B2B SaaS operators",
    primaryGoal: "Review account risk quickly",
    requiredPages: ["Overview"],
    requiredStates: ["loading", "empty", "error", "success"],
    brandPersonality: ["clear", "reliable"],
    antiReferences: ["low-contrast text"],
    notes: "Desktop and mobile.",
  },
  constraints: ["Use canonical StyleKit tokens."],
};

function response(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

describe("Bailian style intent client", () => {
  it("parses OpenAI-compatible DashScope output", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      response({ choices: [{ message: { content: JSON.stringify(intent) } }] }),
    );

    const result = await requestStyleIntent({
      request: "Build a clear B2B account-risk dashboard.",
      apiKey: "test-key",
      fetchImpl,
    });

    expect(result).toEqual(intent);
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer test-key" }),
      }),
    );
  });

  it("rejects invalid model output before it reaches the generator", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      response({ choices: [{ message: { content: "{\"styleSlug\":\"unknown\"}" } }] }),
    );

    await expect(
      requestStyleIntent({
        request: "Build a dashboard.",
        apiKey: "test-key",
        fetchImpl,
      }),
    ).rejects.toMatchObject({ code: "INVALID_MODEL_OUTPUT" });
  });

  it("supports DeepSeek's OpenAI-compatible endpoint", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      response({ choices: [{ message: { content: JSON.stringify(intent) } }] }),
    );

    await expect(
      requestStyleIntent({
        request: "Build a dashboard.",
        apiKey: "test-key",
        provider: "deepseek",
        fetchImpl,
      }),
    ).resolves.toEqual(intent);

    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.deepseek.com/chat/completions",
      expect.objectContaining({
        body: expect.stringContaining('"model":"deepseek-chat"'),
      }),
    );
  });

  it("fails closed when the API key is missing", async () => {
    await expect(
      requestStyleIntent({
        request: "Build a dashboard.",
        apiKey: "",
        fetchImpl: vi.fn(),
      }),
    ).rejects.toMatchObject({ code: "CONFIGURATION_ERROR", status: 503 });
  });
});
