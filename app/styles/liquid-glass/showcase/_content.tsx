"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Compass, Heart, Moon, Move, Search, SlidersHorizontal, Sun, Waves, X } from "lucide-react";
import { useTheme } from "next-themes";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useOpaqueGlassPreference, useSvgBackdropSupport } from "@/components/liquid-glass/liquid-glass";
import { FluidGlass as LiquidGlass, FluidSegmented } from "@/components/liquid-glass/fluid-glass";
import { LiquidFusion } from "@/components/liquid-glass/liquid-fusion";
import { ShowcaseJourney } from "@/components/liquid-glass/showcase-journey";
import { Modal, ModalContent, ModalDescription, ModalTitle } from "@/components/ui/modal/modal";
import { useI18n } from "@/lib/i18n/context";
import styles from "./showcase.module.css";

const surfaces = [
  { id: "glacier", name: "Clear glass", zh: "清透玻璃", category: "ice", profile: "01 / CLEAR", tag: { en: "Light, held gently", zh: "把光，轻轻托住" }, summary: { en: "A clear center. A curved, refractive edge.", zh: "中心通透，光线在边缘弯折。" }, body: { en: "Press the surface to feel its tension. The material gently expands around your touch, then settles back, while the text remains steady above it.", zh: "按住表面，感受它的张力。材质沿着触碰的位置轻轻鼓起，释放后弹回；文字稳定地留在玻璃之上。" } },
  { id: "waterfall", name: "Soft frost", zh: "柔雾玻璃", category: "water", profile: "02 / FROST", tag: { en: "Softness with substance", zh: "朦胧，也有厚度" }, summary: { en: "Soft light. The same elastic response.", zh: "柔化背景，保留触碰时的弹性。" }, body: { en: "A softer finish lets dense content stay readable. Its optical texture changes, while the same responsive edge follows your press and springs back on release.", zh: "柔雾表面让信息更容易阅读。背景的质感变得柔和，边缘仍会随按压发生形变，并在松手后恢复。" } },
  { id: "coast", name: "Chromatic edge", zh: "色散边缘", category: "coast", profile: "03 / DISPERSION", tag: { en: "A little color in the light", zh: "光线里的一点色彩" }, summary: { en: "Fine color separation at a curved rim.", zh: "曲面边缘，藏着克制的色散。" }, body: { en: "A fine separation of color makes the curved rim easier to see. The center stays neutral and the motion stays soft, leaving the content clear.", zh: "边缘轻微的色彩分离，让曲面的厚度更容易被看见。中心保持中性，动作保持柔和，内容依然清晰。" } },
  { id: "mountain", name: "Soft capsule", zh: "柔性胶囊", category: "coast", profile: "04 / CAPSULE", tag: { en: "A surface with tension", zh: "有张力的柔软表面" }, summary: { en: "Rounder corners. A gentler, softer edge.", zh: "更圆润的边角，更柔软的触感。" }, body: { en: "The capsule brings the material into navigation and controls. Drag the selector below to see the active lens stretch along its movement, then gather itself into place.", zh: "胶囊形态让材质进入导航和控件。拖动下方的选中镜片，看它沿着移动方向拉长，再收拢到新的位置。" } },
] as const;
const scenes = [surfaces[0], surfaces[2], surfaces[3]];
const copy = {
  en: {
    back: "Style guide", explore: "Surfaces", journey: "Shapes", essentials: "Controls", saved: "Saved surfaces", theme: "Change color theme", lab: "Material studio",
    eyebrow: "LIQUID GLASS / MATERIAL IN MOTION", title: ["Light,", "in motion."], intro: "Press. Drag. Release. Feel the glass respond.", discover: "Touch the surfaces", weather: "Surface tension", weatherNote: "A soft response to every touch",
    feature: "TRY IT / DRAG THIS GLASS", featureTitle: "Give it a little push.", featureBody: "Hold and drag. The glass stretches with your movement, then springs back into shape.", moveGlass: "Drag the glass. Arrow keys move; Home resets it; Escape cancels.", scenic: "Change the backdrop", scroll: "More glass, below",
    chapter: "01 / A FAMILY OF SURFACES", heading: "Every surface, liquid.", subheading: "Four finishes. One material that responds to you.", all: "All surfaces", water: "Frost", ice: "Clear", coast: "Curved", search: "Find a surface", searchHint: "Search surfaces…", clearSearch: "Clear search", bookmark: "Save", removeBookmark: "Unsave", details: "Open", noResults: "No matching surface.", noResultsHint: "Try another name, or explore the whole collection.", reset: "Show all surfaces", savedCount: "saved", added: "Surface saved", removed: "Surface removed", add: "Save this surface", remove: "Saved to your collection",
    journal: "02 / FEEL THE DIFFERENCE", journalTitle: "The liquid is in the response.", journalBody: "The edge gives a little when pressed. Drag it, and the shape follows your direction. Let go, and surface tension brings it back.", read: "What to look for", journalMore: "Watch the glass itself: its silhouette stretches, its rim moves, and the scene bends beneath it. The label stays steady above the material.", quote: "Drag me.", issue: "PRESS / DRAG / RELEASE", press: "Press", drag: "Drag", lensLabel: "Move this lens", lensHint: "Drag or use arrow keys. Home resets.", pressHint: "Hold to press. Release to let it settle.",
    materialTitle: "A material. Not a layer of blur.", materialBody: "Light bends at the rim. The surface gives under your touch. Everything finds its shape again.", principles: [["Pressure", "The material expands gently around your touch."], ["Movement", "The silhouette stretches along the direction of motion."], ["Release", "A damped spring brings the glass back to rest."]], references: "Source studies", footer: "A Liquid Glass experience by StyleKit", guide: "Explore the style", credits: "Photography & credits", fallback: "This browser shows a frosted surface with the same motion.", opaque: "Solid surfaces follow your display preference. Motion stays available.", demo: "An interactive material showcase",
  },
  zh: {
    back: "风格规范", explore: "玻璃表面", journey: "形态变化", essentials: "液态控件", saved: "收藏的材质", theme: "切换明暗主题", lab: "材质实验室",
    eyebrow: "LIQUID GLASS / 流动的材质", title: ["有形，", "也流动。"], intro: "按住、拖动、松手，让玻璃回应你的动作。", discover: "触碰这些表面", weather: "表面张力", weatherNote: "触碰时，曲面也会跟着变化",
    feature: "动手试试 / 拖动这块玻璃", featureTitle: "轻轻推一下。", featureBody: "按住拖动，看玻璃沿着方向拉伸；松手之后，它会弹回柔软的形状。", moveGlass: "拖动玻璃。方向键移动，Home 复位，Escape 取消。", scenic: "切换背景", scroll: "往下，还有更多玻璃",
    chapter: "01 / 同一材质，不同表面", heading: "每一面，都在回应。", subheading: "四种质感，都有触碰时的张力与弹性。", all: "全部表面", water: "柔雾", ice: "清透", coast: "曲面", search: "查找材质", searchHint: "搜索想看的表面…", clearSearch: "清空搜索", bookmark: "收藏", removeBookmark: "取消收藏", details: "查看", noResults: "没有匹配的材质。", noResultsHint: "试试其他名称，或看看全部表面。", reset: "查看全部表面", savedCount: "个收藏", added: "已收藏这块材质", removed: "已取消收藏", add: "收藏这块材质", remove: "已加入你的收藏",
    journal: "02 / 感受液态", journalTitle: "液态，发生在你的手下。", journalBody: "按下，边缘会轻轻鼓起。拖动，形状沿着动作伸展。松开，表面张力让它重新收拢。", read: "留意这些细节", journalMore: "看玻璃本身：轮廓会伸展，边缘会移动，底下的风景随之弯折。文字稳定地留在材质之上。", quote: "拖动我。", issue: "按压 / 拉伸 / 回弹", press: "按压", drag: "拖动", lensLabel: "移动这块透镜", lensHint: "拖动或用方向键移动，Home 复位。", pressHint: "按住让材质鼓起，松手看它收拢。",
    materialTitle: "让材质，真正回应。", materialBody: "光线在边缘弯折，曲面在触碰时让步，再柔和地恢复自己的形状。", principles: [["按压", "材质围绕触碰的位置，轻轻鼓起。"], ["移动", "轮廓沿着动作的方向，柔软伸展。"], ["释放", "带着阻尼的弹簧，让玻璃重新安静下来。"]], references: "参考与源码", footer: "StyleKit · 液态玻璃设计体验", guide: "查看完整风格", credits: "摄影与素材来源", fallback: "当前浏览器显示磨砂材质，仍可体验相同的形变交互。", opaque: "已按显示偏好使用实体表面，形变交互仍可使用。", demo: "可以动手感受的材质展示",
  },
} as const;
type Surface = (typeof surfaces)[number];
type Category = "all" | "water" | "ice" | "coast";

function Landscape({ image, className, priority = false, sizes = "100vw" }: { image: string; className?: string; priority?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={`${styles.landscape} ${className ?? ""}`} data-image={image} data-failed={failed} aria-hidden="true">
    {!failed && <Image src={`/styles/liquid-glass/${image}.webp`} alt="" fill sizes={sizes} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} unoptimized onError={() => setFailed(true)} />}
  </div>;
}

export default function LiquidGlassShowcase() {
  const { locale } = useI18n();
  const t = copy[locale];
  const { resolvedTheme, setTheme } = useTheme();
  const supported = useSvgBackdropSupport();
  const opaque = useOpaqueGlassPreference();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<Set<string>>(() => new Set());
  const [onlySaved, setOnlySaved] = useState(false);
  const [selected, setSelected] = useState<Surface | null>(null);
  const [material, setMaterial] = useState<"clear" | "frost">("clear");
  const [dock, setDock] = useState("surfaces");
  const [refraction, setRefraction] = useState(62);
  const [announcement, setAnnouncement] = useState("");
  const detailTrigger = useRef<HTMLButtonElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const scene = scenes[sceneIndex];
  const settings = { light: 72, refraction: material === "clear" ? refraction : 0, depth: 40, dispersion: 0, frost: material === "clear" ? 1.3 : 12, spread: 52 };
  const darkTint = material === "clear" ? "rgba(14,37,52,0.24)" : "rgba(14,37,52,0.46)";
  const matches = surfaces.filter((surface) => (category === "all" || surface.category === category) && (!onlySaved || saved.has(surface.id)) && `${surface.name} ${surface.zh} ${surface.summary[locale]}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));

  function toggleSaved(id: string) {
    setAnnouncement(saved.has(id) ? t.removed : t.added);
    setSaved((previous) => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }
  function showCollection() {
    setOnlySaved(true); setCategory("all"); setQuery("");
    document.getElementById("destinations")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <Modal open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
    <main className={styles.page} data-locale={locale}>
      <div className={styles.ambient} aria-hidden="true" />
      <LiquidGlass appearance="clear" radius={999} settings={settings} tint={darkTint} className={styles.utilityGlass} contentClassName={styles.utility}>
        <LocalizedLink href="/styles/liquid-glass" data-back-navigation="true"><ArrowLeft size={14} aria-hidden="true" />{t.back}</LocalizedLink><span>STYLEKIT / LIQUID GLASS</span><LocalizedLink href="/liquid-glass">{t.lab}<ArrowUpRight size={14} aria-hidden="true" /></LocalizedLink>
      </LiquidGlass>
      <section className={styles.hero} data-fluid-bounds aria-labelledby="liquid-title">
        <Landscape key={scene.id} image={scene.id} priority className={styles.heroImage} /><div className={styles.heroShade} />
        <div className={styles.heroNavigation}><LiquidGlass appearance="clear" radius={999} settings={settings} tint={darkTint} contentClassName={styles.navInner}>
          <a href="#" className={styles.wordmark} aria-label="Liquid Glass"><Waves size={24} strokeWidth={1.5} aria-hidden="true" />liquid<span>.</span></a>
          <nav aria-label={locale === "zh" ? "材质展示导航" : "Material navigation"} className={styles.navLinks}><a href="#destinations">{t.explore}</a><a href="#journey">{t.journey}</a><a href="#essentials">{t.essentials}</a></nav>
          <div className={styles.navActions}><button type="button" aria-label={`${t.saved} (${saved.size})`} onClick={showCollection}><Heart size={18} aria-hidden="true" />{saved.size > 0 && <span className={styles.count}>{saved.size}</span>}</button><button type="button" aria-label={t.theme} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}><Sun size={18} className={styles.sunIcon} aria-hidden="true" /><Moon size={18} className={styles.moonIcon} aria-hidden="true" /></button></div>
        </LiquidGlass></div>
        <div className={styles.heroCoordinate}><span className={styles.liveDot} />{scene.profile}<span>LIQUID GLASS</span></div>
        <div className={styles.heroCopy}><p className={styles.eyebrow}>{t.eyebrow}</p><h1 id="liquid-title">{t.title[0]}<br /><em>{t.title[1]}</em></h1><p className={styles.heroDescription}>{t.intro}</p><LiquidGlass appearance="clear" radius={999} settings={settings} tint="rgba(255,255,255,0.15)" className={styles.ctaGlass}><a href="#destinations" className={styles.heroCta}>{t.discover}<ArrowDown size={18} aria-hidden="true" /></a></LiquidGlass></div>
        <aside className={styles.heroAside}><LiquidGlass appearance="clear" radius={26} settings={settings} tint={darkTint} contentClassName={styles.weather}><Waves size={29} strokeWidth={1.3} aria-hidden="true" /><div><span>{t.weather}</span><small>{t.weatherNote}</small></div><Move size={20} aria-hidden="true" /></LiquidGlass>
          <LiquidGlass draggable dragLabel={t.moveGlass} appearance="clear" radius={44} settings={settings} tint={darkTint} contentClassName={styles.featureCard}><span className={styles.smallCaps}>{t.feature}</span><div className={styles.featureIcon}><Move size={28} strokeWidth={1.3} aria-hidden="true" /><span>PRESS + DRAG</span></div><h2>{t.featureTitle}</h2><p>{t.featureBody}</p><span className={styles.dragFoot}>{locale === "zh" ? "拖动时拉伸，松手后回弹" : "Stretch in motion. Settle on release."}<ArrowUpRight size={20} aria-hidden="true" /></span></LiquidGlass>
        </aside>
        <div className={styles.heroBottom}><div className={styles.scenePicker} role="group" aria-label={t.scenic}><span>0{sceneIndex + 1}<i> / 03</i></span>{scenes.map((item, index) => <button key={item.id} type="button" aria-label={`${t.scenic} ${index + 1}`} aria-pressed={sceneIndex === index} onClick={() => setSceneIndex(index)}><span style={{ backgroundImage: `url(/styles/liquid-glass/${item.id}.webp)` }} /></button>)}</div>
          <LiquidGlass appearance="clear" radius={999} settings={settings} tint={darkTint} contentClassName={styles.dock}><FluidSegmented settings={settings} ariaLabel={locale === "zh" ? "玻璃导航" : "Glass navigation"} className={styles.dockControl} value={dock} options={[{value:"surfaces",label:<><Compass size={20} aria-hidden="true" /><span className="sr-only">{t.explore}</span></>},{value:"saved",label:<><Heart size={20} aria-hidden="true" /><span className="sr-only">{t.saved}</span></>},{value:"shapes",label:<><Waves size={20} aria-hidden="true" /><span className="sr-only">{t.journey}</span></>},{value:"controls",label:<><SlidersHorizontal size={20} aria-hidden="true" /><span className="sr-only">{t.essentials}</span></>}]} onValueChange={(value) => { setDock(value); if(value === "saved") showCollection(); else document.getElementById(value === "shapes" ? "journey" : value === "controls" ? "essentials" : "destinations")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }} /></LiquidGlass>
          <a href="#destinations" className={styles.scrollHint}>{t.scroll}<ArrowDown size={15} aria-hidden="true" /></a></div>
      </section>

      <div className={styles.body}>
        <section id="destinations" className={styles.destinations} aria-labelledby="surfaces-title">
          <header className={styles.sectionHeader}><div><p className={styles.chapter}>{t.chapter}</p><h2 id="surfaces-title">{t.heading}</h2></div><p>{t.subheading}</p></header>
          <div className={styles.filters}><LiquidGlass appearance="clear" radius={999} settings={settings} tint={darkTint} className={styles.tabGlass}><FluidSegmented settings={settings} ariaLabel={t.explore} className={styles.materialTabs} value={onlySaved ? "saved" : category} options={[...(["all", "water", "ice", "coast"] as const).map(value => ({ value, label: t[value] })), { value: "saved", label: <span className={styles.savedLabel}><Heart size={14} aria-hidden="true" />{saved.size}<span className="sr-only">{t.savedCount}</span></span> }]} onValueChange={(value) => { if (value === "saved") setOnlySaved(true); else { setOnlySaved(false); setCategory(value as Category); } }} /></LiquidGlass>
            <LiquidGlass appearance="clear" radius={999} settings={settings} tint={darkTint}><div className={styles.searchField} role="search" aria-label={t.search}><Search size={17} aria-hidden="true" /><input ref={searchInput} type="search" aria-label={t.search} placeholder={t.searchHint} value={query} onChange={(event) => setQuery(event.currentTarget.value)} />{query && <button type="button" aria-label={t.clearSearch} onClick={() => setQuery("")}><X size={15} aria-hidden="true" /></button>}</div></LiquidGlass></div>
          <div className={styles.placeGrid}>{matches.map((surface) => <article key={surface.id} className={styles.placeCard}><Landscape image={surface.id} sizes="(max-width: 700px) 100vw, 50vw" />
            <LiquidGlass appearance="clear" radius={surface.id === "mountain" ? 58 : 28} settings={{ ...settings, frost: surface.id === "waterfall" ? 8 : settings.frost, dispersion: surface.id === "coast" ? 3 : settings.dispersion }} tint="rgba(12,35,52,0.18)" className={styles.cardGlass} contentClassName={styles.cardContent}>
              <span className={styles.placeTag}>{surface.tag[locale]}</span><button type="button" className={styles.saveButton} aria-pressed={saved.has(surface.id)} aria-label={`${saved.has(surface.id) ? t.removeBookmark : t.bookmark} ${locale === "zh" ? surface.zh : surface.name}`} onClick={() => toggleSaved(surface.id)}><Heart size={19} fill={saved.has(surface.id) ? "currentColor" : "none"} aria-hidden="true" /></button>
              <div className={styles.captionInner}><div><p>{surface.profile}</p><h3>{locale === "zh" ? surface.zh : surface.name}</h3><span>{surface.summary[locale]}</span></div><button type="button" aria-label={`${t.details} ${locale === "zh" ? surface.zh : surface.name}`} onClick={(event) => { detailTrigger.current = event.currentTarget; setSelected(surface); }}><ArrowUpRight size={21} aria-hidden="true" /></button></div>
            </LiquidGlass>
          </article>)}</div>
          {matches.length === 0 && <LiquidGlass appearance="clear" radius={28} settings={settings} tint={darkTint} contentClassName={styles.empty}><Compass size={32} strokeWidth={1} aria-hidden="true" /><h3>{t.noResults}</h3><p>{t.noResultsHint}</p><button type="button" onClick={() => { setCategory("all"); setQuery(""); setOnlySaved(false); searchInput.current?.focus(); }}>{t.reset}<ArrowRight size={16} aria-hidden="true" /></button></LiquidGlass>}
        </section>
        <section className={styles.journal} aria-labelledby="motion-title">
          <LiquidFusion locale={locale} />
          <LiquidGlass appearance="clear" radius={32} settings={settings} tint={darkTint} contentClassName={styles.journalCopy}><p className={styles.chapter}>{t.journal}</p><Waves size={42} strokeWidth={1} aria-hidden="true" /><h2 id="motion-title">{t.journalTitle}</h2><p>{t.journalBody}</p><p className={styles.fusionHint}>{locale === "zh" ? "把小滴拉近，玻璃会连成一片；向外拖开，连接处会拉长、分离。" : "Bring the small drop closer to join the glass. Pull it away to stretch the neck until the surfaces part."}</p><details><summary>{t.read}<ArrowDown size={16} aria-hidden="true" /></summary><p>{t.journalMore}</p></details></LiquidGlass>
        </section>
        <ShowcaseJourney locale={locale} material={material} onMaterialChange={setMaterial} refraction={refraction} onRefractionChange={setRefraction} />
        <section className={styles.materialNote} aria-labelledby="material-title"><p className={styles.chapter}>LIQUID GLASS / STYLEKIT</p><h2 id="material-title">{t.materialTitle}</h2><p>{t.materialBody}</p><div className={styles.principles}>{t.principles.map(([title, body], index) => <LiquidGlass key={title} appearance="clear" radius={28} settings={settings} tint={darkTint} contentClassName={styles.principleCard}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></LiquidGlass>)}</div>{(opaque || !supported) && <p role="status">{opaque ? t.opaque : t.fallback}</p>}<div className={styles.references}><span>{t.references}</span>{[["rdev", "https://github.com/rdev/liquid-glass-react"], ["glassy-liquid", "https://github.com/9und30/glassy-liquid"], ["shuding", "https://github.com/shuding/liquid-glass"]].map(([name, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={12} aria-hidden="true" /></a>)}</div></section>
        <LiquidGlass appearance="clear" radius={28} settings={settings} tint={darkTint} contentClassName={styles.footer}><div><span className={styles.footerBrand}>liquid.</span><p>{t.footer}</p><small>{t.demo}</small></div><div><LocalizedLink href="/styles/liquid-glass">{t.guide}<ArrowUpRight size={15} aria-hidden="true" /></LocalizedLink><a href="https://github.com/AnxForever/stylekit/blob/dev/public/styles/liquid-glass/CREDITS.md" target="_blank" rel="noopener noreferrer">{t.credits}<ArrowUpRight size={15} aria-hidden="true" /></a></div></LiquidGlass>
      </div><p className="sr-only" role="status" aria-live="polite">{announcement}</p>
    </main>
    <ModalContent className={styles.detailContent} onCloseAutoFocus={(event) => { event.preventDefault(); (detailTrigger.current?.isConnected ? detailTrigger.current : searchInput.current)?.focus(); }}>
      {selected && <><Landscape image={selected.id} className={styles.detailBackdrop} sizes="640px" /><LiquidGlass appearance="clear" radius={28} settings={settings} tint="rgba(8,29,44,0.60)" contentClassName={styles.detailBody}><p className={styles.chapter}>{selected.tag[locale]}</p><ModalTitle className={styles.detailTitle}>{locale === "zh" ? selected.zh : selected.name}</ModalTitle><span className={styles.detailCoordinates}>{selected.profile}</span><ModalDescription className={styles.detailDescription}>{selected.body[locale]}</ModalDescription><LiquidGlass appearance="clear" radius={999} settings={settings} tint="rgba(255,255,255,0.13)"><button type="button" className={styles.detailSave} onClick={() => toggleSaved(selected.id)}>{saved.has(selected.id) ? <Check size={17} aria-hidden="true" /> : <Heart size={17} aria-hidden="true" />}{saved.has(selected.id) ? t.remove : t.add}</button></LiquidGlass></LiquidGlass></>}
    </ModalContent>
  </Modal>;
}
