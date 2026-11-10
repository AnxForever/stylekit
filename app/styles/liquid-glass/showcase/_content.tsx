"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { ArrowLeft, ArrowUpRight, Grid2X2, ImageIcon, Moon, Move, RotateCcw, Search, Sun, Waves, X } from "lucide-react";
import { useTheme } from "next-themes";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { LiquidGlass, useOpaqueGlassPreference, useSvgBackdropSupport } from "@/components/liquid-glass/liquid-glass";
import { useI18n } from "@/lib/i18n/context";
import { GlassBackdrop } from "./_backdrop";
import styles from "./showcase.module.css";

const scenes = [
  { id: "glacier", icon: ImageIcon, en: "Glacier", zh: "冰川" },
  { id: "tide", icon: Waves, en: "Contours", zh: "等高线" },
  { id: "grid", icon: Grid2X2, en: "Grid", zh: "网格" },
] as const;

const copy = {
  en: {
    back: "Liquid Glass style",
    lab: "Material lab",
    title: "Liquid Glass",
    description: "Move the glass across the scene. Watch the edges bend while the center stays clear.",
    material: "Material",
    clear: "Glass",
    frost: "Frost",
    background: "Background",
    search: "Find a scene",
    searchPlaceholder: "Glacier, contours, grid…",
    noResults: "No matching scene. Try another name.",
    closeSearch: "Close scene search",
    refraction: "Refraction",
    move: "Move the glass",
    instruction: "Drag the glass, or focus it and use the arrow keys. Home or Enter centers it; Escape cancels a drag.",
    center: "Center lens",
    live: "Live refraction",
    frosted: "Frost softens the view without bending it.",
    fallback: "This browser shows a frosted alternative. Live refraction is available in Chrome and Edge.",
    opaque: "Your display preference is using a solid surface.",
    imageFailed: "The photograph could not load. A local contour scene is shown instead.",
    dark: "Switch to dark theme",
    light: "Switch to light theme",
    sceneNames: { glacier: "Jökulsárlón, Iceland", tide: "Lines in the water", grid: "Follow the straight lines" },
    sceneDetail: { glacier: "Light, ice, and a little distortion.", tide: "A drawn landscape for a moving lens.", grid: "The clearest way to see the curve." },
    principles: [
      ["A clear center", "The scene stays recognizable. The strongest distortion lives at the edge."],
      ["A fine rim", "A thin highlight and a soft shadow give the glass its thickness."],
      ["Content stays sharp", "Keep labels above the material and longer reading on solid surfaces."],
    ],
    guide: "Explore the full style guide",
    credit: "Photograph: Jeremy Bishop",
  },
  zh: {
    back: "液态玻璃风格",
    lab: "材质实验室",
    title: "液态玻璃",
    description: "把玻璃拖过画面，看边缘的光线弯折，让中心的细节透过来。",
    material: "材质",
    clear: "清透",
    frost: "磨砂",
    background: "背景",
    search: "查找场景",
    searchPlaceholder: "冰川、等高线、网格…",
    noResults: "没有匹配的场景，试试其他名称。",
    closeSearch: "关闭场景搜索",
    refraction: "折射",
    move: "移动玻璃",
    instruction: "拖动玻璃，或聚焦后用方向键移动。Home 或 Enter 居中，Escape 取消拖动。",
    center: "透镜居中",
    live: "实时折射",
    frosted: "磨砂让画面柔和，保留原来的线条走向。",
    fallback: "当前浏览器显示磨砂材质；Chrome 和 Edge 可体验实时折射。",
    opaque: "已按你的显示偏好使用实体材质。",
    imageFailed: "照片暂时无法加载，已显示本地等高线背景。",
    dark: "切换到深色主题",
    light: "切换到浅色主题",
    sceneNames: { glacier: "冰岛，杰古沙龙冰河湖", tide: "水上的等高线", grid: "沿着直线，看见弯折" },
    sceneDetail: { glacier: "光、冰川，以及一点折射。", tide: "让一幅线条风景经过透镜。", grid: "让细节呈现材质的曲率。" },
    principles: [
      ["中心清晰", "背景依然可以辨认，明显的弯折留在玻璃边缘。"],
      ["边缘轻盈", "一圈细高光和柔和投影，让透明表面有了厚度。"],
      ["文字稳定", "标签放在材质之上，长文字留在安静的实体表面。"],
    ],
    guide: "查看完整风格规范",
    credit: "摄影：Jeremy Bishop",
  },
} as const;

type Scene = (typeof scenes)[number]["id"];
type Point = { x: number; y: number };
type Drag = { id: number; pointer: Point; start: Point };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function LiquidGlassShowcase() {
  const { locale } = useI18n();
  const t = copy[locale];
  const { resolvedTheme, setTheme } = useTheme();
  const supported = useSvgBackdropSupport();
  const opaque = useOpaqueGlassPreference();
  const hintId = useId();
  const searchId = useId();
  const [scene, setScene] = useState<Scene>("glacier");
  const [material, setMaterial] = useState<"clear" | "frost">("clear");
  const [refraction, setRefraction] = useState(62);
  const [imageFailed, setImageFailed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const position = useRef<Point | null>(null);
  const drag = useRef<Drag | null>(null);
  const pending = useRef<Point | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  function closeSearch() {
    setSearchOpen(false);
    searchTrigger.current?.focus();
  }

  function chooseScene(id: Scene) {
    setScene(id);
    setQuery("");
    if (searchOpen) closeSearch();
  }

  const placeLens = useCallback((point?: Point) => {
    const stage = stageRef.current;
    const lens = lensRef.current;
    if (!stage || !lens) return;
    const minX = Math.min(12, Math.max(0, (stage.clientWidth - lens.offsetWidth) / 2));
    const minY = Math.min(12, Math.max(0, (stage.clientHeight - lens.offsetHeight) / 2));
    const maxX = Math.max(minX, stage.clientWidth - lens.offsetWidth - minX);
    const maxY = Math.max(minY, stage.clientHeight - lens.offsetHeight - minY);
    const next = {
      x: clamp(point?.x ?? (minX + maxX) / 2, minX, maxX),
      y: clamp(point?.y ?? (minY + maxY) / 2, minY, maxY),
    };
    position.current = next;
    lens.style.left = "0";
    lens.style.top = "0";
    lens.style.transform = "translate3d(" + next.x + "px," + next.y + "px,0)";
  }, []);

  const finishDrag = useCallback((commit: boolean) => {
    const gesture = drag.current;
    if (!gesture) return;
    drag.current = null;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    placeLens(commit ? pending.current ?? position.current ?? gesture.start : gesture.start);
    pending.current = null;
    if (lensRef.current) lensRef.current.dataset.dragging = "false";
    const handle = handleRef.current;
    if (handle?.hasPointerCapture(gesture.id)) handle.releasePointerCapture(gesture.id);
  }, [placeLens]);

  useEffect(() => {
    const stage = stageRef.current;
    const lens = lensRef.current;
    if (!stage || !lens) return;
    placeLens();
    const resize = () => {
      finishDrag(false);
      placeLens(position.current ?? undefined);
    };
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    observer?.observe(stage);
    observer?.observe(lens);
    window.addEventListener("resize", resize);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [finishDrag, placeLens]);

  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0 || drag.current) return;
    if (!position.current) placeLens();
    if (!position.current) return;
    event.currentTarget.focus({ preventScroll: true });
    drag.current = {
      id: event.pointerId,
      pointer: { x: event.clientX, y: event.clientY },
      start: { ...position.current },
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (lensRef.current) lensRef.current.dataset.dragging = "true";
  }

  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    pending.current = {
      x: gesture.start.x + event.clientX - gesture.pointer.x,
      y: gesture.start.y + event.clientY - gesture.pointer.y,
    };
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      if (pending.current) placeLens(pending.current);
      pending.current = null;
    });
  }

  function endPointer(event: PointerEvent<HTMLButtonElement>, commit: boolean) {
    if (drag.current?.id === event.pointerId) finishDrag(commit);
  }

  function centerLens() {
    finishDrag(false);
    placeLens();
  }

  function moveWithKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      if (drag.current) {
        event.preventDefault();
        finishDrag(false);
      }
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      centerLens();
      return;
    }
    const step = event.shiftKey ? 30 : 10;
    const direction: Record<string, Point> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };
    const delta = direction[event.key];
    if (!delta) return;
    event.preventDefault();
    finishDrag(false);
    const current = position.current;
    if (current) placeLens({ x: current.x + delta.x, y: current.y + delta.y });
  }

  const clear = material === "clear";
  const controlsDisabled = !supported || opaque || !clear;
  const visibleScene = scene === "glacier" && imageFailed ? "tide" : scene;
  const materialSettings = { refraction: clear ? refraction : 0, depth: 40, spread: 52, dispersion: clear ? 5 : 0, frost: clear ? 1.1 : 65, light: 72 };
  const matchingScenes = scenes.filter(({ id, en, zh }) =>
    (id + " " + en + " " + zh).toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <nav className={styles.utility} aria-label={t.title}>
          <LocalizedLink href="/styles/liquid-glass" data-back-navigation="true" className={styles.utilityLink}>
            <ArrowLeft size={15} aria-hidden="true" /> {t.back}
          </LocalizedLink>
          <div className={styles.utilityActions}>
            <LocalizedLink href="/liquid-glass" className={styles.utilityLink}>
              {t.lab} <ArrowUpRight size={15} aria-hidden="true" />
            </LocalizedLink>
            <button type="button" className={styles.themeButton}
              aria-label={resolvedTheme === "dark" ? t.light : t.dark}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
              {resolvedTheme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <header className={styles.intro}>
          <h1>{t.title}</h1>
          <p>{t.description}</p>
        </header>

        <section aria-label={t.title} onKeyDown={(event) => {
          if (event.key === "Escape" && searchOpen) { event.preventDefault(); closeSearch(); }
        }}>
          <div ref={stageRef} className={styles.stage} data-scene={visibleScene}>
            <div className={styles.scene} aria-hidden="true">
              {visibleScene === "glacier" ? (
                <Image src="/styles/liquid-glass/glacier.webp" alt="" fill priority unoptimized
                  sizes="(max-width: 700px) 100vw, 1200px" className={styles.photograph}
                  onError={() => setImageFailed(true)} />
              ) : <GlassBackdrop scene={visibleScene} className={styles.art} />}
            </div>
            <div className={styles.sceneCaption} aria-hidden="true">
              <span>{t.sceneNames[visibleScene]}</span>
              <p>{t.sceneDetail[visibleScene]}</p>
            </div>
            <div ref={lensRef} className={styles.lensPosition} data-dragging="false">
              <LiquidGlass appearance="clear" radius={52}
                settings={materialSettings}
                tint={clear ? "rgba(255,255,255,0.025)" : "rgba(235,244,247,0.18)"}
                className={styles.lens} contentClassName={styles.lensContent}>
                <button ref={handleRef} type="button" className={styles.lensHandle}
                  aria-label={t.move} aria-describedby={hintId}
                  onPointerDown={startDrag} onPointerMove={moveDrag}
                  onPointerUp={(event) => endPointer(event, true)}
                  onPointerCancel={(event) => endPointer(event, false)}
                  onLostPointerCapture={(event) => endPointer(event, false)}
                  onBlur={() => finishDrag(false)}
                  onKeyDown={moveWithKeyboard}
                  onClick={(event) => { if (event.detail === 0) centerLens(); }}>
                  <span className={styles.lensLabel}>{clear ? t.clear : t.frost}</span>
                  <span className={styles.moveIcon}><Move size={17} aria-hidden="true" /></span>
                </button>
              </LiquidGlass>
            </div>
            {searchOpen && <button type="button" className={styles.searchDismiss} aria-label={t.closeSearch} onClick={closeSearch} tabIndex={-1} />}
            <div className={styles.glassControls}>
              {searchOpen && (
                <LiquidGlass appearance="clear" settings={materialSettings} radius={26}
                  tint="rgba(20,43,54,0.82)" className={styles.searchPanel}>
                  <form id={searchId} role="search" aria-label={t.search} onSubmit={(event) => {
                    event.preventDefault();
                    if (matchingScenes[0]) chooseScene(matchingScenes[0].id);
                  }}>
                    <div className={styles.searchHeading}>
                      <label htmlFor={searchId + "-input"}>{t.search}</label>
                      <button type="button" aria-label={t.closeSearch} onClick={closeSearch}><X size={16} aria-hidden="true" /></button>
                    </div>
                    <input ref={searchInput} id={searchId + "-input"} type="search" autoComplete="off"
                      placeholder={t.searchPlaceholder} value={query} onChange={(event) => setQuery(event.currentTarget.value)} />
                    <div className={styles.searchResults}>
                      {matchingScenes.map(({ id, icon: Icon, en, zh }) => (
                        <button key={id} type="button" onClick={() => chooseScene(id)} aria-pressed={scene === id}>
                          <Icon size={16} aria-hidden="true" />{locale === "zh" ? zh : en}
                        </button>
                      ))}
                      {matchingScenes.length === 0 && <p role="status">{t.noResults}</p>}
                    </div>
                  </form>
                </LiquidGlass>
              )}
              <LiquidGlass appearance="clear" settings={materialSettings} radius={999}
                tint="rgba(20,43,54,0.64)" contentClassName={styles.dockContent}>
                <nav className={styles.sceneNavigation} aria-label={t.background}>
                  {scenes.map(({ id, icon: Icon, en, zh }) => (
                    <button key={id} type="button" aria-pressed={scene === id} onClick={() => chooseScene(id)}>
                      <Icon size={17} aria-hidden="true" /><span>{locale === "zh" ? zh : en}</span>
                    </button>
                  ))}
                </nav>
                <span className={styles.dockDivider} aria-hidden="true" />
                <button ref={searchTrigger} type="button" className={styles.searchButton}
                  aria-label={t.search} aria-expanded={searchOpen} aria-controls={searchOpen ? searchId : undefined}
                  onClick={() => { if (searchOpen) closeSearch(); else setSearchOpen(true); }}>
                  <Search size={20} aria-hidden="true" />
                </button>
              </LiquidGlass>
            </div>
          </div>

          <div className={styles.toolbar}>
            <div className={styles.choiceGroup}>
              <span className={styles.controlLabel}>{t.material}</span>
              <div className={styles.segmented} role="group" aria-label={t.material}>
                <button type="button" aria-pressed={clear} onClick={() => setMaterial("clear")}>{t.clear}</button>
                <button type="button" aria-pressed={!clear} onClick={() => setMaterial("frost")}>{t.frost}</button>
              </div>
            </div>
            <label className={styles.range} data-disabled={controlsDisabled}>
              <span>{t.refraction}<output>{refraction}%</output></span>
              <input type="range" min={0} max={100} step={1} value={refraction}
                disabled={controlsDisabled}
                onChange={(event) => setRefraction(event.currentTarget.valueAsNumber)} />
            </label>
          </div>

          <div className={styles.caption}>
            <p id={hintId}>{t.instruction}</p>
            <button type="button" className={styles.reset} onClick={centerLens}>
              <RotateCcw size={14} aria-hidden="true" /> {t.center}
            </button>
          </div>
          <p className={styles.status} role="status" aria-live="polite">
            {opaque ? t.opaque : !supported ? t.fallback : clear ? t.live : t.frosted}
            {scene === "glacier" && imageFailed ? " " + t.imageFailed : ""}
          </p>
        </section>

        <section className={styles.principles} aria-label={t.guide}>
          {t.principles.map(([title, body]) => (
            <div key={title}><h2>{title}</h2><p>{body}</p></div>
          ))}
        </section>

        <footer className={styles.footer}>
          <LocalizedLink href="/styles/liquid-glass" className={styles.guideLink}>
            {t.guide} <ArrowUpRight size={16} aria-hidden="true" />
          </LocalizedLink>
          <a className={styles.credit} href="https://commons.wikimedia.org/wiki/File:Iceberg_reflection_in_J%C3%B6kuls%C3%A1rl%C3%B3n_(Unsplash).jpg"
            target="_blank" rel="noopener noreferrer">{t.credit} · CC0</a>
        </footer>
      </div>
    </main>
  );
}
