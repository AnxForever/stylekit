/**
 * Environment loading for the bot.
 *
 * Secrets live in packages/feishu/.env and are never committed. The file is
 * read from the package root regardless of the caller's cwd, so the bot can be
 * launched from anywhere inside the repo.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export interface FeishuConfig {
  appId: string;
  appSecret: string;
}

function parseEnvFile(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return out;
  }
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const packageRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const fromFile = parseEnvFile(resolve(packageRoot, ".env"));

function required(name: string): string {
  const value = process.env[name] ?? fromFile[name];
  if (!value?.trim()) {
    throw new Error(
      `Missing ${name}. Run "pnpm --filter stylekit-feishu register", ` +
        `then put the printed FEISHU_APP_ID / FEISHU_APP_SECRET into ` +
        `packages/feishu/.env`,
    );
  }
  return value.trim();
}

export function loadFeishuConfig(): FeishuConfig {
  return {
    appId: required("FEISHU_APP_ID"),
    appSecret: required("FEISHU_APP_SECRET"),
  };
}
