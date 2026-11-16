import { describe, expect, it, vi } from "vitest";

import { BailianClientError } from "@/lib/bailian/client";
import { requestWorkspaceContent } from "@/lib/bailian/workspace-content";

function chatResponse(content: string) {
  return new Response(
    JSON.stringify({ choices: [{ message: { content } }] }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

const project = {
  name: "客户数据后台",
  description: "面向运营团队的 B2B SaaS",
  projectType: "dashboard",
  brief: { audience: "运营团队", primaryGoal: "查看收入和账户风险" },
};

describe("requestWorkspaceContent", () => {
  it("parses a fenced JSON copy plan from the chat completion", async () => {
    const fetchImpl = vi.fn(async () =>
      chatResponse(
        '```json\n{"sections":{"kpi":{"sectionTitle":"本季度收入概览"}},"note":"copy"}\n```'
      )
    );

    const plan = await requestWorkspaceContent({
      project,
      apiKey: "test-key",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(plan.sections).toEqual({ kpi: { sectionTitle: "本季度收入概览" } });
    expect(plan.note).toBe("copy");
  });

  it("sends the project brief to the configured provider", async () => {
    const fetchImpl = vi.fn(async () =>
      chatResponse('{"sections":{"kpi":{"sectionTitle":"X"}}}')
    );

    await requestWorkspaceContent({
      project,
      apiKey: "deepseek-key",
      provider: "deepseek",
      model: "deepseek-chat",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.deepseek.com/chat/completions");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer deepseek-key");
    const body = JSON.parse(String(init.body)) as {
      model: string;
      messages: Array<{ role: string; content: string }>;
    };
    expect(body.model).toBe("deepseek-chat");
    expect(body.messages[0].role).toBe("system");
    expect(body.messages[1].content).toContain("客户数据后台");
    expect(body.messages[1].content).toContain("运营团队");
  });

  it("refuses text that is not JSON", async () => {
    const fetchImpl = vi.fn(async () => chatResponse("这里是一段文案，不是 JSON。"));

    await expect(
      requestWorkspaceContent({
        project,
        apiKey: "test-key",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      })
    ).rejects.toMatchObject({ code: "INVALID_MODEL_OUTPUT" });
  });

  it("refuses a payload outside the wrapper shape", async () => {
    const fetchImpl = vi.fn(async () =>
      chatResponse('{"sections":{"kpi":{"sectionTitle":"X"}},"steps":[]}')
    );

    const error = await requestWorkspaceContent({
      project,
      apiKey: "test-key",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    }).catch((thrown: unknown) => thrown);

    expect(error).toBeInstanceOf(BailianClientError);
    expect(error).toMatchObject({ code: "INVALID_MODEL_OUTPUT" });
  });

  it("reports an upstream failure", async () => {
    const fetchImpl = vi.fn(async () => new Response("nope", { status: 500 }));

    await expect(
      requestWorkspaceContent({
        project,
        apiKey: "test-key",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      })
    ).rejects.toMatchObject({ code: "UPSTREAM_ERROR", status: 502 });
  });

  it("refuses to run without a key", async () => {
    await expect(
      requestWorkspaceContent({ project, apiKey: "  " })
    ).rejects.toMatchObject({ code: "CONFIGURATION_ERROR", status: 503 });
  });

  it("maps an aborted request to a timeout", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new DOMException("Aborted", "AbortError");
    });

    await expect(
      requestWorkspaceContent({
        project,
        apiKey: "test-key",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      })
    ).rejects.toMatchObject({ code: "UPSTREAM_ERROR", status: 504 });
  });
});
