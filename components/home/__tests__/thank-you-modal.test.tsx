// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { trackEventMock, useI18nMock } = vi.hoisted(() => ({
  trackEventMock: vi.fn(),
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({
  trackEvent: trackEventMock,
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

import { ThankYouModal } from "@/components/home/thank-you-modal";

describe("ThankYouModal", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/zh");
    window.localStorage.clear();
    document.body.style.overflow = "";
    trackEventMock.mockReset();
    useI18nMock.mockReturnValue({ locale: "zh" });
  });

  it("auto-opens once for a new donation batch and stays closed after dismissal", async () => {
    const { unmount } = render(<ThankYouModal />);

    // Fresh visitor (no dismissal recorded): the ledger announces itself.
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    // Same batch, next visit: dismissal is remembered, no auto-open.
    unmount();
    render(<ThankYouModal />);
    await screen.findByRole("button", { name: /感谢 \d+ 位近期支持者/ });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("re-opens from the trigger and tracks the click", async () => {
    render(<ThankYouModal />);
    await screen.findByRole("dialog");
    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    const trigger = screen.getByRole("button", { name: /感谢 \d+ 位近期支持者/ });
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(trackEventMock).toHaveBeenCalledWith("cta_click", {
      label: "recent_supporters",
      location: "home_hero",
    });
  });

  it("supports direct links even after dismissal and closes with Escape", async () => {
    // Dismiss the current batch first.
    const { unmount } = render(<ThankYouModal />);
    await screen.findByRole("dialog");
    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    unmount();

    window.history.replaceState({}, "", "/zh?support=thanks");
    render(<ThankYouModal />);

    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
  });
});
