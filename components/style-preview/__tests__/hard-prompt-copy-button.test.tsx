// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HardPromptCopyButton } from "@/components/style-preview/hard-prompt-copy-button";
import { trackEvent } from "@/lib/analytics/events";

vi.mock("@/lib/analytics/events", () => ({
  trackEvent: vi.fn(),
}));

describe("HardPromptCopyButton", () => {
  const writeText = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    writeText.mockReset();
    writeText.mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
  });

  it("copies the real prompt and announces success", async () => {
    render(
      <HardPromptCopyButton
        content={"STYLEKIT_STYLE_REFERENCE\n# Hard Prompt"}
        locale="zh"
        slug="neo-brutalist"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "复制给 AI" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("STYLEKIT_STYLE_REFERENCE\n# Hard Prompt");
    });
    expect(screen.getByText("已复制给 AI")).toBeTruthy();
    expect(trackEvent).toHaveBeenCalledWith("code_copy", {
      slug: "neo-brutalist",
      language: "hard",
    });
  });
  it("shows the exact prompt for manual copying when clipboard access fails", async () => {
    writeText.mockRejectedValueOnce(new Error("clipboard blocked"));
    const prompt = "STYLEKIT_STYLE_REFERENCE\n# Hard Prompt";

    render(
      <HardPromptCopyButton
        content={prompt}
        locale="zh"
        slug="neo-brutalist"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "复制给 AI" }));

    const feedback = await screen.findByRole("status");
    expect(feedback).toHaveTextContent("无法访问剪贴板");
    expect(screen.getByRole("textbox", { name: "需要手动复制的代码" })).toHaveValue(prompt);
    expect(trackEvent).not.toHaveBeenCalled();
  });
});
