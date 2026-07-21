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
    document.body.style.overflow = "";
    trackEventMock.mockReset();
    useI18nMock.mockReturnValue({ locale: "zh" });
  });

  it("keeps the homepage visible until the visitor opens the supporter ledger", async () => {
    render(<ThankYouModal />);

    const trigger = await screen.findByRole("button", { name: /感谢 3 位近期支持者/ });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    expect(trackEventMock).toHaveBeenCalledWith("cta_click", {
      label: "recent_supporters",
      location: "home_hero",
    });
  });

  it("supports direct links and closes with Escape", async () => {
    window.history.replaceState({}, "", "/zh?support=thanks");
    render(<ThankYouModal />);

    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
  });
});
