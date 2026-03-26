"use client";

import type { ReactNode } from "react";
import type { ComponentPatternPreviewId } from "@/lib/component-patterns";

export function PatternPreview({ previewId }: { previewId: ComponentPatternPreviewId }) {
  switch (previewId) {
    case "breadcrumb-standard":
      return (
        <Frame className="bg-white">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span>Home</span>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span>Analytics</span>
            <span>/</span>
            <span className="text-zinc-900 font-medium">Overview</span>
          </div>
        </Frame>
      );
    case "breadcrumb-pill":
      return (
        <Frame className="bg-white">
          <div className="flex flex-wrap items-center gap-2">
            {["Home", "Content", "Projects"].map((item) => (
              <span key={item} className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] text-zinc-500">
                {item}
              </span>
            ))}
            <span className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-medium text-white">
              Q1 Report
            </span>
          </div>
        </Frame>
      );
    case "breadcrumb-title-linked":
      return (
        <Frame className="bg-white">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
              <span>Home</span>
              <span>›</span>
              <span>Users</span>
              <span>›</span>
              <span className="text-zinc-600">John Doe</span>
            </div>
            <div>
              <div className="text-lg font-bold text-zinc-900">John Doe</div>
              <div className="text-[11px] text-zinc-500">Admin · Joined Jan 2024</div>
            </div>
          </div>
        </Frame>
      );
    case "accordion-synthwave":
      return (
        <Frame className="bg-[#150b2b]">
          <AccordionStack
            items={[
              "Festival lineup and headliners",
              "Stage map and midnight set",
              "Ticket tiers and retro perks",
            ]}
            itemClassName="border border-fuchsia-400/60 bg-[#211140] text-fuchsia-100 shadow-[0_0_0_1px_rgba(217,70,239,0.2),0_0_18px_rgba(217,70,239,0.22)]"
            accentClassName="bg-cyan-300"
          />
        </Frame>
      );
    case "accordion-skeuomorphism":
      return (
        <Frame className="bg-[#d7ccb0]">
          <AccordionStack
            items={[
              "Input devices and control surfaces",
              "Display calibration settings",
              "Media playback defaults",
            ]}
            itemClassName="border border-[#b5a277] bg-gradient-to-b from-[#f4ecd8] to-[#d6c6a3] text-[#54442f] shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_3px_6px_rgba(67,46,18,0.15)]"
            accentClassName="bg-[#8a6b3d]"
          />
        </Frame>
      );
    case "accordion-ghibli":
      return (
        <Frame className="bg-[#f8f1de]">
          <AccordionStack
            items={[
              "Where the path enters the cedar forest",
              "How the lanterns wake at dusk",
              "What to pack for the train ride",
            ]}
            itemClassName="border border-[#d9cba4] bg-[#fff9ec] text-[#53634b]"
            accentClassName="bg-[#d5b66f]"
          />
        </Frame>
      );
    case "accordion-african-textile":
      return (
        <Frame className="bg-[#23140b]">
          <AccordionStack
            items={[
              "Textile regions and woven stories",
              "Festival colors and symbolic meaning",
              "Pattern geometry and hand rhythm",
            ]}
            itemClassName="border border-[#df8f3f] bg-[#392114] text-[#f5d7a8]"
            accentClassName="bg-[#f2b544]"
            stripe
          />
        </Frame>
      );
    case "tabs-art-deco":
      return (
        <Frame className="bg-[#131313]">
          <TabRow
            tabs={["Buttons", "Cards", "Inputs", "Badges"]}
            active="Cards"
            activeClassName="border-[#d4af37] bg-[#d4af37] text-[#131313]"
            inactiveClassName="border-[#6d5a28] text-[#e8d9a6]"
          />
        </Frame>
      );
    case "tabs-cel-shading":
      return (
        <Frame className="bg-[#fafaf5]">
          <TabRow
            tabs={["Button", "Card", "Input", "Badge"]}
            active="Input"
            activeClassName="border-[#1a1a2e] bg-[#7dd3fc] text-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e]"
            inactiveClassName="border-[#1a1a2e] bg-white text-[#1a1a2e]"
          />
        </Frame>
      );
    case "tabs-apple-style":
      return (
        <Frame className="bg-[#f2f2f4]">
          <div className="rounded-full bg-white p-1 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <TabRow
              tabs={["Buttons", "Cards", "Inputs", "Nav"]}
              active="Nav"
              activeClassName="rounded-full bg-[#111111] text-white"
              inactiveClassName="rounded-full text-[#4b5563]"
              compact
            />
          </div>
        </Frame>
      );
    case "pagination-data-dense":
      return (
        <Frame className="bg-[#f8fafc]">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[11px] text-[#64748b]">Rows 81-100 of 240</div>
            <div className="flex items-center gap-1">
              <PageButton label="Prev" />
              <PageChip label="4" muted />
              <PageChip label="5" active />
              <PageChip label="6" muted />
              <PageButton label="Next" />
            </div>
          </div>
        </Frame>
      );
    case "pagination-brutalist-web":
      return (
        <Frame className="bg-[#fffef8]">
          <div className="flex items-center justify-between gap-4 border-y border-black py-3 text-xs uppercase tracking-[0.18em] text-black">
            <span>[Previous page]</span>
            <span>Page 05</span>
            <span>[Next page]</span>
          </div>
        </Frame>
      );
    // --- Breadcrumb additions ---
    case "breadcrumb-cyberpunk":
      return (
        <Frame className="bg-[#0a0a1a]">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-cyan-500/70">System</span>
            <span className="text-fuchsia-400">&gt;</span>
            <span className="text-cyan-500/70">Network</span>
            <span className="text-fuchsia-400">&gt;</span>
            <span className="text-cyan-500/70">Nodes</span>
            <span className="text-fuchsia-400">&gt;</span>
            <span className="font-medium text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">Node-7X</span>
          </div>
        </Frame>
      );
    case "breadcrumb-ink-wash":
      return (
        <Frame className="bg-[#f5f0e8]">
          <div className="flex items-center gap-3 text-[11px] text-[#5c5144]">
            <span className="opacity-50">Home</span>
            <span className="text-[#8b7355] opacity-40">|</span>
            <span className="opacity-50">Gallery</span>
            <span className="text-[#8b7355] opacity-40">|</span>
            <span className="opacity-50">Landscapes</span>
            <span className="text-[#8b7355] opacity-40">|</span>
            <span className="font-medium text-[#3a2f24]" style={{ fontStyle: "italic" }}>Morning Mist</span>
          </div>
        </Frame>
      );
    case "breadcrumb-linear":
      return (
        <Frame className="bg-white">
          <div className="flex items-center gap-2 text-[11px] text-[#888]">
            <span>Workspace</span>
            <span className="inline-block h-1 w-1 rounded-full bg-[#d1d1d1]" />
            <span>Projects</span>
            <span className="inline-block h-1 w-1 rounded-full bg-[#d1d1d1]" />
            <span>Design System</span>
            <span className="inline-block h-1 w-1 rounded-full bg-[#d1d1d1]" />
            <span className="font-medium text-[#171717]">Tokens</span>
          </div>
        </Frame>
      );
    case "breadcrumb-gothic":
      return (
        <Frame className="bg-[#1a1a1a]">
          <div className="flex items-center gap-2 text-[11px] text-[#9a8c7a]">
            <span>Archive</span>
            <span className="text-[#6b5d4d]">&loz;</span>
            <span>Manuscripts</span>
            <span className="text-[#6b5d4d]">&loz;</span>
            <span>Chapter VII</span>
            <span className="text-[#6b5d4d]">&loz;</span>
            <span className="font-semibold text-[#d4c4a8]">The Raven</span>
          </div>
        </Frame>
      );

    // --- Accordion additions ---
    case "accordion-liquid-glass":
      return (
        <Frame className="bg-[linear-gradient(135deg,#e0e7ff,#f0e6ff_50%,#dbeafe)]">
          <AccordionStack
            items={[
              "Frosted panel with glass refraction",
              "Translucent layers and blur depth",
              "Soft chromatic edge highlights",
            ]}
            itemClassName="border border-white/50 bg-white/40 text-slate-700 backdrop-blur-md shadow-[0_4px_16px_rgba(148,163,184,0.15)]"
            accentClassName="bg-indigo-400/80"
          />
        </Frame>
      );
    case "accordion-sci-fi-hud":
      return (
        <Frame className="bg-[#0b0f14]">
          <AccordionStack
            items={[
              "SYSTEM // Core diagnostics report",
              "NETWORK // Latency node matrix",
              "SHIELD // Threat level analysis",
            ]}
            itemClassName="border border-emerald-500/30 bg-[#0d1a14] text-emerald-300 font-mono shadow-[inset_0_0_12px_rgba(16,185,129,0.06)]"
            accentClassName="bg-emerald-400"
          />
        </Frame>
      );
    case "accordion-art-nouveau":
      return (
        <Frame className="bg-[#faf6ef]">
          <AccordionStack
            items={[
              "The curving vine and petal rhythm",
              "Organic symmetry in ironwork",
              "Gold leaf and mosaic insets",
            ]}
            itemClassName="border border-[#c9b88a] bg-[#fdf8ee] text-[#5c4a2e] rounded-2xl"
            accentClassName="bg-[#b8944a]"
          />
        </Frame>
      );
    case "accordion-pop-art":
      return (
        <Frame className="bg-[#fff200]">
          <AccordionStack
            items={[
              "WHAM! Bold headlines here",
              "POW! Secondary content area",
              "BANG! More hidden details",
            ]}
            itemClassName="border-2 border-[#1a1a2e] bg-white text-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e]"
            accentClassName="bg-[#ff3366]"
          />
        </Frame>
      );

    // --- Tabs additions ---
    case "tabs-holographic":
      return (
        <Frame className="bg-[#111118]">
          <TabRow
            tabs={["Prism", "Refract", "Glow", "Shift"]}
            active="Refract"
            activeClassName="border-transparent bg-[linear-gradient(135deg,#a78bfa,#38bdf8,#34d399)] text-white"
            inactiveClassName="border-[#333] text-[#888]"
          />
        </Frame>
      );
    case "tabs-pixel-art":
      return (
        <Frame className="bg-[#2a2a3e]">
          <TabRow
            tabs={["Start", "Items", "Stats", "Save"]}
            active="Stats"
            activeClassName="border-2 border-[#f8e45c] bg-[#3b3b5c] text-[#f8e45c] shadow-[2px_2px_0_#f8e45c]"
            inactiveClassName="border-2 border-[#555580] bg-[#2a2a3e] text-[#9999bb]"
          />
        </Frame>
      );
    case "tabs-scandinavian":
      return (
        <Frame className="bg-[#f7f4ef]">
          <TabRow
            tabs={["Living", "Kitchen", "Bedroom", "Office"]}
            active="Kitchen"
            activeClassName="border-[#c8a97e] bg-[#c8a97e] text-white rounded-full"
            inactiveClassName="border-[#ddd3c4] text-[#8a7e6e] rounded-full"
          />
        </Frame>
      );
    case "tabs-dark-academia":
      return (
        <Frame className="bg-[#2c2419]">
          <TabRow
            tabs={["Folio", "Index", "Notes", "Atlas"]}
            active="Index"
            activeClassName="border-[#b8975a] bg-[#b8975a]/20 text-[#e8d5a3]"
            inactiveClassName="border-[#4a3d2e] text-[#8a7a60]"
          />
        </Frame>
      );

    // --- Pagination additions ---
    case "pagination-neon-tokyo":
      return (
        <Frame className="bg-[#0f0f1a]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-fuchsia-400/60">Page 3 of 12</span>
            <div className="flex items-center gap-1">
              <PageChipCustom label="<" borderColor="#a855f7" textColor="#a855f7" />
              <PageChipCustom label="3" borderColor="#e879f9" textColor="#e879f9" bgColor="rgba(168,85,247,0.15)" active />
              <PageChipCustom label="4" borderColor="#6b21a8" textColor="#a855f7" />
              <PageChipCustom label="5" borderColor="#6b21a8" textColor="#a855f7" />
              <PageChipCustom label=">" borderColor="#a855f7" textColor="#a855f7" />
            </div>
          </div>
        </Frame>
      );
    case "pagination-risograph":
      return (
        <Frame className="bg-[#faf5ed]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-medium text-[#e85d75]">Prev</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#3d7ec7]">2</span>
              <span className="rounded-sm bg-[#e85d75] px-2.5 py-1 text-[11px] font-bold text-white">3</span>
              <span className="text-[11px] text-[#3d7ec7]">4</span>
            </div>
            <span className="text-[11px] font-medium text-[#e85d75]">Next</span>
          </div>
        </Frame>
      );
    case "pagination-japanese-fresh":
      return (
        <Frame className="bg-[#fafcf8]">
          <div className="flex items-center justify-center gap-2">
            <span className="rounded-full border border-[#d4e4c8] px-3 py-1 text-[11px] text-[#7a9e6a]">Prev</span>
            <span className="text-[11px] text-[#b0c4a0]">2</span>
            <span className="rounded-full bg-[#7a9e6a] px-2.5 py-1 text-[11px] font-medium text-white">3</span>
            <span className="text-[11px] text-[#b0c4a0]">4</span>
            <span className="rounded-full border border-[#d4e4c8] px-3 py-1 text-[11px] text-[#7a9e6a]">Next</span>
          </div>
        </Frame>
      );
    case "pagination-shopify-clean":
      return (
        <Frame className="bg-white">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-lg border border-[#e1e1e1] px-3 py-1.5 text-[11px] font-medium text-[#333]">Previous</span>
            <div className="flex items-center gap-1">
              <span className="rounded-lg px-2.5 py-1 text-[11px] text-[#666]">2</span>
              <span className="rounded-lg bg-[#008060] px-2.5 py-1 text-[11px] font-medium text-white">3</span>
              <span className="rounded-lg px-2.5 py-1 text-[11px] text-[#666]">4</span>
            </div>
            <span className="rounded-lg border border-[#e1e1e1] px-3 py-1.5 text-[11px] font-medium text-[#333]">Next</span>
          </div>
        </Frame>
      );

    // --- Sidebar Nav: each is a unique design with animation ---
    case "sidebar-nav-sidebar-fixed":
      return (
        <Frame className="bg-[#f8fafc]">
          <style>{`
            @keyframes sk-slide-indicator { 0%,100%{transform:translateY(0)} 50%{transform:translateY(24px)} }
            @keyframes sk-fade-stagger { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
          `}</style>
          <div className="w-[68%] max-w-[200px] rounded-xl border border-zinc-200 bg-white p-2">
            <div className="mb-1 text-[9px] font-bold uppercase leading-none tracking-[0.16em] text-zinc-400 px-2">Admin</div>
            <div className="relative">
              <div className="absolute left-0 top-0 h-[24px] w-[3px] rounded-full bg-blue-500" style={{ animation: "sk-slide-indicator 3s ease-in-out infinite" }} />
              {["Dashboard", "Analytics", "Reports"].map((item, i) => (
                <div
                  key={item}
                  className={`rounded-md px-3 py-1 text-[10px] leading-tight ${i === 0 ? "font-medium text-blue-600 bg-blue-50" : "text-zinc-500"}`}
                  style={{ animation: `sk-fade-stagger 0.4s ease-out ${i * 0.08}s both` }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );
    case "sidebar-nav-notion-style":
      return (
        <Frame className="bg-[#fbfbfa]">
          <style>{`
            @keyframes sk-tree-expand { from{max-height:0;opacity:0} to{max-height:40px;opacity:1} }
          `}</style>
          <div className="w-[68%] max-w-[200px] rounded-xl border border-[#ece9e2] bg-white/80 p-2">
            <div className="text-[10px] leading-tight">
              <div className="flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[#6b6b6b]">
                <span className="text-[8px]">&#9662;</span> All notes
              </div>
              <div className="rounded-md bg-[#f1f1ef] px-2 py-1 font-medium text-[#2f2f2f]">
                <div className="flex items-center gap-1.5"><span className="text-[8px]">&#9662;</span> Brand system</div>
                <div className="ml-3 mt-0.5 overflow-hidden" style={{ animation: "sk-tree-expand 1.2s ease-out both" }}>
                  <div className="rounded px-1.5 py-px text-[9px] leading-tight text-[#999]">Colors</div>
                  <div className="rounded bg-[#e8e8e4] px-1.5 py-px text-[9px] leading-tight text-[#444]">Tokens</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[#6b6b6b]">
                <span className="text-[8px]">&#9656;</span> Checklist
              </div>
            </div>
          </div>
        </Frame>
      );
    case "sidebar-nav-macos-vibrancy":
      return (
        <Frame className="bg-[linear-gradient(135deg,#c8d8ff,#dfe7f8_42%,#efe7ff)]">
          <style>{`
            @keyframes sk-glass-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
            @keyframes sk-orb-drift { 0%,100%{transform:translate(0,0)} 33%{transform:translate(6px,-3px)} 66%{transform:translate(-3px,4px)} }
          `}</style>
          <div className="relative w-[68%] max-w-[200px] rounded-xl border border-white/60 bg-white/40 p-2 backdrop-blur-xl shadow-[0_12px_30px_rgba(148,163,184,0.2)]" style={{ animation: "sk-glass-float 4s ease-in-out infinite" }}>
            <div className="absolute -right-2 -top-2 h-10 w-10 rounded-full bg-violet-300/30 blur-xl" style={{ animation: "sk-orb-drift 6s ease-in-out infinite" }} />
            <div className="mb-1 flex items-center gap-1.5 px-1">
              <span className="h-[6px] w-[6px] rounded-full bg-[#ff5f57]" />
              <span className="h-[6px] w-[6px] rounded-full bg-[#febc2e]" />
              <span className="h-[6px] w-[6px] rounded-full bg-[#28c840]" />
            </div>
            {[{ l: "Overview", a: true }, { l: "Sessions", a: false }, { l: "Assets", a: false }].map((item) => (
              <div key={item.l} className={`rounded-lg px-2.5 py-0.5 text-[10px] leading-tight ${item.a ? "bg-white/70 font-medium text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]" : "text-slate-500"}`}>
                {item.l}
              </div>
            ))}
          </div>
        </Frame>
      );
    case "sidebar-nav-solarpunk":
      return (
        <Frame className="bg-[#f0f7ec]">
          <style>{`
            @keyframes sk-leaf-pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
            @keyframes sk-bar-grow { from{width:0} to{width:100%} }
          `}</style>
          <div className="flex gap-1.5">
            <div className="flex w-8 flex-col items-center gap-1.5 rounded-lg border border-[#c8deb8] bg-[#f8fcf5] py-2">
              {["#4ade80", "#a3e635", "#34d399"].map((c, i) => (
                <div key={c} className="flex h-4 w-4 items-center justify-center rounded" style={{ backgroundColor: i === 0 ? "#d4eac4" : "transparent" }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c, animation: i === 0 ? "sk-leaf-pulse 2s ease-in-out infinite" : "none" }} />
                </div>
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-1 pt-1">
              <div className="text-[8px] font-bold uppercase leading-none tracking-widest text-[#5a7a4a]">Energy</div>
              {[{ l: "Solar", w: "85%" }, { l: "Wind", w: "62%" }, { l: "Hydro", w: "40%" }].map((bar, i) => (
                <div key={bar.l}>
                  <div className="text-[7px] leading-none text-[#5a7a4a]">{bar.l}</div>
                  <div className="mt-px h-1 w-full rounded-full bg-[#d4eac4]">
                    <div className="h-full rounded-full bg-[#4ade80]" style={{ animation: `sk-bar-grow 1.2s ease-out ${i * 0.2}s both`, width: bar.w }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );
    case "sidebar-nav-github-style":
      return (
        <Frame className="bg-[#f6f8fa]">
          <style>{`
            @keyframes sk-badge-pop { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
            @keyframes sk-cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
          `}</style>
          <div className="w-[68%] max-w-[200px] rounded-lg border border-[#d0d7de] bg-white p-2">
            <div className="mb-1 flex items-center gap-1.5 px-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1f2328]" />
              <div className="h-1 w-10 rounded bg-[#d0d7de]" />
            </div>
            <div className="mb-1 mx-1 flex items-center gap-1 rounded border border-[#d0d7de] bg-[#f6f8fa] px-1.5 py-px text-[9px] leading-none text-[#656d76] font-mono">
              <span>/</span>
              <span className="inline-block h-2.5 w-[1px] bg-[#0969da]" style={{ animation: "sk-cursor-blink 1s step-end infinite" }} />
            </div>
            {[
              { l: "Code", badge: null },
              { l: "Issues", badge: "12", active: true },
              { l: "Pull requests", badge: "3" },
            ].map((item, i) => (
              <div key={item.l} className={`flex items-center justify-between rounded-md px-2 py-0.5 font-mono text-[9px] leading-tight ${item.active ? "bg-[#ddf4ff] text-[#0969da] font-medium" : "text-[#656d76]"}`}>
                <span>{item.l}</span>
                {item.badge ? (
                  <span className="rounded-full bg-[#1f2328] px-1 text-[7px] font-medium leading-normal text-white" style={{ animation: `sk-badge-pop 0.4s ease-out ${0.6 + i * 0.15}s both` }}>
                    {item.badge}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </Frame>
      );
    case "sidebar-nav-steampunk":
      return (
        <Frame className="bg-[#1c1610]">
          <style>{`
            @keyframes sk-gear-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            @keyframes sk-steam-rise { 0%{opacity:0.6;transform:translateY(0)} 100%{opacity:0;transform:translateY(-10px)} }
          `}</style>
          <div className="flex gap-1.5">
            <div className="flex w-8 flex-col items-center rounded-lg border border-[#6b4f2e] bg-[#2a1f14] py-2">
              <svg width="16" height="16" viewBox="0 0 20 20" className="mb-1 text-[#c99a45]" style={{ animation: "sk-gear-spin 8s linear infinite" }}>
                <path fill="currentColor" d="M10 6a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <rect key={deg} x="9" y="0" width="2" height="5" rx="1" fill="currentColor" transform={`rotate(${deg} 10 10)`} />
                ))}
              </svg>
              {[0, 1, 2].map((i) => (
                <div key={i} className="my-px h-1 w-1 rounded-full bg-[#c99a45]/40" />
              ))}
            </div>
            <div className="flex flex-1 flex-col rounded-lg border border-[#6b4f2e] bg-[#2a1f14] p-2">
              <div className="mb-1 text-[7px] font-bold uppercase leading-none tracking-[0.2em] text-[#c99a45]">Boiler Rm</div>
              {[
                { l: "Pressure", v: "87%" },
                { l: "Steam", v: "64%" },
                { l: "Coal", v: "42%" },
              ].map((g) => (
                <div key={g.l} className="flex items-center justify-between text-[8px] leading-relaxed">
                  <span className="text-[#b8965a]">{g.l}</span>
                  <span className="font-mono text-[#dbb978]">{g.v}</span>
                </div>
              ))}
              <div className="mt-1 flex items-center gap-1">
                <div className="text-[7px] text-[#6b4f2e]" style={{ animation: "sk-steam-rise 2s ease-out infinite" }}>~</div>
                <div className="text-[7px] text-[#6b4f2e]" style={{ animation: "sk-steam-rise 2s ease-out 0.4s infinite" }}>~</div>
                <div className="text-[7px] text-[#6b4f2e]" style={{ animation: "sk-steam-rise 2s ease-out 0.8s infinite" }}>~</div>
              </div>
            </div>
          </div>
        </Frame>
      );
    case "sidebar-nav-film-noir":
      return (
        <Frame className="bg-[#0a0a0a]">
          <style>{`
            @keyframes sk-noir-sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
            @keyframes sk-flicker { 0%,97%,100%{opacity:1} 98%{opacity:0.4} }
          `}</style>
          <div className="relative w-[68%] max-w-[200px] overflow-hidden rounded-xl border border-[#222] bg-[#141414] p-2">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, #fff 3px, #fff 4px)" }} />
              <div className="absolute inset-y-0 w-20 bg-gradient-to-r from-white/[0.04] to-transparent" style={{ animation: "sk-noir-sweep 5s ease-in-out infinite" }} />
            </div>
            <div className="relative mb-1 text-[8px] font-bold uppercase leading-none tracking-[0.2em] text-[#666]" style={{ animation: "sk-flicker 4s linear infinite" }}>
              Case Files
            </div>
            <div className="relative">
              {[
                { l: "The Maltese Bug", a: true },
                { l: "Double Memory", a: false },
                { l: "Sunset Stack", a: false },
              ].map((item) => (
                <div
                  key={item.l}
                  className={`rounded px-2.5 py-0.5 text-[10px] leading-tight ${
                    item.a ? "bg-white/[0.07] font-medium text-[#e0e0e0] shadow-[inset_3px_0_0_#888]" : "text-[#555]"
                  }`}
                >
                  {item.l}
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );
    default:
      return null;
  }
}

function Frame({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div className={`h-40 overflow-hidden rounded-2xl border border-black/5 p-4 ${className}`}>
      {children}
    </div>
  );
}

function AccordionStack({
  items,
  itemClassName,
  accentClassName,
  stripe,
}: {
  items: string[];
  itemClassName: string;
  accentClassName: string;
  stripe?: boolean;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={item} className={`rounded-xl p-3 ${itemClassName}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${accentClassName}`} />
              <span className="line-clamp-1 text-[11px] font-medium">{item}</span>
            </div>
            <span className="text-xs">{index === 0 ? "−" : "+"}</span>
          </div>
          {index === 0 ? (
            <div className="mt-3 space-y-2">
              <div className="h-2 rounded-full bg-current/10" />
              <div className="h-2 w-5/6 rounded-full bg-current/10" />
              {stripe ? <div className="h-1 w-full rounded-full bg-[#f2b544]/25" /> : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function TabRow({
  tabs,
  active,
  activeClassName,
  inactiveClassName,
  compact,
}: {
  tabs: string[];
  active: string;
  activeClassName: string;
  inactiveClassName: string;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`border px-3 py-1.5 text-[11px] font-medium ${tab === active ? activeClassName : inactiveClassName} ${
            compact ? "" : "rounded-full"
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}

function PageButton({ label }: { label: string }) {
  return (
    <span className="rounded border border-[#cbd5e1] px-2.5 py-1 text-[11px] text-[#64748b]">
      {label}
    </span>
  );
}

function PageChip({ label, active, muted }: { label: string; active?: boolean; muted?: boolean }) {
  return (
    <span
      className={`rounded border px-2.5 py-1 text-[11px] ${
        active
          ? "border-[#3b82f6] bg-[#3b82f6] text-white"
          : muted
            ? "border-[#cbd5e1] bg-white text-[#64748b]"
            : "border-[#cbd5e1] text-[#64748b]"
      }`}
    >
      {label}
    </span>
  );
}

function PageChipCustom({
  label,
  borderColor,
  textColor,
  bgColor,
  active,
}: {
  label: string;
  borderColor: string;
  textColor: string;
  bgColor?: string;
  active?: boolean;
}) {
  return (
    <span
      className="rounded border px-2.5 py-1 text-[11px] font-medium"
      style={{
        borderColor,
        color: textColor,
        backgroundColor: active ? bgColor : "transparent",
      }}
    >
      {label}
    </span>
  );
}
