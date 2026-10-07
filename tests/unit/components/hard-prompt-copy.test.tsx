// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { HardPromptCopyButton } from "@/components/style-preview/hard-prompt-copy-button";
import { trackEvent } from "@/lib/analytics/events";

vi.mock("@/lib/analytics/events", () => ({ trackEvent: vi.fn() }));
const descriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  if (descriptor) Object.defineProperty(navigator, "clipboard", descriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});

it("offers manual copying after rejection without reporting a successful copy", async () => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: vi.fn().mockRejectedValue(new Error("Permission denied")) },
  });
  const { rerender } = render(<HardPromptCopyButton content="Use bold borders" locale="en" slug="neo-brutalist" />);
  fireEvent.click(screen.getByRole("button", { name: "Copy Hard Prompt" }));
  expect(await screen.findByRole("textbox", { name: "Code to copy manually" })).toHaveValue("Use bold borders");
  expect(screen.queryByText("Hard Prompt Copied")).not.toBeInTheDocument();
  expect(trackEvent).not.toHaveBeenCalled();
  rerender(<HardPromptCopyButton content="Use a new style" locale="en" slug="neo-brutalist" />);
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});

it("reports and tracks success only after the clipboard write resolves", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(<HardPromptCopyButton content="Use bold borders" locale="en" slug="neo-brutalist" />);
  fireEvent.click(screen.getByRole("button", { name: "Copy Hard Prompt" }));
  await waitFor(() => expect(trackEvent).toHaveBeenCalledWith("code_copy", { slug: "neo-brutalist", language: "hard" }));
  expect(writeText).toHaveBeenCalledWith("Use bold borders");
  expect(screen.getByRole("button", { name: "Hard Prompt Copied" })).toBeInTheDocument();
});
