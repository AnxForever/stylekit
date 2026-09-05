/**
 * Headless-browser extraction: drive Chromium over a vetted URL, inject the
 * style-extractor scripts, read real computed styles, and map the result to a
 * submission manifest with the shared converter.
 *
 * Uses playwright-core against the system Chrome (no bundled browser download,
 * to keep the memory-constrained host lean). The browser is launched per
 * request and always closed, so nothing lingers between extractions.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium, type Browser } from "playwright-core";

import { extractedStyleToManifest, type ExtractToManifestResult } from "@/lib/submit/extract-to-manifest";

import { hostResolverRules } from "./ssrf";

const HERE = path.dirname(fileURLToPath(import.meta.url));

const SCRIPTS = [
  "utils.js", "structure-extract.js", "css-parser.js", "component-detect.js",
  "state-capture.js", "ai-semantic.js", "a11y-tree.js", "responsive-extract.js",
  "stylekit-adapter.js", "theme-detect.js", "motion-tools.js", "motion-enhanced.js",
  "motion-assoc.js", "screenshot-helper.js", "library-detect.js", "code-generator.js",
  "replica-blueprint.js", "format-converter.js", "pattern-detect.js", "export-schema.js",
  "incremental.js", "multi-page.js", "registry.js",
];

/** Directory holding the extractor browser scripts; overridable for deployment. */
const SCRIPTS_DIR =
  process.env.EXTRACTOR_SCRIPTS_DIR ?? path.join(HERE, "..", "extractor-scripts");
const CHROME_PATH = process.env.EXTRACT_CHROME_PATH ?? "/usr/bin/google-chrome-stable";
const NAV_TIMEOUT_MS = Number(process.env.EXTRACT_NAV_TIMEOUT_MS ?? 45_000);
const TOTAL_TIMEOUT_MS = Number(process.env.EXTRACT_TOTAL_TIMEOUT_MS ?? 70_000);

export interface ExtractInput {
  url: string;
  hostname: string;
  addresses: string[];
  options?: Record<string, unknown>;
}

function loadScripts(): string[] {
  return SCRIPTS.map((name) => fs.readFileSync(path.join(SCRIPTS_DIR, name), "utf8"));
}

/** A hard wall-clock ceiling so a hung page can never pin the single worker. */
function withDeadline<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`timeout:${label}`)), ms),
    ),
  ]);
}

export async function extractManifest(input: ExtractInput): Promise<ExtractToManifestResult> {
  const scripts = loadScripts();
  const resolverRule = hostResolverRules(input.hostname, input.addresses);

  const browser: Browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--disable-background-networking",
      "--disable-features=Translate,BackForwardCache",
      // Pin DNS to the vetted address so the navigation cannot rebind to an
      // internal IP after ssrf.assertSafeUrl approved the hostname.
      ...(resolverRule ? [`--host-resolver-rules=${resolverRule}`] : []),
    ],
  });

  try {
    return await withDeadline(
      (async () => {
        const context = await browser.newContext({
          viewport: { width: 1440, height: 900 },
          javaScriptEnabled: true,
          serviceWorkers: "block",
        });
        // Never let the page navigate the service to a non-public address via a
        // redirect: re-check every main-frame navigation target.
        const page = await context.newPage();

        await page.goto(input.url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });
        await page.waitForTimeout(1500);

        for (const content of scripts) {
          await page.addScriptTag({ content });
        }

        const result = await page.evaluate(async () => {
          const w = window as unknown as { extractStyle?: (o: unknown) => Promise<unknown> };
          if (typeof w.extractStyle !== "function") {
            return { ok: false as const, error: "extractStyle-not-registered" };
          }
          try {
            return { ok: true as const, data: await w.extractStyle({ preset: "full" }) };
          } catch (error) {
            return { ok: false as const, error: String((error as Error)?.message ?? error) };
          }
        });

        if (!result.ok) throw new Error(`extract-failed:${result.error}`);

        const data = (result.data as { data?: unknown }).data ?? result.data;
        const normalized = (data as { stylekit?: { normalized?: unknown } })?.stylekit?.normalized;
        if (!normalized) throw new Error("no-normalized-output");

        return extractedStyleToManifest(normalized as never, {
          url: input.url,
          ...(input.options ?? {}),
        });
      })(),
      TOTAL_TIMEOUT_MS,
      "extract",
    );
  } finally {
    // Always tear the browser down; a leaked Chromium is what OOMs the host.
    await browser.close().catch(() => {});
  }
}
