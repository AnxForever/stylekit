#!/usr/bin/env node

import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";

const existingNoProxy = process.env.NO_PROXY || process.env.no_proxy || "";
const noProxyHosts = new Set(
  existingNoProxy
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean),
);
for (const host of ["127.0.0.1", "localhost"]) {
  noProxyHosts.add(host);
}
process.env.NO_PROXY = [...noProxyHosts].join(",");
process.env.no_proxy = process.env.NO_PROXY;

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3002";
const OUTPUT_ROOT = path.join(process.cwd(), "public", "launch", "overseas");

const captures = [
  {
    id: "home",
    path: "/en",
    fileName: "home-en.png",
    viewport: { width: 1600, height: 1200 },
    waitMs: 2200,
  },
  {
    id: "styles",
    path: "/en/styles",
    fileName: "styles-en.png",
    viewport: { width: 1600, height: 1400 },
    waitMs: 2200,
  },
  {
    id: "style-detail-glassmorphism",
    path: "/en/styles/glassmorphism",
    fileName: "style-detail-glassmorphism-en.png",
    viewport: { width: 1600, height: 1600 },
    waitMs: 3200,
    waitForSelector: 'iframe[title="Glassmorphism Showcase Preview"]',
  },
  {
    id: "style-ai-glassmorphism",
    path: "/en/styles/glassmorphism",
    fileName: "style-ai-glassmorphism-en.png",
    viewport: { width: 1600, height: 1200 },
    waitMs: 1200,
    scrollToSelector: "#style-prompts",
  },
  {
    id: "developers",
    path: "/en/developers",
    fileName: "developers-en.png",
    viewport: { width: 1600, height: 1200 },
    waitMs: 2200,
  },
];

const requestedIds = new Set(
  (process.env.CAPTURE_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean),
);
const selectedCaptures =
  requestedIds.size > 0
    ? captures.filter((capture) => requestedIds.has(capture.id))
    : captures;

async function capturePage(browser, capture) {
  const context = await browser.newContext({
    viewport: capture.viewport,
    locale: "en-US",
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  const response = await page.goto(`${BASE_URL}${capture.path}`, {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });
  if (!response?.ok()) {
    throw new Error(
      `${capture.id} returned ${response?.status() ?? "no response"} at ${capture.path}`,
    );
  }

  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: `
      nextjs-portal,
      [data-nextjs-dialog],
      [data-nextjs-dialog-overlay],
      [data-nextjs-toast],
      [data-nextjs-dev-tools-button],
      [data-nextjs-dev-tools-indicator],
      [aria-label="Next.js Dev Tools"],
      [aria-label="Open Next.js Dev Tools"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `,
  });
  await page.evaluate(() => {
    for (const element of document.body.querySelectorAll("*")) {
      if (!(element instanceof HTMLElement)) continue;
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const nearBottomLeft =
        rect.left < 120 &&
        window.innerHeight - rect.bottom < 120 &&
        rect.width <= 160 &&
        rect.height <= 80;
      if (style.position === "fixed" && nearBottomLeft) {
        element.style.setProperty("display", "none", "important");
        element.style.setProperty("visibility", "hidden", "important");
      }
    }
  });
  if (capture.waitForSelector) {
    await page
      .locator(capture.waitForSelector)
      .waitFor({ state: "visible", timeout: 15_000 })
      .catch(() => {});
  }
  if (capture.scrollToSelector) {
    await page.locator(capture.scrollToSelector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(capture.waitMs ?? 2000);
  if (!capture.scrollToSelector) {
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  await page.screenshot({
    path: path.join(OUTPUT_ROOT, capture.fileName),
    animations: "disabled",
    fullPage: false,
  });

  await context.close();

  const outputPath = path.join(OUTPUT_ROOT, capture.fileName);
  const outputStats = await stat(outputPath);
  return {
    id: capture.id,
    path: capture.path,
    fileName: capture.fileName,
    width: capture.viewport.width,
    height: capture.viewport.height,
    bytes: outputStats.size,
  };
}

async function main() {
  await mkdir(OUTPUT_ROOT, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-proxy-server"],
  });
  try {
    const results = [];
    for (const capture of selectedCaptures) {
      results.push(await capturePage(browser, capture));
    }

    for (const result of results) {
      console.log(
        `[capture:overseas-launch] ${result.fileName} <= ${result.path} ` +
          `(${result.width}x${result.height}, ${Math.round(result.bytes / 1024)} KiB)`,
      );
    }
  } finally {
    await browser.close();
  }
}

await main();
