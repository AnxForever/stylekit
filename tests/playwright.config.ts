import { defineConfig, devices } from "@playwright/test";

const LOCAL_NO_PROXY_HOSTS = ["127.0.0.1", "localhost"];
const existingNoProxy = process.env.NO_PROXY || process.env.no_proxy || "";
const noProxyHosts = new Set(
  existingNoProxy
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean)
);
for (const host of LOCAL_NO_PROXY_HOSTS) {
  noProxyHosts.add(host);
}
process.env.NO_PROXY = [...noProxyHosts].join(",");
process.env.no_proxy = process.env.NO_PROXY;

const BASE_URL = process.env.BASE_URL || "http://localhost:3187";
const PLAYWRIGHT_CHANNEL = process.env.PLAYWRIGHT_CHANNEL;
const WEB_SERVER_PORT = new URL(BASE_URL).port || "80";

// The workspace has no external auth dependency in browser tests. Keep the
// local mock user and password-session secret confined to the Playwright
// process; the authenticated projects still prove that their pages are
// reached with the same cookies a real browser would send.
process.env.NEXT_PUBLIC_DEV_MOCK_USER = "true";
process.env.PLAYWRIGHT_E2E_MOCK_USER = "true";
process.env.ADMIN_PASSWORD = "playwright-e2e-admin-password";
process.env.ADMIN_SESSION_SECRET =
  "playwright-e2e-session-secret-change-me-in-tests-only";

const WEB_SERVER_COMMAND =
  process.env.PLAYWRIGHT_WEB_SERVER_COMMAND ||
  (process.env.CI
    ? `pnpm exec next start -p ${WEB_SERVER_PORT}`
    : `pnpm exec next dev -p ${WEB_SERVER_PORT}`);

const ADMIN_STORAGE_STATE = ".tmp/playwright/admin-auth.json";
const WORKSPACE_STORAGE_STATE = ".tmp/playwright/workspace-auth.json";

const PROTECTED_SPECS = [
  "**/admin-operations-smoke.spec.ts",
  "**/admin-visual-lab.spec.ts",
  "**/corporate-clean-saas-pack.spec.ts",
  "**/workspace.spec.ts",
];
const VISUAL_SPECS = ["**/approved-preview-visual.spec.ts"];
const SETUP_SPECS = ["**/auth.setup.ts"];

const publicTestIgnore = [...PROTECTED_SPECS, ...VISUAL_SPECS, ...SETUP_SPECS];
const authSetup = {
  name: "auth-setup",
  testMatch: SETUP_SPECS,
};

const desktop = {
  ...devices["Desktop Chrome"],
  ...(PLAYWRIGHT_CHANNEL ? { channel: PLAYWRIGHT_CHANNEL } : {}),
};
const mobile = {
  ...devices["Pixel 5"],
  ...(PLAYWRIGHT_CHANNEL ? { channel: PLAYWRIGHT_CHANNEL } : {}),
};

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  updateSnapshots: "none",
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    authSetup,
    {
      name: "public-chromium",
      testIgnore: publicTestIgnore,
      use: {
        ...desktop,
      },
    },
    {
      name: "public-mobile-chrome",
      testIgnore: publicTestIgnore,
      use: {
        ...mobile,
      },
    },
    {
      name: "admin-chromium",
      dependencies: ["auth-setup"],
      testMatch: PROTECTED_SPECS.slice(0, 3),
      use: {
        ...desktop,
        storageState: ADMIN_STORAGE_STATE,
      },
    },
    {
      name: "admin-mobile-chrome",
      dependencies: ["auth-setup"],
      testMatch: PROTECTED_SPECS.slice(0, 3),
      use: {
        ...mobile,
        storageState: ADMIN_STORAGE_STATE,
      },
    },
    {
      name: "workspace-chromium",
      dependencies: ["auth-setup"],
      testMatch: [PROTECTED_SPECS[3]],
      use: {
        ...desktop,
        storageState: WORKSPACE_STORAGE_STATE,
      },
    },
    {
      name: "workspace-mobile-chrome",
      dependencies: ["auth-setup"],
      testMatch: [PROTECTED_SPECS[3]],
      use: {
        ...mobile,
        storageState: WORKSPACE_STORAGE_STATE,
      },
    },
    {
      // Keep the historical names so approved-preview snapshot paths remain
      // compatible with the checked-in chromium and mobile-chrome baselines.
      name: "chromium",
      testMatch: VISUAL_SPECS,
      use: {
        ...desktop,
        colorScheme: "light",
        locale: "zh-CN",
        reducedMotion: "reduce",
      },
    },
    {
      name: "mobile-chrome",
      testMatch: VISUAL_SPECS,
      use: {
        ...mobile,
        colorScheme: "light",
        locale: "zh-CN",
        reducedMotion: "reduce",
      },
    },
  ],
  webServer: {
    command: WEB_SERVER_COMMAND,
    cwd: process.cwd(),
    url: BASE_URL,
    reuseExistingServer: process.env.PLAYWRIGHT_REUSE_SERVER === "true",
  },
});
