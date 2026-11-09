// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import type { ThankYouEntry } from "@/lib/site/support";

const { useI18nMock } = vi.hoisted(() => ({
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

import { ThankYouModal } from "@/components/home/thank-you-modal";

function makeEntry(id: string, date: string): ThankYouEntry {
  return {
    id,
    date,
    donorLabel: { en: id, zh: id },
    receiptImage: `/support/${id}.png`,
    receiptAlt: { en: id, zh: id },
  };
}

describe("ThankYouModal", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });
  beforeEach(() => {
    window.history.replaceState({}, "", "/zh");
    window.localStorage.clear();
    useI18nMock.mockReturnValue({ locale: "zh" });
  });

  it("leaves a fresh homepage visit uninterrupted after the opening frame", async () => {
    render(<ThankYouModal />);
    await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows every receipt in the current batch", async () => {
    window.history.replaceState({}, "", "/zh?preview");
    render(<ThankYouModal />);
    await screen.findByRole("dialog");

    const receipts = screen.getAllByRole("figure");
    expect(receipts.length).toBeGreaterThanOrEqual(2);
  });

  it("opens via an explicit support link and can be closed", async () => {
    window.history.replaceState({}, "", "/zh?support=thanks");
    render(<ThankYouModal />);
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("stays closed for a batch the visitor already acknowledged", async () => {
    vi.useFakeTimers();
    window.localStorage.setItem("stylekit-thank-you-seen", "donation-a");

    render(<ThankYouModal entries={[makeEntry("donation-a", "2026-11-05")]} />);
    await act(async () => {
      vi.advanceTimersByTime(1300);
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens again when a newer donation batch arrives", async () => {
    vi.useFakeTimers();
    window.localStorage.setItem("stylekit-thank-you-seen", "donation-a");

    render(
      <ThankYouModal
        entries={[makeEntry("donation-b", "2026-11-06"), makeEntry("donation-a", "2026-11-05")]}
      />
    );
    await act(async () => {
      vi.advanceTimersByTime(1300);
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "关闭" }));
    expect(window.localStorage.getItem("stylekit-thank-you-seen")).toBe("donation-b");
  });

  it("does not render outside the homepage when restricted", () => {
    window.history.replaceState({}, "", "/zh/styles");
    render(<ThankYouModal showOnHomepageOnly={true} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
