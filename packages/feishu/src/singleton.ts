/**
 * One instance only.
 *
 * Feishu splits events for one app across its WebSocket connections. A second
 * instance of this bot makes both useless — one receives events the other
 * should have gotten, and both think they are healthy. This lock makes the
 * mistake impossible instead of debuggable.
 */

import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const lockDir = resolve(fileURLToPath(new URL("../..", import.meta.url)), ".run");
const lockPath = resolve(lockDir, "bot.lock");

export function acquireSingletonLock(): void {
  mkdirSync(lockDir, { recursive: true });

  if (existsSync(lockPath)) {
    const pid = readFileSync(lockPath, "utf8").trim();
    try {
      process.kill(Number(pid), 0);
      throw new Error(
        `Another bot instance is already running (pid ${pid}). ` +
          `Feishu splits events across connections, so running two makes ` +
          `both unreliable. Stop it first.`,
      );
    } catch (error) {
      if (error instanceof Error && error.message.includes("already running")) {
        throw error;
      }
      // PID is stale — fall through and take the lock.
    }
  }

  writeFileSync(lockPath, String(process.pid), "utf8");

  const release = (): void => {
    try {
      unlinkSync(lockPath);
    } catch {
      // Already gone.
    }
  };
  process.on("exit", release);
  process.on("SIGINT", release);
  process.on("SIGTERM", release);
}
