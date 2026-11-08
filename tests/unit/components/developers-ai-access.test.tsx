// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { DevelopersContent } from "@/components/developers/developers-content";
import {
  translations,
  type Locale,
  type TranslationKey,
} from "@/lib/i18n/translations";

const state = vi.hoisted(() => ({ locale: "en" as Locale }));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({
    locale: state.locale,
    t: (key: TranslationKey) => translations[state.locale][key],
  }),
}));

vi.mock("@/components/home/reveal-on-scroll", () => ({
  RevealOnScroll: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("developer AI access entry", () => {
  it("offers the live remote MCP setup without overstating tool or client validation", async () => {
    render(<DevelopersContent />);

    expect(screen.getByText("Five read-only tools · live assets with bundled fallback")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Connect an AI client" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: translations.en["aiAccess.buttonAria"] }));

    const dialog = await screen.findByRole("dialog");
    expect(screen.getByRole("group", { name: translations.en["aiAccess.clientsLabel"] })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: translations.en["aiAccess.clientCodexCli"] }));
    expect(screen.getByText("codex mcp add stylekit --url https://www.stylekit.top/mcp")).toBeVisible();

    expect(within(dialog).getByRole("link", { name: translations.en["aiAccess.docs"] })).toHaveAttribute(
      "href",
      "/en/developers",
    );
  });
});
