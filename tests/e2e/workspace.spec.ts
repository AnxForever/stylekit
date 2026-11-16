import { expect, test, type Page } from "@playwright/test";

const projectId = "11111111-1111-4111-8111-111111111111";
const project = {
  id: projectId,
  name: "客户数据后台",
  description: "面向运营团队的 B2B SaaS",
  project_type: "dashboard",
  stack: ["nextjs", "typescript", "tailwind"],
  brief: {
    audience: "运营团队",
    primaryGoal: "查看收入和账户风险",
    requiredPages: ["概览", "账户"],
    requiredStates: ["loading", "empty", "error", "success"],
    brandPersonality: ["专业", "可信"],
    antiReferences: ["不要紫色渐变"],
    notes: "",
  },
  selected_style_slug: "neo-brutalist",
  status: "active",
  current_revision_number: 2,
  created_at: "2026-07-11T00:00:00.000Z",
  updated_at: "2026-07-11T01:00:00.000Z",
};

async function mockWorkspace(page: Page) {
  await page.route("**/api/workspace/projects", async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ success: true, project }) });
      return;
    }
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, projects: [project] }) });
  });
  await page.route(`**/api/workspace/projects/${projectId}`, async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, project }) });
  });
  await page.route(`**/api/workspace/projects/${projectId}/revisions`, async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, revisions: [
      { id: "22222222-2222-4222-8222-222222222222", revision_number: 2, source: "generation", change_summary: "生成 nextjs 工程（20 个文件）", created_at: "2026-07-11T01:00:00.000Z", content_sha256: `sha256:${"a".repeat(64)}` },
      { id: "33333333-3333-4333-8333-333333333333", revision_number: 1, source: "manual_save", change_summary: "初始项目", created_at: "2026-07-11T00:30:00.000Z", content_sha256: `sha256:${"b".repeat(64)}` },
    ] }) });
  });
  await page.route(`**/api/workspace/projects/${projectId}/exports`, async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, exports: [] }) });
  });
}

async function mockWorkspaceLifecycle(page: Page) {
  let currentRevision = 2;
  const exportId = "44444444-4444-4444-8444-444444444444";
  const revisions = [
    { id: "22222222-2222-4222-8222-222222222222", revision_number: 2, source: "manual_save", change_summary: "补充页面", created_at: "2026-07-11T01:00:00.000Z", content_sha256: `sha256:${"a".repeat(64)}` },
    { id: "33333333-3333-4333-8333-333333333333", revision_number: 1, source: "manual_save", change_summary: "创建项目", created_at: "2026-07-11T00:30:00.000Z", content_sha256: `sha256:${"b".repeat(64)}` },
  ];
  await page.route(`**/api/workspace/projects/${projectId}`, async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, project: { ...project, current_revision_number: currentRevision } }) });
  });
  await page.route(`**/api/workspace/projects/${projectId}/revisions`, async (route) => {
    if (route.request().method() === "POST") {
      currentRevision += 1;
      revisions.unshift({ id: crypto.randomUUID(), revision_number: currentRevision, source: "manual_save", change_summary: "浏览器保存", created_at: new Date().toISOString(), content_sha256: `sha256:${"c".repeat(64)}` });
      await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ success: true, revision: { revisionNumber: currentRevision } }) });
      return;
    }
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, revisions }) });
  });
  await page.route(`**/api/workspace/projects/${projectId}/restore`, async (route) => {
    const input = route.request().postDataJSON() as { revisionNumber: number };
    currentRevision += 1;
    revisions.unshift({ id: crypto.randomUUID(), revision_number: currentRevision, source: "restore", change_summary: `从 v${input.revisionNumber} 恢复`, created_at: new Date().toISOString(), content_sha256: `sha256:${"d".repeat(64)}` });
    await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ success: true, revision: { revisionNumber: currentRevision } }) });
  });
  await page.route(`**/api/workspace/projects/${projectId}/generate`, async (route) => {
    currentRevision += 1;
    revisions.unshift({ id: crypto.randomUUID(), revision_number: currentRevision, source: "generation", change_summary: "生成 nextjs 工程（20 个文件）", created_at: new Date().toISOString(), content_sha256: `sha256:${"e".repeat(64)}` });
    await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ success: true, revision: { revisionNumber: currentRevision }, generation: { target: "nextjs", fileCount: 20, warningCount: 0 } }) });
  });
  await page.route(`**/api/workspace/projects/${projectId}/exports`, async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ success: true, export: { id: exportId, artifact_sha256: `sha256:${"f".repeat(64)}` }, downloadUrl: `/api/workspace/exports/${exportId}/download` }) });
      return;
    }
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true, exports: [] }) });
  });
  await page.route(`**/api/workspace/exports/${exportId}/download`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: {
        "content-type": "application/zip",
        "content-disposition": 'attachment; filename="customer-dashboard-nextjs.zip"',
        "x-content-sha256": `sha256:${"f".repeat(64)}`,
      },
      body: "PK\u0003\u0004stylekit-test-zip",
    });
  });
}

test.describe("StyleKit authenticated workspace", () => {
  test("marks every workspace API response as private and non-cacheable", async ({ request }) => {
    const response = await request.get("/api/workspace/projects");
    expect(response.headers()["cache-control"]).toContain("private");
    expect(response.headers()["cache-control"]).toContain("no-store");
    expect(response.headers()["pragma"]).toBe("no-cache");
  });

  test("lists real persisted projects without public-site chrome", async ({ page }) => {
    await mockWorkspace(page);
    await page.goto("/workspace");
    await expect(page.getByRole("heading", { name: "项目工作区" })).toBeVisible();
    await expect(page.getByRole("link", { name: "客户数据后台" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
    await expect(page.locator("[data-site-announcement]")).toHaveCount(0);
  });

  test("shows delivery readiness, immutable history, generation and export actions", async ({ page }) => {
    await mockWorkspace(page);
    await page.goto(`/workspace/${projectId}`);
    await expect(page.getByRole("heading", { name: "客户数据后台" })).toBeVisible();
    const readiness = page.getByLabel("交付准备轨");
    for (const label of ["目标与受众", "技术栈", "页面清单", "必要状态", "风格方向"]) {
      await expect(readiness.getByText(label, { exact: true })).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "生成 Next.js 工程" })).toBeEnabled();
    await expect(page.getByRole("button", { name: "恢复为新版本" })).toHaveCount(2);
    await expect(page.getByRole("button", { name: "创建并下载 ZIP" })).toBeVisible();
    await expect(page.getByRole("link", { name: "查看原 Showcase" })).toHaveAttribute("href", "/styles/neo-brutalist/showcase");
  });

  test("saves and restores by creating new immutable revision numbers", async ({ page }) => {
    await mockWorkspaceLifecycle(page);
    await page.goto(`/workspace/${projectId}`);

    await page.getByLabel("本次修改说明（可选）").fill("浏览器保存");
    await page.getByRole("button", { name: "保存新版本" }).click();
    await expect(page.getByText("版本 v3 已保存")).toBeVisible();
    await expect(page.getByText("当前 v3")).toBeVisible();

    page.on("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "恢复为新版本" }).last().click();
    await expect(page.getByText("已从 v1 创建恢复版本 v4")).toBeVisible();
    await expect(page.getByText("当前 v4")).toBeVisible();
    await expect(page.getByText("v1", { exact: true })).toBeVisible();
  });

  test("generates a new revision and downloads its recorded ZIP export", async ({ page }) => {
    await mockWorkspaceLifecycle(page);
    await page.goto(`/workspace/${projectId}`);

    await page.getByRole("button", { name: "生成 Next.js 工程" }).click();
    await expect(page.getByText("已生成 v3：20 个 Next.js 文件")).toBeVisible();
    await expect(page.getByText("当前 v3")).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "创建并下载 ZIP" }).first().click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("customer-dashboard-nextjs.zip");
  });
});
