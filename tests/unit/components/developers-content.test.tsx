// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DevelopersContent } from "@/components/developers/developers-content";
import {
  getDeveloperToolkitCapability,
  getDeveloperToolkitSetupSnippet,
} from "@/lib/developer-toolkit";

const { localeMock } = vi.hoisted(() => ({
  localeMock: { value: "en" as "en" | "zh" },
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({ locale: localeMock.value }),
}));

vi.mock("@/components/home/reveal-on-scroll", () => ({
  RevealOnScroll: ({ children }: { children: ReactNode }) => children,
}));

const TOOL_IDS = ["registry", "mcp", "cli", "agent-skill"] as const;
const TOOL_BUTTON_NAMES: Record<(typeof TOOL_IDS)[number], RegExp> = {
  registry: /^shadcn registry\b/,
  mcp: /^MCP server\b/,
  cli: /^CLI\b/,
  "agent-skill": /^Agent Skill\b/,
};
const clipboardDescriptor = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);

beforeEach(() => {
  localeMock.value = "en";
});

afterEach(() => {
  cleanup();
  if (clipboardDescriptor) {
    Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
});

function getToolGroup() {
  return screen.getByRole("group", { name: "Choose an integration" });
}

function getToolButton(id: (typeof TOOL_IDS)[number]) {
  return within(getToolGroup()).getByRole("button", {
    name: TOOL_BUTTON_NAMES[id],
  });
}

function getSelectedPanel() {
  const selectedButtons = screen.getAllByRole("button", { pressed: true });
  expect(selectedButtons).toHaveLength(1);
  const panelId = selectedButtons[0].getAttribute("aria-controls");
  expect(panelId).toBeTruthy();
  const panel = document.getElementById(panelId!);
  expect(panel).not.toBeNull();
  return panel!;
}

function getPanelCode(panel: HTMLElement) {
  const code = panel.querySelector("pre code");
  expect(code).not.toBeNull();
  return code!.textContent ?? "";
}

function getDeveloperToolDocsLinks() {
  const toolDocsUrls = new Set(
    TOOL_IDS.map((id) => getDeveloperToolkitCapability(id).docsUrl),
  );
  return Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"))
    .filter((link) => toolDocsUrls.has(link.getAttribute("href") ?? ""));
}

describe("Developer Toolkit integrations", () => {
  it("starts with the shadcn registry selected and shows only its setup", () => {
    render(<DevelopersContent />);

    expect(getToolButton("registry")).toHaveAttribute("aria-pressed", "true");
    expect(getToolButton("mcp")).toHaveAttribute("aria-pressed", "false");
    const panel = getSelectedPanel();
    expect(getPanelCode(panel)).toBe(
      getDeveloperToolkitSetupSnippet("registry").content,
    );
    expect(
      within(panel).getByRole("link", { name: "Docs" }),
    ).toHaveAttribute(
      "href",
      getDeveloperToolkitCapability("registry").docsUrl,
    );
    expect(
      screen.getByText(
        "These install a style's color theme — design tokens for light and dark. The component code is yours to build.",
      ),
    ).toBeInTheDocument();
    expect(getDeveloperToolDocsLinks()).toHaveLength(1);
  });

  it("switches among all four integrations and exposes only the selected code and docs", () => {
    render(<DevelopersContent />);

    for (const id of TOOL_IDS) {
      fireEvent.click(getToolButton(id));

      const panel = getSelectedPanel();
      expect(getToolButton(id)).toHaveAttribute("aria-pressed", "true");
      expect(getPanelCode(panel)).toBe(
        getDeveloperToolkitSetupSnippet(id).content,
      );
      expect(within(panel).getByRole("link", { name: "Docs" })).toHaveAttribute(
        "href",
        getDeveloperToolkitCapability(id).docsUrl,
      );

      const selectedDocs = getDeveloperToolDocsLinks();
      expect(selectedDocs).toHaveLength(1);
      expect(selectedDocs[0]).toHaveAttribute(
        "href",
        getDeveloperToolkitCapability(id).docsUrl,
      );

      for (const otherId of TOOL_IDS) {
        if (otherId === id) continue;
        expect(getToolButton(otherId)).toHaveAttribute(
          "aria-pressed",
          "false",
        );
      }

      if (id === "registry") {
        expect(
          screen.getByText(
            "These install a style's color theme — design tokens for light and dark. The component code is yours to build.",
          ),
        ).toBeInTheDocument();
      } else {
        expect(
          screen.queryByText(
            "These install a style's color theme — design tokens for light and dark. The component code is yours to build.",
          ),
        ).not.toBeInTheDocument();
      }
    }
  });

  it("copies the complete MCP configuration and clears feedback when switching tools", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    render(<DevelopersContent />);

    fireEvent.click(getToolButton("mcp"));
    const mcpPanel = getSelectedPanel();
    const mcpConfiguration = getDeveloperToolkitSetupSnippet("mcp").content;
    expect(getPanelCode(mcpPanel)).toBe(mcpConfiguration);
    expect(JSON.parse(mcpConfiguration)).toEqual({
      mcpServers: {
        stylekit: {
          command: "npx",
          args: ["-y", "--prefer-online", "stylekit-mcp@latest"],
        },
      },
    });

    fireEvent.click(
      within(mcpPanel).getByRole("button", { name: "Copy MCP config" }),
    );
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledOnce();
      expect(
        within(getSelectedPanel()).getByRole("button", {
          name: "MCP config copied",
        }),
      ).toBeInTheDocument();
    });
    expect(writeText).toHaveBeenCalledWith(mcpConfiguration);

    fireEvent.click(getToolButton("cli"));
    expect(
      within(getSelectedPanel()).getByRole("button", { name: "Copy command" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "MCP config copied" }),
    ).not.toBeInTheDocument();

    fireEvent.click(getToolButton("mcp"));
    expect(
      within(getSelectedPanel()).getByRole("button", {
        name: "Copy MCP config",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "MCP config copied" }),
    ).not.toBeInTheDocument();
  });

  it("shows a manual-copy message without reporting success when clipboard access fails", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("Permission denied"));
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    render(<DevelopersContent />);

    fireEvent.click(
      within(getSelectedPanel()).getByRole("button", { name: "Copy command" }),
    );

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "Couldn't copy. Select the code below to copy it manually.",
      );
    });
    expect(
      within(getSelectedPanel()).getByRole("button", { name: "Copy command" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Command copied" }),
    ).not.toBeInTheDocument();
    expect(getPanelCode(getSelectedPanel())).toBe(
      getDeveloperToolkitSetupSnippet("registry").content,
    );
  });

  it("renders the integration selector in English and Chinese", () => {
    localeMock.value = "en";
    const view = render(<DevelopersContent />);

    expect(
      screen.getByRole("heading", { name: "Use StyleKit in your workflow" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Choose an integration" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Public beta")).toBeInTheDocument();

    view.unmount();
    localeMock.value = "zh";
    render(<DevelopersContent />);

    expect(
      screen.getByRole("heading", { name: "把 StyleKit 接进你的工作流" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "选择接入方式" }),
    ).toBeInTheDocument();
    expect(screen.getByText("公开 Beta")).toBeInTheDocument();
    expect(
      within(screen.getByRole("group", { name: "选择接入方式" })).getByRole("button", { name: TOOL_BUTTON_NAMES.registry }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      within(getSelectedPanel()).getByRole("button", { name: "复制命令" }),
    ).toBeInTheDocument();
  });
});