import { GET, POST } from "@/app/api/ai/agent-plan/route";

const snapshot = [
  {
    ref: "Filter by status",
    component: "select",
    label: "Status",
    value: "All",
    actions: ["setValue", "clear"],
  },
];

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/ai/agent-plan", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    })
  );
}

describe("/api/ai/agent-plan", () => {
  const originalApiKey = process.env.DASHSCOPE_API_KEY;
  const originalDeepSeekKey = process.env.DEEPSEEK_API_KEY;
  const originalProvider = process.env.STYLE_ADVISOR_PROVIDER;

  afterEach(() => {
    if (originalApiKey === undefined) delete process.env.DASHSCOPE_API_KEY;
    else process.env.DASHSCOPE_API_KEY = originalApiKey;
    if (originalDeepSeekKey === undefined) delete process.env.DEEPSEEK_API_KEY;
    else process.env.DEEPSEEK_API_KEY = originalDeepSeekKey;
    if (originalProvider === undefined) delete process.env.STYLE_ADVISOR_PROVIDER;
    else process.env.STYLE_ADVISOR_PROVIDER = originalProvider;
  });

  it("exposes readiness and the action list without revealing the key", async () => {
    process.env.STYLE_ADVISOR_PROVIDER = "dashscope";
    process.env.DASHSCOPE_API_KEY = "test-key";

    const response = await GET();

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload).toMatchObject({
      provider: "dashscope",
      liveAvailable: true,
      replayAvailable: true,
    });
    expect(payload.actions).toContain("setValue");
    expect(JSON.stringify(payload)).not.toContain("test-key");
  });

  it("reports live mode as unavailable without a key", async () => {
    delete process.env.DASHSCOPE_API_KEY;

    const payload = await (await GET()).json();

    expect(payload.liveAvailable).toBe(false);
  });

  it("returns the deterministic replay plan", async () => {
    const response = await post({
      goal: "show suspended users",
      snapshot,
      mode: "replay",
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      source: "replay",
      model: "fixture",
      plan: {
        steps: [
          { ref: "Filter by status", action: "setValue", args: ["Suspended"] },
        ],
      },
    });
  });

  it("refuses a plan that names a component the page did not report", async () => {
    const response = await post({
      goal: "show suspended users",
      snapshot: [
        {
          ref: "Notify on change",
          component: "switch",
          checked: false,
          actions: ["setChecked"],
        },
      ],
      mode: "replay",
    });

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({
      code: "INVALID_MODEL_OUTPUT",
    });
  });

  it("rejects extra request fields", async () => {
    const response = await post({
      goal: "show suspended users",
      snapshot,
      mode: "replay",
      allow: ["*"],
    });

    expect(response.status).toBe(400);
  });

  it("rejects a snapshot without component actions", async () => {
    const response = await post({
      goal: "show suspended users",
      snapshot: [{ ref: "Filter by status", component: "select" }],
      mode: "replay",
    });

    expect(response.status).toBe(400);
  });

  it("returns a clear configuration response for live mode without a key", async () => {
    delete process.env.DASHSCOPE_API_KEY;

    const response = await post({
      goal: "show suspended users",
      snapshot,
      mode: "live",
    });

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.stringContaining("DASHSCOPE_API_KEY"),
    });
  });
});
