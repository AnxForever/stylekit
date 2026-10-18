/**
 * Frame assertions.
 *
 * Sampling a few stills by eye is how black frames and mis-timed shots get into
 * a finished film. Instead, every act declares what must be true at a moment
 * inside it, and this script renders that frame and checks the pixels: not
 * blank, not flat, and inside the brightness range the shot needs.
 *
 * A shot that silently renders black - the failure this project hit twice -
 * cannot pass.
 *
 * Usage: node scripts/verify-frames.mjs
 */
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "../../..");
const FV = path.resolve(import.meta.dirname, "..");
const TMP = path.join(FV, "out/verify");
const BAR = 120;

const CHECKS = [
  { act: "open", at: 2, expect: "dark", label: "open / mark lit" },
  { act: "slop", at: 5, expect: "mid", label: "slop / wall" },
  { act: "turn", at: 3, expect: "dark", label: "turn / argument" },
  { act: "reveal", at: 0.033, expect: "flash", label: "reveal / flash" },
  { act: "reveal", at: 1.2, expect: "dark", label: "reveal / shards out" },
  { act: "reveal", at: 5.5, expect: "dark", label: "reveal / wordmark" },
  { act: "styles", at: 3, expect: "any", label: "style 1 editorial" },
  { act: "styles", at: 9, expect: "any", label: "style 2 brutalist" },
  { act: "styles", at: 15, expect: "any", label: "style 3 art deco" },
  { act: "styles", at: 21, expect: "any", label: "style 4 ukiyo-e" },
  { act: "styles", at: 27, expect: "any", label: "style 5 glass" },
  { act: "styles", at: 32, expect: "any", label: "style 6 swiss" },
  { act: "prompts", at: 2, expect: "bright", label: "prompts / library" },
  { act: "prompts", at: 7, expect: "dark", label: "prompts / anatomy" },
  { act: "prompts", at: 12, expect: "dark", label: "prompts / real file" },
  { act: "access", at: 5, expect: "dark", label: "access / commands" },
  { act: "access", at: 9, expect: "bright", label: "access / dev page" },
  { act: "features", at: 2, expect: "bright", label: "features / templates" },
  { act: "features", at: 5, expect: "bright", label: "features / motion" },
  { act: "features", at: 8, expect: "bright", label: "features / patterns" },
  { act: "features", at: 11, expect: "dark", label: "features / exports" },
  { act: "close", at: 2, expect: "bright", label: "close / paper" },
];

const ACT_START = { open: 0, slop: 4, turn: 12, reveal: 19, styles: 25, prompts: 55, access: 69, features: 81, close: 93 };
const RANGES = {
  // The reveal sits on a near-black stage with bright type and colour shards, so
  // its mean is low while its structure is high: judge it on std, not brightness.
  dark: { mean: [2, 110], stdMin: 6 },
  mid: { mean: [18, 235], stdMin: 6 },
  bright: { mean: [110, 252], stdMin: 5 },
  any: { mean: [4, 253], stdMin: 2 },
  // A flash frame is intentionally flat and near-white: brightness only.
  flash: { mean: [150, 255], stdMin: 0 },
};

const analyse = (file) => {
  const raw = execFileSync("ffmpeg", ["-v", "error", "-i", file, "-vf", "scale=64:36", "-f", "rawvideo", "-pix_fmt", "gray", "-"], { maxBuffer: 1 << 24 });
  let sum = 0, sumSq = 0;
  for (const v of raw) { sum += v; sumSq += v * v; }
  const mean = sum / raw.length;
  return { mean, std: Math.sqrt(Math.max(0, sumSq / raw.length - mean * mean)) };
};

mkdirSync(TMP, { recursive: true });
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
const composition = await selectComposition({ serveUrl, id: "StyleKitPromo", inputProps: {} });

let failed = 0;
for (const c of CHECKS) {
  const frame = Math.min(Math.round((ACT_START[c.act] + c.at) * BAR), composition.durationInFrames - 1);
  const file = path.join(TMP, `${c.act}-${c.at}.png`);
  await renderStill({ serveUrl, composition, frame, output: file, imageFormat: "png", delayRenderTimeoutInMilliseconds: 120000 });
  const { mean, std } = analyse(file);
  const r = RANGES[c.expect];
  const ok = mean >= r.mean[0] && mean <= r.mean[1] && std >= r.stdMin;
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${c.label.padEnd(22)} f=${String(frame).padStart(5)} mean=${mean.toFixed(1)} std=${std.toFixed(1)} [${c.expect}]`);
}

rmSync(TMP, { recursive: true, force: true });
console.log(`\n${failed === 0 ? "all frames pass" : failed + " frame(s) failed"}`);
process.exit(failed === 0 ? 0 : 1);