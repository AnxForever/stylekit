import { expect, test, type Page } from "@playwright/test";

const path = "/validation/corporate-clean-saas";

async function mockExperiment(page: Page) {
  await page.route("**/api/product-validation/session", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        lifecycle: "collecting",
        authenticated: true,
        context: {
          experimentId: "cc-saas-pack-price-2026-02",
          offerVersion: "cc-saas-pack-offer-v2",
          packId: "corporate-clean-saas",
          packVersion: "0.1.0",
          variantId: "pack-29",
          currency: "CNY",
          amountMinor: 2_900,
          minimumVisibilityMs: 2_000,
          minimumVisibleRatioBps: 5_000,
          termsVersion: "cc-saas-preorder-terms-v1",
        },
      }),
    });
  });
  await page.route("**/api/product-validation/qualify", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, qualified: true }),
    });
  });
  await page.route("**/api/product-validation/exposure", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, duplicate: false }),
    });
  });
}

test.describe("Corporate Clean isolated price validation", () => {
  test.beforeEach(async ({ page }) => {
    await mockExperiment(page);
  });

  test("shows one sticky price, truthful evidence levels, and no purchase claim", async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toMatch(/noindex.*nofollow.*noarchive/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex.*nofollow/i);
    await expect(page.locator("[data-site-announcement]")).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);

    await expect(page.getByRole("heading", { name: "这不是促销页，是一次可审计的价格判断。" })).toBeVisible();
    await expect(page.getByText("¥29", { exact: true })).toBeVisible();
    await expect(page.getByText("¥49", { exact: true })).toHaveCount(0);
    await expect(page.getByText("当前不会扣款，也不会生成订单。", { exact: true })).toBeVisible();
    await expect(page.getByText("真实结账", { exact: true }).locator(".." )).toHaveAttribute("data-active", "false");

    for (const label of [
      "未来 90 天内有真实生产项目",
      "正在构建 B2B SaaS 或生产型 Web 产品",
      "使用或确定将使用 React / Next.js",
      "使用或确定将使用 Tailwind CSS",
      "使用或确定将使用 shadcn/ui",
      "近 90 天用 AI 编码工具做过真实前端",
      "对开发资源购买有决策权或直接影响力",
      "我同意这些答案仅用于本次价格研究，并理解可以申请退出或删除。",
    ]) {
      await page.getByLabel(label).check();
    }
    await page.getByRole("button", { name: "确认资格" }).click();
    await expect(page.getByText("资格条件已确认。请继续核对唯一价格与条款。" )).toBeVisible();
    await expect(page.getByText("ICP 合格", { exact: true }).locator(".." )).toHaveAttribute("data-active", "true");

    const intentButton = page.getByRole("button", { name: "登记对 ¥29 的接受" });
    await expect(intentButton).toBeDisabled();
    await expect(page.getByText(/商业许可仍需最终审核，因此 E2 暂时锁定/)).toBeVisible();
  });

  test("remains keyboard-readable, reduced-motion safe, and overflow-free on mobile", async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.getByRole("checkbox").first().focus();
    await expect(page.getByRole("checkbox").first()).toBeFocused();

    const animationNames = await page.locator("main").evaluate((element) => {
      const nodes = [element, ...element.querySelectorAll("*")];
      return nodes.map((node) => getComputedStyle(node).animationName);
    });
    expect(animationNames.every((name) => name === "none")).toBe(true);

    if (testInfo.project.name === "mobile-chrome") {
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
    }
  });
});
