"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

// ---------------------------------------------------------------------------
// Variant styles (back button matching each template's design)
// ---------------------------------------------------------------------------

export type TemplateBackButtonVariant =
  | "default"
  | "brutal"
  | "glass"
  | "editorial"
  | "neumorphic"
  | "minimalist"
  | "warm"
  | "dark"
  | "modern"
  | "social"
  | "recipe"
  | "fitness";

const variantStyles: Record<TemplateBackButtonVariant, string> = {
  default:
    "bg-black/90 text-white text-sm font-medium rounded-lg shadow-lg backdrop-blur-sm hover:bg-black dark:bg-white/90 dark:text-black dark:hover:bg-white",
  brutal:
    "bg-[#ccff00] text-black text-sm font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]",
  glass:
    "bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20",
  editorial:
    "text-zinc-500 hover:text-zinc-900 text-xs font-serif tracking-widest uppercase border-b border-zinc-300 hover:border-zinc-600 rounded-none pb-0.5",
  neumorphic:
    "bg-[#e0e5ec] text-gray-700 text-sm font-medium rounded-xl shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]",
  minimalist:
    "bg-white text-black text-sm font-bold border-2 border-black hover:bg-black hover:text-white",
  warm:
    "bg-[#4a9d9a] text-white text-sm font-medium rounded-xl shadow-lg shadow-[#4a9d9a]/25 hover:bg-[#3d8785]",
  dark:
    "bg-zinc-800 text-zinc-200 text-sm font-medium rounded-lg border border-zinc-700 hover:bg-zinc-700 hover:text-white",
  modern:
    "bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]",
  social:
    "bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 shadow-md",
  recipe:
    "bg-gradient-to-r from-orange-400 to-rose-500 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-[1.02]",
  fitness:
    "bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02]",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface TemplateBackButtonProps {
  variant?: TemplateBackButtonVariant;
}

export function TemplateBackButton({
  variant = "default",
}: TemplateBackButtonProps) {
  const { t } = useI18n();
  const router = useRouter();
  const style = variantStyles[variant];

  return (
    <button
      type="button"
      onClick={() => router.push("/templates")}
      className={`fixed top-3 right-4 z-[9999] inline-flex items-center gap-2 px-4 py-2.5 transition-all duration-200 ${style}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">{t("templates.backToList")}</span>
    </button>
  );
}
