export type FavoriteScopeKey = string;

export interface FavoritePendingChange {
  requestId: number;
  desired: boolean;
}

export interface FavoriteStateError extends FavoritePendingChange {
  kind: "sync" | "mutation" | "local-storage";
}

export interface FavoritesState {
  scopeKey: FavoriteScopeKey;
  confirmed: string[];
  favorites: string[];
  syncing: boolean;
  syncError: boolean;
  pending: Record<string, FavoritePendingChange>;
  errors: Record<string, FavoriteStateError>;
}

export type FavoritesStateEvent =
  | { type: "scope-started"; scopeKey: FavoriteScopeKey; syncing: boolean }
  | { type: "scope-loaded"; scopeKey: FavoriteScopeKey; favorites: string[] }
  | { type: "scope-failed"; scopeKey: FavoriteScopeKey }
  | { type: "retry-sync"; scopeKey: FavoriteScopeKey }
  | { type: "intent"; scopeKey: FavoriteScopeKey; slug: string; requestId: number; desired: boolean }
  | { type: "acknowledged"; scopeKey: FavoriteScopeKey; slug: string; requestId: number; desired: boolean }
  | { type: "reconciled"; scopeKey: FavoriteScopeKey; favorites: string[] }
  | { type: "mutation-failed"; scopeKey: FavoriteScopeKey; slug: string; requestId: number; desired: boolean }
  | { type: "anonymous-updated"; scopeKey: "anonymous"; slug: string; favorites: string[]; requestId: number; desired: boolean; persisted: boolean };

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function normalizeFavorites(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  const seen = new Set<string>();
  const normalized: string[] = [];
  for (const value of values) {
    if (typeof value !== "string") continue;
    const slug = value.trim();
    if (!SLUG_RE.test(slug) || seen.has(slug)) continue;
    seen.add(slug);
    normalized.push(slug);
  }
  return normalized;
}

export function setFavoriteValue(values: readonly string[], slug: string, desired: boolean): string[] {
  const next = new Set(values);
  if (desired) next.add(slug);
  else next.delete(slug);
  return [...next];
}

function applyPending(
  confirmed: readonly string[],
  pending: Readonly<Record<string, FavoritePendingChange>>,
): string[] {
  let visible = [...confirmed];
  for (const [slug, change] of Object.entries(pending)) {
    visible = setFavoriteValue(visible, slug, change.desired);
  }
  return visible;
}

export function createFavoritesState(scopeKey: FavoriteScopeKey = "anonymous"): FavoritesState {
  return {
    scopeKey,
    confirmed: [],
    favorites: [],
    syncing: false,
    syncError: false,
    pending: {},
    errors: {},
  };
}

/** Keep the confirmed store, visible intent, and retryable failures separate. */
export function favoritesStateReducer(
  state: FavoritesState,
  event: FavoritesStateEvent,
): FavoritesState {
  if (event.type === "scope-started") {
    return { ...createFavoritesState(event.scopeKey), syncing: event.syncing };
  }
  if (event.scopeKey !== state.scopeKey) return state;

  switch (event.type) {
    case "scope-loaded":
      return {
        ...state,
        confirmed: normalizeFavorites(event.favorites),
        favorites: applyPending(event.favorites, state.pending),
        syncing: false,
        syncError: false,
      };
    case "scope-failed":
      return { ...state, syncing: false, syncError: true };
    case "retry-sync":
      return { ...state, syncing: true, syncError: false };
    case "intent": {
      const pending = {
        ...state.pending,
        [event.slug]: { requestId: event.requestId, desired: event.desired },
      };
      const errors = { ...state.errors };
      delete errors[event.slug];
      return {
        ...state,
        pending,
        errors,
        favorites: applyPending(state.confirmed, pending),
      };
    }
    case "acknowledged": {
      const confirmed = setFavoriteValue(state.confirmed, event.slug, event.desired);
      const pending = { ...state.pending };
      const errors = { ...state.errors };
      if (pending[event.slug]?.requestId === event.requestId) delete pending[event.slug];
      if (errors[event.slug]?.requestId === event.requestId) delete errors[event.slug];
      return {
        ...state,
        confirmed,
        pending,
        errors,
        favorites: applyPending(confirmed, pending),
      };
    }
    case "reconciled": {
      const confirmed = normalizeFavorites(event.favorites);
      const errors = { ...state.errors };
      for (const [slug, error] of Object.entries(errors)) {
        if (confirmed.includes(slug) === error.desired) delete errors[slug];
      }
      return {
        ...state,
        confirmed,
        favorites: applyPending(confirmed, state.pending),
        syncing: false,
        syncError: false,
        errors,
      };
    }
    case "mutation-failed": {
      if (state.pending[event.slug]?.requestId !== event.requestId) return state;
      const pending = { ...state.pending };
      delete pending[event.slug];
      return {
        ...state,
        pending,
        errors: {
          ...state.errors,
          [event.slug]: { requestId: event.requestId, desired: event.desired, kind: "mutation" },
        },
        favorites: applyPending(state.confirmed, pending),
      };
    }
    case "anonymous-updated": {
      const confirmed = event.persisted
        ? normalizeFavorites(event.favorites)
        : state.confirmed;
      const errors = { ...state.errors };
      if (event.persisted) {
        for (const [slug, error] of Object.entries(errors)) {
          if (error.kind === "local-storage") delete errors[slug];
        }
      } else {
        errors[event.slug] = {
          requestId: event.requestId,
          desired: event.desired,
          kind: "local-storage",
        };
      }
      return {
        ...state,
        confirmed,
        // Storage failure must not erase the anonymous session's in-memory
        // intent. Keep it visible and mark it retryable until a write works.
        favorites: normalizeFavorites(event.favorites),
        syncing: false,
        errors,
      };
    }
  }
}
