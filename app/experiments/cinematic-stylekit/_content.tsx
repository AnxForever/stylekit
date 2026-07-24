"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import styles from "./cinematic-stylekit.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DIRECTIONS = [
  {
    no: "01",
    slug: "neo-brutalist",
    name: "Neo-Brutalist",
    cn: "新粗野主义",
    tone: "neo",
    image: "/experiments/cinematic-stylekit/neo-brutalist.webp",
    alt: "酸性色块与硬闪光中的折纸光标雕塑",
    note: "把协作的能量变成硬边、撞色和毫不犹豫的行动感。",
    tokens: ["#FF006E", "#CCFF00", "3PX BORDER", "8PX OFFSET"],
  },
  {
    no: "02",
    slug: "editorial",
    name: "Editorial",
    cn: "编辑风格",
    tone: "editorial",
    image: "/experiments/cinematic-stylekit/editorial.webp",
    alt: "暖白纸张布景中的极简折纸光标雕塑",
    note: "用留白、尺度与克制的排版，把复杂工具讲得安静而可信。",
    tokens: ["#F9F8F6", "#1C1C1C", "SERIF DISPLAY", "HAIRLINE"],
  },
  {
    no: "03",
    slug: "glassmorphism",
    name: "Glassmorphism",
    cn: "玻璃拟态",
    tone: "glass",
    image: "/experiments/cinematic-stylekit/glassmorphism.webp",
    alt: "深蓝夜景与蓝色光井中的透明亚克力光标雕塑",
    note: "让玻璃借用场景的光，而不是依赖廉价的紫粉渐变。",
    tokens: ["#0B1322", "#E4B863", "BLUR 48PX", "SAT 180%"],
  },
  {
    no: "04",
    slug: "japanese-fresh",
    name: "Japanese Fresh",
    cn: "日系清新",
    tone: "japanese",
    image: "/experiments/cinematic-stylekit/japanese-fresh.webp",
    alt: "晨光、和纸与浅木材构成的清新折纸光标雕塑",
    note: "用间、轻盈和不完全对称，给创作过程留下呼吸。",
    tokens: ["#FAFAF8", "#64B5F6", "MA SPACE", "WABI-SABI"],
  },
] as const;

const WORKFLOW = [
  ["01", "定方向", "先从 StyleKit 选择可执行的视觉语法，而不是先写一句“做得高级”。"],
  ["02", "写图像任务", "明确主体、材质、光线、构图和给 HTML 文案预留的负空间。"],
  ["03", "生成资产", "GPT Image 2 只生成没有文字、Logo 和按钮的视觉素材。"],
  ["04", "编码界面", "排版、按钮、响应式与动效回到真实 HTML/CSS 中完成。"],
] as const;

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" fill="none">
      <path d="M4 14 14 4M6 4h8v8" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

function DemoHero({ direction }: { direction: (typeof DIRECTIONS)[number] }) {
  return (
    <div className={`${styles.demoHero} ${styles[direction.tone]}`}>
      <div className={styles.demoNav}>
        <span className={styles.demoBrand}>MORROW°</span>
        <span className={styles.demoNavText}>AI CREATIVE ROOM</span>
        <span className={styles.demoMenu}>MENU</span>
      </div>
      <div className={styles.demoCopy}>
        <p className={styles.demoKicker}>IDEAS MOVE BETTER TOGETHER</p>
        <h3>把灵感，变成可见的下一步。</h3>
        <p className={styles.demoBody}>
          Morrow 让团队在同一个创作空间里思考、生成、批注，并把模糊的想法推进成清晰的方向。
        </p>
        <div className={styles.demoActions}>
          <a href="#workflow">开启一个创作室</a>
          <a href="#workflow">查看协作方式</a>
        </div>
      </div>
      <div className={styles.demoMedia}>
        <Image
          src={direction.image}
          alt={direction.alt}
          fill
          sizes="(max-width: 800px) 92vw, 52vw"
          className={styles.demoImage}
        />
      </div>
      <div className={styles.demoMeta}>
        <span>LIVE BRIEF / 01</span>
        <span>4 MIN READ</span>
      </div>
    </div>
  );
}

export function CinematicStylekitContent() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-nav]", { autoAlpha: 0, y: -14, duration: 0.6 })
          .from("[data-intro]", { autoAlpha: 0, y: 34, duration: 0.9, stagger: 0.1 }, 0.08)
          .from(
            "[data-specimen]",
            { autoAlpha: 0, y: 28, rotate: -1.5, duration: 0.75, stagger: 0.09 },
            0.24,
          );

        gsap.utils.toArray<HTMLElement>("[data-direction]").forEach((section) => {
          gsap.from(section.querySelectorAll("[data-reveal]"), {
            autoAlpha: 0,
            y: 36,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          });
        });

        gsap.from("[data-workflow-step]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-workflow]", start: "top 76%", once: true },
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-nav], [data-intro], [data-specimen], [data-reveal], [data-workflow-step]", {
          clearProps: "all",
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root} className={styles.root}>
      <nav className={styles.nav} aria-label="实验页导航" data-nav>
        <Link href="/" className={styles.wordmark} aria-label="返回 StyleKit 首页">
          STYLEKIT<span>°</span>
        </Link>
        <div className={styles.navCenter}>EXPERIMENT / 01</div>
        <div className={styles.navLinks}>
          <a href="#brief">Brief</a>
          <a href="#directions">四种答案</a>
          <Link href="/styles">风格目录</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-intro>
            ONE BRIEF / FOUR VISUAL DIRECTIONS
          </p>
          <h1 data-intro>
            同一份 Brief，
            <br />
            <em>四种视觉答案。</em>
          </h1>
          <p className={styles.heroLead} data-intro>
            StyleKit 不是替你挑一张“好看”的图。它把模糊的审美词，变成图片、排版、色彩和动效都能共同执行的设计方向。
          </p>
          <div className={styles.heroActions} data-intro>
            <a href="#directions" className={styles.primaryLink}>
              看四种答案 <Arrow />
            </a>
            <Link href="/styles" className={styles.secondaryLink}>
              浏览 100+ 风格
            </Link>
          </div>
        </div>

        <div className={styles.specimenGrid} aria-label="四种 StyleKit 风格预览">
          {DIRECTIONS.map((direction) => (
            <Link
              href={`/styles/${direction.slug}`}
              className={styles.specimenCard}
              key={direction.slug}
              data-specimen
            >
              <div className={styles.specimenPreview}>
                <StyleCoverPreview styleSlug={direction.slug} interactive={false} />
              </div>
              <div className={styles.specimenLabel}>
                <span>{direction.no}</span>
                <span>{direction.name}</span>
                <Arrow />
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.heroIndex}>SK / VISUAL SYSTEMS / 2026</div>
      </section>

      <section id="brief" className={styles.briefSection}>
        <div className={styles.sectionLabel}>
          <span>00</span>
          <span>THE CONSTANT / 不变的内容</span>
        </div>
        <div className={styles.briefGrid}>
          <div>
            <p className={styles.briefOverline}>PRODUCT BRIEF</p>
            <h2>先固定问题，<br />再比较风格。</h2>
          </div>
          <div className={styles.briefCard}>
            <p className={styles.briefQuote}>
              “为一个 AI 创意协作产品设计落地页首屏。它帮助团队把想法变成清晰、可评审的视觉方向。”
            </p>
            <dl className={styles.constraints}>
              <div><dt>受众</dt><dd>设计师与创意团队</dd></div>
              <div><dt>目标</dt><dd>建立理解，推动试用</dd></div>
              <div><dt>内容</dt><dd>同一标题、正文与操作</dd></div>
              <div><dt>资产</dt><dd>同一折纸光标主体</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="directions" className={styles.directionsIntro}>
        <div className={styles.sectionLabel}>
          <span>01—04</span>
          <span>THE VARIABLES / 改变的视觉语法</span>
        </div>
        <div className={styles.directionsTitle}>
          <h2>内容没有变。<br /><em>感受完全变了。</em></h2>
          <p>以下每个首屏使用同一份文案和同一个主体。变化来自真实的 StyleKit 规则，以及为版式定向生成的视觉资产。</p>
        </div>
      </section>

      {DIRECTIONS.map((direction) => (
        <section className={styles.direction} key={direction.slug} data-direction>
          <header className={styles.directionHeader} data-reveal>
            <div className={styles.directionNumber}>{direction.no}</div>
            <div>
              <p>{direction.cn}</p>
              <h2>{direction.name}</h2>
            </div>
            <p className={styles.directionNote}>{direction.note}</p>
            <Link href={`/styles/${direction.slug}`} className={styles.sourceLink}>
              查看 StyleKit 规则 <Arrow />
            </Link>
          </header>

          <div className={styles.tokenRail} data-reveal>
            {direction.tokens.map((token) => <span key={token}>{token}</span>)}
          </div>

          <div className={styles.demoFrame} data-reveal>
            <div className={styles.browserBar}>
              <div><i /><i /><i /></div>
              <span>MORROW / CONCEPT 0{direction.no}</span>
              <span>1280 × 800</span>
            </div>
            <DemoHero direction={direction} />
          </div>
        </section>
      ))}

      <section id="workflow" className={styles.workflow} data-workflow>
        <div className={styles.sectionLabel}>
          <span>05</span>
          <span>IMAGE → INTERFACE / 从图片到界面</span>
        </div>
        <div className={styles.workflowHeading}>
          <h2>图片不是页面。<br />它只是页面的一层。</h2>
          <p>文字留在 HTML，布局留在 CSS，运动留在浏览器。这样图片可替换、内容可访问，页面也真正能响应不同屏幕。</p>
        </div>
        <ol className={styles.workflowSteps}>
          {WORKFLOW.map(([no, title, body]) => (
            <li key={no} data-workflow-step>
              <span>{no}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className={styles.ruleLine} aria-hidden="true">
          <span>STYLE DIRECTION</span><i /><span>IMAGE ASSET</span><i /><span>CODED UI</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTopline}>FROM “MAKE IT BEAUTIFUL” TO A SYSTEM YOU CAN BUILD.</div>
        <h2>别再只问：<br /><em>“能不能更好看？”</em></h2>
        <p>先选择一种方向，再让图片、界面和动效说同一种视觉语言。</p>
        <div className={styles.footerActions}>
          <Link href="/styles" className={styles.footerPrimary}>选择一个 StyleKit 风格 <Arrow /></Link>
          <Link href="/ui-prompts" className={styles.footerSecondary}>复制前端提示词</Link>
        </div>
        <div className={styles.footerMeta}>
          <Link href="/" className={styles.wordmark}>STYLEKIT<span>°</span></Link>
          <span>DESIGNED TO HOLD, NOT COMPETE.</span>
          <span>2026</span>
        </div>
      </footer>
    </main>
  );
}
