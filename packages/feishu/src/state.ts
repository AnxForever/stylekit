/**
 * Per-chat memory.
 *
 * The compliance check needs to know which style a chat is working in, and
 * that comes from the last recommendation the chat accepted. A tiny in-memory
 * store keyed by chat id keeps the loop closed without any database.
 */

interface ChatMemory {
  lastSlug?: string;
  lastBrief?: string;
  lastIntent?: import("./planner/index.js").StyleIntent;
  /** Base record written by the delivery flow, so results can be patched in. */
  lastRecordId?: string;
  /** Auto-created Base coordinates, so compliance write-backs know where to go. */
  baseToken?: string;
  tableId?: string;
  updatedAt: number;
}

export class ChatStore {
  private readonly chats = new Map<string, ChatMemory>();

  remember(chatId: string, patch: Partial<ChatMemory>): void {
    const current = this.chats.get(chatId) ?? { updatedAt: 0 };
    this.chats.set(chatId, {
      ...current,
      ...patch,
      updatedAt: Date.now(),
    });
  }

  get(chatId: string): ChatMemory | undefined {
    return this.chats.get(chatId);
  }

  /** Remembers auto-created Base coordinates for a chat. */
  rememberBase(chatId: string, baseToken: string, tableId: string): void {
    const current = this.chats.get(chatId) ?? { updatedAt: 0 };
    this.chats.set(chatId, { ...current, baseToken, tableId, updatedAt: Date.now() });
  }

  /** Drops a chat's memory when the style was changed. */
  forgetStyle(chatId: string): void {
    const current = this.chats.get(chatId);
    if (!current) return;
    this.chats.set(chatId, { updatedAt: Date.now() });
  }
}
