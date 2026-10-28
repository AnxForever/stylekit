import { test, expect } from "@playwright/test";
import path from "node:path";
import { pathToFileURL } from "node:url";

type StudyState = {
  frames: number;
  playing: boolean;
  cards: Array<{ scanPasses: number; hover: number; regions: Array<{ x: number; y: number; w: number; h: number; targetX: number; targetY: number; opacity: number }> }>;
};
type StudyWindow = Window & { brandLineStudy: { inspect: () => StudyState }; __trackingPixelReads: number };
const studyUrl = pathToFileURL(path.resolve(process.cwd(), "public/experiments/brand-line-cards/index.html")).href;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const host = window as StudyWindow;
    host.__trackingPixelReads = 0;
    const original = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function (...args: Parameters<typeof original>) {
      host.__trackingPixelReads += 1;
      return original.apply(this, args);
    };
  });
  await page.goto(studyUrl);
  await page.waitForFunction(() => (window as StudyWindow).brandLineStudy?.inspect().frames > 5);
});

test("scan targets stay on the grid while rendered windows move continuously", async ({ page }) => {
  const google = page.locator('[data-brand="google"]');
  const bounds = (await google.boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width * 0.53, bounds.y + bounds.height * 0.34);
  const positions = new Set<string>();
  let sawFractionalMotion = false;
  let passes = 0;
  for (let index = 0; index < 24; index += 1) {
    await page.waitForFunction((previous) => (window as StudyWindow).brandLineStudy.inspect().cards[1].scanPasses > previous, passes);
    const state = await page.evaluate(() => (window as StudyWindow).brandLineStudy.inspect());
    const regions = state.cards[1].regions;
    sawFractionalMotion ||= regions.some((region) => Math.abs(region.x - Math.round(region.x)) > 0.002 || Math.abs(region.y - Math.round(region.y)) > 0.002);
    passes = state.cards[1].scanPasses;
    expect(regions.length).toBeGreaterThanOrEqual(2);
    expect(regions.length).toBeLessThanOrEqual(3);
    for (const region of regions) {
      expect(Number.isInteger(region.targetX) && Number.isInteger(region.targetY)).toBe(true);
      expect(region.x).toBeGreaterThanOrEqual(0);
      expect(region.x + region.w).toBeLessThanOrEqual(60);
      expect(region.y).toBeGreaterThanOrEqual(0);
      expect(region.y + region.h).toBeLessThanOrEqual(60);
    }
    positions.add(JSON.stringify(regions.map(({ x, y }) => [x, y])));
  }
  expect(positions.size).toBeGreaterThan(1);
  expect(sawFractionalMotion).toBe(true);
  expect(await page.evaluate(() => (window as StudyWindow).__trackingPixelReads)).toBe(3);
});

test("paused scans stay still and resize without resampling", async ({ page }) => {
  await page.locator("#motion-toggle").click();
  await page.locator('[data-brand="google"]').focus();
  await page.waitForFunction(() => {
    const state = (window as StudyWindow).brandLineStudy.inspect();
    return !state.playing && state.cards[1].hover === 1;
  });
  const before = await page.evaluate(() => (window as StudyWindow).brandLineStudy.inspect());
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => (window as StudyWindow).brandLineStudy.inspect());
  expect(after.frames).toBe(before.frames);
  expect(after.cards[1].regions).toEqual(before.cards[1].regions);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(async () => page.evaluate(() => [...document.querySelectorAll<HTMLCanvasElement>(".field")].every((canvas) => Math.abs(canvas.width - canvas.getBoundingClientRect().width * devicePixelRatio) < 1))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.evaluate(() => (window as StudyWindow).__trackingPixelReads)).toBe(3);
});
