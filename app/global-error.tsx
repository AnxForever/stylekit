"use client";

import { useEffect, useSyncExternalStore } from "react";
import * as Sentry from "@sentry/nextjs";
import { LOCALE_COOKIE_NAME, isLocale } from "@/lib/i18n/routing";

type Locale = "en" | "zh";

/**
 * Self-contained bilingual copy for the last-resort error page.
 *
 * This page renders when the entire app layout has crashed, so it cannot
 * use `useI18n()` (the provider is gone). Keeping a tiny inline map here
 * is acceptable because: (a) the text is short and rarely changes,
 * (b) this page is the absolute last resort, and (c) pulling in a full
 * translation file would defeat the "self-contained" property.
 */
const COPY: Record<
  Locale,
  { htmlLang: string; oops: string; title: string; description: string; retry: string }
> = {
  en: {
    htmlLang: "en",
    oops: "Oops!",
    title: "Something went wrong",
    description: "A critical error occurred. Please try refreshing the page.",
    retry: "Retry",
  },
  zh: {
    htmlLang: "zh-CN",
    oops: "哎呀！",
    title: "出错了",
    description: "发生了一个严重错误，请尝试刷新页面。",
    retry: "重试",
  },
};

// `useSyncExternalStore` is the canonical way to read browser-only state in
// React 19 without triggering the `react-hooks/set-state-in-effect` rule. The
// no-op subscribe function means we only re-read on the next render cycle.
const noopSubscribe = () => () => {};

function getClientLocale(): Locale {
  if (typeof document !== "undefined") {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${LOCALE_COOKIE_NAME}=`));
    const value = match?.split("=")[1];
    if (isLocale(value)) return value;
  }
  if (
    typeof navigator !== "undefined" &&
    navigator.language?.toLowerCase().startsWith("zh")
  ) {
    return "zh";
  }
  return "en";
}

function getServerLocale(): Locale {
  return "en";
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Server snapshot is "en" so SSR + initial client hydration match;
  // post-hydration, React re-renders with the client snapshot.
  const locale = useSyncExternalStore(
    noopSubscribe,
    getClientLocale,
    getServerLocale
  );

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const copy = COPY[locale];

  return (
    <html lang={copy.htmlLang}>
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "28rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "4rem",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                }}
              >
                {copy.oops}
              </span>
            </div>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              {copy.title}
            </h1>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
              {copy.description}
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                fontSize: "0.875rem",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              {copy.retry}
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
