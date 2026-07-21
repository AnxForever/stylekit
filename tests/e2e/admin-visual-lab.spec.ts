import { expect, test } from "@playwright/test";

test.describe("admin premium visual lab", () => {
  test("keeps the experiment isolated and switches visual directions", async ({ page }) => {
    await page.goto("/admin/visual-lab");

    await expect(page).toHaveTitle(/视觉实验室/);
    await expect(page.getByRole("heading", { name: "视觉实验室" })).toBeVisible();
    await expect(page.getByText("不修改现有预览", { exact: true })).toBeVisible();

    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute("content", /noindex/);

    await page.getByRole("tab", { name: /Cyberpunk/ }).click();
    await expect(
      page.getByRole("heading", { name: /先建立世界，\s*再展示界面。/ })
    ).toBeVisible();

    await page.getByRole("tab", { name: /Corporate/ }).click();
    await expect(
      page.getByRole("heading", { name: /少讲办公氛围，\s*多给产品证据。/ })
    ).toBeVisible();
    await expect(page.getByLabel("B2B 产品证据示意")).toBeVisible();

    const motionToggle = page.getByRole("button", { name: /动效预览/ });
    await expect(motionToggle).toHaveAttribute("aria-pressed", "true");
    await motionToggle.click();
    await expect(motionToggle).toHaveAttribute("aria-pressed", "false");
  });

  test("honors reduced motion and does not overflow on mobile", async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/admin/visual-lab");
    await page.getByRole("tab", { name: /Cyberpunk/ }).click();

    const animationName = await page
      .locator('section[data-direction="cyberpunk"] img')
      .evaluate((element) => getComputedStyle(element).animationName);
    expect(animationName).toBe("none");

    if (testInfo.project.name === "mobile-chrome") {
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    }
  });
});
