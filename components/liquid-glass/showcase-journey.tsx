"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Check, Circle, Contrast, MousePointer2, Navigation2, PanelsTopLeft, RectangleHorizontal, Shapes, SlidersHorizontal, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FluidGlass, FluidSegmented } from "./fluid-glass";
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
    forms: "Material forms",
    title: "One material. Different forms.",
    intro: "A circle, a capsule, a panel. Press the surface and feel the same soft response.",
    shapeLabel: "Glass shape",
    circle: "Circle",
    capsule: "Capsule",
    panel: "Panel",
    press: "Press the glass",
    dragLabel: "Press or move the glass with arrow keys. Home resets its position.",
    shapeHint: "Press, then release. Watch the edge settle.",
    checklist: "The material checklist",
    checks: ["Rounded edges", "Clear content", "Elastic feedback"],
    checkProgress: "Material checklist progress",
    allChecked: "Every detail, accounted for.",
    controls: "Material controls",
    controlsTitle: "Give the light a little direction.",
    controlsIntro: "Change the surface, adjust its refraction, and watch the background through the glass.",
    preview: "A background for refraction",
    photoNote: "The view changes through the surface.",
    contrastPhotoNote: "Sharper contrast. Clearer refraction.",
    controlCenter: "The control surface",
    material: "Material",
    clear: "Clear",
    frost: "Frost",
    refraction: "Refraction",
    contrast: "Enhance background contrast",
    contrastOff: "Original contrast and color.",
    contrastOn: "Higher contrast and richer color.",
    collection: "A small glass collection",
    collectionDetail: "Choose the components you want to keep.",
    collectionItems: ["Navigation", "Button", "Card", "Slider"],
    collectionProgress: "Component collection progress",
    allCollected: "Your glass collection is complete.",
    imageAlt: "Blue glacier ice and water behind the glass controls",
  },
  zh: {
    forms: "材质的形态",
    title: "同一种材质，不同的形态。",
    intro: "圆形、胶囊、面板。按压表面，感受同样柔软的回应。",
    shapeLabel: "玻璃形态",
    circle: "圆形",
    capsule: "胶囊",
    panel: "面板",
    press: "按压玻璃",
    dragLabel: "按压玻璃，或用方向键移动。按 Home 键复位。",
    shapeHint: "按下，再松开。看边缘轻轻回弹。",
    checklist: "材质的小细节",
    checks: ["圆润边缘", "清晰内容", "弹性反馈"],
    checkProgress: "材质核对进度",
    allChecked: "每一处细节，都刚刚好。",
    controls: "材质控制",
    controlsTitle: "给光线，一点方向。",
    controlsIntro: "切换表面，调整折射，看背景如何穿过玻璃。",
    preview: "用来观察折射的背景",
    photoNote: "风景，经过表面而改变。",
    contrastPhotoNote: "对比更鲜明，折射更清楚。",
    controlCenter: "玻璃控制面板",
    material: "材质",
    clear: "清透",
    frost: "磨砂",
    refraction: "折射",
    contrast: "增强背景对比",
    contrastOff: "保留原本的对比与色彩。",
    contrastOn: "对比更鲜明，色彩更饱满。",
    collection: "收藏几件玻璃组件",
    collectionDetail: "选出你想留下的组件。",
    collectionItems: ["导航", "按钮", "卡片", "滑块"],
    collectionProgress: "组件收藏进度",
    allCollected: "喜欢的玻璃组件，都在这里了。",
    imageAlt: "玻璃控制面板后方的蓝色浮冰与水面",
  },
} as const;

const shapePresets = {
  circle: { radius: 999, icon: Circle, className: styles.circleShape },
  capsule: { radius: 999, icon: RectangleHorizontal, className: styles.capsuleShape },
  panel: { radius: 30, icon: PanelsTopLeft, className: styles.panelShape },
} as const;

type GlassShape = keyof typeof shapePresets;

const collectionIcons = [Navigation2, MousePointer2, PanelsTopLeft, SlidersHorizontal] as const;

export function ShowcaseJourney({ locale, material, onMaterialChange, refraction, onRefractionChange }: ShowcaseJourneyProps) {
  const t = copy[locale];
  const [shape, setShape] = useState<GlassShape>("circle");
  const [checked, setChecked] = useState([true, true, false]);
  const [collected, setCollected] = useState([true, false, true, false]);
  const [contrast, setContrast] = useState(false);
  const rangeId = useId();
  const checklistId = useId();
  const clear = material === "clear";
  const checkedCount = checked.filter(Boolean).length;
  const collectedCount = collected.filter(Boolean).length;
  const preset = shapePresets[shape];
  const ShapeIcon = preset.icon;
  const materialSettings = { refraction: clear ? refraction : 0, depth: 40, spread: 52, dispersion: 0, frost: clear ? 1.3 : 12, light: 72 };
  const panelTint = clear ? "rgba(12,43,62,0.20)" : "rgba(12,43,62,0.34)";

  function changeShape(value: string) {
    if (value === "circle" || value === "capsule" || value === "panel") setShape(value);
  }

  function changeMaterial(value: string) {
    if (value === "clear" || value === "frost") onMaterialChange(value);
  }

  return (
    <div className={styles.root}>
      <section id="journey" className={styles.forms} aria-labelledby={checklistId + "-forms"}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}><span>03</span>{t.forms}</p>
          <h2 id={checklistId + "-forms"}>{t.title}</h2>
          <p className={styles.sectionIntro}>{t.intro}</p>
        </header>

        <FluidGlass appearance="clear" radius={32} settings={materialSettings} tint={panelTint} className={styles.materialPanel} contentClassName={styles.materialContent}>
          <div className={styles.shapeSelector}>
            <FluidSegmented options={[{ value: "circle", label: t.circle }, { value: "capsule", label: t.capsule }, { value: "panel", label: t.panel }]} value={shape} onValueChange={changeShape} ariaLabel={t.shapeLabel} settings={materialSettings} className={styles.shapeSegmented} />
          </div>
          <div className={styles.shapeStage} data-fluid-bounds="">
            <div className={styles.opticalField} aria-hidden="true" />
            <div className={styles.stageMeta} aria-hidden="true"><span>LIQUID GLASS</span><span>0{shape === "circle" ? 1 : shape === "capsule" ? 2 : 3} / 03</span></div>
            <FluidGlass key={shape} appearance="clear" radius={preset.radius} settings={materialSettings} tint="rgba(190,235,250,0.13)" className={[styles.specimen, preset.className].join(" ")} contentClassName={styles.shapeContent} draggable dragLabel={t.dragLabel}>
              <ShapeIcon size={27} strokeWidth={1.25} aria-hidden="true" />
              <span>{t[shape]}</span>
              <small>{t.press}</small>
            </FluidGlass>
            <p className={styles.shapeHint}>{t.shapeHint}</p>
          </div>
          <div className={styles.checklist} data-fluid-control="">
            <div className={styles.listHeading}>
              <h3><Shapes size={16} aria-hidden="true" />{t.checklist}</h3>
              <span className={styles.smallCount} aria-live="polite">{checkedCount}<span> / {checked.length}</span></span>
            </div>
            <div className={styles.progress} role="progressbar" aria-label={t.checkProgress} aria-valuenow={checkedCount} aria-valuemin={0} aria-valuemax={checked.length}>
              <span style={{ width: checkedCount / checked.length * 100 + "%" }} />
            </div>
            {t.checks.map((item, index) => (
              <div key={item} className={styles.checkRow}>
                <Checkbox id={checklistId + "-check-" + index} className={styles.checkbox} checked={checked[index]} onCheckedChange={(value) => setChecked((previous) => previous.map((entry, entryIndex) => entryIndex === index ? value === true : entry))} />
                <label htmlFor={checklistId + "-check-" + index} data-checked={checked[index]}>{item}</label>
                <span className={styles.rowNumber} aria-hidden="true">0{index + 1}</span>
              </div>
            ))}
            {checkedCount === checked.length && <p className={styles.ready} role="status"><Check size={14} aria-hidden="true" />{t.allChecked}</p>}
          </div>
        </FluidGlass>
      </section>

      <section id="essentials" className={styles.essentials} aria-labelledby={checklistId + "-controls"}>
        <header className={styles.sectionHeading}>
          <p className={styles.eyebrow}><span>04</span>{t.controls}</p>
          <h2 id={checklistId + "-controls"}>{t.controlsTitle}</h2>
          <p className={styles.sectionIntro}>{t.controlsIntro}</p>
        </header>
        <div className={styles.controlEnvironment} data-contrast={contrast}>
          <FluidGlass appearance="clear" radius={32} settings={materialSettings} tint={panelTint} className={styles.controlScene} contentClassName={styles.sceneContent}>
            <Image src="/styles/liquid-glass/glacier.webp" alt={t.imageAlt} fill sizes="(max-width: 800px) 100vw, 560px" className={styles.photograph} unoptimized />
            <div className={styles.sceneShade} aria-hidden="true" />
            <div className={styles.sceneStripes} aria-hidden="true" />
            <div className={styles.sceneCaption}><span>{t.preview}</span><Sparkles size={16} aria-hidden="true" /></div>
            <p className={styles.sceneNote} aria-live="polite">{contrast ? t.contrastPhotoNote : t.photoNote}</p>
            <FluidGlass appearance="clear" radius={26} settings={materialSettings} tint={clear ? "rgba(8,30,47,0.34)" : "rgba(8,30,47,0.44)"} className={styles.controlCenter} contentClassName={styles.controlContent}>
              <div className={styles.controlTitle}><SlidersHorizontal size={17} aria-hidden="true" /><span>{t.controlCenter}</span></div>
              <div className={styles.materialRow}>
                <span>{t.material}</span>
                <FluidSegmented options={[{ value: "clear", label: t.clear }, { value: "frost", label: t.frost }]} value={material} onValueChange={changeMaterial} ariaLabel={t.material} settings={materialSettings} className={styles.materialSegmented} />
              </div>
              <div className={styles.rangeControl} data-disabled={!clear} data-fluid-control="">
                <label htmlFor={rangeId}>{t.refraction}<output htmlFor={rangeId}>{refraction}%</output></label>
                <input id={rangeId} type="range" min={0} max={100} value={refraction} disabled={!clear} onChange={(event) => onRefractionChange(event.currentTarget.valueAsNumber)} />
              </div>
              <div className={styles.contrastControl} data-fluid-control="">
                <span className={styles.contrastIcon}><Contrast size={18} aria-hidden="true" /></span>
                <div><span>{t.contrast}</span><p role="status">{contrast ? t.contrastOn : t.contrastOff}</p></div>
                <button type="button" role="switch" aria-checked={contrast} aria-label={t.contrast} className={styles.switch} onClick={() => setContrast((value) => !value)}>
                  <span className={styles.switchTrack}>
                    <span className={styles.switchKnob}><FluidGlass appearance="clear" radius={999} settings={materialSettings} tint="rgba(219,248,255,0.26)" className={styles.knobGlass} /></span>
                  </span>
                </button>
              </div>
            </FluidGlass>
          </FluidGlass>
        </div>

        <FluidGlass appearance="clear" radius={28} settings={materialSettings} tint={panelTint} className={styles.collectionPanel} contentClassName={styles.collectionContent}>
          <div className={styles.listHeading}>
            <div><h3>{t.collection}</h3><p>{t.collectionDetail}</p></div>
            <span className={styles.collectionCount} aria-live="polite">{collectedCount}<span> / {collected.length}</span></span>
          </div>
          <div className={styles.progress} role="progressbar" aria-label={t.collectionProgress} aria-valuenow={collectedCount} aria-valuemin={0} aria-valuemax={collected.length}>
            <span style={{ width: collectedCount / collected.length * 100 + "%" }} />
          </div>
          {t.collectionItems.map((item, index) => {
            const ItemIcon = collectionIcons[index];
            return (
              <div key={item} className={styles.checkRow} data-fluid-control="">
                <Checkbox id={checklistId + "-collect-" + index} className={styles.checkbox} checked={collected[index]} onCheckedChange={(value) => setCollected((previous) => previous.map((entry, entryIndex) => entryIndex === index ? value === true : entry))} />
                <label htmlFor={checklistId + "-collect-" + index} data-checked={collected[index]}>{item}</label>
                {ItemIcon && <ItemIcon size={16} className={styles.collectionIcon} aria-hidden="true" />}
              </div>
            );
          })}
          {collectedCount === collected.length && <p className={styles.ready} role="status"><Check size={14} aria-hidden="true" />{t.allCollected}</p>}
        </FluidGlass>
      </section>
    </div>
  );
}
