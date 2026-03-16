"use client";

import { useEffect, useState, useCallback } from "react";
import { PreviewContainer, ReplayButton, useReplay } from "./_shared";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
const TARGET = "STYLEKIT";

function ScrambleText({ text, triggerKey }: { text: string; triggerKey: number }) {
  const [display, setDisplay] = useState<string[]>(
    text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
  );
  const [resolved, setResolved] = useState<boolean[]>(new Array(text.length).fill(false));

  const scramble = useCallback(() => {
    setDisplay(text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]));
    setResolved(new Array(text.length).fill(false));

    let frame = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((_, i) =>
          i <= frame ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
      );
      setResolved((prev) => prev.map((_, i) => i <= frame));
      frame++;
      if (frame >= text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const cleanup = scramble();
    return cleanup;
  }, [scramble, triggerKey]);

  return (
    <span className="font-mono text-2xl font-bold tracking-widest">
      {display.map((ch, i) => (
        <span
          key={`${triggerKey}-${i}`}
          className="inline-block transition-colors duration-100"
          style={{
            opacity: resolved[i] ? 1 : 0.4,
            color: resolved[i] ? "#ffffff" : "#00ffff",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export function TextScramblePreview() {
  const { key, replay } = useReplay();

  return (
    <PreviewContainer bg="dark">
      <ReplayButton onReplay={replay} />
      <ScrambleText text={TARGET} triggerKey={key} />
    </PreviewContainer>
  );
}
