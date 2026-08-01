import type { ReactNode } from "react";
import "./recipe-utilities.css";

/**
 * Loads the scoped utility sheet for live-rendered recipe demos
 * on the recipe routes (see recipe-utilities.css).
 */
export default function RecipesLayout({ children }: { children: ReactNode }) {
  return children;
}
