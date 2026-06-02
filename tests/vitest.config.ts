import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const ROOT = path.resolve(__dirname, "..");

export default defineConfig({
  plugins: [react()],
  test: {
    root: ROOT,
    environment: "node",
    globals: true,
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", ".next", "tests/e2e", ".worktrees/**"],
    testTimeout: 30000,
    hookTimeout: 30000,
    pool: "threads",
    coverage: {
      provider: "v8",
      include: [
        "lib/styles/tokens-registry.ts",
        "lib/styles/blend-engine.ts",
        "lib/styles/token-diff.ts",
        "lib/linter/index.ts",
        "lib/accessibility/scorer.ts",
        "lib/style-extractor/draft-to-tokens.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": ROOT,
    },
  },
});
