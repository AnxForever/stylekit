import { expect, test } from "@playwright/test";

test.setTimeout(90_000);
test.beforeEach(async ({ page }) => {
  await page.route("**/api/analytics**", (route) => route.fulfill({ json: { success: true } }));
});

test("an exact reply link reaches older context without paging through the discussion", async ({ page }) => {
  const parentId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const replyId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  const comment = { author_name: "Contributor", avatar_url: null, user_id: null, created_at: "2026-09-15T01:00:00Z", author_provider: "unknown", author_seq_id: null, author_title: null, author_title_color: null, author_title_icon_path: null };
  await page.route("**/api/styles/dark-mode/comments?*", (route) => {
    if (route.request().method() !== "GET") throw new Error("Browser tests must not publish comments");
    const focused = new URL(route.request().url()).searchParams.get("comment");
    return route.fulfill({ json: {
      repliesEnabled: true, total: 1,
      comments: focused === parentId
        ? [{ ...comment, id: parentId, content: "Original implementation question", is_reply: false, reply_to_id: null, reply_to: null }]
        : [{ ...comment, id: replyId, content: "Specific reply fixture", is_reply: true, reply_to_id: parentId, reply_to: { id: parentId, author_name: "Contributor", content: "Original implementation question" } }],
    } });
  });
  await page.goto(`/en/styles/dark-mode?comment=${replyId}#comment-${replyId}`);
  await expect(page.locator(`#comment-${replyId}`)).toBeInViewport();
  await expect(page.getByText("Specific reply fixture")).toBeVisible();
  await page.getByRole("button", { name: "Replying to Contributor" }).click();
  await expect(page).toHaveURL(new RegExp(`comment=${parentId}`));
  await expect(page.locator(`#comment-${parentId}`)).toBeInViewport();
  await expect(page.locator(`#comment-${parentId}`)).toContainText("Original implementation question");
  await page.getByRole("button", { name: "View all comments" }).click();
  await expect(page).not.toHaveURL(/\?comment=/);
});

test("notification pages are private, noindex, and do not expose an inbox when signed out", async ({ page, request }) => {
  const api = await request.get("/api/community/notifications?scope=someone-else");
  expect(api.status()).toBe(401);
  expect(api.headers()["cache-control"]).toContain("no-store");
  await page.goto("/en/community/notifications");
  await expect(page.getByRole("heading", { name: "Sign in to see your replies" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("main").getByRole("link", { name: "Sign in", exact: true })).toHaveAttribute("href", /next=%2Fen%2Fcommunity%2Fnotifications/);
});

test.describe("initial HTML without scripts", () => {
  test.use({ javaScriptEnabled: false });
  test("locale roots send the correct language before hydration", async ({ page }) => {
    for (const path of ["/zh", "/zh/styles/dark-mode", "/zh/dark-mode-ui-prompts", "/zh/community"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
      await expect(page.locator("h1")).toBeVisible();
    }
    await page.goto("/en/dark-mode-ui-prompts");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
  test("color answers show actual pairings, sources, and a single canonical URL", async ({ page }) => {
    await page.goto("/en/colors/111827");
    await expect(page).toHaveTitle("#111827 Hex Color — RGB, Pairings & Contrast | StyleKit");
    await expect(page.locator("main")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { name: "Colors paired with #111827 in real UI palettes" })).toBeVisible();
    await expect(page.locator("header p").filter({ hasText: "not an exact match" })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.stylekit.top/en/colors/111827");
    await page.locator("summary").filter({ hasText: "What text color should I use" }).click();
    await expect(page.locator("details[open]")).toContainText("not a complete accessibility assessment");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
  test("unmatched routes return a real noindex 404 with a working language choice", async ({ page }) => {
    const response = await page.goto("/zh/this-route-is-not-real");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "This page could not be found." })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await page.getByRole("link", { name: "返回中文首页" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  });
});
