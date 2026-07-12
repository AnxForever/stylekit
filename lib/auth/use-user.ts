"use client";

/**
 * Client-side hook for auth state.
 *
 * Wraps Supabase auth, subscribes to session changes,
 * and provides sign-in / sign-out helpers.
 *
 * Returns { user: null, loading: false } when Supabase is not configured
 * so callers can treat it as "always unauthenticated" without errors.
 */

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { getAuthClient } from "./supabase-browser";

export interface AuthState {
  user: User | null;
  loading: boolean;
  signInWithGitHub: (nextPath?: string) => Promise<void>;
  signInWithLinuxDo: (nextPath?: string) => void;
  signOut: () => Promise<void>;
}

function normalizeNextPath(nextPath?: string): string {
  if (!nextPath || !nextPath.startsWith("/")) {
    return "/styles";
  }
  return nextPath;
}

const DEV_MOCK_ENABLED =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_DEV_MOCK_USER === "true";

function isBrowserAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

const DEV_MOCK_USER: User = {
  id: "dev-mock-user-00000000",
  aud: "authenticated",
  role: "authenticated",
  email: "dev@localhost",
  app_metadata: { provider: "mock" },
  user_metadata: { full_name: "Dev User" },
  identities: [],
  created_at: "2026-04-14T00:00:00.000Z",
} as unknown as User;

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const browserAuthConfigured = isBrowserAuthConfigured();
  const authClient =
    !DEV_MOCK_ENABLED && browserAuthConfigured ? getAuthClient() : null;
  const [user, setUser] = useState<User | null>(DEV_MOCK_ENABLED ? DEV_MOCK_USER : null);
  const [loading, setLoading] = useState(
    DEV_MOCK_ENABLED ? false : Boolean(authClient)
  );

  useEffect(() => {
    if (!authClient) return;

    let cancelled = false;

    // Try fast path first (local cookies), then verify with server if needed
    void authClient.auth
      .getSession()
      .then(async ({ data: { session }, error }) => {
        if (cancelled) return;
        if (error || !session?.user) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Session exists locally — show user immediately, then verify in background.
        setUser(session.user);
        setLoading(false);

        const {
          data: { user: verified },
          error: verificationError,
        } = await authClient.auth.getUser();

        // A transient verification failure should not erase a usable local
        // session. Auth state changes will still clear an invalid session.
        if (!cancelled && !verificationError) {
          setUser(verified ?? null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
          setLoading(false);
        }
      });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = authClient.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      setUser(session?.user ?? null);
      setLoading(false);

      // Clean up OAuth query params (?code=...) from the URL after sign-in
      if (_event === "SIGNED_IN" && window.location.search.includes("code=")) {
        window.history.replaceState({}, "", window.location.pathname);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [authClient]);

  const signInWithGitHub = useCallback(async (nextPath?: string) => {
    const client = getAuthClient();
    if (!client) return;
    const safeNextPath = normalizeNextPath(nextPath);

    await client.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(safeNextPath)}`,
      },
    });
  }, []);

  const signInWithLinuxDo = useCallback((nextPath?: string) => {
    const safeNextPath = normalizeNextPath(nextPath);
    window.location.href = `/api/auth/linuxdo?next=${encodeURIComponent(safeNextPath)}`;
  }, []);

  const signOut = useCallback(async () => {
    const client = getAuthClient();
    if (!client) return;

    await client.auth.signOut();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, signInWithGitHub, signInWithLinuxDo, signOut }),
    [user, loading, signInWithGitHub, signInWithLinuxDo, signOut]
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useUser(): AuthState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
}
