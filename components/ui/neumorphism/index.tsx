"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neumorphism Design System
// 新拟物派设计系统 - 柔和立体感
// ============================================

// 基础阴影变量
const NEU_SHADOWS = {
  raised: "shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]",
  raisedMd: "shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]",
  raisedLg: "shadow-[12px_12px_24px_#b8bcc2,-12px_-12px_24px_#ffffff]",
  pressed: "shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]",
  pressedMd: "shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]",
  hover: "shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]",
  flat: "shadow-none",
};

// ============================================
// NeuButton - 按钮
// ============================================
export interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "flat";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const NeuButton = React.forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ className, variant = "default", size = "md", loading, disabled, children, ...props }, ref) => {
    const baseStyles = "bg-[#e0e5ec] font-medium rounded-xl transition-all duration-200 focus:outline-none";

    const variantStyles = {
      default: `text-gray-700 ${NEU_SHADOWS.raised} hover:${NEU_SHADOWS.hover} active:${NEU_SHADOWS.pressed}`,
      primary: `bg-[#6d5dfc] text-white ${NEU_SHADOWS.raised} hover:${NEU_SHADOWS.hover} active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]`,
      flat: "text-gray-700 hover:bg-[#d1d9e6]",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const disabledStyles = disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          disabledStyles,
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            加载中...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
NeuButton.displayName = "NeuButton";

// ============================================
// NeuCard - 卡片
// ============================================
export interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "raised" | "flat" | "pressed";
}

export const NeuCard = React.forwardRef<HTMLDivElement, NeuCardProps>(
  ({ className, variant = "raised", children, ...props }, ref) => {
    const variantStyles = {
      raised: NEU_SHADOWS.raisedMd,
      flat: "shadow-none border border-[#d1d9e6]",
      pressed: NEU_SHADOWS.pressedMd,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] rounded-2xl p-6",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NeuCard.displayName = "NeuCard";

// ============================================
// NeuInput - 输入框
// ============================================
export interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const NeuInput = React.forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-[#e0e5ec] text-gray-700 rounded-xl",
          "px-4 py-3",
          NEU_SHADOWS.pressed,
          "focus:shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]",
          "focus:outline-none focus:ring-2 focus:ring-[#6d5dfc]/30",
          "placeholder:text-gray-400",
          "transition-shadow duration-200",
          error && "ring-2 ring-red-400",
          className
        )}
        {...props}
      />
    );
  }
);
NeuInput.displayName = "NeuInput";

// ============================================
// NeuTextarea - 文本域
// ============================================
export interface NeuTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const NeuTextarea = React.forwardRef<HTMLTextAreaElement, NeuTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-[#e0e5ec] text-gray-700 rounded-xl",
          "px-4 py-3 resize-none",
          NEU_SHADOWS.pressed,
          "focus:shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]",
          "focus:outline-none focus:ring-2 focus:ring-[#6d5dfc]/30",
          "placeholder:text-gray-400",
          "transition-shadow duration-200",
          error && "ring-2 ring-red-400",
          className
        )}
        {...props}
      />
    );
  }
);
NeuTextarea.displayName = "NeuTextarea";

// ============================================
// NeuCheckbox - 复选框
// ============================================
export interface NeuCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const NeuCheckbox = React.forwardRef<HTMLInputElement, NeuCheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;

    return (
      <label
        htmlFor={checkboxId}
        className={cn("flex items-center gap-3 cursor-pointer group", className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="peer sr-only"
            {...props}
          />
          <div className={cn(
            "w-6 h-6 bg-[#e0e5ec] rounded-lg",
            NEU_SHADOWS.pressed,
            "peer-checked:bg-[#6d5dfc]",
            "peer-checked:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]",
            "transition-all duration-200"
          )} />
          <svg
            className="absolute inset-0 w-6 h-6 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {label && (
          <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);
NeuCheckbox.displayName = "NeuCheckbox";

// ============================================
// NeuRadio - 单选框
// ============================================
export interface NeuRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const NeuRadio = React.forwardRef<HTMLInputElement, NeuRadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const radioId = id ?? generatedId;

    return (
      <label
        htmlFor={radioId}
        className={cn("flex items-center gap-3 cursor-pointer group", className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className="peer sr-only"
            {...props}
          />
          <div className={cn(
            "w-6 h-6 bg-[#e0e5ec] rounded-full",
            NEU_SHADOWS.pressed,
            "transition-all duration-200"
          )} />
          <div className={cn(
            "absolute inset-1 bg-[#6d5dfc] rounded-full",
            "scale-0 peer-checked:scale-100",
            "shadow-[2px_2px_4px_rgba(0,0,0,0.2)]",
            "transition-transform duration-200"
          )} />
        </div>
        {label && (
          <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);
NeuRadio.displayName = "NeuRadio";

// ============================================
// NeuToggle - 开关
// ============================================
export interface NeuToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const NeuToggle = React.forwardRef<HTMLInputElement, NeuToggleProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const toggleId = id ?? generatedId;

    return (
      <label
        htmlFor={toggleId}
        className={cn("flex items-center gap-3 cursor-pointer group", className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            className="peer sr-only"
            {...props}
          />
          <div className={cn(
            "w-12 h-7 bg-[#e0e5ec] rounded-full",
            NEU_SHADOWS.pressed,
            "peer-checked:bg-[#6d5dfc]/20",
            "transition-all duration-300"
          )} />
          <div className={cn(
            "absolute top-0.5 left-0.5 w-6 h-6 bg-[#e0e5ec] rounded-full",
            NEU_SHADOWS.raised,
            "peer-checked:translate-x-5",
            "peer-checked:bg-[#6d5dfc]",
            "transition-all duration-300"
          )} />
        </div>
        {label && (
          <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);
NeuToggle.displayName = "NeuToggle";

// ============================================
// NeuProgress - 进度条
// ============================================
export interface NeuProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  showValue?: boolean;
  color?: "default" | "primary" | "success";
}

export const NeuProgress = React.forwardRef<HTMLDivElement, NeuProgressProps>(
  ({ className, value, showValue, color = "default", ...props }, ref) => {
    const colorStyles = {
      default: "bg-gray-400",
      primary: "bg-[#6d5dfc]",
      success: "bg-[#4ecdc4]",
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className={cn(
          "h-4 bg-[#e0e5ec] rounded-full overflow-hidden",
          NEU_SHADOWS.pressed
        )}>
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              colorStyles[color],
              "shadow-[2px_0_4px_rgba(0,0,0,0.1)]"
            )}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          />
        </div>
        {showValue && (
          <span className="absolute right-0 -top-6 text-sm text-gray-600">
            {value}%
          </span>
        )}
      </div>
    );
  }
);
NeuProgress.displayName = "NeuProgress";

// ============================================
// NeuSlider - 滑块
// ============================================
export interface NeuSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showValue?: boolean;
}

export const NeuSlider = React.forwardRef<HTMLInputElement, NeuSliderProps>(
  ({ className, showValue, value, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <input
          ref={ref}
          type="range"
          value={value}
          className={cn(
            "w-full h-3 bg-[#e0e5ec] rounded-full appearance-none cursor-pointer",
            NEU_SHADOWS.pressed,
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6",
            "[&::-webkit-slider-thumb]:bg-[#e0e5ec] [&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:transition-shadow",
            "[&::-webkit-slider-thumb]:hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff]"
          )}
          {...props}
        />
        {showValue && (
          <span className="absolute right-0 -top-6 text-sm text-gray-600">
            {value}
          </span>
        )}
      </div>
    );
  }
);
NeuSlider.displayName = "NeuSlider";

// ============================================
// NeuAvatar - 头像
// ============================================
export interface NeuAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export const NeuAvatar = React.forwardRef<HTMLDivElement, NeuAvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const sizeStyles = {
      sm: "w-10 h-10 text-sm",
      md: "w-14 h-14 text-base",
      lg: "w-20 h-20 text-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] rounded-full overflow-hidden flex items-center justify-center",
          NEU_SHADOWS.raised,
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt || ""} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 font-medium">{fallback || "?"}</span>
        )}
      </div>
    );
  }
);
NeuAvatar.displayName = "NeuAvatar";

// ============================================
// NeuIconButton - 图标按钮
// ============================================
export interface NeuIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "raised" | "flat";
}

export const NeuIconButton = React.forwardRef<HTMLButtonElement, NeuIconButtonProps>(
  ({ className, size = "md", variant = "raised", children, ...props }, ref) => {
    const sizeStyles = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    const variantStyles = {
      raised: `${NEU_SHADOWS.raised} hover:${NEU_SHADOWS.hover} active:${NEU_SHADOWS.pressed}`,
      flat: "hover:bg-[#d1d9e6]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] rounded-xl flex items-center justify-center",
          "text-gray-600 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#6d5dfc]/30",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
NeuIconButton.displayName = "NeuIconButton";

// ============================================
// NeuAlert - 提示
// ============================================
export interface NeuAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  title?: string;
}

export const NeuAlert = React.forwardRef<HTMLDivElement, NeuAlertProps>(
  ({ className, variant = "default", title, children, ...props }, ref) => {
    const variantStyles = {
      default: "border-l-4 border-gray-400",
      success: "border-l-4 border-[#4ecdc4]",
      warning: "border-l-4 border-[#ffe66d]",
      error: "border-l-4 border-[#ff6b6b]",
      info: "border-l-4 border-[#6d5dfc]",
    };

    const iconMap = {
      default: "ℹ️",
      success: "✓",
      warning: "⚠",
      error: "✕",
      info: "ℹ",
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "bg-[#e0e5ec] rounded-xl p-4",
          NEU_SHADOWS.raised,
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <span className="text-lg">{iconMap[variant]}</span>
          <div>
            {title && <p className="font-semibold text-gray-800 mb-1">{title}</p>}
            <div className="text-gray-600 text-sm">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);
NeuAlert.displayName = "NeuAlert";

// ============================================
// NeuBadge - 徽章
// ============================================
export interface NeuBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "error";
}

export const NeuBadge = React.forwardRef<HTMLSpanElement, NeuBadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-gray-200 text-gray-700",
      primary: "bg-[#6d5dfc] text-white",
      success: "bg-[#4ecdc4] text-white",
      warning: "bg-[#ffe66d] text-gray-800",
      error: "bg-[#ff6b6b] text-white",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full",
          "text-xs font-medium",
          "shadow-[2px_2px_4px_rgba(0,0,0,0.1)]",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
NeuBadge.displayName = "NeuBadge";

// ============================================
// NeuTabs - 标签页
// ============================================
export interface NeuTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
  defaultTab?: string;
}

export const NeuTabs: React.FC<NeuTabsProps> = ({ tabs, defaultTab, className, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);
  const tablistId = React.useId();

  return (
    <div className={cn("", className)} {...props}>
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="选项卡"
        className={cn(
          "inline-flex p-1.5 bg-[#e0e5ec] rounded-xl mb-4",
          NEU_SHADOWS.pressed
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tablistId}-panel-${tab.id}`}
            id={`${tablistId}-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? cn("bg-[#e0e5ec] text-gray-800", NEU_SHADOWS.raised)
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${tablistId}-panel-${tab.id}`}
          aria-labelledby={`${tablistId}-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className={cn(
            "bg-[#e0e5ec] rounded-xl p-6",
            NEU_SHADOWS.raised
          )}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

// ============================================
// NeuDivider - 分割线
// ============================================
export interface NeuDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const NeuDivider = React.forwardRef<HTMLDivElement, NeuDividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#e0e5ec]",
          orientation === "horizontal"
            ? "h-1 w-full shadow-[inset_0_1px_2px_#b8bcc2,inset_0_-1px_2px_#ffffff]"
            : "w-1 h-full shadow-[inset_1px_0_2px_#b8bcc2,inset_-1px_0_2px_#ffffff]",
          "rounded-full",
          className
        )}
        {...props}
      />
    );
  }
);
NeuDivider.displayName = "NeuDivider";

// ============================================
// NeuSection - 区域容器
// ============================================
export interface NeuSectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "raised" | "pressed";
}

export const NeuSection = React.forwardRef<HTMLElement, NeuSectionProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "",
      raised: NEU_SHADOWS.raisedLg,
      pressed: NEU_SHADOWS.pressedMd,
    };

    return (
      <section
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] px-6 py-12 md:py-20",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
NeuSection.displayName = "NeuSection";

// ============================================
// NeuNav - 导航栏
// ============================================
export type NeuNavProps = React.HTMLAttributes<HTMLElement>;

export const NeuNav = React.forwardRef<HTMLElement, NeuNavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "bg-[#e0e5ec] px-6 py-4",
          "shadow-[0_4px_12px_#b8bcc2]",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {children}
        </div>
      </nav>
    );
  }
);
NeuNav.displayName = "NeuNav";

// ============================================
// NeuLogo - Logo
// ============================================
export type NeuLogoProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const NeuLogo = React.forwardRef<HTMLAnchorElement, NeuLogoProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "text-gray-800 font-bold text-xl",
          "hover:text-[#6d5dfc] transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);
NeuLogo.displayName = "NeuLogo";

// ============================================
// NeuSkeleton - 骨架屏
// ============================================
export interface NeuSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export const NeuSkeleton = React.forwardRef<HTMLDivElement, NeuSkeletonProps>(
  ({ className, variant = "text", ...props }, ref) => {
    const variantStyles = {
      text: "h-4 w-full rounded",
      circular: "w-12 h-12 rounded-full",
      rectangular: "h-24 w-full rounded-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#d1d9e6] animate-pulse",
          NEU_SHADOWS.pressed,
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
NeuSkeleton.displayName = "NeuSkeleton";
