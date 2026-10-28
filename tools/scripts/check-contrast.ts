#!/usr/bin/env tsx

/**
 * Gradient-text contrast audit (WCAG 1.4.3).
 *
 * WCAG gives no method for gradient text; the accepted approach is to test where
 * contrast is lowest. Two passes make that exact:
 *
 *  1. DOM pass — find elements whose text is filled by a gradient, and compute a
 *     pessimistic estimate from the surfaces behind them.
 *  2. Pixel pass — for anything the estimate flags, hide only the glyphs, grab the
 *     actual painted backdrop from a screenshot, and compare the text stops
 *     against the real pixel luminance. This removes false positives from
 *     ancestor gradients whose far stops are nowhere near the text.
 *
 * Usage: start a server, then
 *   CONTRAST_BASE_URL=http://localhost:3000 npx tsx tools/scripts/check-contrast.ts
 *
 * Exits 1 when anything fails, so it can gate CI.
 */

import { chromium, type Page } from "@playwright/test";
import sharp from "sharp";

import { getAllStylesMeta } from "../../lib/styles/meta";

interface Candidate {
  index: number;
  text: string;
  fontPx: number;
  need: number;
  estimate: number;
  stops: Array<[number, number, number]>;
  box: { x: number; y: number; width: number; height: number };
}

interface Finding {
  slug: string;
  text: string;
  fontPx: number;
  need: number;
  worst: number;
}

const BASE_URL = process.env.CONTRAST_BASE_URL?.trim() || "http://localhost:3000";
const LOCALE_PREFIX = process.env.CONTRAST_LOCALE === "en" ? "/en" : "";
/** Comma-separated slugs, for iterating on one style without a full sweep. */
const ONLY = (process.env.CONTRAST_ONLY ?? "").split(",").map((slug) => slug.trim()).filter(Boolean);

/** Runs in the page. A string, because tsx injects `__name` into serialized functions. */
const COLLECT_SOURCE = String.raw`(() => {
  const probe = document.createElement("span");
  probe.style.display = "none";
  document.body.appendChild(probe);

  const toRgb = (value) => {
    if (!value || value === "none" || value === "transparent") return null;
    probe.style.color = "";
    probe.style.color = value;
    const match = getComputedStyle(probe).color.match(/rgba?\(([^)]+)\)/);
    if (!match) return null;
    const parts = match[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { rgb: [parts[0], parts[1], parts[2]], alpha: parts.length > 3 ? parts[3] : 1 };
  };
  const stopsOf = (image) => {
    const stops = [];
    const pattern = /(rgba?\([^)]+\)|#[0-9a-f]{3,8}|lab\([^)]+\)|oklab\([^)]+\)|lch\([^)]+\)|oklch\([^)]+\)|color\([^)]+\))/gi;
    for (const match of image.matchAll(pattern)) {
      const colour = toRgb(match[0]);
      if (colour) stops.push(colour);
    }
    return stops;
  };
  const channel = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const luminance = (rgb) => 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
  const ratio = (a, b) => { const x = luminance(a); const y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

  const backdrops = (el) => {
    const layers = [];
    let node = el.parentElement;
    while (node) {
      const style = getComputedStyle(node);
      const background = toRgb(style.backgroundColor);
      if (background && background.alpha > 0.05) layers.push(background.rgb);
      if (style.backgroundImage.includes("gradient")) {
        const stops = stopsOf(style.backgroundImage);
        for (const stop of stops) layers.push(stop.rgb);
        if (stops.some((stop) => stop.alpha >= 0.95) || (background && background.alpha >= 0.95)) break;
      } else if (background && background.alpha >= 0.95) {
        break;
      }
      node = node.parentElement;
    }
    if (layers.length === 0) layers.push([255, 255, 255]);
    return layers;
  };

  const candidates = [];
  let index = 0;
  for (const el of document.querySelectorAll("*")) {
    const style = getComputedStyle(el);
    if (!style.backgroundImage.includes("gradient")) continue;
    if (style.webkitBackgroundClip !== "text" && style.backgroundClip !== "text") continue;

    const textStops = stopsOf(style.backgroundImage).map((stop) => stop.rgb);
    if (textStops.length === 0) continue;

    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;

    const layers = backdrops(el);
    let estimate = Number.POSITIVE_INFINITY;
    for (const textStop of textStops) {
      for (const layer of layers) estimate = Math.min(estimate, ratio(textStop, layer));
    }

    const fontPx = parseFloat(style.fontSize);
    const large = fontPx >= 24 || (parseInt(style.fontWeight, 10) >= 700 && fontPx >= 18.66);
    el.setAttribute("data-contrast-index", String(index));
    candidates.push({
      index,
      text: (el.textContent || "").trim().slice(0, 30),
      fontPx: Math.round(fontPx),
      need: large ? 3 : 4.5,
      estimate: Math.round(estimate * 100) / 100,
      stops: textStops,
      box: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
    });
    index += 1;
  }

  probe.remove();
  return candidates;
})()`;

/** Narrows the page payload instead of trusting a cast. */
function parseCandidates(value: unknown): Candidate[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    if (!("index" in entry) || typeof entry.index !== "number") return [];
    if (!("text" in entry) || typeof entry.text !== "string") return [];
    if (!("fontPx" in entry) || typeof entry.fontPx !== "number") return [];
    if (!("need" in entry) || typeof entry.need !== "number") return [];
    if (!("estimate" in entry) || typeof entry.estimate !== "number") return [];
    if (!("box" in entry) || typeof entry.box !== "object" || entry.box === null) return [];
    if (!("stops" in entry) || !Array.isArray(entry.stops)) return [];
    const box = entry.box as Record<string, unknown>;
    if (typeof box.x !== "number" || typeof box.y !== "number") return [];
    if (typeof box.width !== "number" || typeof box.height !== "number") return [];
    const stops = entry.stops.flatMap((stop) => {
      if (!Array.isArray(stop) || stop.length < 3) return [];
      const [r, g, b] = stop;
      return typeof r === "number" && typeof g === "number" && typeof b === "number"
        ? [[r, g, b] as [number, number, number]]
        : [];
    });
    return [{ index: entry.index, text: entry.text, fontPx: entry.fontPx, need: entry.need, estimate: entry.estimate, stops, box: { x: box.x, y: box.y, width: box.width, height: box.height } }];
  });
}

const channel = (value: number) => {
  const v = value / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
};
const luminance = (r: number, g: number, b: number) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrast = (text: readonly [number, number, number], backdropLum: number) => {
  const textLum = luminance(text[0], text[1], text[2]);
  return (Math.max(textLum, backdropLum) + 0.05) / (Math.min(textLum, backdropLum) + 0.05);
};

/** Prefer bundled Chromium, then an installed Chrome/Edge so no download is needed. */
async function launchBrowser() {
  const candidates: Array<{ channel?: "chrome" | "msedge" }> = [{}, { channel: "chrome" }, { channel: "msedge" }];
  let lastError: unknown = null;
  for (const candidate of candidates) {
    try {
      return await chromium.launch(candidate);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("No Chromium build available.");
}

/**
 * Reads the painted backdrop under each flagged element.
 *
 * The glyph fill is removed (`background-image: none`) while the text fill colour
 * stays transparent, so the element renders as its own backdrop at the exact same
 * layout position. `locator.screenshot()` then scrolls the element into view
 * itself, which keeps this deterministic — computing page coordinates by hand
 * drifted whenever a page had fixed or transformed sections.
 */
async function sampleBackdrop(page: Page, candidate: Candidate) {
  const selector = `[data-contrast-index="${candidate.index}"]`;
  const locator = page.locator(selector);
  if ((await locator.count()) === 0) return null;

  // Scroll and let scroll-triggered re-renders finish first: a React re-render
  // re-applies the style prop and would silently restore the glyph fill.
  await locator.scrollIntoViewIfNeeded({ timeout: 5_000 }).catch(() => undefined);
  await page.waitForTimeout(350);

  const fill = await page.evaluate(async (sel) => {
    const el = document.querySelector(sel);
    if (!(el instanceof HTMLElement)) return null;
    const previous = el.style.backgroundImage;
    el.style.setProperty("background-image", "none", "important");
    // Wait for the paint that drops the glyph fill; without this the screenshot
    // can still capture the gradient lettering and measure text against itself.
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return previous;
  }, selector);
  if (fill === null) return null;

  let shot: Buffer | null = null;
  try {
    shot = await locator.screenshot({ animations: "disabled", timeout: 5_000 });
  } catch {
    shot = null;
  } finally {
    await page.evaluate(
      ({ sel, previous }) => {
        const el = document.querySelector(sel);
        if (el instanceof HTMLElement) el.style.backgroundImage = previous;
      },
      { sel: selector, previous: fill }
    );
  }

  if (!shot) return null;

  const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
  const luminances: number[] = [];
  for (let i = 0; i + info.channels <= data.length; i += info.channels) {
    luminances.push(luminance(data[i], data[i + 1], data[i + 2]));
  }
  if (luminances.length === 0) return null;
  luminances.sort((a, b) => a - b);
  // Extremes, not the mean: contrast is judged at the worst point.
  return { min: luminances[Math.floor(luminances.length * 0.05)], max: luminances[Math.floor(luminances.length * 0.95)] };
}

async function main() {
  const all = getAllStylesMeta().map((style) => style.slug);
  const slugs = ONLY.length > 0 ? all.filter((slug) => ONLY.includes(slug)) : all;
  const browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const findings: Finding[] = [];
  let inspected = 0;

  try {
    for (const slug of slugs) {
      const response = await page.goto(`${BASE_URL}${LOCALE_PREFIX}/styles/${slug}/showcase`, {
        waitUntil: "load",
        timeout: 20_000,
      });
      if (!response || !response.ok()) continue;

      // Reveal animations and client mounting need a beat before measuring.
      await page.waitForTimeout(400);
      const candidates = parseCandidates(await page.evaluate(COLLECT_SOURCE));
      inspected += candidates.length;

      // Only refine the suspects; sampling every element would be far slower.
      for (const candidate of candidates) {
        if (candidate.estimate >= candidate.need) continue;

        const backdrop = await sampleBackdrop(page, candidate);
        if (!backdrop) {
          findings.push({ slug, text: candidate.text, fontPx: candidate.fontPx, need: candidate.need, worst: candidate.estimate });
          continue;
        }

        let worst = Number.POSITIVE_INFINITY;
        for (const stop of candidate.stops) {
          worst = Math.min(worst, contrast(stop, backdrop.min), contrast(stop, backdrop.max));
        }
        worst = Math.round(worst * 100) / 100;
        if (process.env.CONTRAST_DEBUG === "1") {
          console.log(
            `  debug ${slug} "${candidate.text}" stops=${candidate.stops.map((stop) => `rgb(${stop.join(",")})`).join(" ")} backdropLum=${backdrop.min.toFixed(3)}..${backdrop.max.toFixed(3)} => ${worst}`
          );
        }
        if (worst < candidate.need) {
          findings.push({ slug, text: candidate.text, fontPx: candidate.fontPx, need: candidate.need, worst });
        }
      }
    }
  } finally {
    await browser.close();
  }

  findings.sort((a, b) => a.worst - b.worst);

  if (findings.length === 0) {
    console.log(
      `[check:contrast] PASS - ${inspected} gradient-text elements across ${slugs.length} styles meet WCAG 1.4.3.`
    );
    return;
  }

  console.error(`[check:contrast] FAIL - ${findings.length} of ${inspected} gradient-text elements are below WCAG 1.4.3.\n`);
  for (const finding of findings) {
    const sample = finding.text.replace(/\s+/g, " ").trim() || "(no text)";
    console.error(
      `  ${finding.worst.toFixed(2).padStart(5)} < ${String(finding.need).padEnd(3)}  ${finding.slug.padEnd(28)} ${String(finding.fontPx).padStart(3)}px  "${sample}"`
    );
  }
  process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error("[check:contrast] crashed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
