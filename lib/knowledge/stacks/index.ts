// Knowledge Base - Stack Guidelines Index
// Re-exports all stack guidelines and provides unified search

import type { StackGuideline, StackId, StackInfo } from "./types";
import { BM25 } from "../search";

// Import all stack guidelines
import { nextjsGuidelines } from "./nextjs";
import { reactStackGuidelines } from "./react";
import { vueGuidelines } from "./vue";
import { astroGuidelines } from "./astro";
import { shadcnGuidelines } from "./shadcn";
import { htmlTailwindGuidelines } from "./html-tailwind";

// Re-export types
export type { StackGuideline, StackId, StackInfo };

// Stack registry with metadata
export const stacks: Record<StackId, StackInfo> = {
  nextjs: {
    id: "nextjs",
    name: "Next.js",
    description: "React framework with SSR, routing, and optimizations",
    category: "web",
    guidelines: nextjsGuidelines,
  },
  react: {
    id: "react",
    name: "React",
    description: "JavaScript library for building user interfaces",
    category: "web",
    guidelines: reactStackGuidelines,
  },
  vue: {
    id: "vue",
    name: "Vue.js",
    description: "Progressive JavaScript framework",
    category: "web",
    guidelines: vueGuidelines,
  },
  nuxtjs: {
    id: "nuxtjs",
    name: "Nuxt.js",
    description: "Vue.js framework with SSR and file-based routing",
    category: "web",
    guidelines: [], // Will be populated dynamically
  },
  "nuxt-ui": {
    id: "nuxt-ui",
    name: "Nuxt UI",
    description: "UI library for Nuxt with Tailwind CSS",
    category: "web",
    guidelines: [], // Will be populated dynamically
  },
  svelte: {
    id: "svelte",
    name: "Svelte",
    description: "Compile-time reactive framework",
    category: "web",
    guidelines: [], // Will be populated dynamically
  },
  astro: {
    id: "astro",
    name: "Astro",
    description: "Static site builder with Islands Architecture",
    category: "web",
    guidelines: astroGuidelines,
  },
  shadcn: {
    id: "shadcn",
    name: "shadcn/ui",
    description: "Re-usable components built with Radix and Tailwind",
    category: "web",
    guidelines: shadcnGuidelines,
  },
  flutter: {
    id: "flutter",
    name: "Flutter",
    description: "Cross-platform UI toolkit from Google",
    category: "cross-platform",
    guidelines: [], // Will be populated dynamically
  },
  "react-native": {
    id: "react-native",
    name: "React Native",
    description: "Build native mobile apps with React",
    category: "mobile",
    guidelines: [], // Will be populated dynamically
  },
  swiftui: {
    id: "swiftui",
    name: "SwiftUI",
    description: "Apple's declarative UI framework",
    category: "mobile",
    guidelines: [], // Will be populated dynamically
  },
  "jetpack-compose": {
    id: "jetpack-compose",
    name: "Jetpack Compose",
    description: "Android's modern UI toolkit",
    category: "mobile",
    guidelines: [], // Will be populated dynamically
  },
  "html-tailwind": {
    id: "html-tailwind",
    name: "HTML + Tailwind",
    description: "Vanilla HTML with Tailwind CSS",
    category: "web",
    guidelines: htmlTailwindGuidelines,
  },
};

// Dynamically import and register additional stacks
async function loadAdditionalStacks() {
  try {
    const [svelte, nuxtjs, nuxtUi, flutter, reactNative, swiftui, jetpackCompose] = await Promise.allSettled([
      import("./svelte").then(m => m.svelteGuidelines),
      import("./nuxtjs").then(m => m.nuxtjsGuidelines),
      import("./nuxt-ui").then(m => m.nuxtUiGuidelines),
      import("./flutter").then(m => m.flutterGuidelines),
      import("./react-native").then(m => m.reactNativeGuidelines),
      import("./swiftui").then(m => m.swiftUIGuidelines),
      import("./jetpack-compose").then(m => m.jetpackComposeGuidelines),
    ]);

    if (svelte.status === "fulfilled") stacks.svelte.guidelines = svelte.value;
    if (nuxtjs.status === "fulfilled") stacks.nuxtjs.guidelines = nuxtjs.value;
    if (nuxtUi.status === "fulfilled") stacks["nuxt-ui"].guidelines = nuxtUi.value;
    if (flutter.status === "fulfilled") stacks.flutter.guidelines = flutter.value;
    if (reactNative.status === "fulfilled") stacks["react-native"].guidelines = reactNative.value;
    if (swiftui.status === "fulfilled") stacks.swiftui.guidelines = swiftui.value;
    if (jetpackCompose.status === "fulfilled") stacks["jetpack-compose"].guidelines = jetpackCompose.value;
  } catch {
    // Silently fail if modules not found
  }
}

// Initialize on module load
loadAdditionalStacks();

// Pre-built BM25 index (lazy initialized)
let stackSearchIndex: BM25<{ guideline: StackGuideline; stackId: StackId }> | null = null;

function getStackSearchIndex(): BM25<{ guideline: StackGuideline; stackId: StackId }> {
  if (!stackSearchIndex) {
    const allGuidelines: { guideline: StackGuideline; stackId: StackId }[] = [];

    for (const [id, stack] of Object.entries(stacks)) {
      for (const guideline of stack.guidelines) {
        allGuidelines.push({ guideline, stackId: id as StackId });
      }
    }

    stackSearchIndex = new BM25(
      allGuidelines,
      (item) =>
        `${item.guideline.category} ${item.guideline.guideline} ${item.guideline.description} ${item.guideline.do}`
    );
  }
  return stackSearchIndex;
}

/**
 * Get all available stack IDs
 */
export function getStackIds(): StackId[] {
  return Object.keys(stacks) as StackId[];
}

/**
 * Get stack info by ID
 */
export function getStack(stackId: StackId): StackInfo | undefined {
  return stacks[stackId];
}

/**
 * Get guidelines for a specific stack
 */
export function getStackGuidelines(stackId: StackId): StackGuideline[] {
  return stacks[stackId]?.guidelines || [];
}

/**
 * Search stack guidelines across all stacks
 */
export function searchAllStackGuidelines(
  query: string,
  maxResults = 5
): Array<{ guideline: StackGuideline; stackId: StackId }> {
  return getStackSearchIndex().search(query, maxResults);
}

/**
 * Search guidelines within a specific stack
 */
export function searchStackGuidelines(
  stackId: StackId,
  query: string,
  maxResults = 5
): StackGuideline[] {
  const guidelines = getStackGuidelines(stackId);
  if (guidelines.length === 0) return [];

  const index = new BM25(
    guidelines,
    (g) => `${g.category} ${g.guideline} ${g.description} ${g.do}`
  );

  return index.search(query, maxResults);
}

/**
 * Get guidelines by category within a stack
 */
export function getGuidelinesByCategory(
  stackId: StackId,
  category: string
): StackGuideline[] {
  const guidelines = getStackGuidelines(stackId);
  const categoryLower = category.toLowerCase();
  return guidelines.filter(
    (g) => g.category.toLowerCase() === categoryLower
  );
}

/**
 * Get critical guidelines for a stack
 */
export function getCriticalGuidelines(stackId: StackId): StackGuideline[] {
  const guidelines = getStackGuidelines(stackId);
  return guidelines.filter((g) => g.severity === "Critical");
}

/**
 * Get all stacks by category
 */
export function getStacksByCategory(
  category: "web" | "mobile" | "cross-platform"
): StackInfo[] {
  return Object.values(stacks).filter((s) => s.category === category);
}
