"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, CloudSun, Compass, Heart, MapPin, Moon, Mountain, Route, Search, SlidersHorizontal, Sun, Waves, X } from "lucide-react";
import { useTheme } from "next-themes";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { LiquidGlass, useOpaqueGlassPreference, useSvgBackdropSupport } from "@/components/liquid-glass/liquid-glass";
import { ShowcaseJourney } from "@/components/liquid-glass/showcase-journey";
import { Modal, ModalContent, ModalDescription, ModalTitle } from "@/components/ui/modal/modal";
import { useI18n } from "@/lib/i18n/context";
import styles from "./showcase.module.css";

const places = [
  { id: "glacier", name: "Jökulsárlón", zh: "杰古沙龙冰河湖", category: "ice", location: "64.0784° N, 16.2306° W", tag: { en: "Blue hour", zh: "蓝色时刻" }, summary: { en: "Where the ice takes its time.", zh: "在流动的冰蓝之间，慢下来。" }, body: { en: "A quiet lagoon at the edge of the glacier. Follow the shore, watch the ice drift toward the Atlantic, and leave a little room for the unexpected.", zh: "冰川尽头的潟湖，浮冰沿着水流慢慢驶向大西洋。沿湖岸走一段，把一点时间留给意料之外的风景。" } },
  { id: "waterfall", name: "Skógafoss", zh: "斯科加瀑布", category: "water", location: "63.5321° N, 19.5114° W", tag: { en: "Chasing waterfalls", zh: "沿着水声" }, summary: { en: "A little mist. A lot of wonder.", zh: "走进水雾，等一道彩虹。" }, body: { en: "A wide curtain of water meets a green valley. Take the path beside the falls for another perspective, then pause at the river below.", zh: "宽阔的水帘落入绿色山谷。沿着瀑布一侧的小径登高，再回到河边，从另一个角度感受水的力量。" } },
  { id: "coast", name: "Reynisfjara", zh: "雷尼斯黑沙滩", category: "coast", location: "63.4044° N, 19.0445° W", tag: { en: "Atlantic air", zh: "大西洋来信" }, summary: { en: "Black sand, endless horizon.", zh: "黑色沙岸，望不到尽头的海。" }, body: { en: "Basalt columns and a dramatic Atlantic horizon. Enjoy the view from well back on the beach and follow all local warnings: the waves here can arrive without notice.", zh: "玄武岩石柱勾勒出海岸的轮廓。请在远离海浪的位置欣赏风景，遵守现场警示；这里的海浪可能突然涌上沙滩。" } },
  { id: "mountain", name: "Kirkjufell", zh: "教会山", category: "coast", location: "64.9417° N, 23.3069° W", tag: { en: "The scenic route", zh: "山海之间" }, summary: { en: "One mountain. A thousand moods.", zh: "同一座山，有千种光线。" }, body: { en: "A familiar silhouette on the Snæfellsnes peninsula. Stay by the water as the light changes, and let the mountain set the pace.", zh: "斯奈山半岛上，一道熟悉却每次不同的山峰剪影。在水边停一会，让光线变换，让山决定今天的节奏。" } },
] as const;

const scenes = [places[0], places[2], places[3]];
const copy = {
  en: {
    back: "Style guide", explore: "Explore", journey: "The journey", essentials: "Essentials", saved: "Saved places", theme: "Change color theme", lab: "Material studio",
    eyebrow: "ICELAND, AT YOUR OWN PACE", title: ["Somewhere,", "slow."], intro: "Less on the itinerary. More in the moment.", discover: "Find your next pause", weather: "South coast", weatherNote: "A little sun between the clouds", weatherLabel: "Weather illustration",
    feature: "A FIELD NOTE", featureTitle: "Take the long way home.", featureBody: "Ice-blue mornings. Salt in the air. A road with room to wander.", featureLink: "Explore the route", scenic: "Change the view", scroll: "A little further down",
    chapter: "01 / PLACES TO PAUSE", heading: "Out of the ordinary.", subheading: "Four places. Countless reasons to stay a little longer.", all: "All places", water: "Waterfalls", ice: "Glaciers", coast: "Coast & mountains", search: "Find a place", searchHint: "Search places…", clearSearch: "Clear search", bookmark: "Save", removeBookmark: "Unsave", details: "Explore", noResults: "No places here just yet.", noResultsHint: "Try another search or show all places.", reset: "Show all places", savedCount: "saved", added: "Added to your collection", removed: "Removed from your collection", add: "Save this place", remove: "Saved to your collection",
    journal: "02 / FROM THE FIELD", journalTitle: "Good things happen when you slow down.", journalBody: "A window down. A road that curves out of sight. The kind of day you never want to end. This is a small invitation to take it all in.", read: "Read the field note", journalMore: "We followed the coast without a schedule. Stopped when the light changed. Found a quiet path beside a waterfall and stayed until the mist settled. Sometimes the best part of a journey is the space you leave in it.", quote: "Leave a little room for wonder.", issue: "FIELD NOTES / VOL. 01",
    materialTitle: "Light on the landscape.", materialBody: "A clear edge. A quiet surface. Just enough glass to hold the view, without getting in its way.", principles: [["See through", "Let photography set the mood. Keep the surface light."], ["Stay in focus", "Clear labels, generous spacing, and familiar controls."], ["Feel the details", "A soft curve, a fine rim, and a little response to your touch."]], references: "Source studies", footer: "A Liquid Glass experience by StyleKit", guide: "Explore the style", credits: "Photography & credits", fallback: "Your browser is showing a frosted glass alternative.", opaque: "Solid surfaces are active for your display preference.", demo: "An interactive travel design study",
  },
  zh: {
    back: "风格规范", explore: "探索目的地", journey: "沿途行程", essentials: "旅行随身", saved: "已收藏", theme: "切换明暗主题", lab: "材质实验室",
    eyebrow: "冰岛，按自己的节奏", title: ["去远方，", "慢一点。"], intro: "少一点安排，多一点此刻。", discover: "寻找下一处停留", weather: "冰岛南岸", weatherNote: "云层之间，偶尔有阳光", weatherLabel: "天气展示示例",
    feature: "一页旅行手记", featureTitle: "绕一点远路，也很好。", featureBody: "冰蓝色的清晨，带着盐味的风，还有可以随时停下来的公路。", featureLink: "看看这条路线", scenic: "切换风景", scroll: "往下，还有风景",
    chapter: "01 / 值得停留的地方", heading: "日常之外，天地之间。", subheading: "四处风景，和无数个再多待一会的理由。", all: "全部风景", water: "瀑布", ice: "冰川", coast: "山与海", search: "查找目的地", searchHint: "搜索想去的地方…", clearSearch: "清空搜索", bookmark: "收藏", removeBookmark: "取消收藏", details: "探索这里", noResults: "这里还没有目的地。", noResultsHint: "试试其他关键词，或看看全部风景。", reset: "查看全部风景", savedCount: "个收藏", added: "已加入你的收藏", removed: "已从收藏中移除", add: "收藏这个地方", remove: "已加入你的收藏",
    journal: "02 / 沿途手记", journalTitle: "慢下来，好事就会发生。", journalBody: "摇下车窗，让道路消失在转弯处。遇见一个舍不得结束的下午。这是一份小小的邀请：好好看一眼眼前的世界。", read: "翻开这页手记", journalMore: "我们沿着海岸走，没有排满日程。光线变了，就停下。在瀑布旁发现一条安静的小路，待到水雾散去。有时候，旅途中最好的部分，是那些特意留出来的空白。", quote: "给惊喜，留一点空白。", issue: "沿途手记 / 第 01 辑",
    materialTitle: "让光，轻轻经过。", materialBody: "清透的边缘，安静的表面。让玻璃托住风景，也让风景自在发生。", principles: [["看得通透", "让摄影定下氛围，让材质保持轻盈。"], ["读得清楚", "清晰的文字，舒展的间距，熟悉的操作。"], ["感受细节", "柔和的曲面，细细的高光，触碰时的一点回应。"]], references: "参考与源码", footer: "StyleKit · 液态玻璃设计体验", guide: "查看完整风格", credits: "摄影与素材来源", fallback: "当前浏览器显示磨砂玻璃替代效果。", opaque: "已按你的显示偏好使用实体材质。", demo: "可交互的旅行设计示例",
  },
} as const;

type Place = (typeof places)[number];
type Category = "all" | "water" | "ice" | "coast";

function Landscape({ image, className, priority = false, sizes = "100vw" }: { image: string; className?: string; priority?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={`${styles.landscape} ${className ?? ""}`} data-image={image} data-failed={failed} aria-hidden="true">
    {!failed && <Image src={`/styles/liquid-glass/${image}.webp`} alt="" fill sizes={sizes} priority={priority} unoptimized onError={() => setFailed(true)} />}
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
  const [selected, setSelected] = useState<Place | null>(null);
  const [material, setMaterial] = useState<"clear" | "frost">("clear");
  const [refraction, setRefraction] = useState(62);
  const [announcement, setAnnouncement] = useState("");
  const detailTrigger = useRef<HTMLButtonElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const scene = scenes[sceneIndex];
  const settings = { light: 72, refraction: material === "clear" ? refraction : 0, depth: 40, dispersion: 3, frost: material === "clear" ? 1.3 : 12, spread: 52 };
  const darkTint = material === "clear" ? "rgba(19,39,46,0.30)" : "rgba(19,39,46,0.54)";
  const matches = places.filter((place) =>
    (category === "all" || place.category === category) && (!onlySaved || saved.has(place.id)) &&
    `${place.name} ${place.zh} ${place.summary[locale]}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  );

  function toggleSaved(id: string) {
    setAnnouncement(saved.has(id) ? t.removed : t.added);
    setSaved((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function showCollection() {
    setOnlySaved(true); setCategory("all"); setQuery("");
    document.getElementById("destinations")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <Modal open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      <main className={styles.page} data-locale={locale}>
        <div className={styles.utility}>
          <LocalizedLink href="/styles/liquid-glass" data-back-navigation="true"><ArrowLeft size={14} aria-hidden="true" /> {t.back}</LocalizedLink>
          <span>STYLEKIT / LIQUID GLASS</span>
          <LocalizedLink href="/liquid-glass">{t.lab}<ArrowUpRight size={14} aria-hidden="true" /></LocalizedLink>
        </div>

        <section className={styles.hero} aria-labelledby="travel-title">
          <Landscape key={scene.id} image={scene.id} priority className={styles.heroImage} />
          <div className={styles.heroShade} />
          <div className={styles.heroNavigation}>
            <LiquidGlass appearance="clear" radius={999} settings={settings} tint={darkTint} contentClassName={styles.navInner}>
              <a href="#" className={styles.wordmark} aria-label="Nord — home"><Mountain size={24} strokeWidth={1.5} aria-hidden="true" /> nord<span>.</span></a>
              <nav aria-label={locale === "zh" ? "旅行导航" : "Travel navigation"} className={styles.navLinks}>
                <a href="#destinations">{t.explore}</a><a href="#journey">{t.journey}</a><a href="#essentials">{t.essentials}</a>
              </nav>
              <div className={styles.navActions}>
                <button type="button" aria-label={`${t.saved} (${saved.size})`} onClick={showCollection}><Heart size={18} aria-hidden="true" />{saved.size > 0 && <span className={styles.count}>{saved.size}</span>}</button>
                <button type="button" aria-label={t.theme} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}><Sun size={18} className={styles.sunIcon} aria-hidden="true" /><Moon size={18} className={styles.moonIcon} aria-hidden="true" /></button>
              </div>
            </LiquidGlass>
          </div>
          <div className={styles.heroCoordinate}><span className={styles.liveDot} /> {scene.location}<span>ICELAND</span></div>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{t.eyebrow}</p>
            <h1 id="travel-title">{t.title[0]}<br /><em>{t.title[1]}</em></h1>
            <p className={styles.heroDescription}>{t.intro}</p>
            <a href="#destinations" className={styles.heroCta}>{t.discover}<ArrowDown size={18} aria-hidden="true" /></a>
          </div>
          <aside className={styles.heroAside}>
            <LiquidGlass appearance="clear" radius={26} settings={settings} tint={darkTint} contentClassName={styles.weather}>
              <CloudSun size={29} strokeWidth={1.3} aria-hidden="true" /><div><span>{t.weather}</span><small>{t.weatherNote}</small></div><span className={styles.temperature}>8°</span><span className="sr-only">{t.weatherLabel}</span>
            </LiquidGlass>
            <LiquidGlass appearance="clear" radius={32} settings={settings} tint={darkTint} contentClassName={styles.featureCard}>
              <span className={styles.smallCaps}>{t.feature}</span>
              <div className={styles.featureIcon}><Route size={24} strokeWidth={1.3} aria-hidden="true" /><span>01 — 03</span></div>
              <h2>{t.featureTitle}</h2><p>{t.featureBody}</p>
              <a href="#journey">{t.featureLink}<span><ArrowUpRight size={20} aria-hidden="true" /></span></a>
            </LiquidGlass>
          </aside>
          <div className={styles.heroBottom}>
            <div className={styles.scenePicker} role="group" aria-label={t.scenic}>
              <span>0{sceneIndex + 1}<i> / 03</i></span>
              {scenes.map((item, index) => <button key={item.id} type="button" aria-label={`${t.scenic} — ${locale === "zh" ? item.zh : item.name}`} aria-pressed={sceneIndex === index} onClick={() => setSceneIndex(index)}><span style={{ backgroundImage: `url(/styles/liquid-glass/${item.id}.webp)` }} /></button>)}
            </div>
            <LiquidGlass appearance="clear" radius={999} settings={settings} tint={darkTint} contentClassName={styles.dock}>
              <a href="#destinations" aria-label={t.explore} className={styles.dockActive}><Compass size={20} aria-hidden="true" /></a>
              <button type="button" aria-label={t.saved} onClick={showCollection}><Heart size={20} aria-hidden="true" /></button>
              <a href="#journey" aria-label={t.journey}><Route size={20} aria-hidden="true" /></a>
              <a href="#essentials" aria-label={t.essentials}><SlidersHorizontal size={20} aria-hidden="true" /></a>
            </LiquidGlass>
            <a href="#destinations" className={styles.scrollHint}>{t.scroll}<ArrowDown size={15} aria-hidden="true" /></a>
          </div>
        </section>

        <div className={styles.body}>
          <section id="destinations" className={styles.destinations} aria-labelledby="places-title">
            <header className={styles.sectionHeader}><div><p className={styles.chapter}>{t.chapter}</p><h2 id="places-title">{t.heading}</h2></div><p>{t.subheading}</p></header>
            <div className={styles.filters}>
              <div className={styles.categories} role="group" aria-label={t.explore}>
                {(["all", "water", "ice", "coast"] as const).map((item) => <button key={item} type="button" aria-pressed={category === item && !onlySaved} onClick={() => { setCategory(item); setOnlySaved(false); }}>{t[item]}</button>)}
                <button type="button" className={styles.savedFilter} aria-pressed={onlySaved} onClick={() => setOnlySaved(!onlySaved)}><Heart size={14} aria-hidden="true" />{saved.size}<span className="sr-only">{t.savedCount}</span></button>
              </div>
              <div className={styles.searchField} role="search" aria-label={t.search}><Search size={17} aria-hidden="true" /><input ref={searchInput} type="search" aria-label={t.search} placeholder={t.searchHint} value={query} onChange={(event) => setQuery(event.currentTarget.value)} />{query && <button type="button" aria-label={t.clearSearch} onClick={() => setQuery("")}><X size={15} aria-hidden="true" /></button>}</div>
            </div>
            <div className={styles.placeGrid}>
              {matches.map((place) => <article key={place.id} className={styles.placeCard}>
                <Landscape image={place.id} sizes="(max-width: 700px) 100vw, 50vw" />
                <span className={styles.placeTag}>{place.tag[locale]}</span>
                <div className={styles.savePosition}><LiquidGlass appearance="clear" radius={999} settings={settings} tint="rgba(20,39,46,0.28)"><button type="button" className={styles.saveButton} aria-pressed={saved.has(place.id)} aria-label={`${saved.has(place.id) ? t.removeBookmark : t.bookmark} ${locale === "zh" ? place.zh : place.name}`} onClick={() => toggleSaved(place.id)}><Heart size={19} fill={saved.has(place.id) ? "currentColor" : "none"} aria-hidden="true" /></button></LiquidGlass></div>
                <LiquidGlass appearance="clear" radius={25} settings={settings} tint="rgba(14,35,43,0.48)" className={styles.placeCaption} contentClassName={styles.captionInner}>
                  <div><p><MapPin size={12} aria-hidden="true" />ICELAND</p><h3>{locale === "zh" ? place.zh : place.name}</h3><span>{place.summary[locale]}</span></div>
                  <button type="button" aria-label={`${t.details} ${locale === "zh" ? place.zh : place.name}`} onClick={(event) => { detailTrigger.current = event.currentTarget; setSelected(place); }}><ArrowUpRight size={21} aria-hidden="true" /></button>
                </LiquidGlass>
              </article>)}
            </div>
            {matches.length === 0 && <div className={styles.empty}><Compass size={32} strokeWidth={1} aria-hidden="true" /><h3>{t.noResults}</h3><p>{t.noResultsHint}</p><button type="button" onClick={() => { setCategory("all"); setQuery(""); setOnlySaved(false); }}>{t.reset}<ArrowRight size={16} aria-hidden="true" /></button></div>}
          </section>

          <section className={styles.journal} aria-labelledby="journal-title">
            <div className={styles.journalImage}><Landscape image="coast" sizes="(max-width: 700px) 100vw, 50vw" /><span>{t.issue}</span><blockquote>{t.quote}</blockquote></div>
            <div className={styles.journalCopy}><p className={styles.chapter}>{t.journal}</p><Waves size={42} strokeWidth={1} aria-hidden="true" /><h2 id="journal-title">{t.journalTitle}</h2><p>{t.journalBody}</p><details><summary>{t.read}<ArrowDown size={16} aria-hidden="true" /></summary><p>{t.journalMore}</p></details></div>
          </section>
          <ShowcaseJourney locale={locale} material={material} onMaterialChange={setMaterial} refraction={refraction} onRefractionChange={setRefraction} />
          <section className={styles.materialNote} aria-labelledby="material-title">
            <p className={styles.chapter}>LIQUID GLASS / STYLEKIT</p><h2 id="material-title">{t.materialTitle}</h2><p>{t.materialBody}</p>
            <div className={styles.principles}>{t.principles.map(([title, body], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
            {(opaque || !supported) && <p className={styles.supportNote} role="status">{opaque ? t.opaque : t.fallback}</p>}
            <div className={styles.references}><span>{t.references}</span>{[["rdev", "https://github.com/rdev/liquid-glass-react"], ["glassy-liquid", "https://github.com/9und30/glassy-liquid"], ["shuding", "https://github.com/shuding/liquid-glass"]].map(([name, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={12} aria-hidden="true" /></a>)}</div>
          </section>
          <footer className={styles.footer}><div><span className={styles.footerBrand}>nord.</span><p>{t.footer}</p><small>{t.demo}</small></div><div><LocalizedLink href="/styles/liquid-glass">{t.guide}<ArrowUpRight size={15} aria-hidden="true" /></LocalizedLink><a href="https://github.com/AnxForever/stylekit/blob/dev/public/styles/liquid-glass/CREDITS.md" target="_blank" rel="noopener noreferrer">{t.credits}<ArrowUpRight size={15} aria-hidden="true" /></a></div></footer>
        </div>
        <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
      </main>
      <ModalContent className={styles.detailContent} onCloseAutoFocus={(event) => { event.preventDefault(); (detailTrigger.current?.isConnected ? detailTrigger.current : searchInput.current)?.focus(); }}>
        {selected && <><div className={styles.detailImage}><Landscape image={selected.id} sizes="640px" /></div><div className={styles.detailBody}><p className={styles.chapter}>{selected.tag[locale]}</p><ModalTitle className={styles.detailTitle}>{locale === "zh" ? selected.zh : selected.name}</ModalTitle><span className={styles.detailCoordinates}><MapPin size={13} aria-hidden="true" />{selected.location}</span><ModalDescription className={styles.detailDescription}>{selected.body[locale]}</ModalDescription><button type="button" className={styles.detailSave} onClick={() => toggleSaved(selected.id)}>{saved.has(selected.id) ? <Check size={17} aria-hidden="true" /> : <Heart size={17} aria-hidden="true" />}{saved.has(selected.id) ? t.remove : t.add}</button></div></>}
      </ModalContent>
    </Modal>
  );
}
