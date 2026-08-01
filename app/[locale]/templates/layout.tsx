import type { ReactNode } from "react";
import "@/app/templates/template-utilities.css";

/**
 * Locale-tree mount of the scoped template utility sheet — the /[locale]
 * template catalog renders shared content from app/templates and needs
 * the same CSS (see template-utilities.css).
 */
export default function LocaleTemplatesLayout({ children }: { children: ReactNode }) {
  return children;
}
