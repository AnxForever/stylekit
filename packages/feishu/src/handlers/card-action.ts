/**
 * Card button callbacks — first slice.
 *
 * The card flow itself lands with the recommendation handler; this file
 * exists so the channel wires `card.action.trigger` from day one and the
 * handler signature is stable.
 */

import type { CardActionEvent, CardActionResponse } from "@larksuite/channel";

export async function handleCardAction(
  event: CardActionEvent,
): Promise<CardActionResponse | undefined> {
  void event;
  return undefined;
}
