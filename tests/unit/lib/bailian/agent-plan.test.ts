import { describe, expect, it, vi } from "vitest";

import { BailianClientError } from "@/lib/bailian/client";
import { requestAgentPlan } from "@/lib/bailian/agent-plan";

function chatResponse(content: string) {
  return new Response(
    JSON.stringify({ choices: [{ message: { content } }] }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

const snapshot = [
  {
    ref: "Filter by status",
    component: "select",
    label: "Status",
    value: "All",
    actions: ["setValue", "clear"],
  },
];

describe("requestAgentPlan", () => {
  it("parses a fenced JSON plan from the chat completion", async () => {
    const fetchImpl = vi.fn(async () =>
      chatResponse(
        '```json\n{"steps":[{"ref":"Filter by status","action":"setValue","args":["Suspended"]}],"note":"filter"}\n```'
      )
    );

    const plan = await requestAgentPlan({
      goal: "show suspended users",
      snapshot,
      apiKey: "test-key",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(plan.steps).toEqual([
      { ref: "Filter by status", action: "setValue", args: ["Suspended"] },
    ]);
    expect(plan.note).toBe("filter");
  });

  it("sends the goal and snapshot to the configured provider", async () => {
    const fetchImpl = vi.fn(async () =>
      chatResponse('{"steps":[{"ref":"Filter by status","action":"clear","args":[]}]}')
    );

    await requestAgentPlan({
      goal: "reset the filter",
      snapshot,
      apiKey: "deepseek-key",
      provider: "deepseek",
      model: "deepseek-chat",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const [url, init] = fetchImpl.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe("https://api.deepseek.com/chat/completions");
    expect(init.headers).toMatchObject({ Authorization: "Bearer deepseek-key" });
    const body = JSON.parse(String(init.body)) as {
      model: string;
      temperature: number;
      messages: Array<{ role: string; content: string }>;
    };
    expect(body.model).toBe("deepseek-chat");
    expect(body.temperature).toBe(0.2);
    expect(body.messages[1].content).toContain("Goal: reset the filter");
    expect(body.messages[1].content).toContain("Filter by status | select");
  });

  it("refuses model text that is not JSON", async () => {
    const fetchImpl = vi.fn(async () => chatResponse("Sure! Click the filter."));

    await expect(
      requestAgentPlan({
        goal: "goal",
        snapshot,
        apiKey: "test-key",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      })
    ).rejects.toMatchObject({ code: "INVALID_MODEL_OUTPUT" });
  });

  it("refuses a JSON plan outside the allowed shape", async () => {
    const fetchImpl = vi.fn(async () =>
      chatResponse('{"steps":[{"ref":"Filter by status","action":"click"}]}')
    );

    await expect(
      requestAgentPlan({
        goal: "goal",
        snapshot,
        apiKey: "test-key",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      })
    ).rejects.toBeInstanceOf(BailianClientError);
  });

  it("reports an upstream failure with its status", async () => {
    const fetchImpl = vi.fn(async () => new Response("nope", { status: 429 }));

    await expect(
      requestAgentPlan({
        goal: "goal",
        snapshot,
        apiKey: "test-key",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      })
    ).rejects.toMatchObject({ code: "UPSTREAM_ERROR", status: 502 });
  });

  it("refuses an empty key before calling the network", async () => {
    const fetchImpl = vi.fn();

    await expect(
      requestAgentPlan({
        goal: "goal",
        snapshot,
        apiKey: "   ",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      })
    ).rejects.toMatchObject({ code: "CONFIGURATION_ERROR", status: 503 });
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
