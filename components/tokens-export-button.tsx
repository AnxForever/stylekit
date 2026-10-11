"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import type { DesignStyle } from "@/lib/styles";
import { useI18n } from "@/lib/i18n/context";

const ExportDialog = dynamic(
  () => import("./export-dialog").then((module) => module.ExportDialog),
  { ssr: false },
);

interface TokensExportButtonProps {
  style: DesignStyle;
}

export function TokensExportButton({ style }: TokensExportButtonProps) {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mr-2"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {locale === "zh" ? "导出 Figma 令牌" : "Export Figma Tokens"}
        </button>
      </Dialog.Trigger>
      {isOpen ? <ExportDialog style={style} /> : null}
    </Dialog.Root>
  );
}