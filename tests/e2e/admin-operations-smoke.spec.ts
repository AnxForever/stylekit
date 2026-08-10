import { expect, test } from "@playwright/test";

test.describe("admin operations local smoke", () => {
  test("keeps the operations and sponsor workflows reachable", async ({ page }) => {
    test.setTimeout(45_000);
    const operationsResponse = await page.goto("/admin/operations");

    expect(operationsResponse?.status()).toBeLessThan(400);
    await expect(page.getByRole("heading", { name: "今天该处理什么？" })).toBeVisible();
    const sidebar = page.locator("#admin-sidebar");
    if (await sidebar.isVisible()) {
      await expect(sidebar.getByRole("link", { name: "赞助公告" })).toBeVisible();
    } else {
      await page.getByRole("button", { name: "切换侧边栏" }).click();
      await expect(sidebar.getByRole("link", { name: "赞助公告" })).toBeVisible();
    }
    await expect(page.getByRole("heading", { name: "运营队列" })).toBeVisible({ timeout: 15_000 });

    await page.goto("/admin/support");
    await expect(page.getByRole("heading", { name: "赞助公告", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "发布一条新的赞助公告" })).toBeVisible();
    await expect(page.getByRole("button", { name: "上传并发布" })).toBeVisible();
    await expect(page.locator('input[type="file"]')).toHaveAttribute(
      "accept",
      "image/jpeg,image/png,image/webp",
    );
    const publishImmediately = page.locator('input[type="checkbox"]').first();
    await expect(publishImmediately).toBeChecked();
    await publishImmediately.uncheck();
    await expect(page.getByRole("button", { name: "上传为未公开" })).toBeVisible();
    await publishImmediately.check();
    await expect(page.getByRole("button", { name: "上传并发布" })).toBeVisible();

    await page.goto("/admin/content");
    await expect(page.getByRole("heading", { name: "内容中心" })).toBeVisible();
    await expect(page.getByRole("button", { name: "保存公告" })).toBeVisible();
    await expect(page.getByText("实时预览")).toBeVisible();

    const noHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(noHorizontalOverflow).toBe(true);
  });
});
