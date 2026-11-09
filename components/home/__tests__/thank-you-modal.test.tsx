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
    const originalImageLinks = screen.getAllByRole("link");
    expect(originalImageLinks).toHaveLength(receipts.length);
    expect(
      originalImageLinks.every(
        (link) =>
          link.getAttribute("href") === link.querySelector("img")?.getAttribute("src") &&
          link.getAttribute("target") === "_blank" &&
          link.getAttribute("rel") === "noopener noreferrer",
      ),
    ).toBe(true);
  });

  it("keeps the newest six receipts when the oldest is over a week old", async () => {
    window.history.replaceState({}, "", "/zh?preview");
    const entries = [
      makeEntry("donation-nov-9", "2026-11-09"),
      makeEntry("donation-nov-8", "2026-11-08"),
      makeEntry("donation-nov-7", "2026-11-07"),
      makeEntry("donation-nov-5", "2026-11-05"),
      makeEntry("donation-nov-3", "2026-11-03"),
      makeEntry("donation-nov-1", "2026-11-01"),
      makeEntry("donation-oct-25", "2026-10-25"),
    ];

    render(<ThankYouModal entries={entries} />);
    await screen.findByRole("dialog");

    const receiptLinks = screen.getAllByRole("link");
    expect(receiptLinks).toHaveLength(6);
    expect(receiptLinks.map((link) => link.getAttribute("href"))).toContain("/support/donation-nov-1.png");
    expect(receiptLinks.map((link) => link.getAttribute("href"))).not.toContain("/support/donation-oct-25.png");
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
