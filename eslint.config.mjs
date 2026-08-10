import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "**/out/**",
    "build/**",
    "next-env.d.ts",
    // Local scratch/output directories (should never be linted).
    ".tmp/**",
    "tmp/**",
    ".understand-anything/**",
    "coverage/**",
    ".trae/**",
    ".claude/**",
    "skills/**",
    // Dev extraction tool is not part of the Next.js app runtime.
    "style-extractor-dev/**",
    // Utility scripts (node/cjs) are outside the app lint scope.
    "tools/scripts/**/*.cjs",
    // Published package build artifacts.
    "packages/**/dist/**",
    // GitHub Actions scripts (CJS).
    ".github/**",
    // Standalone portfolio demo (Vite app, not part of Next.js).
    "editorial-brutalist-portfolio/**",
    // Auto-generated showcase content files (JSX from recipe code).
    "app/styles/*/showcase/**",
  ]),
]);

export default eslintConfig;
