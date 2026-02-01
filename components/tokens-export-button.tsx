"use client";

import { useState } from "react";
import type { DesignStyle } from "@/lib/styles";
import { ExportDialog } from "./export-dialog";

interface TokensExportButtonProps {
  style: DesignStyle;
}

export function TokensExportButton({ style }: TokensExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mr-2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7,10 12,15 17,10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export Figma Tokens
      </button>
      <ExportDialog style={style} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
