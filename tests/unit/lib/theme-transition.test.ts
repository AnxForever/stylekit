// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { setThemeAnimated } from "@/lib/theme/transition";

function stubMotionPreference(prefersReduced: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: query.includes("prefers-reduced-motion")
          ? !prefersReduced
          : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  );
}

function stubViewTransition() {
  let finish: (() => void) | null = null;
  const start = vi.fn((callback: () => void) => {
    callback();
    return {
      finished: new Promise<void>((resolve) => {
        finish = resolve;
      }),
    };
  });
  Object.defineProperty(document, "startViewTransition", {
    configurable: true,
    value: start,
  });
  return {
    start,
    settle: () => finish?.(),
    cleanup: () => {
      Reflect.deleteProperty(document, "startViewTransition");
    },
  };
}

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.classList.remove("light", "dark", "theme-transition");
  Reflect.deleteProperty(document, "startViewTransition");
});

describe("setThemeAnimated", () => {
  it("swaps instantly when the View Transitions API is unavailable", () => {
    stubMotionPreference(false);
    const setTheme = vi.fn();

    setThemeAnimated("dark", setTheme);

    expect(setTheme).toHaveBeenCalledWith("dark");
    expect(document.documentElement.classList.contains("theme-transition")).toBe(false);
  });

  it("honours reduced motion and skips the transition", () => {
    stubMotionPreference(true);
    const viewTransition = stubViewTransition();
    const setTheme = vi.fn();

    setThemeAnimated("light", setTheme);

    expect(viewTransition.start).not.toHaveBeenCalled();
    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("runs the theme update inside a view transition and clears the scope class", async () => {
    stubMotionPreference(false);
    const viewTransition = stubViewTransition();
    const duringSwap: boolean[] = [];
    const setTheme = vi.fn(() => {
      duringSwap.push(document.documentElement.classList.contains("theme-transition"));
    });

    setThemeAnimated("dark", setTheme);

    expect(viewTransition.start).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith("dark");
    expect(duringSwap).toEqual([true]);
    // The class swap must land inside the callback: the new snapshot is taken
    // when it returns, and next-themes' own effect runs later.
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("theme-transition")).toBe(true);

    viewTransition.settle();
    await Promise.resolve();
    await Promise.resolve();

    expect(document.documentElement.classList.contains("theme-transition")).toBe(false);
    viewTransition.cleanup();
  });

  it("falls back when the transition cannot start", () => {
    stubMotionPreference(false);
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      value: () => {
        throw new Error("unsupported");
      },
    });
    const setTheme = vi.fn();

    setThemeAnimated("dark", setTheme);

    expect(setTheme).toHaveBeenCalledWith("dark");
    expect(document.documentElement.classList.contains("theme-transition")).toBe(false);
  });
});
