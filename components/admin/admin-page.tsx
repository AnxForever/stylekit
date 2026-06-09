import type { ReactNode } from "react";

interface AdminPageProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminPage({
  eyebrow = "StyleKit Admin",
  title,
  description,
  actions,
  children,
}: AdminPageProps) {
  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 border-b border-[var(--admin-border-soft)] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            {description}
          </p>
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions}
          </div>
        ) : null}
      </header>
      {children}
    </div>
  );
}
