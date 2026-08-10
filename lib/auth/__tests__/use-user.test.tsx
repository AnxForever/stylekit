/** @vitest-environment jsdom */

import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { User } from "@supabase/supabase-js";

const mocks = vi.hoisted(() => ({
  getAuthClient: vi.fn(),
}));

vi.mock("@/lib/auth/supabase-browser", () => ({
  getAuthClient: mocks.getAuthClient,
}));

import { AuthProvider, useUser, type AuthState } from "@/lib/auth/use-user";

const TEST_PASSWORD = ["correct", "horse"].join("-");

const user = {
  id: "user-1",
  aud: "authenticated",
  role: "authenticated",
  email: "user@example.com",
  app_metadata: { provider: "github" },
  user_metadata: { full_name: "Example User" },
  identities: [],
  created_at: "2026-01-01T00:00:00.000Z",
} as unknown as User;

function Consumer({ label }: { label: string }) {
  const { user: currentUser, loading } = useUser();
  return (
    <p data-testid={label}>
      {loading ? "loading" : currentUser?.id ?? "anonymous"}
    </p>
  );
}

function AuthActions({ onReady }: { onReady: (state: AuthState) => void }) {
  const state = useUser();
  onReady(state);
  return null;
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon-key");
  });

  it("initializes one auth session for multiple consumers", async () => {
    const getSession = vi.fn().mockResolvedValue({
      data: { session: { user } },
      error: null,
    });
    const getUser = vi.fn().mockResolvedValue({
      data: { user },
      error: null,
    });
    const unsubscribe = vi.fn();
    const onAuthStateChange = vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe } },
    });

    mocks.getAuthClient.mockReturnValue({
      auth: {
        getSession,
        getUser,
        onAuthStateChange,
        signInWithOAuth: vi.fn(),
        signOut: vi.fn(),
      },
    });

    const { unmount } = render(
      <AuthProvider>
        <Consumer label="first" />
        <Consumer label="second" />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("first").textContent).toBe("user-1");
      expect(screen.getByTestId("second").textContent).toBe("user-1");
    });

    expect(getSession).toHaveBeenCalledTimes(1);
    expect(getUser).toHaveBeenCalledTimes(1);
    expect(onAuthStateChange).toHaveBeenCalledTimes(1);

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it("leaves the loading state when session initialization fails", async () => {
    const getSession = vi.fn().mockRejectedValue(new Error("session failed"));
    const onAuthStateChange = vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });

    mocks.getAuthClient.mockReturnValue({
      auth: {
        getSession,
        getUser: vi.fn(),
        onAuthStateChange,
        signInWithOAuth: vi.fn(),
        signOut: vi.fn(),
      },
    });

    render(
      <AuthProvider>
        <Consumer label="consumer" />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("consumer").textContent).toBe("anonymous");
    });
  });

  it("leaves the loading state when session initialization hangs", async () => {
    vi.useFakeTimers();
    const getSession = vi.fn().mockReturnValue(new Promise(() => {}));
    const onAuthStateChange = vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });

    mocks.getAuthClient.mockReturnValue({
      auth: {
        getSession,
        getUser: vi.fn(),
        onAuthStateChange,
        signInWithOAuth: vi.fn(),
        signOut: vi.fn(),
      },
    });

    render(
      <AuthProvider>
        <Consumer label="consumer" />
      </AuthProvider>
    );

    expect(screen.getByTestId("consumer").textContent).toBe("loading");
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4_000);
    });
    expect(screen.getByTestId("consumer").textContent).toBe("anonymous");
    vi.useRealTimers();
  });

  it("signs in with a normalized email and password", async () => {
    const signInWithPassword = vi.fn().mockResolvedValue({ error: null });
    const onAuthStateChange = vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    let state: AuthState | undefined;

    mocks.getAuthClient.mockReturnValue({
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
        getUser: vi.fn(),
        onAuthStateChange,
        signInWithOAuth: vi.fn(),
        signInWithPassword,
        signUp: vi.fn(),
        signOut: vi.fn(),
      },
    });

    render(
      <AuthProvider>
        <AuthActions onReady={(nextState) => { state = nextState; }} />
      </AuthProvider>
    );

    await waitFor(() => expect(state).toBeDefined());
    await state?.signInWithPassword(" User@Example.COM ", TEST_PASSWORD);

    expect(signInWithPassword).toHaveBeenCalledWith({
      email: "user@example.com",
      password: TEST_PASSWORD,
    });
  });

  it("creates a password account and reports when email confirmation is required", async () => {
    const signUp = vi.fn().mockResolvedValue({
      data: { user, session: null },
      error: null,
    });
    const onAuthStateChange = vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    let state: AuthState | undefined;

    mocks.getAuthClient.mockReturnValue({
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
        getUser: vi.fn(),
        onAuthStateChange,
        signInWithOAuth: vi.fn(),
        signInWithPassword: vi.fn(),
        signUp,
        signOut: vi.fn(),
      },
    });

    render(
      <AuthProvider>
        <AuthActions onReady={(nextState) => { state = nextState; }} />
      </AuthProvider>
    );

    await waitFor(() => expect(state).toBeDefined());
    await expect(
      state?.signUpWithPassword(" User@Example.COM ", TEST_PASSWORD, "/profile")
    ).resolves.toEqual({ needsEmailConfirmation: true });

    expect(signUp).toHaveBeenCalledWith({
      email: "user@example.com",
      password: TEST_PASSWORD,
      options: {
        emailRedirectTo: expect.stringContaining("/api/auth/callback?next=%2Fprofile"),
      },
    });
  });

  it("propagates password sign-in errors so the form can show a safe message", async () => {
    const signInWithPassword = vi.fn().mockResolvedValue({
      error: new Error("invalid credentials"),
    });
    const onAuthStateChange = vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    let state: AuthState | undefined;

    mocks.getAuthClient.mockReturnValue({
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
        getUser: vi.fn(),
        onAuthStateChange,
        signInWithOAuth: vi.fn(),
        signInWithPassword,
        signUp: vi.fn(),
        signOut: vi.fn(),
      },
    });

    render(
      <AuthProvider>
        <AuthActions onReady={(nextState) => { state = nextState; }} />
      </AuthProvider>
    );

    await waitFor(() => expect(state).toBeDefined());
    await expect(state?.signInWithPassword("user@example.com", "wrong")).rejects.toThrow(
      "invalid credentials"
    );
  });
});
