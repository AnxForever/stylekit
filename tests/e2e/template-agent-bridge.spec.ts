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
