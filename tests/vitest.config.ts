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
    // packages/** are workspace packages with their own lifecycle; their tests
    // import built core dist (gitignored, not built in CI's test job), so the
    // root suite must not reach into them.
    exclude: [
      "**/node_modules/**",
      ".next",
      "tests/e2e",
      ".worktrees/**",
      ".tmp/**",
      "packages/**",
    ],
    testTimeout: 30000,
    hookTimeout: 30000,
    pool: "threads",
    coverage: {
      provider: "v8",
      include: [
        "lib/styles/tokens-registry.ts",
        "lib/styles/token-diff.ts",
        "lib/accessibility/scorer.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": ROOT,
    },
  },
});
