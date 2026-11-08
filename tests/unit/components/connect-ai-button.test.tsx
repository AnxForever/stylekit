// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConnectAiButton } from "@/components/ai/connect-ai-button";
import { AI_ACCESS_ENDPOINT, AI_ACCESS_STDIO_COMMAND } from "@/lib/ai-access";
import { getCursorInstallReviewUrl } from "@/lib/ai-access/client-setups";
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

  it("shows the selected client setup and truthful setup state labels", async () => {
    render(<ConnectAiButton />);

    fireEvent.click(getTrigger("en"));
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("group", { name: "Choose your AI client" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Claude Code", pressed: true })).toBeInTheDocument();
    expect(within(dialog).getByText("Run this command in a terminal, then check the connection with claude mcp list.")).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Cursor" }));
    expect(within(dialog).getByRole("button", { name: "Cursor", pressed: true })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Open Cursor's MCP install review" })).toHaveAttribute(
      "href",
      getCursorInstallReviewUrl(),
    );

    fireEvent.click(within(dialog).getByRole("button", { name: "Gemini CLI" }));
    expect(within(dialog).getByRole("button", { name: "Gemini CLI", pressed: true })).toBeInTheDocument();
    expect(within(dialog).getByRole("region", { name: "Terminal command" })).toHaveTextContent(
      "gemini mcp add --transport http stylekit https://www.stylekit.top/mcp",
    );
    expect(within(dialog).queryByText("settings.json")).not.toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "ChatGPT web" }));
    expect(within(dialog).getByText("Plugins, choose +, then Add custom MCP server.", { exact: false })).toBeInTheDocument();
    expect(
      within(dialog).getByText(
        translations.en["aiAccess.chatGptPermissions"],
        { exact: true },
      ),
    ).toBeInTheDocument();
  });

  it("hands the selected style and its only design.md to a compatible client", async () => {
    const markdown = "# Editorial — Style Reference\n\nA single complete style guide.";
    render(
      <ConnectAiButton
        location="style_detail"
        styleContext={{
          slug: "editorial",
          name: "Editorial",
          locale: "en",
          markdown,
        }}
      />,
    );

    fireEvent.click(getTrigger("en"));
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("editorial", { selector: "p" })).toBeInTheDocument();
    const clientSetupHeading = within(dialog).getByRole("heading", { name: "Claude Code" });
    const styleHeading = within(dialog).getByRole("heading", { name: "Editorial" });
    expect(clientSetupHeading.compareDocumentPosition(styleHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const instructions = within(dialog).getByText(translations.en["aiAccess.instructionLabel"], {
      selector: "summary",
    });
    const documentSummary = within(dialog).getByText(translations.en["aiAccess.designDocumentLabel"], {
      selector: "summary",
    });
    expect(instructions.closest("details")).not.toHaveAttribute("open");
    expect(documentSummary.closest("details")).not.toHaveAttribute("open");

    fireEvent.click(instructions);
    const instruction = await within(dialog).findByText(/structuredContent\.brief\.designDocument\.content/);
    fireEvent.click(documentSummary);
    expect(await within(dialog).findByText(/structuredContent\.brief\.designDocument\.content/)).toBeInTheDocument();
    expect(instruction).toHaveTextContent(
      "https://www.stylekit.top/api/design/editorial/design.md?locale=en",
    );
    fireEvent.click(within(dialog).getByRole("button", { name: "Copy design.md" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(markdown));
    expect(within(dialog).getByRole("link", { name: "Open the canonical design.md" })).toHaveAttribute(
      "href",
      "https://www.stylekit.top/api/design/editorial/design.md?locale=en",
    );
  });

  it("does not show copied feedback when clipboard writes fail", async () => {
    writeText.mockRejectedValueOnce(new Error("clipboard unavailable"));
    render(<ConnectAiButton />);

    fireEvent.click(getTrigger("en"));
    const dialog = await screen.findByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: translations.en["aiAccess.copy"] }));
    expect(await within(dialog).findByText(translations.en["aiAccess.copyFailed"])).toBeVisible();
    expect(within(dialog).queryByRole("button", { name: translations.en["aiAccess.copied"] })).not.toBeInTheDocument();
  });

  it("does not carry a failed copy message into a different client setup", async () => {
    writeText.mockRejectedValueOnce(new Error("clipboard unavailable"));
    render(<ConnectAiButton />);
    fireEvent.click(getTrigger("en"));
    const dialog = await screen.findByRole("dialog");
    const clientSetup = within(dialog).getByRole("region", { name: "Claude Code" });
    fireEvent.click(within(clientSetup).getByRole("button", {
      name: translations.en["aiAccess.copyConfiguration"],
    }));
    expect(await within(dialog).findByText(translations.en["aiAccess.copyFailed"])).toBeVisible();

    fireEvent.click(within(dialog).getByRole("button", { name: "Cursor" }));
    expect(within(dialog).queryByText(translations.en["aiAccess.copyFailed"])).not.toBeInTheDocument();
  });

  it("returns keyboard focus to the trigger when the dialog closes", async () => {
    render(<ConnectAiButton />);
    const trigger = getTrigger("en");
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});
