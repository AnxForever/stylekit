"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="border border-border">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs text-muted font-mono uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-muted hover:text-foreground transition-colors px-2 py-1"
        >
          {copied ? t("export.copied") : t("export.copyCode")}
        </button>
      </div>
      <pre className="!mt-0 !rounded-none !bg-transparent p-4 overflow-auto max-h-[400px]">
        <code className="text-sm text-foreground">{code.trim()}</code>
      </pre>
    </div>
  );
}
