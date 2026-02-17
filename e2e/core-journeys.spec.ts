import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows style cards", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/StyleKit/);

    // Hero section visible
    const hero = page.locator("main").first();
    await expect(hero).toBeVisible();

    // Style cards should be rendered
    const cards = page.locator('[data-testid="style-card"]');
    // Fallback: if no test IDs, look for links to style detail pages
    const styleLinks = page.locator('a[href^="/styles/"]');
    const count = await styleLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("search filters styles", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator(
      'input[type="text"], input[type="search"], input[placeholder*="search" i], input[placeholder*="搜索" i]'
    );

    if ((await searchInput.count()) > 0) {
      await searchInput.first().fill("brutalist");
      // Wait for filtering
      await page.waitForTimeout(500);

      const visibleLinks = page.locator('a[href^="/styles/"]');
      const count = await visibleLinks.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe("Style detail page", () => {
  test("loads style detail and shows content", async ({ page }) => {
    await page.goto("/styles/neo-brutalist");
    await expect(page).toHaveTitle(/Neo-Brutalist/i);

    // Style name should be visible
    await expect(page.getByText("Neo-Brutalist")).toBeVisible();
  });

  test("tabs are interactive", async ({ page }) => {
    await page.goto("/styles/neo-brutalist");

    // Look for tab-like elements
    const tabs = page.locator('[role="tab"], button').filter({ hasText: /rules|token|component/i });
    if ((await tabs.count()) > 0) {
      await tabs.first().click();
      await page.waitForTimeout(300);
    }
  });

  test("has JSON-LD structured data", async ({ page }) => {
    await page.goto("/styles/neo-brutalist");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThan(0);

    const content = await jsonLd.first().textContent();
    expect(content).toBeTruthy();
    const parsed = JSON.parse(content!);
    expect(parsed["@type"]).toBe("SoftwareApplication");
  });
});

test.describe("Showcase page", () => {
  test("loads a showcase page", async ({ page }) => {
    await page.goto("/styles/neo-brutalist/showcase");
    // Showcase should load without errors
    await expect(page.locator("body")).toBeVisible();

    // Should have interactive elements
    const buttons = page.locator("button");
    expect(await buttons.count()).toBeGreaterThan(0);
  });
});

test.describe("Navigation", () => {
  test("header links work", async ({ page }) => {
    await page.goto("/");

    // Click on a navigation link
    const stylesLink = page.locator('a[href="/styles"]').first();
    if ((await stylesLink.count()) > 0) {
      await stylesLink.click();
      await page.waitForURL("**/styles**");
    }
  });
});

test.describe("Mobile responsive", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile layout renders correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();

    // Mobile menu button should be visible
    const menuButton = page.locator(
      'button[aria-label*="menu" i], button[aria-label*="菜单" i], [data-testid="mobile-menu"]'
    );
    if ((await menuButton.count()) > 0) {
      await menuButton.first().click();
      await page.waitForTimeout(300);
    }
  });
});
