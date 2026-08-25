/**
 * Walks the Feishu QR registration flow and prints credentials.
 *
 * The alternative is opening the developer console, creating a self-built app,
 * ticking permission scopes one at a time, and copying two secrets out. This
 * prints a URL, you scan it, and the credentials land in your terminal — which
 * is also why the setup guide for this bot is three lines long.
 *
 * `addons` pre-fills the confirm page, so the same scan that creates the app
 * also grants what the bot needs. Two caveats from the SDK's own docs: unknown
 * item names are dropped silently by the confirm page, and the whole parameter
 * is ignored unless the tenant has the extra-config gray-scale enabled. Either
 * way the confirm page is the source of truth — read what it lists before
 * approving, and grant anything missing in the developer console.
 */

import { registerApp, type RegisterAppOptions } from "@larksuite/channel";

type AppAddons = NonNullable<RegisterAppOptions["addons"]>;

const APP_PRESET = {
  name: "StyleKit 设计风格助手",
  desc: "把一句话需求变成 StyleKit 设计风格、成品 AI 提示词，并对写回来的代码做风格合规体检。",
} as const;

const ADDONS: AppAddons = {
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
};

async function main(): Promise<void> {
  console.log("正在向飞书申请注册二维码...\n");

  const credentials = await registerApp({
    appPreset: APP_PRESET,
    addons: ADDONS,
    createOnly: true,
    onQRCodeReady: ({ url, expireIn }) => {
      console.log("┌─ 用飞书扫这个链接 ─────────────────────────────");
      console.log(`│ ${url}`);
      console.log(`└─ ${expireIn} 秒内有效 ─────────────────────────────\n`);
      console.log("  扫码后请核对确认页列出的权限，缺什么在开放平台补。\n");
    },
    onStatusChange: (info) => {
      console.log(`  状态: ${info.status}`);
    },
  });

  console.log("\n✅ 注册完成。把下面两行写进 packages/feishu/.env：\n");
  console.log(`FEISHU_APP_ID=${credentials.client_id}`);
  console.log(`FEISHU_APP_SECRET=${credentials.client_secret}`);
  console.log("\n然后 pnpm --filter stylekit-feishu dev 启动机器人。");
}

main().catch((error: unknown) => {
  console.error("\n❌ 注册失败:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
