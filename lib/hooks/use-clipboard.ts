"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ClipboardResult = {
  id: string;
  state: "copied" | "failed";
  text: string;
};

type UseClipboardOptions = {
  copiedDuration?: number;
};

/**
 * Copies text and exposes an honest, latest-request status for UI feedback.
 * A newer copy replaces older pending requests, and an old timer cannot clear
 * a result from a later click.
 */
export function useClipboard({ copiedDuration = 1800 }: UseClipboardOptions = {}) {
  const [result, setResult] = useState<ClipboardResult | null>(null);
  const requestRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      requestRef.current += 1;
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(async (text: string, id: string): Promise<boolean> => {
    const requestId = ++requestRef.current;
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setResult(null);

    try {
      const clipboard = typeof navigator === "undefined" ? undefined : navigator.clipboard;
      if (!clipboard || typeof clipboard.writeText !== "function") {
        throw new Error("Clipboard API is unavailable");
      }

      await clipboard.writeText(text);
      if (requestId !== requestRef.current) return false;

      setResult({ id, state: "copied", text });
      const timeout = setTimeout(() => {
        if (requestId === requestRef.current) setResult(null);
        if (timeoutRef.current === timeout) timeoutRef.current = null;
      }, copiedDuration);
      timeoutRef.current = timeout;
      return true;
    } catch {
      if (requestId !== requestRef.current) return false;
      setResult({ id, state: "failed", text });
      return false;
    }
  }, [copiedDuration]);

  const isCopied = useCallback(
    (id: string, text?: string) =>
      result?.id === id &&
      result.state === "copied" &&
      (text === undefined || result.text === text),
    [result],
  );

  return { copy, result, isCopied };
}
