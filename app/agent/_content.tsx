"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  Copy,
  Loader2,
  MessageSquarePlus,
  PanelLeft,
  RefreshCcw,
  Send,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { formatLocaleDateTime } from "@/lib/i18n/locale-copy";
import { localizeHref } from "@/lib/i18n/routing";
import { useUser } from "@/lib/auth/use-user";
import type {
  AgentChatResponse,
  AgentCodePrompt,
  AgentConsultPhase,
  AgentDecisionTraceItem,
  AgentMessage,
  AgentPageContext,
  AgentPlannerResult,
  AgentPlannerSlotSnapshot,
  AgentPlannerSlot,
  AgentPromptSnapshot,
  AgentPromptSnapshotEntry,
  AgentSessionDetail,
  AgentSessionSummary,
  AgentSessionStatus,
  AgentSuggestedOption,
  AgentToolTrace,
  AgentWorkflowReason,
  AgentWorkflowSnapshot,
} from "@/lib/agent/types";
import { buildWorkflowSnapshot } from "@/lib/agent/state-transition";
import {
  getPlannerCoverage,
  getPlannerSlotSnapshots,
} from "@/lib/agent/state-transition";

function getLatestCodePrompt(messages: AgentMessage[]): AgentCodePrompt | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === "assistant" && message.codePrompt) {
      return message.codePrompt;
    }
  }

  return null;
}

function getLatestPlanner(messages: AgentMessage[]): AgentPlannerResult | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === "assistant" && message.planner) {
      return message.planner;
    }
  }

  return null;
}

function getLatestToolTrace(messages: AgentMessage[]): AgentToolTrace[] {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === "assistant") {
      return message.toolTrace;
    }
  }

  return [];
}

function getLatestPromptSnapshot(messages: AgentMessage[]): AgentPromptSnapshot | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === "assistant" && message.promptSnapshot) {
      return message.promptSnapshot;
    }
  }

  return null;
}

function getLatestDecisionTrace(messages: AgentMessage[]): AgentDecisionTraceItem[] {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === "assistant" && message.decisionTrace.length > 0) {
      return message.decisionTrace;
    }
  }

  return [];
}

function getSlotLabel(
  slot: AgentPlannerSlot,
  t: (key:
    | "agent.slotProductType"
    | "agent.slotAudience"
    | "agent.slotVisualTone"
    | "agent.slotMustHave"
    | "agent.slotConstraints") => string
): string {
  switch (slot) {
    case "productType":
      return t("agent.slotProductType");
    case "audience":
      return t("agent.slotAudience");
    case "visualTone":
      return t("agent.slotVisualTone");
    case "mustHave":
      return t("agent.slotMustHave");
    case "constraints":
      return t("agent.slotConstraints");
    default:
      return slot;
  }
}

function getReplayEntries(messages: AgentMessage[]) {
  return messages
    .map((message, index) => {
      if (message.role !== "assistant" || !message.planner) {
        return null;
      }

      const workflow = buildWorkflowSnapshot({
        messages: messages.slice(0, index),
        planner: message.planner,
      });
      const coverage = getPlannerCoverage(message.planner);
      const slots = getPlannerSlotSnapshots(message.planner);

      return {
        id: message.id,
        content: message.content,
        createdAt: message.createdAt,
        workflow,
        coverage,
        slots,
        hasPlanCard: Boolean(message.codePrompt),
        toolTrace: message.toolTrace,
        promptSnapshot: message.promptSnapshot,
        decisionTrace: message.decisionTrace,
      };
    })
    .filter((item) => item !== null)
    .reverse();
}

type RichToken =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; label: string; href: string };

type RichBlock =
  | { type: "paragraph"; lines: RichToken[][] }
  | { type: "unordered-list"; items: RichToken[][] }
  | { type: "ordered-list"; items: RichToken[][] }
  | { type: "rule" }
  | { type: "table"; rows: RichToken[][][] };

function parseInlineTokens(input: string): RichToken[] {
  const tokens: RichToken[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "text",
        value: input.slice(lastIndex, match.index),
      });
    }

    if (match[2] && match[3]) {
      tokens.push({
        type: "link",
        label: match[2],
        href: match[3],
      });
    } else if (match[5]) {
      tokens.push({
        type: "strong",
        value: match[5],
      });
    } else if (match[7]) {
      tokens.push({
        type: "code",
        value: match[7],
      });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < input.length) {
    tokens.push({
      type: "text",
      value: input.slice(lastIndex),
    });
  }

  return tokens.length > 0 ? tokens : [{ type: "text", value: input }];
}

function isMarkdownTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|");
}

function isMarkdownTableDivider(line: string): boolean {
  const trimmed = line.trim();
  return /^[:|\-\s]+$/.test(trimmed.replace(/\|/g, ""));
}

function parseRichBlocks(content: string): RichBlock[] {
  const lines = content.replace(/\r/g, "").split("\n");
  const blocks: RichBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed === "---") {
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }

    if (isMarkdownTableRow(trimmed)) {
      const rows: RichToken[][][] = [];
      while (index < lines.length && isMarkdownTableRow(lines[index].trim())) {
        const current = lines[index].trim();
        if (!isMarkdownTableDivider(current)) {
          rows.push(
            current
              .slice(1, -1)
              .split("|")
              .map((cell) => parseInlineTokens(cell.trim()))
          );
        }
        index += 1;
      }

      if (rows.length > 0) {
        blocks.push({ type: "table", rows });
      }
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: RichToken[][] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(parseInlineTokens(lines[index].replace(/^\s*[-*]\s+/, "").trim()));
        index += 1;
      }
      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: RichToken[][] = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(parseInlineTokens(lines[index].replace(/^\s*\d+\.\s+/, "").trim()));
        index += 1;
      }
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const paragraphLines: RichToken[][] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      lines[index].trim() !== "---" &&
      !isMarkdownTableRow(lines[index].trim()) &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !/^\s*\d+\.\s+/.test(lines[index])
    ) {
      paragraphLines.push(parseInlineTokens(lines[index].trim()));
      index += 1;
    }
    blocks.push({ type: "paragraph", lines: paragraphLines });
  }

  return blocks;
}

function RichInline({
  tokens,
  isMuted = false,
}: {
  tokens: RichToken[];
  isMuted?: boolean;
}) {
  return (
    <>
      {tokens.map((token, index) => {
        switch (token.type) {
          case "strong":
            return (
              <strong key={`strong-${index}`} className="font-semibold text-foreground">
                {token.value}
              </strong>
            );
          case "code":
            return (
              <code
                key={`code-${index}`}
                className="rounded-md bg-stone-900/90 px-1.5 py-0.5 font-mono text-[0.92em] text-stone-50"
              >
                {token.value}
              </code>
            );
          case "link":
            return (
              <Link
                key={`link-${index}`}
                href={token.href}
                className="font-medium text-foreground underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-600 hover:decoration-stone-500"
              >
                {token.label}
              </Link>
            );
          default:
            return (
              <Fragment key={`text-${index}`}>
                <span className={isMuted ? "text-muted" : undefined}>{token.value}</span>
              </Fragment>
            );
        }
      })}
    </>
  );
}

function RichMessageBody({ content }: { content: string }) {
  const blocks = useMemo(() => parseRichBlocks(content), [content]);

  return (
    <div className="space-y-3 text-sm leading-7 text-foreground">
      {blocks.map((block, blockIndex) => {
        if (block.type === "rule") {
          return <div key={`rule-${blockIndex}`} className="h-px bg-border/80" />;
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={`ul-${blockIndex}`} className="space-y-2 text-sm leading-7 text-foreground">
              {block.items.map((item, itemIndex) => (
                <li key={`ul-item-${itemIndex}`} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
                  <span className="min-w-0">
                    <RichInline tokens={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={`ol-${blockIndex}`} className="space-y-2 text-sm leading-7 text-foreground">
              {block.items.map((item, itemIndex) => (
                <li key={`ol-item-${itemIndex}`} className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted/30 text-[11px] font-medium text-foreground">
                    {itemIndex + 1}
                  </span>
                  <span className="min-w-0">
                    <RichInline tokens={item} />
                  </span>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "table") {
          const headers = block.rows[0] ?? [];
          const rows = block.rows.slice(1);
          return (
            <div key={`table-${blockIndex}`} className="overflow-hidden rounded-xl border border-border bg-background">
              <div
                className="grid gap-px bg-border/70"
                style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
              >
                {headers.map((cell, cellIndex) => (
                  <div key={`th-${cellIndex}`} className="bg-muted/40 px-3 py-2 text-xs font-medium text-foreground">
                    <RichInline tokens={cell} />
                  </div>
                ))}
                {rows.flatMap((row, rowIndex) =>
                  row.map((cell, cellIndex) => (
                    <div
                      key={`td-${rowIndex}-${cellIndex}`}
                      className="bg-background px-3 py-2 text-sm leading-6 text-foreground"
                    >
                      <RichInline tokens={cell} isMuted />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        }

        return (
          <div key={`p-${blockIndex}`} className="space-y-1">
            {block.lines.map((line, lineIndex) => {
              const isLead =
                lineIndex === 0 &&
                line[0]?.type === "strong" &&
                block.lines.length <= 2;
              return (
                <p
                  key={`line-${lineIndex}`}
                  className={isLead ? "text-sm font-medium leading-7 text-foreground" : "text-sm leading-7 text-foreground"}
                >
                  <RichInline tokens={line} />
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function DecisionTraceCard({
  item,
}: {
  item: AgentDecisionTraceItem;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/15 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">{item.title}</p>
        <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
          {item.type}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-foreground">{item.summary}</p>
      {item.evidence.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground">
          {item.evidence.map((evidence) => (
            <li key={`${item.type}-${evidence}`} className="rounded-xl border border-border/60 bg-background/80 px-3 py-2">
              {evidence}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function PromptSnapshotCard({
  title,
  snapshot,
  charsLabel,
  systemLabel,
  userLabel,
}: {
  title: string;
  snapshot: AgentPromptSnapshotEntry;
  charsLabel: string;
  systemLabel: string;
  userLabel: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/15 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
          {charsLabel
            .replace("{system}", String(snapshot.system.length))
            .replace("{user}", String(snapshot.user.length))}
        </span>
      </div>

      {snapshot.summary.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground">
          {snapshot.summary.map((item) => (
            <li key={`${title}-${item}`} className="rounded-xl border border-border/60 bg-background/80 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-3 space-y-2">
        <details className="rounded-xl border border-border/60 bg-background/80 p-3">
          <summary className="cursor-pointer text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            {systemLabel}
          </summary>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-foreground">
            {snapshot.system}
          </pre>
        </details>
        <details className="rounded-xl border border-border/60 bg-background/80 p-3">
          <summary className="cursor-pointer text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            {userLabel}
          </summary>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-foreground">
            {snapshot.user}
          </pre>
        </details>
      </div>
    </div>
  );
}

function getUniqueNormalizedLines(text: string): string[] {
  return Array.from(
    new Set(
      text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    )
  );
}

function getChangedLines(current: string, previous: string) {
  const currentLines = getUniqueNormalizedLines(current);
  const previousLines = getUniqueNormalizedLines(previous);

  return {
    added: currentLines.filter((line) => !previousLines.includes(line)).slice(0, 4),
    removed: previousLines.filter((line) => !currentLines.includes(line)).slice(0, 4),
  };
}

function buildPromptEntryDiff(
  current: AgentPromptSnapshotEntry,
  previous: AgentPromptSnapshotEntry
) {
  const addedSummary = current.summary.filter((item) => !previous.summary.includes(item));
  const removedSummary = previous.summary.filter((item) => !current.summary.includes(item));
  const systemLines = getChangedLines(current.system, previous.system);
  const userLines = getChangedLines(current.user, previous.user);

  return {
    changed: current.system !== previous.system || current.user !== previous.user,
    systemChanged: current.system !== previous.system,
    userChanged: current.user !== previous.user,
    systemDelta: current.system.length - previous.system.length,
    userDelta: current.user.length - previous.user.length,
    addedSummary,
    removedSummary,
    systemLines,
    userLines,
  };
}

function formatDelta(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

function PromptDiffCard({
  title,
  current,
  previous,
  statusChangedLabel,
  statusUnchangedLabel,
  systemLabel,
  userLabel,
  summaryAddedLabel,
  summaryRemovedLabel,
  linesAddedLabel,
  linesRemovedLabel,
  noSummaryChangesLabel,
  noLineChangesLabel,
  deltaLabel,
}: {
  title: string;
  current: AgentPromptSnapshotEntry;
  previous: AgentPromptSnapshotEntry;
  statusChangedLabel: string;
  statusUnchangedLabel: string;
  systemLabel: string;
  userLabel: string;
  summaryAddedLabel: string;
  summaryRemovedLabel: string;
  linesAddedLabel: string;
  linesRemovedLabel: string;
  noSummaryChangesLabel: string;
  noLineChangesLabel: string;
  deltaLabel: string;
}) {
  const diff = buildPromptEntryDiff(current, previous);

  return (
    <div className="rounded-xl border border-border/60 bg-muted/15 p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
            {diff.changed ? statusChangedLabel : statusUnchangedLabel}
          </span>
          <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
            {deltaLabel
              .replace("{label}", systemLabel)
              .replace("{delta}", formatDelta(diff.systemDelta))}
          </span>
          <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
            {deltaLabel
              .replace("{label}", userLabel)
              .replace("{delta}", formatDelta(diff.userDelta))}
          </span>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-background/80 p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{summaryAddedLabel}</p>
          {diff.addedSummary.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{noSummaryChangesLabel}</p>
          ) : (
            <ul className="mt-2 space-y-2 text-sm leading-6 text-foreground">
              {diff.addedSummary.map((item) => (
                <li key={`${title}-summary-added-${item}`} className="rounded-xl border border-emerald-300/50 bg-emerald-50/70 px-3 py-2 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-border/60 bg-background/80 p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{summaryRemovedLabel}</p>
          {diff.removedSummary.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{noSummaryChangesLabel}</p>
          ) : (
            <ul className="mt-2 space-y-2 text-sm leading-6 text-foreground">
              {diff.removedSummary.map((item) => (
                <li key={`${title}-summary-removed-${item}`} className="rounded-xl border border-amber-300/50 bg-amber-50/70 px-3 py-2 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-background/80 p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {linesAddedLabel.replace("{label}", systemLabel)}
          </p>
          {diff.systemLines.added.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{noLineChangesLabel}</p>
          ) : (
            <ul className="mt-2 space-y-2 text-sm leading-6 text-foreground">
              {diff.systemLines.added.map((line) => (
                <li key={`${title}-system-added-${line}`} className="rounded-xl border border-emerald-300/50 bg-emerald-50/70 px-3 py-2 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-border/60 bg-background/80 p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {linesRemovedLabel.replace("{label}", systemLabel)}
          </p>
          {diff.systemLines.removed.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{noLineChangesLabel}</p>
          ) : (
            <ul className="mt-2 space-y-2 text-sm leading-6 text-foreground">
              {diff.systemLines.removed.map((line) => (
                <li key={`${title}-system-removed-${line}`} className="rounded-xl border border-amber-300/50 bg-amber-50/70 px-3 py-2 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-background/80 p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {linesAddedLabel.replace("{label}", userLabel)}
          </p>
          {diff.userLines.added.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{noLineChangesLabel}</p>
          ) : (
            <ul className="mt-2 space-y-2 text-sm leading-6 text-foreground">
              {diff.userLines.added.map((line) => (
                <li key={`${title}-user-added-${line}`} className="rounded-xl border border-emerald-300/50 bg-emerald-50/70 px-3 py-2 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-border/60 bg-background/80 p-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {linesRemovedLabel.replace("{label}", userLabel)}
          </p>
          {diff.userLines.removed.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{noLineChangesLabel}</p>
          ) : (
            <ul className="mt-2 space-y-2 text-sm leading-6 text-foreground">
              {diff.userLines.removed.map((line) => (
                <li key={`${title}-user-removed-${line}`} className="rounded-xl border border-amber-300/50 bg-amber-50/70 px-3 py-2 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function SuggestedOptionsBar({
  options,
  onSelect,
  disabled,
}: {
  options: AgentSuggestedOption[];
  onSelect: (option: AgentSuggestedOption) => void;
  disabled: boolean;
}) {
  if (options.length === 0) {
    return null;
  }

  return (
    <div className="flex animate-agent-message-in flex-wrap gap-2 px-1">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option)}
          className="group relative rounded-2xl border border-border bg-background px-4 py-2.5 text-left transition-all hover:border-foreground/20 hover:bg-muted/30 hover:shadow-sm active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="block text-sm font-medium text-foreground">{option.label}</span>
          <span className="mt-0.5 block text-xs leading-5 text-muted">{option.description}</span>
        </button>
      ))}
    </div>
  );
}

function ConfirmCard({
  planner,
  locale,
  onConfirm,
  onEdit,
  disabled,
}: {
  planner: AgentPlannerResult;
  locale: "en" | "zh";
  onConfirm: () => void;
  onEdit: () => void;
  disabled: boolean;
}) {
  const t = locale === "zh"
    ? {
        title: "需求确认",
        siteType: "网站类型",
        audience: "目标受众",
        feel: "视觉方向",
        mustHave: "必须包含",
        constraints: "特殊要求",
        confirm: "确认，开始生成",
        edit: "我想改一下",
      }
    : {
        title: "Brief Summary",
        siteType: "Site Type",
        audience: "Audience",
        feel: "Visual Direction",
        mustHave: "Must Include",
        constraints: "Constraints",
        confirm: "Looks good, generate!",
        edit: "I want to change something",
      };

  return (
    <div className="animate-agent-message-in rounded-2xl border border-border bg-background p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.22em] text-muted">{t.title}</p>
      <div className="mt-4 space-y-3">
        {planner.productType ? (
          <div className="flex gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-muted">{t.siteType}</span>
            <span className="text-sm text-foreground">{planner.productType}</span>
          </div>
        ) : null}
        {planner.audience ? (
          <div className="flex gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-muted">{t.audience}</span>
            <span className="text-sm text-foreground">{planner.audience}</span>
          </div>
        ) : null}
        {planner.visualTone ? (
          <div className="flex gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-muted">{t.feel}</span>
            <span className="text-sm text-foreground">{planner.visualTone}</span>
          </div>
        ) : null}
        {planner.mustHave.length > 0 ? (
          <div className="flex gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-muted">{t.mustHave}</span>
            <div className="flex flex-wrap gap-1.5">
              {planner.mustHave.map((item) => (
                <span key={item} className="inline-flex rounded-full bg-foreground/8 px-2.5 py-0.5 text-xs text-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        {planner.constraints.length > 0 ? (
          <div className="flex gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-muted">{t.constraints}</span>
            <div className="flex flex-wrap gap-1.5">
              {planner.constraints.map((item) => (
                <span key={item} className="inline-flex rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        {planner.suggestedOptions.length > 0 ? (
          <div className="flex gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-muted">
              {locale === "zh" ? "推荐风格" : "Styles"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {planner.suggestedOptions.slice(0, 4).map((opt) => (
                <span key={opt.id} className="inline-flex rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-foreground">
                  {opt.label}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={onConfirm}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
          {t.confirm}
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCcw className="h-4 w-4" />
          {t.edit}
        </button>
      </div>
    </div>
  );
}

function ChatMessageBubble({
  locale,
  message,
  compact = false,
}: {
  locale: "en" | "zh";
  message: AgentMessage;
  compact?: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[88%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1.5`}>
        <span className="px-1 text-[11px] uppercase tracking-[0.18em] text-muted">
          {isUser ? (locale === "zh" ? "你" : "You") : "StyleKit"}
        </span>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-foreground text-background"
              : "border border-border bg-background text-foreground shadow-sm"
          }`}
        >
          {isUser ? (
            <p
              className={`whitespace-pre-wrap text-sm ${compact ? "leading-6" : "leading-7"} text-background`}
            >
              {message.content}
            </p>
          ) : (
            <RichMessageBody content={message.content} />
          )}
        </div>
        <p className="px-1 text-[11px] text-muted">
          {formatLocaleDateTime(message.createdAt, locale)}
        </p>
      </div>
    </div>
  );
}

function SessionList({
  locale,
  sessions,
  activeSessionId,
  onSelect,
  onNewChat,
  loading,
  title,
  newChatLabel,
  emptyLabel,
  getStatusLabel,
}: {
  locale: "en" | "zh";
  sessions: AgentSessionSummary[];
  activeSessionId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  loading: boolean;
  title: string;
  newChatLabel: string;
  emptyLabel: string;
  getStatusLabel: (status: AgentSessionStatus) => string;
}) {
  return (
    <div className="h-full overflow-hidden rounded-[1.5rem] border border-border/80 bg-background">
      <div className="flex items-center justify-between border-b border-border/80 px-4 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{title}</p>
        </div>
        <button
          type="button"
          onClick={onNewChat}
          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/30"
        >
          <MessageSquarePlus className="h-3.5 w-3.5" />
          {newChatLabel}
        </button>
      </div>

      <div className="max-h-[420px] overflow-y-auto p-4 md:max-h-[calc(100vh-19rem)]">
        {loading ? (
          <div className="space-y-3 p-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-xl border border-border/60 p-4">
                <div className="mb-2 h-4 w-3/4 rounded bg-muted/60" />
                <div className="h-3 w-1/2 rounded bg-muted/40" />
              </div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border px-6 text-center text-sm text-muted">
            {emptyLabel}
          </div>
        ) : (
          <div className="space-y-2">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => onSelect(session.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/80 bg-background hover:border-foreground/25 hover:bg-muted/20"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <p className={`line-clamp-2 text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                      {session.title}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${
                        isActive ? "bg-background/15 text-background" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {session.locale.toUpperCase()}
                    </span>
                  </div>
                  <p className={`text-xs ${isActive ? "text-background/75" : "text-muted"}`}>
                    {formatLocaleDateTime(session.lastMessageAt, locale)}
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${
                        isActive ? "bg-background/15 text-background" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {getStatusLabel(session.status)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export type AgentViewMode = "user" | "builder";

export function AgentContent() {
  const { locale, t } = useI18n();
  const { user, loading, signInWithGitHub, signInWithLinuxDo } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mode, setMode] = useState<AgentViewMode>(
    () => (searchParams.get("mode") === "builder" ? "builder" : "user")
  );
  const isBuilder = mode === "builder";

  const [sessions, setSessions] = useState<AgentSessionSummary[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [activeSessionStatus, setActiveSessionStatus] = useState<AgentSessionStatus | null>(null);
  const [planner, setPlanner] = useState<AgentPlannerResult | null>(null);
  const [workflow, setWorkflow] = useState<AgentWorkflowSnapshot | null>(null);
  const [codePrompt, setCodePrompt] = useState<AgentCodePrompt | null>(null);
  const [toolTrace, setToolTrace] = useState<AgentToolTrace[]>([]);
  const [promptSnapshot, setPromptSnapshot] = useState<AgentPromptSnapshot | null>(null);
  const [decisionTrace, setDecisionTrace] = useState<AgentDecisionTraceItem[]>([]);
  const [suggestedOptions, setSuggestedOptions] = useState<AgentSuggestedOption[]>([]);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSessions, setShowSessions] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [isPending, startTransition] = useTransition();

  const starterPrompts = useMemo(
    () =>
      locale === "zh"
        ? [
            "我想做一个面向开发者的 AI SaaS 首页，风格专业克制，移动端也要稳。",
            "帮我规划一个作品集首页，想突出案例质量和个人能力，整体偏高级极简。",
            "我要做一个企业后台 dashboard，信息密度高，但不能显得乱，优先考虑可读性。",
          ]
        : [
            "I need an AI SaaS landing page for developers. Keep it professional, restrained, and mobile-safe.",
            "Help me plan a portfolio landing page that highlights case studies and feels premium and minimal.",
            "I need an enterprise dashboard with high information density, but it still needs to feel readable and calm.",
          ],
    [locale]
  );

  function setViewMode(next: AgentViewMode) {
    setMode(next);
    if (next === "user") {
      setShowDebug(false);
    }
    const params = new URLSearchParams(searchParams.toString());
    if (next === "builder") {
      params.set("mode", "builder");
    } else {
      params.delete("mode");
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  useEffect(() => {
    const nextMode: AgentViewMode = searchParams.get("mode") === "builder" ? "builder" : "user";
    setMode(nextMode);
  }, [searchParams]);

  const nextPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
  const currentPageContext = useMemo<AgentPageContext | undefined>(() => {
    const path = searchParams.get("from") || pathname || undefined;
    const styleSlug = searchParams.get("style") || undefined;
    const templateSlug = searchParams.get("template") || undefined;

    if (!path && !styleSlug && !templateSlug) {
      return undefined;
    }

    return {
      path,
      styleSlug,
      templateSlug,
    };
  }, [pathname, searchParams]);

  function getSimpleStatusLabel(status: AgentSessionStatus | null): string {
    switch (status) {
      case "needs_input":
        return t("agent.simpleStatusCollecting");
      case "plan_ready":
        return t("agent.simpleStatusReady");
      case "plan_refined":
        return t("agent.simpleStatusRefined");
      default:
        return t("agent.simpleStatusActive");
    }
  }

  function getStatusLabel(status: AgentSessionStatus): string {
    switch (status) {
      case "needs_input":
        return t("agent.statusNeedsInput");
      case "plan_ready":
        return t("agent.statusPlanReady");
      case "plan_refined":
        return t("agent.statusPlanRefined");
      default:
        return t("agent.statusActive");
    }
  }

  function getStatusDescription(status: AgentSessionStatus | null): string {
    switch (status) {
      case "needs_input":
        return t("agent.statusNeedsInputHint");
      case "plan_ready":
        return t("agent.statusPlanReadyHint");
      case "plan_refined":
        return t("agent.statusPlanRefinedHint");
      default:
        return t("agent.statusActiveHint");
    }
  }

  function getWorkflowReasonLabel(reason: AgentWorkflowReason | null): string {
    switch (reason) {
      case "missing_slots":
        return t("agent.workflowReasonMissingSlots");
      case "initial_plan_ready":
        return t("agent.workflowReasonPlanReady");
      case "plan_refined":
        return t("agent.workflowReasonPlanRefined");
      default:
        return t("agent.workflowReasonLegacyActive");
    }
  }

  function getSlotValueFallback(slot: AgentPlannerSlot): string {
    switch (slot) {
      case "productType":
        return t("agent.slotFallbackProductType");
      case "audience":
        return t("agent.slotFallbackAudience");
      case "visualTone":
        return t("agent.slotFallbackVisualTone");
      case "mustHave":
        return t("agent.slotFallbackMustHave");
      case "constraints":
        return t("agent.slotFallbackConstraints");
      default:
        return "-";
    }
  }

  const plannerCoverage = planner ? getPlannerCoverage(planner) : null;
  const plannerSlots: AgentPlannerSlotSnapshot[] = planner
    ? getPlannerSlotSnapshots(planner)
    : [];
  const showPromptPanel = isBuilder || Boolean(codePrompt);
  const showSessionColumn = showSessions && sessions.length > 0;
  const quickReplySuggestions = useMemo(() => {
    if (!workflow || workflow.state !== "needs_input" || workflow.missingSlots.length === 0) {
      return [];
    }

    const suggestions = workflow.missingSlots.flatMap((slot) => {
      if (locale === "zh") {
        switch (slot) {
          case "productType":
            return ["产品首页", "营销落地页", "后台 Dashboard"];
          case "audience":
            return ["面向开发者", "面向企业团队", "面向内容创作者"];
          case "visualTone":
            return ["专业克制", "高级极简", "大胆有冲击力"];
          case "mustHave":
            return ["必须有价格方案", "必须有案例/客户证言", "必须有清晰 CTA"];
          case "constraints":
            return ["移动端优先", "优先可访问性", "控制性能开销"];
          default:
            return [];
        }
      }

      switch (slot) {
        case "productType":
          return ["Landing page", "Marketing site", "Dashboard"];
        case "audience":
          return ["For developers", "For enterprise teams", "For creators"];
        case "visualTone":
          return ["Professional and restrained", "Premium minimal", "Bold and expressive"];
        case "mustHave":
          return ["Must include pricing", "Must include case studies", "Must include a clear CTA"];
        case "constraints":
          return ["Mobile first", "Accessibility first", "Keep it performant"];
        default:
          return [];
      }
    });

    return Array.from(new Set(suggestions)).slice(0, 6);
  }, [locale, workflow]);
  const composerSuggestions = useMemo(() => {
    if (quickReplySuggestions.length > 0) {
      return quickReplySuggestions;
    }

    if (messages.length === 0) {
      return starterPrompts;
    }

    return [];
  }, [messages.length, quickReplySuggestions, starterPrompts]);
  const replayEntries = useMemo(() => getReplayEntries(messages), [messages]);
  const previousPromptSnapshot = replayEntries[1]?.promptSnapshot ?? null;
  const archivedMessages = messages.slice(0, -2);
  const visibleMessages = archivedMessages.length > 0 ? messages.slice(-2) : messages;
  function resetConversationState() {
    setActiveSessionId(null);
    setActiveSessionStatus(null);
    setMessages([]);
    setPlanner(null);
    setWorkflow(null);
    setCodePrompt(null);
    setToolTrace([]);
    setPromptSnapshot(null);
    setDecisionTrace([]);
    setSuggestedOptions([]);
  }

  async function loadSession(sessionId: string) {
    setDetailLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/agent/sessions/${sessionId}`, {
        method: "GET",
        cache: "no-store",
      });

      if (response.status === 503) {
        setIsUnavailable(true);
      }

      if (response.status === 404) {
        setSessions((current) => current.filter((session) => session.id !== sessionId));
        resetConversationState();
        throw new Error(t("agent.loadSessionError"));
      }

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || t("agent.loadSessionError"));
      }

      const detail = payload.session as AgentSessionDetail;
      setActiveSessionId(detail.id);
      setActiveSessionStatus(detail.status);
      setMessages(detail.messages);
      const nextPlanner = getLatestPlanner(detail.messages);
      setPlanner(nextPlanner);
      setWorkflow(nextPlanner ? buildWorkflowSnapshot({ messages: detail.messages, planner: nextPlanner }) : null);
      setCodePrompt(getLatestCodePrompt(detail.messages));
      setToolTrace(getLatestToolTrace(detail.messages));
      setPromptSnapshot(getLatestPromptSnapshot(detail.messages));
      setDecisionTrace(getLatestDecisionTrace(detail.messages));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : t("agent.loadSessionError"));
    } finally {
      setDetailLoading(false);
    }
  }

  async function loadSessions() {
    setLoadingSessions(true);
    setError(null);

    try {
      const response = await fetch("/api/agent/sessions", {
        method: "GET",
        cache: "no-store",
      });

      if (response.status === 503) {
        setIsUnavailable(true);
      }

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || t("agent.loadSessionsError"));
      }

      const nextSessions = payload.sessions as AgentSessionSummary[];
      setSessions(nextSessions);

      if (!activeSessionId && nextSessions[0]?.id) {
        await loadSession(nextSessions[0].id);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : t("agent.loadSessionsError"));
    } finally {
      setLoadingSessions(false);
    }
  }

  useEffect(() => {
    if (!user) {
      setLoadingSessions(false);
      return;
    }

    void loadSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function upsertSession(summary: AgentSessionSummary) {
    setSessions((current) => {
      const next = [summary, ...current.filter((item) => item.id !== summary.id)];
      next.sort((left, right) => right.lastMessageAt.localeCompare(left.lastMessageAt));
      return next;
    });
  }

  function handleNewChat() {
    resetConversationState();
    setDraft("");
    setError(null);
    setShowSessions(false);
    setSuggestedOptions([]);
  }

  function applyDraftSuggestion(value: string) {
    setDraft((current) => {
      const trimmed = current.trim();
      if (!trimmed) {
        return value;
      }

      return `${trimmed}\n${value}`;
    });
  }

  function handleComposerKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  function handleOptionSelect(option: AgentSuggestedOption) {
    setDraft(option.label);
    setSuggestedOptions([]);
    setTimeout(() => {
      const form = document.querySelector<HTMLFormElement>("form");
      form?.requestSubmit();
    }, 0);
  }

  function handleConfirm() {
    const confirmText = locale === "zh" ? "确认，开始生成" : "Looks good, generate!";
    setDraft(confirmText);
    setSuggestedOptions([]);
    setTimeout(() => {
      const form = document.querySelector<HTMLFormElement>("form");
      form?.requestSubmit();
    }, 0);
  }

  function handleEditRequest() {
    const editText = locale === "zh" ? "我想改一下" : "I want to change something";
    setDraft(editText);
    setSuggestedOptions([]);
    setTimeout(() => {
      const form = document.querySelector<HTMLFormElement>("form");
      form?.requestSubmit();
    }, 0);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || isPending) {
      return;
    }

    const optimisticMessage: AgentMessage = {
      id: `tmp-${Date.now()}`,
      role: "user",
      content: message,
      createdAt: new Date().toISOString(),
      planner: null,
      codePrompt: null,
      toolTrace: [],
      promptSnapshot: null,
      decisionTrace: [],
    };

    setDraft("");
    setError(null);
    setMessages((current) => [...current, optimisticMessage]);

    startTransition(() => {
      void (async () => {
        try {
          const response = await fetch("/api/agent/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId: activeSessionId ?? undefined,
              message,
              locale,
              pageContext: currentPageContext,
            }),
          });

          const payload = (await response.json()) as
            | AgentChatResponse
            | { success: false; error?: string };

          if (response.status === 503) {
            setIsUnavailable(true);
          }

          if (!response.ok || !("success" in payload) || !payload.success) {
            throw new Error(("error" in payload && payload.error) || t("agent.sendError"));
          }

          upsertSession(payload.session);
          setActiveSessionId(payload.sessionId);
          setActiveSessionStatus(payload.workflowState);
          setPlanner(payload.planner);
          setWorkflow(payload.workflow);
          setCodePrompt(payload.codePrompt);
          setToolTrace(payload.toolTrace);
          setPromptSnapshot(payload.promptSnapshot);
          setDecisionTrace(payload.decisionTrace);
          setSuggestedOptions(payload.suggestedOptions ?? payload.planner?.suggestedOptions ?? []);
          setMessages((current) => {
            const next = current.filter((item) => item.id !== optimisticMessage.id);
            const hasUser = next.some((item) => item.id === payload.userMessage.id);
            const hasAssistant = next.some((item) => item.id === payload.assistant.id);

            return [
              ...next,
              ...(hasUser ? [] : [payload.userMessage]),
              ...(hasAssistant ? [] : [payload.assistant]),
            ];
          });
        } catch (submitError) {
          setMessages((current) => current.filter((item) => item.id !== optimisticMessage.id));
          setDraft((current) => (current.trim().length > 0 ? current : message));
          setError(submitError instanceof Error ? submitError.message : t("agent.sendError"));
        }
      })();
    });
  }

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-56 rounded bg-muted/40" />
          <div className="h-4 w-96 rounded bg-muted/30" />
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
            <div className="h-[520px] rounded-3xl bg-muted/20" />
            <div className="h-[520px] rounded-3xl bg-muted/20" />
            <div className="h-[520px] rounded-3xl bg-muted/20" />
          </div>
        </div>
      </section>
    );
  }

  if (!user && process.env.NODE_ENV !== "development") {
    return (
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className="rounded-[2rem] border border-border bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(74,222,128,0.14),_transparent_24%)] p-8 md:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted">{t("agent.badge")}</p>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            {t("agent.loginTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            {t("agent.loginDescription")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => signInWithGitHub(nextPath)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {t("auth.signInWithGitHub")}
            </button>
            <button
              type="button"
              onClick={() => signInWithLinuxDo(nextPath)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              {t("auth.signInWithLinuxDo")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (isUnavailable) {
    return (
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className="rounded-[2rem] border border-border bg-muted/15 p-8 md:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-muted">{t("agent.badge")}</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {t("agent.unavailableTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted md:text-base">
            {t("agent.unavailableDescription")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-2 text-xs uppercase tracking-[0.28em] text-muted">{t("agent.badge")}</p>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {t("agent.title")}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {isBuilder ? (
                <div className="inline-flex items-center rounded-full border border-border p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("user")}
                    aria-pressed={!isBuilder}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
                  >
                    {t("agent.modeUser")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("builder")}
                    aria-pressed={isBuilder}
                    className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-colors"
                  >
                    <Wrench className="h-3 w-3" />
                    {t("agent.modeBuilder")}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setViewMode("builder")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground"
                >
                  <Wrench className="h-3.5 w-3.5" />
                  {t("agent.modeBuilder")}
                </button>
              )}
              <button
                type="button"
                onClick={handleNewChat}
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/30"
              >
                <MessageSquarePlus className="h-3.5 w-3.5" />
                {t("agent.newChat")}
              </button>
              <div className="inline-flex items-center rounded-full border border-border">
                <button
                  type="button"
                  onClick={() => setShowSessions((current) => !current)}
                  className="inline-flex items-center justify-center rounded-l-full p-2.5 text-foreground transition-colors hover:bg-muted/40"
                  title={showSessions ? (locale === "zh" ? "隐藏会话" : "Hide History") : t("agent.history")}
                >
                  <PanelLeft className="h-4 w-4" />
                </button>
                <div className="h-4 w-px bg-border" />
                <button
                  type="button"
                  onClick={() => void loadSessions()}
                  className="inline-flex items-center justify-center rounded-r-full p-2.5 text-foreground transition-colors hover:bg-muted/40"
                  title={t("agent.refresh")}
                >
                  <RefreshCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          {!isBuilder ? null : (
            <p className="mt-3 max-w-2xl text-sm text-muted">{t("agent.description")}</p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        <div
          className={`grid gap-5 ${
            showSessionColumn && showPromptPanel
              ? "lg:grid-cols-[260px_minmax(0,1fr)_360px]"
              : showSessionColumn
                ? "lg:grid-cols-[260px_minmax(0,1fr)]"
                : showPromptPanel
                  ? "lg:grid-cols-[minmax(0,1fr)_360px]"
                  : "lg:grid-cols-[minmax(0,1fr)]"
          }`}
        >
          <div className={`${showSessionColumn ? "block" : "hidden"}`}>
            <SessionList
              locale={locale}
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSelect={(sessionId) => {
                setShowSessions(false);
                void loadSession(sessionId);
              }}
              onNewChat={handleNewChat}
              loading={loadingSessions}
              title={t("agent.history")}
              newChatLabel={t("agent.newChat")}
              emptyLabel={t("agent.emptyHistory")}
              getStatusLabel={(status) =>
                isBuilder ? getStatusLabel(status) : getSimpleStatusLabel(status)
              }
            />
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-background shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
            <div className="border-b border-border/80 px-5 py-4">
              <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {isBuilder ? t("agent.currentBrief") : t("agent.title")}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {isBuilder
                      ? t("agent.stepGuide")
                      : locale === "zh"
                        ? "直接聊天，最后拿提示词。"
                        : "Just chat, then copy the final prompt."}
                  </p>
                </div>
                {activeSessionStatus ? (
                  <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-foreground">
                    {isBuilder
                      ? getStatusLabel(activeSessionStatus)
                      : getSimpleStatusLabel(activeSessionStatus)}
                  </span>
                ) : null}
              </div>
            </div>

            <div
              className={`${
                isBuilder ? "min-h-[420px] md:min-h-[calc(100vh-23rem)]" : "min-h-[480px] md:h-[calc(100vh-18rem)]"
              } overflow-y-auto bg-stone-50/70 px-4 py-5 dark:bg-white/[0.03]`}
            >
              <div className="mx-auto max-w-3xl space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border bg-background px-6 text-center">
                  <div className="mb-4 rounded-full border border-border bg-muted/20 p-4">
                    <Sparkles className="h-6 w-6 text-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold">{t("agent.emptyTitle")}</h2>
                  <p className="mt-3 max-w-xl text-sm text-muted">{t("agent.emptyBody")}</p>
                  <div className="mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
                    {starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => applyDraftSuggestion(prompt)}
                        className="rounded-full border border-border bg-background px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-muted/40"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : isBuilder ? (
                <>
                  {archivedMessages.length > 0 ? (
                    <details className="rounded-xl border border-dashed border-border bg-background px-4 py-3 text-sm">
                      <summary className="cursor-pointer font-medium text-foreground">
                        {locale === "zh"
                          ? `查看更早的 ${archivedMessages.length} 条消息`
                          : `Show ${archivedMessages.length} earlier messages`}
                      </summary>
                      <div className="mt-4 space-y-4">
                        {archivedMessages.map((message) => (
                          <ChatMessageBubble
                            key={message.id}
                            locale={locale}
                            message={message}
                            compact
                          />
                        ))}
                      </div>
                    </details>
                  ) : null}
                  {visibleMessages.map((message) => (
                    <div key={message.id} className="animate-agent-message-in">
                      <ChatMessageBubble locale={locale} message={message} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="animate-agent-message-in">
                      <ChatMessageBubble locale={locale} message={message} />
                    </div>
                  ))}

                  {!isPending && !detailLoading && planner?.phase === "confirm" && planner ? (
                    <ConfirmCard
                      planner={planner}
                      locale={locale}
                      onConfirm={handleConfirm}
                      onEdit={handleEditRequest}
                      disabled={isPending}
                    />
                  ) : null}

                  {!isPending && !detailLoading && suggestedOptions.length > 0 && planner?.phase !== "confirm" ? (
                    <SuggestedOptionsBar
                      options={suggestedOptions}
                      onSelect={handleOptionSelect}
                      disabled={isPending}
                    />
                  ) : null}
                </div>
              )}

              {(isPending || detailLoading) && (
                <div className="flex animate-agent-message-in justify-start">
                  <div className="flex max-w-[88%] flex-col gap-1.5">
                    <span className="px-1 text-[11px] uppercase tracking-[0.18em] text-muted">
                      StyleKit
                    </span>
                    <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted shadow-sm">
                      {detailLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <span className="inline-flex gap-1">
                          <span className="animate-agent-thinking-dot h-1.5 w-1.5 rounded-full bg-foreground/50" style={{ animationDelay: "0ms" }} />
                          <span className="animate-agent-thinking-dot h-1.5 w-1.5 rounded-full bg-foreground/50" style={{ animationDelay: "160ms" }} />
                          <span className="animate-agent-thinking-dot h-1.5 w-1.5 rounded-full bg-foreground/50" style={{ animationDelay: "320ms" }} />
                        </span>
                      )}
                      {detailLoading ? t("agent.loadingConversation") : t("agent.thinking")}
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="border-t border-border/80 bg-background p-4">
              <div className="mx-auto max-w-3xl rounded-[1.5rem] border border-border bg-background p-3 transition-colors focus-within:border-foreground/25 focus-within:ring-2 focus-within:ring-foreground/5">
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleComposerKeyDown}
                  rows={3}
                  className="w-full resize-none bg-transparent text-sm leading-7 outline-none placeholder:text-muted"
                  placeholder={t("agent.composerPlaceholder")}
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {composerSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => applyDraftSuggestion(suggestion)}
                        className="rounded-full border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted/40"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted">
                    {locale === "zh"
                      ? "Ctrl/Cmd + Enter 发送，Shift + Enter 换行"
                      : "Ctrl/Cmd + Enter to send, Shift + Enter for newline"}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isPending || !draft.trim()}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {isPending ? t("agent.sending") : t("agent.send")}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {showPromptPanel ? (
          <aside className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-background shadow-[0_18px_40px_rgba(15,23,42,0.04)] lg:sticky lg:top-24 lg:h-fit">
            {isBuilder ? (
            <div className="border-b border-border px-5 py-4">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">{t("agent.workflowTitle")}</p>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <span className="inline-flex rounded-full border border-border bg-muted/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground">
                    {getStatusLabel(activeSessionStatus ?? "active")}
                  </span>
                  <p className="mt-2 text-sm text-muted">{getStatusDescription(activeSessionStatus)}</p>
                  {workflow ? (
                    <p className="mt-2 text-xs leading-5 text-muted">
                      {getWorkflowReasonLabel(workflow.reason)}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setShowDebug((current) => !current)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/40"
                >
                  {showDebug ? t("agent.hideDebug") : t("agent.showDebug")}
                </button>
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-muted/15 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.slotCoverageTitle")}</p>
                  <p className="text-xs font-medium text-foreground">
                    {plannerCoverage
                      ? `${plannerCoverage.filledCount}/${plannerCoverage.total}`
                      : t("agent.slotCoverageEmpty")}
                  </p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-border/70">
                  <div
                    className="agent-progress-bar h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${plannerCoverage?.percent ?? 0}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted">
                  {plannerCoverage
                    ? t("agent.slotCoverageHint").replace("{percent}", String(plannerCoverage.percent))
                    : t("agent.slotCoverageEmptyHint")}
                </p>

                <div className="mt-4 space-y-2">
                  {(planner ? plannerSlots : ([
                    "productType",
                    "audience",
                    "visualTone",
                    "mustHave",
                    "constraints",
                  ] as AgentPlannerSlot[])).map((item) => {
                    const slot = typeof item === "string" ? item : item.slot;
                    const snapshot = typeof item === "string" ? null : item;
                    return (
                      <div
                        key={slot}
                        className={`rounded-xl border px-3 py-3 ${
                          snapshot?.filled
                            ? "border-emerald-300/60 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20"
                            : "border-border/70 bg-background/80"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{getSlotLabel(slot, t)}</p>
                          <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                            {snapshot?.filled ? t("agent.slotStatusFilled") : t("agent.slotStatusMissing")}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-foreground">
                          {snapshot?.filled ? snapshot.value : getSlotValueFallback(slot)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            ) : (
            <div className="border-b border-border px-5 py-4">
              <p className="text-sm font-medium text-foreground">
                {locale === "zh" ? "提示词方案" : "Prompt Output"}
              </p>
              {activeSessionStatus ? (
                <span className="mt-3 inline-flex rounded-full border border-border bg-muted/20 px-3 py-1 text-[11px] font-medium text-foreground">
                  {getSimpleStatusLabel(activeSessionStatus)}
                </span>
              ) : null}
            </div>
            )}

            <div className="border-b border-border px-5 py-4">
              <p className="text-xs font-medium text-foreground">{t("agent.codePromptTitle")}</p>
              {isBuilder && (
                <p className="mt-2 text-sm text-muted">{t("agent.codePromptHint")}</p>
              )}
            </div>

            <div className="space-y-4 p-5">
              {codePrompt ? (
                <div className="space-y-4 rounded-2xl border border-border bg-background p-4">
                  <div>
                    <p className="text-base font-semibold tracking-tight text-foreground">{codePrompt.title}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center rounded-full bg-foreground/8 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
                        {codePrompt.templateType}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-foreground/8 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
                        {codePrompt.styleName}
                      </span>
                    </div>
                  </div>

                  <div className="agent-code-surface agent-code-scroll overflow-hidden rounded-xl">
                    <pre className="max-h-[360px] overflow-y-auto p-4 font-mono text-[13px] leading-7">
                      {codePrompt.prompt}
                    </pre>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(codePrompt.prompt);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-foreground text-background hover:scale-[1.01] active:scale-[0.99]"
                    }`}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? t("agent.codePromptCopied") : t("agent.codePromptCopy")}
                  </button>

                  <Link
                    href={localizeHref(`/styles/${codePrompt.styleSlug}`, locale)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-xs text-muted transition-colors hover:text-foreground"
                  >
                    {t("agent.codePromptViewStyle")}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ) : planner && !isBuilder ? (
                <div className="space-y-3 rounded-xl border border-border/60 bg-muted/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                    {locale === "zh" ? "方案进度" : "Brief Progress"}
                  </p>
                  <div className="space-y-2">
                    {([
                      [locale === "zh" ? "类型" : "Type", planner.productType] as const,
                      [locale === "zh" ? "受众" : "Audience", planner.audience] as const,
                      [locale === "zh" ? "风格" : "Style", planner.visualTone] as const,
                    ]).map(([label, value]) => (
                      <div key={label} className="flex items-center gap-2">
                        <span className="w-12 shrink-0 text-[11px] font-medium text-muted">{label}</span>
                        <span className={`text-sm ${value ? "text-foreground" : "text-muted/40"}`}>
                          {value || "---"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted">
                    {planner.phase === "confirm" || planner.phase === "done"
                      ? (locale === "zh" ? "准备生成..." : "Ready to generate...")
                      : (locale === "zh" ? "正在收集信息..." : "Still gathering info...")}
                  </p>
                </div>
              ) : (
                <div className="flex min-h-[160px] flex-col items-center justify-center rounded-xl border border-dashed border-border/60 px-6 text-center">
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted/20">
                    <Sparkles className="h-4 w-4 text-muted" />
                  </div>
                  <p className="text-sm text-muted">{t("agent.codePromptEmpty")}</p>
                </div>
              )}
              {isBuilder && showDebug && (
                <div className="space-y-4 rounded-2xl border border-border bg-background p-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugPlannerTitle")}</p>
                    {!planner ? (
                      <p className="mt-2 text-sm text-muted">{t("agent.debugEmpty")}</p>
                    ) : (
                      <div className="mt-2 space-y-2">
                        <div className="rounded-xl border border-border/60 bg-muted/15 p-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugNormalizedQuery")}</p>
                          <p className="mt-1 text-sm text-foreground">{planner.normalizedQuery}</p>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <div className="rounded-xl border border-border/60 bg-muted/15 p-3">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.planPageType")}</p>
                            <p className="mt-1 text-sm text-foreground">{planner.productType || "-"}</p>
                          </div>
                          <div className="rounded-xl border border-border/60 bg-muted/15 p-3">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.planAudience")}</p>
                            <p className="mt-1 text-sm text-foreground">{planner.audience || "-"}</p>
                          </div>
                          <div className="rounded-xl border border-border/60 bg-muted/15 p-3 sm:col-span-2">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugVisualTone")}</p>
                            <p className="mt-1 text-sm text-foreground">{planner.visualTone || "-"}</p>
                          </div>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-muted/15 p-3">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugReadiness")}</p>
                          <p className="mt-1 text-sm text-foreground">{planner.ready ? t("agent.debugReadyYes") : t("agent.debugReadyNo")}</p>
                        </div>
                        {workflow ? (
                          <>
                            <div className="rounded-xl border border-border/60 bg-muted/15 p-3">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugTransitionReason")}</p>
                              <p className="mt-1 text-sm text-foreground">{getWorkflowReasonLabel(workflow.reason)}</p>
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugMissingSlots")}</p>
                              {workflow.missingSlots.length === 0 ? (
                                <p className="mt-2 text-sm text-muted">{t("agent.debugNoMissingSlots")}</p>
                              ) : (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {workflow.missingSlots.map((slot) => (
                                    <span key={slot} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground">
                                      {getSlotLabel(slot, t)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        ) : null}
                        {planner.reasoning.length > 0 && (
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugReasoning")}</p>
                            <ul className="mt-2 space-y-2 text-sm leading-6 text-foreground">
                              {planner.reasoning.map((item) => (
                                <li key={item} className="rounded-xl border border-border/60 bg-muted/15 px-3 py-2">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <details className="rounded-xl border border-border/60 bg-muted/15 p-3">
                          <summary className="cursor-pointer text-xs font-medium uppercase tracking-[0.18em] text-muted">
                            {t("agent.debugRawPlanner")}
                          </summary>
                          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-foreground">
                            {JSON.stringify(planner, null, 2)}
                          </pre>
                        </details>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugToolTraceTitle")}</p>
                    {toolTrace.length === 0 ? (
                      <p className="mt-2 text-sm text-muted">{t("agent.debugNoToolTrace")}</p>
                    ) : (
                      <div className="mt-2 space-y-2">
                        {toolTrace.map((item, index) => (
                          <div key={`${item.tool}-${index}`} className="rounded-xl border border-border/60 bg-muted/15 p-3">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-medium text-foreground">{item.tool}</p>
                              <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                                {item.ok ? "ok" : "error"}
                              </span>
                            </div>
                            {item.meta ? (
                              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-foreground">
                                {JSON.stringify(item.meta, null, 2)}
                              </pre>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugDecisionTraceTitle")}</p>
                    <p className="mt-2 text-sm text-muted">{t("agent.debugDecisionTraceHint")}</p>
                    {decisionTrace.length === 0 ? (
                      <p className="mt-3 text-sm text-muted">{t("agent.debugDecisionTraceEmpty")}</p>
                    ) : (
                      <div className="mt-3 space-y-3">
                        {decisionTrace.map((item, index) => (
                          <DecisionTraceCard key={`${item.type}-${index}`} item={item} />
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugPromptInspectionTitle")}</p>
                    <p className="mt-2 text-sm text-muted">{t("agent.debugPromptInspectionHint")}</p>
                    {!promptSnapshot ? (
                      <p className="mt-3 text-sm text-muted">{t("agent.debugPromptInspectionEmpty")}</p>
                    ) : (
                      <div className="mt-3 space-y-3">
                        <PromptSnapshotCard
                          title={t("agent.debugPromptPlanner")}
                          snapshot={promptSnapshot.planner}
                          charsLabel={t("agent.debugPromptChars")}
                          systemLabel={t("agent.debugPromptSystem")}
                          userLabel={t("agent.debugPromptUser")}
                        />
                        {promptSnapshot.responder ? (
                          <PromptSnapshotCard
                            title={t("agent.debugPromptResponder")}
                            snapshot={promptSnapshot.responder}
                            charsLabel={t("agent.debugPromptChars")}
                            systemLabel={t("agent.debugPromptSystem")}
                            userLabel={t("agent.debugPromptUser")}
                          />
                        ) : (
                          <div className="rounded-xl border border-border/60 bg-muted/15 px-3 py-3 text-sm text-muted">
                            {t("agent.debugPromptResponderEmpty")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugPromptDiffTitle")}</p>
                    <p className="mt-2 text-sm text-muted">{t("agent.debugPromptDiffHint")}</p>
                    {!promptSnapshot ? (
                      <p className="mt-3 text-sm text-muted">{t("agent.debugPromptInspectionEmpty")}</p>
                    ) : !previousPromptSnapshot ? (
                      <p className="mt-3 text-sm text-muted">{t("agent.debugPromptDiffNoPrevious")}</p>
                    ) : (
                      <div className="mt-3 space-y-3">
                        <PromptDiffCard
                          title={t("agent.debugPromptPlanner")}
                          current={promptSnapshot.planner}
                          previous={previousPromptSnapshot.planner}
                          statusChangedLabel={t("agent.debugPromptDiffChanged")}
                          statusUnchangedLabel={t("agent.debugPromptDiffUnchanged")}
                          systemLabel={t("agent.debugPromptSystem")}
                          userLabel={t("agent.debugPromptUser")}
                          summaryAddedLabel={t("agent.debugPromptDiffSummaryAdded")}
                          summaryRemovedLabel={t("agent.debugPromptDiffSummaryRemoved")}
                          linesAddedLabel={t("agent.debugPromptDiffLinesAdded")}
                          linesRemovedLabel={t("agent.debugPromptDiffLinesRemoved")}
                          noSummaryChangesLabel={t("agent.debugPromptDiffNoSummaryChanges")}
                          noLineChangesLabel={t("agent.debugPromptDiffNoLineChanges")}
                          deltaLabel={t("agent.debugPromptDiffDelta")}
                        />
                        {promptSnapshot.responder && previousPromptSnapshot.responder ? (
                          <PromptDiffCard
                            title={t("agent.debugPromptResponder")}
                            current={promptSnapshot.responder}
                            previous={previousPromptSnapshot.responder}
                            statusChangedLabel={t("agent.debugPromptDiffChanged")}
                            statusUnchangedLabel={t("agent.debugPromptDiffUnchanged")}
                            systemLabel={t("agent.debugPromptSystem")}
                            userLabel={t("agent.debugPromptUser")}
                            summaryAddedLabel={t("agent.debugPromptDiffSummaryAdded")}
                            summaryRemovedLabel={t("agent.debugPromptDiffSummaryRemoved")}
                            linesAddedLabel={t("agent.debugPromptDiffLinesAdded")}
                            linesRemovedLabel={t("agent.debugPromptDiffLinesRemoved")}
                            noSummaryChangesLabel={t("agent.debugPromptDiffNoSummaryChanges")}
                            noLineChangesLabel={t("agent.debugPromptDiffNoLineChanges")}
                            deltaLabel={t("agent.debugPromptDiffDelta")}
                          />
                        ) : (
                          <div className="rounded-xl border border-border/60 bg-muted/15 px-3 py-3 text-sm text-muted">
                            {t("agent.debugPromptDiffResponderUnavailable")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugReplayTitle")}</p>
                    <p className="mt-2 text-sm text-muted">{t("agent.debugReplayHint")}</p>
                    {replayEntries.length === 0 ? (
                      <p className="mt-3 text-sm text-muted">{t("agent.debugReplayEmpty")}</p>
                    ) : (
                      <div className="mt-3 space-y-3">
                        {replayEntries.map((entry, index) => (
                          <div key={entry.id} className="rounded-xl border border-border/60 bg-muted/15 p-4">
                            {(() => {
                              const previousEntryPrompt = replayEntries[index + 1]?.promptSnapshot ?? null;
                              return (
                                <>
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                                  {t("agent.debugReplayTurn")} {replayEntries.length - index}
                                </p>
                                <p className="mt-1 text-xs text-muted">
                                  {formatLocaleDateTime(entry.createdAt, locale)}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                                  {getStatusLabel(entry.workflow.state)}
                                </span>
                                <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                                  {entry.hasPlanCard ? t("agent.debugReplayHasPlan") : t("agent.debugReplayNoPlan")}
                                </span>
                              </div>
                            </div>

                            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-foreground">
                              {entry.content}
                            </p>

                            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                              <div className="rounded-xl border border-border/60 bg-background/80 p-3">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugTransitionReason")}</p>
                                <p className="mt-1 text-sm text-foreground">{getWorkflowReasonLabel(entry.workflow.reason)}</p>
                              </div>
                              <div className="rounded-xl border border-border/60 bg-background/80 p-3">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugReplayCoverageTitle")}</p>
                                <p className="mt-1 text-sm text-foreground">
                                  {t("agent.debugReplayCoverage")
                                    .replace("{filled}", String(entry.coverage.filledCount))
                                    .replace("{total}", String(entry.coverage.total))
                                    .replace("{percent}", String(entry.coverage.percent))}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugMissingSlots")}</p>
                              {entry.workflow.missingSlots.length === 0 ? (
                                <p className="mt-2 text-sm text-muted">{t("agent.debugNoMissingSlots")}</p>
                              ) : (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {entry.workflow.missingSlots.map((slot) => (
                                    <span key={slot} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground">
                                      {getSlotLabel(slot, t)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="mt-3 space-y-2">
                              {entry.slots.map((slot) => (
                                <div key={slot.slot} className="rounded-xl border border-border/60 bg-background/80 p-3">
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{getSlotLabel(slot.slot, t)}</p>
                                    <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                                      {slot.filled ? t("agent.slotStatusFilled") : t("agent.slotStatusMissing")}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-sm leading-6 text-foreground">
                                    {slot.filled ? slot.value : getSlotValueFallback(slot.slot)}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="mt-3">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugToolTraceTitle")}</p>
                              <p className="mt-1 text-sm text-foreground">
                                {t("agent.debugReplayToolCount").replace("{count}", String(entry.toolTrace.length))}
                              </p>
                            </div>

                            <div className="mt-3">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugDecisionTraceTitle")}</p>
                              {entry.decisionTrace.length === 0 ? (
                                <p className="mt-2 text-sm text-muted">{t("agent.debugDecisionTraceEmpty")}</p>
                              ) : (
                                <div className="mt-3 space-y-3">
                                  {entry.decisionTrace.map((item, traceIndex) => (
                                    <DecisionTraceCard key={`${item.type}-${traceIndex}`} item={item} />
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="mt-3">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugPromptInspectionTitle")}</p>
                              {!entry.promptSnapshot ? (
                                <p className="mt-2 text-sm text-muted">{t("agent.debugPromptInspectionEmpty")}</p>
                              ) : (
                                <div className="mt-3 space-y-3">
                                  <PromptSnapshotCard
                                    title={t("agent.debugPromptPlanner")}
                                    snapshot={entry.promptSnapshot.planner}
                                    charsLabel={t("agent.debugPromptChars")}
                                    systemLabel={t("agent.debugPromptSystem")}
                                    userLabel={t("agent.debugPromptUser")}
                                  />
                                  {entry.promptSnapshot.responder ? (
                                    <PromptSnapshotCard
                                      title={t("agent.debugPromptResponder")}
                                      snapshot={entry.promptSnapshot.responder}
                                      charsLabel={t("agent.debugPromptChars")}
                                      systemLabel={t("agent.debugPromptSystem")}
                                      userLabel={t("agent.debugPromptUser")}
                                    />
                                  ) : (
                                    <div className="rounded-xl border border-border/60 bg-background/80 px-3 py-3 text-sm text-muted">
                                      {t("agent.debugPromptResponderEmpty")}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="mt-3">
                              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("agent.debugPromptDiffTitle")}</p>
                              {!entry.promptSnapshot ? (
                                <p className="mt-2 text-sm text-muted">{t("agent.debugPromptInspectionEmpty")}</p>
                              ) : !previousEntryPrompt ? (
                                <p className="mt-2 text-sm text-muted">{t("agent.debugPromptDiffNoPrevious")}</p>
                              ) : (
                                <div className="mt-3 space-y-3">
                                  <PromptDiffCard
                                    title={t("agent.debugPromptPlanner")}
                                    current={entry.promptSnapshot.planner}
                                    previous={previousEntryPrompt.planner}
                                    statusChangedLabel={t("agent.debugPromptDiffChanged")}
                                    statusUnchangedLabel={t("agent.debugPromptDiffUnchanged")}
                                    systemLabel={t("agent.debugPromptSystem")}
                                    userLabel={t("agent.debugPromptUser")}
                                    summaryAddedLabel={t("agent.debugPromptDiffSummaryAdded")}
                                    summaryRemovedLabel={t("agent.debugPromptDiffSummaryRemoved")}
                                    linesAddedLabel={t("agent.debugPromptDiffLinesAdded")}
                                    linesRemovedLabel={t("agent.debugPromptDiffLinesRemoved")}
                                    noSummaryChangesLabel={t("agent.debugPromptDiffNoSummaryChanges")}
                                    noLineChangesLabel={t("agent.debugPromptDiffNoLineChanges")}
                                    deltaLabel={t("agent.debugPromptDiffDelta")}
                                  />
                                  {entry.promptSnapshot.responder && previousEntryPrompt.responder ? (
                                    <PromptDiffCard
                                      title={t("agent.debugPromptResponder")}
                                      current={entry.promptSnapshot.responder}
                                      previous={previousEntryPrompt.responder}
                                      statusChangedLabel={t("agent.debugPromptDiffChanged")}
                                      statusUnchangedLabel={t("agent.debugPromptDiffUnchanged")}
                                      systemLabel={t("agent.debugPromptSystem")}
                                      userLabel={t("agent.debugPromptUser")}
                                      summaryAddedLabel={t("agent.debugPromptDiffSummaryAdded")}
                                      summaryRemovedLabel={t("agent.debugPromptDiffSummaryRemoved")}
                                      linesAddedLabel={t("agent.debugPromptDiffLinesAdded")}
                                      linesRemovedLabel={t("agent.debugPromptDiffLinesRemoved")}
                                      noSummaryChangesLabel={t("agent.debugPromptDiffNoSummaryChanges")}
                                      noLineChangesLabel={t("agent.debugPromptDiffNoLineChanges")}
                                      deltaLabel={t("agent.debugPromptDiffDelta")}
                                    />
                                  ) : (
                                    <div className="rounded-xl border border-border/60 bg-background/80 px-3 py-3 text-sm text-muted">
                                      {t("agent.debugPromptDiffResponderUnavailable")}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                                </>
                              );
                            })()}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </aside>
          ) : null}
        </div>
      </section>
    </>
  );
}
