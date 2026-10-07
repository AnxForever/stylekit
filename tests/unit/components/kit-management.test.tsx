// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { KitSwitcher } from "@/components/kit/kit-switcher";
import type { Kit, KitItem } from "@/lib/kit/types";

const { state } = vi.hoisted(() => ({ state: {
  kits: [] as Kit[], items: [] as KitItem[], activeKitId: "a", activeKitName: "First kit",
  maxKits: 10, syncing: false, createKit: vi.fn(), renameKit: vi.fn(),
  clearKit: vi.fn(), deleteKit: vi.fn(), switchKit: vi.fn(),
} }));

vi.mock("@/lib/kit/context", () => ({ useKit: () => state }));
vi.mock("@/lib/i18n/context", () => ({ useI18n: () => ({ locale: "en" }) }));

beforeEach(() => {
  vi.clearAllMocks();
  state.activeKitId = "a";
  state.activeKitName = "First kit";
  state.items = [{ type: "background", slug: "dot-grid", addedAt: "2026-10-07" }];
  state.kits = [{ id: "a", name: "First kit", items: state.items, updatedAt: "2026-10-07" }];
});
afterEach(cleanup);

function openManagement() {
  const details = screen.getByText("Manage kits").closest("details")!;
  details.open = true;
  fireEvent(details, new Event("toggle"));
}

describe("Kit management", () => {
  it("keeps management collapsed and confirms clearing the last kit instead of offering deletion", () => {
    render(<KitSwitcher />);
    expect(screen.getByText("Manage kits").closest("details")).not.toHaveAttribute("open");
    openManagement();
    expect(screen.queryByRole("button", { name: "Delete kit" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear items" }));
    expect(state.clearKit).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("First kit");
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(state.clearKit).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Clear items" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(state.clearKit).toHaveBeenCalledTimes(1);
    expect(state.deleteKit).not.toHaveBeenCalled();
  });

  it("discards a pending destructive confirmation when the active kit changes", () => {
    state.kits.push({ id: "b", name: "Second kit", items: [], updatedAt: "2026-10-07" });
    const view = render(<KitSwitcher />);
    openManagement();
    fireEvent.click(screen.getByRole("button", { name: "Delete kit" }));
    expect(screen.getByRole("alert")).toHaveTextContent("First kit");
    state.activeKitId = "b";
    state.activeKitName = "Second kit";
    state.items = [];
    view.rerender(<KitSwitcher />);
    openManagement();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear items" })).toBeDisabled();
    expect(state.deleteKit).not.toHaveBeenCalled();
  });

  it("cancels a rename with Escape without saving through blur", () => {
    render(<KitSwitcher />);
    openManagement();
    fireEvent.click(screen.getByRole("button", { name: "Rename" }));
    const input = screen.getByRole("textbox", { name: "Kit name" });
    fireEvent.change(input, { target: { value: "Unwanted name" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(state.renameKit).not.toHaveBeenCalled();
    expect(screen.queryByRole("textbox", { name: "Kit name" })).not.toBeInTheDocument();
  });
});
