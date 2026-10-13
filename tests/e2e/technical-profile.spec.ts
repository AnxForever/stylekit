import { expect, test } from "@playwright/test";

test("technical profile journal supports filtering, reading, and return navigation", async ({ page }) => {
  await page.goto("/zh/templates/technical-profile");
  await expect(page).toHaveURL(/\/templates\/technical-profile$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Alex Morgan");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Technical Profile & Journal");
  await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /https?:\/\//);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  await page.getByRole("button", { name: "Systems", exact: true }).click();
  await expect(page.getByRole("button", { name: "Systems", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("link", { name: "Design the pause, not the spinner", exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: "Tokens are a promise to future you", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tokens are a promise to future you");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("article blockquote")).toBeVisible();
  await page.getByRole("link", { name: "Back to field notes", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Notes from the work." })).toBeVisible();

  await page.getByRole("button", { name: "Use dark theme" }).click();
  await expect(page.getByRole("button", { name: "Use light theme" })).toBeVisible();
  const pageWidth = await page.evaluate(() => ({
    viewport: window.innerWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(pageWidth.content).toBeLessThanOrEqual(pageWidth.viewport);
});

test("technical profile rejects nonexistent notes", async ({ page }) => {
  await page.goto("/templates/technical-profile/notes/not-a-real-note");
  // A streamed App Router not-found page may retain an HTTP 200; assert the
  // actual document's crawl directive and content instead of status alone.
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  await expect(page.getByRole("heading", { name: "Alex Morgan", exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
});

test("technical profile works with blocked storage and reduced motion", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException("Storage disabled", "QuotaExceededError"); };
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/templates/technical-profile");
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await expect(page.getByRole("button", { name: "Use light theme" })).toBeVisible();

  const mark = page.getByRole("button", { name: "Field Manual mark" });
  await mark.focus();
  await page.keyboard.down("Space");
  await expect(mark).toHaveAttribute("data-pressed", "true");
  await expect(mark.locator("svg > g").last()).toHaveCSS("transform", "none");
  await page.keyboard.up("Space");
  await expect(mark).toHaveAttribute("data-pressed", "false");
});
