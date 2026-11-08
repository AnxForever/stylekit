// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConnectAiButton } from "@/components/ai/connect-ai-button";
import { AI_ACCESS_ENDPOINT, AI_ACCESS_STDIO_COMMAND } from "@/lib/ai-access";
import {
  translations,
  type Locale,
  type TranslationKey,
} from "@/lib/i18n/translations";

const state = vi.hoisted(() => ({
  locale: "en" as Locale,
  trackEvent: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({ trackEvent: state.trackEvent }));
vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({
    locale: state.locale,
    t: (key: TranslationKey) => translations[state.locale][key],
  }),
}));

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
const writeText = vi.fn<() => Promise<void>>(() => Promise.resolve());

beforeEach(() => {
  state.locale = "en";
  state.trackEvent.mockClear();
  writeText.mockClear();
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

afterEach(() => {
  cleanup();
  if (clipboardDescriptor) {
    Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
});

function getTrigger(locale: Locale) {
  return screen.getByRole("button", { name: translations[locale]["aiAccess.buttonAria"] });
}

describe("connect AI call to action", () => {
  it("labels the button with the clients it connects", () => {
    render(<ConnectAiButton />);

    const trigger = getTrigger("en");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveTextContent("Connect AI to");
  });

  it("opens the setup dialog and records the click", async () => {
    render(<ConnectAiButton location="home_hero" />);

    fireEvent.click(getTrigger("en"));

    const dialog = await screen.findByRole("dialog");
    expect(state.trackEvent).toHaveBeenCalledWith("cta_click", {
      label: "connect_ai",
      location: "home_hero",
    });
    expect(within(dialog).getByText(translations.en["aiAccess.title"])).toBeInTheDocument();
    expect(within(dialog).getByText(AI_ACCESS_ENDPOINT)).toBeInTheDocument();
    expect(within(dialog).getByText(AI_ACCESS_STDIO_COMMAND)).toBeInTheDocument();
  });

  it("copies the remote endpoint without copying the stdio command", async () => {
    render(<ConnectAiButton />);

    fireEvent.click(getTrigger("en"));
    const dialog = await screen.findByRole("dialog");

    // The endpoint row renders first, so index 0 is the remote URL.
    const [endpointCopy] = within(dialog).getAllByRole("button", {
      name: translations.en["aiAccess.copy"],
    });
    fireEvent.click(endpointCopy);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(AI_ACCESS_ENDPOINT);
    });
    await waitFor(() => {
      expect(
        within(dialog).getByRole("button", {
          name: translations.en["aiAccess.copied"],
        }),
      ).toBeInTheDocument();
    });
  });

  it("renders Chinese copy when the locale is zh", () => {
    state.locale = "zh";
    render(<ConnectAiButton />);

    expect(getTrigger("zh")).toHaveTextContent("接入 AI 到");
  });
});
