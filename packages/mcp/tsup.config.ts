import { defineConfig } from "tsup";

// Bundle stylekit-core into the published artifact so the server is fully
// self-contained (no workspace:* dependency, no publish-order requirement).
// @modelcontextprotocol/server, @modelcontextprotocol/node and zod stay external.
export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["esm"],
  target: "node20",
  platform: "node",
  noExternal: [/^stylekit-core/],
  clean: true,
});
