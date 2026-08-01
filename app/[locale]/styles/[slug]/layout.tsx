import type { ReactNode } from "react";
import "@/app/styles/[slug]/snippet-utilities.css";

/**
 * Locale-tree mount of the scoped snippet utility sheet — the /[locale]
 * style detail routes render the same shared content as app/styles/[slug]
 * and need the same CSS (see snippet-utilities.css).
 */
export default function LocaleStyleDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
