// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { StrictMode } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import gsap from "gsap";
import { PointerContext } from "@/components/mouse-interactions/_stage";
import { Warp } from "@/components/mouse-interactions/primitives/_physics-effects";

const addTicker = gsap.ticker.add.bind(gsap.ticker);
let addedCallbacks: gsap.TickerCallback[] = [];

function createStage() {
  // Keep this stage alive after Warp unmounts: a leaked callback must not be
  // hidden by the parent's ref becoming null.
  const stage = document.createElement("div");
  const readBounds = vi.spyOn(stage, "getBoundingClientRect")
    .mockReturnValue(new DOMRect(10, 20, 400, 300));
  return {
    readBounds,
    value: {
      stageRef: { current: stage },
      pos: { current: { x: 210, y: 130, inside: true } },
    },
  };
}

describe("Warp GSAP lifecycle", () => {
  beforeEach(() => {
    gsap.ticker.sleep();
    addedCallbacks = [];
    // Exercise real GSAP and useGSAP; record listeners only so a failing
    // regression cannot leave its leaked callbacks running in the test worker.
    vi.spyOn(gsap.ticker, "add").mockImplementation((callback, once, prioritize) => {
      addedCallbacks.push(callback);
      return addTicker(callback, once, prioritize);
    });
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    addedCallbacks.forEach((callback) => gsap.ticker.remove(callback));
    gsap.ticker.sleep();
    vi.restoreAllMocks();
  });

  it("has one live listener after StrictMode replay and none after repeated unmounts", () => {
    const { value, readBounds } = createStage();
    for (let mount = 0; mount < 3; mount++) {
      const view = render(
        <StrictMode>
          <PointerContext.Provider value={value}><Warp /></PointerContext.Provider>
        </StrictMode>
      );
      gsap.ticker.wake();
      readBounds.mockClear();
      act(() => gsap.ticker.tick());
      expect(readBounds).toHaveBeenCalledTimes(1);

      view.unmount();
      gsap.ticker.wake();
      readBounds.mockClear();
      act(() => gsap.ticker.tick());
      expect(readBounds).not.toHaveBeenCalled();
    }
  });

  it("keeps pointer following and equal-axis pulsing without reset warnings", () => {
    const { value } = createStage();
    vi.spyOn(performance, "now").mockReturnValue(1000);
    const { container } = render(
      <PointerContext.Provider value={value}><Warp /></PointerContext.Provider>
    );
    const blob = container.querySelector("[aria-hidden='true']") as HTMLDivElement;

    act(() => {
      gsap.ticker.tick();
      gsap.getTweensOf(blob).forEach((tween) => tween.progress(1));
    });
    expect(gsap.getProperty(blob, "x")).toBe(200);
    expect(gsap.getProperty(blob, "y")).toBe(110);
    expect(gsap.getProperty(blob, "opacity")).toBe(1);
    expect(gsap.getProperty(blob, "scaleX")).toBeCloseTo(1 + Math.sin(2.2) * 0.12, 4);
    expect(gsap.getProperty(blob, "scaleY")).toBe(gsap.getProperty(blob, "scaleX"));
    expect(blob.style.borderRadius).not.toBe("");

    value.pos.current.inside = false;
    act(() => {
      gsap.ticker.tick();
      gsap.getTweensOf(blob).forEach((tween) => tween.progress(1));
    });
    expect(gsap.getProperty(blob, "opacity")).toBe(0);
    expect(vi.mocked(console.warn).mock.calls.flat().join(" ")).not.toContain("not eligible for reset");
  });
});
