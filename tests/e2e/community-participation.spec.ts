import { expect, test } from "@playwright/test";

test.setTimeout(90_000);
test.beforeEach(async ({ page }) => {
  // Browser verification must not pollute the live-backed analytics store.
  await page.route("**/api/analytics**", (route) => route.fulfill({ json: { success: true } }));
});

test("community connects readers to real feedback without a duplicate brand title", async ({ page }) => {
  await page.goto("/zh/community");
  await expect(page).toHaveTitle("社区风格与 UI 设计讨论 | StyleKit");
  await expect(page.getByRole("heading", { level: 1, name: "风格社区" })).toBeVisible();
  await expect(page.locator("#discussions")).toBeVisible();
  await page.locator('a[href="/zh/styles/dark-mode#style-feedback"]').click();
  await expect(page).toHaveURL(/\/zh\/styles\/dark-mode#style-feedback$/);
  await expect(page.locator("#style-feedback")).toBeInViewport();
  const login = page.locator('#style-feedback a[href*="/login?next="]');
  await expect(login).toHaveCount(2);
  await expect(login.first()).toBeVisible();
  const href = await login.last().getAttribute("href");
  expect(new URL(href!, "https://www.stylekit.top").searchParams.get("next"))
    .toBe("/zh/styles/dark-mode#style-feedback");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("comment pagination reaches older feedback", async ({ page }) => {
  const comments = Array.from({ length: 12 }, (_, index) => ({
    id: `test-comment-${index}`, content: `Fixture comment ${index + 1}`,
    author_name: "Test contributor", avatar_url: null, user_id: null,
    created_at: "2026-09-10T10:00:00Z", author_provider: "unknown",
    author_seq_id: null, author_title: null, author_title_color: null, author_title_icon_path: null,
  }));
  await page.route("**/api/styles/dark-mode/comments?*", (route) => {
    if (route.request().method() !== "GET") throw new Error("No comment writes allowed in browser tests");
    const params = new URL(route.request().url()).searchParams;
    const offset = Number(params.get("offset") || 0);
    const limit = Number(params.get("limit") || 10);
    return route.fulfill({ json: { comments: comments.slice(offset, offset + limit), total: comments.length } });
  });
  await page.goto("/en/styles/dark-mode#style-feedback");
  await expect(page.getByText("Fixture comment 1", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Next comments" }).click();
  await expect(page.getByText("Fixture comment 11", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Next comments" })).toBeDisabled();
  await page.getByRole("button", { name: "Previous comments" }).click();
  await expect(page.getByText("Fixture comment 1", { exact: true })).toBeVisible();
});

test("comment load failure is recoverable and not shown as an empty discussion", async ({ page }) => {
  let fail = true;
  await page.route("**/api/styles/dark-mode/comments?*", (route) => route.fulfill({
    status: fail ? 503 : 200,
    json: fail ? { error: "Unavailable" } : { comments: [], total: 0 },
  }));
  await page.goto("/en/styles/dark-mode#style-feedback");
  const feedback = page.locator("#style-feedback");
  await expect(feedback.getByRole("alert")).toContainText("Comments could not be loaded");
  await expect(feedback.getByText(/No comments yet/)).toHaveCount(0);
  fail = false;
  await feedback.getByRole("button", { name: "Try again" }).click();
  await expect(feedback.getByText(/No comments yet/)).toBeVisible();
});

test.describe("crawlable dark-mode answers", () => {
  test.use({ javaScriptEnabled: false });
  test("renders cited answers and a native FAQ without JavaScript", async ({ page }) => {
    await page.goto("/en/dark-mode-ui-prompts");
    await expect(page).toHaveTitle("Dark Mode UI Prompts & Tailwind v4 Examples | StyleKit");
    await expect(page.getByRole("heading", { name: "Start with this dark mode prompt" })).toBeVisible();
    const question = page.locator("summary").filter({ hasText: "How do I implement dark mode in Tailwind CSS v4?" });
    await question.click();
    await expect(page.locator("details[open]")).toContainText("@custom-variant dark");
    await expect(page.locator('a[href="https://tailwindcss.com/docs/dark-mode"]')).toBeVisible();
  });
  test("keeps the Chinese content language and answers without JavaScript", async ({ page }) => {
    await page.goto("/zh/dark-mode-ui-prompts");
    await expect(page.locator("main")).toHaveAttribute("lang", "zh-CN");
    await expect(page.getByRole("heading", { level: 1, name: "暗黑模式 UI 提示词" })).toBeVisible();
    await page.locator("summary").filter({ hasText: "如何在 Tailwind CSS v4 中实现暗色模式？" }).click();
    await expect(page.locator("details[open]")).toContainText("@custom-variant dark");
  });

});
