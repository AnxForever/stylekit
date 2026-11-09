"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { useUser } from "@/lib/auth/use-user";
import { loadAuthClient } from "@/lib/auth/browser-client-loader";
import { useI18n } from "@/lib/i18n/context";
import {
  createFavoritesState,
  favoritesStateReducer,
  normalizeFavorites,
  setFavoriteValue,
  type FavoriteScopeKey,
  type FavoritesState,
  type FavoritesStateEvent,
} from "./state";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (slug: string) => void;
  removeFavorite: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  retryFavorite: (slug: string) => void;
  retrySync: () => void;
  isFavorite: (slug: string) => boolean;
  syncing: boolean;
  syncError: boolean;
  mutationStatus: (slug: string) => { pending: boolean; failed: boolean };
}

interface FavoriteIntent {
  requestId: number;
  desired: boolean;
}

interface SuccessfulFavoriteChange extends FavoriteIntent {
  revision: number;
}

interface ActiveFavoritesScope {
  key: FavoriteScopeKey;
  userId: string | null;
  active: boolean;
  controller: AbortController;
  latestReadId: number;
  successfulRevision: number;
  successfulChanges: Map<string, SuccessfulFavoriteChange>;
  intents: Map<string, FavoriteIntent>;
  inFlight: Set<string>;
}

type FavoriteReadPurpose = "initial" | "retry" | "reconcile";

const FavoritesContext = createContext<FavoritesContextType | null>(null);

// Anonymous favorites are intentionally separate from authenticated accounts.
// Do not copy them to an account when a visitor signs in or changes providers.
const STORAGE_KEY = "stylekit-favorites-anonymous-v2";
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function scopeKeyFor(userId: string | null): FavoriteScopeKey {
  return userId ? `user:${userId}` : "anonymous";
}

async function fetchWithAuth(
  input: RequestInfo | URL,
  init: RequestInit = {},
  expectedUserId?: string,
) {
  const headers = new Headers(init.headers ?? {});
  const client = await loadAuthClient();
  if (client) {
    const {
      data: { session },
      error,
    } = await client.auth.getSession();
    if (error) throw error;
    if (expectedUserId && session?.user?.id && session.user.id !== expectedUserId) {
      throw new Error("Favorite account changed before the request started");
    }
    const isDevelopmentMock =
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_DEV_MOCK_USER === "true";
    if (expectedUserId && !session?.user && !isDevelopmentMock) {
      throw new Error("Favorite session is no longer available");
    }
    if (session?.access_token) {
      headers.set("Authorization", `Bearer ${session.access_token}`);
    }
  }
  if (expectedUserId) {
    // The route verifies this hint against the authenticated cookie or bearer
    // token, closing the small window between a session check and request send.
    headers.set("X-StyleKit-Expected-User", expectedUserId);
  }

  return fetch(input, { ...init, headers });
}

function readLocalFavorites(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    return normalizeFavorites(JSON.parse(saved));
  } catch {
    return [];
  }
}

function writeLocalFavorites(favorites: string[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch {
    return false;
  }
}

function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const { t } = useI18n();
  const userId = user?.id ?? null;
  const [state, dispatch] = useReducer(
    favoritesStateReducer,
    scopeKeyFor(userId),
    createFavoritesState,
  );
  const stateRef = useRef(state);
  const scopeRef = useRef<ActiveFavoritesScope | null>(null);
  const requestIdRef = useRef(0);

  const transition = useCallback((event: FavoritesStateEvent) => {
    stateRef.current = favoritesStateReducer(stateRef.current, event);
    dispatch(event);
  }, []);

  const isCurrentScope = useCallback((scope: ActiveFavoritesScope) => {
    return scope.active && scopeRef.current === scope;
  }, []);

  const readAccountFavorites = useCallback(
    async (
      scope: ActiveFavoritesScope,
      purpose: FavoriteReadPurpose,
    ): Promise<string[] | null> => {
      if (!scope.userId || !isCurrentScope(scope)) return null;

      const readId = ++scope.latestReadId;
      const revisionAtStart = scope.successfulRevision;

      try {
        const response = await fetchWithAuth(
          "/api/favorites",
          { signal: scope.controller.signal },
          scope.userId,
        );
        if (!response.ok) throw new Error("Failed to load favorites");

        const body = (await response.json()) as {
          success?: unknown;
          favorites?: unknown;
        };
        if (body.success !== true || !Array.isArray(body.favorites)) {
          throw new Error("Invalid favorites response");
        }

        let favorites = normalizeFavorites(body.favorites);
        // A GET that began before a successful local write can return an older
        // snapshot. Overlay only writes known to have completed after that GET
        // started, while later GETs remain authoritative for external changes.
        for (const [slug, change] of scope.successfulChanges) {
          if (change.revision > revisionAtStart) {
            favorites = setFavoriteValue(favorites, slug, change.desired);
          }
        }

        if (!isCurrentScope(scope) || readId !== scope.latestReadId) return null;
        transition({
          type: purpose === "initial" ? "scope-loaded" : "reconciled",
          scopeKey: scope.key,
          favorites,
        });
        return favorites;
      } catch {
        if (!isCurrentScope(scope) || readId !== scope.latestReadId) return null;
        if (purpose !== "reconcile" || stateRef.current.syncing) {
          transition({ type: "scope-failed", scopeKey: scope.key });
        }
        return null;
      }
    },
    [isCurrentScope, transition],
  );

  const activateScope = useCallback(
    (nextUserId: string | null): ActiveFavoritesScope => {
      const key = scopeKeyFor(nextUserId);
      const current = scopeRef.current;
      if (current?.active && current.key === key) return current;

      if (current) {
        current.active = false;
        current.controller.abort();
      }

      const scope: ActiveFavoritesScope = {
        key,
        userId: nextUserId,
        active: true,
        controller: new AbortController(),
        latestReadId: 0,
        successfulRevision: 0,
        successfulChanges: new Map(),
        intents: new Map(),
        inFlight: new Set(),
      };
      scopeRef.current = scope;
      transition({ type: "scope-started", scopeKey: key, syncing: Boolean(nextUserId) });

      if (nextUserId) {
        void readAccountFavorites(scope, "initial");
      } else {
        transition({
          type: "scope-loaded",
          scopeKey: key,
          favorites: readLocalFavorites(),
        });
      }

      return scope;
    },
    [readAccountFavorites, transition],
  );

  useEffect(() => {
    const scope = activateScope(userId);
    return () => {
      scope.active = false;
      scope.controller.abort();
      if (scopeRef.current === scope) scopeRef.current = null;
    };
  }, [activateScope, userId]);

  const currentScope = useCallback(
    () => activateScope(userId),
    [activateScope, userId],
  );

  const sendFavoriteWrite = useCallback(
    async (
      scope: ActiveFavoritesScope,
      slug: string,
      desired: boolean,
    ): Promise<boolean> => {
      try {
        const response = await fetchWithAuth(
          desired
            ? "/api/favorites"
            : `/api/favorites?slug=${encodeURIComponent(slug)}`,
          {
            method: desired ? "POST" : "DELETE",
            ...(desired
              ? {
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ slug }),
                }
              : {}),
            signal: scope.controller.signal,
          },
          scope.userId ?? undefined,
        );
        if (!response.ok) return false;
        const body = (await response.json()) as { success?: unknown };
        return body.success === true;
      } catch {
        return false;
      }
    },
    [],
  );

  const queueFavoriteWrite = useCallback(
    (scope: ActiveFavoritesScope, slug: string) => {
      if (!scope.userId || scope.inFlight.has(slug) || !isCurrentScope(scope)) return;
      scope.inFlight.add(slug);

      void (async () => {
        try {
          while (isCurrentScope(scope)) {
            const intent = scope.intents.get(slug);
            if (!intent) break;

            const succeeded = await sendFavoriteWrite(scope, slug, intent.desired);
            if (!isCurrentScope(scope)) break;

            const latestIntent = scope.intents.get(slug);
            if (succeeded) {
              const revision = ++scope.successfulRevision;
              scope.successfulChanges.set(slug, {
                ...intent,
                revision,
              });

              if (latestIntent?.desired === intent.desired) {
                scope.intents.delete(slug);
                transition({
                  type: "acknowledged",
                  scopeKey: scope.key,
                  slug,
                  requestId: latestIntent.requestId,
                  desired: latestIntent.desired,
                });
                break;
              }

              transition({
                type: "acknowledged",
                scopeKey: scope.key,
                slug,
                requestId: intent.requestId,
                desired: intent.desired,
              });
              continue;
            }

            const reconciled = await readAccountFavorites(scope, "reconcile");
            if (!isCurrentScope(scope)) break;

            const pendingIntent = scope.intents.get(slug);
            if (
              reconciled &&
              pendingIntent &&
              reconciled.includes(slug) === pendingIntent.desired
            ) {
              scope.intents.delete(slug);
              transition({
                type: "acknowledged",
                scopeKey: scope.key,
                slug,
                requestId: pendingIntent.requestId,
                desired: pendingIntent.desired,
              });
              break;
            }

            if (pendingIntent && pendingIntent.requestId !== intent.requestId) {
              // The user's latest action superseded this failed request. Retry
              // that exact final state once its turn reaches the queue head.
              continue;
            }

            scope.intents.delete(slug);
            transition({
              type: "mutation-failed",
              scopeKey: scope.key,
              slug,
              requestId: intent.requestId,
              desired: intent.desired,
            });
            break;
          }
        } finally {
          scope.inFlight.delete(slug);
        }
      })();
    },
    [isCurrentScope, readAccountFavorites, sendFavoriteWrite, transition],
  );

  const applyDesiredState = useCallback(
    (scope: ActiveFavoritesScope, slug: string, desired: boolean) => {
      if (!isValidSlug(slug) || !isCurrentScope(scope)) return;

      const requestId = ++requestIdRef.current;
      if (!scope.userId) {
        const current = stateRef.current;
        const nextFavorites = setFavoriteValue(current.favorites, slug, desired);
        const persisted = writeLocalFavorites(nextFavorites);
        transition({
          type: "anonymous-updated",
          scopeKey: "anonymous",
          slug,
          requestId,
          desired,
          favorites: nextFavorites,
          persisted,
        });
        return;
      }

      scope.intents.set(slug, { requestId, desired });
      transition({
        type: "intent",
        scopeKey: scope.key,
        slug,
        requestId,
        desired,
      });
      queueFavoriteWrite(scope, slug);
    },
    [isCurrentScope, queueFavoriteWrite, transition],
  );

  const addFavorite = useCallback(
    (slug: string) => applyDesiredState(currentScope(), slug, true),
    [applyDesiredState, currentScope],
  );

  const removeFavorite = useCallback(
    (slug: string) => applyDesiredState(currentScope(), slug, false),
    [applyDesiredState, currentScope],
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      const scope = currentScope();
      const current = stateRef.current;
      const isFavorite = current.scopeKey === scope.key && current.favorites.includes(slug);
      applyDesiredState(scope, slug, !isFavorite);
    },
    [applyDesiredState, currentScope],
  );

  const retryFavorite = useCallback(
    (slug: string) => {
      const scope = currentScope();
      const current = stateRef.current;
      if (current.scopeKey !== scope.key) return;
      const error = current.errors[slug];
      if (!error) return;

      if (!scope.userId && error.kind === "local-storage") {
        const desired = current.favorites.includes(slug);
        const persisted = writeLocalFavorites(current.favorites);
        transition({
          type: "anonymous-updated",
          scopeKey: "anonymous",
          slug,
          requestId: ++requestIdRef.current,
          desired,
          favorites: current.favorites,
          persisted,
        });
        return;
      }

      if (scope.userId && error.kind === "mutation") {
        applyDesiredState(scope, slug, error.desired);
      }
    },
    [applyDesiredState, currentScope, transition],
  );

  const retrySync = useCallback(() => {
    const scope = currentScope();
    if (!scope.userId) return;
    transition({ type: "retry-sync", scopeKey: scope.key });
    void readAccountFavorites(scope, "retry");
  }, [currentScope, readAccountFavorites, transition]);

  const visibleState: FavoritesState =
    state.scopeKey === scopeKeyFor(userId) ? state : createFavoritesState(scopeKeyFor(userId));
  const favorites = visibleState.favorites;

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  const mutationStatus = useCallback(
    (slug: string) => ({
      pending: Boolean(visibleState.pending[slug]),
      failed: Boolean(visibleState.errors[slug]),
    }),
    [visibleState.errors, visibleState.pending],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        retryFavorite,
        retrySync,
        isFavorite,
        syncing: visibleState.syncing,
        syncError: visibleState.syncError,
        mutationStatus,
      }}
    >
      {visibleState.syncError && (
        <div
          className="flex items-center justify-center gap-2 border-b border-amber-300/60 bg-amber-50 px-4 py-2 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
          role="alert"
        >
          <span>{t("components.alert.errorMsg")}</span>
          <button
            className="font-medium underline underline-offset-2"
            onClick={retrySync}
            type="button"
          >
            {t("error.retry")}
          </button>
        </div>
      )}
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
