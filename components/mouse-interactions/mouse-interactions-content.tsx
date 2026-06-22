"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ROOMS } from "./rooms/registry";
import { GenericRoom } from "./rooms/generic-room";
import { NeoBrutalistRoom } from "./rooms/neo-brutalist-room";
import { GlassmorphismRoom } from "./rooms/glassmorphism-room";
import { EditorialRoom } from "./rooms/editorial-room";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/**
 * Cursor Lab —— 风格驱动的鼠标交互实验室。
 * 房间数据来自 rooms/registry (数据驱动, 8→20 逐步扩展)。
 * 现有 3 房间 (Component) 独立渲染; 新房间 (stage 配置) 由 GenericRoom 渲染。
 */

type Lang = "en" | "zh";

const copy = {
  en: {
    eyebrow: "Cursor Lab",
    title: "Mouse motion, styled by design language.",
    description:
      "Design languages, each with a custom set of pointer interactions. Same cursor, completely different character — pick a room and move.",
    desktopHint:
      "Best on desktop with a fine pointer. Reduced-motion users get a graceful static fallback.",
    chooseRoom: "Choose a room",
    interactions: "Interactions in this room",
    browseLibrary: "Browse the full pointer library",
  },
  zh: {
    eyebrow: "光标实验室",
    title: "同一种鼠标,不同风格各自动。",
    description:
      "每个设计语言,各自定制的指针交互。同一个光标,完全不同的性格——选一个房间,动起来。",
    desktopHint: "建议在桌面精细指针下体验。开启系统减少动效的用户会得到克制的静态降级。",
    chooseRoom: "选一个房间",
    interactions: "本房间的交互",
    browseLibrary: "浏览完整指针动效库",
  },
} as const;

export function MouseInteractionsContent() {
  const { locale } = useI18n();
  const lang: Lang = locale === "zh" ? "zh" : "en";
  const t = copy[lang];
  const [active, setActive] = useState(0);
  const room = ROOMS[active];

  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border bg-zinc-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 18% 20%, rgba(103,232,249,0.14), transparent 42%), radial-gradient(circle at 82% 78%, rgba(167,139,250,0.16), transparent 46%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/80">
            {t.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl leading-[1.04] md:text-6xl">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300">
            {t.description}
          </p>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400">{t.desktopHint}</p>
          <a
            href="#rooms"
            className="mt-10 inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-zinc-950"
          >
            {t.chooseRoom}
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="rooms" className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        {/* Tabs (滚动, 房间多) */}
        <div className="mb-6 flex flex-wrap gap-2">
          {ROOMS.map((r, i) => {
            const isActive = i === active;
            return (
              <button
                key={r.slug}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex items-center gap-2 border px-4 py-2.5 text-left transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:border-foreground hover:text-foreground",
                )}
                aria-pressed={isActive}
              >
                <span className="font-mono text-xs tracking-[0.2em]" style={{ opacity: isActive ? 0.7 : 0.5 }}>
                  {r.index}
                </span>
                <span className="text-sm font-medium">{r.name[lang]}</span>
                <span aria-hidden="true" className="inline-block h-2 w-2" style={{ background: r.accent }} />
              </button>
            );
          })}
        </div>

        {/* Stage */}
        <div className="overflow-hidden rounded-lg">
          {room.slug === "neo-brutalist" ? <NeoBrutalistRoom /> : null}
          {room.slug === "glassmorphism" ? <GlassmorphismRoom /> : null}
          {room.slug === "editorial" ? <EditorialRoom /> : null}
          {room.Component === undefined && room.stage ? <GenericRoom config={room} /> : null}
        </div>

        {/* Room details */}
        <div className="mt-8 grid gap-8 border-t border-border pt-8 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              {room.index} · {room.name[lang]}
            </p>
            <h2 className="mt-3 text-3xl leading-tight md:text-4xl">{room.tagline[lang]}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{room.note[lang]}</p>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              {t.interactions}
            </p>
            <ul className="divide-y divide-border border-y border-border">
              {room.effects[lang].map((effect, i) => (
                <li key={i} className="flex items-center gap-3 py-3 text-sm">
                  <span aria-hidden="true" className="inline-block h-1.5 w-6" style={{ background: room.accent }} />
                  {effect}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <Link
            href="/animations?category=pointer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {t.browseLibrary}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
