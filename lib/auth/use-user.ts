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

import { useEffect, useState, useCallback, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import { getAuthClient } from "./supabase-browser";

interface AuthState {
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

const BROWSER_AUTH_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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

export function useUser(): AuthState {
  const [user, setUser] = useState<User | null>(DEV_MOCK_ENABLED ? DEV_MOCK_USER : null);
  const [loading, setLoading] = useState(
    DEV_MOCK_ENABLED ? false : BROWSER_AUTH_CONFIGURED
  );
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current || DEV_MOCK_ENABLED || !BROWSER_AUTH_CONFIGURED) return;
    initialised.current = true;

    const client = getAuthClient();
    if (!client) return;

    // Try fast path first (local cookies), then verify with server if needed
    client.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Session exists locally — show user immediately, then verify in background
        setUser(session.user);
        setLoading(false);
        client.auth.getUser().then(({ data: { user: verified } }) => {
          if (verified) {
            setUser(verified);
          } else {
            // Server says session is invalid — clear it
            setUser(null);
          }
        });
      } else {
        // No local session — user is not logged in
        setLoading(false);
      }
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      // Clean up OAuth query params (?code=...) from the URL after sign-in
      if (_event === "SIGNED_IN" && window.location.search.includes("code=")) {
        window.history.replaceState({}, "", window.location.pathname);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  return { user, loading, signInWithGitHub, signInWithLinuxDo, signOut };
}
