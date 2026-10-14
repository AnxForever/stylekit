import { expect, test, type Locator } from "@playwright/test";

const slug = "technical-profile";
const entryPath = `app/templates/${slug}/page.tsx`;
const stylePath = "components/templates/relief-mark.module.css";
const endpoint = `**/api/templates/${slug}/source?view=project`;

function projectFixture(source = "export default function Demo() { return null; }") {
  return {
    slug,
    filename: `${slug}.tsx`,
    source,
    entryPath,
    files: { [entryPath]: source, "app/globals.css": "body { color: black; }" },
    binaryFiles: ["public/sample.png"],
  };
}

async function chooseFile(dialog: Locator, path: string) {
  const picker = dialog.getByRole("button", { name: /选择文件/ });
  if (await picker.isVisible()) await picker.click();
  await dialog.getByRole("button", { name: path, exact: true }).click();
}

test("template source exposes real files and copies the selected CSS", async ({ page, request }, testInfo) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (text: string) => {
        (window as Window & { copiedTemplateFile?: string }).copiedTemplateFile = text;
      } },
    });
  });
  const response = await request.get(`/api/templates/${slug}/source?view=project`);
  expect(response.ok()).toBe(true);
  const project = await response.json();

  await page.goto("/zh/templates?q=technical-profile");
  await expect(page.getByRole("button", { name: "复制代码", exact: true })).toHaveCount(0);
  const opener = page.getByRole("button", { name: "查看源码", exact: true });
  await expect(opener).toHaveCount(1);
  await opener.click();
  const dialog = page.getByRole("dialog", { name: /项目源码/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("pre code")).toHaveText(project.source);
  await chooseFile(dialog, stylePath);
  await expect(dialog.locator("pre code")).toHaveText(project.files[stylePath]);
  await dialog.getByRole("button", { name: "复制当前文件" }).click();
  await expect.poll(() => page.evaluate(() =>
    (window as Window & { copiedTemplateFile?: string }).copiedTemplateFile
  )).toBe(project.files[stylePath]);
  await expect(dialog.getByRole("link", { name: "下载完整项目" }))
    .toHaveAttribute("href", `/api/templates/${slug}/download`);
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  await dialog.screenshot({ path: testInfo.outputPath("source-browser.png") });
  await chooseFile(dialog, "CUSTOMIZE.md");
  await expect(dialog.locator("pre code")).toContainText("FIELD_NOTES");
  await expect(dialog.locator("pre code")).toContainText("定制模板");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("source failure can retry and denied clipboard reports failure honestly", async ({ page }) => {
  let attempts = 0;
  let shouldFail = true;
  await page.route(endpoint, async (route) => {
    attempts += 1;
    await route.fulfill(shouldFail
      ? { status: 503, json: { error: "Unavailable" } }
      : { json: projectFixture() });
  });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new DOMException("Denied", "NotAllowedError"); } },
    });
  });
  await page.goto("/zh/templates?q=technical-profile");
  const opener = page.getByRole("button", { name: "查看源码", exact: true });
  await expect(opener).toHaveCount(1);
  await opener.click();
  const dialog = page.getByRole("dialog", { name: /项目源码/ });
  await expect(dialog.getByText("源码暂不可用。", { exact: true })).toBeVisible();
  shouldFail = false;
  await dialog.getByRole("button", { name: "重新加载" }).click();
  await expect(dialog.locator("pre code")).toHaveText(projectFixture().source);
  expect(attempts).toBeGreaterThanOrEqual(2);
  await dialog.getByRole("button", { name: "复制当前文件" }).click();
  await expect(dialog.getByText("复制失败，请选中代码手动复制。")).toBeVisible();
  await expect(dialog.getByRole("textbox", { name: "复制当前文件" })).toHaveValue(projectFixture().source);
  await expect(dialog.getByRole("button", { name: "已复制!" })).toHaveCount(0);
  await chooseFile(dialog, "app/globals.css");
  await expect(dialog.getByText("复制失败，请选中代码手动复制。")).toHaveCount(0);
});

test("closing during a pending request cannot reopen the source dialog", async ({ page }) => {
  let releaseFirst: () => void = () => {};
  const release = new Promise<void>((resolve) => { releaseFirst = resolve; });
  let block = true;
  let pending = 0;
  await page.route(endpoint, async (route) => {
    const wasPending = block;
    if (wasPending) {
      pending += 1;
      await release;
    }
    await route.fulfill({ json: projectFixture(wasPending ? "// old response" : "// current response") }).catch(() => {});
    if (wasPending) pending -= 1;
  });
  await page.goto("/zh/templates?q=technical-profile");
  const opener = page.getByRole("button", { name: "查看源码", exact: true });
  await expect(opener).toHaveCount(1);
  const started = page.waitForRequest(endpoint);
  await opener.click();
  await started;
  const dialog = page.getByRole("dialog", { name: /项目源码/ });
  await expect(dialog.getByRole("status")).toBeVisible();
  await dialog.getByRole("button", { name: "关闭源码" }).click();
  block = false;
  releaseFirst();
  await expect.poll(() => pending).toBe(0);
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  await opener.click();
  await expect(dialog.locator("pre code")).toHaveText("// current response");
});
