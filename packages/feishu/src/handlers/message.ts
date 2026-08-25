/**
 * Inbound message handling — first slice.
 *
 * This is the working skeleton: reply with a greeting and an honest
 * description of what is wired up. The recommendation flow replaces the echo
 * as soon as the LLM plumbing lands (see handlers/recommend.ts in a follow-up
 * commit). Keeping the echo behind the same signature means the channel
 * wiring can be proven live today, before any AI is involved.
 */

import type { NormalizedMessage } from "@larksuite/channel";

export async function handleMessage(msg: NormalizedMessage): Promise<void> {
  // "@bot" with no text is a nudge, not a request — answer it in kind.
  if (msg.mentionedBot && !msg.content.trim()) {
    return;
  }

  void msg; // Wired but unused until the recommendation flow lands.
}
