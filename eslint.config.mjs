import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16.3.1 pulls eslint-plugin-react-hooks 7.1, whose
// recommended set now reports these rules as errors. They flag roughly two
// dozen pre-existing sites across the app -- effects that call setState
// synchronously, a ref read during render in the admin submissions page, and a
// component the React Compiler could not optimize -- none of them touched by
// this change. Adopt them incrementally: keep the findings visible as warnings
// and fix them in a dedicated pass instead of blocking every unrelated change
// on a repo-wide refactor.
// TODO: remove this list once those sites are refactored.
const ADOPT_AS_WARN = [
  "react-hooks/set-state-in-effect",
  "react-hooks/preserve-manual-memoization",
  "react-hooks/refs",
];

const nextVitalsWithReactHooksAdoption = nextVitals.map((entry) => {
  const rules = entry.rules ?? {};
  const adopted = Object.fromEntries(
    ADOPT_AS_WARN.filter((rule) => rule in rules).map((rule) => [rule, "warn"]),
  );

  return Object.keys(adopted).length > 0
    ? { ...entry, rules: { ...rules, ...adopted } }
    : entry;
});

const eslintConfig = defineConfig([
  ...nextVitalsWithReactHooksAdoption,
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
