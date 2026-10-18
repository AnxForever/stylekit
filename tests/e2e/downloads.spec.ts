import { expect, test } from "@playwright/test";
import { downloadPacks } from "../../lib/downloads/catalog";

const firstPack = downloadPacks[0];

test.describe("3D model collection", () => {
  test("keeps filters in the URL and follows browser history", async ({ page }) => {
    await page.goto("/en/downloads?campaign=qa#download-catalog");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Objects with a point of view.");
    await page.getByRole("searchbox", { name: "Search models" }).fill("no-such-model-qa");
    await page.getByRole("searchbox", { name: "Search models" }).press("Enter");
    await expect(page).toHaveURL(/campaign=qa&q=no-such-model-qa#download-catalog$/);
    await expect(page.getByRole("searchbox", { name: "Search models" })).toBeFocused();
    await expect(page.getByRole("heading", { name: "No matching models" })).toBeVisible();
    await page.goBack();
    await expect(page.getByRole("heading", { name: firstPack.name.en, exact: true })).toBeVisible();
    await expect(page.getByRole("searchbox", { name: "Search models" })).toHaveValue("");
    await page.goForward();
    await expect(page.getByRole("heading", { name: "No matching models" })).toBeVisible();
    await page.getByRole("button", { name: "Reset filters", exact: true }).click();
    await expect(page).toHaveURL(/\/en\/downloads\?campaign=qa#download-catalog$/);
  });

  test("shows real files in an accessible preview and closes with Escape", async ({ page }, testInfo) => {
    await page.goto(`/zh/downloads?pack=${firstPack.slug}`);
    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("heading", { name: firstPack.name.zh, exact: true })).toBeVisible();
    await expect(dialog.getByText(firstPack.files[0].name, { exact: true })).toBeVisible();
    const preview = dialog.locator("img").first();
    await expect(preview).toBeVisible();
    await expect.poll(() => preview.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await page.screenshot({ path: testInfo.outputPath("model-detail-zh.png") });
    await page.keyboard.press("Tab");
    await expect.poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(page).not.toHaveURL(/pack=/);
    await expect(page.getByRole("heading", { name: "模型展台" })).toBeFocused();
  });

  test("keeps pending files private even when addressed directly", async ({ request, page }) => {
    const draft = downloadPacks.find((pack) => pack.publication !== "published" || pack.license.status !== "confirmed");
    test.skip(!draft, "All catalog entries have passed publication and licensing review.");
    if (!draft) return;
    const file = draft.files[0];
    const response = await request.get(`/api/downloads/${draft.slug}/${file.id}`);
    expect(response.status()).toBe(403);
    expect(response.headers()["content-type"]).toContain("application/json");
    const direct = await request.get(`/content/downloads/${draft.slug}/${draft.version}/${file.name}`);
    expect(direct.status()).toBe(404);
    await page.goto(`/en/downloads?pack=${draft.slug}`);
    await expect(page.getByRole("dialog").locator('a[href^="/api/downloads/"]')).toHaveCount(0);
    await expect(page.getByRole("dialog").getByText("License pending", { exact: true })).toBeVisible();
  });

  test("fits the viewport and captures the real collection", async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/zh/downloads");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("有形状，也有性格。");
    const announcementClose = page.getByRole("button", { name: "关闭公告", exact: true });
    if (await announcementClose.isVisible()) await announcementClose.click();
    // Exercise a client action before capture; screenshots hide the input
    // caret, which must not mutate server markup before React hydrates it.
    await page.getByRole("group", { name: "美术风格" }).getByRole("button", { name: /低多边形/ }).click();
    await expect(page).toHaveURL(/style=low-poly/);
    await page.getByRole("button", { name: /全部风格/ }).click();
    await expect(page).not.toHaveURL(/style=/);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath("models-zh-light.png"), fullPage: true });
    await page.evaluate(() => { localStorage.setItem("theme", "dark"); });
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.getByRole("group", { name: "美术风格" }).getByRole("button", { name: /低多边形/ }).click();
    await expect(page).toHaveURL(/style=low-poly/);
    await page.getByRole("button", { name: /全部风格/ }).click();
    await expect(page).not.toHaveURL(/style=/);
    await page.screenshot({ path: testInfo.outputPath("models-zh-dark.png"), fullPage: true });
  });
});
