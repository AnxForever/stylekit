import { expect, test, type Page } from "@playwright/test";

const REVIEW_PATH = "/admin/visual-lab/corporate-clean-saas";
const REGISTRY_PATH = `${REVIEW_PATH}/registry.json`;

async function openReviewPage(page: Page) {
  const response = await page.goto(REVIEW_PATH);

  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { name: "Corporate Clean SaaS", level: 1 }),
  ).toBeVisible();
}

async function expectEvidence(page: Page, label: string, value: string) {
  const term = page.locator("dt").filter({ hasText: label });

  await expect(term).toHaveCount(1);
  await expect(term.locator("xpath=following-sibling::dd[1]")).toHaveText(value);
}

test.describe("Corporate Clean SaaS Pack internal review", () => {
  test("stays noindex and reports the frozen zero-sample validation truth", async ({
    page,
  }) => {
    await openReviewPage(page);

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex.*nofollow/i,
    );
    await expect(page.getByText("inconclusive_sample", { exact: true })).toBeVisible();

    await expectEvidence(page, "合格访客", "0/200");
    await expectEvidence(page, "软意向", "0");
    await expectEvidence(page, "访谈", "0/20");
    await expectEvidence(page, "付费", "0");
  });

  test("switches every delivery state and recovers from the error state", async ({
    page,
  }) => {
    await openReviewPage(page);

    const themePicker = page.getByRole("group", { name: "选择界面主题" });
    const appShell = page.locator('[data-pack-evidence="corporate-clean-saas"]');
    await expect(themePicker.getByRole("button", { name: "浅色" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await themePicker.getByRole("button", { name: "深色" }).click();
    await expect(appShell).toHaveAttribute("data-theme", "dark");
    await expect(themePicker.getByRole("button", { name: "深色" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect
      .poll(() =>
        page
          .getByRole("columnheader", { name: "公司" })
          .evaluate((element) => getComputedStyle(element).backgroundColor),
      )
      .toBe("rgb(21, 33, 54)");

    const statePicker = page.getByRole("group", { name: "选择界面状态" });
    const overview = statePicker.getByRole("button", { name: "概览", exact: true });

    await expect(overview).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("region", { name: "关键经营指标" })).toBeVisible();

    await statePicker.getByRole("button", { name: "加载", exact: true }).click();
    await expect(
      page.getByRole("status", { name: "正在加载经营数据" }),
    ).toBeVisible();

    await statePicker.getByRole("button", { name: "空状态", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "还没有可分析的数据" }),
    ).toBeVisible();

    await statePicker.getByRole("button", { name: "错误", exact: true }).click();
    const errorState = page.getByRole("alert").filter({ hasText: "暂时无法读取数据" });
    await expect(errorState).toContainText("暂时无法读取数据");
    await errorState.getByRole("button", { name: "重新加载" }).click();

    await expect(overview).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("region", { name: "关键经营指标" })).toBeVisible();

    await statePicker.getByRole("button", { name: "成功", exact: true }).click();
    await expect(page.getByRole("status").filter({ hasText: "报告已生成" })).toBeVisible();
    await expect(
      statePicker.getByRole("button", { name: "成功", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  test("serves the linked download as a registry:block payload", async ({
    page,
    request,
  }) => {
    await openReviewPage(page);

    await expect(page.getByRole("link", { name: "下载内部 Registry" })).toHaveAttribute(
      "href",
      REGISTRY_PATH,
    );

    const response = await request.get(REGISTRY_PATH);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-disposition"]).toContain(
      'filename="corporate-clean-saas.registry.json"',
    );
    expect(response.headers()["x-robots-tag"]).toMatch(/noindex.*nofollow/i);

    const registry = (await response.json()) as {
      name?: string;
      type?: string;
      files?: unknown[];
    };
    expect(registry.name).toBe("corporate-clean-saas");
    expect(registry.type).toBe("registry:block");
    expect(registry.files?.length).toBeGreaterThan(0);
  });

  test("uses one chart reveal and disables it for reduced motion", async ({ page }) => {
    await openReviewPage(page);

    const chartLine = page.getByTestId("revenue-chart-line");
    await expect
      .poll(() => chartLine.evaluate((element) => getComputedStyle(element).animationName))
      .toContain("cc-chart-draw");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();

    await expect
      .poll(() => chartLine.evaluate((element) => getComputedStyle(element).animationName))
      .toBe("none");
  });

  test("has no document-level horizontal overflow on mobile", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chrome", "mobile viewport assertion");

    await openReviewPage(page);
    const menuButton = page.getByRole("button", { name: "打开导航" });
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("complementary", { name: "工作区导航" })).toBeVisible();
    await page.getByRole("button", { name: "关闭导航" }).click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await page.getByRole("button", { name: "深色" }).click();
    await page.getByRole("button", { name: "成功", exact: true }).click();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
