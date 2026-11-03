"use client";

export type ThemePreference = "light" | "dark";

function applyThemePreference(
  next: ThemePreference,
  setTheme: (theme: string) => void,
): void {
  // next-themes writes the class in an effect that lands after the View
  // Transition callback returns, which would snapshot the old palette twice.
  // Swap the class here so the incoming snapshot is already the new theme;
  // setTheme still runs to persist the choice and keep next-themes in sync.
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(next);
  root.style.colorScheme = next;
  setTheme(next);
}

/**
 * Swap the theme inside a View Transition so the incoming palette wipes in as
 * a blurred circle (see the `theme-transition` rules in globals.css).
 *
 * Falls back to an instant swap where the API is missing or the visitor asked
 * for reduced motion, which keeps the toggle usable on older browsers.
 */
export function setThemeAnimated(
  next: ThemePreference,
  setTheme: (theme: string) => void,
): void {
  if (typeof document === "undefined") {
    setTheme(next);
    return;
  }

  const animate =
    typeof document.startViewTransition === "function" &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  if (!animate) {
    applyThemePreference(next, setTheme);
    return;
  }

  const root = document.documentElement;
  root.classList.add("theme-transition");

  try {
    const transition = document.startViewTransition(() => {
      applyThemePreference(next, setTheme);
    });
    void transition.finished.finally(() => {
      root.classList.remove("theme-transition");
    });
  } catch {
    root.classList.remove("theme-transition");
    applyThemePreference(next, setTheme);
  }
}
