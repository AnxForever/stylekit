#!/usr/bin/env tsx
/**
 * Extract a submission manifest from a live website.
 *
 * Drives a headless Chromium (Playwright) over the target URL, injects the
 * style-extractor browser scripts, reads the real computed styles, and maps the
 * result to a StyleKit submission manifest via `extractedStyleToManifest`. The
 * output is a manifest.json a contributor pastes into /submit (manifest mode),
 * after confirming the fields a machine cannot know (name, category, ...).
 *
 * This is the local/CLI half of the "extract from a URL" feature — the same
 * converter a future extraction service would call. It stays a dev tool: the
 * extractor scripts live in the gitignored `style-extractor-dev/` checkout.
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.json tools/scripts/extract-style-manifest.ts \
 *     --url https://linear.app --out ./manifest.json --name Aurora --category expressive
 *   # WSL / proxied networks:
 *   ... --proxy http://172.20.192.1:7897
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

import {
  extractedStyleToManifest,
  type ExtractToManifestOptions,
} from "@/lib/submit/extract-to-manifest";

const SCRIPTS = [
  "utils.js", "structure-extract.js", "css-parser.js", "component-detect.js",
  "state-capture.js", "ai-semantic.js", "a11y-tree.js", "responsive-extract.js",
  "stylekit-adapter.js", "theme-detect.js", "motion-tools.js", "motion-enhanced.js",
  "motion-assoc.js", "screenshot-helper.js", "library-detect.js", "code-generator.js",
  "replica-blueprint.js", "format-converter.js", "pattern-detect.js", "export-schema.js",
  "incremental.js", "multi-page.js", "registry.js",
];

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  if (i === -1) return undefined;
  const next = process.argv[i + 1];
  return next && !next.startsWith("--") ? next : undefined;
}

function fail(message: string): never {
  process.stderr.write(`\n[extract] ${message}\n`);
  process.exit(1);
}

async function main() {
  const url = arg("--url");
  if (!url) fail("Missing --url. Example: --url https://linear.app");
  try {
    const parsed = new URL(url!);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      fail("--url must be http(s).");
    }
  } catch {
    fail(`--url is not a valid URL: ${url}`);
  }

  const repoRoot = path.resolve(fileURLToPath(import.meta.url), "../../..");
  const extractorDir = arg("--extractor") ?? path.join(repoRoot, "style-extractor-dev");
  const scriptsDir = path.join(extractorDir, "scripts");
  if (!fs.existsSync(scriptsDir)) {
    fail(
      `Extractor scripts not found at ${scriptsDir}.\n` +
        `Clone the style-extractor checkout there, or pass --extractor <dir>.`,
    );
  }

  const proxy = arg("--proxy") ?? process.env.HTTPS_PROXY ?? process.env.HTTP_PROXY;
  const out = arg("--out");

  process.stderr.write(`[extract] launching headless Chromium${proxy ? ` via proxy ${proxy}` : ""}\n`);
  const browser = await chromium.launch({
    headless: true,
    ...(proxy ? { proxy: { server: proxy } } : {}),
  });

  try {
    const page = await browser.newPage();
    process.stderr.write(`[extract] loading ${url}\n`);
    await page.goto(url!, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(1500);

    for (const script of SCRIPTS) {
      await page.addScriptTag({ content: fs.readFileSync(path.join(scriptsDir, script), "utf8") });
    }

    const result = await page.evaluate(async () => {
      const w = window as unknown as { extractStyle?: (o: unknown) => Promise<unknown> };
      if (typeof w.extractStyle !== "function") return { ok: false, error: "extractStyle not registered" };
      try {
        return { ok: true, data: await w.extractStyle({ preset: "full" }) };
      } catch (error) {
        return { ok: false, error: String((error as Error)?.stack ?? error) };
      }
    });

    if (!result || !(result as { ok: boolean }).ok) {
      fail(`Extraction failed in-page: ${(result as { error?: string })?.error ?? "unknown"}`);
    }

    const data = (result as { data: { data?: unknown } }).data;
    const payload = (data as { data?: unknown }).data ?? data;
    const normalized = (payload as { stylekit?: { normalized?: unknown } })?.stylekit?.normalized;
    if (!normalized) fail("No stylekit.normalized in the extraction result.");

    const options: ExtractToManifestOptions = {
      url: url!,
      name: arg("--name"),
      nameEn: arg("--name-en"),
      slug: arg("--slug"),
      description: arg("--description"),
      category: arg("--category") as ExtractToManifestOptions["category"],
      styleType: arg("--style-type") as ExtractToManifestOptions["styleType"],
    };

    const { manifest, needsReview } = extractedStyleToManifest(normalized as never, options);
    const json = JSON.stringify(manifest, null, 2);

    if (out) {
      fs.writeFileSync(out, json + "\n");
      process.stderr.write(`[extract] wrote ${out}\n`);
    } else {
      process.stdout.write(json + "\n");
    }

    if (needsReview.length) {
      process.stderr.write(
        `[extract] review before submitting: ${needsReview.join(", ")}\n` +
          `[extract] a machine cannot judge these from computed styles — confirm or override with flags.\n`,
      );
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => fail(String(error?.stack ?? error)));
