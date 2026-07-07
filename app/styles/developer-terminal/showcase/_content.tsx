"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ─── RevealBlock ──────────────────────────────────────────────────────────────

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.35s steps(6) ${delay}s, transform 0.35s steps(6) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Terminal Primitives ──────────────────────────────────────────────────────

function Cursor({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`dt-cursor inline-block w-2 h-4 bg-[#4AF626] align-middle ${className}`}
    />
  );
}

function PromptPrefix({ path = "~" }: { path?: string }) {
  return (
    <span>
      <span className="text-[#8BE9FD]">visitor@stylekit</span>
      <span className="text-[#6272A4]">:{path}$</span>
    </span>
  );
}

function ExitBadge({ code }: { code: number }) {
  const ok = code === 0;
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 text-[10px] rounded-sm border ${
        ok
          ? "text-[#4AF626] border-[#4AF626]/40"
          : "text-[#FF79C6] border-[#FF79C6]/40"
      }`}
    >
      [{code}] {ok ? "OK" : "ERR"}
    </span>
  );
}

function AsciiRule({ label }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-2 text-xs text-[#1F2937] overflow-hidden whitespace-nowrap select-none"
    >
      <span>{"─".repeat(8)}</span>
      {label ? <span className="text-[#6272A4] shrink-0">{label}</span> : null}
      <span className="flex-1 overflow-hidden">{"─".repeat(160)}</span>
    </div>
  );
}

function SectionHeader({
  command,
  comment,
}: {
  command: string;
  comment: string;
}) {
  return (
    <div className="space-y-1 mb-4">
      <p className="text-xs text-[#6272A4]"># {comment}</p>
      <h2 className="text-base md:text-lg font-bold text-[#4AF626]">
        <PromptPrefix /> {command}
      </h2>
    </div>
  );
}

function AsciiProgress({ label, pct }: { label: string; pct: number }) {
  const total = 22;
  const filled = Math.round((pct / 100) * total);
  const barColor =
    pct >= 85 ? "text-[#4AF626]" : pct >= 50 ? "text-[#8BE9FD]" : "text-[#FFB86C]";
  return (
    <div className="flex items-center gap-3 text-xs md:text-sm">
      <span className="w-24 md:w-36 shrink-0 text-[#6272A4] truncate">{label}</span>
      <span className={`${barColor} tracking-tight`}>
        [{"█".repeat(filled)}{"░".repeat(total - filled)}]
      </span>
      <span className="w-10 text-right text-[#FFB86C]">{pct}%</span>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const bootLines: { tag: string; tagColor: string; text: string }[] = [
  { tag: "[ OK ]", tagColor: "text-[#8BE9FD]", text: "mounted /dev/portfolio" },
  { tag: "[ OK ]", tagColor: "text-[#8BE9FD]", text: "loaded 12 projects, 34 posts, 1 developer" },
  { tag: "[ OK ]", tagColor: "text-[#8BE9FD]", text: "started stylekit-showcase.service" },
  { tag: "[WARN]", tagColor: "text-[#FFB86C]", text: "coffee level at 12% -- refill recommended" },
];

type SessionId = "overview" | "logs" | "monitor";

const sessions: { id: SessionId; label: string }[] = [
  { id: "overview", label: "0:overview" },
  { id: "logs", label: "1:logs" },
  { id: "monitor", label: "2:monitor" },
];

interface FakeCommand {
  cmd: string;
  comment: string;
  exit: number;
  output: { text: string; color: string }[];
}

const fakeCommands: FakeCommand[] = [
  {
    cmd: "whoami --verbose",
    comment: "print identity",
    exit: 0,
    output: [
      { text: "# identity loaded from ~/.profile", color: "text-[#6272A4]" },
      { text: "name:   \"Terminal Developer\"", color: "text-[#4AF626]" },
      { text: "role:   full-stack / design systems", color: "text-[#4AF626]" },
      { text: "stack:  [typescript, react, node, postgres]", color: "text-[#8BE9FD]" },
      { text: "uptime: 8 years in production", color: "text-[#FFB86C]" },
    ],
  },
  {
    cmd: "ls ~/projects",
    comment: "list shipped work",
    exit: 0,
    output: [
      { text: "stylekit-registry/   cli-toolbox/   dark-dashboard/", color: "text-[#8BE9FD]" },
      { text: "prompt-pairs/        tokens.json    README.md", color: "text-[#4AF626]" },
      { text: "# 12 entries, 0 abandoned side projects (allegedly)", color: "text-[#6272A4]" },
    ],
  },
  {
    cmd: "curl -s api.stylekit.top/status",
    comment: "ping the mothership",
    exit: 0,
    output: [
      { text: "{", color: "text-[#4AF626]" },
      { text: "  \"status\": \"operational\",", color: "text-[#8BE9FD]" },
      { text: "  \"styles\": 130,", color: "text-[#FFB86C]" },
      { text: "  \"latency_ms\": 42", color: "text-[#FFB86C]" },
      { text: "}", color: "text-[#4AF626]" },
    ],
  },
  {
    cmd: "sudo rm -rf /prod",
    comment: "please do not",
    exit: 1,
    output: [
      { text: "rm: refusing to operate on /prod", color: "text-[#FF79C6]" },
      { text: "rm: this incident will be reported", color: "text-[#FF79C6]" },
      { text: "# nice try. exit code 1 for you.", color: "text-[#6272A4]" },
    ],
  },
];

const paletteRows: { token: string; hex: string; role: string; swatch: string }[] = [
  { token: "$term-green", hex: "#4AF626", role: "stdout / prompt / success", swatch: "bg-[#4AF626]" },
  { token: "$term-black", hex: "#0A0E12", role: "background / character cell", swatch: "bg-[#0A0E12] border border-[#1F2937]" },
  { token: "$term-cyan", hex: "#8BE9FD", role: "paths / links / info", swatch: "bg-[#8BE9FD]" },
  { token: "$term-magenta", hex: "#FF79C6", role: "keywords / stderr / danger", swatch: "bg-[#FF79C6]" },
  { token: "$term-amber", hex: "#FFB86C", role: "strings / numbers / warnings", swatch: "bg-[#FFB86C]" },
  { token: "$term-comment", hex: "#6272A4", role: "comments / muted / inactive", swatch: "bg-[#6272A4]" },
];

const lsRows: { perms: string; size: string; date: string; name: string; color: string }[] = [
  { perms: "drwxr-xr-x", size: "4096", date: "Jul 03 21:14", name: "stylekit-registry/", color: "text-[#8BE9FD]" },
  { perms: "drwxr-xr-x", size: "4096", date: "Jun 30 18:47", name: "cli-toolbox/", color: "text-[#8BE9FD]" },
  { perms: "-rw-r--r--", size: " 18K", date: "Jun 28 09:02", name: "design-tokens.json", color: "text-[#4AF626]" },
  { perms: "-rwxr-xr-x", size: "2.4K", date: "Jun 21 23:59", name: "deploy.sh", color: "text-[#FFB86C]" },
  { perms: "-rw-r--r--", size: "1.2K", date: "Jun 14 11:30", name: "README.md", color: "text-[#4AF626]" },
  { perms: "lrwxrwxrwx", size: "  11", date: "May 09 08:15", name: "dotfiles -> ~/.config", color: "text-[#FF79C6]" },
];

const processRows: { pid: string; service: string; cpu: string; mem: string; uptime: string; exit: number }[] = [
  { pid: "1042", service: "next-server", cpu: "12.4", mem: "3.1", uptime: "14d 02:41", exit: 0 },
  { pid: "1187", service: "postgres", cpu: "4.2", mem: "8.7", uptime: "14d 02:40", exit: 0 },
  { pid: "2310", service: "redis-cache", cpu: "0.8", mem: "1.2", uptime: "9d 17:03", exit: 0 },
  { pid: "3471", service: "webhook-relay", cpu: "0.1", mem: "0.4", uptime: "2d 05:58", exit: 0 },
  { pid: "4096", service: "legacy-cron", cpu: "97.3", mem: "12.9", uptime: "00:00:12", exit: 1 },
];

const logLines: { level: string; stream: string; color: string; msg: string }[] = [
  { level: "INFO", stream: "stdout", color: "text-[#8BE9FD]", msg: "session established from 203.0.113.7 (nice terminal, by the way)" },
  { level: " OK ", stream: "stdout", color: "text-[#4AF626]", msg: "build completed in 4.2s -- 0 errors, 0 warnings, 1 happy developer" },
  { level: "WARN", stream: "stdout", color: "text-[#FFB86C]", msg: "deprecated flag --yolo will be removed in v2.0" },
  { level: "ERR!", stream: "stderr", color: "text-[#FF79C6]", msg: "connection to sleep.service refused: developer still online at 02:00" },
];

const gitLog: { hash: string; msg: string; meta: string }[] = [
  { hash: "a1f626b", msg: "feat: replace marketing page with terminal session", meta: "visitor, 2 hours ago" },
  { hash: "8be9fdc", msg: "fix: cursor now blinks at the correct 1.06s interval", meta: "visitor, 1 day ago" },
  { hash: "ff79c6d", msg: "refactor: delete 14 divs, add 3 prompts", meta: "visitor, 3 days ago" },
];

const doRules: string[] = [
  "font-mono for every glyph on the page",
  "near-black #0A0E12 + phosphor green #4AF626",
  "headings start with visitor@stylekit:~$",
  "content reads as command + output pairs",
  "exit code badges: [0] OK / [1] ERR",
  "tmux status bar at the bottom",
];

const dontRules: string[] = [
  "sans-serif or serif fonts",
  "white or light backgrounds",
  "rounded-lg and larger radii",
  "gradients and glassmorphism",
  "photography and illustration",
  "a 5th terminal accent color",
];

// ─── Main Showcase ────────────────────────────────────────────────────────────

export default function DeveloperTerminalShowcaseContent() {
  const [activeSession, setActiveSession] = useState<SessionId>("overview");
  const [activeCmd, setActiveCmd] = useState<number>(0);
  const [scanlines, setScanlines] = useState(true);
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setClock(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const runningCmd = fakeCommands[activeCmd];

  return (
    <div className="relative min-h-screen bg-[#0A0E12] font-mono text-[#4AF626] text-sm pb-16">
      <style>{`
        @keyframes dt-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .dt-cursor { animation: dt-blink 1.06s steps(1, end) infinite; }
        .dt-scanlines::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 40;
          background: repeating-linear-gradient(
            to bottom,
            rgba(139, 233, 253, 0.025) 0px,
            rgba(139, 233, 253, 0.025) 1px,
            transparent 1px,
            transparent 3px
          );
        }
        .dt-selection ::selection { background: rgba(74, 246, 38, 0.3); color: #4AF626; }
      `}</style>

      {/* Optional CRT scanline overlay */}
      {scanlines ? <div aria-hidden="true" className="dt-scanlines absolute inset-0 pointer-events-none" /> : null}

      {/* ─── Section 1: Terminal Window Chrome ─────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0D141B] border-b border-[#1F2937]">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF79C6]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FFB86C]" />
              <span className="w-2.5 h-2.5 rounded-sm bg-[#4AF626]" />
            </div>
            <span className="text-xs text-[#6272A4] hidden sm:inline">
              visitor@stylekit: ~/showcase/developer-terminal -- 80x24
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setScanlines(!scanlines)}
              className="px-2 py-1 border border-[#1F2937] rounded-sm text-[#8BE9FD] hover:bg-[#8BE9FD]/10 transition-colors duration-150"
            >
              --scanlines={scanlines ? "on" : "off"}
            </button>
            <Link
              href="/styles/developer-terminal"
              className="px-2 py-1 border border-[#1F2937] rounded-sm text-[#4AF626] hover:bg-[#4AF626]/10 transition-colors duration-150"
            >
              man developer-terminal
            </Link>
          </div>
        </div>
      </header>

      <main className="dt-selection max-w-5xl mx-auto px-4 md:px-6 space-y-10 pt-8">
        {/* ─── Section 2: Hero / Boot Sequence + motd ──────────────────── */}
        <RevealBlock>
          <section className="space-y-1.5">
            <p className="text-xs text-[#6272A4]">Last login: Fri Jul 5 09:41:07 2026 on ttys001</p>
            {bootLines.map((line, i) => (
              <p key={i} className="text-xs md:text-sm">
                <span className={line.tagColor}>{line.tag}</span>{" "}
                <span className="text-[#4AF626]">{line.text}</span>
              </p>
            ))}
            <div className="pt-4 pb-2">
              <p className="text-xs text-[#6272A4]"># /etc/motd -- message of the day</p>
              <pre className="text-[#4AF626] text-[10px] sm:text-xs md:text-sm leading-tight overflow-x-auto py-2" aria-label="STYLEKIT TERMINAL">
{`  ____ _____ _   _ _     _____ _  _____ _____
 / ___|_   _| | | | |   | ____| |/ /_ _|_   _|
 \\___ \\ | | | |_| | |   |  _| | ' / | |  | |
  ___) || | |  _  | |___| |___| . \\ | |  | |
 |____/ |_| |_| |_|_____|_____|_|\\_\\___| |_|   .term v1.0`}
              </pre>
              <p className="text-[#6272A4] text-xs md:text-sm max-w-2xl">
                # A website as a terminal session: content is command output,
                <br /># and tool authenticity is developer identity.
              </p>
            </div>
            <p className="text-sm md:text-base">
              <PromptPrefix /> start_showcase --style=developer-terminal <Cursor className="ml-1" />
            </p>
          </section>
        </RevealBlock>

        <AsciiRule label="tmux sessions" />

        {/* ─── Section 3: Interactive tmux Session Tabs ────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="tmux attach -t stylekit" comment="three windows, one session -- click to switch panes" />
            <div className="border border-[#1F2937] rounded-sm overflow-hidden">
              <div className="flex items-center gap-px bg-[#0D141B] border-b border-[#1F2937] p-1 text-xs overflow-x-auto">
                <span className="px-2 py-1 text-[#6272A4] select-none shrink-0">[stylekit]</span>
                {sessions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSession(s.id)}
                    className={`px-3 py-1 rounded-sm transition-colors duration-150 shrink-0 ${
                      activeSession === s.id
                        ? "bg-[#4AF626] text-[#0A0E12] font-bold"
                        : "text-[#4AF626] hover:bg-[#4AF626]/10"
                    }`}
                  >
                    {s.label}
                    {activeSession === s.id ? "*" : ""}
                  </button>
                ))}
              </div>
              <div className="p-4 min-h-[190px] space-y-1 text-xs md:text-sm">
                {activeSession === "overview" && (
                  <>
                    <p className="text-[#6272A4]"># window 0 -- what this style is about</p>
                    <p><PromptPrefix /> cat overview.txt</p>
                    <p>Developer Terminal borrows the language of the shell:</p>
                    <p>
                      <span className="text-[#8BE9FD]">prompts</span> instead of headings,{" "}
                      <span className="text-[#FFB86C]">stdout</span> instead of paragraphs,
                    </p>
                    <p>
                      <span className="text-[#FF79C6]">stderr</span> instead of error banners, and a cursor that never stops blinking.
                    </p>
                    <p className="pt-2 text-[#6272A4]"># zero gradients. zero photos. one hundred percent monospace.</p>
                  </>
                )}
                {activeSession === "logs" && (
                  <>
                    <p className="text-[#6272A4]"># window 1 -- tail -f /var/log/showcase.log</p>
                    <p><PromptPrefix path="/var/log" /> tail -f showcase.log</p>
                    <p><span className="text-[#8BE9FD]">09:41:07</span> INFO  render: 16 sections mounted</p>
                    <p><span className="text-[#8BE9FD]">09:41:08</span> INFO  cursor: blinking at 1.06s interval</p>
                    <p><span className="text-[#8BE9FD]">09:41:12</span> <span className="text-[#FFB86C]">WARN  visitor stared at the ASCII art for 4s</span></p>
                    <p><span className="text-[#8BE9FD]">09:41:15</span> INFO  scanlines: {scanlines ? "enabled" : "disabled"} by user</p>
                    <p className="text-[#6272A4]">^C to detach (just kidding, click another window)</p>
                  </>
                )}
                {activeSession === "monitor" && (
                  <>
                    <p className="text-[#6272A4]"># window 2 -- htop, but honest</p>
                    <p><PromptPrefix /> htop --sort-key=vibes</p>
                    <div className="space-y-1 pt-1">
                      <AsciiProgress label="CPU [dev]" pct={42} />
                      <AsciiProgress label="MEM [tabs]" pct={87} />
                      <AsciiProgress label="SWP [sleep]" pct={13} />
                    </div>
                    <p className="pt-2 text-[#6272A4]"># load average: 0.42, 0.38, 0.35 -- comfortably idle</p>
                  </>
                )}
              </div>
            </div>
          </section>
        </RevealBlock>

        <AsciiRule label="theme.conf" />

        {/* ─── Section 4: Color Palette ────────────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="cat /etc/theme.conf" comment="five colors, five meanings -- color is syntax, not decoration" />
            <div className="border border-[#1F2937] rounded-sm bg-[#0D141B] p-4 space-y-2 text-xs md:text-sm overflow-x-auto">
              {paletteRows.map((row) => (
                <div key={row.token} className="flex items-center gap-3 min-w-[480px]">
                  <span className={`w-4 h-4 rounded-sm shrink-0 ${row.swatch}`} />
                  <span className="w-32 shrink-0 text-[#8BE9FD]">{row.token}</span>
                  <span className="w-20 shrink-0 text-[#FFB86C]">{row.hex}</span>
                  <span className="text-[#6272A4]"># {row.role}</span>
                </div>
              ))}
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 5: Typography ───────────────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="man typography" comment="one family, many weights -- the mono scale" />
            <div className="border border-[#1F2937] rounded-sm bg-[#0D141B] p-4 space-y-3">
              <div>
                <p className="text-xs text-[#6272A4]"># hero -- text-2xl md:text-4xl font-bold</p>
                <p className="text-2xl md:text-4xl font-bold">$ echo hello, world</p>
              </div>
              <div>
                <p className="text-xs text-[#6272A4]"># h2 -- text-lg md:text-xl font-bold</p>
                <p className="text-lg md:text-xl font-bold">## Subheading as a markdown echo</p>
              </div>
              <div>
                <p className="text-xs text-[#6272A4]"># body -- text-sm, phosphor green on near-black</p>
                <p className="max-w-2xl">
                  Body copy is stdout. It wraps at a comfortable measure, keeps its
                  line-height tight, and never switches families. Inline{" "}
                  <span className="text-[#8BE9FD]">paths/are/cyan</span>, inline{" "}
                  <span className="text-[#FFB86C]">&quot;strings are amber&quot;</span>, and{" "}
                  <span className="text-[#FF79C6]">keywords are magenta</span>.
                </p>
              </div>
              <div>
                <p className="text-xs text-[#6272A4]"># comment -- text-xs text-[#6272A4]</p>
                <p className="text-xs text-[#6272A4]"># everything after a hash is for humans, not the shell</p>
              </div>
            </div>
          </section>
        </RevealBlock>

        <AsciiRule label="bin" />

        {/* ─── Section 6: Buttons as Commands ──────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="ls /usr/bin/actions" comment="buttons are executables -- primary is inverted, danger is magenta" />
            <div className="border border-[#1F2937] rounded-sm bg-[#0D141B] p-4 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-4 py-1.5 bg-[#4AF626] text-[#0A0E12] font-bold rounded-sm hover:bg-[#3FD41F] active:translate-y-px transition-colors duration-150">
                  ./deploy --prod
                </button>
                <button className="px-4 py-1.5 bg-transparent text-[#4AF626] border border-[#1F2937] rounded-sm hover:border-[#4AF626]/60 hover:bg-[#4AF626]/10 transition-colors duration-150">
                  make build
                </button>
                <button className="px-4 py-1.5 bg-transparent text-[#8BE9FD] border border-[#8BE9FD]/40 rounded-sm hover:bg-[#8BE9FD]/10 transition-colors duration-150">
                  git push origin main
                </button>
                <button className="px-4 py-1.5 bg-transparent text-[#FF79C6] border border-[#FF79C6]/40 rounded-sm hover:bg-[#FF79C6]/10 transition-colors duration-150">
                  rm -rf ./cache
                </button>
                <button
                  disabled
                  className="px-4 py-1.5 bg-transparent text-[#6272A4] border border-[#1F2937] rounded-sm opacity-40 cursor-not-allowed"
                >
                  sudo make coffee
                </button>
              </div>
              <p className="text-xs text-[#6272A4]">
                # hover shifts background alpha only -- no scale, no translate, no shadow
              </p>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 7: Interactive Command Runner ───────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="history | grep demo" comment="click a command to execute it -- output renders below" />
            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-[#1F2937] rounded-sm bg-[#0D141B] p-2 space-y-1">
                {fakeCommands.map((c, i) => (
                  <button
                    key={c.cmd}
                    onClick={() => setActiveCmd(i)}
                    className={`w-full text-left px-3 py-2 rounded-sm text-xs md:text-sm transition-colors duration-150 ${
                      activeCmd === i
                        ? "bg-[#4AF626]/15 text-[#4AF626] border border-[#4AF626]/40"
                        : "text-[#4AF626] border border-transparent hover:bg-[#4AF626]/10"
                    }`}
                  >
                    <span className="text-[#6272A4] mr-2">{String(i + 1).padStart(3, " ")}</span>
                    {c.cmd}
                    <span className="block pl-8 text-[10px] text-[#6272A4]"># {c.comment}</span>
                  </button>
                ))}
              </div>
              <div className="border border-[#1F2937] rounded-sm bg-[#0A0E12] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#1F2937] bg-[#0D141B]">
                  <p className="text-xs md:text-sm truncate">
                    <PromptPrefix /> {runningCmd.cmd}
                  </p>
                  <ExitBadge code={runningCmd.exit} />
                </div>
                <div className="p-3 space-y-1 text-xs md:text-sm flex-1">
                  {runningCmd.output.map((line, i) => (
                    <p key={i} className={`whitespace-pre-wrap ${line.color}`}>{line.text}</p>
                  ))}
                  <p className="pt-1">
                    <PromptPrefix /> <Cursor className="ml-1" />
                  </p>
                </div>
              </div>
            </div>
          </section>
        </RevealBlock>

        <AsciiRule label="panels" />

        {/* ─── Section 8: Output Panel Cards ───────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="cat panels/*.out" comment="cards are output panels -- stdout, stderr, and comments" />
            <div className="grid md:grid-cols-3 gap-3 text-xs md:text-sm">
              <div className="bg-[#0D141B] border border-[#1F2937] rounded-sm overflow-hidden hover:border-[#4AF626]/40 transition-colors duration-150">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#1F2937]">
                  <span className="truncate">$ uptime</span>
                  <ExitBadge code={0} />
                </div>
                <div className="px-3 py-3 space-y-1">
                  <p className="text-[#6272A4]"># stdout panel</p>
                  <p>09:41 up 14 days,</p>
                  <p><span className="text-[#FFB86C]">3</span> users, load <span className="text-[#FFB86C]">0.42</span></p>
                </div>
              </div>
              <div className="bg-[#0D141B] border border-[#FF79C6]/40 rounded-sm overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#FF79C6]/30">
                  <span className="truncate">$ npm run legacy</span>
                  <ExitBadge code={1} />
                </div>
                <div className="px-3 py-3 space-y-1">
                  <p className="text-[#6272A4]"># stderr panel</p>
                  <p className="text-[#FF79C6]">Error: module &apos;jquery&apos;</p>
                  <p className="text-[#FF79C6]">was last seen in 2014</p>
                </div>
              </div>
              <div className="bg-[#0D141B] border border-dashed border-[#6272A4]/50 rounded-sm overflow-hidden">
                <div className="px-3 py-2 border-b border-dashed border-[#6272A4]/40 text-[#6272A4]">
                  # NOTES.md
                </div>
                <div className="px-3 py-3 space-y-1 text-[#6272A4]">
                  <p># comment panel: dashed border,</p>
                  <p># blue-gray text, no exit code.</p>
                  <p># for asides and footnotes.</p>
                </div>
              </div>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 9: Forms as Prompt Lines ────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="ssh guestbook@stylekit" comment="inputs are prompt lines -- green caret, cyan prefix, zero chrome" />
            <div className="border border-[#1F2937] rounded-sm bg-[#0D141B] p-4 space-y-3 text-xs md:text-sm">
              <div className="flex items-center gap-2 bg-[#0A0E12] border border-[#1F2937] rounded-sm px-3 py-2.5 focus-within:border-[#4AF626]/60 transition-colors duration-150">
                <span className="shrink-0 text-[#6272A4]">login as:</span>
                <input
                  type="text"
                  placeholder="visitor"
                  className="flex-1 min-w-0 bg-transparent text-[#4AF626] placeholder:text-[#6272A4] caret-[#4AF626] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 bg-[#0A0E12] border border-[#1F2937] rounded-sm px-3 py-2.5 focus-within:border-[#4AF626]/60 transition-colors duration-150">
                <span className="shrink-0"><PromptPrefix /></span>
                <input
                  type="text"
                  placeholder="type a command..."
                  className="flex-1 min-w-0 bg-transparent text-[#4AF626] placeholder:text-[#6272A4] caret-[#4AF626] focus:outline-none"
                />
                <Cursor />
              </div>
              <div className="bg-[#0A0E12] border border-[#1F2937] rounded-sm px-3 py-2.5 focus-within:border-[#4AF626]/60 transition-colors duration-150">
                <p className="text-[#6272A4] mb-1">cat &gt;&gt; guestbook.txt &lt;&lt;EOF</p>
                <textarea
                  rows={3}
                  placeholder="leave a message for the maintainer..."
                  className="w-full resize-none bg-transparent text-[#4AF626] placeholder:text-[#6272A4] caret-[#4AF626] focus:outline-none"
                />
                <p className="text-[#6272A4]">EOF</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-[#6272A4]">
                  --channel=
                  <select className="bg-[#0A0E12] border border-[#1F2937] rounded-sm px-2 py-1.5 text-[#8BE9FD] focus:outline-none focus:border-[#4AF626]/60 transition-colors duration-150">
                    <option>stable</option>
                    <option>beta</option>
                    <option>nightly</option>
                  </select>
                </label>
                <button className="px-4 py-1.5 bg-[#4AF626] text-[#0A0E12] font-bold rounded-sm hover:bg-[#3FD41F] transition-colors duration-150">
                  ./submit
                </button>
                <button className="px-4 py-1.5 text-[#6272A4] border border-[#1F2937] rounded-sm hover:bg-[#6272A4]/10 transition-colors duration-150">
                  ^C cancel
                </button>
              </div>
            </div>
          </section>
        </RevealBlock>

        <AsciiRule label="projects" />

        {/* ─── Section 10: ls -la Listing ──────────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="ls -la ~/projects" comment="lists are directory listings -- aligned columns, semantic colors" />
            <div className="border border-[#1F2937] rounded-sm bg-[#0D141B] p-4 overflow-x-auto">
              <div className="space-y-1 text-xs md:text-sm min-w-[520px]">
                <p className="text-[#6272A4]">total {lsRows.length} entries, 0 hidden agendas</p>
                {lsRows.map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center gap-4 px-1 py-0.5 rounded-sm hover:bg-[#4AF626]/10 transition-colors duration-150 cursor-pointer"
                  >
                    <span className="text-[#6272A4] w-24 shrink-0">{row.perms}</span>
                    <span className="text-[#FFB86C] w-10 shrink-0 text-right whitespace-pre">{row.size}</span>
                    <span className="text-[#6272A4] w-28 shrink-0">{row.date}</span>
                    <span className={row.color}>{row.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 11: ps aux Table ────────────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="ps aux --services" comment="tables speak ps aux -- uppercase headers, mono digits, exit badges" />
            <div className="border border-[#1F2937] rounded-sm bg-[#0D141B] overflow-x-auto">
              <table className="w-full text-xs md:text-sm min-w-[560px]">
                <thead>
                  <tr className="border-b border-[#1F2937] text-left text-[#6272A4]">
                    <th className="px-3 py-2 font-normal">PID</th>
                    <th className="px-3 py-2 font-normal">SERVICE</th>
                    <th className="px-3 py-2 font-normal text-right">%CPU</th>
                    <th className="px-3 py-2 font-normal text-right">%MEM</th>
                    <th className="px-3 py-2 font-normal">UPTIME</th>
                    <th className="px-3 py-2 font-normal text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {processRows.map((row) => (
                    <tr
                      key={row.pid}
                      className="border-b border-[#1F2937]/60 last:border-b-0 hover:bg-[#4AF626]/10 transition-colors duration-150"
                    >
                      <td className="px-3 py-2 text-[#6272A4]">{row.pid}</td>
                      <td className={`px-3 py-2 ${row.exit === 0 ? "text-[#8BE9FD]" : "text-[#FF79C6]"}`}>{row.service}</td>
                      <td className={`px-3 py-2 text-right ${Number(row.cpu) > 80 ? "text-[#FF79C6]" : "text-[#FFB86C]"}`}>{row.cpu}</td>
                      <td className="px-3 py-2 text-right text-[#FFB86C]">{row.mem}</td>
                      <td className="px-3 py-2 text-[#4AF626]">{row.uptime}</td>
                      <td className="px-3 py-2 text-right"><ExitBadge code={row.exit} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#6272A4] mt-2"># PID 4096 is why we cannot have nice things</p>
          </section>
        </RevealBlock>

        <AsciiRule label="progress" />

        {/* ─── Section 12: ASCII Progress Bars ─────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="watch -n1 ./build-status" comment="progress bars are drawn with block glyphs -- no chart library survived" />
            <div className="border border-[#1F2937] rounded-sm bg-[#0D141B] p-4 space-y-2">
              <AsciiProgress label="compile" pct={100} />
              <AsciiProgress label="typecheck" pct={92} />
              <AsciiProgress label="unit tests" pct={67} />
              <AsciiProgress label="e2e tests" pct={38} />
              <AsciiProgress label="docs" pct={12} />
              <p className="text-xs text-[#6272A4] pt-1"># docs at 12% -- a timeless constant of software engineering</p>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 13: stdout / stderr Alerts ──────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="tail -n4 /var/log/system.log" comment="alerts are log lines -- INFO cyan, OK green, WARN amber, ERR magenta" />
            <div className="space-y-1.5 text-xs md:text-sm">
              {logLines.map((line) => (
                <div
                  key={line.level + line.msg}
                  className={`flex items-start gap-3 px-3 py-2 rounded-sm border ${
                    line.stream === "stderr"
                      ? "border-[#FF79C6]/40 bg-[#FF79C6]/5"
                      : "border-[#1F2937] bg-[#0D141B]"
                  }`}
                >
                  <span className={`shrink-0 ${line.color}`}>[{line.level}]</span>
                  <span className="text-[#6272A4] shrink-0 hidden sm:inline">{line.stream}</span>
                  <span className={line.stream === "stderr" ? "text-[#FF79C6]" : "text-[#4AF626]"}>{line.msg}</span>
                </div>
              ))}
            </div>
          </section>
        </RevealBlock>

        <AsciiRule label="git log" />

        {/* ─── Section 14: git log Testimonial ─────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="git log --oneline -3" comment="blockquotes are commit messages -- history is the testimonial" />
            <div className="border border-[#1F2937] rounded-sm bg-[#0D141B] p-4 space-y-2 text-xs md:text-sm">
              {gitLog.map((entry) => (
                <div key={entry.hash} className="flex items-start gap-3">
                  <span className="text-[#FFB86C] shrink-0">{entry.hash}</span>
                  <div>
                    <p className="text-[#4AF626]">{entry.msg}</p>
                    <p className="text-[10px] text-[#6272A4]">-- {entry.meta}</p>
                  </div>
                </div>
              ))}
              <div className="border-l-2 border-[#4AF626]/40 pl-3 mt-3 text-[#6272A4]">
                <p># &quot;I came for the blinking cursor.</p>
                <p># I stayed because the exit codes were honest.&quot;</p>
                <p className="text-[#8BE9FD]"># -- an anonymous visitor, ttys002</p>
              </div>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 15: Rules Summary ───────────────────────────────── */}
        <RevealBlock>
          <section>
            <SectionHeader command="diff style-rules.txt" comment="the contract -- what keeps the illusion intact" />
            <div className="grid md:grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="border border-[#4AF626]/40 rounded-sm bg-[#0D141B] p-4">
                <p className="text-[#4AF626] mb-2">[0] OK -- always do</p>
                <ul className="space-y-1">
                  {doRules.map((rule) => (
                    <li key={rule} className="flex gap-2">
                      <span className="text-[#4AF626] shrink-0">+</span>
                      <span className="text-[#4AF626]/90">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-[#FF79C6]/40 rounded-sm bg-[#0D141B] p-4">
                <p className="text-[#FF79C6] mb-2">[1] ERR -- never do</p>
                <ul className="space-y-1">
                  {dontRules.map((rule) => (
                    <li key={rule} className="flex gap-2">
                      <span className="text-[#FF79C6] shrink-0">-</span>
                      <span className="text-[#FF79C6]/90">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 16: Logout / Back Link ──────────────────────────── */}
        <RevealBlock>
          <section className="space-y-2 text-xs md:text-sm pb-4">
            <AsciiRule />
            <p>
              <PromptPrefix /> exit
            </p>
            <p className="text-[#6272A4]">Saving session... done.</p>
            <p className="text-[#6272A4]">
              [Process completed] Return to{" "}
              <Link
                href="/styles/developer-terminal"
                className="text-[#8BE9FD] underline decoration-[#8BE9FD]/40 underline-offset-2 hover:text-[#4AF626] transition-colors duration-150"
              >
                /styles/developer-terminal
              </Link>{" "}
              for tokens, recipes and AI rules.
            </p>
            <p>
              <PromptPrefix /> <Cursor className="ml-1" />
            </p>
          </section>
        </RevealBlock>
      </main>

      {/* ─── tmux Status Bar (fixed) ─────────────────────────────────────── */}
      <footer className="fixed bottom-0 inset-x-0 z-50 bg-[#0D141B] border-t border-[#1F2937]">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-3 py-1.5 text-[10px] md:text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="bg-[#4AF626] text-[#0A0E12] font-bold px-1.5 py-0.5 rounded-sm shrink-0">[stylekit]</span>
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSession(s.id)}
                className={`shrink-0 transition-colors duration-150 ${
                  activeSession === s.id ? "text-[#4AF626]" : "text-[#6272A4] hover:text-[#4AF626]"
                }`}
              >
                {s.label}
                {activeSession === s.id ? "*" : ""}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[#FFB86C] hidden sm:inline">load: 0.42</span>
            <span className="text-[#8BE9FD]">{clock}</span>
            <span className="bg-[#1F2937] text-[#4AF626] px-1.5 py-0.5 rounded-sm">visitor@stylekit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
