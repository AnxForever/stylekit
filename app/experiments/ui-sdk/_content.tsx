"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk/react/select";
import { Switch, SwitchThumb } from "@ui-sdk/react/switch";

const styles = [
  { value: "neo-brutalist", label: "Neo Brutalist" },
  { value: "glass", label: "Glassmorphism" },
  { value: "swiss", label: "Swiss Minimal" },
  { value: "bento", label: "Bento Grid" },
  { value: "retro", label: "Retro Terminal" },
];

const triggerClass =
  "flex w-64 items-center justify-between rounded-[6px] border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] transition-colors data-open:border-[var(--foreground)] data-placeholder:text-[var(--muted)] data-disabled:opacity-50";

const contentClass =
  "z-50 min-w-[var(--anchor-width)] rounded-[6px] border border-[var(--border)] bg-[var(--background)] p-1 shadow-lg";

const itemClass =
  "cursor-pointer rounded-[4px] px-3 py-2 text-sm text-[var(--foreground)] outline-none data-highlighted:bg-[var(--muted)]/15 data-selected:font-medium data-disabled:opacity-50";

export function UiSdkProbe() {
  const [style, setStyle] = useState<string | null>("glass");
  const [agentAnnouncements, setAgentAnnouncements] = useState(true);

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">
          ui-sdk 接入验证
        </h1>
        <p className="text-sm leading-6 text-[var(--muted)]">
          这一页只验证两件事：headless 组件能否在 Next 16 的
          App Router 里正常渲染并参与交互，以及能否用站点现有的 CSS
          变量和 Tailwind 的 data-* 变体把它完全换成 StyleKit 的皮肤。
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <Select
          items={styles}
          value={style}
          onValueChange={(value) => setStyle(value as string | null)}
        >
          <SelectLabel className="text-sm font-medium text-[var(--foreground)]">
            风格
          </SelectLabel>
          <SelectTrigger className={triggerClass}>
            <SelectValue placeholder="选择一种风格" />
            <span aria-hidden="true" className="text-[var(--muted)]">
              v
            </span>
          </SelectTrigger>
          <SelectContent className={contentClass}>
            {styles.map((item) => (
              <SelectItem key={item.value} className={itemClass} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-[var(--muted)]">
          当前值：{style ?? "未选择"}
        </p>
      </section>

      <section className="flex flex-col gap-2 rounded-[6px] border border-[var(--border)] px-4 py-3">
        <label className="flex items-center justify-between gap-6 text-sm text-[var(--foreground)]">
          <span className="flex flex-col gap-1">
            允许 agent 播报变更
            <span className="text-xs text-[var(--muted)]">
              原生 checkbox 的隐藏副本随组件一起渲染，表单提交时无需额外接线。
            </span>
          </span>
          <Switch
            checked={agentAnnouncements}
            onCheckedChange={setAgentAnnouncements}
            className="relative h-6 w-11 shrink-0 rounded-full border border-[var(--border)] bg-[var(--muted)]/25 transition-colors data-checked:bg-[var(--foreground)]"
          >
            <SwitchThumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-[var(--background)] transition-transform data-checked:translate-x-[1.375rem]" />
          </Switch>
        </label>
      </section>

    </main>
  );
}
