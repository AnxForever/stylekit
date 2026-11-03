"use client";

import { useEffect, type RefObject } from "react";

/**
 * Diffraction Foil, CSS fallback runtime. Ported from the reference at
 * public/experiments/diffraction-foil/index.html: the pointer is a lamp 300 px above
 * the screen, and every element marked with data-foil gets custom properties that
 * select its window of a precomputed spectrum strip.
 */

export type Rgb = [number, number, number];

/** Wavelength in nm to linear sRGB: Wyman et al. piecewise-Gaussian fit of CIE 1931. */
export function cie(l: number): Rgb {
  if (l < 380 || l > 780) return [0, 0, 0];
  const g = (x: number, m: number, a: number, b: number) => {
    const t = (x - m) / (x < m ? a : b);
    return Math.exp(-0.5 * t * t);
  };
  const X = 1.056 * g(l, 599.8, 37.9, 31) + 0.362 * g(l, 442, 16, 26.7) - 0.065 * g(l, 501.1, 20.4, 26.2);
  const Y = 0.821 * g(l, 568.8, 46.9, 40.5) + 0.286 * g(l, 530.9, 16.3, 31.1);
  const Z = 1.217 * g(l, 437, 11.8, 36) + 0.681 * g(l, 459, 26, 13.8);
  const rgb = [
    3.2406 * X - 1.5372 * Y - 0.4986 * Z,
    -0.9689 * X + 1.8758 * Y + 0.0415 * Z,
    0.0557 * X - 0.204 * Y + 1.057 * Z,
  ];
  // Pure spectral colors fall outside sRGB: pull toward the gray of equal luminance, then clamp.
  return rgb.map((c) => Math.max(0, Y + (c - Y) * 0.66) * 0.8) as Rgb;
}

const aces = (x: number) => Math.min(1, Math.max(0, (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14)));
const encode = (x: number) => Math.round(255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055));

/** Displayable color of one wavelength, tone-mapped like the foil. */
export function wavelengthColor(l: number, gain = 1.6): Rgb {
  return cie(l).map((v) => encode(aces(v * gain))) as Rgb;
}

/**
 * Grating color for s = |dot(h, k)|: groove period 1500 nm, orders 1-3 weighted 1, 0.5, 0.3.
 */
export function grating(s: number, period = 1500): Rgb {
  const u = s * period;
  const a = cie(u);
  const b = cie(u / 2);
  const c = cie(u / 3);
  return a.map((v, i) => encode(aces((v + 0.5 * b[i] + 0.3 * c[i]) * 1.6))) as Rgb;
}

export const rgbCss = (c: Rgb) => `rgb(${c[0]} ${c[1]} ${c[2]})`;

type FoilKind = "foil" | "text" | "seal" | "glitter";

const T = 1.25;
const SPREAD = 2.6;
const LAMP_HEIGHT = 300;

function texture(width: number, height: number, draw: (g: CanvasRenderingContext2D) => void): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext("2d");
  if (!g) return "none";
  g.fillStyle = "#000";
  g.fillRect(0, 0, width, height);
  draw(g);
  return `url(${canvas.toDataURL()})`;
}

/**
 * Drive every [data-foil] element inside root from one shared lamp. The lamp follows
 * the pointer and drifts on its own after 4 idle seconds; with reduced motion it parks.
 */
export function useFoilLight(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    host.style.setProperty("--spectrum", texture(1024, 1, (g) => {
      const data = g.createImageData(1024, 1);
      for (let i = 0; i < 1024; i++) {
        const c = grating(Math.abs(((i + 0.5) / 1024 * 2 - 1) * T));
        data.data.set([c[0], c[1], c[2], 255], i * 4);
      }
      g.putImageData(data, 0, 0);
    }));
    host.style.setProperty("--sparkle", texture(192, 192, (g) => {
      for (let i = 0; i < 70; i++) {
        g.globalAlpha = 0.45 + rnd() * 0.55;
        g.fillStyle = rnd() < 0.45 ? "#fff" : rgbCss(grating(0.28 + rnd() * 0.24));
        g.beginPath();
        g.arc(rnd() * 192, rnd() * 192, 1 + rnd() * 1.6, 0, 7);
        g.fill();
      }
    }));
    host.style.setProperty("--glint", texture(140, 140, (g) => {
      g.globalCompositeOperation = "lighter";
      for (let i = 0; i < 9; i++) {
        const x = rnd() * 140;
        const y = rnd() * 140;
        const r = 9 + rnd() * 16;
        const gradient = g.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, "#fff");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = gradient;
        g.fillRect(x - r, y - r, r * 2, r * 2);
      }
    }));

    const lamp = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.22, px: 0, py: 0, at: -1e9 };
    const onMove = (event: PointerEvent) => {
      lamp.px = event.clientX;
      lamp.py = event.clientY;
      lamp.at = performance.now();
    };
    const onOut = (event: PointerEvent) => {
      if (!event.relatedTarget && event.pointerType === "mouse") lamp.at = -1e9;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut);

    const kinds = new Map<HTMLElement, FoilKind>();
    const visible = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(target);
        else visible.delete(target);
      }),
      { rootMargin: "80px" },
    );
    // Elements can appear later (a switch turning the foil layer on), so keep the registry in sync.
    const scan = () => {
      host.querySelectorAll<HTMLElement>("[data-foil]").forEach((element) => {
        if (kinds.has(element)) return;
        kinds.set(element, (element.dataset.foil as FoilKind) || "foil");
        observer.observe(element);
      });
      kinds.forEach((_, element) => {
        if (element.isConnected) return;
        kinds.delete(element);
        visible.delete(element);
        observer.unobserve(element);
      });
    };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(host, { childList: true, subtree: true });

    const update = () => {
      // Measure every element first, then write, so the browser lays out once per frame.
      const boxes: Array<[HTMLElement, DOMRect]> = [];
      visible.forEach((element) => boxes.push([element, element.getBoundingClientRect()]));
      for (const [element, rect] of boxes) {
        const kind = kinds.get(element) ?? "foil";
        const style = element.style;
        const cx = rect.left + rect.width / 2 - lamp.x;
        const cy = rect.top + rect.height / 2 - lamp.y;
        style.setProperty("--lx", `${(lamp.x - rect.left).toFixed(1)}px`);
        style.setProperty("--ly", `${(lamp.y - rect.top).toFixed(1)}px`);
        if (kind === "glitter") continue;
        if (kind === "seal") {
          // Concentric grooves: the radius pointing at the lamp lights up.
          const distance = Math.hypot(cx, cy);
          const s0 = distance / Math.hypot(distance, LAMP_HEIGHT);
          style.setProperty("--la", `${(Math.atan2(-cx, cy) * 180 / Math.PI).toFixed(1)}deg`);
          style.setProperty("--sc", rgbCss(grating(s0)));
          style.setProperty("--sc2", rgbCss(grating(s0 * 0.93)));
          continue;
        }
        // Straight grooves turned toward the lamp: rainbow rings centered on it.
        let along: number;
        let rest: number;
        if (kind === "text") {
          along = cx;
          rest = cy * cy + LAMP_HEIGHT * LAMP_HEIGHT;
        } else {
          along = Math.hypot(cx, cy);
          rest = LAMP_HEIGHT * LAMP_HEIGHT;
          style.setProperty("--k", `${(Math.atan2(cy, cx) * 180 / Math.PI).toFixed(2)}deg`);
        }
        const half = kind === "text" ? rect.width / 2 : Math.hypot(rect.width, rect.height) / 2 + 1;
        const t = (x: number) => x / Math.sqrt(x * x + rest);
        // A small element covers a narrow slice of the spectrum; widen it so two or three colors show.
        const f0 = (t(along) + T) / (2 * T);
        const w = Math.max((t(along + half) - t(along - half)) / (4 * T) * SPREAD, 0.03);
        const fa = f0 - w;
        const size = (2 * half) / (2 * w);
        if (kind === "foil") style.setProperty("--dg", `${(2 * half).toFixed(1)}px`);
        style.setProperty("--bs", `${size.toFixed(1)}px`);
        style.setProperty("--bp", `${(-fa * size).toFixed(1)}px`);
      }
    };

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (document.hidden) return;
      const dt = Math.max(0, Math.min(now - last, 50)) / 1000;
      last = now;
      const live = now - lamp.at < 4000;
      let tx: number;
      let ty: number;
      if (live) {
        tx = lamp.px;
        ty = lamp.py;
      } else if (reduced) {
        tx = window.innerWidth * 0.72;
        ty = window.innerHeight * 0.22;
      } else {
        const s = now / 1000;
        tx = window.innerWidth * (0.5 + 0.42 * Math.sin(s * 0.21));
        ty = window.innerHeight * (0.4 + 0.32 * Math.sin(s * 0.33 + 1.2));
      }
      const k = 1 - Math.exp(-dt * (live ? 16 : 2.5));
      lamp.x += (tx - lamp.x) * k;
      lamp.y += (ty - lamp.y) * k;
      if (visible.size) update();
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, [root]);
}
