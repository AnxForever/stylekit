// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import GuidePage from "@/app/guide/page";
import { translations, type Locale, type TranslationKey } from "@/lib/i18n/translations";

const { state, trackEvent } = vi.hoisted(() => ({
  state: { locale: "en" as Locale },
  trackEvent: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({
    locale: state.locale,
    t: (key: TranslationKey) => translations[state.locale][key],
  }),
}));
vi.mock("@/components/layout/header", () => ({ Header: () => null }));
vi.mock("@/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent }));
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");

beforeEach(() => {
  state.locale = "en";
  trackEvent.mockClear();
});

afterEach(() => {
  cleanup();
  if (clipboardDescriptor) {
    Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
});

describe("getting started journey", () => {
  it.each(["en", "zh"] as const)("links the %s workflow to real style exports and its application example", (locale) => {
    state.locale = locale;
    render(<GuidePage />);

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toContain(`/${locale}/styles`);
    expect(hrefs).toContain(`/${locale}/styles/neo-brutalist#style-exports`);
    expect(hrefs).toContain(`/${locale}/guide#apply-rules`);
    expect(hrefs).toContain(`/${locale}/developers`);
    expect(document.getElementById("apply-rules")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("copies the full sample brief and clears success when its language changes", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    const view = render(<GuidePage />);
    const brief = document.querySelector("pre")?.textContent;

    fireEvent.click(screen.getByRole("button", { name: "Copy sample brief" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Brief copied" })).toBeInTheDocument());
    expect(writeText).toHaveBeenCalledWith(brief);
    expect(brief).toContain("[Paste the hard prompt or AI rules copied from the style page here]");
    expect(trackEvent).toHaveBeenCalledWith("code_copy", { slug: "neo-brutalist", language: "prompt" });

    state.locale = "zh";
    view.rerender(<GuidePage />);
    expect(screen.getByRole("button", { name: "复制需求示例" })).toBeInTheDocument();
    expect(screen.queryByText("已复制到剪贴板。")).not.toBeInTheDocument();
  });

  it("offers the full text for manual copy when the clipboard fails", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
    });
    render(<GuidePage />);
    const brief = document.querySelector("pre")?.textContent;

    fireEvent.click(screen.getByRole("button", { name: "Copy sample brief" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Clipboard access failed"));
    expect(screen.getByRole("textbox", { name: "Code to copy manually" })).toHaveValue(brief);
    expect(screen.getByRole("button", { name: "Copy sample brief" })).toBeInTheDocument();
    expect(trackEvent).not.toHaveBeenCalled();
  });
});
