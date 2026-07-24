import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./minimal-zine-poster.module.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Before Form — Minimal Zine Poster Experiment",
  description:
    "A digital zine experience built around one GPT Image 2 poster generated with the Minimal Zine Poster skill.",
};

const POSTER = "/experiments/minimal-zine-poster/before-form.webp";

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 16 16 4M7 4h9v9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function MinimalZinePosterPage() {
  return (
    <main className={styles.root}>
      <nav className={styles.nav} aria-label="实验页导航">
        <Link href="/" className={styles.brand}>STYLEKIT°</Link>
        <span>VISUAL STUDY / 02</span>
        <div className={styles.navRight}>
          <span>SHANGHAI · 2026</span>
          <Link href="/experiments/cinematic-stylekit">PREV. STUDY</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroTitle}>
          <p>ONE IMAGE / ONE INTERFACE</p>
          <h1>
            Before
            <br />
            <em>Form.</em>
          </h1>
          <p className={styles.heroChinese}>成形之前，<br />让想法先安静一会儿。</p>
        </div>

        <figure className={styles.posterFigure}>
          <div className={styles.posterMount}>
            <Image
              src={POSTER}
              alt="旧纸张上的极简 zine 海报，一扇小窗与钴蓝色块位于左下方"
              fill
              priority
              sizes="(max-width: 700px) 82vw, 38vw"
              className={styles.posterImage}
            />
          </div>
          <figcaption>
            <span>PLATE 01</span>
            <span>1152 × 1920 PX</span>
          </figcaption>
        </figure>

        <aside className={styles.heroNotes}>
          <div>
            <span>MODE</span>
            <p>Standard</p>
          </div>
          <div>
            <span>RECIPE</span>
            <p>Lower-left float<br />Torn clipping<br />Cobalt anchor</p>
          </div>
          <div>
            <span>IMAGE MODEL</span>
            <p>GPT Image 2</p>
          </div>
        </aside>

        <div className={styles.scrollCue}>
          <span>SCROLL / READ THE PAPER</span><i />
        </div>
      </section>

      <section className={styles.blueInterlude}>
        <p>THE BLUE WINDOW DOESN&apos;T EXPLAIN.</p>
        <h2>它只是让空白<br />有了方向。</h2>
        <span>01 / ATTENTION GEOMETRY</span>
      </section>

      <section className={styles.readingSection}>
        <div className={styles.stickyPoster}>
          <div className={styles.posterMount}>
            <Image
              src={POSTER}
              alt="Before Form 极简 zine 海报全图"
              fill
              sizes="(max-width: 800px) 88vw, 37vw"
              className={styles.posterImage}
            />
          </div>
        </div>

        <div className={styles.readingCopy}>
          <header>
            <span>READING / 01—03</span>
            <h2>一张图片，<br />如何成为网站的主体？</h2>
            <p>页面没有复制海报上的元素，而是继承了它的注意力分配：大量空白、一处钴蓝、细小索引和旧纸张的温度。</p>
          </header>

          <article>
            <span>01</span>
            <h3>空白也是材料</h3>
            <p>海报把接近九成的画面留给纸张。网站也不急着填满首屏；距离承担节奏，内容通过位置获得重量。</p>
          </article>
          <article>
            <span>02</span>
            <h3>只留一个高饱和锚点</h3>
            <p>钴蓝没有被扩散成渐变背景。它只在需要集中注意力的地方出现，因此每一次蓝色都像一个明确的编辑决定。</p>
          </article>
          <article>
            <span>03</span>
            <h3>把图像当作原稿</h3>
            <p>海报负责情绪和物理质感；导航、正文与交互仍然使用真实 HTML。内容可选择、可访问，也能自然适应手机。</p>
          </article>
        </div>
      </section>

      <section className={styles.fragments}>
        <header>
          <span>DETAILS / THE SAME SOURCE</span>
          <h2>放大之后，<br />纸张开始说话。</h2>
        </header>
        <div className={styles.fragmentGrid}>
          <figure className={styles.fragmentOne}>
            <Image src={POSTER} alt="海报纸张纹理局部" fill sizes="50vw" className={styles.fragmentImageOne} />
            <figcaption>FIBER / 400%</figcaption>
          </figure>
          <figure className={styles.fragmentTwo}>
            <Image src={POSTER} alt="海报钴蓝窗户局部" fill sizes="50vw" className={styles.fragmentImageTwo} />
            <figcaption>ANCHOR / COBALT</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.promptSection}>
        <div className={styles.promptIndex}>PROMPT / EXCERPT</div>
        <blockquote>
          “Keep 82%–88% of the canvas as quiet plain paper. Place one compact visual cluster in the lower-left quadrant…”
        </blockquote>
        <p>图片不是在最后随便补上的装饰。构图里的留白、锚点位置与颜色比例，从生成之前就已经为页面定义好了。</p>
      </section>

      <footer className={styles.footer}>
        <p>WHAT SHOULD THE NEXT IMAGE<br />TEACH THE NEXT PAGE?</p>
        <h2>先生成一种<br /><em>可以被继承的秩序。</em></h2>
        <div className={styles.footerActions}>
          <Link href="/styles" className={styles.primaryAction}>浏览 StyleKit 风格 <Arrow /></Link>
          <Link href="/experiments/cinematic-stylekit" className={styles.secondaryAction}>查看四种视觉答案</Link>
        </div>
        <div className={styles.footerMeta}>
          <Link href="/" className={styles.brand}>STYLEKIT°</Link>
          <span>MINIMAL ZINE POSTER · STUDY 02</span>
          <span>2026</span>
        </div>
      </footer>
    </main>
  );
}
