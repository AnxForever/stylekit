import { describe, expect, it } from "vitest";
import { createFavoritesState, favoritesStateReducer } from "../state";

describe("favorite mutation state", () => {
  it("keeps the newest desired state visible when an older request confirms first", () => {
    let state = createFavoritesState("user:a");
    state = favoritesStateReducer(state, { type: "scope-loaded", scopeKey: "user:a", favorites: [] });
    state = favoritesStateReducer(state, {
      type: "intent", scopeKey: "user:a", slug: "glassmorphism", requestId: 1, desired: true,
    });
    state = favoritesStateReducer(state, {
      type: "intent", scopeKey: "user:a", slug: "glassmorphism", requestId: 2, desired: false,
    });

    state = favoritesStateReducer(state, {
      type: "acknowledged", scopeKey: "user:a", slug: "glassmorphism", requestId: 1, desired: true,
    });

    expect(state.confirmed).toEqual(["glassmorphism"]);
    expect(state.favorites).toEqual([]);
    expect(state.pending.glassmorphism).toEqual({ requestId: 2, desired: false });
  });

  it("rejects stale reads after an account scope has changed", () => {
    const accountB = favoritesStateReducer(
      createFavoritesState("user:a"),
      { type: "scope-started", scopeKey: "user:b", syncing: true },
    );

    const stale = favoritesStateReducer(accountB, {
      type: "scope-loaded", scopeKey: "user:a", favorites: ["neo-brutalist"],
    });

    expect(stale).toBe(accountB);
    expect(stale.favorites).toEqual([]);
    expect(stale.scopeKey).toBe("user:b");
  });

  it("keeps an in-memory anonymous favorite visible when storage rejects it", () => {
    let state = favoritesStateReducer(
      createFavoritesState("anonymous"),
      { type: "scope-loaded", scopeKey: "anonymous", favorites: ["editorial"] },
    );
    state = favoritesStateReducer(state, {
      type: "anonymous-updated", scopeKey: "anonymous", slug: "glassmorphism",
      requestId: 3, desired: true, favorites: ["editorial", "glassmorphism"], persisted: false,
    });

    expect(state.confirmed).toEqual(["editorial"]);
    expect(state.favorites).toEqual(["editorial", "glassmorphism"]);
    expect(state.errors.glassmorphism).toMatchObject({ desired: true, kind: "local-storage" });

    state = favoritesStateReducer(state, {
      type: "anonymous-updated", scopeKey: "anonymous", slug: "glassmorphism",
      requestId: 4, desired: true, favorites: ["editorial", "glassmorphism"], persisted: true,
    });

    expect(state.confirmed).toEqual(["editorial", "glassmorphism"]);
    expect(state.favorites).toEqual(state.confirmed);
    expect(state.errors).toEqual({});
  });

  it("rolls a failed authenticated intent back and records the exact retry target", () => {
    let state = favoritesStateReducer(
      createFavoritesState("user:a"),
      { type: "scope-loaded", scopeKey: "user:a", favorites: [] },
    );
    state = favoritesStateReducer(state, {
      type: "intent", scopeKey: "user:a", slug: "glassmorphism", requestId: 7, desired: true,
    });
    state = favoritesStateReducer(state, {
      type: "mutation-failed", scopeKey: "user:a", slug: "glassmorphism", requestId: 7, desired: true,
    });

    expect(state.favorites).toEqual([]);
    expect(state.errors.glassmorphism).toMatchObject({ requestId: 7, desired: true, kind: "mutation" });
  });
});
