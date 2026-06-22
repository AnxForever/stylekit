"use client";

import type { ReactNode } from "react";
import {
  MouseStage,
  FollowAura,
  Trail,
  Spotlight,
  GlitchRGB,
  Scanline,
  PressDent,
  Mirror,
  Grid3D,
  Tilt3D,
  MagneticTarget,
  Warp,
  Squish,
  Ripple,
  Confetti,
  EmblemSpin,
  SpeedLine,
  PaperLayer,
  GeometricFragments,
} from "../primitives";
import type { PrimitiveConfig, RoomConfig } from "./registry";
import { cn } from "@/lib/utils";

/**
 * 通用房间渲染器 — 把 registry 配置 (stage + primitives) 渲染成舞台。
 * 现有 3 房间 (Component) 不走这里, 直接渲染组件。
 */

function renderPrimitive(p: PrimitiveConfig, accent: string): ReactNode {
  const props = (p.props || {}) as Record<string, unknown>;
  switch (p.type) {
    case "FollowAura":
      return <FollowAura {...props} />;
    case "Trail":
      return <Trail {...props} />;
    case "Spotlight":
      return <Spotlight {...props} />;
    case "GlitchRGB":
      return <GlitchRGB {...props} />;
    case "Scanline":
      return <Scanline {...props} />;
    case "Mirror":
      return <Mirror {...props} />;
    case "Grid3D":
      return <Grid3D {...props} />;
    case "Warp":
      return <Warp {...props} />;
    case "Ripple":
      return <Ripple {...props} />;
    case "Confetti":
      return <Confetti {...props} />;
    case "EmblemSpin":
      return <EmblemSpin {...props} />;
    case "SpeedLine":
      return <SpeedLine {...props} />;
    case "PaperLayer":
      return <PaperLayer {...props} />;
    case "GeometricFragments":
      return <GeometricFragments {...props} />;
    case "Squish":
      return (
        <Squish {...props}>
          <div className="flex h-full flex-col justify-between p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">
              Clay · squish
            </span>
            <span className="text-lg font-medium">Squeeze me</span>
          </div>
        </Squish>
      );
    case "PressDent":
      return (
        <PressDent {...props}>
          <div className="flex h-full flex-col justify-between p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-current/60">
              Soft · press
            </span>
            <span className="text-lg font-medium">Dent me</span>
          </div>
        </PressDent>
      );
    case "Tilt3D":
      return (
        <Tilt3D {...props}>
          <div className="flex h-full flex-col justify-between p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-current/70">
              Tilt
            </span>
            <span className="text-lg font-bold uppercase tracking-tight">Tilt block</span>
          </div>
        </Tilt3D>
      );
    case "MagneticTarget":
      return (
        <MagneticTarget {...props}>
          <button
            type="button"
            className="px-7 py-3 text-sm font-medium uppercase tracking-[0.18em]"
            style={{ background: accent, color: "#0a0a0a", border: `2px solid ${accent}` }}
          >
            Grab me
          </button>
        </MagneticTarget>
      );
    default:
      return null;
  }
}

export function GenericRoom({
  config,
  showHeader = true,
}: {
  config: RoomConfig;
  showHeader?: boolean;
}) {
  const stage = config.stage;
  if (!stage) return null;

  return (
    <MouseStage
      className="relative h-[440px] w-full overflow-hidden border border-border motion-safe:pointer-fine:cursor-none [&_*]:motion-safe:pointer-fine:cursor-none"
      style={{ background: stage.bg }}
    >
      {/* 装饰大字 (背景) */}
      {stage.hero ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            fontFamily: stage.fontFamily || "var(--font-sans)",
            fontSize: "5rem",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: stage.heroColor || config.accent,
            opacity: 0.92,
          }}
        >
          {stage.hero}
        </div>
      ) : null}

      {/* 原语层 (z-10/20, 各原语自管 z) */}
      {stage.primitives.map((p, i) => (
        <div key={i} className="contents">
          {renderPrimitive(p, config.accent)}
        </div>
      ))}

      {/* 序号 (可选) */}
      {showHeader ? (
        <div
          className="absolute left-5 top-4 z-30 font-mono text-[11px] font-bold uppercase tracking-[0.3em]"
          style={{ color: stage.fontColor || config.accent }}
        >
          Room {config.index} — {config.name.en}
        </div>
      ) : null}

      {/* 底部状态 */}
      <div
        className="absolute bottom-4 left-5 z-30 font-mono text-[10px] uppercase tracking-[0.25em]"
        style={{ color: stage.fontColor || config.accent, opacity: 0.55 }}
      >
        <span className="pointer-fine:hidden">Static</span>
        <span className="hidden pointer-fine:inline">Move the cursor</span>
      </div>
    </MouseStage>
  );
}

void cn;
