import { spawnSync } from "node:child_process";

const args = ["--no-install", "playwright", "test", ...process.argv.slice(2)];

const result = spawnSync("npx", args, {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    PLAYWRIGHT_CHANNEL: "chrome",
  },
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
