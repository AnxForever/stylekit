"use client";

import { useState } from "react";

export function PromptCopyButton({
  targetId,
  copyLabel,
  copiedLabel,
}: {
  targetId: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const prompt = document.getElementById(targetId)?.textContent;
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-controls={targetId}
      className="shrink-0 border border-border px-2 py-1 text-xs transition-colors hover:bg-foreground hover:text-background"
    >
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}
