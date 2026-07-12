import type { ReactNode } from "react";

interface AdminPageProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminPage({
  eyebrow = "StyleKit 管理后台",
  title,
  description,
  actions,
  children,
}: AdminPageProps) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 pb-2 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium tracking-[-0.02em] text-muted">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-[32px] font-semibold leading-10 tracking-[-0.64px] text-foreground">
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
