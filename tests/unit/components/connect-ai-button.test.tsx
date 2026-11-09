// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConnectAiButton } from "@/components/ai/connect-ai-button";
import { buildAiStyleHandoff } from "@/lib/ai-access/client-setups";
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
  it("keeps the home button brief and names the two supported agents", () => {
    render(<ConnectAiButton />);

    const trigger = getTrigger("en");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveTextContent("Connect to");
    expect(trigger).toHaveTextContent("Claude Code");
    expect(trigger).toHaveTextContent("Codex");
  });

  it("shows only one terminal command for Claude Code or Codex", async () => {
    render(<ConnectAiButton location="home_hero" />);

    fireEvent.click(getTrigger("en"));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: "Connect an agent" })).toBeInTheDocument();
    expect(within(dialog).getByText("Choose a tool, then copy its command into the terminal.")).toBeInTheDocument();
    const group = within(dialog).getByRole("group", { name: "Choose an agent" });
    expect(within(group).getAllByRole("button")).toHaveLength(2);
    expect(within(group).getByRole("button", { name: "Claude Code", pressed: true })).toBeInTheDocument();

    const command = within(dialog).getByRole("region", { name: "Terminal command" });
    expect(command).toHaveTextContent("claude mcp add --transport http stylekit https://www.stylekit.top/mcp");

    fireEvent.click(within(group).getByRole("button", { name: "Codex" }));
    expect(within(group).getByRole("button", { name: "Codex", pressed: true })).toBeInTheDocument();
    expect(command).toHaveTextContent("codex mcp add stylekit --url https://www.stylekit.top/mcp");
    expect(within(dialog).queryByText("Cursor")).not.toBeInTheDocument();
    expect(within(dialog).queryByText("ChatGPT")).not.toBeInTheDocument();
    expect(state.trackEvent).toHaveBeenCalledWith("cta_click", {
      label: "connect_ai",
      location: "home_hero",
    });
  });

  it("copies the selected command and reports success to assistive technology", async () => {
    render(<ConnectAiButton />);
    fireEvent.click(getTrigger("en"));
    const dialog = await screen.findByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Copy command" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith("claude mcp add --transport http stylekit https://www.stylekit.top/mcp");
    });
    expect(await within(dialog).findByRole("status")).toHaveTextContent("Copied");
  });

  it("shows manual recovery after a failed copy and clears it when the agent changes", async () => {
    writeText.mockRejectedValueOnce(new Error("clipboard unavailable"));
    render(<ConnectAiButton />);
    fireEvent.click(getTrigger("en"));
    const dialog = await screen.findByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Copy command" }));

    expect(await within(dialog).findByRole("status")).toHaveTextContent("Clipboard access failed");
    const manualCopy = within(dialog).getByRole("textbox", { name: "Code to copy manually" });
    expect(manualCopy).toHaveValue("claude mcp add --transport http stylekit https://www.stylekit.top/mcp");
    manualCopy.focus();
    expect(manualCopy).toHaveProperty("selectionStart", 0);
    expect(manualCopy).toHaveProperty("selectionEnd", "claude mcp add --transport http stylekit https://www.stylekit.top/mcp".length);

    fireEvent.click(within(dialog).getByRole("button", { name: "Codex" }));
    expect(within(dialog).queryByRole("textbox", { name: "Code to copy manually" })).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("status")).not.toBeInTheDocument();
  });

  it("copies a short instruction for the selected style without showing another design document", async () => {
    const markdown = "# Private design.md\n\nFull style document contents.";
    const styleContext = {
      slug: "editorial",
      name: "Editorial",
      locale: "en" as const,
      markdown,
    };
    const instruction = buildAiStyleHandoff(styleContext).instruction;

    render(<ConnectAiButton styleContext={styleContext} />);
    fireEvent.click(getTrigger("en"));
    const dialog = await screen.findByRole("dialog");

    expect(within(dialog).getByText("Editorial")).toBeInTheDocument();
    expect(within(dialog).queryByText(markdown)).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("button", { name: /design\.md/i })).not.toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Copy for agent" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(instruction));
    expect(await within(dialog).findByRole("status")).toHaveTextContent("Copied");
  });

  it("uses short Chinese labels in the entry and setup dialog", async () => {
    state.locale = "zh";
    render(<ConnectAiButton />);
    const trigger = getTrigger("zh");
    expect(trigger).toHaveTextContent("接入");

    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: "接入 Agent" })).toBeInTheDocument();
    expect(within(dialog).getByText("选择工具，复制命令到终端运行。")).toBeInTheDocument();
    const group = within(dialog).getByRole("group", { name: "选择 Agent" });
    expect(within(group).getByRole("button", { name: "Claude Code", pressed: true })).toBeInTheDocument();
    expect(within(group).getByRole("button", { name: "Codex" })).toBeInTheDocument();
  });

  it("keeps the compact document entry accessible and opens the same setup", async () => {
    render(<ConnectAiButton variant="document" />);
    const trigger = getTrigger("en");
    expect(trigger).toHaveTextContent("Connect to");
    expect(trigger).toHaveTextContent("your agent");
    expect(trigger.querySelector('[aria-hidden="true"]')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
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
