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

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3187";
const PLAYWRIGHT_CHANNEL = process.env.PLAYWRIGHT_CHANNEL;
const WEB_SERVER_PORT = new URL(BASE_URL).port || "80";
const WEB_SERVER_COMMAND =
  process.env.PLAYWRIGHT_WEB_SERVER_COMMAND ||
  (process.env.CI
    ? `pnpm exec next start -p ${WEB_SERVER_PORT}`
    : `pnpm exec next dev -p ${WEB_SERVER_PORT}`);

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
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(PLAYWRIGHT_CHANNEL ? { channel: PLAYWRIGHT_CHANNEL } : {}),
      },
    },
    {
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 5"],
        ...(PLAYWRIGHT_CHANNEL ? { channel: PLAYWRIGHT_CHANNEL } : {}),
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
