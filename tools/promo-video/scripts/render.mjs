/**
 * Final render.
 *   node scripts/render.mjs          -> out/stylekit-promo.mp4
 *   node scripts/render.mjs --webm   -> also emit a webm
 *
 * Programmatic bundling does not read remotion.config.ts, so the aliases the
 * app components need are declared here as well.
 */
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { mkdirSync, renameSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../../..");
const FV = path.resolve(import.meta.dirname, "..");
const withWebm = process.argv.includes("--webm");

mkdirSync("out", { recursive: true });
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.tsx"),
  rootDir: ROOT,
  publicDir: path.join(FV, "public"),
  webpackOverride: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = { ...(config.resolve.alias || {}), "@": ROOT, "next/link": path.join(FV, "src/shims/next-link.tsx"), "next/navigation": path.join(FV, "src/shims/next-navigation.ts") };
    config.module.rules.unshift({ test: /\.(ts|tsx)$/, exclude: /node_modules/, use: [{ loader: path.join(FV, "node_modules/esbuild-loader/dist/index.cjs"), options: { loader: "tsx", target: "es2020" } }] });
    return config;
  },
});
// Never write straight onto the deliverable: a stray reader (ffprobe, a player,
// an antivirus scan) can hold the target file open and make the final rename
// fail with EPERM. Render to a temp name, then swap in.
// A previously opened copy of a fixed filename can stay locked by a viewer
// (a browser tab or a player), which makes the final swap fail on Windows.
// Stamping the name guarantees every build produces a fresh deliverable.
const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
const TARGET = process.env.OUT_FILE || `out/stylekit-promo-${stamp}.mp4`;
const STAGED = `out/.staging-${stamp}.mp4`;

const composition = await selectComposition({ serveUrl, id: "StyleKitPromo", inputProps: {} });
console.log(`rendering ${composition.durationInFrames} frames @ ${composition.fps}fps`);

await renderMedia({
  serveUrl,
  composition,
  codec: "h264",
  outputLocation: STAGED,
  crf: 18,
  x264Preset: "slow",
  pixelFormat: "yuv420p",
  concurrency: 6,
  onProgress: ({ progress }) => process.stdout.write(`\r${(progress * 100).toFixed(1)}%`),
});
// Retry the swap briefly: on Windows a just-closed handle can linger.
(async () => {
  for (let i = 0; i < 10; i++) {
    try { renameSync(STAGED, TARGET); return; } catch { await new Promise((r) => setTimeout(r, 400)); }
  }
  throw new Error(`could not move ${STAGED} into place - is another process reading ${TARGET}?`);
})();
console.log("\nmp4 done");

if (withWebm) {
  await renderMedia({
    serveUrl, composition, codec: "vp8",
    outputLocation: "out/stylekit-promo.webm",
    pixelFormat: "yuv420p", concurrency: 6,
    onProgress: ({ progress }) => process.stdout.write(`\rwebm ${(progress * 100).toFixed(1)}%`),
  });
  console.log("\nwebm done");
}