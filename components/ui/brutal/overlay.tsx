"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Modal
// ============================================
export interface BrutalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BrutalModal: React.FC<BrutalModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();

  React.useEffect(() => {
    if (isOpen) {
      // 保存原始 overflow 值
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // 聚焦到 modal
      modalRef.current?.focus();

      return () => {
        // 恢复原始值
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Escape 键关闭
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-lg bg-white border-4 md:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b-2 md:border-b-4 border-black">
          {title && (
            <h2 id={titleId} className="font-black text-xl md:text-2xl">{title}</h2>
          )}
          <button
            onClick={onClose}
            aria-label="关闭弹窗"
            className="ml-auto w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-brutal-pink text-white font-black text-lg md:text-xl border-2 border-black hover:bg-black transition-colors"
          >
            ✕
          </button>
        </div>
        {/* Content */}
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

// ============================================
// Neo-Brutalist Tooltip
// ============================================
export interface BrutalTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const BrutalTooltip: React.FC<BrutalTooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const tooltipId = React.useId();

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <span aria-describedby={isVisible ? tooltipId : undefined}>
        {children}
      </span>
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 px-3 py-2",
            "bg-black text-white font-mono text-sm",
            "border-2 border-black",
            "whitespace-nowrap",
            positions[position]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
