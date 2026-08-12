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
import { sanitizeNextPath } from "./next-path";

export interface AuthState {
  user: User | null;
  loading: boolean;
  signInWithGitHub: (nextPath?: string) => Promise<void>;
  signInWithLinuxDo: (nextPath?: string) => Promise<void>;
  signInWithNodeLoc: (nextPath?: string) => Promise<void>;
  signInWithGoogle: (nextPath?: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (
    email: string,
    password: string,
    nextPath?: string,
  ) => Promise<{ needsEmailConfirmation: boolean }>;
  /** Send a 6-digit OTP to `email` through the app SMTP service. */
  signInWithEmailOtp: (email: string) => Promise<void>;
  /** Verify the emailed OTP for `email` and establish a session. */
  verifyEmailOtp: (email: string, token: string) => Promise<void>;
  updateProfile: (profile: { displayName: string; avatarUrl: string }) => Promise<User>;
  signOut: () => Promise<void>;
}

function normalizeNextPath(nextPath?: string): string {
  return sanitizeNextPath(nextPath);
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

const SESSION_INITIALIZATION_TIMEOUT_MS = 4_000;

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
    const initializationTimeout = window.setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
      }
    }, SESSION_INITIALIZATION_TIMEOUT_MS);

    // Try fast path first (local cookies), then verify with server if needed
    void authClient.auth
      .getSession()
      .then(async ({ data: { session }, error }) => {
        if (cancelled) return;
        window.clearTimeout(initializationTimeout);
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
        window.clearTimeout(initializationTimeout);
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
      window.clearTimeout(initializationTimeout);
      subscription.unsubscribe();
    };
  }, [authClient]);

  const signInWithGitHub = useCallback(async (nextPath?: string) => {
    const client = getAuthClient();
    if (!client) return;
    const safeNextPath = normalizeNextPath(nextPath);

    const { error } = await client.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(safeNextPath)}`,
      },
    });
    if (error) throw error;
  }, []);

  const signInWithGoogle = useCallback(async (nextPath?: string) => {
    const client = getAuthClient();
    if (!client) return;
    const safeNextPath = normalizeNextPath(nextPath);

    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(safeNextPath)}`,
      },
    });
    if (error) throw error;
  }, []);

  const signInWithLinuxDo = useCallback(async (nextPath?: string) => {
    const safeNextPath = normalizeNextPath(nextPath);
    window.location.href = `/api/auth/linuxdo?next=${encodeURIComponent(safeNextPath)}`;
  }, []);

  const signInWithNodeLoc = useCallback(async (nextPath?: string) => {
    const safeNextPath = normalizeNextPath(nextPath);
    window.location.href = `/api/auth/nodeloc?next=${encodeURIComponent(safeNextPath)}`;
  }, []);

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const client = getAuthClient();
    if (!client) throw new Error("Auth is not configured");

    const { error } = await client.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) throw error;
  }, []);

  const signUpWithPassword = useCallback(async (
    email: string,
    password: string,
    nextPath?: string,
  ) => {
    const client = getAuthClient();
    if (!client) throw new Error("Auth is not configured");

    const { data, error } = await client.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(normalizeNextPath(nextPath))}`,
      },
    });
    if (error) throw error;
    if (data.session?.user) setUser(data.session.user);
    return { needsEmailConfirmation: !data.session };
  }, []);

  const signInWithEmailOtp = useCallback(async (email: string) => {
    const response = await fetch("/api/auth/email-otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(body?.error ?? "Failed to send verification code");
    }
  }, []);

  const verifyEmailOtp = useCallback(async (email: string, token: string) => {
    const response = await fetch("/api/auth/email-otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: token }),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(body?.error ?? "Could not verify email code");
    }
  }, []);

  const updateProfile = useCallback(async ({ displayName, avatarUrl }: {
    displayName: string;
    avatarUrl: string;
  }) => {
    const client = getAuthClient();
    if (!client || !user) {
      throw new Error("Auth is not configured");
    }

    const normalizedName = displayName.trim();
    if (normalizedName.length > 60) {
      throw new Error("Display name is too long");
    }

    const normalizedAvatarUrl = avatarUrl.trim();
    if (normalizedAvatarUrl) {
      let parsedAvatarUrl: URL;
      try {
        parsedAvatarUrl = new URL(normalizedAvatarUrl);
      } catch {
        throw new Error("Avatar URL is invalid");
      }
      if (parsedAvatarUrl.protocol !== "https:" || normalizedAvatarUrl.length > 2048) {
        throw new Error("Avatar URL is invalid");
      }
    }

    const { data, error } = await client.auth.updateUser({
      data: {
        ...(user.user_metadata ?? {}),
        display_name: normalizedName,
        avatar_url: normalizedAvatarUrl,
      },
    });
    if (error || !data.user) {
      throw error ?? new Error("Could not update profile");
    }
    setUser(data.user);
    return data.user;
  }, [user]);

  const signOut = useCallback(async () => {
    const client = getAuthClient();
    if (!client) return;

    await client.auth.signOut();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      signInWithGitHub,
      signInWithLinuxDo,
      signInWithNodeLoc,
      signInWithGoogle,
      signInWithPassword,
      signUpWithPassword,
      signInWithEmailOtp,
      verifyEmailOtp,
      updateProfile,
      signOut,
    }),
    [
      user,
      loading,
      signInWithGitHub,
      signInWithLinuxDo,
      signInWithNodeLoc,
      signInWithGoogle,
      signInWithPassword,
      signUpWithPassword,
      signInWithEmailOtp,
      verifyEmailOtp,
      updateProfile,
      signOut,
    ]
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
