"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputOTPProps {
  /** Number of input slots */
  length?: number;
  /** Controlled value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Completion handler */
  onComplete?: (value: string) => void;
  /** Input type */
  type?: "numeric" | "alphanumeric";
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Auto focus first input */
  autoFocus?: boolean;
  /** Mask input (like password) */
  mask?: boolean;
  /** Custom class name */
  className?: string;
  /** Slot class name */
  slotClassName?: string;
}

export function InputOTP({
  length = 6,
  value = "",
  onChange,
  onComplete,
  type = "numeric",
  disabled = false,
  error = false,
  autoFocus = false,
  mask = false,
  className,
  slotClassName,
}: InputOTPProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [localValue, setLocalValue] = React.useState(value);

  // Sync with controlled value
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const pattern = type === "numeric" ? /^[0-9]$/ : /^[a-zA-Z0-9]$/;

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    // Handle paste
    if (inputValue.length > 1) {
      const pastedValue = inputValue.slice(0, length);
      const filteredValue = pastedValue
        .split("")
        .filter((char) => pattern.test(char))
        .join("")
        .slice(0, length);

      setLocalValue(filteredValue);
      onChange?.(filteredValue);

      if (filteredValue.length === length) {
        onComplete?.(filteredValue);
        inputRefs.current[length - 1]?.blur();
      } else {
        focusInput(filteredValue.length);
      }
      return;
    }

    // Handle single character
    if (inputValue && !pattern.test(inputValue)) return;

    const newValue = localValue.split("");
    newValue[index] = inputValue;
    const joined = newValue.join("").slice(0, length);

    setLocalValue(joined);
    onChange?.(joined);

    if (inputValue && index < length - 1) {
      focusInput(index + 1);
    }

    if (joined.length === length) {
      onComplete?.(joined);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      const newValue = localValue.split("");

      if (localValue[index]) {
        newValue[index] = "";
        setLocalValue(newValue.join(""));
        onChange?.(newValue.join(""));
      } else if (index > 0) {
        newValue[index - 1] = "";
        setLocalValue(newValue.join(""));
        onChange?.(newValue.join(""));
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="group"
      aria-label="One-time password input"
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type={mask ? "password" : "text"}
          inputMode={type === "numeric" ? "numeric" : "text"}
          autoComplete="one-time-code"
          autoFocus={autoFocus && index === 0}
          disabled={disabled}
          value={localValue[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          onPaste={(e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData("text");
            handleChange(index, pastedData);
          }}
          className={cn(
            "w-10 h-12 text-center text-lg font-medium",
            "border-2 border-border rounded-md",
            "bg-background text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            "transition-all duration-150",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            slotClassName
          )}
          aria-label={`Digit ${index + 1} of ${length}`}
        />
      ))}
    </div>
  );
}

// Separator component for grouping OTP slots
export function InputOTPSeparator({ className }: { className?: string }) {
  return (
    <div className={cn("w-2 h-0.5 bg-border rounded-full mx-1", className)} />
  );
}

// Group component for semantic grouping
export function InputOTPGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center", className)}>{children}</div>
  );
}
