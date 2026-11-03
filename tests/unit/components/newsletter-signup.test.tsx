// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({ locale: "en", t: (key: string) => key, setLocale: vi.fn() }),
}));

vi.mock("@/components/i18n/localized-link", () => ({
  LocalizedLink: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/lib/analytics/events", () => ({ trackEvent: vi.fn() }));

import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { trackEvent } from "@/lib/analytics/events";

function submitEmail(email: string) {
  fireEvent.change(screen.getByLabelText("newsletter.placeholder"), {
    target: { value: email },
  });
  fireEvent.click(screen.getByRole("button", { name: /newsletter.subscribe/ }));
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

it("posts the address with the current locale and confirms it", async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true, code: "subscribed", emailSent: true }),
  });
  vi.stubGlobal("fetch", fetchMock);

  render(<NewsletterSignup variant="inline" />);
  submitEmail("reader@example.com");

  await waitFor(() => expect(screen.getByText("newsletter.successTitle")).toBeInTheDocument());
  expect(fetchMock).toHaveBeenCalledWith(
    "/api/newsletter",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ email: "reader@example.com", locale: "en" }),
    }),
  );
  expect(screen.getByText("newsletter.successDetail")).toBeInTheDocument();
  expect(trackEvent).toHaveBeenCalledWith("newsletter_subscribe", { source: "inline" });
});

it("treats an existing subscription as a neutral state instead of an error", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, code: "already-subscribed" }),
    }),
  );

  render(<NewsletterSignup variant="inline" />);
  submitEmail("reader@example.com");

  await waitFor(() =>
    expect(screen.getByText("newsletter.alreadySubscribed")).toBeInTheDocument(),
  );
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(trackEvent).not.toHaveBeenCalled();
});

it("localizes the rate-limit error from the API code", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ success: false, code: "rate-limited" }),
    }),
  );

  render(<NewsletterSignup variant="inline" />);
  submitEmail("reader@example.com");

  await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("newsletter.rateLimited"));
});

it("rejects a malformed address without calling the API", () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);

  render(<NewsletterSignup variant="inline" />);
  submitEmail("not-an-email");

  expect(screen.getByRole("alert")).toHaveTextContent("newsletter.invalidEmail");
  expect(fetchMock).not.toHaveBeenCalled();
});

it("reports a network failure instead of leaving the button spinning", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

  render(<NewsletterSignup variant="inline" />);
  submitEmail("reader@example.com");

  await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("newsletter.error"));
  expect(screen.getByRole("button", { name: /newsletter.subscribe/ })).toBeEnabled();
});
