// @vitest-environment happy-dom

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

    fireEvent.click(screen.getByRole("button", { name: "复制硬性提示词" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("STYLEKIT_STYLE_REFERENCE\n# Hard Prompt");
    });
    expect(screen.getByText("已复制硬性提示词")).toBeTruthy();
    expect(trackEvent).toHaveBeenCalledWith("code_copy", {
      slug: "neo-brutalist",
      language: "hard",
    });
  });
});
