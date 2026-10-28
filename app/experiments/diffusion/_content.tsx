"use client";

import { RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button, Input } from "@/components/ui";

import fallback from "./_fallback.json";

const PRESETS = [
  "解释一下扩散模型是怎么工作的",
  "为什么噪声里的文字会先显出轮廓",
  "写一段关于深夜便利店的描写",
  "What is a diffusion model, briefly?",
];

/**
 * One solid ink per position. Colour is a marker, not a measurement: it says
 * "this glyph is still moving" and nothing else, so every unsettled character
 * gets its own fixed hue instead of a shared gradient.
 */
const INK = [
  "#3f9e8a",
  "#3f7fc4",
  "#6f63c9",
  "#a95fa8",
  "#c25f6b",
  "#b07d2f",
  "#4f9a4a",
  "#3f93a8",
];

/**
 * Mercury returns its whole trace in about a second — roughly 20–40 snapshots
 * of the same paragraph. Painting them on arrival would be a single flash, so
 * the trace is buffered and replayed at this pace. No state is invented: every
 * frame shown here came back from the model.
 */
const PACE_MS = 120;
const MAX_PROMPT = 400;

type Status = "loading" | "playing" | "done";

type Cell = { el: HTMLSpanElement; tone: number };

export function DiffusionLab() {
  const [prompt, setPrompt] = useState(PRESETS[0]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ frame: 0, total: 0, ms: 0, unsettled: 0 });
  const [answer, setAnswer] = useState("");

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const cellsRef = useRef<Cell[]>([]);
  const framesRef = useRef<string[]>([]);
  const finalRef = useRef("");
  const timerRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const startedAt = useRef(0);
  const reduceRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = query.matches;
    const onChange = (event: MediaQueryListEvent) => {
      reduceRef.current = event.matches;
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const stopPump = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  /**
   * Builds one span per character of the answer. Each position gets a fixed
   * hue, so the noise reads as many distinct solid colours rather than a
   * gradient, and a glyph never changes colour while it is churning.
   */
  const mount = useCallback((frames: string[]) => {
    const field = fieldRef.current;
    if (!field) return;

    const final = frames[frames.length - 1] ?? "";
    finalRef.current = final;
    field.replaceChildren();
    cellsRef.current = [];

    const fragment = document.createDocumentFragment();

    for (let p = 0; p < final.length; p += 1) {
      const el = document.createElement("span");
      el.className = "dl-ch";
      el.textContent = final[p];
      el.style.visibility = "hidden";
      fragment.appendChild(el);
      cellsRef.current.push({ el, tone: p });
    }

    field.appendChild(fragment);
  }, []);

  /**
   * Paints one snapshot. Colour marks the positions that are still wrong; the
   * moment a glyph matches the answer it drops to plain ink and stops moving.
   */
  const paint = useCallback((frameIndex: number) => {
    const cells = cellsRef.current;
    const final = finalRef.current;
    if (cells.length === 0) return;

    const snapshot = framesRef.current[frameIndex] ?? "";
    let churning = 0;

    for (let p = 0; p < cells.length; p += 1) {
      const cell = cells[p];

      if (p >= snapshot.length) {
        cell.el.style.visibility = "hidden";
        churning += 1;
        continue;
      }
      if (cell.el.style.visibility) cell.el.style.visibility = "";

      const shown = snapshot[p];
      if (cell.el.textContent !== shown) cell.el.textContent = shown;

      if (shown === final[p]) {
        if (cell.el.style.color) cell.el.style.color = "";
        continue;
      }

      churning += 1;
      cell.el.style.color = INK[cell.tone % INK.length];
    }

    setStats({
      frame: frameIndex + 1,
      total: framesRef.current.length,
      ms: Math.round(performance.now() - startedAt.current),
      unsettled: churning,
    });
  }, []);

  /** Replays the buffered trace at a watchable pace, then rests on the answer. */
  const play = useCallback(() => {
    stopPump();
    const frames = framesRef.current;
    if (frames.length === 0) return;

    // Reduced motion: skip the replay and show the finished paragraph.
    if (reduceRef.current) {
      paint(frames.length - 1);
      setStatus("done");
      setAnswer(finalRef.current);
      return;
    }

    let k = 0;
    const step = () => {
      paint(k);

      if (k >= frames.length - 1) {
        timerRef.current = null;
        setStatus("done");
        setAnswer(finalRef.current);
        return;
      }
      k += 1;
      timerRef.current = window.setTimeout(step, PACE_MS);
    };
    step();
  }, [paint]);

  const run = useCallback(
    async (rawPrompt: string) => {
      const text = rawPrompt.trim();
      if (!text) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      stopPump();
      fieldRef.current?.replaceChildren();
      cellsRef.current = [];
      framesRef.current = [];
      finalRef.current = "";
      setError(null);
      setAnswer("");
      setStatus("loading");
      setStats({ frame: 0, total: 0, ms: 0, unsettled: 0 });
      startedAt.current = performance.now();

      try {
        const response = await fetch("/api/experiments/diffusion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: text.slice(0, MAX_PROMPT) }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const detail = await response
            .json()
            .then((payload: { error?: string }) => payload.error)
            .catch(() => null);
          throw new Error(detail || `请求失败（${response.status}）`);
        }

        // Consume the NDJSON stream incrementally; each line is one full snapshot.
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const raw of lines) {
            if (!raw.trim()) continue;
            const message = JSON.parse(raw) as
              | { i: number; text: string }
              | { done: true; frames: number }
              | { error: string };

            if ("error" in message) throw new Error(message.error);
            if ("done" in message) continue;

            framesRef.current.push(message.text);
            setStats((previous) => ({
              ...previous,
              total: framesRef.current.length,
            }));
          }
        }

        if (framesRef.current.length === 0) throw new Error("轨迹为空");
        mount(framesRef.current);
        setStatus("playing");
        play();
      } catch (caught) {
        if (controller.signal.aborted) return;

        // The demo must still demonstrate: replay a recording and say so.
        const frames = fallback.frames as string[];
        const reason =
          caught instanceof TypeError
            ? "网络请求失败"
            : caught instanceof Error
              ? caught.message
              : "请求失败";
        setError(`${reason}　—— 改为播放一段已录制的轨迹。`);
        framesRef.current = [...frames];
        startedAt.current = performance.now();
        mount(frames);
        setStatus("playing");
        play();
      }
    },
    [mount, play]
  );

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      stopPump();
    };
  }, []);

  // Land on a running demo: the point of the page is the motion, not a button.
  useEffect(() => {
    const handle = window.setTimeout(() => void run(PRESETS[0]), 0);
    return () => {
      window.clearTimeout(handle);
      abortRef.current?.abort();
    };
  }, [run]);

  const busy = status === "loading" || status === "playing";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[880px] px-6 pb-28 md:px-9">
        <header className="flex h-14 items-center justify-between border-b border-border text-[12.5px] text-muted">
          <span className="text-[13.5px] font-semibold tracking-[0.02em] text-foreground">
            StyleKit
          </span>
          <span>实验 · 扩散语言模型</span>
        </header>

        <h1 className="mt-16 mb-5 font-serif text-[27px] font-semibold leading-[1.45] tracking-[-0.005em] md:mt-20 md:text-[30px]">
          一段文字的轮廓，
          <br />
          比它的内容先出现。
        </h1>
        <p className="m-0 max-w-[60ch] text-[15px] leading-[1.9] text-muted">
          扩散语言模型不往下接字。它一次性给出整段的长度与骨架，然后并行改写那些还站不住的位置。
          <span className="text-foreground">
            下面每一帧都是 Mercury 3 实时返回的中间状态
          </span>
          ，彩色只涂在还没定型的字符上。
        </p>

        <section className="mt-11" aria-label="去噪演示">
          <div
            ref={fieldRef}
            className="dl-field min-h-[12em]"
            aria-hidden="true"
            data-testid="diffusion-field"
          />
          <p className="sr-only" aria-live="polite" data-testid="diffusion-answer">
            {answer}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 font-mono text-[11.5px] text-muted">
            <span className="tabular-nums">
              {stats.frame} / {stats.total} 帧
            </span>
            <span className="tabular-nums">{(stats.ms / 1000).toFixed(2)} 秒</span>
            <span className="tabular-nums">{stats.unsettled} 个未定字符</span>
            <span className="ml-auto">
              {status === "loading"
                ? "取回轨迹…"
                : status === "playing"
                  ? "去噪中…"
                  : "已完成"}
            </span>
          </div>

          {error ? (
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{error}</p>
          ) : null}
        </section>

        <section className="mt-9 border-t border-border pt-6">
          <label htmlFor="dl-prompt" className="mb-2 block text-[13px] font-medium">
            换成你自己的句子
          </label>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Input
              id="dl-prompt"
              value={prompt}
              maxLength={MAX_PROMPT}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !busy) void run(prompt);
              }}
              placeholder="想让它写点什么？"
              className="flex-1"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => void run(prompt)}
              disabled={busy || prompt.trim().length === 0}
              className="shrink-0"
            >
              {busy ? (
                <RefreshCw className="mr-2 h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Sparkles className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              )}
              {busy ? "去噪中" : "开始去噪"}
            </Button>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <Button
                key={preset}
                type="button"
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => {
                  setPrompt(preset);
                  void run(preset);
                }}
                className="rounded-full font-normal"
              >
                {preset}
              </Button>
            ))}
          </div>
        </section>

        <div className="mt-20 space-y-11">
          <section>
            <h2 className="mb-3 text-[14px] font-semibold">
              彩色只属于还没定型的字符
            </h2>
            <p className="mb-3.5 text-[14.5px] leading-[1.85] text-muted">
              每个位置的颜色是它最终定型的那一轮，所以深浅排出了收敛的先后。一旦某个字符与最终文本一致，它立刻变成墨色并停止移动。
            </p>
            <p className="m-0 text-[14.5px] leading-[1.85] text-muted">
              最先安静的常常是句子中间，甚至是结尾。模型并没有从左往右推进。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[14px] font-semibold">两个过程</h2>
            <p className="mb-3.5 text-[14.5px] leading-[1.85] text-muted">
              <strong className="font-semibold text-foreground">前向：</strong>
              拿一段干净文本，按比例逐步替换成噪声。扰动只发生在字符本身，长度与空格骨架不动——这就是为什么第一帧就能看出段落的形状。
            </p>
            <p className="m-0 text-[14.5px] leading-[1.85] text-muted">
              <strong className="font-semibold text-foreground">反向：</strong>
              训练一个网络只做一件事，把当前这一版猜得更准一点。从随机开始重复这个动作，就得到了一段从未存在过的文字。
            </p>
          </section>

          <p className="m-0 border-l-2 border-border pl-[18px] text-[14.5px] leading-[1.85] text-muted">
            自回归模型每写一个字就做一次不可撤回的决定。扩散模型用十几轮可撤回的决定，一起处理整段。
          </p>
        </div>

        <footer className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-[12px] text-muted">
          <span>Mercury 3 · reasoning instant · realtime</span>
          <a
            href="https://docs.inceptionlabs.ai"
            target="_blank"
            rel="noreferrer"
            className="border-b border-border no-underline transition-colors hover:text-foreground"
          >
            Inception API
          </a>
        </footer>
      </div>

      <style>{`
        .dl-field {
          font-family: var(--font-mono-active), ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 17px;
          line-height: 2.05;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          word-break: normal;
        }
        @media (min-width: 768px) {
          .dl-field { font-size: 18.5px; }
        }
        .dl-ch {
          display: inline-block;
          white-space: pre;
          transition: color 200ms ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .dl-ch { transition: none; }
        }
      `}</style>
    </div>
  );
}
