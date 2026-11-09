"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

type LocaleCopy = readonly [zh: string, en: string];

const ink = "#20211e";
const paper = "#f5f3ea";
const readingSurface = "#e6e4da";
const rule = "#bab9b0";
const graphite = "#555750";

const COLOR_STEPS = [
  { name: "Ink", zh: "墨", value: ink, text: paper },
  { name: "Graphite", zh: "石墨", value: graphite, text: paper },
  { name: "Rule", zh: "细线", value: rule, text: ink },
  { name: "Panel", zh: "面板", value: readingSurface, text: ink },
  { name: "Paper", zh: "暖纸", value: paper, text: ink },
];

const READING_ITEMS = [
  { id: "a1", title: "Keep values legible", zh: "让数值更好读", time: "08 min", category: "reading", categoryZh: "阅读", status: "Ready", statusZh: "待读" },
  { id: "a2", title: "Name every state", zh: "给每种状态命名", time: "12 min", category: "design", categoryZh: "设计", status: "Saved", statusZh: "已存" },
  { id: "a3", title: "Align numbers and units", zh: "对齐数值与单位", time: "06 min", category: "reading", categoryZh: "阅读", status: "New", statusZh: "未读" },
  { id: "a4", title: "Reduce one more surface", zh: "再减少一层表面", time: "09 min", category: "design", categoryZh: "设计", status: "Ready", statusZh: "待读" },
];

const SAMPLE_READINGS = [
  { name: "Room temperature", zh: "室温", value: "21.4", unit: "°C", status: "Within range", statusZh: "正常" },
  { name: "Relative humidity", zh: "相对湿度", value: "47", unit: "%", status: "Within range", statusZh: "正常" },
  { name: "Battery estimate", zh: "示例电量", value: "82", unit: "%", status: "Sample value", statusZh: "示例数据" },
];

function SectionHeading({ id, index, title, description }: { id: string; index: string; title: LocaleCopy; description: LocaleCopy }) {
  const { locale } = useI18n();
  const zh = locale === "zh";
  return (
    <div className="mb-5 flex items-start gap-4 border-b border-[#bab9b0] pb-3">
      <span className="pt-1 font-mono text-xs tabular-nums text-[#555750]">{index}</span>
      <div>
        <h2 id={id} className="font-sans text-lg font-semibold text-[#20211e]">{zh ? title[0] : title[1]}</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-[#555750]">{zh ? description[0] : description[1]}</p>
      </div>
    </div>
  );
}

function PatternMark({ large = false }: { large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={large ? "block h-full w-full bg-[radial-gradient(#555750_0.7px,transparent_0.8px)] bg-[length:6px_6px]" : "inline-block h-4 w-4 border border-[#555750] bg-[radial-gradient(#555750_0.7px,transparent_0.8px)] bg-[length:4px_4px]"}
    />
  );
}

export default function EInkShowcase() {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const [activeTab, setActiveTab] = useState<"reading" | "design">("reading");
  const [filter, setFilter] = useState<"all" | "new">("all");
  const [selectedReading, setSelectedReading] = useState("a1");
  const [grainOn, setGrainOn] = useState(false);
  const [reminderOn, setReminderOn] = useState(true);
  const [saved, setSaved] = useState(false);

  const visibleItems = useMemo(() => {
    const byTab = READING_ITEMS.filter((item) => item.category === activeTab);
    return filter === "new" ? byTab.filter((item) => item.status === "New") : byTab;
  }, [activeTab, filter]);

  const labels = {
    preview: ["浏览器预览", "Browser preview"],
    sample: ["示例数据 · 无设备连接", "SAMPLE DATA · NO DEVICE CONNECTED"],
    detail: ["查看风格详情", "Read the style guide"],
  };

  return (
    <main className="min-h-screen bg-[#f5f3ea] text-[#20211e]">
      <header className="border-b border-[#bab9b0] px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/styles/e-ink" className="font-mono text-sm font-semibold tracking-wide">E / INK</Link>
          <p className="hidden text-xs text-[#555750] sm:block">{zh ? "网页风格示例" : "WEB STYLE SPECIMEN"}</p>
          <span className="border border-[#555750] px-2 py-1 font-mono text-[10px]">{zh ? labels.sample[0] : labels.sample[1]}</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <section aria-labelledby="eink-hero-title" className="grid gap-8 border-b border-[#bab9b0] py-10 md:grid-cols-[1.15fr_.85fr] md:py-16">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[.12em] text-[#555750]">{zh ? "信息，留白，纸面" : "INFORMATION / SPACE / PAPER"}</p>
            <h1 id="eink-hero-title" className="mt-4 max-w-2xl font-sans text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {zh ? "读得清楚，才值得显示。" : "Make every line worth reading."}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#44453f]">
              {zh
                ? "用暖纸、墨色和简洁数据层级构建安静的界面。这里的内容是设计示例，不是实时设备数据。"
                : "An unhurried interface built from warm paper, ink and a clear data hierarchy. All readings below are design fixtures, not live device data."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setSaved((current) => !current)} aria-pressed={saved} className="min-h-11 rounded-none border border-[#20211e] bg-[#20211e] px-4 py-3 font-mono text-sm font-semibold text-[#f5f3ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#20211e] motion-reduce:transition-none">
                {saved ? (zh ? "已保存示例" : "EXAMPLE SAVED") : (zh ? "保存阅读位置" : "SAVE READING PLACE")}
              </button>
              <Link href="#reading-queue" className="inline-flex min-h-11 items-center border border-[#555750] px-4 py-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#20211e]">
                {zh ? "浏览阅读清单" : "BROWSE READING QUEUE"}
              </Link>
            </div>
          </div>

          <aside aria-label={zh ? "示例屏幕摘录" : "Sample screen excerpt"} className="border border-[#77786f] bg-[#e6e4da] p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4 border-b border-[#bab9b0] pb-3">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wide text-[#555750]">{zh ? "阅读面板 / 示例" : "READING PANEL / SAMPLE"}</p>
                <h2 className="mt-2 font-sans text-lg font-semibold">{zh ? "今日摘要" : "Today, at a glance"}</h2>
              </div>
              <p className="font-mono text-sm font-semibold tabular-nums">09:42</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-px border border-[#bab9b0] bg-[#bab9b0]">
              <div className="bg-[#f5f3ea] p-3">
                <p className="font-mono text-[10px] uppercase text-[#555750]">{zh ? "待读" : "TO READ"}</p>
                <p className="mt-2 font-mono text-2xl font-semibold tabular-nums">04</p>
              </div>
              <div className="bg-[#f5f3ea] p-3">
                <p className="font-mono text-[10px] uppercase text-[#555750]">{zh ? "已读" : "FINISHED"}</p>
                <p className="mt-2 font-mono text-2xl font-semibold tabular-nums">08</p>
              </div>
              <div className="col-span-2 bg-[#f5f3ea] p-3">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span>{zh ? "阅读进度" : "READING PROGRESS"}</span>
                  <span className="font-mono font-semibold tabular-nums">08 / 12</span>
                </div>
                <div role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} aria-label={zh ? "示例阅读进度" : "Sample reading progress"} className="mt-2 h-2 border border-[#555750] p-px">
                  <div className="h-full w-2/3 bg-[#20211e]" />
                </div>
              </div>
            </div>
            <p className="mt-3 font-mono text-[10px] text-[#555750]">{zh ? "静态示例 / 并非实时数据" : "STATIC FIXTURE / NOT A LIVE FEED"}</p>
          </aside>
        </section>

        <section aria-labelledby="paper-colors" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="paper-colors" index="01" title={["暖纸上的五档灰", "Five grays on warm paper"]} description={["颜色角色优先于色彩装饰；每一档都说明它承担什么任务。", "Roles carry more weight than decoration; each gray has a stated job."]} />
          <div className="grid grid-cols-2 gap-px border border-[#bab9b0] bg-[#bab9b0] sm:grid-cols-5">
            {COLOR_STEPS.map((color) => (
              <div key={color.value} className="min-h-28 p-3" style={{ backgroundColor: color.value, color: color.text }}>
                <p className="font-mono text-[10px] uppercase">{zh ? color.zh : color.name}</p>
                <p className="mt-8 font-mono text-xs tabular-nums">{color.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-[#555750]">
            {zh ? "灰线只分组，不承载正文；主要信息始终以墨色和文字标签呈现。" : "Rules divide groups without carrying body copy; primary meaning stays in ink and words."}
          </p>
        </section>

        <section aria-labelledby="type-hierarchy" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="type-hierarchy" index="02" title={["可扫读的字级", "A readable type scale"]} description={["让正文读起来像界面，不假装成电子设备的像素字体。", "Use familiar interface type instead of pretending to ship a device pixel font."]} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-[#bab9b0] bg-[#e6e4da] p-5">
              <p className="font-mono text-xs text-[#555750]">DISPLAY / 36 / 600</p>
              <p className="mt-3 text-3xl font-semibold leading-tight">{zh ? "读得清楚。" : "Read at ease."}</p>
              <p className="mt-4 border-t border-[#bab9b0] pt-3 text-sm leading-6">{zh ? "普通正文保持常规字重、舒适行高和适量行长。" : "Body copy stays at regular weight, comfortable leading and a controlled line length."}</p>
            </div>
            <div className="border border-[#bab9b0] bg-[#f5f3ea] p-5">
              <p className="font-mono text-xs text-[#555750]">DATA / TABULAR / 600</p>
              <div className="mt-4 space-y-3 font-mono text-sm tabular-nums">
                <p className="flex justify-between gap-4"><span>{zh ? "页数" : "PAGES"}</span><span>08 / 12</span></p>
                <p className="flex justify-between gap-4 border-t border-[#bab9b0] pt-3"><span>{zh ? "阅读时间" : "READ TIME"}</span><span>06:24</span></p>
                <p className="flex justify-between gap-4 border-t border-[#bab9b0] pt-3"><span>{zh ? "最后更新" : "UPDATED"}</span><span>09:42</span></p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="contrast-rhythm" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="contrast-rhythm" index="03" title={["用字形与间距分层", "Hierarchy by shape and spacing"]} description={["把文本大小和阅读位置作为主次，纹理只负责辅助分组。", "Type and placement establish priority; texture stays a supporting cue."]} />
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1.25fr]">
            <div className="border border-[#20211e] bg-[#f5f3ea] p-4">
              <p className="font-mono text-xs font-semibold">A / PRIMARY</p>
              <p className="mt-6 text-xl font-semibold">{zh ? "主条目" : "Primary entry"}</p>
              <p className="mt-2 text-sm text-[#44453f]">{zh ? "一句话解释它值得优先看。" : "One sentence for why this belongs first."}</p>
            </div>
            <div className="border border-[#bab9b0] bg-[#e6e4da] p-4">
              <p className="font-mono text-xs font-semibold text-[#555750]">B / SECONDARY</p>
              <p className="mt-6 text-base font-medium">{zh ? "次级条目" : "Supporting entry"}</p>
              <p className="mt-2 text-sm text-[#44453f]">{zh ? "以标签和细线分开，不用颜色编码。" : "A label and a rule separate this row without color coding."}</p>
            </div>
            <div className="grid grid-cols-2 gap-px border border-[#bab9b0] bg-[#bab9b0] p-px" data-eink-grain="true">
              <div className="flex min-h-28 items-end bg-[#f5f3ea] p-3"><span className="font-mono text-xs">TEXT STAYS SOLID</span></div>
              <div className="flex min-h-28 items-end bg-[#e6e4da] p-3"><span className="font-mono text-xs">PATTERN STAYS LOCAL</span></div>
            </div>
          </div>
        </section>

        <section aria-labelledby="surface-ledger" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="surface-ledger" index="04" title={["信息面板与阅读条目", "Panels and reading rows"]} description={["方正边界承载少量信息；选中状态有墨色边条和文本标签。", "Square panels hold just enough information; selection gets an ink rule and a word label."]} />
          <div className="grid gap-4 sm:grid-cols-3">
            {["a1", "a2", "a3"].map((id, index) => (
              <button key={id} type="button" onClick={() => setSelectedReading(id)} aria-pressed={selectedReading === id} className={`min-h-36 rounded-none border bg-[#e6e4da] p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#20211e] ${selectedReading === id ? "border-l-4 border-l-[#20211e] border-y-[#20211e] border-r-[#20211e]" : "border-[#bab9b0]"}`}>
                <p className="font-mono text-xs text-[#555750]">{String(index + 1).padStart(2, "0")} / 04</p>
                <p className="mt-3 font-semibold">{zh ? READING_ITEMS[index].zh : READING_ITEMS[index].title}</p>
                <p className="mt-3 flex items-center justify-between gap-2 text-xs text-[#44453f]"><span>{zh ? "阅读状态" : "READING"}</span><span>{selectedReading === id ? (zh ? "当前" : "CURRENT") : (zh ? "已保存" : "SAVED")}</span></p>
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="actions-states" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="actions-states" index="05" title={["按钮与键盘焦点", "Actions and keyboard focus"]} description={["交互状态只改变少量灰阶，焦点环始终可见，禁用状态有文字说明。", "Interaction changes only a few grays; focus stays visible and disabled state remains explicit."]} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <button type="button" className="min-h-11 rounded-none border border-[#20211e] bg-[#20211e] px-4 py-3 font-mono text-xs font-semibold text-[#f5f3ea] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#20211e]">{zh ? "主要操作" : "PRIMARY ACTION"}</button>
                <button type="button" className="min-h-11 rounded-none border border-[#555750] bg-[#f5f3ea] px-4 py-3 font-mono text-xs font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#20211e]">{zh ? "次级操作" : "SECONDARY ACTION"}</button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" disabled className="min-h-11 rounded-none border border-[#77786f] bg-[#e6e4da] px-4 py-3 font-mono text-xs text-[#555750] disabled:cursor-not-allowed disabled:opacity-60">{zh ? "不可用" : "UNAVAILABLE"}</button>
                <button type="button" onClick={() => setReminderOn((value) => !value)} aria-pressed={reminderOn} className="min-h-11 rounded-none border border-[#555750] px-4 py-3 font-mono text-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#20211e]">{zh ? `提醒${reminderOn ? "开启" : "关闭"}` : `REMINDER ${reminderOn ? "ON" : "OFF"}`}</button>
              </div>
            </div>
            <aside className="border border-[#bab9b0] p-4 text-sm leading-6 text-[#44453f]">
              <p className="font-mono text-xs font-semibold text-[#20211e]">FOCUS CONTRACT</p>
              <p className="mt-2">{zh ? "Tab 到按钮时出现 2px 墨色轮廓；按下状态不位移，不用浅灰隐藏焦点。" : "Tabbing to a control draws a 2px ink outline. Pressed controls do not shift; focus is never hidden in pale gray."}</p>
            </aside>
          </div>
        </section>

        <section aria-labelledby="form-contract" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="form-contract" index="06" title={["表单与筛选", "Forms and filters"]} description={["焦点轮廓、真实标签和可辨认选项共同建立交互反馈。", "Focus, visible labels and distinct options provide the interaction cues."]} />
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              {zh ? "搜索阅读清单" : "Search reading list"}
              <input aria-label={zh ? "搜索阅读清单" : "Search reading list"} placeholder={zh ? "标题、作者或主题" : "Title, author or topic"} className="min-h-11 w-full rounded-none border border-[#77786f] bg-[#f5f3ea] px-3 text-[#20211e] placeholder:text-[#555750] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#20211e]" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {zh ? "条目状态" : "Entry status"}
              <select aria-label={zh ? "条目状态" : "Entry status"} className="min-h-11 w-full rounded-none border border-[#77786f] bg-[#f5f3ea] px-3 text-[#20211e] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#20211e]">
                <option>{zh ? "全部状态" : "All states"}</option>
                <option>{zh ? "未读" : "Unread"}</option>
                <option>{zh ? "已保存" : "Saved"}</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium md:col-span-2">
              {zh ? "备注" : "Note"}
              <textarea rows={3} placeholder={zh ? "补充必要上下文" : "Add relevant context"} className="w-full rounded-none border border-[#77786f] bg-[#f5f3ea] p-3 text-[#20211e] placeholder:text-[#555750] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#20211e]" />
            </label>
          </div>
        </section>

        <section aria-labelledby="tabs-contract" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="tabs-contract" index="07" title={["标签和筛选状态", "Tabs and filter states"]} description={["选中状态使用文字标记和粗细不同的规则，不依赖点色。", "A label and a heavier rule mark the active choice instead of a colored dot."]} />
          <div role="tablist" aria-label={zh ? "示例内容分类" : "Sample content categories"} className="flex border-b border-[#bab9b0]">
            {(["reading", "design"] as const).map((tab) => (
              <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`min-h-11 border-b-2 px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#20211e] ${activeTab === tab ? "border-b-[#20211e] font-semibold" : "border-b-transparent text-[#555750]"}`}>
                {zh ? (tab === "reading" ? "阅读" : "设计") : tab === "reading" ? "Reading" : "Design"}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs text-[#555750]">{zh ? "显示" : "SHOW"}</span>
            {(["all", "new"] as const).map((item) => (
              <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`min-h-10 rounded-none border px-3 py-2 text-xs focus-visible:ring-2 focus-visible:ring-[#20211e] ${filter === item ? "border-[#20211e] bg-[#e6e4da] font-semibold" : "border-[#bab9b0]"}`}>
                {zh ? (item === "all" ? "全部" : "未读" ) : item === "all" ? "ALL" : "NEW"}
              </button>
            ))}
            <span className="font-mono text-xs tabular-nums text-[#555750]" aria-live="polite">{zh ? `${visibleItems.length} 条` : `${visibleItems.length} ITEMS`}</span>
          </div>
          <ul className="mt-3 divide-y divide-[#bab9b0] border-y border-[#bab9b0]">
            {visibleItems.length ? visibleItems.map((item) => (
              <li key={item.id} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-6">
                <span className="font-medium">{zh ? item.zh : item.title}</span>
                <span className="text-xs text-[#555750]">{zh ? item.statusZh : item.status}</span>
                <span className="font-mono text-xs tabular-nums text-[#44453f]">{item.time}</span>
              </li>
            )) : <li className="py-5 text-sm text-[#44453f]">{zh ? "没有符合此条件的条目。" : "No entries match this filter."}</li>}
          </ul>
        </section>

        <section aria-labelledby="status-markers" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="status-markers" index="08" title={["不靠颜色的状态", "Status without color" ]} description={["每种状态都带有文字和几何线索，可读性不依赖色觉。", "Every state has a textual and geometric cue; none depends on color perception." ]} />
          <div className="grid gap-px border border-[#bab9b0] bg-[#bab9b0] sm:grid-cols-3">
            <p className="flex min-h-20 items-center gap-3 bg-[#f5f3ea] p-4"><span aria-hidden="true" className="h-3 w-3 bg-[#20211e]" /><span><strong className="block text-sm">{zh ? "已完成" : "COMPLETED"}</strong><small className="text-xs text-[#555750]">{zh ? "填充方形" : "FILLED SQUARE"}</small></span></p>
            <p className="flex min-h-20 items-center gap-3 bg-[#f5f3ea] p-4"><span aria-hidden="true" className="h-3 w-3 border border-[#20211e]" /><span><strong className="block text-sm">{zh ? "等待中" : "WAITING"}</strong><small className="text-xs text-[#555750]">{zh ? "空心方形" : "HOLLOW SQUARE"}</small></span></p>
            <p className="flex min-h-20 items-center gap-3 bg-[#f5f3ea] p-4"><PatternMark /><span><strong className="block text-sm">{zh ? "分组" : "GROUPED"}</strong><small className="text-xs text-[#555750]">{zh ? "点纹样本" : "HALFTONE SAMPLE"}</small></span></p>
          </div>
        </section>

        <section aria-labelledby="sensor-sample" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="sensor-sample" index="09" title={["环境摘要（示例数据）", "Room summary (sample data)"]} description={["用列对齐展示数值、单位和状态；这些值是静态示例，不会采集设备数据。", "Align values, units and states in columns. These are static fixtures, not live device readings."]} />
          <div className="flex flex-wrap items-center justify-between gap-3 border border-[#bab9b0] bg-[#e6e4da] p-4">
            <div><p className="font-mono text-xs font-semibold">ROOM 04 / SAMPLE ONLY</p><p className="mt-1 text-sm text-[#44453f]">{zh ? "最近更新" : "Last update"} · 09:42</p></div>
            <button type="button" onClick={() => setGrainOn((value) => !value)} aria-pressed={grainOn} className="min-h-10 rounded-none border border-[#555750] px-3 text-xs focus-visible:ring-2 focus-visible:ring-[#20211e]">{zh ? `点纹${grainOn ? "开" : "关"}` : `HALFTONE ${grainOn ? "ON" : "OFF"}`}</button>
          </div>
          <div className="mt-4 overflow-x-auto border-y border-[#bab9b0]" data-eink-grain={grainOn ? "true" : undefined}>
            <table className="w-full border-collapse text-left text-sm">
              <thead><tr className="font-mono text-xs text-[#555750]"><th className="py-3 pr-4 font-medium">{zh ? "指标" : "MEASURE"}</th><th className="py-3 px-4 text-right font-medium">{zh ? "读数" : "VALUE"}</th><th className="py-3 px-4 text-right font-medium">{zh ? "单位" : "UNIT"}</th><th className="py-3 pl-4 text-right font-medium">{zh ? "状态" : "STATE"}</th></tr></thead>
              <tbody className="divide-y divide-[#bab9b0]">{SAMPLE_READINGS.map((row) => (
                <tr key={row.name}>
                  <th scope="row" className="py-3 pr-4 font-medium">{zh ? row.zh : row.name}</th>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">{row.value}</td>
                  <td className="px-4 py-3 text-right font-mono text-[#44453f]">{row.unit}</td>
                  <td className="py-3 pl-4 text-right text-xs text-[#44453f]">{zh ? row.statusZh : row.status}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="progress-strip" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="progress-strip" index="10" title={["进度与计数器", "Progress and counts"]} description={["比例条、数值和标签同时给出进度，不依赖一条颜色填充。", "Bar shape, text value and label carry progress together, never a color fill alone."]} />
          <div className="grid gap-4 md:grid-cols-3">
            {[{ label: ["今日阅读", "TODAY"], value: 67, caption: ["8 / 12 页", "8 / 12 PAGES"] }, { label: ["电量示例", "BATTERY SAMPLE"], value: 82, caption: ["82 %", "82 %"] }, { label: ["同步队列", "SYNC QUEUE"], value: 33, caption: ["1 / 3 项", "1 / 3 ITEMS"] }].map((item) => (
              <div key={item.label[1]} className="border border-[#bab9b0] bg-[#f5f3ea] p-4">
                <div className="flex items-baseline justify-between gap-3"><span className="text-xs font-semibold">{zh ? item.label[0] : item.label[1]}</span><span className="font-mono text-xs tabular-nums">{item.value}%</span></div>
                <div role="progressbar" aria-valuenow={item.value} aria-valuemin={0} aria-valuemax={100} aria-label={zh ? `${item.label[0]}示例进度` : `${item.label[1]} sample progress`} className="mt-3 h-2 border border-[#555750] p-px"><div className="h-full bg-[#20211e]" style={{ width: `${item.value}%` }} /></div>
                <p className="mt-2 font-mono text-xs text-[#555750]">{zh ? item.caption[0] : item.caption[1]}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="alerts" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="alerts" index="11" title={["提醒与错误", "Alerts and errors"]} description={["每个色阶内的差异还有形状和标题说明。", "Shape and heading supplement every grayscale state." ]} />
          <div className="grid gap-3 md:grid-cols-2">
            {[{ id: "NOTE", zh: "说明", mark: "i", text: ["已将示例添加到阅读清单。", "The sample was added to your reading queue."], cls: "border-[#77786f] bg-[#f5f3ea]" }, { id: "SAVED", zh: "已保存", mark: "✓", text: ["阅读位置已保存在此示例页面。", "Reading place saved in this sample page."], cls: "border-[#555750] bg-[#e6e4da]" }, { id: "WAIT", zh: "等待", mark: "…", text: ["同步状态未知，请检查连接后重试。", "Sync state is unknown. Check the connection, then retry."], cls: "border-dashed border-[#555750] bg-[#f5f3ea]" }, { id: "ERROR", zh: "无法读取", mark: "!", text: ["内容当前不可用；原始数据未被改写。", "This content is unavailable; source data was not changed."], cls: "border-double border-[#20211e] bg-[#e6e4da]" }].map((alert) => (
              <div key={alert.id} role="status" className={`flex gap-3 border-l-4 p-4 ${alert.cls}`}>
                <span aria-hidden="true" className="font-mono font-bold">{alert.mark}</span>
                <p className="text-sm leading-6">{zh ? alert.text[0] : alert.text[1]}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="halftone-chart" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="halftone-chart" index="12" title={["图表：线条、注记、点阵", "Charts: lines, notes and halftone"]} description={["点阵是装饰性灰阶，不取代数值标注、网格线或说明文字。", "Halftone decorates a gray area; it does not replace labels, gridlines or descriptions."]} />
          <figure className="border border-[#bab9b0] bg-[#f5f3ea] p-4 sm:p-6">
            <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-[#bab9b0] pb-3">
              <span className="font-semibold">{zh ? "过去六小时 / 示例" : "PAST SIX HOURS / SAMPLE"}</span>
              <span className="font-mono text-xs text-[#555750]">ROOM 04 · STATIC FIXTURE</span>
            </figcaption>
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_14rem] md:items-center">
              <div className="overflow-hidden border border-[#bab9b0]" data-eink-grain={grainOn ? "true" : undefined}>
                <svg role="img" aria-labelledby="chart-title chart-desc" viewBox="0 0 720 220" className="block h-auto w-full">
                  <title id="chart-title">{zh ? "六个示例温度读数" : "Six sample temperature readings"}</title>
                  <desc id="chart-desc">{zh ? "一条墨色折线配合网格和数值标签。数据为静态示例。" : "An ink line, grid and numeric labels. Data are static samples."}</desc>
                  <rect x="0" y="0" width="720" height="220" fill={grainOn ? "url(#eink-pattern)" : paper} />
                  <defs><pattern id="eink-pattern" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.6" fill={graphite} /></pattern></defs>
                  {[45, 90, 135, 180].map((y) => <line key={y} x1="54" y1={y} x2="696" y2={y} stroke={rule} strokeWidth="1" />)}
                  <line x1="54" y1="20" x2="54" y2="180" stroke={graphite} strokeWidth="2" />
                  <path d="M80 118 L198 96 L316 108 L434 70 L552 83 L670 50" fill="none" stroke={ink} strokeWidth="3" />
                  {[[80,118],[198,96],[316,108],[434,70],[552,83],[670,50]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="5" fill={paper} stroke={ink} strokeWidth="2" /><text x={x} y={205} textAnchor="middle" fill={graphite} fontSize="12" fontFamily="monospace">{6+i}:00</text></g>)}
                  <text x="4" y="44" fill={graphite} fontSize="12" fontFamily="monospace">24 °C</text>
                  <text x="4" y="180" fill={graphite} fontSize="12" fontFamily="monospace">18 °C</text>
                </svg>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div className="border-l-2 border-[#20211e] pl-3"><dt className="text-xs text-[#555750]">{zh ? "最高" : "HIGH"}</dt><dd className="mt-1 font-mono font-semibold tabular-nums">22.8 °C</dd></div>
                <div className="border-l-2 border-dashed border-[#555750] pl-3"><dt className="text-xs text-[#555750]">{zh ? "最低" : "LOW"}</dt><dd className="mt-1 font-mono font-semibold tabular-nums">20.9 °C</dd></div>
                <p className="col-span-2 text-xs leading-5 text-[#555750]">{zh ? "点阵层开关只影响图表底纹；数字、折线和标注始终直接绘制。" : "The halftone switch changes only the chart fill. Labels, values and the series line remain solid."}</p>
              </dl>
            </div>
          </figure>
        </section>

        <section aria-labelledby="outlined-data" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="outlined-data" index="13" title={["灰阶卡片与计数", "Grayscale panels and counts"]} description={["背景深浅只作分组；每个量值和单位都能脱离灰度独立阅读。", "Surface shade groups the panels; every value and unit remains explicit." ]} />
          <div className="grid gap-px border border-[#bab9b0] bg-[#bab9b0] sm:grid-cols-3">
            {[{ n: "04", en: "Unread", zh: "未读", area: "bg-[#f5f3ea]" }, { n: "08", en: "Finished", zh: "已读", area: "bg-[#e6e4da]" }, { n: "12", en: "Items", zh: "条目", area: "bg-[#f5f3ea]" }].map((item) => (
              <article key={item.en} className={`min-h-32 p-5 ${item.area}`}>
                <p className="font-mono text-xs text-[#555750]">{zh ? item.zh : item.en}</p>
                <p className="mt-6 font-mono text-3xl font-semibold tabular-nums">{item.n}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="dividers" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="dividers" index="14" title={["分隔、对齐和点阵", "Rules, alignment and halftone"]} description={["让结构表达信息关联；装饰和内容各有自己的空间。", "Structure shows relationships; texture and content have distinct areas." ]} />
          <div className="grid gap-4 md:grid-cols-[1.2fr_.8fr]">
            <div className="border border-[#bab9b0] p-4">
              <p className="font-mono text-xs text-[#555750]">RULE / 01</p>
              <div className="mt-4 space-y-3">
                <p className="flex justify-between border-b border-[#bab9b0] pb-2 text-sm"><span>{zh ? "标题" : "TITLE"}</span><span className="font-mono text-xs">36 / 600</span></p>
                <p className="flex justify-between border-b border-[#bab9b0] pb-2 text-sm"><span>{zh ? "正文" : "BODY"}</span><span className="font-mono text-xs">16 / 400</span></p>
                <p className="flex justify-between text-sm"><span>{zh ? "数据" : "DATA"}</span><span className="font-mono text-xs">16 / 600</span></p>
              </div>
            </div>
            <div className="relative min-h-40 border border-[#bab9b0] bg-[radial-gradient(#555750_0.65px,transparent_0.75px)] bg-[length:6px_6px] p-4">
              <p className="inline-block bg-[#f5f3ea] px-2 font-mono text-xs">LOCAL PATTERN ONLY</p>
              <p className="absolute bottom-4 left-4 max-w-[14rem] bg-[#f5f3ea] px-2 py-1 text-xs leading-5">{zh ? "为说明样式，这块文字保持实心纸底。" : "This text stays on solid paper so the pattern cannot interfere."}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="reading-quote" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="reading-quote" index="15" title={["阅读引文", "Reading note"]} description={["小段文字以行宽和规则做节奏，而不靠大面积图像装饰。", "Line length and a quiet rule give prose rhythm without a large decorative image." ]} />
          <blockquote className="max-w-3xl border-l-4 border-[#20211e] py-2 pl-5 text-xl font-medium leading-8">
            {zh ? "屏幕应该留给内容。每一行值得显示，才进入阅读队列。" : "The screen belongs to the content. A line earns its place before it joins the reading queue."}
          </blockquote>
          <p className="mt-3 pl-6 font-mono text-xs text-[#555750]">DESIGN PRINCIPLE / E-INK SPECIMEN</p>
        </section>

        <section aria-labelledby="rules" className="border-b border-[#bab9b0] py-10">
          <SectionHeading id="rules" index="16" title={["制作规则", "Build rules"]} description={["以下规则描述屏幕行为，不为某种真实硬件背书。", "These rules describe the visual reference, not compatibility with a real device." ]} />
          <div className="grid gap-6 md:grid-cols-2">
            <div><h3 className="mb-3 font-mono text-sm font-semibold">DO</h3><ul className="space-y-2 border-t border-[#bab9b0] pt-3 text-sm leading-6">{["使用墨色与暖纸作为主文字对比", "对齐数值、单位和状态标签", "窄屏折叠网格并维持阅读顺序", "减少动态效果并保留键盘焦点"].map((ruleText) => <li key={ruleText} className="flex gap-2"><span aria-hidden="true" className="font-mono font-bold">+</span><span>{ruleText}</span></li>)}</ul></div>
            <div><h3 className="mb-3 font-mono text-sm font-semibold">DON&apos;T</h3><ul className="space-y-2 border-t border-[#bab9b0] pt-3 text-sm leading-6">{["不要把传感器示例说成实时数据", "不要只凭灰度表示错误或选择", "不要把纹理压到正文或小图标上", "不要假定真的接入了低刷新屏幕"].map((ruleText) => <li key={ruleText} className="flex gap-2"><span aria-hidden="true" className="font-mono font-bold">—</span><span>{ruleText}</span></li>)}</ul></div>
          </div>
        </section>

        <footer className="flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-[#555750]">{zh ? "E-Ink 是浏览器风格参考；实际设备需单独测试。" : "E-Ink is a browser style reference; real devices require separate testing."}</p>
          <Link href="/styles/e-ink" className="inline-flex min-h-11 items-center gap-2 self-start border border-[#555750] px-4 py-2 font-mono text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#20211e]">{zh ? labels.detail[0] : labels.detail[1]}</Link>
        </footer>
      </div>
    </main>
  );
}
