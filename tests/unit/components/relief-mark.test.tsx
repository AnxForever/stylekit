// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReliefMark } from "@/components/templates/relief-mark";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("ReliefMark", () => {
  it("exposes a labeled button with a decorative SVG and momentary keyboard/pointer feedback", () => {
    render(<ReliefMark label="Field Manual relief mark" />);

    const button = screen.getByRole("button", { name: "Field Manual relief mark" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toHaveAttribute("aria-pressed");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");

    fireEvent.pointerDown(button, { pointerType: "mouse", button: 0 });
    expect(button).toHaveAttribute("data-pressed", "true");
    fireEvent.pointerUp(button, { pointerType: "mouse", button: 0 });
    expect(button).toHaveAttribute("data-pressed", "false");

    fireEvent.keyDown(button, { key: " " });
    expect(button).toHaveAttribute("data-pressed", "true");
    fireEvent.keyUp(button, { key: " " });
    expect(button).toHaveAttribute("data-pressed", "false");

    fireEvent.keyDown(button, { key: "Enter" });
    expect(button).toHaveAttribute("data-pressed", "true");
    fireEvent.keyUp(button, { key: "Enter" });
    expect(button).toHaveAttribute("data-pressed", "false");
  });

  it("keeps pattern and light ids distinct across instances", () => {
    const { container } = render(
      <>
        <ReliefMark label="First mark" />
        <ReliefMark label="Second mark" />
      </>
    );

    const ids = [...container.querySelectorAll("pattern, radialGradient")]
      .map((element) => element.id);

    expect(ids).toHaveLength(4);
    expect(new Set(ids).size).toBe(4);
    for (const id of ids) {
      expect(container.querySelector('[fill="url(#' + id + ')"]') ||
        container.querySelector('[stroke="url(#' + id + ')"]')).toBeTruthy();
    }
  });

  it("moves its light only for fine pointer input and disables it for reduced motion", () => {
    const matchMedia = vi.spyOn(window, "matchMedia").mockImplementation((query) =>
      ({
        matches: query.includes("prefers-reduced-motion") ? false : true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(() => true),
      }) as MediaQueryList
    );
    render(<ReliefMark />);
    const button = screen.getByRole("button", { name: "Field Manual mark" });
    const gradient = button.querySelector("radialGradient");
    expect(gradient).not.toBeNull();

    vi.spyOn(button, "getBoundingClientRect").mockReturnValue({
      x: 10,
      y: 20,
      left: 10,
      top: 20,
      right: 110,
      bottom: 120,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    });

    fireEvent.pointerMove(button, {
      pointerType: "mouse",
      clientX: 85,
      clientY: 45,
    });
    expect(gradient).toHaveAttribute("cx", "75.0%");
    expect(gradient).toHaveAttribute("cy", "25.0%");

    matchMedia.mockImplementation((query) =>
      ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(() => true),
      }) as MediaQueryList
    );
    fireEvent.pointerMove(button, {
      pointerType: "mouse",
      clientX: 25,
      clientY: 95,
    });
    expect(gradient).toHaveAttribute("cx", "75.0%");
    expect(gradient).toHaveAttribute("cy", "25.0%");
  });
});
