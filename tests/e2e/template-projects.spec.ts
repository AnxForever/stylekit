import { expect, test } from "@playwright/test";

const anxCard = '[data-template-id="anx-portfolio"]';

test("AnxForever project is discoverable by its name, domain, and project types", async ({ page }, testInfo) => {
  for (const query of ["AnxForever", "me.anxforever.cn", "blog", "portfolio"]) {
    await page.goto(`/zh/templates?q=${encodeURIComponent(query)}`);
    await expect(page.locator(anxCard), `query: ${query}`).toBeVisible();
  }

  await page.goto("/zh/templates?q=AnxForever");
  const card = page.locator(anxCard);
  const typeFilter = page.getByRole("group", { name: "模板类型筛选" });
  await typeFilter.getByRole("button", { name: "博客", exact: true }).click();
  await expect(page).toHaveURL(/type=blog/);
  await expect(card).toBeVisible();
  await typeFilter.getByRole("button", { name: "作品集", exact: true }).click();
  await expect(page).toHaveURL(/type=portfolio/);
  await expect(card).toBeVisible();

  await expect(card.getByText("完整开源项目")).toBeVisible();
  await expect(card.getByText("Next.js + React + MDX")).toBeVisible();
  await expect(card.getByText("个人资料与项目作品")).toBeVisible();
  await expect(card.getByText("博客列表与独立文章")).toBeVisible();
  await expect(card.getByText("搜索、动态与分类收藏")).toBeVisible();
  await expect(card.getByRole("link", { name: "预览原站", exact: true })).toHaveAttribute(
    "href",
    "https://me.anxforever.cn"
  );
  await expect(card.getByRole("link", { name: /GitHub 完整源码/ })).toHaveAttribute(
    "href",
    "https://github.com/AnxForever/anx-portfolio"
  );
  await expect(card.getByRole("link", { name: "MIT 许可证" })).toHaveAttribute(
    "href",
    "https://github.com/AnxForever/anx-portfolio/blob/main/LICENSE"
  );
  await expect(card.locator('a[href*="/api/templates/"]')).toHaveCount(0);
  await expect(card.getByRole("button", { name: "查看源码" })).toHaveCount(0);
  await card.screenshot({ path: testInfo.outputPath("anx-project-card.png") });
});

test("internal profile examples still expose the local source and example download", async ({ page }) => {
  await page.goto("/zh/templates?q=technical-profile");
  const card = page.locator('[data-template-id="technical-profile"]');

  await expect(card).toBeVisible();
  await expect(card.getByText("可下载示例")).toBeVisible();
  await expect(card.getByRole("button", { name: "查看源码" })).toBeVisible();
  await expect(card.locator('a[href="/api/templates/technical-profile/download"]')).toHaveText(
    "下载示例"
  );
  await expect(card.getByRole("link", { name: /GitHub 完整源码/ })).toHaveCount(0);
});
