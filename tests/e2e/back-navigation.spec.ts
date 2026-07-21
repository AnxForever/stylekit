import { expect, test } from "@playwright/test";

test.describe("semantic back navigation", () => {
  test.describe.configure({ mode: "serial" });

  test("a Showcase back control returns to the exact Chinese source URL", async ({
    page,
  }) => {
    const sourceUrl =
      "/zh/styles/neo-brutalist?category=bold&sort=popular#style-components";

    await page.goto(sourceUrl);
    await page.locator('a[href$="/showcase"]').first().click();
    await expect(page).toHaveURL(/\/styles\/neo-brutalist\/showcase$/);

    await page
      .locator("a")
      .filter({ hasText: /StyleKit/i })
      .first()
      .click();

    await expect(page).toHaveURL(sourceUrl);
  });

  test("an icon-only Showcase back control returns instead of opening home", async ({
    page,
  }) => {
    const sourceUrl = "/zh/styles/masonry-flow?category=layout&sort=popular";

    await page.goto(sourceUrl);
    await page.locator('a[href$="/showcase"]').first().click();
    await expect(page).toHaveURL(/\/styles\/masonry-flow\/showcase$/);

    await page
      .locator('header a[href="/"]')
      .filter({ hasText: /^StyleKit$/ })
      .click();

    await expect(page).toHaveURL(sourceUrl);
  });

  test("ordinary Showcase navigation is not converted into browser back", async ({
    page,
  }) => {
    await page.goto("/zh/styles/neo-brutalist");
    await page.locator('a[href$="/showcase"]').first().click();
    await expect(page).toHaveURL(/\/styles\/neo-brutalist\/showcase$/);

    await page.getByRole("link", { name: "All Styles", exact: true }).click();

    await expect(page).toHaveURL(/\/zh\/styles$/);
  });

  test("a direct Showcase entry uses a locale-preserving fallback", async ({
    context,
    page,
  }, testInfo) => {
    const baseUrl = String(testInfo.project.use.baseURL);
    await context.addCookies([
      {
        name: "stylekit-locale",
        value: "zh",
        url: new URL("/", baseUrl).toString(),
      },
    ]);
    await page.goto("/styles/neo-brutalist/showcase");

    await page
      .locator("a")
      .filter({ hasText: /StyleKit/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/zh$/);
  });
});
