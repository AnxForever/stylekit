import { GET, POST } from "@/app/api/ai/style-advisor/route";

describe("/api/ai/style-advisor", () => {
  const originalApiKey = process.env.DASHSCOPE_API_KEY;
  const originalDeepSeekKey = process.env.DEEPSEEK_API_KEY;
  const originalDeepSeekModel = process.env.DEEPSEEK_MODEL;
  const originalProvider = process.env.STYLE_ADVISOR_PROVIDER;

  afterEach(() => {
    if (originalApiKey === undefined) delete process.env.DASHSCOPE_API_KEY;
    else process.env.DASHSCOPE_API_KEY = originalApiKey;
    if (originalDeepSeekKey === undefined) delete process.env.DEEPSEEK_API_KEY;
    else process.env.DEEPSEEK_API_KEY = originalDeepSeekKey;
    if (originalDeepSeekModel === undefined) delete process.env.DEEPSEEK_MODEL;
    else process.env.DEEPSEEK_MODEL = originalDeepSeekModel;
    if (originalProvider === undefined) delete process.env.STYLE_ADVISOR_PROVIDER;
    else process.env.STYLE_ADVISOR_PROVIDER = originalProvider;
  });

  it("exposes provider readiness without revealing credentials", async () => {
    process.env.STYLE_ADVISOR_PROVIDER = "deepseek";
    process.env.DEEPSEEK_API_KEY = "test-key";
    process.env.DEEPSEEK_MODEL = "deepseek-chat";

    const response = await GET();

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload).toMatchObject({
      provider: "deepseek",
      model: "deepseek-chat",
      liveAvailable: true,
      replayAvailable: true,
    });
    expect(JSON.stringify(payload)).not.toContain("test-key");
  });

  it("returns the deterministic replay without an API key", async () => {
    delete process.env.DASHSCOPE_API_KEY;
    const response = await POST(
      new Request("http://localhost/api/ai/style-advisor", {
        method: "POST",
        body: JSON.stringify({
          request: "Build a B2B account-risk dashboard.",
          mode: "replay",
        }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      source: "replay",
      intent: { styleSlug: "glassmorphism", projectType: "dashboard" },
    });
  });

  it("rejects extra request fields", async () => {
    const response = await POST(
      new Request("http://localhost/api/ai/style-advisor", {
        method: "POST",
        body: JSON.stringify({ request: "Build a dashboard.", unexpected: true }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(400);
  });

  it("returns a clear configuration response for live mode without a key", async () => {
    delete process.env.DASHSCOPE_API_KEY;
    const response = await POST(
      new Request("http://localhost/api/ai/style-advisor", {
        method: "POST",
        body: JSON.stringify({ request: "Build a dashboard.", mode: "live" }),
        headers: { "content-type": "application/json" },
      }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.stringContaining("DASHSCOPE_API_KEY"),
    });
  });

});
