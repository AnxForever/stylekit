// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StyleAdvisor } from "@/components/bailian/style-advisor";

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
  vi.restoreAllMocks();
});

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

    await waitFor(() => expect(screen.getByText("Glassmorphism")).toBeInTheDocument());
    expect(screen.getByText("87%")).toBeInTheDocument();
    expect(screen.getByText("Layered panels suit this dashboard.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /应用 Glassmorphism 到项目/ }));
    expect(onApplyStyle).toHaveBeenCalledWith("glassmorphism");
  });
});
