"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Accordion
// ============================================
export interface BrutalAccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const BrutalAccordionItem: React.FC<BrutalAccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const contentId = React.useId();
  const headerId = React.useId();

  return (
    <div className="border-2 md:border-4 border-black">
      <button
        id={headerId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-center justify-between p-4 md:p-6 bg-white hover:bg-brutal-green transition-colors"
      >
        <span className="font-black text-base md:text-lg">{title}</span>
        <span
          className={cn(
            "text-xl md:text-2xl font-black transition-transform",
            isOpen && "rotate-45"
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        hidden={!isOpen}
        className={cn(
          "border-t-2 md:border-t-4 border-black bg-white",
          isOpen ? "p-4 md:p-6" : "hidden"
        )}
      >
        <div className="font-mono text-sm md:text-base">{children}</div>
      </div>
    </div>
  );
};

export interface BrutalAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const BrutalAccordion = React.forwardRef<HTMLDivElement, BrutalAccordionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-[-2px] md:space-y-[-4px]", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BrutalAccordion.displayName = "BrutalAccordion";
