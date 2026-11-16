"use client";

import { Check, ChevronDown } from "lucide-react";

import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk/react/select";

import { cn } from "@/lib/utils";

// Adapter over @ui-sdk/react/select. ui-sdk ships the WAI-ARIA select-only
// combobox behavior (keyboard, typeahead, focus, form value) with no styles;
// this file gives it the house look and a smaller surface, so pages do not
// each re-derive the same class strings. Pass *_ClassName to take over a
// part when a page has its own design, like the admin-panel template.

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  label?: string;
  "aria-label"?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
};

const triggerStyles =
  "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background data-open:border-foreground data-placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50";

const contentStyles =
  "z-50 max-h-72 min-w-[var(--anchor-width)] overflow-y-auto rounded-md border border-border bg-background p-1 text-foreground shadow-lg";

const itemStyles =
  "flex cursor-pointer items-center justify-between gap-2 rounded-sm px-3 py-2 text-sm outline-none data-highlighted:bg-foreground/5 data-selected:font-medium data-disabled:cursor-not-allowed data-disabled:opacity-50";

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  label,
  "aria-label": ariaLabel,
  disabled,
  name,
  className,
  labelClassName,
  triggerClassName,
  contentClassName,
  itemClassName,
}: SelectProps) {
  return (
    <SelectPrimitive
      items={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.((next as string | null) ?? null)}
      disabled={disabled}
      name={name}
    >
      {label ? (
        <SelectLabel className={cn("text-sm font-medium text-foreground", labelClassName)}>
          {label}
        </SelectLabel>
      ) : null}
      <SelectTrigger
        aria-label={ariaLabel}
        className={cn(triggerStyles, className, triggerClassName)}
      >
        <SelectValue placeholder={placeholder} />
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 opacity-50" />
      </SelectTrigger>
      <SelectContent className={cn(contentStyles, contentClassName)}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={cn(itemStyles, itemClassName)}
          >
            {option.label}
            <SelectItemIndicator>
              <Check aria-hidden="true" className="h-3.5 w-3.5" />
            </SelectItemIndicator>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive>
  );
}
