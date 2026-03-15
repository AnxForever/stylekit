"use client";

import { useState } from "react";
import { PreviewContainer } from "./_shared";

export function CollapsePreview() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <PreviewContainer bg="light">
      <div className="w-full max-w-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-t-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
        >
          <span>Accordion Item</span>
          <span
            className="transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
          >
            v
          </span>
        </button>
        <div
          className="overflow-hidden border-x border-b border-border rounded-b-lg transition-all duration-[350ms]"
          style={{
            maxHeight: isOpen ? "120px" : "0",
            opacity: isOpen ? 1 : 0,
            paddingTop: isOpen ? "12px" : "0",
            paddingBottom: isOpen ? "12px" : "0",
          }}
        >
          <div className="px-4">
            <p className="text-sm text-muted-foreground">
              This content collapses and expands. Click the header to toggle.
            </p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}
