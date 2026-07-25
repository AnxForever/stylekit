// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { useI18nMock } = vi.hoisted(() => ({
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

import { ThankYouModal } from "@/components/home/thank-you-modal";

describe("ThankYouModal", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/zh");
    window.localStorage.clear();
    useI18nMock.mockReturnValue({ locale: "zh" });
  });

  it("auto-opens once per donation batch and stays closed after dismissal", async () => {
    const { unmount } = render(<ThankYouModal />);

    // Fresh visitor (no dismissal recorded for this batch): celebrate.
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    // Same batch, next visit: dismissal is remembered, no auto-open.
    unmount();
    render(<ThankYouModal />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows every receipt in the current batch", async () => {
    render(<ThankYouModal />);
    await screen.findByRole("dialog");

    const receipts = screen.getAllByRole("figure");
    expect(receipts.length).toBeGreaterThanOrEqual(2);
  });

  it("force-opens via ?support=thanks even after dismissal", async () => {
    const { unmount } = render(<ThankYouModal />);
    await screen.findByRole("dialog");
    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    unmount();

    window.history.replaceState({}, "", "/zh?support=thanks");
    render(<ThankYouModal />);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
  });

  it("does not render outside the homepage when restricted", () => {
    window.history.replaceState({}, "", "/zh/styles");
    render(<ThankYouModal showOnHomepageOnly={true} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
