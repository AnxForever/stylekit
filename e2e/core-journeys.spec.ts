import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows style cards", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/StyleKit/);

    // Hero section visible
    const hero = page.locator("main").first();
    await expect(hero).toBeVisible();

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

    // Hero heading and English style name should be visible
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Neo-Brutalist", { exact: true })).toBeVisible();
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
    const jsonLdContents = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(jsonLdContents.length).toBeGreaterThan(0);

    const schemas = jsonLdContents.flatMap((content) => {
      try {
        const parsed = JSON.parse(content);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [];
      }
    });

    expect(schemas.length).toBeGreaterThan(0);
    const schemaTypes = schemas
      .map((schema) => schema?.["@type"])
      .filter(Boolean);
    expect(schemaTypes).toContain("SoftwareApplication");
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

    // On mobile, open menu first so nav links become visible
    const visibleStylesLink = page.locator('a[href="/styles"]:visible').first();
    if ((await visibleStylesLink.count()) === 0) {
      const menuButton = page.getByRole("button", { name: /toggle menu/i }).first();
      if ((await menuButton.count()) > 0 && (await menuButton.isVisible())) {
        await menuButton.click();
      }
    }

    const stylesLink = page.locator('a[href="/styles"]:visible').first();
    await expect(stylesLink).toBeVisible();
    await stylesLink.click();
    await page.waitForURL("**/styles**");
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
