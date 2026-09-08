import { expect, test as setup } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const ADMIN_STORAGE_STATE = ".tmp/playwright/admin-auth.json";
const WORKSPACE_STORAGE_STATE = ".tmp/playwright/workspace-auth.json";

setup("create authenticated browser states", async ({ playwright, request }) => {
  await mkdir(".tmp/playwright", { recursive: true });

  const response = await request.post("/api/admin/auth", {
    data: { password: "playwright-e2e-admin-password" },
  });
  expect(response, "the local admin password session should be available").toBeOK();
  await request.storageState({ path: ADMIN_STORAGE_STATE });

  // Workspace authentication is provided by the development-only mock user
  // configured by tests/playwright.config.ts. Use a separate request context
  // so its intentionally empty state cannot inherit the admin cookie above.
  const workspaceRequest = await playwright.request.newContext({
    baseURL: process.env.BASE_URL || "http://localhost:3187",
  });
  try {
    await workspaceRequest.storageState({ path: WORKSPACE_STORAGE_STATE });
  } finally {
    await workspaceRequest.dispose();
  }
});
