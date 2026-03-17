"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>
          <div style={{ textAlign: "center", maxWidth: "28rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span style={{
                display: "inline-block",
                fontSize: "4rem",
                fontWeight: 900,
                letterSpacing: "-0.05em",
              }}>
                Oops!
              </span>
            </div>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#666", marginBottom: "2rem" }}>
              A critical error occurred. Please try refreshing the page.
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
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
