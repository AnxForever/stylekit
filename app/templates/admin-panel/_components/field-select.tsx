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

// The admin-panel template is exported as a standalone Next.js project, so it
// can only import what its own download contains. That rules out the site-wide
// adapter in components/ui/ui-sdk, so this file holds the one select the
// template needs: ui-sdk supplies the WAI-ARIA select-only combobox behavior
// (keyboard, typeahead, focus handling, form value), the classes below supply
// the template's neutral/indigo look instead of the site tokens.

export type SelectOption = { value: string; label: string; disabled?: boolean };

const triggerStyles =
  "flex h-auto items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 transition-colors focus-visible:border-indigo-400 focus-visible:outline-none data-open:border-indigo-400 data-placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50";

const contentStyles =
  "z-50 max-h-72 min-w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 text-sm text-gray-700 shadow-lg";

const itemStyles =
  "flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-gray-700 outline-none data-highlighted:bg-indigo-50 data-highlighted:text-indigo-700 data-selected:font-medium data-disabled:cursor-not-allowed data-disabled:opacity-50";

export function FieldSelect({
  options,
  value,
  onValueChange,
  label,
  ariaLabel,
  placeholder,
  className = "w-full",
}: {
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  ariaLabel?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <SelectPrimitive
      items={options}
      value={value}
      onValueChange={(next) => {
        if (typeof next === "string") onValueChange(next);
      }}
    >
      {label ? (
        <SelectLabel className="block text-sm font-medium text-gray-700">
          {label}
        </SelectLabel>
      ) : null}
      <SelectTrigger
        aria-label={ariaLabel}
        className={`${triggerStyles} ${className}`}
      >
        <SelectValue placeholder={placeholder} />
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 opacity-50" />
      </SelectTrigger>
      <SelectContent className={contentStyles}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={itemStyles}
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
