"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { useI18n } from "@/lib/i18n/context";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { localizeHref } from "@/lib/i18n/routing";
import { trackEvent } from "@/lib/analytics/events";
import {
  AI_ACCESS_CLIENTS,
  AI_ACCESS_ENDPOINT,
  AI_ACCESS_STDIO_COMMAND,
} from "@/lib/ai-access";
import { cn } from "@/lib/utils";

/**
 * The reel repeats its first client so the loop closes on a duplicate of the
 * frame it started on. Without it the track would jump one step backwards at
 * the end of every cycle.
 */
const REEL_ITEMS: readonly string[] = [...AI_ACCESS_CLIENTS, AI_ACCESS_CLIENTS[0]];

interface ConnectAiButtonProps {
  /** Analytics location label. Defaults to the home hero. */
  location?: string;
  className?: string;
}

export function ConnectAiButton({
  location = "home_hero",
  className,
}: ConnectAiButtonProps) {
  const { t, locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={t("aiAccess.buttonAria")}
        aria-haspopup="dialog"
        onClick={() => {
          trackEvent("cta_click", { label: "connect_ai", location });
          setIsOpen(true);
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

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent className="max-w-xl gap-0 p-0">
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

          <div className="space-y-4 px-6 py-5">
            <CopyRow
              id="endpoint"
              label={t("aiAccess.remoteLabel")}
              value={AI_ACCESS_ENDPOINT}
              prefix={null}
              copyLabel={t("aiAccess.copy")}
              copiedLabel={t("aiAccess.copied")}
              failedLabel={t("aiAccess.copyFailed")}
            />
            <CopyRow
              id="stdio"
              label={t("aiAccess.localLabel")}
              value={AI_ACCESS_STDIO_COMMAND}
              prefix="$"
              copyLabel={t("aiAccess.copy")}
              copiedLabel={t("aiAccess.copied")}
              failedLabel={t("aiAccess.copyFailed")}
            />

            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                {t("aiAccess.clientsLabel")}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {AI_ACCESS_CLIENTS.map((client) => (
                  <li
                    key={client}
                    className="border border-border px-2 py-1 text-[11px] tracking-wide text-foreground/75"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs leading-relaxed text-muted">{t("aiAccess.note")}</p>
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
    </>
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
  prefix,
  copyLabel,
  copiedLabel,
  failedLabel,
}: {
  id: string;
  label: string;
  value: string;
  prefix: string | null;
  copyLabel: string;
  copiedLabel: string;
  failedLabel: string;
}) {
  const { copy, result, isCopied } = useClipboard({ copiedDuration: 2200 });
  const copied = isCopied(id, value);

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
        {prefix ? (
          <span
            className="select-none font-mono text-[13px] leading-6 text-accent"
            aria-hidden="true"
          >
            {prefix}
          </span>
        ) : null}
        <pre
          role="region"
          tabIndex={0}
          aria-label={label}
          className="min-w-0 flex-1 overflow-x-auto whitespace-pre-wrap break-all bg-transparent! p-0! font-mono text-[13px]! leading-6! text-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <code>{value}</code>
        </pre>
      </div>
      <p
        role="status"
        className={
          result?.state === "failed"
            ? "px-4 pb-4 text-xs text-foreground"
            : "sr-only"
        }
      >
        {result?.state === "failed" ? failedLabel : copied ? copiedLabel : ""}
      </p>
    </div>
  );
}
