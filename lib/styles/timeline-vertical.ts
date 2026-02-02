import { DesignStyle } from "./index";

export const timelineVertical: DesignStyle = {
  slug: "timeline-vertical",
  name: "垂直时间线布局",
  nameEn: "Vertical Timeline",
  description:
    "垂直时间轴布局，通过连接线串联时间节点，适合展示历史进程、项目里程碑、工作经历、流程步骤。",
  cover: "/styles/timeline-vertical.png",
  styleType: "layout",
  tags: ["modern", "minimal"],
  compatibleWith: ["editorial", "corporate-clean", "minimalist-flat", "soft-ui", "natural-organic"],
  category: "minimal",
  colors: {
    primary: "#1e293b",
    secondary: "#f8fafc",
    accent: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
  },
  keywords: ["时间线", "历程", "里程碑", "流程", "步骤", "进度"],

  philosophy: `Vertical Timeline（垂直时间线布局）是一种用于展示时间序列或流程步骤的布局方式，通过视觉连接线引导阅读。

核心理念：
- 线性叙事：清晰的时间或流程顺序
- 节点突出：每个重要时刻都有明确标记
- 连接关系：视觉线条串联所有事件
- 渐进展示：支持滚动触发动画`,

  doList: [
    "使用伪元素或 div 创建中央连接线",
    "节点圆点与连接线对齐",
    "左右交替布局增加视觉变化",
    "移动端改为单侧布局",
    "添加滚动触发的入场动画",
    "节点使用统一的时间/序号格式",
    "连接线使用柔和颜色不喧宾夺主",
  ],

  dontList: [
    "禁止连接线断裂或不对齐",
    "禁止节点大小不一致",
    "禁止移动端保持双侧布局",
    "禁止忽略时间/序号标识",
    "禁止内容过长导致连接线过长",
  ],

  components: {
    button: {
      name: "时间线按钮",
      description: "时间线节点中的操作按钮",
      code: `<button className="
  inline-flex items-center gap-2
  px-4 py-2
  text-sm font-medium
  text-blue-600
  hover:text-blue-700
  transition-colors
">
  <span>View Details</span>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>`,
    },
    card: {
      name: "时间线节点卡片",
      description: "时间线中的事件卡片",
      code: `<div className="
  relative
  p-6
  bg-white
  rounded-xl
  shadow-sm
  border border-zinc-100
  hover:shadow-md
  transition-shadow
">
  {/* Connector dot */}
  <div className="
    absolute top-8 -left-[41px]
    w-4 h-4
    bg-blue-500
    rounded-full
    border-4 border-white
    shadow
  " />

  {/* Date */}
  <time className="text-sm text-zinc-400 mb-2 block">
    January 2024
  </time>

  {/* Title */}
  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
    Milestone Title
  </h3>

  {/* Description */}
  <p className="text-zinc-600 text-sm">
    Brief description of what happened at this point in the timeline.
  </p>
</div>`,
    },
    input: {
      name: "时间筛选器",
      description: "按时间范围筛选的输入",
      code: `<div className="flex items-center gap-4">
  <div className="flex-1">
    <label className="text-sm text-zinc-500 mb-1 block">From</label>
    <input
      type="date"
      className="
        w-full px-3 py-2
        border border-zinc-200
        rounded-lg
        text-zinc-900
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
      "
    />
  </div>
  <div className="flex-1">
    <label className="text-sm text-zinc-500 mb-1 block">To</label>
    <input
      type="date"
      className="
        w-full px-3 py-2
        border border-zinc-200
        rounded-lg
        text-zinc-900
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
      "
    />
  </div>
</div>`,
    },
    nav: {
      name: "时间线导航",
      description: "年份或阶段快速跳转",
      code: `<nav className="flex items-center gap-2 overflow-x-auto pb-4">
  <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium whitespace-nowrap">
    2024
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    2023
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    2022
  </button>
  <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
    2021
  </button>
</nav>`,
    },
    hero: {
      name: "垂直时间线",
      description: "完整的时间线布局",
      code: `<section className="py-16 px-4">
  <div className="max-w-3xl mx-auto">
    {/* Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-zinc-900 mb-4">Our Journey</h2>
      <p className="text-zinc-600">Key milestones in our company history</p>
    </div>

    {/* Timeline */}
    <div className="relative">
      {/* Central line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-200" />

      {/* Timeline items */}
      <div className="space-y-8">
        {/* Item 1 */}
        <div className="relative pl-16">
          <div className="absolute left-6 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow" />
          <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
            <time className="text-sm text-blue-500 font-medium mb-2 block">2024</time>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Series B Funding</h3>
            <p className="text-zinc-600 text-sm">Raised $50M to expand globally.</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="relative pl-16">
          <div className="absolute left-6 top-2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow" />
          <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
            <time className="text-sm text-emerald-500 font-medium mb-2 block">2023</time>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">1 Million Users</h3>
            <p className="text-zinc-600 text-sm">Reached our first million active users.</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="relative pl-16">
          <div className="absolute left-6 top-2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow" />
          <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
            <time className="text-sm text-amber-500 font-medium mb-2 block">2022</time>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Product Launch</h3>
            <p className="text-zinc-600 text-sm">Launched our flagship product to market.</p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="relative pl-16">
          <div className="absolute left-6 top-2 w-4 h-4 bg-zinc-400 rounded-full border-4 border-white shadow" />
          <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
            <time className="text-sm text-zinc-500 font-medium mb-2 block">2021</time>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Company Founded</h3>
            <p className="text-zinc-600 text-sm">Started with a team of 3 in a small office.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Vertical Timeline Global Styles */

/* Timeline container */
.timeline {
  position: relative;
  padding-left: 2rem;
}

/* Central line */
.timeline::before {
  content: '';
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
}

/* Timeline item */
.timeline-item {
  position: relative;
  padding-left: 2rem;
  padding-bottom: 2rem;
}

/* Node dot */
.timeline-item::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #3b82f6;
  border: 4px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Alternating layout for desktop */
@media (min-width: 768px) {
  .timeline-alternating {
    padding-left: 0;
  }

  .timeline-alternating::before {
    left: 50%;
    transform: translateX(-50%);
  }

  .timeline-alternating .timeline-item {
    width: 50%;
    padding-left: 0;
    padding-right: 2rem;
  }

  .timeline-alternating .timeline-item:nth-child(even) {
    margin-left: 50%;
    padding-left: 2rem;
    padding-right: 0;
  }

  .timeline-alternating .timeline-item::before {
    left: auto;
    right: -0.5rem;
  }

  .timeline-alternating .timeline-item:nth-child(even)::before {
    left: -0.5rem;
    right: auto;
  }
}

/* Scroll animation */
.timeline-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.timeline-item.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Node color variants */
.timeline-item[data-status="complete"]::before {
  background: #10b981;
}

.timeline-item[data-status="current"]::before {
  background: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.timeline-item[data-status="upcoming"]::before {
  background: #d1d5db;
}`,

  aiRules: `You are a frontend expert specializing in Vertical Timeline layout. All generated code must strictly follow these constraints:

## Absolute Prohibitions

- Do NOT break the connecting line
- Do NOT use inconsistent node sizes
- Do NOT keep alternating layout on mobile
- Do NOT omit time/date labels
- Do NOT make content too long per node

## Must Follow

- Central line: absolute positioned pseudo-element or div
- Node dots: aligned with center line
- Mobile: single-side layout (all items on right)
- Desktop: can alternate left/right
- Consistent spacing between nodes
- Clear time/date indicators

## Structure

Container:
- relative positioning
- padding-left for line space (mobile)
- centered line (desktop alternating)

Central Line:
- Pseudo-element or div
- Absolute positioned
- 2px width, subtle color

Node:
- Circular dot (w-4 h-4)
- Aligned with line center
- Different colors for status
- White border for contrast

Content Card:
- Connected visually to node
- Date/time label
- Title and description
- Optional action button

## Responsive

Mobile:
- All items on one side
- Line on left
- Full-width cards

Desktop:
- Optional alternating sides
- Line in center
- Cards 50% width

## Animation

Scroll-triggered:
- Items fade in on scroll
- Stagger animation
- Node pulse on current

## Self-Check

After generating code, verify:
1. Line is continuous
2. Nodes are aligned
3. Mobile is single-side
4. All items have dates
5. Scroll animation works`,

  examplePrompts: [
    {
      title: "公司发展历程",
      titleEn: "Company History",
      description: "展示公司重要里程碑",
      descriptionEn: "Display company milestones",
      prompt: `Create a company history timeline:
1. Vertical timeline with central line
2. Alternating left/right layout on desktop
3. Single side on mobile
4. Each node: year, event title, description
5. Different node colors for different types (funding, product, team)
6. Scroll animation: fade in as visible
7. Year navigation at top
Use subtle colors, professional styling`,
    },
    {
      title: "工作经历",
      titleEn: "Work Experience",
      description: "简历中的职业时间线",
      descriptionEn: "Career timeline for resume",
      prompt: `Create a career timeline for resume:
1. Single-side vertical timeline
2. Each node: date range, company, role, achievements
3. Company logo in node instead of dot
4. Current job highlighted
5. Skills tags for each role
6. Smooth scroll animation
7. Download resume button at end
Clean minimal design, professional look`,
    },
    {
      title: "项目进度",
      titleEn: "Project Progress",
      description: "项目阶段的流程展示",
      descriptionEn: "Project phase progress display",
      prompt: `Create a project progress timeline:
1. Vertical timeline showing project phases
2. Nodes: phase number, name, status (complete/current/upcoming)
3. Complete phases: green nodes with checkmark
4. Current phase: blue pulsing node
5. Upcoming: gray nodes
6. Progress percentage at top
7. Click node to expand details
Interactive with hover states`,
    },
  ],
};
