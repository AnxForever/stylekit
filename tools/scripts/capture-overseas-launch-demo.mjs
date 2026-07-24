#!/usr/bin/env node

import { copyFile, mkdir, rm, stat } from "node:fs/promises";
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

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3004";
const OUTPUT_ROOT = path.join(process.cwd(), "public", "launch", "overseas");
const OUTPUT_FILE = path.join(OUTPUT_ROOT, "stylekit-overseas-demo.webm");

async function hideLocalDevTools(page) {
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
}

async function goto(page, route) {
  const response = await page.goto(`${BASE_URL}${route}`, {
    waitUntil: "domcontentloaded",
    timeout: 90_000,
  });
  if (response && !response.ok()) {
    throw new Error(`${route} returned ${response.status()}`);
  }
  await page.evaluate(() => document.fonts.ready);
  await hideLocalDevTools(page);
}

async function smoothScrollTo(page, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
}

async function main() {
  await mkdir(OUTPUT_ROOT, { recursive: true });
  await rm(OUTPUT_FILE, { force: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-proxy-server"],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
    colorScheme: "light",
    recordVideo: {
      dir: OUTPUT_ROOT,
      size: { width: 1280, height: 720 },
    },
  });
  const page = await context.newPage();

  try {
    await goto(page, "/en/styles");
    await page.getByRole("heading", { name: "Style Catalog" }).waitFor();
    await page.waitForTimeout(1600);

    const search = page.getByPlaceholder("Search styles by name, keyword, or use case");
    await search.click();
    await search.fill("glassmorphism");
    await page.waitForTimeout(1400);

    await goto(page, "/en/styles/glassmorphism");
    await page
      .getByRole("heading", { name: "Glassmorphism", level: 1, exact: true })
      .waitFor();
    await page.waitForTimeout(1500);

    await smoothScrollTo(page, "#style-prompts");
    await page.waitForTimeout(2400);

    await goto(page, "/en/developers");
    await page.getByRole("heading", { name: "Use StyleKit in your workflow" }).waitFor();
    await page.waitForTimeout(2600);
  } finally {
    const video = page.video();
    await context.close();
    await browser.close();
    if (!video) {
      throw new Error("Playwright did not produce a video artifact.");
    }
    const temporaryVideoPath = await video.path();
    await copyFile(temporaryVideoPath, OUTPUT_FILE);
    await rm(temporaryVideoPath, { force: true });
  }

  const outputStats = await stat(OUTPUT_FILE);
  console.log(
    `[capture:overseas-demo] /launch/overseas/stylekit-overseas-demo.webm ` +
      `(${Math.round(outputStats.size / 1024)} KiB)`,
  );
}

await main();
