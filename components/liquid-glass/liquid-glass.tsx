"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties, ReactNode } from "react";
import type { PointerEvent } from "react";
import {
  buildDisplacementPixels,
  deriveFilterParams,
  resolveLiquidGlassSettings,
  resolveMapGeometry,
  type LiquidGlassSettings,
} from "@/lib/liquid-glass";
import { cn } from "@/lib/utils";
import styles from "./liquid-glass.module.css";

function detectSvgBackdropFilterSupport(): boolean {
  if (typeof window === "undefined" || typeof CSS === "undefined") return false;
  const ua = window.navigator.userAgent;
  const isIOS =
    /iPhone|iPad|iPod/.test(ua) ||
    (ua.includes("Macintosh") && window.navigator.maxTouchPoints > 1);
  const isFirefox = ua.includes("Firefox");
  const isSafari =
    ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("Chromium");
  if (isIOS || isFirefox || isSafari) return false;
  return (
    CSS.supports("backdrop-filter", "url(#liquid-glass)") ||
    CSS.supports("-webkit-backdrop-filter", "url(#liquid-glass)")
  );
}

let cachedSupport: boolean | null = null;

/**
 * True when the browser can render SVG-referenced backdrop filters.
 * Only Chromium does today; Safari and Firefox parse `backdrop-filter: url()`
 * without rendering it, so both get the frosted-blur fallback.
 */
export function supportsSvgBackdropFilter(): boolean {
  if (cachedSupport === null) {
    cachedSupport = detectSvgBackdropFilterSupport();
  }
  return cachedSupport;
}

const subscribeNever = () => () => {};
const getServerSupportSnapshot = () => false;

const opaqueMediaQueries = [
  "(prefers-reduced-transparency: reduce)",
  "(forced-colors: active)",
];

function getOpaqueSnapshot(): boolean {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    opaqueMediaQueries.some((query) => window.matchMedia(query).matches);
}

function subscribeOpaquePreference(onChange: () => void): () => void {
  if (typeof window.matchMedia !== "function") return () => {};
  const queries = opaqueMediaQueries.map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

/** Opaque materials for reduced transparency and the system high-contrast mode. */
export function useOpaqueGlassPreference(): boolean {
  return useSyncExternalStore(
    subscribeOpaquePreference,
    getOpaqueSnapshot,
    getServerSupportSnapshot
  );
}

/** SSR-safe support flag: false on the server, real detection on the client. */
export function useSvgBackdropSupport(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    supportsSvgBackdropFilter,
    getServerSupportSnapshot
  );
}

export interface LiquidGlassProps {
  /** Partial settings merged over DEFAULT_LIQUID_GLASS_SETTINGS. */
  settings?: Partial<LiquidGlassSettings>;
  /** Clear glass keeps neutral refraction and uses a fine, directional rim. */
  appearance?: "default" | "clear";
  /** Corner radius in px; oversized values produce a capsule. */
  radius?: number;
  /** Surface tint painted between the refraction and the highlights. */
  tint?: string;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
  children?: ReactNode;
}

/**
 * Apple-style liquid glass surface. The default appearance refracts,
 * bends the backdrop at a curved rim and keeps its center undistorted. Both
 * appearances support subtle chromatic dispersion; zero dispersion uses a
 * single displacement pass. Clear glass adds no saturation or turbulence.
 */
export function LiquidGlass({
  settings,
  appearance = "default",
  radius = 28,
  tint,
  className,
  style,
  contentClassName,
  children,
}: LiquidGlassProps) {
  const rawId = useId();
  const filterId = useMemo(
    () => `liquid-glass-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [rawId]
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const supported = useSvgBackdropSupport();
  const opaque = useOpaqueGlassPreference();
  const clearAppearance = appearance === "clear";
  const resolvedTint =
    tint ??
    (clearAppearance
      ? "rgba(255, 255, 255, 0.06)"
      : "rgba(255, 255, 255, 0.08)");

  const resolved = resolveLiquidGlassSettings(settings);
  const params = deriveFilterParams(resolved, size.width > 0 ? Math.min(size.width, size.height) : undefined);
  const disperse = resolved.dispersion > 0 && resolved.refraction > 0;

  function updateLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / Math.max(1, rect.width);
    const y = (event.clientY - rect.top) / Math.max(1, rect.height);
    element.style.setProperty("--liquid-light-angle", Math.atan2(y - 0.5, x - 0.5) * 180 / Math.PI + 90 + "deg");
  }

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize((previous) =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height }
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Derived during render: the lens map is a pure function of geometry and
  // settings. Size stays 0x0 on the server, so this never runs during SSR.
  const mapUrl = useMemo(() => {
    if (!supported || opaque || size.width < 8 || size.height < 8) return null;
    if (typeof document === "undefined") return null;
    const geometry = resolveMapGeometry(size.width, size.height, radius);
    const pixels = buildDisplacementPixels({
      width: geometry.width,
      height: geometry.height,
      radius: geometry.radius,
      depth: resolved.depth,
      spread: resolved.spread,
      mapScale: geometry.scale,
    });
    const canvas = document.createElement("canvas");
    canvas.width = geometry.width;
    canvas.height = geometry.height;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.putImageData(
      new ImageData(pixels, geometry.width, geometry.height),
      0,
      0
    );
    return canvas.toDataURL("image/png");
  }, [supported, opaque, size.width, size.height, radius, resolved.depth, resolved.spread]);

  const active = supported && mapUrl !== null && size.width > 0;
  const fallbackBlur = Math.max(clearAppearance ? 5 : 10, params.blurPx);

  const refractionStyle: CSSProperties = active
    ? { backdropFilter: `url(#${filterId})` }
    : clearAppearance
      ? {
          backdropFilter: `blur(${fallbackBlur}px)`,
          WebkitBackdropFilter: `blur(${fallbackBlur}px)`,
        }
      : {
          backdropFilter: `blur(${fallbackBlur}px) saturate(1.6)`,
          WebkitBackdropFilter: `blur(${fallbackBlur}px) saturate(1.6)`,
        };

  return (
    <div
      ref={containerRef}
      className={cn("relative isolate", styles.surface, className)}
      data-liquid-optics={opaque ? "solid" : active ? "svg" : "frost"}
      onPointerMove={updateLight}
      onPointerLeave={(event) => event.currentTarget.style.removeProperty("--liquid-light-angle")}
      style={{
        borderRadius: radius,
        boxShadow: clearAppearance
          ? "0 10px 28px -20px rgba(8, 24, 50, 0.38), 0 1px 3px rgba(8, 24, 50, 0.12)"
          : "0 20px 50px -18px rgba(15, 23, 42, 0.5), 0 4px 14px -8px rgba(15, 23, 42, 0.35)",
        ...style,
      }}
    >
      {active ? (
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute h-0 w-0"
        >
          <defs>
            <filter
              id={filterId}
              x="0"
              y="0"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={mapUrl}
                x="0"
                y="0"
                width={size.width}
                height={size.height}
                preserveAspectRatio="none"
                result="map"
              />
              {!disperse ? (
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="map"
                  scale={params.scaleG}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="refracted"
                />
              ) : (
                <>
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="map"
                    scale={params.scaleR}
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="displacedR"
                  />
                  <feColorMatrix
                    in="displacedR"
                    type="matrix"
                    values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                    result="channelR"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="map"
                    scale={params.scaleG}
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="displacedG"
                  />
                  <feColorMatrix
                    in="displacedG"
                    type="matrix"
                    values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                    result="channelG"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="map"
                    scale={params.scaleB}
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="displacedB"
                  />
                  <feColorMatrix
                    in="displacedB"
                    type="matrix"
                    values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                    result="channelB"
                  />
                  <feBlend in="channelR" in2="channelG" mode="screen" result="channelRG" />
                  <feBlend in="channelRG" in2="channelB" mode="screen" result="refracted" />
                </>
              )}
              <feGaussianBlur
                in="refracted"
                stdDeviation={params.blurPx}
                result="frosted"
              />
              {clearAppearance ? null : (
                <feColorMatrix in="frosted" type="saturate" values={String(params.saturation)} />
              )}
            </filter>
          </defs>
        </svg>
      ) : null}

      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", styles.backdrop)}
        style={{ borderRadius: radius, background: resolvedTint, ...refractionStyle }}
      />

      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0", styles.highlight)}
        style={{
          borderRadius: radius,
          opacity: params.specularOpacity,
          boxShadow: clearAppearance
            ? "inset 0 0 0 1px rgba(255, 255, 255, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.66), inset 1px 0 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(255, 255, 255, 0.08)"
            : "inset 0 0 0 1px rgba(255, 255, 255, 0.22), inset 1.5px 1.5px 1px -0.5px rgba(255, 255, 255, 0.9), inset -1px -1px 1px -0.5px rgba(255, 255, 255, 0.45), inset 0 0 26px rgba(255, 255, 255, 0.14)",
          background: clearAppearance
            ? "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.04) 9%, transparent 28%), linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, transparent 11%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.05) 38%, rgba(255, 255, 255, 0) 62%, rgba(255, 255, 255, 0.16) 100%)",
        }}
      />

      <div className={cn("relative z-10", contentClassName)}>{children}</div>
      <div aria-hidden="true" className={styles.rim} style={{ borderRadius: radius, opacity: params.specularOpacity }} />
    </div>
  );
}
