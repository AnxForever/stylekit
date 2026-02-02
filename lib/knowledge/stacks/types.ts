// Knowledge Base - Stack Guidelines Types
// Shared types for stack-specific coding guidelines

import type { Severity } from "../types";

export interface StackGuideline {
  category: string;
  guideline: string;
  description: string;
  do: string;
  dont: string;
  codeGood: string;
  codeBad: string;
  severity: Severity;
  docsUrl?: string;
}

export type StackId =
  | "nextjs"
  | "react"
  | "vue"
  | "nuxtjs"
  | "nuxt-ui"
  | "svelte"
  | "astro"
  | "shadcn"
  | "flutter"
  | "react-native"
  | "swiftui"
  | "jetpack-compose"
  | "html-tailwind";

export interface StackInfo {
  id: StackId;
  name: string;
  description: string;
  category: "web" | "mobile" | "cross-platform";
  guidelines: StackGuideline[];
}
