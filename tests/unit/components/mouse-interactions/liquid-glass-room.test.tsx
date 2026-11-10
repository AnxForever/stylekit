// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { StrictMode } from "react";
import { act, cleanup, createEvent, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { localeState } = vi.hoisted(() => ({ localeState: { value: "en" as "en" | "zh" } }));
vi.mock("@/lib/i18n/context", () => ({ useI18n: () => ({ locale: localeState.value }) }));
// These stubs isolate the room selector from the old rooms' unrelated loops.
vi.mock("@/components/mouse-interactions/rooms/neo-brutalist-room", () => ({
  NeoBrutalistRoom: ({ showHeader = true }: { showHeader?: boolean }) => <div data-testid="old-neo">{showHeader ? "Neo header" : "Neo"}</div>,
}));
vi.mock("@/components/mouse-interactions/rooms/glassmorphism-room", () => ({
  GlassmorphismRoom: ({ showHeader = true }: { showHeader?: boolean }) => <div data-testid="old-glass">{showHeader ? "Glass header" : "Glass"}</div>,
}));
vi.mock("@/components/mouse-interactions/rooms/editorial-room", () => ({
  EditorialRoom: ({ showHeader = true }: { showHeader?: boolean }) => <div data-testid="old-editorial">{showHeader ? "Editorial header" : "Editorial"}</div>,
}));
vi.mock("@/components/mouse-interactions/rooms/generic-room", () => ({
  GenericRoom: () => <div data-testid="generic-room">Generic stage</div>,
}));

import { LiquidGlassRoom } from "@/components/mouse-interactions/rooms/liquid-glass-room";
import { MouseInteractionsContent } from "@/components/mouse-interactions/mouse-interactions-content";
import { getRoomBySlug } from "@/components/mouse-interactions/rooms/registry";

class ResizeObserverMock {
  static instances: ResizeObserverMock[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(private callback: ResizeObserverCallback) {
    ResizeObserverMock.instances.push(this);
  }
  resize() { this.callback([], this as unknown as ResizeObserver); }
}

let stageWidth = 400;
let stageHeight = 320;
let opaque = false;

function renderedParts(container: HTMLElement) {
  return {
    stage: container.querySelector("[data-liquid-glass-stage]") as HTMLDivElement,
    lens: container.querySelector("[data-liquid-glass-lens]") as HTMLDivElement,
  };
}

describe("Liquid Glass room", () => {
  beforeEach(() => {
    localeState.value = "en";
    stageWidth = 400;
    stageHeight = 320;
    opaque = false;
    ResizeObserverMock.instances = [];
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
    vi.spyOn(window.navigator, "userAgent", "get").mockReturnValue("Firefox/135.0");
    vi.spyOn(CSS, "supports").mockReturnValue(false);
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)" || (opaque && query === "(prefers-reduced-transparency: reduce)"),
      media: query, onchange: null, addEventListener: vi.fn(), removeEventListener: vi.fn(),
      addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: () => true,
    }));
    vi.spyOn(window, "requestAnimationFrame");
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
      return this.hasAttribute("data-liquid-glass-stage") ? stageWidth : 0;
    });
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockImplementation(function (this: HTMLElement) {
      return this.hasAttribute("data-liquid-glass-stage") ? stageHeight : 0;
    });
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(function (this: HTMLElement) {
      return this.hasAttribute("data-liquid-glass-lens") ? 160 : 0;
    });
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(function (this: HTMLElement) {
      return this.hasAttribute("data-liquid-glass-lens") ? 112 : 0;
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
      return this.hasAttribute("data-liquid-glass-stage") ? new DOMRect(10, 20, stageWidth, stageHeight) : new DOMRect();
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("moves the real shared lens by pointer and keyboard, clamps on resize and schedules no animation", () => {
    const { container } = render(<LiquidGlassRoom />);
    const { stage, lens } = renderedParts(container);
    const control = screen.getByRole("button", { name: "Move glass lens; click to center" });
    expect(lens.querySelector("[data-liquid-optics]")).toHaveAttribute("data-liquid-optics", "frost");
    expect(lens.style.transform).toBe("translate3d(120px, 104px, 0)");
    fireEvent.pointerMove(stage, { pointerType: "mouse", clientX: 270, clientY: 140 });
    expect(lens.style.transform).toBe("translate3d(180px, 64px, 0)");
    fireEvent.keyDown(control, { key: "ArrowRight" });
    fireEvent.keyDown(control, { key: "ArrowUp", shiftKey: true });
    expect(lens.style.transform).toBe("translate3d(188px, 40px, 0)");
    fireEvent.keyDown(control, { key: "Home" });
    expect(lens.style.transform).toBe("translate3d(120px, 104px, 0)");
    stageWidth = 240;
    stageHeight = 200;
    const observer = ResizeObserverMock.instances.find((item) => item.observe.mock.calls.some(([node]) => node === stage));
    act(() => observer?.resize());
    expect(lens.style.transform).toBe("translate3d(68px, 76px, 0)");
    fireEvent.click(control);
    expect(lens.style.transform).toBe("translate3d(40px, 44px, 0)");
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });

  it("leaves touch swipes uncancelled and moves only after a tap", () => {
    const { container } = render(<LiquidGlassRoom showHeader={false} />);
    const { stage, lens } = renderedParts(container);
    const start = lens.style.transform;
    const capture = vi.fn();
    Object.defineProperty(stage, "setPointerCapture", { value: capture });
    fireEvent.pointerDown(stage, { pointerType: "touch", pointerId: 1, clientX: 80, clientY: 90 });
    const move = createEvent.pointerMove(stage, { pointerType: "touch", pointerId: 1, clientX: 80, clientY: 210, cancelable: true });
    fireEvent(stage, move);
    fireEvent.pointerUp(stage, { pointerType: "touch", pointerId: 1, clientX: 80, clientY: 210 });
    expect(move.defaultPrevented).toBe(false);
    expect(stage.style.touchAction).toBe("auto");
    expect(capture).not.toHaveBeenCalled();
    expect(lens.style.transform).toBe(start);
    fireEvent.pointerDown(stage, { pointerType: "touch", pointerId: 2, clientX: 80, clientY: 90 });
    fireEvent.pointerCancel(stage, { pointerType: "touch", pointerId: 2 });
    fireEvent.pointerUp(stage, { pointerType: "touch", pointerId: 2, clientX: 80, clientY: 90 });
    expect(lens.style.transform).toBe(start);
    fireEvent.pointerDown(stage, { pointerType: "touch", pointerId: 3, clientX: 80, clientY: 90 });
    fireEvent.pointerUp(stage, { pointerType: "touch", pointerId: 3, clientX: 80, clientY: 90 });
    expect(lens.style.transform).toBe("translate3d(12px, 14px, 0)");
    expect(screen.queryByText("Room 09 — Liquid Glass")).not.toBeInTheDocument();
  });

  it("cleans up observers through StrictMode and explains fallback and opaque materials in both locales", () => {
    const view = render(<StrictMode><LiquidGlassRoom /></StrictMode>);
    expect(screen.getByRole("status")).toHaveTextContent("Frosted alternative");
    expect(ResizeObserverMock.instances.some((observer) => observer.disconnect.mock.calls.length > 0)).toBe(true);
    view.unmount();
    expect(ResizeObserverMock.instances.every((observer) => observer.disconnect.mock.calls.length > 0)).toBe(true);
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();

    localeState.value = "zh";
    opaque = true;
    const { container } = render(<LiquidGlassRoom />);
    expect(screen.getByText("房间 09 — 液态玻璃")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("已按你的显示偏好使用实体材质");
    expect(container.querySelector("[data-liquid-optics]")).toHaveAttribute("data-liquid-optics", "solid");
  });

  it("opens the new room, all three existing components and the generic fallback in Cursor Lab", () => {
    expect(getRoomBySlug("liquid-glass")?.Component).toBe(LiquidGlassRoom);
    expect(getRoomBySlug("liquid-glass")?.stage).toBeUndefined();
    const { container } = render(<MouseInteractionsContent />);
    expect(screen.getByTestId("old-neo")).toHaveTextContent("Neo header");
    fireEvent.click(screen.getByRole("button", { name: /02 Glassmorphism/ }));
    expect(screen.getByTestId("old-glass")).toHaveTextContent("Glass header");
    fireEvent.click(screen.getByRole("button", { name: /03 Editorial/ }));
    expect(screen.getByTestId("old-editorial")).toHaveTextContent("Editorial header");
    fireEvent.click(screen.getByRole("button", { name: /09 Liquid Glass/ }));
    expect(container.querySelector("[data-liquid-glass-room]")).toBeInTheDocument();
    expect(container.querySelector("[data-liquid-optics]")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /04 Cyberpunk Neon/ }));
    expect(screen.getByTestId("generic-room")).toBeInTheDocument();
  });
});
