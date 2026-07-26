import { expect, test, type Page } from "@playwright/test";
import approvedPreviews from "../visual/approved-preview-baseline.json";

async function stabilizeCatalogChrome(page: Page) {
  await page.addStyleTag({
    content: `
      nav[aria-label="Mobile navigation"],
      button[aria-label="Scroll to top"],
      [data-site-announcement] {
        display: none !important;
      }
    `,
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

test.describe("approved preview visual baseline", () => {
  test.use({
    colorScheme: "light",
    locale: "zh-CN",
    reducedMotion: "reduce",
  });

  test("keeps all 143 approved cover previews pixel-stable", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await page.goto("/styles?visual-baseline=1", { waitUntil: "networkidle" });
    await stabilizeCatalogChrome(page);

    const catalogItems = page.locator("[data-catalog-style-slug]");
    await expect(catalogItems).toHaveCount(approvedPreviews.count);

    for (const slug of approvedPreviews.slugs) {
      const item = page.locator(`[data-catalog-style-slug="${slug}"]`);
      const cover = item.locator("div.relative.overflow-hidden").first();

      await cover.scrollIntoViewIfNeeded();
      await expect(cover.locator('[data-preview-ready="true"]')).toBeVisible();
      await expect.soft(cover, slug).toHaveScreenshot(`${slug}-cover.png`, {
        animations: "disabled",
        caret: "hide",
        maxDiffPixels: 0,
        scale: "css",
      });
    }
  });

  test("keeps shared card default, hover, and focus states pixel-stable", async ({
    page,
  }) => {
    test.setTimeout(60 * 1000);
    await page.goto("/styles?visual-baseline=states", {
      waitUntil: "networkidle",
    });
    await stabilizeCatalogChrome(page);

    const item = page.locator('[data-catalog-style-slug="corporate-clean"]');
    const card = item.locator(":scope > div");
    const link = item.locator('a[aria-label$="详情"], a[aria-label$="details"]').first();

    await item.scrollIntoViewIfNeeded();
    await expect(
      item.locator('div.relative.overflow-hidden [data-preview-ready="true"]'),
    ).toBeVisible();
    await expect(card).toHaveScreenshot("shared-card-default.png", {
      animations: "disabled",
      caret: "hide",
      maxDiffPixels: 0,
      scale: "css",
    });

    await card.hover();
    await expect(card).toHaveScreenshot("shared-card-hover.png", {
      animations: "disabled",
      caret: "hide",
      maxDiffPixels: 0,
      scale: "css",
    });

    await link.focus();
    await expect(card).toHaveScreenshot("shared-card-focus.png", {
      animations: "disabled",
      caret: "hide",
      maxDiffPixels: 0,
      scale: "css",
    });
  });
});
