"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Table
// ============================================
export const BrutalTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto border-2 md:border-4 border-black">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm md:text-base", className)}
      {...props}
    />
  </div>
));
BrutalTable.displayName = "BrutalTable";

export const BrutalTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-black text-white", className)}
    {...props}
  />
));
BrutalTableHeader.displayName = "BrutalTableHeader";

export const BrutalTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
BrutalTableBody.displayName = "BrutalTableBody";

export const BrutalTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b-2 border-black transition-colors hover:bg-brutal-green/20",
      className
    )}
    {...props}
  />
));
BrutalTableRow.displayName = "BrutalTableRow";

export const BrutalTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 md:h-12 px-3 md:px-4 text-left align-middle font-black",
      className
    )}
    {...props}
  />
));
BrutalTableHead.displayName = "BrutalTableHead";

export const BrutalTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-3 md:p-4 align-middle font-mono", className)}
    {...props}
  />
));
BrutalTableCell.displayName = "BrutalTableCell";
