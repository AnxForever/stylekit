import { expect, test } from "@playwright/test";

test("localized template cards navigate without a redirect", async ({ page }) => {
  await page.goto("/zh/templates");

  const templateLink = page.locator('a[href$="/templates/brutal-landing"]').first();
  await expect(templateLink).toHaveAttribute("href", "/zh/templates/brutal-landing");

  const unlocalizedRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.pathname === "/templates/brutal-landing") {
      unlocalizedRequests.push(request.url());
    }
  });

  await templateLink.click();
  await expect(page).toHaveURL(/\/zh\/templates\/brutal-landing$/);
  await page.waitForLoadState("networkidle");
  expect(unlocalizedRequests).toEqual([]);
});
