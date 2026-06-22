// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MagneticTarget, SpotlightSurface } from "@/components/pointer-interactions";

function installMatchMedia(matches: Record<string, boolean>) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: matches[query] ?? false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("pointer interaction primitives", () => {
  beforeEach(() => {
    installMatchMedia({
      "(hover: hover) and (pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": false,
    });

    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });

  it("moves magnetic targets only when pointer interactions are enabled", () => {
    const { getByText } = render(
      <MagneticTarget>
        <button>Target</button>
      </MagneticTarget>
    );
    const target = getByText("Target").parentElement as HTMLElement;
    target.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 100, height: 40, right: 100, bottom: 40, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;

    fireEvent.mouseMove(target, { clientX: 100, clientY: 40 });

    expect(target.style.transform).toContain("translate3d");
  });

  it("does not move magnetic targets for reduced motion users", () => {
    installMatchMedia({
      "(hover: hover) and (pointer: fine)": true,
      "(prefers-reduced-motion: reduce)": true,
    });

    const { getByText } = render(
      <MagneticTarget>
        <button>Target</button>
      </MagneticTarget>
    );
    const target = getByText("Target").parentElement as HTMLElement;
    target.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 100, height: 40, right: 100, bottom: 40, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;

    fireEvent.mouseMove(target, { clientX: 100, clientY: 40 });

    expect(target.style.transform).toBe("");
  });

  it("does not update spotlight variables on coarse pointers", () => {
    installMatchMedia({
      "(hover: hover) and (pointer: fine)": false,
      "(prefers-reduced-motion: reduce)": false,
    });

    const { getByText } = render(
      <SpotlightSurface>
        <p>Surface</p>
      </SpotlightSurface>
    );
    const surface = getByText("Surface").closest(".sk-spotlight-surface") as HTMLElement;
    surface.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 100, height: 80, right: 100, bottom: 80, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;

    fireEvent.mouseMove(surface, { clientX: 40, clientY: 30 });

    expect(surface.style.getPropertyValue("--sk-spotlight-x")).toBe("");
  });
});
