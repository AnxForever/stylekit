// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

const { useI18nMock } = vi.hoisted(() => ({
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

import { ThankYouModal } from "@/components/home/thank-you-modal";

describe("ThankYouModal", () => {
  afterEach(cleanup);
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

  it("does not render outside the homepage when restricted", () => {
    window.history.replaceState({}, "", "/zh/styles");
    render(<ThankYouModal showOnHomepageOnly={true} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
