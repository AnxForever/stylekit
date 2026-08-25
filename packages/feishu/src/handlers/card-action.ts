/**
 * Card button callbacks.
 *
 * Selection and reroll are both heavy flows, so the handler returns a toast
 * immediately and detaches the real work — the SDK warns that a slow handler
 * delays the click response and can blow the platform callback timeout.
 */

import type { CardActionEvent, CardActionResponse } from "@larksuite/channel";
import type { BotContext } from "../bot.js";
import { isCardButtonValue } from "../cards.js";
import { runDeliverFlow } from "../flows/deliver.js";
import { runRecommendFlow } from "../flows/recommend.js";

export async function handleCardAction(
  ctx: BotContext,
  event: CardActionEvent,
): Promise<CardActionResponse | undefined> {
  const value = event.action?.value;
  if (!isCardButtonValue(value)) return undefined;

  const memory = ctx.store.get(event.chatId);

  switch (value.action) {
    case "select_style": {
      const intent = memory?.lastIntent;
      const slug = value.slug;
      if (!intent || !slug) {
        return {
          toast: { type: "error", content: "会话状态丢了，重新发一次需求吧" },
        };
      }
      void runDeliverFlow(ctx, event.chatId, intent, slug).catch((error) => {
        console.error(
          "[stylekit-feishu] deliver flow failed:",
          error instanceof Error ? error.message : error,
        );
      });
      return { toast: { type: "info", content: "正在生成工程包并写入飞书…" } };
    }

    case "reroll": {
      const brief = memory?.lastBrief;
      if (!brief) {
        return {
          toast: { type: "error", content: "会话状态丢了，重新发一次需求吧" },
        };
      }
      void runRecommendFlow(ctx, event.chatId, brief).catch((error) => {
        console.error(
          "[stylekit-feishu] reroll failed:",
          error instanceof Error ? error.message : error,
        );
      });
      return { toast: { type: "info", content: "重新推荐中…" } };
    }

    default:
      return undefined;
  }
}
