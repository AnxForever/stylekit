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
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
}

/** Check once at module level whether Supabase is available. */
const hasClient = typeof window !== "undefined" && getAuthClient() !== null;

export function useUser(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(hasClient);
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    const client = getAuthClient();
    if (!client) return;

    // Get initial session
    client.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
      setLoading(false);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGitHub = useCallback(async () => {
    const client = getAuthClient();
    if (!client) return;

    await client.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    const client = getAuthClient();
    if (!client) return;

    await client.auth.signOut();
    setUser(null);
  }, []);

  return { user, loading, signInWithGitHub, signOut };
}
