// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock, routerMock } = vi.hoisted(() => ({
  authMock: {
    user: null,
    loading: false,
    signInWithGitHub: vi.fn(),
    signInWithLinuxDo: vi.fn(),
    signInWithGoogle: vi.fn(),
    signInWithPassword: vi.fn(),
    signUpWithPassword: vi.fn(),
    signInWithEmailOtp: vi.fn(),
    verifyEmailOtp: vi.fn(),
  },
  routerMock: {
    replace: vi.fn(),
  },
}));

const translations: Record<string, string> = {
  "auth.signIn": "Sign in",
  "auth.register": "Create account",
  "auth.loginTitle": "Sign in to StyleKit",
  "auth.registerTitle": "Create your StyleKit account",
  "auth.loginTagline": "One account for your favorites.",
  "auth.registerTagline": "Save your visual workflow.",
  "auth.secureAccess": "Secure access",
  "auth.account": "Account",
  "auth.methodLabel": "Email method",
  "auth.passwordMode": "Email & password",
  "auth.codeMode": "Email code",
  "auth.emailLabel": "Email address",
  "auth.emailPlaceholder": "you@example.com",
  "auth.passwordLabel": "Password",
  "auth.passwordPlaceholder": "At least 8 characters",
  "auth.confirmPasswordLabel": "Confirm password",
    "auth.confirmPasswordPlaceholder": "Re-enter your password",
    "auth.passwordContinue": "Sign in",
    "auth.passwordLoginPrompt": "Forgot your password? Use an email code instead",
    "auth.usePasswordInstead": "Use a password instead",
    "auth.registerContinue": "Create account",
  "auth.passwordRequired": "Enter your password.",
  "auth.passwordMinLength": "Password must be at least 8 characters.",
  "auth.passwordMismatch": "Passwords do not match.",
  "auth.passwordError": "The email or password is incorrect. Try again.",
  "auth.registerError": "We couldn't create your account.",
  "auth.accountCreated": "Account created",
  "auth.checkEmailConfirmation": "Check your inbox.",
  "auth.useCodeInstead": "Use an email code instead",
  "auth.emailHeading": "Sign in with email",
  "auth.emailVerification": "Email verification",
  "auth.emailContinue": "Continue with email",
  "auth.newAccountNote": "New accounts are created automatically.",
  "auth.social": "Continue with a social account",
  "auth.signInWithGitHub": "Sign in with GitHub",
  "auth.signInWithLinuxDo": "Sign in with Linux DO",
  "auth.signInWithGoogle": "Sign in with Google",
  "auth.termsPrefix": "By continuing, you agree to",
  "auth.termsLink": "Terms",
  "auth.and": "and",
  "auth.privacyLink": "Privacy",
  "auth.backToStyleKit": "Back to StyleKit",
  "auth.curatedStyles": "curated styles",
  "auth.perksHeading": "After signing in",
  "auth.perkFavoritesTitle": "Favorites",
  "auth.perkFavoritesDesc": "Save styles.",
  "auth.perkKitsTitle": "Kits",
  "auth.perkKitsDesc": "Keep tools together.",
  "auth.perkSyncTitle": "Sync",
  "auth.perkSyncDesc": "Access anywhere.",
  "theme.switchToDark": "Switch to dark mode",
  "theme.switchToLight": "Switch to light mode",
};

vi.mock("@/lib/auth/use-user", () => ({
  useUser: () => authMock,
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({
    locale: "en",
    setLocale: vi.fn(),
    t: (key: string) => translations[key] ?? key,
  }),
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/login",
  useRouter: () => routerMock,
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light", setTheme: vi.fn() }),
}));

vi.mock("next/dynamic", () => ({
  default: () => () => null,
}));

vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a>,
}));

vi.mock("@/components/auth/brand-marks", () => ({
  GoogleMark: () => null,
  LinuxDoMark: () => null,
}));

vi.mock("@/components/profile/xiaohei-note", () => ({
  XiaoheiLoading: () => null,
}));

import { LoginContent } from "@/app/login/_content";

describe("LoginContent authentication modes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    routerMock.replace.mockClear();
    authMock.user = null;
    authMock.loading = false;
    authMock.signUpWithPassword.mockResolvedValue({ needsEmailConfirmation: true });
    authMock.signInWithEmailOtp.mockResolvedValue(undefined);
  });

  it("starts with the standard email and password sign-in form", () => {
    render(<LoginContent />);

    expect(screen.getByRole("heading", { name: "Sign in to StyleKit" })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/)).toHaveAttribute("autocomplete", "email");
    expect(screen.getByLabelText(/Password/)).toHaveAttribute("autocomplete", "current-password");
    expect(screen.getByRole("button", { name: /email code instead/i })).toBeInTheDocument();
  });

  it("switches the login page locale and preserves the current route", () => {
    render(<LoginContent />);

    fireEvent.click(screen.getByRole("button", { name: "切换到中文" }));

    expect(routerMock.replace).toHaveBeenCalledWith("/zh/login", { scroll: false });
  });

  it("validates registration before calling Supabase", async () => {
    render(<LoginContent />);

    fireEvent.click(screen.getByRole("button", { name: /^Create account$/ }));
    fireEvent.change(screen.getByLabelText(/Email address/), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Password/), {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm password/), {
      target: { value: "different" },
    });
    fireEvent.submit(screen.getByRole("form"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Password must be at least 8 characters."
    );
    expect(authMock.signUpWithPassword).not.toHaveBeenCalled();
  });

  it("submits a valid registration and shows the confirmation state", async () => {
    render(<LoginContent />);

    fireEvent.click(screen.getByRole("button", { name: /^Create account$/ }));
    fireEvent.change(screen.getByLabelText(/Email address/), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Password/), {
      target: { value: "correct-horse" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm password/), {
      target: { value: "correct-horse" },
    });
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() =>
      expect(authMock.signUpWithPassword).toHaveBeenCalledWith(
        "new@example.com",
        "correct-horse",
        "/styles"
      )
    );
    expect(await screen.findByRole("status")).toHaveTextContent("Account created");
  });

  it("keeps the existing SMTP code flow available as an alternate method", async () => {
    render(<LoginContent />);

    fireEvent.click(screen.getByRole("button", { name: /email code instead/i }));
    fireEvent.change(screen.getByLabelText(/Email address/), {
      target: { value: "code@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continue with email" }));

    await waitFor(() =>
      expect(authMock.signInWithEmailOtp).toHaveBeenCalledWith("code@example.com")
    );
    expect(screen.queryByLabelText(/Password/)).not.toBeInTheDocument();
    expect(await screen.findByLabelText("auth.codeLabel")).toBeInTheDocument();
  });

  it("exposes the social sign-in actions below the email methods", () => {
    render(<LoginContent />);

    expect(screen.getByRole("button", { name: "Sign in with GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in with Linux DO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument();
  });
});
