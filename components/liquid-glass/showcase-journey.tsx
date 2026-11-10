"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ArrowUpRight, Check, Compass, Moon, MoveUpRight, Sun, Waves } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { LiquidGlass } from "./liquid-glass";
import styles from "./showcase-journey.module.css";

export interface ShowcaseJourneyProps {
  locale: "en" | "zh";
  material: "clear" | "frost";
  onMaterialChange: (value: "clear" | "frost") => void;
  refraction: number;
  onRefractionChange: (value: number) => void;
}

const copy = {
  en: {
    journey: "The journey",
    title: "The long way round.",
    intro: "Three unhurried days. A coastline worth getting a little lost on.",
    sample: "Sample route",
    routeLabel: "An illustrated route along Iceland’s south coast",
    day: "Day",
    days: [
      { name: "Follow the coast", distance: "Reykjavík → Vík", stops: [
        { time: "09:00", name: "Leave the city behind", detail: "Reykjavík · a slow start" },
        { time: "12:30", name: "A little closer to the falls", detail: "Skógafoss · take the scenic path" },
        { time: "17:00", name: "Where the sand turns black", detail: "Vík · the last light" },
      ] },
      { name: "Into the blue", distance: "Vík → Jökulsárlón", stops: [
        { time: "08:30", name: "Coffee, then the open road", detail: "Vík · a morning to linger" },
        { time: "12:00", name: "Walk beneath the mountains", detail: "Skaftafell · find a quiet trail" },
        { time: "16:00", name: "Watch the ice drift by", detail: "Jökulsárlón · stay a little longer" },
      ] },
      { name: "Take the quiet road", distance: "Jökulsárlón → Höfn", stops: [
        { time: "08:00", name: "Meet the morning light", detail: "Glacier lagoon · a moment of stillness" },
        { time: "11:30", name: "An empty stretch of coast", detail: "Stokksnes · sand, sea, and mountain" },
        { time: "15:00", name: "Something warm by the harbor", detail: "Höfn · no rush to leave" },
      ] },
    ],
    before: "Before you go",
    prep: ["Save a route for the road", "Check the weather", "Leave room for a detour"],
    essentials: "The essentials",
    essentialsTitle: "Travel a little lighter.",
    essentialsIntro: "A few thoughtful details. More room for everything else.",
    location: "Jökulsárlón, Iceland",
    photoNote: "A moment to take it all in.",
    quietPhotoNote: "Less on screen. More of the view.",
    controls: "Make it your own",
    material: "Surface",
    clear: "Clear",
    frost: "Frost",
    refraction: "Refraction",
    quiet: "Quiet mode",
    quietOff: "A little room for everything.",
    quietOn: "Just you and the landscape.",
    packing: "A well-packed day",
    packingDetail: "The small things make the difference.",
    packed: "packed",
    packingItems: ["Camera & a spare battery", "A warm extra layer", "Something waterproof", "A notebook, just in case"],
    allPacked: "Ready for whatever the day brings.",
    packProgress: "Packing progress",
    imageAlt: "Blue ice reflected in the still water of an Icelandic glacier lagoon",
  },
  zh: {
    journey: "沿途的时光",
    title: "把时间，留给沿途。",
    intro: "用三天，慢慢走过南岸。偶尔绕路，也是一种抵达。",
    sample: "行程示例",
    routeLabel: "冰岛南岸旅行路线示意",
    day: "第",
    days: [
      { name: "沿着海岸出发", distance: "雷克雅未克 → 维克", stops: [
        { time: "09:00", name: "把城市留在身后", detail: "雷克雅未克 · 不慌不忙地出发" },
        { time: "12:30", name: "走近瀑布与水雾", detail: "斯科加瀑布 · 绕一段风景里的路" },
        { time: "17:00", name: "在黑色沙滩等一束光", detail: "维克 · 把傍晚留给海边" },
      ] },
      { name: "走进冰蓝深处", distance: "维克 → 杰古沙龙", stops: [
        { time: "08:30", name: "先喝咖啡，再迎接远方", detail: "维克 · 值得慢一点的早晨" },
        { time: "12:00", name: "在群山之下走一走", detail: "斯卡夫塔山 · 寻一条安静小路" },
        { time: "16:00", name: "看浮冰缓缓经过", detail: "杰古沙龙冰河湖 · 再多待一会儿" },
      ] },
      { name: "去人少的地方", distance: "杰古沙龙 → 赫本", stops: [
        { time: "08:00", name: "迎接湖面的第一束光", detail: "冰河湖 · 给自己片刻安静" },
        { time: "11:30", name: "走过一段空旷海岸", detail: "斯托克角 · 沙滩、海与山" },
        { time: "15:00", name: "在港口吃点热乎的", detail: "赫本 · 不必急着告别" },
      ] },
    ],
    before: "出发前的小事",
    prep: ["保存一份沿途路线", "看一眼天气", "为临时绕路留点时间"],
    essentials: "旅途的小事",
    essentialsTitle: "把轻盈，一起带上。",
    essentialsIntro: "照顾好几个小细节，把更多空间留给风景。",
    location: "冰岛，杰古沙龙冰河湖",
    photoNote: "把眼前的片刻，好好收藏。",
    quietPhotoNote: "少一些打扰，多一些风景。",
    controls: "留一点自己的偏好",
    material: "材质",
    clear: "清透",
    frost: "磨砂",
    refraction: "折射",
    quiet: "安静模式",
    quietOff: "让每个小细节，各就其位。",
    quietOn: "此刻，只有你与风景。",
    packing: "带上这些，就很好",
    packingDetail: "一点小准备，让一路更从容。",
    packed: "已装好",
    packingItems: ["相机与备用电池", "一件保暖的外套", "能挡风雨的装备", "一本随手记录的小册子"],
    allPacked: "都准备好了，放心去遇见沿途。",
    packProgress: "行李准备进度",
    imageAlt: "冰岛冰河湖中的蓝色浮冰倒映在平静水面上",
  },
} as const;

const routePaths = [
  "M133 173 C155 189 197 199 253 200",
  "M253 200 C284 201 326 187 373 169",
  "M373 169 C389 161 403 151 417 136",
];

function JourneyMap({ day, label, sample }: { day: number; label: string; sample: string }) {
  const mapId = useId();
  return (
    <div className={styles.map}>
      <span className={styles.mapLabel}><Compass size={13} aria-hidden="true" />{sample}</span>
      <svg viewBox="0 0 520 260" role="img" aria-labelledby={mapId}>
        <title id={mapId}>{label}</title>
        <g className={styles.mapWater} fill="none" strokeWidth="0.7">
          <path d="M-35 165C46 104 109 113 186 89S340 32 555 83" />
          <path d="M-35 183C46 122 109 131 186 107S340 50 555 101" />
          <path d="M-35 201C46 140 109 149 186 125S340 68 555 119" />
          <path d="M-35 219C46 158 109 167 186 143S340 86 555 137" />
          <path d="M-35 237C46 176 109 185 186 161S340 104 555 155" />
          <path d="M-35 255C46 194 109 203 186 179S340 122 555 173" />
        </g>
        <path className={styles.island} d="M101 108 87 91 108 87 103 74 124 81 135 65 147 81 167 77 181 85 198 65 218 73 239 53 257 67 282 58 297 74 321 66 338 80 362 79 375 94 398 88 409 108 431 118 427 138 407 150 394 170 371 177 347 188 321 192 295 205 266 207 241 202 211 202 183 193 157 190 135 175 115 168 113 148 98 135 110 124Z" />
        <path className={styles.mapMountain} d="m230 137 15-20 12 12 16-25 20 33m39-4 14-16 16 21m-167-7 11-15 14 20" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        {routePaths.map((path, index) => <path key={path} d={path} fill="none" strokeWidth={index === day ? 3 : 1.6} strokeLinecap="round" className={index === day ? styles.activeRoute : styles.route} strokeDasharray={index === day ? undefined : "3 5"} />)}
        {[[133, 173], [253, 200], [373, 169], [417, 136]].map(([x, y], index) => (
          <g key={index}>
            {index === day + 1 && <circle cx={x} cy={y} r="12" className={styles.mapHalo} />}
            <circle cx={x} cy={y} r={index === day + 1 ? 4.5 : 3.5} className={styles.mapPin} />
          </g>
        ))}
        <g className={styles.mapPlace}>
          <text x="118" y="157">Reykjavík</text>
          <text x="247" y="224">Vík</text>
          <text x="329" y="153">Jökulsárlón</text>
          <text x="424" y="129">Höfn</text>
        </g>
      </svg>
      <span className={styles.mapCompass} aria-hidden="true">N<MoveUpRight size={15} /></span>
    </div>
  );
}

export function ShowcaseJourney({ locale, material, onMaterialChange, refraction, onRefractionChange }: ShowcaseJourneyProps) {
  const t = copy[locale];
  const [activeDay, setActiveDay] = useState(0);
  const [prepared, setPrepared] = useState([true, false, false]);
  const [packed, setPacked] = useState([true, true, false, false]);
  const [quiet, setQuiet] = useState(false);
  const rangeId = useId();
  const checklistId = useId();
  const clear = material === "clear";
  const day = t.days[activeDay];
  const packedCount = packed.filter(Boolean).length;
  const materialSettings = { refraction: clear ? refraction : 0, depth: 40, spread: 52, dispersion: clear ? 3 : 0, frost: clear ? 1.1 : 65, light: 72 };

  return (
    <div className={styles.root}>
      <section id="journey" className={styles.journey} aria-labelledby={checklistId + "-journey"}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}><span>03</span>{t.journey}</p>
          <h2 id={checklistId + "-journey"}>{t.title}</h2>
          <p className={styles.sectionIntro}>{t.intro}</p>
        </header>
        <div className={styles.journeyCard}>
          <div className={styles.days} role="group" aria-label={t.journey}>
            {t.days.map((item, index) => (
              <button key={item.name} type="button" aria-pressed={activeDay === index} onClick={() => setActiveDay(index)}>
                <span>{locale === "zh" ? `第 ${index + 1} 天` : `Day ${index + 1}`}</span>
                <strong>{item.name}</strong>
              </button>
            ))}
          </div>
          <JourneyMap day={activeDay} label={t.routeLabel} sample={t.sample} />
          <div className={styles.dayHeading} aria-live="polite">
            <h3>{day.name}</h3>
            <span>{day.distance}</span>
          </div>
          <ol className={styles.timeline}>
            {day.stops.map((stop, index) => (
              <li key={stop.time}>
                <time dateTime={stop.time}>{stop.time}</time>
                <span className={styles.timelineMark} aria-hidden="true">{index === day.stops.length - 1 ? <Waves size={13} /> : <span />}</span>
                <div><h4>{stop.name}</h4><p>{stop.detail}</p></div>
              </li>
            ))}
          </ol>
          <div className={styles.preparation}>
            <h3>{t.before}<Check size={15} aria-hidden="true" /></h3>
            {t.prep.map((item, index) => (
              <div key={item} className={styles.checkRow}>
                <Checkbox id={checklistId + "-prep-" + index} className={styles.checkbox} checked={prepared[index]} onCheckedChange={(checked) => setPrepared((previous) => previous.map((value, itemIndex) => itemIndex === index ? checked === true : value))} />
                <label htmlFor={checklistId + "-prep-" + index} data-checked={prepared[index]}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="essentials" className={styles.essentials} aria-labelledby={checklistId + "-essentials"}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}><span>04</span>{t.essentials}</p>
          <h2 id={checklistId + "-essentials"}>{t.essentialsTitle}</h2>
          <p className={styles.sectionIntro}>{t.essentialsIntro}</p>
        </header>
        <div className={styles.controlScene} data-quiet={quiet}>
          <Image src="/styles/liquid-glass/glacier.webp" alt={t.imageAlt} fill sizes="(max-width: 900px) 100vw, 560px" className={styles.photograph} unoptimized />
          <div className={styles.sceneShade} aria-hidden="true" />
          <div className={styles.sceneCaption}><span>{t.location}</span><ArrowUpRight size={17} aria-hidden="true" /></div>
          <p className={styles.sceneNote}>{quiet ? t.quietPhotoNote : t.photoNote}</p>
          <LiquidGlass appearance="clear" radius={28} settings={materialSettings} tint={clear ? "rgba(12,36,45,0.37)" : "rgba(28,51,61,0.56)"} className={styles.controlCenter} contentClassName={styles.controlContent}>
            <div className={styles.controlTitle}><Compass size={17} aria-hidden="true" /><span>{t.controls}</span></div>
            <div className={styles.materialRow}>
              <span>{t.material}</span>
              <div className={styles.segmented} role="group" aria-label={t.material}>
                <button type="button" aria-pressed={clear} onClick={() => onMaterialChange("clear")}>{t.clear}</button>
                <button type="button" aria-pressed={!clear} onClick={() => onMaterialChange("frost")}>{t.frost}</button>
              </div>
            </div>
            <div className={styles.rangeControl} data-disabled={!clear}>
              <label htmlFor={rangeId}>{t.refraction}<output htmlFor={rangeId}>{refraction}%</output></label>
              <input id={rangeId} type="range" min={0} max={100} value={refraction} disabled={!clear} onChange={(event) => onRefractionChange(event.currentTarget.valueAsNumber)} />
            </div>
            <div className={styles.quietControl}>
              <span className={styles.quietIcon}>{quiet ? <Moon size={19} aria-hidden="true" /> : <Sun size={19} aria-hidden="true" />}</span>
              <div><span>{t.quiet}</span><p role="status">{quiet ? t.quietOn : t.quietOff}</p></div>
              <button type="button" role="switch" aria-checked={quiet} aria-label={t.quiet} className={styles.switch} onClick={() => setQuiet((value) => !value)}><span /></button>
            </div>
          </LiquidGlass>
        </div>

        <div className={styles.packing}>
          <div className={styles.packingHeading}>
            <div><h3>{t.packing}</h3><p>{t.packingDetail}</p></div>
            <span className={styles.packedCount} aria-live="polite">{packedCount}<span> / {packed.length}</span></span>
          </div>
          <div className={styles.progress} role="progressbar" aria-label={t.packProgress} aria-valuenow={packedCount} aria-valuemin={0} aria-valuemax={packed.length}>
            <span style={{ width: `${packedCount / packed.length * 100}%` }} />
          </div>
          {t.packingItems.map((item, index) => (
            <div key={item} className={styles.checkRow}>
              <Checkbox id={checklistId + "-pack-" + index} className={styles.checkbox} checked={packed[index]} onCheckedChange={(checked) => setPacked((previous) => previous.map((value, itemIndex) => itemIndex === index ? checked === true : value))} />
              <label htmlFor={checklistId + "-pack-" + index} data-checked={packed[index]}>{item}</label>
            </div>
          ))}
          {packedCount === packed.length && <p className={styles.ready} role="status"><Check size={14} aria-hidden="true" />{t.allPacked}</p>}
        </div>
      </section>
    </div>
  );
}
