// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StyleAdvisor } from "@/components/bailian/style-advisor";
import { StyleAdvisorStandalone } from "@/components/bailian/style-advisor-standalone";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: ComponentProps<"a">) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const replayPayload = {
  source: "replay",
  provider: "fixture",
  model: "fixture",
  intent: {
    styleSlug: "glassmorphism",
    confidence: 0.87,
    rationale: ["Layered panels suit this dashboard."],
  },
  style: {
    slug: "glassmorphism",
    name: "玻璃拟态",
    nameEn: "Glassmorphism",
    description: "Layered panels and soft depth.",
    colors: { primary: "#fff", secondary: "#111", accent: [] },
    componentIds: ["button", "card", "input"],
    recipes: { available: true, ids: ["button", "card"] },
    readinessCoverage: { overall: 0.8, accessibility: 0.9, states: 0.8 },
  },
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

function advisorResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), { status });
}

function advisorStatus(liveAvailable = true) {
  return {
    provider: "deepseek",
    model: "deepseek-chat",
    liveAvailable,
    replayAvailable: true,
    supportedStyles: ["glassmorphism", "neo-brutalist"],
  };
}

function payloadFor(slug: string, nameEn: string, source: "live" | "replay" = "live") {
  return {
    ...replayPayload,
    source,
    intent: { ...replayPayload.intent, styleSlug: slug },
    style: { ...replayPayload.style, slug, nameEn },
  };
}

describe("StyleAdvisor", () => {
  it("offers offline replay, renders an explainable result, and applies the selected style", async () => {
    const fetchMock = vi.fn<typeof fetch>((input, init) => {
      if (String(input).endsWith("/api/ai/style-advisor") && (init?.method ?? "GET") === "GET") {
        return Promise.resolve(new Response(JSON.stringify({
          provider: "deepseek",
          model: "deepseek-chat",
          liveAvailable: false,
          replayAvailable: true,
          supportedStyles: ["glassmorphism"],
        }), { status: 200 }));
      }
      return Promise.resolve(new Response(JSON.stringify(replayPayload), { status: 200 }));
    });
    vi.stubGlobal("fetch", fetchMock);
    const onApplyStyle = vi.fn();

    render(<StyleAdvisor initialRequest="Build a dashboard." onApplyStyle={onApplyStyle} />);

    const replayButton = await screen.findByRole("button", { name: "离线回放" });
    expect(screen.getByRole("button", { name: "实时推荐" })).toBeDisabled();
    fireEvent.click(replayButton);

    const postCall = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
    expect(JSON.parse(postCall?.[1]?.body as string)).toEqual({
      request: "Build a dashboard.",
      mode: "replay",
    });

    await waitFor(() => expect(screen.getByText("Glassmorphism")).toBeInTheDocument());
    expect(screen.getByText("87%")).toBeInTheDocument();
    expect(screen.getByText("Layered panels suit this dashboard.")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/本次推荐对应的需求/));
    expect(screen.getByText(/本次推荐对应的需求（离线回放）/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /应用 Glassmorphism 到项目/ }));
    expect(onApplyStyle).toHaveBeenCalledWith("glassmorphism");
  });

  it("keeps a live result bound to its submitted request when newer requests finish first", async () => {
    const pending: ReturnType<typeof deferred<Response>>[] = [];
    const fetchMock = vi.fn<typeof fetch>((input, init) => {
      if (String(input).endsWith("/api/ai/style-advisor") && init?.method === "POST") {
        const request = deferred<Response>();
        pending.push(request);
        return request.promise;
      }
      return Promise.resolve(advisorResponse(advisorStatus()));
    });
    vi.stubGlobal("fetch", fetchMock);
    const onApplyStyle = vi.fn();

    render(<StyleAdvisor initialRequest="Original brief" onApplyStyle={onApplyStyle} />);
    fireEvent.click(await screen.findByRole("button", { name: "实时推荐" }));
    const requestInput = screen.getByRole("textbox", { name: /项目需求/ });
    fireEvent.change(requestInput, { target: { value: "Updated brief" } });
    fireEvent.click(screen.getByRole("button", { name: "实时推荐" }));

    const postCalls = fetchMock.mock.calls.filter(([, init]) => init?.method === "POST");
    expect(JSON.parse(postCalls[0][1]?.body as string)).toEqual({ request: "Original brief", mode: "live" });
    expect(JSON.parse(postCalls[1][1]?.body as string)).toEqual({ request: "Updated brief", mode: "live" });
    expect(postCalls[0][1]?.signal?.aborted).toBe(true);

    await act(async () => {
      pending[1].resolve(advisorResponse(payloadFor("neo-brutalist", "Neo Brutalist")));
    });
    expect(await screen.findByText("Neo Brutalist")).toBeInTheDocument();
    await act(async () => {
      pending[0].resolve(advisorResponse(payloadFor("glassmorphism", "Glassmorphism")));
    });

    expect(screen.getByText("Neo Brutalist")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/本次推荐对应的需求/));
    expect(screen.getByText(/本次推荐对应的需求（实时推荐）/)).toBeInTheDocument();
    expect(screen.getByText("Updated brief", { selector: "p" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "应用 Neo Brutalist 到项目" }));
    expect(onApplyStyle).toHaveBeenCalledTimes(1);
    expect(onApplyStyle).toHaveBeenCalledWith("neo-brutalist");

    fireEvent.change(requestInput, { target: { value: "A later query" } });
    expect(screen.queryByText("Neo Brutalist")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "应用 Neo Brutalist 到项目" })).not.toBeInTheDocument();
  });

  it("allows retry after a replay failure and submits the same captured brief in replay mode", async () => {
    let postCount = 0;
    const fetchMock = vi.fn<typeof fetch>((input, init) => {
      if (String(input).endsWith("/api/ai/style-advisor") && init?.method === "POST") {
        postCount += 1;
        return Promise.resolve(postCount === 1
          ? advisorResponse({ error: "Temporary replay error" }, 503)
          : advisorResponse({ ...replayPayload, source: "replay" }));
      }
      return Promise.resolve(advisorResponse(advisorStatus(false)));
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<StyleAdvisor initialRequest="Retry this brief" onApplyStyle={vi.fn()} />);
    const replayButton = await screen.findByRole("button", { name: "离线回放" });
    fireEvent.click(replayButton);
    expect(await screen.findByText("Temporary replay error")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "离线回放" }));
    expect(await screen.findByText("Glassmorphism")).toBeInTheDocument();

    const postCalls = fetchMock.mock.calls.filter(([, init]) => init?.method === "POST");
    expect(postCalls).toHaveLength(2);
    expect(postCalls.map(([, init]) => JSON.parse(init?.body as string))).toEqual([
      { request: "Retry this brief", mode: "replay" },
      { request: "Retry this brief", mode: "replay" },
    ]);
  });

  it("aborts the browser recommendation request when its component unmounts", async () => {
    const pending = deferred<Response>();
    const fetchMock = vi.fn<typeof fetch>((input, init) => {
      if (String(input).endsWith("/api/ai/style-advisor") && init?.method === "POST") return pending.promise;
      return Promise.resolve(advisorResponse(advisorStatus()));
    });
    vi.stubGlobal("fetch", fetchMock);
    const { unmount } = render(<StyleAdvisor initialRequest="Current brief" onApplyStyle={vi.fn()} />);
    fireEvent.click(await screen.findByRole("button", { name: "实时推荐" }));
    const signal = fetchMock.mock.calls.find(([, init]) => init?.method === "POST")?.[1]?.signal;
    expect(signal?.aborted).toBe(false);
    unmount();
    expect(signal?.aborted).toBe(true);
    await act(async () => { pending.resolve(advisorResponse(replayPayload)); });
  });

  it("describes standalone selection as local and does not claim it updated a project", async () => {
    const fetchMock = vi.fn<typeof fetch>((input, init) => {
      if (String(input).endsWith("/api/ai/style-advisor") && init?.method === "POST") {
        return Promise.resolve(advisorResponse({ ...replayPayload, source: "replay" }));
      }
      return Promise.resolve(advisorResponse(advisorStatus(false)));
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<StyleAdvisorStandalone />);
    fireEvent.click(await screen.findByRole("button", { name: "离线回放" }));
    fireEvent.click(await screen.findByRole("button", { name: "选择此风格" }));

    expect(screen.getByText(/已在本页选择/)).toBeInTheDocument();
    expect(screen.getByText(/这个选择不会修改项目/)).toBeInTheDocument();
    expect(screen.queryByText(/已选择 .*进入项目工作区后保存版本即可生成工程/)).not.toBeInTheDocument();
  });
});
