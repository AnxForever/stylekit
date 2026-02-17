"use client";

import { useI18n } from "@/lib/i18n/context";
import {
  Layout,
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Image as ImageIcon,
  FormInput,
  Lock,
} from "lucide-react";
import type { ArchetypeCategory } from "@/lib/archetypes/types";

interface TemplateSelectorProps {
  templates: Array<{
    id: string;
    name: string;
    nameZh: string;
    category: ArchetypeCategory;
    description: string;
  }>;
  value: string;
  onChange: (templateId: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  landing: <Layout className="w-5 h-5" />,
  dashboard: <LayoutDashboard className="w-5 h-5" />,
  blog: <FileText className="w-5 h-5" />,
  ecommerce: <ShoppingCart className="w-5 h-5" />,
  portfolio: <ImageIcon className="w-5 h-5" />,
  form: <FormInput className="w-5 h-5" />,
  auth: <Lock className="w-5 h-5" />,
};

export function TemplateSelector({ templates, value, onChange }: TemplateSelectorProps) {
  const { locale } = useI18n();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-2 max-h-64 overflow-y-auto">
      {templates.map((tmpl) => {
        const isActive = tmpl.id === value;
        const label = locale === "zh" ? tmpl.nameZh : tmpl.name;
        const icon = categoryIcons[tmpl.category] || <Layout className="w-5 h-5" />;

        return (
          <button
            key={tmpl.id}
            onClick={() => onChange(tmpl.id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-md border text-xs transition-colors ${
              isActive
                ? "border-foreground bg-foreground/5"
                : "border-border hover:border-foreground/30 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            <span className={isActive ? "text-foreground" : "text-muted"}>
              {icon}
            </span>
            <span className="truncate w-full text-center">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
