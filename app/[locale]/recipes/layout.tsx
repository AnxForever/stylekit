import type { ReactNode } from "react";
import "@/app/recipes/recipe-utilities.css";

/**
 * Locale-tree mount of the scoped recipe utility sheet — the /[locale]
 * recipe routes render the same shared content as app/recipes and need
 * the same CSS (see recipe-utilities.css).
 */
export default function LocaleRecipesLayout({ children }: { children: ReactNode }) {
  return children;
}
