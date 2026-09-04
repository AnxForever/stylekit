import { expect, test, type Page } from "@playwright/test";
import { PENDING_STYLE_SLUGS } from "@/lib/styles/review-status";
import approvedPreviews from "../visual/approved-preview-baseline.json";

const APPROVED_CATALOG_SELECTOR = [
  "[data-catalog-style-slug]",
  ...PENDING_STYLE_SLUGS.map(
    (slug) => `:not([data-catalog-style-slug="${slug}"])`,
  ),
].join("");

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
    // Pixel 5 is 393px wide, and 393 is odd. The two-column catalog grid
    // resolves to 172.5px columns, so an aspect-[4/3] cover is 129.375px tall.
    // Playwright captures ceil(top + height) - floor(top), which lands on 130
    // or 131 depending on where each card falls between device pixels -- and a
    // size difference is a hard failure that no pixel threshold can absorb.
    // 392px divides evenly (172px columns, 129px covers) and yields the same
    // 172x130 box for every card. Measured, not assumed: at 393 the capture
    // heights are {130, 131}; at 392 they are {130}.
    // Scoped to this spec so the behavioural suites keep real Pixel 5 metrics.
    // Playwright passes the setter positionally; it is named `provide` rather
    // than the usual `use` so eslint's rules-of-hooks does not read it as
    // React's `use()` being called outside a component.
    viewport: async ({ viewport }, provide, testInfo) => {
      const isMobile = testInfo.project.name === "mobile-chrome";
      await provide(
        isMobile && viewport ? { ...viewport, width: 392 } : viewport,
      );
    },
  });

  test("keeps every approved cover preview pixel-stable", async ({ page }) => {
    test.setTimeout(10 * 60 * 1000);
    await page.goto("/styles?visual-baseline=1", { waitUntil: "networkidle" });
    await stabilizeCatalogChrome(page);

    const catalogItems = page.locator(APPROVED_CATALOG_SELECTOR);
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
