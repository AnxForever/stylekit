import type { ReactNode } from "react";
import "./snippet-utilities.css";

/**
 * Loads the scoped utility sheet for live-rendered component snippets
 * on the style detail and showcase routes (see snippet-utilities.css).
 */
export default function StyleDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
