import { expect, test } from "@playwright/test";

// The bridge is the tool interface, not a fixture of the test: the same
// snapshot/act calls an agent would make are what the spec asserts on.
test("admin-panel demo runs its agent self-check and can be driven by label", async ({
  page,
}) => {
  await page.goto("/templates/admin-panel?agent-check=1");

  const panel = page.getByTestId("agent-check-panel");
  await expect(panel).toBeVisible();
  await expect(page.getByTestId("agent-check-status")).toHaveText("PASS");
  await expect(panel.getByText("关闭弹窗")).toBeVisible();

  const acted = await page.evaluate(async () => {
    const agent = (
      window as unknown as {
        __uiAgent?: {
          act: (input: {
            steps: { ref: string; action: string; args: unknown[] }[];
          }) => Promise<{ ok: boolean }>;
        };
      }
    ).__uiAgent;
    if (!agent) return false;
    const result = await agent.act({
      steps: [
        { ref: "Filter by status", action: "setValue", args: ["Suspended"] },
      ],
    });
    return result.ok;
  });

  expect(acted).toBe(true);
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await expect(
    page.getByRole("combobox", { name: "Filter by status" })
  ).toContainText("Suspended");
});

// The model is in the loop here: the page sends its bridge snapshot to the
// route, the route resolves the plan against that same snapshot, and the page
// executes it and checks the result. With no provider key configured the
// route falls back to the replay plan, so the spec exercises the whole path
// without a network call to a model.
test("admin-panel demo executes a model plan through the bridge", async ({
  page,
}) => {
  await page.goto("/templates/admin-panel?agent-check=1");

  const panel = page.getByTestId("agent-check-panel");
  await expect(page.getByTestId("agent-check-status")).toHaveText("PASS");

  await page.getByTestId("agent-ai-run").click();

  await expect(page.getByTestId("agent-ai-status")).toHaveText("PASS");
  await expect(
    panel.getByText(/replay \/ fixture · AI 1 步 \/ 人写 5 步/)
  ).toBeVisible();
  await expect(panel.getByText(/Replay plan/)).toBeVisible();

  // The plan ran, was verified, and the page was restored afterwards.
  await expect(page.locator("tbody tr")).toHaveCount(6);
  await expect(
    page.getByRole("combobox", { name: "Filter by status" })
  ).toContainText("All");
});
