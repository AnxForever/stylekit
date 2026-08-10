import type { Metadata } from "next";
import Link from "next/link";

import { EditorialAuraFrame } from "@/components/effects/editorial-aura-frame";

import styles from "./editorial-aura-frame.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Editorial Aura Frame — Visual Study — StyleKit",
  description:
    "A reusable editorial frame prototype combining restrained border marks with a GLSL ambient aura.",
};

export default function EditorialAuraFramePage() {
  return (
    <main className={styles.root}>
      <nav className={styles.nav} aria-label="实验页导航">
        <Link href="/" className={styles.brand}>
          STYLEKIT<span>°</span>
        </Link>
        <span className={styles.navCenter}>VISUAL STUDY / 03</span>
        <Link href="/experiments/cinematic-stylekit" className={styles.navLink}>
          PREV. STUDY
        </Link>
      </nav>

      <section className={styles.hero}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>REUSABLE COMPONENT / WEBGL + GLSL</p>
          <h1>
            Editorial
            <br />
            <em>Aura Frame.</em>
          </h1>
          <p className={styles.lead}>
            一层克制的编辑型边框，配合低频流动的三色环境光。装饰存在，但内容仍然是主页的主角。
          </p>
          <div className={styles.meta}>
            <span>FRAGMENT SHADER</span>
            <span>THREE.JS</span>
            <span>PROFILE / 01</span>
          </div>
        </div>

        <EditorialAuraFrame
          className={styles.profileFrame}
          label="个人主页边框视觉原型"
          accent={["#6366f1", "#fb7185", "#2dd4bf"]}
          intensity="subtle"
        >
          <div className={styles.profileInner}>
            <div className={styles.frameHeader}>
              <span>STYLEKIT / PROFILE</span>
              <span>2026 — 01</span>
            </div>

            <div className={styles.profileIdentity}>
              <div className={styles.avatar} aria-hidden="true">
                SK
              </div>
              <div>
                <p className={styles.kicker}>CREATIVE SYSTEMS / 001</p>
                <h2>你的名字</h2>
                <p className={styles.muted}>收藏、作品与个人视觉档案。</p>
              </div>
            </div>

            <div className={styles.profileStats}>
              <div>
                <strong>24</strong>
                <span>收藏风格</span>
              </div>
              <div>
                <strong>08</strong>
                <span>公开作品</span>
              </div>
              <div>
                <strong>03</strong>
                <span>正在使用</span>
              </div>
            </div>

            <div className={styles.frameFooter}>
              <span>QUIET DETAILS / SLOW LIGHT</span>
              <span className={styles.liveDot}>LIVE</span>
            </div>
          </div>
        </EditorialAuraFrame>
      </section>

      <section className={styles.notes} aria-label="原型说明">
        <div>
          <span>01 / STRUCTURE</span>
          <p>四角裁切线、右侧刻度和底部标记来自编辑排版与档案卡片。</p>
        </div>
        <div>
          <span>02 / LIGHT</span>
          <p>GLSL 只负责非常慢的边缘光晕，颜色从页面已有的三色系统继承。</p>
        </div>
        <div>
          <span>03 / REUSE</span>
          <p>内容作为 children 传入，可复用到个人主页、作品卡、登录页或风格详情页。</p>
        </div>
      </section>
    </main>
  );
}
