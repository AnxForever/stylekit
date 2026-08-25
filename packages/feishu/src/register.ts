/**
 * Walks the Feishu QR registration flow and prints credentials.
 *
 * History matters here. The SDK's `registerApp` was used first, but its
 * default registration host (open.feishu.cn) now answers 404 on the
 * device-flow endpoint, and every failed poll kills the whole run — five
 * attempts died with TLS resets mid-poll on a flaky link. This file speaks
 * the same device-flow protocol (RFC 8628 style) directly:
 *
 * - begin/poll against accounts.feishu.cn, the host that is actually
 *   serving the endpoint (probed 10 polls / 0 failures over 40s)
 * - every failed poll is retried with backoff instead of aborting
 * - if polls fail too many times in a row, the whole flow re-begins with a
 *   fresh QR link rather than dying
 *
 * The QR link still lands on open.feishu.cn/page/launcher, so the scan UX is
 * unchanged. `addons` is encoded the same way the SDK does it (gzip +
 * base64url), so the confirm page still pre-fills the scopes the bot needs.
 */

import { gzipSync } from "node:zlib";
import { setTimeout as delay } from "node:timers/promises";

const REGISTRATION_HOST =
  process.env.FEISHU_REGISTRATION_DOMAIN?.trim() || "accounts.feishu.cn";
const REGISTRATION_ENDPOINT = `https://${REGISTRATION_HOST}/oauth/v1/app/registration`;

const APP_PRESET = {
  name: "StyleKit 设计风格助手",
  desc: "把一句话需求变成 StyleKit 设计风格、成品 AI 提示词，并对写回来的代码做风格合规体检。",
} as const;

const ADDONS = {
  scopes: {
    tenant: [
      // Reply in chats as the bot.
      "im:message:send_as_bot",
      // Download images the user drops in as reference material.
      "im:resource",
      // Write the chosen style, palette, and prompt back to a Base table.
      "bitable:app",
      // Emit the design-spec handoff doc.
      "docx:document",
      "drive:drive",
    ],
  },
  events: {
    items: {
      tenant: ["im.message.receive_v1"],
    },
  },
  callbacks: {
    items: ["card.action.trigger"],
  },
} as const;

interface BeginResponse {
  device_code: string;
  verification_uri_complete: string;
  expires_in?: number;
  interval?: number;
}

interface PollResponse {
  client_id?: string;
  client_secret?: string;
  error?: string;
}

class RegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RegistrationError";
  }
}

/** gzip → base64url, identical to the SDK's encodeAddons. */
function encodeAddons(value: unknown): string {
  return gzipSync(Buffer.from(JSON.stringify(value), "utf8"))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function post(params: Record<string, string>): Promise<unknown> {
  const response = await fetch(REGISTRATION_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params).toString(),
    signal: AbortSignal.timeout(20_000),
  });
  const text = await response.text();
  if (!response.ok) {
    // RFC 8628 style: errors ride on non-2xx statuses as JSON.
    try {
      const parsed = JSON.parse(text) as { error?: string };
      if (parsed.error) return parsed;
    } catch {
      // fall through
    }
    throw new RegistrationError(
      `Registration endpoint returned HTTP ${response.status}.`,
    );
  }
  return JSON.parse(text) as unknown;
}

function buildQrUrl(begin: BeginResponse): string {
  const url = new URL(begin.verification_uri_complete);
  url.searchParams.set("from", "sdk");
  url.searchParams.set("source", "node-sdk");
  url.searchParams.set("tp", "sdk");
  if (APP_PRESET.name) url.searchParams.set("name", APP_PRESET.name);
  if (APP_PRESET.desc) url.searchParams.set("desc", APP_PRESET.desc);
  url.searchParams.set("addons", encodeAddons(ADDONS));
  url.searchParams.set("createOnly", "true");
  return url.toString();
}

function printQr(url: string, expireIn: number): void {
  console.log("┌─ 用飞书扫这个链接 ─────────────────────────────");
  console.log(`│ ${url}`);
  console.log(`└─ ${expireIn} 秒内有效 ─────────────────────────────\n`);
  console.log("  扫码后请核对确认页列出的权限，缺什么在开放平台补。\n");
}

async function begin(): Promise<BeginResponse> {
  const payload = (await post({
    action: "begin",
    archetype: "PersonalAgent",
    auth_method: "client_secret",
    request_user_info: "open_id",
  })) as BeginResponse;
  if (!payload.device_code || !payload.verification_uri_complete) {
    throw new RegistrationError("Registration begin returned no device code.");
  }
  return payload;
}

async function pollUntilDone(
  deviceCode: string,
  initialIntervalMs: number,
): Promise<{ client_id: string; client_secret: string }> {
  let intervalMs = Math.max(initialIntervalMs, 4_000);
  let consecutiveFailures = 0;

  while (true) {
    try {
      const payload = (await post({
        action: "poll",
        device_code: deviceCode,
      })) as PollResponse;

      consecutiveFailures = 0;

      if (payload.client_id && payload.client_secret) {
        return { client_id: payload.client_id, client_secret: payload.client_secret };
      }

      switch (payload.error) {
        case "authorization_pending":
          console.log("  状态: 等待扫码…");
          break;
        case "slow_down":
          intervalMs += 5_000;
          console.log(`  状态: 服务器要求降速，间隔调整为 ${intervalMs / 1000}s`);
          break;
        case "access_denied":
          throw new RegistrationError("扫码被拒绝。请重跑并重新扫码。");
        case "expired_token":
          throw new RegistrationError("二维码已过期。请重跑拿新码。");
        default:
          if (payload.error) {
            throw new RegistrationError(`Registration failed: ${payload.error}`);
          }
      }
    } catch (error) {
      if (error instanceof RegistrationError) throw error;

      consecutiveFailures += 1;
      console.log(
        `  ⚠️ 网络抖动（${error instanceof Error ? error.message.slice(0, 60) : String(error)}），重试中…`,
      );
      if (consecutiveFailures >= 10) {
        throw new RegistrationError("Polling kept failing; giving up this run.");
      }
    }

    await delay(intervalMs);
  }
}

async function main(): Promise<void> {
  console.log(`正在向飞书申请注册二维码（经 ${REGISTRATION_HOST}）…\n`);

  for (let attempt = 1; attempt <= 5; attempt++) {
    if (attempt > 1) console.log(`\n── 第 ${attempt} 次重新申请 ──\n`);

    const beginResponse = await begin();
    const expireIn = beginResponse.expires_in ?? 600;
    const qrUrl = buildQrUrl(beginResponse);
    printQr(qrUrl, expireIn);
    console.log("  状态: 已就绪，等待扫码");

    try {
      const credentials = await pollUntilDone(
        beginResponse.device_code,
        (beginResponse.interval ?? 5) * 1000,
      );

      console.log("\n✅ 注册完成。把下面两行写进 packages/feishu/.env：\n");
      console.log(`FEISHU_APP_ID=${credentials.client_id}`);
      console.log(`FEISHU_APP_SECRET=${credentials.client_secret}`);
      console.log("\n然后 pnpm --filter stylekit-feishu dev 启动机器人。");
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isExpired =
        /expired|过期|Polling kept failing|giving up/i.test(message);
      if (!isExpired || attempt === 5) {
        throw error;
      }
      console.log(`\n⚠️ ${message}`);
      await delay(2_000);
    }
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error("\n❌ 注册失败:", message);
  console.error(
    "\n可以走手动路径：去 open.feishu.cn 创建自建应用，把 appId/appSecret 填进 packages/feishu/.env。",
  );
  process.exitCode = 1;
});
