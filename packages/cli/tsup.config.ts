import { defineConfig } from "tsup";

// Bundle stylekit-core into the published artifact so the CLI is fully
// self-contained (no runtime dependencies beyond Node built-ins).
export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["esm"],
  target: "node18",
  platform: "node",
  noExternal: [/^stylekit-core/],
  clean: true,
});
