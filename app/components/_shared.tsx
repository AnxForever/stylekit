"use client";

import { PropsTable, componentProps } from "@/components/docs/props-table";
import { ChevronDown, ChevronUp } from "lucide-react";

// Shared PropsToggle component
export function PropsToggle({
  component,
  expanded,
  onToggle,
}: {
  component: string;
  expanded: boolean;
  onToggle: (component: string) => void;
}) {
  return (
    <button
      onClick={() => onToggle(component)}
      className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors mt-4"
    >
      {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      {expanded ? "收起 Props" : "查看 Props"}
    </button>
  );
}

// Shared PropsPanel component
export function PropsPanel({
  component,
  expanded,
  label,
}: {
  component: string;
  expanded: boolean;
  label?: string;
}) {
  if (!expanded || !componentProps[component]) return null;

  return (
    <div className="mt-4">
      {label && (
        <p className="text-xs font-medium text-muted mb-2 uppercase tracking-wider">{label}</p>
      )}
      <PropsTable props={componentProps[component]} className="border border-border rounded-lg" />
    </div>
  );
}

// Section wrapper
export function ComponentSection({
  id,
  title,
  description,
  children,
  noBorder,
}: {
  id?: string;
  title: string;
  description: string;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <section id={id} className={noBorder ? "" : "border-b border-border"}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <h2 className="text-2xl mb-2">{title}</h2>
        <p className="text-sm text-muted mb-6">{description}</p>
        {children}
      </div>
    </section>
  );
}

export { componentProps };
