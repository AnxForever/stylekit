import { expect, test } from "@playwright/test";

test("header hydrates with a saved dark theme without React mismatch errors", async ({
  page,
}) => {
  const hydrationErrors: string[] = [];
  const hydrationErrorPattern = /hydration|#418|hydrated but/i;

  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      hydrationErrorPattern.test(message.text())
    ) {
      hydrationErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    if (hydrationErrorPattern.test(error.message)) {
      hydrationErrors.push(error.message);
    }
  });

  // next-themes reads this before React hydrates, while the server cannot.
  await page.addInitScript(() => {
    window.localStorage.setItem("theme", "dark");
  });

  await page.goto("/en/mobile", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.locator('button[aria-label="Switch to light mode"]')
  ).toHaveCount(1);
  await expect.poll(() => hydrationErrors).toEqual([]);
});
