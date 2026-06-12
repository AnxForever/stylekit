import { expect, test } from "@playwright/test";

const PUBLIC_PAGE_PATHS = [
  "/",
  "/zh",
  "/styles",
  "/zh/styles",
  "/templates",
  "/styles/neo-brutalist",
  "/styles/neo-brutalist/showcase",
] as const;

const PUBLIC_API_PATHS = [
  "/api/health",
  "/api/styles",
  "/api/styles/neo-brutalist",
  "/api/styles/neo-brutalist/tokens",
] as const;

test.describe("public compatibility smoke", () => {
  for (const path of PUBLIC_PAGE_PATHS) {
    test(`page ${path} responds successfully`, async ({ page }) => {
      const response = await page.goto(path);

      expect(response?.status(), `${path} should return a successful page response`).toBeLessThan(400);
      await expect(page.locator("body")).toBeVisible();
    });
  }

  for (const path of PUBLIC_API_PATHS) {
    test(`api ${path} responds successfully`, async ({ request }) => {
      const response = await request.get(path);

      expect(response.status(), `${path} should return a successful API response`).toBeLessThan(400);
      await expect(response).toBeOK();
    });
  }
});
