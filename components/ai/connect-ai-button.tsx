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
import { useI18n } from "@/lib/i18n/context";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { localizeHref } from "@/lib/i18n/routing";
import { trackEvent } from "@/lib/analytics/events";
import type { TranslationKey } from "@/lib/i18n/translations";
import {
  AI_ACCESS_CLIENTS,
  AI_ACCESS_ENDPOINT,
  AI_ACCESS_STDIO_COMMAND,
} from "@/lib/ai-access";
import { cn } from "@/lib/utils";
import {
  AI_CLIENT_SETUPS,
  buildAiStyleHandoff,
  getAiClientSetupContent,
  getCursorInstallReviewUrl,
  type AiClientSetupId,
  type AiStyleHandoff,
} from "@/lib/ai-access/client-setups";

/**
 * The reel repeats its first client so the loop closes on a duplicate of the
 * frame it started on. Without it the track would jump one step backwards at
 * the end of every cycle.
 */
const REEL_ITEMS: readonly string[] = [...AI_ACCESS_CLIENTS, AI_ACCESS_CLIENTS[0]];

const CLIENT_LABEL_KEYS: Record<AiClientSetupId, TranslationKey> = {
  "claude-code": "aiAccess.clientClaudeCode",
  cursor: "aiAccess.clientCursor",
  "codex-cli": "aiAccess.clientCodexCli",
  vscode: "aiAccess.clientVsCode",
  "gemini-cli": "aiAccess.clientGeminiCli",
  "chatgpt-web": "aiAccess.clientChatGpt",
};

const CLIENT_SETUP_KEYS: Record<AiClientSetupId, TranslationKey> = {
  "claude-code": "aiAccess.claudeCodeSteps",
  cursor: "aiAccess.cursorSteps",
  "codex-cli": "aiAccess.codexCliSteps",
  vscode: "aiAccess.vsCodeSteps",
  "gemini-cli": "aiAccess.geminiCliSteps",
  "chatgpt-web": "aiAccess.chatGptInstructions",
};

const CHATGPT_STEP_KEYS = [
  "aiAccess.chatGptStep1",
  "aiAccess.chatGptStep2",
  "aiAccess.chatGptStep3",
  "aiAccess.chatGptStep4",
] as const satisfies readonly TranslationKey[];

interface ConnectAiButtonProps {
  /** Analytics location label. Defaults to the home hero. */
  location?: string;
  className?: string;
  styleContext?: AiStyleHandoff;
}

export function ConnectAiButton({
  location = "home_hero",
  className,
  styleContext,
}: ConnectAiButtonProps) {
  const { t, locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<AiClientSetupId>("claude-code");
  const componentId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const styleHeadingId = `ai-selected-style-heading-${componentId}`;
  const clientPickerId = `ai-client-picker-label-${componentId}`;
  const clientSetupId = `ai-client-setup-heading-${componentId}`;
  const selectedSetup = AI_CLIENT_SETUPS.find(({ id }) => id === selectedClient);
  const styleHandoff = styleContext ? buildAiStyleHandoff(styleContext) : null;
  const styleSection =
    styleContext && styleHandoff ? (
      <section
        aria-labelledby={styleHeadingId}
        className="space-y-3 border border-border bg-foreground/[0.025] p-4"
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            {t("aiAccess.styleLabel")}
          </p>
          <h3 id={styleHeadingId} className="mt-1 text-base">
            {styleContext.name}
          </h3>
          <p className="font-mono text-xs text-muted">{styleContext.slug}</p>
        </div>
        <details className="border-t border-border pt-3">
          <summary className="min-h-9 cursor-pointer text-sm text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            {t("aiAccess.instructionLabel")}
          </summary>
          <div className="mt-2">
            <CopyRow
              id="style-handoff"
              label={t("aiAccess.instructionLabel")}
              value={styleHandoff.instruction}
              format="text"
              copyLabel={t("aiAccess.copyInstructions")}
              copiedLabel={t("aiAccess.copiedInstructions")}
              failedLabel={t("aiAccess.copyFailed")}
            />
          </div>
        </details>
        {styleHandoff.designDocumentMarkdown ? (
          <details className="border-t border-border pt-3">
            <summary className="min-h-9 cursor-pointer text-sm text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              {t("aiAccess.designDocumentLabel")}
            </summary>
            <div className="mt-2">
              <CopyRow
                id="style-design-md"
                label={t("aiAccess.designDocumentLabel")}
                value={styleHandoff.designDocumentMarkdown}
                format="markdown"
                copyLabel={t("aiAccess.copyDesignDocument")}
                copiedLabel={t("aiAccess.copiedDesignDocument")}
                failedLabel={t("aiAccess.copyFailed")}
              />
            </div>
          </details>
        ) : null}
        <Link
          href={styleHandoff.designDocumentUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-foreground underline underline-offset-4 hover:text-accent"
        >
          {t("aiAccess.openDesignDocument")}
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </section>
    ) : null;

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
          "group inline-flex min-h-11 items-center justify-center gap-2 border border-foreground/30 px-5 text-sm tracking-wide transition-colors hover:border-foreground hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          className,
        )}
      >
        <span>{t("aiAccess.buttonPrefix")}</span>
        {/* Client names ride a vertical reel: the button promises "any of these"
            without spending five lines of hero copy on a list. aria-hidden because
            the button's own label already names the clients. */}
        <span
          aria-hidden="true"
          className="relative inline-block h-[1.15em] w-[6.6rem] overflow-hidden text-left align-bottom"
        >
          <span className="ai-reel-track absolute inset-x-0 top-0 flex flex-col">
            {REEL_ITEMS.map((client, index) => (
              <span
                key={`${client}-${index}`}
                className="block h-[1.15em] leading-[1.15em] whitespace-nowrap"
              >
                {client}
              </span>
            ))}
          </span>
        </span>
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>
      </ModalTrigger>
        <ModalContent className="max-h-[88dvh] max-w-2xl gap-0 overflow-y-auto p-0">
          <ModalHeader className="space-y-0 border-b border-border px-6 pb-5 pt-6 text-left">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              {t("aiAccess.eyebrow")}
            </p>
            <ModalTitle className="mt-2 text-2xl font-normal tracking-tight">
              {t("aiAccess.title")}
            </ModalTitle>
            <ModalDescription className="mt-3 text-sm leading-6 text-muted">
              {t("aiAccess.description")}
            </ModalDescription>
          </ModalHeader>

          <div className="space-y-5 px-6 py-5">
            <div className="space-y-3">
              <p id={clientPickerId} className="text-[11px] uppercase tracking-[0.16em] text-muted">
                {t("aiAccess.clientsLabel")}
              </p>
              <div
                role="group"
                aria-labelledby={clientPickerId}
                className="grid grid-cols-2 gap-2 sm:grid-cols-3"
              >
                {AI_CLIENT_SETUPS.map(({ id }) => {
                  const selected = id === selectedClient;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSelectedClient(id)}
                      className={cn(
                        "min-h-11 border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                        selected
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-foreground hover:border-foreground",
                      )}
                    >
                      {t(CLIENT_LABEL_KEYS[id])}
                    </button>
                  );
                })}
              </div>
            </div>

            <section aria-labelledby={clientSetupId} className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 id={clientSetupId} className="text-base font-medium">
                    {t(CLIENT_LABEL_KEYS[selectedClient])}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {t(CLIENT_SETUP_KEYS[selectedClient])}
                  </p>
                </div>
                {selectedSetup ? (
                  <a
                    href={selectedSetup.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex shrink-0 items-center gap-1 text-xs text-foreground underline underline-offset-4 hover:text-accent"
                  >
                    {t("aiAccess.officialDocs")}
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>

              {selectedClient === "chatgpt-web" ? (
                <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-foreground/85">
                  {CHATGPT_STEP_KEYS.map((step) => (
                    <li key={step}>{t(step)}</li>
                  ))}
                </ol>
              ) : (
                <CopyRow
                  id={`config-${selectedClient}`}
                  label={
                    selectedSetup?.format === "json"
                      ? selectedClient === "cursor"
                        ? ".cursor/mcp.json"
                        : ".vscode/mcp.json"
                      : t("aiAccess.terminalCommand")
                  }
                  value={getAiClientSetupContent(selectedClient)}
                  format={selectedSetup?.format === "json" ? "json" : "text"}
                  copyLabel={t("aiAccess.copyConfiguration")}
                  copiedLabel={t("aiAccess.copiedConfiguration")}
                  failedLabel={t("aiAccess.copyFailed")}
                />
              )}

              {selectedClient === "cursor" ? (
                <div className="space-y-1">
                  <a
                    href={getCursorInstallReviewUrl()}
                    aria-label={t("aiAccess.cursorInstallAria")}
                    className="inline-flex min-h-10 items-center gap-1.5 border border-foreground/30 px-3 text-xs text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {t("aiAccess.cursorInstall")}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <p className="text-xs text-muted">{t("aiAccess.cursorInstallHint")}</p>
                </div>
              ) : null}

              {selectedClient === "chatgpt-web" ? (
                <p className="text-xs leading-relaxed text-muted">
                  {t("aiAccess.chatGptPermissions")}
                </p>
              ) : null}
            </section>

            {styleSection}

            <CopyRow
              id="endpoint"
              label={t("aiAccess.remoteLabel")}
              value={AI_ACCESS_ENDPOINT}
              format="text"
              copyLabel={t("aiAccess.copy")}
              copiedLabel={t("aiAccess.copied")}
              failedLabel={t("aiAccess.copyFailed")}
            />
            <p className="text-xs leading-relaxed text-muted">{t("aiAccess.note")}</p>

            <details className="group border-t border-border pt-3">
              <summary className="min-h-9 cursor-pointer text-sm text-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                {t("aiAccess.localLabel")}
              </summary>
              <p className="mb-3 mt-2 text-xs text-muted">{t("aiAccess.stdioNote")}</p>
              <CopyRow
                id="stdio"
                label={t("aiAccess.localLabel")}
                value={AI_ACCESS_STDIO_COMMAND}
                format="text"
                copyLabel={t("aiAccess.copyConfiguration")}
                copiedLabel={t("aiAccess.copiedConfiguration")}
                failedLabel={t("aiAccess.copyFailed")}
              />
            </details>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4">
            <Link
              href={localizeHref("/developers", locale)}
              onClick={() => setIsOpen(false)}
              className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-accent"
            >
              {t("aiAccess.docs")}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex min-h-9 items-center border border-foreground/30 px-4 text-xs tracking-wide transition-colors hover:border-foreground hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t("aiAccess.close")}
            </button>
          </div>
        </ModalContent>
    </Modal>
  );
}

/**
 * One paste-ready value with its own copy state. Each row owns a clipboard hook
 * so the tick appears on the row that was copied, not on every row at once.
 */
function CopyRow({
  id,
  label,
  value,
  format,
  copyLabel,
  copiedLabel,
  failedLabel,
}: {
  id: string;
  label: string;
  value: string;
  format: "text" | "json" | "markdown";
  copyLabel: string;
  copiedLabel: string;
  failedLabel: string;
}) {
  const { copy, result, isCopied } = useClipboard({ copiedDuration: 2200 });
  const copied = isCopied(id, value);
  const failed = result?.state === "failed" && result.id === id && result.text === value;

  return (
    <div className="min-w-0 overflow-hidden border border-border bg-foreground/[0.025]">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-border px-4">
        <p className="text-xs text-foreground/65">{label}</p>
        <button
          type="button"
          onClick={() => void copy(value, id)}
          aria-label={copied ? copiedLabel : copyLabel}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 text-xs text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span>{copied ? copiedLabel : copyLabel}</span>
        </button>
      </div>
      <div className="flex min-w-0 items-start gap-2 p-4">
        <pre
          role="region"
          tabIndex={0}
          aria-label={label}
          className={cn(
            "min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap break-all bg-transparent! p-0! font-mono text-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            format === "markdown"
              ? "max-h-56 text-[11px]! leading-5!"
              : "max-h-40 text-[13px]! leading-6!",
          )}
        >
          <code>{value}</code>
        </pre>
      </div>
      <p
        role="status"
        className={
          failed
            ? "px-4 pb-4 text-xs text-foreground"
            : "sr-only"
        }
      >
        {failed ? failedLabel : copied ? copiedLabel : ""}
      </p>
    </div>
  );
}
