"use client";

import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/**
 * Collapsed on mobile, always visible on desktop.
 * Uses native <details>/<summary> for zero-JS mobile toggle.
 * On md+ the content wrapper forces display:block regardless of open state.
 */
export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  return (
    <details
      className="group/collapsible"
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className="flex items-center justify-between cursor-pointer list-none py-2 md:pointer-events-none md:cursor-default [&::-webkit-details-marker]:hidden">
        <span className="text-xs tracking-widest uppercase text-muted">
          {title}
        </span>
        <ChevronDown className="w-4 h-4 text-muted transition-transform group-open/collapsible:rotate-180 md:hidden" />
      </summary>
      <div className="mt-4 md:!block">{children}</div>
    </details>
  );
}
