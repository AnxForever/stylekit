"use client";

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useId } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

function fieldNameFromId(id: string) {
  return id.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export function AdminPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--admin-border-soft)] bg-[var(--admin-panel)] shadow-[var(--admin-shadow)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AdminSection({
  title,
  description,
  badge,
  actions,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AdminPanel className={cn("p-4 sm:p-5", className)}>
      {(title || description || badge || actions) && (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {title ? (
                <h2 className="text-sm font-semibold text-foreground">{title}</h2>
              ) : null}
              {badge}
            </div>
            {description ? (
              <p className="mt-1 max-w-2xl text-xs leading-5 text-muted">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {actions}
            </div>
          ) : null}
        </div>
      )}
      {children}
    </AdminPanel>
  );
}

export function AdminToolbar({
  title,
  description,
  meta,
  actions,
  children,
}: {
  title: string;
  description?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <AdminPanel className="p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            {meta}
          </div>
          {description ? (
            <p className="mt-1 max-w-3xl text-xs leading-5 text-muted">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions}
          </div>
        ) : null}
      </div>
      {children ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-end">
          {children}
        </div>
      ) : null}
    </AdminPanel>
  );
}

export function AdminField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export function AdminInput({
  className,
  id,
  name,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <input
      id={inputId}
      name={name ?? fieldNameFromId(inputId)}
      className={cn(
        "h-11 min-w-0 rounded-md border border-[var(--admin-border-soft)] bg-[var(--admin-input)] px-3 text-sm text-foreground placeholder:text-muted transition-colors hover:border-border focus:border-foreground/35",
        className
      )}
      {...props}
    />
  );
}

export function AdminSelect({
  className,
  id,
  name,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <select
      id={selectId}
      name={name ?? fieldNameFromId(selectId)}
      className={cn(
        "h-11 min-w-0 rounded-md border border-[var(--admin-border-soft)] bg-[var(--admin-input)] px-3 text-sm text-foreground transition-colors hover:border-border focus:border-foreground/35",
        className
      )}
      {...props}
    />
  );
}

export function AdminTextarea({
  className,
  id,
  name,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <textarea
      id={textareaId}
      name={name ?? fieldNameFromId(textareaId)}
      className={cn(
        "min-w-0 rounded-md border border-[var(--admin-border-soft)] bg-[var(--admin-input)] px-3 py-2 text-sm text-foreground placeholder:text-muted transition-colors hover:border-border focus:border-foreground/35",
        className
      )}
      {...props}
    />
  );
}

export function AdminTableShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <AdminPanel className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">{children}</table>
      </div>
    </AdminPanel>
  );
}

export function AdminEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <AdminPanel className="p-8 text-center">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </AdminPanel>
  );
}

export function AdminLoadingState({
  label = "Loading data...",
}: {
  label?: string;
}) {
  return (
    <AdminPanel className="p-5">
      <div className="flex items-center gap-3 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" />
        {label}
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-2/3 rounded-full bg-muted/15" />
        <div className="h-3 w-1/2 rounded-full bg-muted/10" />
      </div>
    </AdminPanel>
  );
}

export function AdminErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-lg border border-rose-500/25 bg-rose-500/8 p-5">
      <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
        {message}
      </p>
      <AdminButton onClick={onRetry} className="mt-3" size="sm">
        <RefreshCw className="h-3.5 w-3.5" />
        Retry
      </AdminButton>
    </div>
  );
}

export function AdminCountPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: AdminBadgeTone;
}) {
  return (
    <AdminBadge tone={tone} className="rounded-full">
      {children}
    </AdminBadge>
  );
}

type AdminBadgeTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export function AdminBadge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: AdminBadgeTone;
  className?: string;
}) {
  const toneClass =
    tone === "primary"
      ? "border-foreground/20 bg-foreground text-background"
      : tone === "success"
        ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        : tone === "warning"
          ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
          : tone === "danger"
            ? "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300"
            : tone === "info"
              ? "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300"
              : "border-[var(--admin-border-soft)] bg-muted/8 text-muted";

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md border px-2 text-xs font-medium",
        toneClass,
        className
      )}
    >
      {children}
    </span>
  );
}

type AdminButtonTone = "neutral" | "primary" | "danger" | "success" | "ghost";
type AdminButtonSize = "sm" | "md" | "icon";

export function AdminButton({
  children,
  className = "",
  tone = "neutral",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: AdminButtonTone;
  size?: AdminButtonSize;
}) {
  const toneClass =
    tone === "primary"
      ? "border-foreground bg-foreground text-background hover:opacity-90"
      : tone === "danger"
        ? "border-rose-500/30 text-rose-700 hover:bg-rose-500/10 dark:text-rose-300"
        : tone === "success"
          ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
          : tone === "ghost"
            ? "border-transparent text-muted hover:bg-muted/10 hover:text-foreground"
            : "border-[var(--admin-border-soft)] text-muted hover:bg-muted/10 hover:text-foreground";

  const sizeClass =
    size === "sm"
      ? "min-h-11 rounded-md px-3 text-xs"
      : size === "icon"
        ? "h-11 w-11 rounded-md px-0"
        : "h-11 rounded-md px-3 text-sm";

  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 border font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        toneClass,
        sizeClass,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminSegmentedControl<TValue extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  className = "",
}: {
  value: TValue;
  options: Array<{
    value: TValue;
    label: ReactNode;
    ariaLabel?: string;
  }>;
  onChange: (value: TValue) => void;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex rounded-md border border-[var(--admin-border-soft)] bg-[var(--admin-input)] p-0.5",
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex min-h-11 min-w-[44px] items-center justify-center gap-2 rounded-[5px] px-3 text-sm font-medium transition-colors",
              active
                ? "bg-foreground text-background shadow-sm"
                : "text-muted hover:bg-muted/10 hover:text-foreground"
            )}
            aria-label={option.ariaLabel}
            aria-pressed={active}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function AdminPagination({
  page,
  totalPages,
  summary,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  page: number;
  totalPages: number;
  summary?: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
      <span>{summary ?? `Page ${page} / ${totalPages}`}</span>
      <div className="flex items-center gap-2">
        <AdminButton
          disabled={!hasPrev}
          onClick={onPrev}
          size="sm"
          aria-label="Previous page"
        >
          Prev
        </AdminButton>
        <span className="min-w-16 text-center tabular-nums">
          {page} / {totalPages}
        </span>
        <AdminButton
          disabled={!hasNext}
          onClick={onNext}
          size="sm"
          aria-label="Next page"
        >
          Next
        </AdminButton>
      </div>
    </div>
  );
}
