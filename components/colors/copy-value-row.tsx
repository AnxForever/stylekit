"use client";

import { useState } from "react";

interface CopyValueProps {
  label: string;
  value: string;
}

/** One spec-sheet row: mono label, value, copy affordance. */
export function CopyValueRow({ label, value }: CopyValueProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group grid w-full grid-cols-[6rem_1fr_auto] items-baseline gap-3 border-b border-white/10 py-3 text-left transition-colors duration-150 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
      aria-label={`Copy ${label} value ${value}`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
        {label}
      </span>
      <span className="font-mono text-sm text-white/85">{value}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/30 group-hover:text-white/70">
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}
