#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3187";
const REVIEW_PATH = "/admin/visual-lab/corporate-clean-saas";
const OUTPUT_ROOT = path.join(
  process.cwd(),
  "public",
  "experience-packs",
  "corporate-clean-saas",
);
const EVIDENCE_ROOT = path.join(OUTPUT_ROOT, "evidence");
const PROVENANCE_ROOT = path.join(OUTPUT_ROOT, "provenance");

const captures = [
  {
    id: "workspace-desktop-light-overview",
    fileName: "workspace-desktop-light-overview.webp",
    viewport: { width: 1600, height: 1200 },
    theme: "浅色",
    themeValue: "light",
    state: "概览",
    description: "Corporate Clean SaaS workspace in the light overview state at a desktop viewport.",
  },
  {
    id: "workspace-mobile-dark-success",
    fileName: "workspace-mobile-dark-success.webp",
    viewport: { width: 430, height: 932 },
    theme: "深色",
    themeValue: "dark",
    state: "成功",
    description: "Corporate Clean SaaS workspace in the dark success state at a mobile viewport.",
  },
];

function sha256(buffer) {
  return `sha256:${createHash("sha256").update(buffer).digest("hex")}`;
}

async function activateControl(page, button, label) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await button.click();
    await page.waitForTimeout(150);
    if (await button.getAttribute("aria-pressed") === "true") return;
  }
  throw new Error(`Could not activate hydrated control: ${label}`);
}

async function captureEvidence(browser, capture) {
  const context = await browser.newContext({
    viewport: capture.viewport,
    colorScheme: "light",
    reducedMotion: "reduce",
    locale: "zh-CN",
  });
  const page = await context.newPage();
  const response = await page.goto(`${BASE_URL}${REVIEW_PATH}`, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });
  if (!response?.ok()) {
    throw new Error(`Review page returned ${response?.status() ?? "no response"}`);
  }

  await page.getByRole("heading", { name: "Corporate Clean SaaS", level: 1 }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  const themeGroup = page.getByRole("group", { name: "选择界面主题" });
  const stateGroup = page.getByRole("group", { name: "选择界面状态" });
  const appShell = page.locator('[data-pack-evidence="corporate-clean-saas"]');
  await activateControl(
    page,
    themeGroup.getByRole("button", { name: capture.theme, exact: true }),
    capture.theme,
  );
  await activateControl(
    page,
    stateGroup.getByRole("button", { name: capture.state, exact: true }),
    capture.state,
  );
  if (await appShell.getAttribute("data-theme") !== capture.themeValue) {
    throw new Error(`Theme state mismatch for ${capture.id}`);
  }
  if (capture.state === "成功") {
    await page.getByRole("status").filter({ hasText: "报告已生成" }).waitFor();
  } else {
    await page.getByRole("region", { name: "关键经营指标" }).waitFor();
  }

  await appShell.scrollIntoViewIfNeeded();
  await appShell.waitFor({ state: "visible" });
  await appShell.evaluate((target) => {
    for (const element of document.body.querySelectorAll("*")) {
      if (
        element instanceof HTMLElement &&
        !element.contains(target) &&
        !target.contains(element)
      ) {
        element.style.setProperty("visibility", "hidden", "important");
      }
    }
  });

  await mkdir(EVIDENCE_ROOT, { recursive: true });
  await mkdir(PROVENANCE_ROOT, { recursive: true });
  const temporaryPng = path.join(EVIDENCE_ROOT, `${capture.id}.capture.png`);
  const outputPath = path.join(EVIDENCE_ROOT, capture.fileName);
  await appShell.screenshot({
    path: temporaryPng,
    type: "png",
    animations: "disabled",
  });

  const buffer = await sharp(temporaryPng)
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toBuffer();
  const metadata = await sharp(buffer).metadata();
  await writeFile(outputPath, buffer);
  await rm(temporaryPng, { force: true });

  const publicAssetPath = `/experience-packs/corporate-clean-saas/evidence/${capture.fileName}`;
  const provenance = {
    schemaVersion: 1,
    assetId: capture.id,
    assetPath: publicAssetPath,
    originType: "owned",
    provider: "StyleKit deterministic browser capture",
    creator: "StyleKit",
    sourceRoute: REVIEW_PATH,
    sourceFiles: [
      "experience-packs/corporate-clean-saas/files/components/corporate-clean/corporate-clean-saas.tsx",
      "experience-packs/corporate-clean-saas/files/components/corporate-clean/corporate-clean.module.css",
      "experience-packs/corporate-clean-saas/files/lib/corporate-clean/data.ts",
    ],
    capturedAt: new Date().toISOString(),
    viewport: capture.viewport,
    theme: capture.theme,
    state: capture.state,
    reducedMotion: true,
    description: capture.description,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    bytes: buffer.length,
    contentHash: sha256(buffer),
    thirdPartyInputs: [],
    trademarkReview: true,
    likenessReview: true,
    customerDataReview: true,
    purpose: "pack-marketing-evidence",
    distributable: false,
    auditStatus: "pending",
    notes: "Generated from the same self-contained source delivered by the internal registry preview; no stock photography or external product screenshot is used.",
  };
  const provenancePath = path.join(PROVENANCE_ROOT, `${capture.id}.json`);
  await writeFile(provenancePath, `${JSON.stringify(provenance, null, 2)}\n`);

  await context.close();
  return provenance;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    const evidence = [];
    for (const capture of captures) {
      evidence.push(await captureEvidence(browser, capture));
    }
    for (const item of evidence) {
      console.log(
        `[capture:corporate-clean] ${item.assetPath} — ${item.width}x${item.height}, ` +
        `${Math.round(item.bytes / 1024)} KiB, ${item.contentHash}`,
      );
    }
  } finally {
    await browser.close();
  }
}

await main();
