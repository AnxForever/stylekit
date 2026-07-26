"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Check,
  CircleAlert,
  Gauge,
  ImageIcon,
  Layers3,
  MousePointer2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AdminBadge, AdminPanel } from "@/components/admin/admin-ui";
import styles from "./visual-lab.module.css";

type DirectionId = "editorial" | "cyberpunk" | "corporate";

interface Direction {
  id: DirectionId;
  order: string;
  label: string;
  shortLabel: string;
  title: string;
  titleAccent: string;
  summary: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
  assetVerdict: string;
  assetTone: "success" | "warning" | "danger";
  motion: string;
  productValue: string;
  verdict: string;
}

const DIRECTIONS: Direction[] = [
  {
    id: "editorial",
    order: "01",
    label: "Editorial 叙事",
    shortLabel: "Editorial",
    title: "让图片成为版式，",
    titleAccent: "而不是填充物。",
    summary:
      "通过人物轮廓、留白和文字尺度共同建立第一眼记忆，再用克制的滚动揭示解释真实页面、组件与交付物。",
    image: "/styles/editorial.svg",
    imageAlt: "黑白时尚人物造型研究图",
    objectPosition: "64% 50%",
    assetVerdict: "视觉质量较强，商业来源待审计",
    assetTone: "warning",
    motion: "一次入场揭示 + 阅读进度，不叠加漂浮特效",
    productValue: "适合创意工作室、作品集与品牌内容 Pack",
    verdict: "最适合先验证图片裁剪、排版和滚动叙事。",
  },
  {
    id: "cyberpunk",
    order: "02",
    label: "Cyberpunk 氛围",
    shortLabel: "Cyberpunk",
    title: "先建立世界，",
    titleAccent: "再展示界面。",
    summary:
      "用一张强氛围图承担视觉高潮，界面信息保持冷静清晰；只保留轻量镜头漂移和指针响应，避免廉价霓虹堆叠。",
    image: "/styles/cyberpunk-neon.svg",
    imageAlt: "橙色与青色霓虹照亮的未来城市研究图",
    objectPosition: "50% 48%",
    assetVerdict: "氛围强，授权与性能均需闸门",
    assetTone: "warning",
    motion: "12 秒慢镜头漂移；低动效模式完全静止",
    productValue: "适合游戏、AI 工具、活动页等强主题 Pack",
    verdict: "差异化明显，但必须控制 GPU、对比度和移动端降级。",
  },
  {
    id: "corporate",
    order: "03",
    label: "Corporate 产品证据",
    shortLabel: "Corporate",
    title: "少讲办公氛围，",
    titleAccent: "多给产品证据。",
    summary:
      "现有办公室图库只能作为反例。收费级 B2B 展示应改用原创产品场景、数据界面和可信业务结果，图片服务于购买判断。",
    image: "/styles/corporate-clean.svg",
    imageAlt: "普通办公室人物图库研究图",
    objectPosition: "68% 50%",
    assetVerdict: "图库感明显，不进入收费候选",
    assetTone: "danger",
    motion: "产品面板分层入场；数字变化只在有真实数据时使用",
    productValue: "当前需求信号最好，优先验证可售 B2B Pack",
    verdict: "商业优先级最高，但需要重新制作原创产品视觉。",
  },
];

const STORY_CHAIN = [
  { label: "情绪参考", detail: "一眼理解风格气质" },
  { label: "实际页面", detail: "看到真实应用结果" },
  { label: "组件状态", detail: "确认完整度与可用性" },
  { label: "动效交互", detail: "理解体验差异" },
  { label: "安装交付", detail: "判断是否值得付费" },
];

const QUALITY_GATES = [
  {
    icon: ImageIcon,
    title: "图片不是装饰",
    detail: "每张图必须承担气质、场景、产品证据或内容叙事中的一个明确角色。",
  },
  {
    icon: Sparkles,
    title: "每屏一个高潮",
    detail: "一个主视觉加一个辅助动效，避免光效、视差、粒子和文字动画同时抢注意力。",
  },
  {
    icon: Gauge,
    title: "性能先设预算",
    detail: "首屏媒体优先 AVIF/WebP；持续动画只动 transform/opacity，并提供完整静态降级。",
  },
  {
    icon: ShieldCheck,
    title: "资产可追溯",
    detail: "进入收费包前必须记录来源、许可、作者、修改、分发权和审核状态。",
  },
];

export function PremiumVisualLab() {
  const [selectedId, setSelectedId] = useState<DirectionId>("editorial");
  const [motionEnabled, setMotionEnabled] = useState(true);
  const selected = DIRECTIONS.find((item) => item.id === selectedId) ?? DIRECTIONS[0];

  return (
    <div className="space-y-6">
      <AdminPanel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <AdminBadge tone="success">隔离实验</AdminBadge>
              <AdminBadge tone="neutral">不接入公开导航</AdminBadge>
              <AdminBadge tone="neutral">不修改现有预览</AdminBadge>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
              这里验证的是一套新增的收费级展示结构：情绪图 → 实际页面 → 组件状态 →
              动效交互 → 安装交付。当前图片仅用于内部构图研究，不代表已获商业分发许可。
            </p>
          </div>
          <button
            type="button"
            className={styles.motionToggle}
            aria-pressed={motionEnabled}
            onClick={() => setMotionEnabled((current) => !current)}
          >
            <span className={styles.motionToggleDot} />
            动效预览：{motionEnabled ? "开启" : "关闭"}
          </button>
        </div>
      </AdminPanel>

      <div className={styles.directionTabs} aria-label="视觉方向" role="tablist">
        {DIRECTIONS.map((direction) => (
          <button
            key={direction.id}
            type="button"
            role="tab"
            aria-selected={selectedId === direction.id}
            className={styles.directionTab}
            data-active={selectedId === direction.id}
            onClick={() => setSelectedId(direction.id)}
          >
            <span>{direction.order}</span>
            {direction.label}
          </button>
        ))}
      </div>

      <section
        className={styles.stage}
        data-direction={selected.id}
        data-motion={motionEnabled ? "on" : "off"}
        aria-labelledby="visual-lab-stage-title"
      >
        <Image
          key={selected.image}
          className={styles.stageImage}
          src={selected.image}
          alt={selected.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 1100px, 100vw"
          style={{ objectPosition: selected.objectPosition }}
        />
        <div className={styles.stageWash} />
        <div className={styles.stageGrid} />

        <div className={styles.stageTopline}>
          <span>STYLEKIT / PREMIUM STUDY</span>
          <span>{selected.order} — {selected.shortLabel}</span>
        </div>

        <div className={styles.stageCopy}>
          <div className={styles.researchBadge}>
            <CircleAlert aria-hidden="true" />
            研究素材 · 暂不可分发
          </div>
          <h2 id="visual-lab-stage-title">
            {selected.title}
            <span>{selected.titleAccent}</span>
          </h2>
          <p>{selected.summary}</p>
        </div>

        {selected.id === "corporate" ? <CorporateEvidencePanel /> : null}

        <div className={styles.stageMeta}>
          <div>
            <span>图片角色</span>
            <strong>{selected.id === "corporate" ? "反例 + 产品证据" : "视觉叙事锚点"}</strong>
          </div>
          <div>
            <span>动效策略</span>
            <strong>{motionEnabled ? "克制动态" : "完整静态降级"}</strong>
          </div>
          <div>
            <span>验证状态</span>
            <strong>内部候选</strong>
          </div>
        </div>
      </section>

      <AdminPanel className="overflow-hidden">
        <div className="px-4 py-4 shadow-[0_1px_0_0_var(--admin-border-soft)] sm:px-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">收费级展示证据链</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                用户购买的不是一张漂亮图，而是从感知风格到确认可交付价值的完整路径。
              </p>
            </div>
            <AdminBadge tone="info">结构原型</AdminBadge>
          </div>
        </div>
        <ol className={styles.storyChain}>
          {STORY_CHAIN.map((item, index) => (
            <li key={item.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </AdminPanel>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminPanel className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">当前方向判定</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                每个方向先过视觉、商业、性能和授权四道闸门，再决定是否进入公开产品。
              </p>
            </div>
            <AdminBadge tone={selected.assetTone}>{selected.shortLabel}</AdminBadge>
          </div>
          <dl className={styles.verdictList}>
            <div>
              <dt>素材判断</dt>
              <dd>{selected.assetVerdict}</dd>
            </div>
            <div>
              <dt>动效边界</dt>
              <dd>{selected.motion}</dd>
            </div>
            <div>
              <dt>商业角色</dt>
              <dd>{selected.productValue}</dd>
            </div>
            <div>
              <dt>本轮结论</dt>
              <dd>{selected.verdict}</dd>
            </div>
          </dl>
          {selected.id === "corporate" ? (
            <Link
              href="/admin/visual-lab/corporate-clean-saas"
              className="mt-5 inline-flex h-10 items-center rounded-md bg-foreground px-3 text-sm text-background shadow-[var(--admin-shadow-border)] hover:opacity-90"
            >
              审核 Corporate Clean SaaS Pack
            </Link>
          ) : null}
        </AdminPanel>

        <AdminPanel className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--admin-input)] shadow-[var(--admin-shadow-border)]">
              <Layers3 className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">不可触碰边界</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                实验成果只有通过审核后才能以新增模块接入，永远不直接覆盖现有设计。
              </p>
            </div>
          </div>
          <ul className={styles.guardrailList}>
            <li><Check /> 不修改 StyleCard 与 HomeStyleCard</li>
            <li><Check /> 不修改 135 个现有 Showcase</li>
            <li><Check /> 不更换现有公开页面的颜色、排版和布局</li>
            <li><Check /> 不把未审计图片打进收费 Pack</li>
          </ul>
        </AdminPanel>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {QUALITY_GATES.map((gate) => (
          <AdminPanel key={gate.title} className="p-5">
            <gate.icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
            <p className="mt-4 text-sm font-medium text-foreground">{gate.title}</p>
            <p className="mt-2 text-xs leading-5 text-muted">{gate.detail}</p>
          </AdminPanel>
        ))}
      </div>

      <p className="flex items-center gap-2 text-xs leading-5 text-muted">
        <MousePointer2 className="h-3.5 w-3.5" strokeWidth={1.5} />
        首轮只验证单张主图、单个辅助动效和完整静态降级；不会为了“显得高级”堆叠无意义特效。
      </p>
    </div>
  );
}

function CorporateEvidencePanel() {
  return (
    <div className={styles.evidencePanel} aria-label="B2B 产品证据示意">
      <div className={styles.evidenceHeader}>
        <div>
          <span>真实产品界面</span>
          <strong>增长与转化概览</strong>
        </div>
        <span className={styles.liveDot}>示意</span>
      </div>
      <div className={styles.evidenceMetrics}>
        <div><span>意向用户</span><strong>1,284</strong><em>+18.2%</em></div>
        <div><span>价格页到达</span><strong>36.7%</strong><em>+4.8%</em></div>
      </div>
      <div className={styles.evidenceChart} aria-hidden="true">
        {[28, 34, 31, 48, 45, 62, 58, 74, 71, 86, 80, 92].map((height, index) => (
          <span key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
      <p>付费展示应证明“它能做什么”，而不只是展示一个穿西装的人。</p>
    </div>
  );
}
