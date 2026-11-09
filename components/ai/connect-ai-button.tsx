"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { useI18n } from "@/lib/i18n/context";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { trackEvent } from "@/lib/analytics/events";
import { localizeHref } from "@/lib/i18n/routing";
import type { TranslationKey } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";
import { buildAiStyleHandoff, getAiClientSetupContent } from "@/lib/ai-access/client-setups";
import type { AiStyleHandoff } from "@/lib/ai-access/client-setups";

type AgentClientId = "claude-code" | "codex-cli";

const AGENT_CLIENTS: readonly { id: AgentClientId; label: TranslationKey }[] = [
  { id: "claude-code", label: "aiAccess.clientClaudeCode" },
  { id: "codex-cli", label: "aiAccess.agentCodex" },
];

const DEFAULT_REEL_ITEMS = [...AGENT_CLIENTS, AGENT_CLIENTS[0]];
const DOCUMENT_REEL_ITEMS = [
  { name: "Claude Code", icon: "/ai-clients/claude.svg" },
  { name: "Codex", icon: "/ai-clients/openai.svg" },
  { name: "Claude Code", icon: "/ai-clients/claude.svg" },
] as const;

interface ConnectAiButtonProps {
  /** Analytics location label. Defaults to the home hero. */
  location?: string;
  className?: string;
  styleContext?: AiStyleHandoff;
  variant?: "default" | "document";
}

export function ConnectAiButton({
  location = "home_hero",
  className,
  styleContext,
  variant = "default",
}: ConnectAiButtonProps) {
  const { t, locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<AgentClientId>("claude-code");
  const [selectionEpoch, setSelectionEpoch] = useState(0);
  const [copyEpoch, setCopyEpoch] = useState<number | null>(null);
  const componentId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const clientPickerId = `ai-agent-picker-${componentId}`;
  const commandId = `ai-agent-command-${componentId}`;
  const selectedCommand = getAiClientSetupContent(selectedClient);
  const styleHandoff = styleContext ? buildAiStyleHandoff(styleContext) : null;
  const styleInstruction = styleHandoff?.instruction;
  const { copy, result, isCopied } = useClipboard({ copiedDuration: 2200 });

  const resultText =
    result?.id === "agent-command"
      ? selectedCommand
      : result?.id === "style-instruction"
        ? styleInstruction
        : null;
  const activeResult =
    result && copyEpoch === selectionEpoch && result.text === resultText ? result : null;
  const activeCopyError = activeResult?.state === "failed" ? activeResult : null;
  const commandCopied =
    activeResult?.id === "agent-command" && isCopied("agent-command", selectedCommand);
  const instructionCopied =
    activeResult?.id === "style-instruction" &&
    styleInstruction !== undefined &&
    isCopied("style-instruction", styleInstruction);

  function copyValue(text: string, id: "agent-command" | "style-instruction") {
    setCopyEpoch(selectionEpoch);
    void copy(text, id);
  }

  function selectClient(client: AgentClientId) {
    if (client === selectedClient) return;
    setSelectedClient(client);
    setSelectionEpoch((epoch) => epoch + 1);
  }

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>
        <button
          type="button"
          aria-label={t("aiAccess.buttonAria")}
          aria-haspopup="dialog"
          onClick={() => {
            trackEvent("cta_click", { label: "connect_ai", location });
          }}
          className={cn(
            variant === "document"
              ? "group inline-flex min-h-10 items-center justify-center gap-1.5 rounded-[6px] bg-foreground px-3 text-xs font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              : "group inline-flex min-h-11 items-center justify-center gap-2 border border-foreground/30 px-5 text-sm tracking-wide transition-colors hover:border-foreground hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            className,
          )}
        >
          {variant === "document" ? (
            <>
              <span>{t("aiAccess.documentButtonPrefix")}</span>
              <span
                aria-hidden="true"
                className="relative inline-block h-4 w-4 shrink-0 overflow-hidden"
              >
                <span className="ai-icon-reel-track absolute inset-x-0 top-0 flex flex-col">
                  {DOCUMENT_REEL_ITEMS.map((client, index) => (
                    <span
                      key={`${client.name}-${index}`}
                      className="ai-icon-reel-item block h-4 w-4 shrink-0"
                      style={{
                        maskImage: `url(${client.icon})`,
                        WebkitMaskImage: `url(${client.icon})`,
                      }}
                    />
                  ))}
                </span>
              </span>
              <span>{t("aiAccess.documentButtonSuffix")}</span>
            </>
          ) : (
            <>
              <span>{t("aiAccess.buttonPrefix")}</span>
              <span
                aria-hidden="true"
                className="relative inline-block h-[1.15em] w-[6.6rem] overflow-hidden text-left align-bottom"
              >
                <span className="ai-reel-track absolute inset-x-0 top-0 flex flex-col">
                  {DEFAULT_REEL_ITEMS.map((client, index) => (
                    <span
                      key={`${client.id}-${index}`}
                      className="block h-[1.15em] leading-[1.15em] whitespace-nowrap"
                    >
                      {t(client.label)}
                    </span>
                  ))}
                </span>
              </span>
            </>
          )}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </ModalTrigger>

      <ModalContent className="max-h-[88dvh] max-w-lg gap-0 overflow-y-auto p-0">
        <ModalHeader className="space-y-0 border-b border-border px-6 pb-4 pr-12 pt-6 text-left">
          <ModalTitle className="text-xl font-normal tracking-tight">
            {t("aiAccess.title")}
          </ModalTitle>
          <ModalDescription className="mt-2 leading-6">
            {t("aiAccess.description")}
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-5 px-6 py-5">
          <div className="space-y-2">
            <p id={clientPickerId} className="text-xs text-muted">
              {t("aiAccess.clientsLabel")}
            </p>
            <div
              role="group"
              aria-labelledby={clientPickerId}
              className="grid grid-cols-2 gap-2"
            >
              {AGENT_CLIENTS.map((client) => {
                const selected = selectedClient === client.id;
                return (
                  <button
                    key={client.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectClient(client.id)}
                    className={cn(
                      "inline-flex min-h-10 items-center justify-center border px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      selected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-foreground hover:border-foreground",
                    )}
                  >
                    {t(client.label)}
                  </button>
                );
              })}
            </div>
          </div>

          <section aria-labelledby={commandId} className="space-y-2">
            <h3 id={commandId} className="text-xs text-muted">
              {t("aiAccess.commandLabel")}
            </h3>
            <button
              type="button"
              aria-label={t("aiAccess.copyCommand")}
              onClick={() => copyValue(selectedCommand, "agent-command")}
              className="flex min-h-12 w-full items-center gap-3 border border-border bg-foreground/[0.025] p-3 text-left transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <code className="min-w-0 flex-1 whitespace-pre-wrap break-all font-mono text-xs leading-5 text-foreground">
                {selectedCommand}
              </code>
              {commandCopied ? (
                <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              )}
            </button>
          </section>

          {styleContext && styleHandoff && styleInstruction ? (
            <section className="flex flex-wrap items-center justify-between gap-3 border border-border px-3 py-2">
              <p className="min-w-0 truncate text-sm text-foreground">{styleContext.name}</p>
              <button
                type="button"
                onClick={() => copyValue(styleInstruction, "style-instruction")}
                className="inline-flex min-h-10 shrink-0 items-center gap-1.5 text-xs text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {instructionCopied ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {instructionCopied
                  ? t("aiAccess.copied")
                  : t("aiAccess.copyForAgent")}
              </button>
            </section>
          ) : null}

          <ClipboardFeedback
            result={activeCopyError}
            locale={locale}
            className="mb-0"
          />

          {activeResult?.state === "copied" ? (
            <p role="status" className="sr-only">
              {t("aiAccess.copied")}
            </p>
          ) : null}

          <Link
            href={localizeHref("/developers", locale)}
            onClick={() => setIsOpen(false)}
            className="group inline-flex min-h-10 items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t("aiAccess.moreSetups")}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </ModalContent>
    </Modal>
  );
}
