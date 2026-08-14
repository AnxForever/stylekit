import type { Metadata } from "next";
import Link from "next/link";

import { ConstellationField, ShaderField } from "@/components/effects";

import styles from "./webgl-lab.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "WebGL Instrument Lab — StyleKit",
  description: "可复用的 WebGL、GLSL 与 Three.js 组件实验室。",
};

function SignalLabel({ children }: { children: React.ReactNode }) {
  return <span className={styles.signalLabel}>{children}</span>;
}

export default function WebglLabPage() {
  return (
    <main className={styles.root}>
      <nav className={styles.nav} aria-label="实验页导航">
        <Link href="/" className={styles.brand}>
          STYLEKIT<span>°</span>
        </Link>
        <span className={styles.navCenter}>VISUAL STUDY / 04</span>
        <Link href="/experiments/editorial-aura-frame" className={styles.navLink}>
          PREV. STUDY
        </Link>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <SignalLabel>WEBGL / GLSL / THREE.JS</SignalLabel>
          <h1>
            Signal
            <br />
            <em>instruments.</em>
          </h1>
          <p className={styles.lead}>
            两个可以直接嵌入页面的视觉组件：一个把噪声、色场和指针变成缓慢的环境信号，另一个把点云变成轻量的数字星图。
          </p>
          <div className={styles.metaRow}>
            <span>SHADER FIELD</span>
            <span>POINT SPRITE</span>
            <span>NO POST FX</span>
          </div>
        </div>

        <ShaderField
          className={styles.heroField}
          accent={["#ff6b6b", "#0a0a0a", "#00d9ff"]}
          intensity="bold"
          label="首页信号场 GLSL 视觉"
        >
          <div className={styles.heroOverlay}>
            <div>
              <span className={styles.overline}>LIVE FIELD / 0.55×</span>
              <strong>Ambient signal</strong>
            </div>
            <span className={styles.coordinates}>31°14′N / 121°29′E</span>
          </div>
        </ShaderField>
      </section>

      <section className={styles.instrumentSection} aria-labelledby="instrument-title">
        <div className={styles.sectionIntro}>
          <SignalLabel>COMPONENT NOTES</SignalLabel>
          <h2 id="instrument-title">Small primitives, clear jobs.</h2>
          <p>
            组件把画布当作装饰层，内容仍然由普通 HTML 承载。离屏、隐藏标签页和减少动效时会主动停帧，WebGL 不可用时保留静态背景。
          </p>
        </div>

        <div className={styles.instrumentGrid}>
          <article className={styles.instrumentCard}>
            <div className={styles.cardHeader}>
              <SignalLabel>01 / FRAGMENT</SignalLabel>
              <span>SHADER FIELD</span>
            </div>
            <ShaderField
              className={styles.cardField}
              accent={["#ff6b6b", "#0a0a0a", "#00d9ff"]}
              speed="medium"
              intensity="medium"
              label="片段着色器场演示"
            />
            <div className={styles.cardCopy}>
              <h3>Noise → flow → color</h3>
              <p>单个全屏平面，5 层 fbm 噪声与三色混合，适合做 hero、卡片底和登录页氛围。</p>
            </div>
          </article>

          <article className={styles.instrumentCard}>
            <div className={styles.cardHeader}>
              <SignalLabel>02 / VERTEX</SignalLabel>
              <span>CONSTELLATION</span>
            </div>
            <ConstellationField
              className={styles.cardField}
              color="#ccff00"
              density="dense"
              pointSize={2.4}
              label="点精灵星图演示"
            />
            <div className={styles.cardCopy}>
              <h3>Points → depth → drift</h3>
              <p>一个 Points draw call，点精灵由 GLSL 控制大小与闪烁，适合做数据状态、档案和作品集背景。</p>
            </div>
          </article>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>STYLEKIT / EFFECTS</span>
        <span>WEBGL CONTEXTS ARE OPTIONAL</span>
      </footer>
    </main>
  );
}
