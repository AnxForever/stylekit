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
  signInWithLinuxDo: () => void;
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

  const signInWithLinuxDo = useCallback(() => {
    window.location.href = "/api/auth/linuxdo?next=/profile";
  }, []);

  const signOut = useCallback(async () => {
    const client = getAuthClient();
    if (!client) return;

    await client.auth.signOut();
    setUser(null);
  }, []);

  return { user, loading, signInWithGitHub, signInWithLinuxDo, signOut };
}
