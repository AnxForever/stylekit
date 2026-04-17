/**
 * Long-term user memory for the agent.
 *
 * Current: in-memory Map (ephemeral, lost on server restart).
 * Future: SupabaseMemoryStore backed by an agent_user_memory table.
 *
 * The MemoryStore interface decouples callers from storage, so switching
 * backends later is a one-line change in the factory.
 */

import type { AgentConsultPhase } from "./types";

/* ---------- Types ---------- */

/** Summary of a past session used for recommendations + Reflexion. */
export interface SessionFootprint {
  sessionId: string;
  completedAt: string;
  productType: string;
  styleSlug: string;
  reachedDone: boolean;
}

/** Per-user persistent memory. */
export interface UserMemory {
  userId: string;
  /** Style slugs the user picked in previous sessions, most recent first. */
  preferredStyleSlugs: string[];
  /** Product types they've worked on (portfolio / saas / blog / ...). */
  recentProductTypes: string[];
  /** Total sessions this user has run. */
  totalSessions: number;
  /** ISO timestamp of last interaction. */
  lastSeenAt: string;
  /** Compact footprint of last few sessions for Reflexion input. */
  recentSessions: SessionFootprint[];
  /** Optional notes the user wrote themselves (future UX). */
  userNotes?: string[];
}

/** Events that can update memory. */
export interface SessionCompletionEvent {
  sessionId: string;
  userId: string;
  productType: string;
  styleSlug: string;
  finalPhase: AgentConsultPhase;
}

/* ---------- Store interface ---------- */

export interface MemoryStore {
  getUserMemory(userId: string): Promise<UserMemory | null>;
  recordSession(event: SessionCompletionEvent): Promise<void>;
  /** Optional: direct upsert for admin / migration. */
  upsertUserMemory?(memory: UserMemory): Promise<void>;
  /** For tests / eval reset. Not in production interface. */
  clear?(): Promise<void>;
}

/* ---------- Helpers ---------- */

const MAX_PREFERRED_STYLES = 5;
const MAX_PRODUCT_TYPES = 5;
const MAX_RECENT_SESSIONS = 10;

function dedupePrepend<T>(list: readonly T[], item: T, cap: number): T[] {
  const filtered = list.filter((v) => v !== item);
  return [item, ...filtered].slice(0, cap);
}

/* ---------- In-memory implementation (used now) ---------- */

export class InMemoryMemoryStore implements MemoryStore {
  private readonly memories = new Map<string, UserMemory>();

  async getUserMemory(userId: string): Promise<UserMemory | null> {
    return this.memories.get(userId) ?? null;
  }

  async recordSession(event: SessionCompletionEvent): Promise<void> {
    const existing = this.memories.get(event.userId);
    const now = new Date().toISOString();
    const footprint: SessionFootprint = {
      sessionId: event.sessionId,
      completedAt: now,
      productType: event.productType,
      styleSlug: event.styleSlug,
      reachedDone: event.finalPhase === "done",
    };

    const next: UserMemory = existing
      ? {
          userId: event.userId,
          preferredStyleSlugs: event.styleSlug
            ? dedupePrepend(existing.preferredStyleSlugs, event.styleSlug, MAX_PREFERRED_STYLES)
            : existing.preferredStyleSlugs,
          recentProductTypes: event.productType
            ? dedupePrepend(existing.recentProductTypes, event.productType, MAX_PRODUCT_TYPES)
            : existing.recentProductTypes,
          totalSessions: existing.totalSessions + 1,
          lastSeenAt: now,
          recentSessions: [footprint, ...existing.recentSessions].slice(0, MAX_RECENT_SESSIONS),
          userNotes: existing.userNotes,
        }
      : {
          userId: event.userId,
          preferredStyleSlugs: event.styleSlug ? [event.styleSlug] : [],
          recentProductTypes: event.productType ? [event.productType] : [],
          totalSessions: 1,
          lastSeenAt: now,
          recentSessions: [footprint],
        };

    this.memories.set(event.userId, next);
  }

  async upsertUserMemory(memory: UserMemory): Promise<void> {
    this.memories.set(memory.userId, memory);
  }

  async clear(): Promise<void> {
    this.memories.clear();
  }
}

/* ---------- Supabase interface (placeholder for future) ----------
 *
 * When we're ready to persist memory across server restarts, implement
 * this class against an `agent_user_memory` table:
 *
 *   CREATE TABLE agent_user_memory (
 *     user_id TEXT PRIMARY KEY,
 *     preferred_style_slugs TEXT[] NOT NULL DEFAULT '{}',
 *     recent_product_types TEXT[] NOT NULL DEFAULT '{}',
 *     total_sessions INTEGER NOT NULL DEFAULT 0,
 *     last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *     recent_sessions JSONB NOT NULL DEFAULT '[]',
 *     user_notes TEXT[],
 *     updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
 *   );
 *
 * And replace the factory's default below.
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
export class SupabaseMemoryStore implements MemoryStore {
  async getUserMemory(_userId: string): Promise<UserMemory | null> {
    throw new Error("SupabaseMemoryStore not implemented yet. Use InMemoryMemoryStore or implement this class first.");
  }
  async recordSession(_event: SessionCompletionEvent): Promise<void> {
    throw new Error("SupabaseMemoryStore not implemented yet.");
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */

/* ---------- Module singleton ---------- */

let defaultStore: MemoryStore = new InMemoryMemoryStore();

export function getMemoryStore(): MemoryStore {
  return defaultStore;
}

/** Replace the default store (tests + future Supabase swap). */
export function setMemoryStore(store: MemoryStore): void {
  defaultStore = store;
}
