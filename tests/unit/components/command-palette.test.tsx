// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CommandPalette } from "@/components/ui/command-palette";
import { translations, type Locale, type TranslationKey } from "@/lib/i18n/translations";

const state = vi.hoisted(() => ({ locale: "zh" as Locale, push: vi.fn(), trackEvent: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: state.push }) }));
vi.mock("@/lib/analytics/events", () => ({ trackEvent: state.trackEvent }));
vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({ locale: state.locale, t: (key: TranslationKey) => translations[state.locale][key] }),
}));
vi.mock("@/lib/styles/meta", () => ({
  getAllStylesMeta: () => [
    { slug: "neo-brutalist", name: "新粗野主义", nameEn: "Neo Brutalist", keywords: ["bold"] },
  ],
}));

beforeEach(() => {
  state.locale = "zh";
  vi.clearAllMocks();
});
afterEach(cleanup);

describe("command palette tool discovery", () => {
  it.each([
    [" 渐变 ", "/zh/resources?tab=gradients"],
    ["shadow", "/zh/resources?tab=shadows"],
    ["MCP", "/zh/developers"],
    ["导出", "/zh/kit"],
    ["ChunUI", "/zh/mobile"],
  ])("opens the live destination for %s", (query, destination) => {
    render(<CommandPalette />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: query } });
    expect(screen.getAllByRole("option").length).toBeGreaterThan(0);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(state.push).toHaveBeenCalledWith(destination);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(state.trackEvent).toHaveBeenCalledWith("search", expect.objectContaining({ query_present: true }));
  });

  it("shows tools before the style catalog and keeps keyboard selection accessible", () => {
    render(<CommandPalette />);
    const input = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveTextContent("资源库");
    expect(input).toHaveAttribute("aria-controls", screen.getByRole("listbox").id);
    expect(input).toHaveAttribute("aria-activedescendant", options[0].id);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(options[1]).toHaveAttribute("aria-selected", "true");
    expect(input).toHaveAttribute("aria-activedescendant", options[1].id);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(state.push).toHaveBeenCalledWith("/zh/resources?tab=typography");
  });

  it("recovers from an empty result set and resets the active option", () => {
    render(<CommandPalette />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "no-such-tool-xyz" } });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(state.push).not.toHaveBeenCalled();
    expect(input).not.toHaveAttribute("aria-activedescendant");
    fireEvent.change(input, { target: { value: "webgl" } });
    expect(screen.getByRole("option")).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(state.push).toHaveBeenCalledWith("/zh/resources?tab=shaders");
  });

  it("supports Chinese tool keywords in the English UI", () => {
    state.locale = "en";
    render(<CommandPalette />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "阴影" } });
    expect(screen.getByRole("option")).toHaveTextContent("Shadow Presets");
    fireEvent.click(screen.getByRole("option"));
    expect(state.push).toHaveBeenCalledWith("/en/resources?tab=shadows");
  });

  it("still finds styles and keeps retired simulators out of results", () => {
    render(<CommandPalette />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "type-scale" } });
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: "bold" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(state.push).toHaveBeenCalledWith("/zh/styles/neo-brutalist");
  });
});
