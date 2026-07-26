import type { PromptTopic } from "./types";

export const promptTopics: PromptTopic[] = [
  {
    slug: "dashboard-design",
    titleEn: "Dashboard Design Prompts",
    titleZh: "仪表盘设计提示词",
    descriptionEn: "AI prompts for building clean, data-rich dashboard UIs with charts, metrics, sidebars, and responsive layouts.",
    descriptionZh: "用于构建数据丰富的仪表盘 UI 的 AI 提示词，涵盖图表、指标卡片、侧边栏和响应式布局。",
    keywords: [
      "dashboard UI prompt",
      "admin panel design prompt",
      "dashboard layout prompt",
      "analytics dashboard prompt",
      "data visualization UI",
      "dashboard design system",
    ],
    relatedStyleSlugs: [
      "warm-dashboard",
      "dashboard-layout",
      "corporate-clean",
      "stripe-style",
      "notion-style",
      "sidebar-fixed",
    ],
    introEn:
      "Dashboard design focuses on presenting complex data in an intuitive, scannable layout. A well-designed dashboard uses clear visual hierarchy, consistent spacing, and purposeful color coding to help users quickly understand metrics and take action. Modern dashboard UIs typically feature a fixed sidebar for navigation, a top bar for search and user actions, and a main content area with cards, charts, and data tables.",
    introZh:
      "仪表盘设计的核心在于将复杂数据以直觉化、可扫视的布局呈现。优秀的仪表盘通过清晰的视觉层级、一致的间距、有意义的色彩编码帮助用户快速理解指标并采取行动。现代仪表盘 UI 通常包含固定侧边栏导航、顶部搜索与用户操作栏，以及由卡片、图表和数据表组成的主内容区。",
    prompts: [
      {
        titleEn: "Analytics Dashboard",
        titleZh: "数据分析仪表盘",
        tool: "general",
        prompt:
          "Build a responsive analytics dashboard with a fixed sidebar navigation, top header with search and user avatar, and a main content area. Include: 4 KPI metric cards at the top (revenue, users, conversion rate, active sessions), a large area chart for trends, a bar chart for comparisons, and a recent activity data table. Use a clean, professional color palette with a white background and subtle gray borders. Ensure proper spacing between all elements.",
      },
      {
        titleEn: "Admin Panel for v0",
        titleZh: "v0 管理面板",
        tool: "v0",
        prompt:
          "Create an admin dashboard page with shadcn/ui components. Include a collapsible sidebar with icons and labels, breadcrumb navigation, 4 stat cards with sparkline charts, a main data table with sorting/filtering/pagination, and a notification dropdown. Use Tailwind CSS with neutral gray palette. The layout should be responsive with the sidebar collapsing to icons on mobile.",
      },
      {
        titleEn: "Dashboard for Cursor",
        titleZh: "Cursor 仪表盘",
        tool: "cursor",
        prompt:
          "I need a Next.js dashboard page using Tailwind CSS and Recharts. Structure: fixed left sidebar (240px) with logo, nav links with icons, and user profile at bottom. Main area has a top bar with page title and date range picker. Content grid: row 1 has 4 metric cards, row 2 has a line chart (60% width) and a donut chart (40% width), row 3 has a data table. Use Inter font, 16px base grid, and a warm neutral color scheme.",
      },
      {
        titleEn: "Dashboard for Claude",
        titleZh: "Claude 仪表盘",
        tool: "claude",
        prompt:
          "Generate a complete dashboard layout as a React component with TypeScript. Requirements: responsive grid layout using CSS Grid, dark/light theme support via CSS custom properties, sidebar navigation with nested menu items, metric cards with trend indicators (up/down arrows + percentage), chart placeholders using recharts, and a sortable data table. Follow accessibility best practices with proper ARIA roles. Use Tailwind CSS for styling.",
      },
      {
        titleEn: "Finance Dashboard with Dark Sidebar",
        titleZh: "深色侧边栏金融仪表盘",
        tool: "general",
        prompt:
          "Design a finance dashboard with a dark sidebar (#0f172a) and a light content area (#f8fafc). Sidebar: 256px wide, nav labels in #94a3b8, active item with a #3b82f6 left border and #1e293b background. Content: 4 KPI cards showing balance, income, expenses, and savings rate, each with a 12-point sparkline. Numbers use tabular-nums at 28px semibold; positive deltas in #16a34a, negative in #dc2626, always paired with an arrow icon so color is not the only signal. Cards on white with 1px #e2e8f0 borders, 24px padding, 24px grid gap. Include a transactions table with zebra rows (#f1f5f9) and right-aligned amounts.",
      },
      {
        titleEn: "Mobile-First Analytics for v0",
        titleZh: "v0 移动优先分析面板",
        tool: "v0",
        prompt:
          "Create a mobile-first analytics dashboard with shadcn/ui. On mobile: a bottom tab bar (4 items, 56px tall, 44px minimum touch targets), stacked full-width metric cards, and horizontally scrollable chart cards with scroll-snap. On md and up: switch to a 12-column grid with a collapsible left sidebar. Palette: background #fafafa, cards #ffffff with border #e5e5e5, single accent indigo #4f46e5 for active states and chart lines. Typography: Inter, 14px body, 24px card values. Charts must include visible axis labels at 12px #737373 and pass 4.5:1 contrast for all text.",
      },
      {
        titleEn: "Realtime Ops Dashboard for Cursor",
        titleZh: "Cursor 实时运维仪表盘",
        tool: "cursor",
        prompt:
          "Build a realtime operations dashboard in Next.js with Tailwind and Recharts. Dark theme: background #09090b, panels #131316 with 1px #26262b borders, 8px radius. Status semantics: healthy #22c55e, degraded #f59e0b, down #ef4444, each shown as a dot plus a text label (never color alone). Layout: a top status strip of 6 service tiles, a large streaming line chart with a 60-second window, and a log feed in JetBrains Mono 13px with #a1a1aa timestamps. Use aria-live=polite on the log feed, 16px grid gaps, and a pulsing dot animation limited to transform and opacity for performance.",
      },
      {
        titleEn: "HR Admin Panel for Claude",
        titleZh: "Claude 人事管理后台",
        tool: "claude",
        prompt:
          "Generate an HR admin panel as a React TypeScript component. Layout: 240px sidebar with grouped nav sections (People, Payroll, Settings) using 11px uppercase #6b7280 group labels, plus a content area with a sticky header holding breadcrumbs and a search input. Include an employee table with avatar, name, department badge, and status pill; pills use tinted backgrounds (#dcfce7 with #166534 text for active, #fee2e2 with #991b1b for offboarding) to keep 4.5:1 contrast. Row height 56px, cell padding 16px, header row #f9fafb. Add a slide-over detail drawer (480px) with labeled field groups on a 24px vertical rhythm. Font: Inter throughout.",
      },
    ],
    useCases: [
      {
        titleEn: "SaaS Admin Panel",
        titleZh: "SaaS 管理后台",
        descriptionEn: "Internal tools for managing users, subscriptions, and product analytics.",
        descriptionZh: "用于管理用户、订阅和产品分析的内部工具。",
      },
      {
        titleEn: "E-commerce Analytics",
        titleZh: "电商数据分析",
        descriptionEn: "Sales tracking, inventory management, and customer behavior dashboards.",
        descriptionZh: "销售追踪、库存管理和客户行为分析仪表盘。",
      },
      {
        titleEn: "DevOps Monitoring",
        titleZh: "运维监控",
        descriptionEn: "Server health, deployment status, and error tracking interfaces.",
        descriptionZh: "服务器状态、部署状况和错误追踪界面。",
      },
      {
        titleEn: "Financial Reporting",
        titleZh: "财务报表",
        descriptionEn: "Revenue dashboards, expense tracking, and financial forecasting tools.",
        descriptionZh: "收入仪表盘、支出追踪和财务预测工具。",
      },
    ],
    faq: [
      {
        questionEn: "What makes a good dashboard UI design?",
        questionZh: "什么是好的仪表盘 UI 设计？",
        answerEn:
          "A good dashboard prioritizes scannability: place the most important KPIs at the top, use consistent card sizes, limit the color palette to 3-5 purposeful colors, ensure charts have clear labels, and maintain generous whitespace between sections. Navigation should be persistent (sidebar or top bar) so users always know where they are.",
        answerZh:
          "好的仪表盘设计注重可扫视性：将最重要的 KPI 放在顶部，使用一致的卡片尺寸，限制色板为 3-5 个有意义的颜色，确保图表有清晰标签，并在各区块间保持充足的留白。导航应常驻（侧边栏或顶部栏），让用户始终清楚当前位置。",
      },
      {
        questionEn: "How to create a dashboard with Tailwind CSS?",
        questionZh: "如何用 Tailwind CSS 创建仪表盘？",
        answerEn:
          "Use CSS Grid or Flexbox via Tailwind utilities: 'grid grid-cols-12 gap-6' for the main layout, 'col-span-3' for sidebar, 'col-span-9' for content. Use shadcn/ui Card components for metric cards, Recharts or Chart.js for data visualization, and Tailwind's 'sticky top-0' for fixed headers. StyleKit provides ready-made dashboard tokens and component recipes.",
        answerZh:
          "通过 Tailwind 工具类使用 CSS Grid 或 Flexbox：主布局用 'grid grid-cols-12 gap-6'，侧边栏用 'col-span-3'，内容区用 'col-span-9'。指标卡片用 shadcn/ui Card 组件，数据可视化用 Recharts 或 Chart.js，固定头部用 Tailwind 的 'sticky top-0'。StyleKit 提供现成的仪表盘 design tokens 和组件配方。",
      },
      {
        questionEn: "Which AI tools can generate dashboard designs?",
        questionZh: "哪些 AI 工具可以生成仪表盘设计？",
        answerEn:
          "v0 by Vercel generates full dashboard UIs from text prompts using shadcn/ui. Cursor and Claude can generate complete dashboard code with charts and tables. StyleKit enhances all of these by providing design tokens and style rules that ensure visual consistency across generated components.",
        answerZh:
          "Vercel 的 v0 可以通过文字提示生成完整的仪表盘 UI（基于 shadcn/ui）。Cursor 和 Claude 能生成包含图表和表格的完整仪表盘代码。StyleKit 通过提供 design tokens 和风格规则来增强所有这些工具，确保生成组件的视觉一致性。",
      },
      {
        questionEn: "What is the best layout for a dashboard?",
        questionZh: "仪表盘最佳布局是什么？",
        answerEn:
          "The most common and effective layout is a fixed sidebar (200-280px) with a scrollable main content area. Use a 12-column grid for the content, with metric cards in the first row (3-4 columns each), charts in the second row, and a data table spanning full width at the bottom. This pattern works well across screen sizes when the sidebar collapses to icons on mobile.",
        answerZh:
          "最常见且有效的布局是固定侧边栏（200-280px）搭配可滚动的主内容区。内容区使用 12 列网格，第一行放指标卡片（每个占 3-4 列），第二行放图表，底部放全宽数据表。该模式在侧边栏在移动端折叠为图标时，能在各种屏幕尺寸下良好运行。",
      },
      {
        questionEn: "How many metrics should a dashboard show at once?",
        questionZh: "仪表盘一次应该展示多少个指标？",
        answerEn:
          "Show 4-6 primary KPIs above the fold; research on scannability suggests users reliably compare at most 5-7 values at a glance. Put one number per card at 24-32px, with the trend delta as secondary text at 13-14px. Everything else belongs in charts or tables below, or behind a date-range or segment filter. If stakeholders ask for 15 metrics, group them into tabs (Overview, Revenue, Engagement) rather than shrinking cards — a dashboard where every number is small is a dashboard where no number gets read.",
        answerZh:
          "首屏展示 4-6 个核心 KPI 即可；可扫视性研究表明用户一眼最多能可靠比较 5-7 个数值。每张卡片只放一个 24-32px 的主数字，趋势变化作为 13-14px 的次要文字。其余内容应放在下方的图表或表格中，或收进日期范围、分群筛选器里。如果需求方要 15 个指标，用标签页分组（概览、营收、活跃）而不是缩小卡片——每个数字都很小的仪表盘，等于没有数字被真正读到。",
      },
      {
        questionEn: "How do I choose chart colors for a dashboard?",
        questionZh: "仪表盘的图表配色如何选择？",
        answerEn:
          "Use one brand accent (e.g. #3b82f6) for the primary series, then derive categorical colors by rotating hue while keeping similar lightness, capping at 6 series per chart. For sequential data (heatmaps), vary lightness of a single hue instead of mixing hues. Reserve red and green strictly for negative/positive semantics, and always pair them with icons or labels for color-blind users. Gridlines and axes should stay quiet: #e5e7eb lines with #6b7280 labels on light themes. Test every text-on-color combination against the 4.5:1 WCAG AA ratio.",
        answerZh:
          "主数据系列使用一个品牌强调色（如 #3b82f6），分类色在保持相近明度的前提下旋转色相派生，每张图表最多 6 个系列。顺序型数据（热力图）应变化单一色相的明度而非混用多个色相。红色和绿色严格保留给负向/正向语义，并始终搭配图标或文字标签照顾色盲用户。网格线和坐标轴要低调：浅色主题下用 #e5e7eb 线条配 #6b7280 标签。所有文字与色块的组合都要通过 WCAG AA 的 4.5:1 对比度检测。",
      },
    ],
  },
  {
    slug: "landing-page",
    titleEn: "Landing Page Design Prompts",
    titleZh: "落地页设计提示词",
    descriptionEn: "AI prompts for creating high-converting landing pages with hero sections, feature grids, testimonials, and CTAs.",
    descriptionZh: "用于创建高转化落地页的 AI 提示词，涵盖 Hero 区块、功能网格、用户评价和 CTA。",
    keywords: [
      "landing page prompt",
      "hero section prompt",
      "landing page design AI",
      "website landing page prompt",
      "SaaS landing page prompt",
      "product landing page design",
    ],
    relatedStyleSlugs: [
      "hero-fullscreen",
      "apple-style",
      "stripe-style",
      "glassmorphism",
      "modern-gradient",
      "minimalist-flat",
    ],
    introEn:
      "Landing pages are single-purpose pages designed to convert visitors into users or customers. Effective landing pages follow a proven structure: a compelling hero section with a clear value proposition, social proof, feature highlights, and a strong call-to-action. The visual design should guide the eye downward through the page while maintaining a consistent brand feel.",
    introZh:
      "落地页是专为将访客转化为用户或客户而设计的单一目的页面。有效的落地页遵循经过验证的结构：引人注目的 Hero 区块配合清晰的价值主张、社会证明、功能亮点和有力的行动号召。视觉设计应引导视线沿页面向下移动，同时保持一致的品牌感。",
    prompts: [
      {
        titleEn: "SaaS Product Landing",
        titleZh: "SaaS 产品落地页",
        tool: "general",
        prompt:
          "Design a SaaS product landing page with these sections in order: 1) Hero with headline, subheadline, CTA button, and product screenshot. 2) Logo bar of trusted companies. 3) Three-column feature grid with icons. 4) Large product demo section with screenshot and feature callouts. 5) Pricing table with 3 tiers. 6) Testimonial carousel with photos and quotes. 7) FAQ accordion. 8) Final CTA section. Use a modern, clean design with generous whitespace.",
      },
      {
        titleEn: "Startup Landing for v0",
        titleZh: "v0 创业公司落地页",
        tool: "v0",
        prompt:
          "Create a modern startup landing page with shadcn/ui. Hero section with large heading, gradient text accent, subtext, two CTA buttons (primary + secondary), and a browser mockup image. Below: animated stats counter bar, 3-column feature cards with Lucide icons, a testimonial section with avatar + quote cards, and a dark footer with newsletter signup. Use Inter font, smooth scroll, and a purple-to-blue gradient accent.",
      },
      {
        titleEn: "Landing Page for Cursor",
        titleZh: "Cursor 落地页",
        tool: "cursor",
        prompt:
          "Build a Next.js landing page with Tailwind CSS and Framer Motion. Structure: sticky navbar with logo and CTA, full-viewport hero with animated gradient background and floating UI mockup, trust bar with grayscale logos, alternating left-right feature sections with images, pricing cards with popular plan highlighted, FAQ with accordion, and footer. Implement smooth scroll-triggered animations using Framer Motion's useInView.",
      },
      {
        titleEn: "Landing Page for Claude",
        titleZh: "Claude 落地页",
        tool: "claude",
        prompt:
          "Generate a complete landing page as a React component. Include: responsive hero with headline (48px desktop, 32px mobile), description paragraph, and primary CTA button. Feature section with 2x3 grid of cards, each with an icon, title, and description. Social proof section with company logos and a stat bar (e.g., '10K+ users'). Testimonial cards with star ratings. Final CTA with contrasting background color. All sections should have consistent max-w-6xl centering and py-24 spacing. Use Tailwind CSS.",
      },
      {
        titleEn: "Mobile App Waitlist Page",
        titleZh: "移动应用候补名单页",
        tool: "general",
        prompt:
          "Design a waitlist landing page for a mobile app. Single viewport-height hero: headline at 56px/1.1 in a variable-weight sans (Inter or Geist), subheadline at 18px #52525b, and an email capture form (input + button in one pill, 56px tall) as the only CTA. Right side shows a phone mockup at a slight -6 degree rotation with a soft #a78bfa glow. Palette: background #fafafa, text #18181b, accent violet #7c3aed. Below the fold: a 3-step 'How it works' row and a live counter of signups. Form needs a visible label, autocomplete=email, and a 2px focus ring at 3:1 contrast against the background.",
      },
      {
        titleEn: "Developer Tool Landing for v0",
        titleZh: "v0 开发者工具落地页",
        tool: "v0",
        prompt:
          "Create a landing page for a CLI developer tool with shadcn/ui. Dark hero: background #0a0a0a, headline 60px in Geist with a #22d3ee gradient accent on one word, and an install command block (JetBrains Mono 14px, background #171717, copy button with a 'Copied' toast). Below: a tabbed code demo (npm/pnpm/yarn), a 3-column feature grid with 20px Lucide icons, a terminal-style testimonial section, and GitHub star count badge. Section spacing py-24, max-w-5xl. Keep body text #a1a1aa at minimum 4.5:1 contrast and give the copy button an aria-label.",
      },
      {
        titleEn: "Ebook Lead Magnet Page for Cursor",
        titleZh: "Cursor 电子书引流页",
        tool: "cursor",
        prompt:
          "Build a Next.js landing page for a free ebook download. Two-column hero: left has an eyebrow label (13px uppercase tracking-wide #b45309), a 48px serif headline (Fraunces or Playfair Display), 5 bullet points with check icons of what readers learn, and a form (name + email, stacked, 48px inputs); right shows a 3D book cover mockup with a #fbbf24 back-glow. Palette: cream background #fffbeb, ink text #292524, amber accent #d97706. Add a testimonial strip with 3 quotes and an author bio section with a 96px round photo. Validate email inline with error text in #b91c1c plus an icon, and keep labels visible (no placeholder-only fields).",
      },
      {
        titleEn: "Agency Services Landing for Claude",
        titleZh: "Claude 服务机构落地页",
        tool: "claude",
        prompt:
          "Generate a design agency landing page as a React component. Structure: oversized hero headline at clamp(48px, 8vw, 96px) in a grotesque font with -0.03em letter-spacing, a marquee strip of client names, a services list as full-width rows (72px tall, border-t #e4e4e7) that expand on hover to reveal a description, a case study grid with 4:3 image cards and hover zoom (scale 1.03, 400ms ease-out), and a footer CTA reading 'Start a project' at 40px. Palette: white #ffffff, near-black #111111, one accent chartreuse #bef264 for hover states and selection. Respect prefers-reduced-motion by disabling the marquee and hover zoom.",
      },
    ],
    useCases: [
      {
        titleEn: "SaaS Product Launch",
        titleZh: "SaaS 产品发布",
        descriptionEn: "Introducing new software products with feature highlights and pricing.",
        descriptionZh: "发布新软件产品，展示功能亮点和定价。",
      },
      {
        titleEn: "App Download Page",
        titleZh: "App 下载页",
        descriptionEn: "Mobile app promotion with screenshots, reviews, and download links.",
        descriptionZh: "移动应用推广页，包含截图、评价和下载链接。",
      },
      {
        titleEn: "Event Registration",
        titleZh: "活动报名页",
        descriptionEn: "Conference or webinar landing pages with schedule, speakers, and signup form.",
        descriptionZh: "会议或网络研讨会落地页，包含日程、演讲者和报名表。",
      },
      {
        titleEn: "Portfolio Showcase",
        titleZh: "作品集展示",
        descriptionEn: "Personal or agency portfolio with project highlights and contact form.",
        descriptionZh: "个人或机构作品集，展示项目亮点和联系表单。",
      },
    ],
    faq: [
      {
        questionEn: "What is the best structure for a landing page?",
        questionZh: "落地页的最佳结构是什么？",
        answerEn:
          "The proven structure follows: Hero (headline + CTA) > Social Proof (logos/stats) > Features (3-6 highlights) > How It Works (3 steps) > Testimonials > Pricing > FAQ > Final CTA. Each section should have one clear purpose and guide visitors toward conversion.",
        answerZh:
          "经过验证的结构为：Hero（标题 + CTA）> 社会证明（Logo/数据）> 功能亮点（3-6 项）> 使用流程（3 步）> 用户评价 > 定价 > FAQ > 最终 CTA。每个区块应有一个明确目的，引导访客走向转化。",
      },
      {
        questionEn: "How to design a hero section for a landing page?",
        questionZh: "如何设计落地页的 Hero 区块？",
        answerEn:
          "A high-converting hero needs: a clear, benefit-driven headline (6-12 words), a supporting subheadline explaining how, a prominent CTA button with contrasting color, and a visual element (screenshot, illustration, or video). Keep the hero above the fold and limit text to essential information only.",
        answerZh:
          "高转化的 Hero 需要：清晰的利益驱动标题（6-12 个词）、解释方法的副标题、醒目的对比色 CTA 按钮、以及视觉元素（截图、插图或视频）。保持 Hero 在首屏可见，文字仅保留必要信息。",
      },
      {
        questionEn: "Which AI tools generate landing pages?",
        questionZh: "哪些 AI 工具能生成落地页？",
        answerEn:
          "v0 by Vercel excels at generating full landing pages with shadcn/ui components. Cursor and Claude can generate complete page code with animations and responsive design. StyleKit provides style-consistent design tokens and prompts that work across all these tools, ensuring your generated pages look professional rather than generic.",
        answerZh:
          "Vercel 的 v0 擅长生成基于 shadcn/ui 的完整落地页。Cursor 和 Claude 能生成包含动画和响应式设计的完整页面代码。StyleKit 提供风格一致的 design tokens 和提示词，兼容所有这些工具，确保生成的页面看起来专业而非千篇一律。",
      },
      {
        questionEn: "How to make a landing page convert better?",
        questionZh: "如何提高落地页的转化率？",
        answerEn:
          "Key conversion tactics: use a single, clear CTA per section; add social proof near CTAs; reduce form fields to the minimum; use directional cues (arrows, eye gaze in photos) pointing toward CTAs; ensure page loads under 3 seconds; and A/B test headlines and button copy. Mobile optimization is critical since most traffic is mobile.",
        answerZh:
          "关键转化策略：每个区块使用单一、清晰的 CTA；在 CTA 附近添加社会证明；将表单字段减到最少；使用方向线索（箭头、照片中的视线）指向 CTA；确保页面 3 秒内加载完成；A/B 测试标题和按钮文案。移动端优化至关重要，因为大部分流量来自手机。",
      },
      {
        questionEn: "How long should a landing page be?",
        questionZh: "落地页应该做多长？",
        answerEn:
          "Match length to commitment level. For a free signup or waitlist, a short page (hero + 3 features + CTA, roughly 1-2 screens) converts best because the ask is small. For paid products above roughly 50 USD/month, longer pages of 6-8 sections outperform because visitors need objections answered: add testimonials, a comparison table, security badges, and an FAQ. A practical rule: every extra section must answer a real objection, not repeat the pitch. Track scroll depth — if 80% of visitors never reach a section, cut it or move it up.",
        answerZh:
          "页面长度要匹配用户的决策成本。免费注册或候补名单类，短页面（Hero + 3 个功能点 + CTA，约 1-2 屏）转化最好，因为用户付出的成本很小。对约 50 美元/月以上的付费产品，6-8 个区块的长页面表现更好，因为访客需要打消疑虑：加入用户评价、对比表格、安全认证徽章和 FAQ。实用原则：每增加一个区块都必须回应一个真实的顾虑，而不是重复卖点。追踪滚动深度——如果 80% 的访客到不了某个区块，就删掉它或往上移。",
      },
      {
        questionEn: "What font sizes should I use on a landing page?",
        questionZh: "落地页应该使用多大的字号？",
        answerEn:
          "A dependable scale: hero headline clamp(36px, 6vw, 64px) with 1.1 line-height and -0.02em letter-spacing; section headings 30-36px; card titles 18-20px; body text 16-18px with 1.6 line-height; captions and eyebrows 13-14px. Never let body text drop below 16px on mobile — it hurts readability and iOS zooms form inputs under 16px. Keep line length at 60-75 characters using max-w-prose or max-w-2xl. Use font weight (600-700 for headings, 400 for body) rather than more sizes to build hierarchy; two weights and five sizes cover an entire page.",
        answerZh:
          "一套可靠的字号体系：Hero 标题 clamp(36px, 6vw, 64px)，行高 1.1，字距 -0.02em；区块标题 30-36px；卡片标题 18-20px；正文 16-18px，行高 1.6；说明文字和眉标 13-14px。移动端正文永远不要低于 16px——既影响可读性，iOS 还会对小于 16px 的表单输入自动缩放。用 max-w-prose 或 max-w-2xl 把行长控制在 60-75 字符。层级靠字重（标题 600-700、正文 400）而不是堆更多字号；两个字重加五个字号就能覆盖整个页面。",
      },
    ],
  },
  {
    slug: "dark-mode",
    titleEn: "Dark Mode Design Prompts",
    titleZh: "暗黑模式设计提示词",
    descriptionEn: "AI prompts for designing elegant dark-themed interfaces with proper contrast, color hierarchy, and readability.",
    descriptionZh: "用于设计优雅暗色主题界面的 AI 提示词，涵盖对比度、色彩层级和可读性。",
    keywords: [
      "dark mode UI prompt",
      "dark theme design prompt",
      "dark mode website prompt",
      "dark UI design system",
      "dark mode Tailwind",
      "dark interface design",
    ],
    relatedStyleSlugs: [
      "dark-mode",
      "cyberpunk-neon",
      "neon-tokyo",
      "film-noir",
      "gothic",
      "dark-academia",
    ],
    introEn:
      "Dark mode design is more than inverting colors. It requires careful attention to surface elevation (using lighter shades of dark for raised elements), reduced saturation for colored elements, proper contrast ratios (minimum 4.5:1 for text), and strategic use of accent colors. A well-executed dark mode reduces eye strain in low-light environments while maintaining visual hierarchy and readability.",
    introZh:
      "暗黑模式设计不仅是反转颜色。它需要仔细处理表面层级（用较浅的暗色表示抬升元素）、降低彩色元素的饱和度、确保适当的对比度（文字至少 4.5:1）、以及策略性地使用强调色。优秀的暗黑模式在低光环境下减轻眼疲劳，同时保持视觉层级和可读性。",
    prompts: [
      {
        titleEn: "Dark Mode Dashboard",
        titleZh: "暗黑模式仪表盘",
        tool: "general",
        prompt:
          "Design a dark mode analytics dashboard. Background colors: #0a0a0a for base, #141414 for cards, #1e1e1e for elevated elements. Text: #f5f5f5 for primary, #a3a3a3 for secondary. Use a single accent color (blue #3b82f6) for interactive elements and data highlights. Cards should have subtle 1px borders in #262626. Charts should use the accent color with varying opacity for data series. Ensure all text meets WCAG AA contrast standards.",
      },
      {
        titleEn: "Dark Theme App for v0",
        titleZh: "v0 暗色主题应用",
        tool: "v0",
        prompt:
          "Build a dark-themed web application using shadcn/ui with the dark color scheme. Include a sidebar navigation with icons, a main content area with card-based layout, and a top bar. Use zinc-950 for the base background, zinc-900 for cards, and zinc-800 for hover states. Primary accent in blue-500. Include a settings page with a theme toggle switch. All text should use zinc-100 for headings and zinc-400 for body text.",
      },
      {
        titleEn: "Dark Mode for Cursor",
        titleZh: "Cursor 暗色主题",
        tool: "cursor",
        prompt:
          "Create a Next.js app with dark mode as default. Use CSS custom properties for theming: --background: 0 0% 4%; --card: 0 0% 8%; --border: 0 0% 15%; --foreground: 0 0% 96%; --muted: 0 0% 64%; --accent: 217 91% 60%. Implement proper surface elevation: each layer gets progressively lighter. Use Tailwind dark: variants throughout. Include a smooth theme toggle animation.",
      },
      {
        titleEn: "Dark Mode for Claude",
        titleZh: "Claude 暗色主题",
        tool: "claude",
        prompt:
          "Generate a React component library with dark mode first design. Create: Card, Button, Input, Badge, Table, and Modal components. Each component must use CSS custom properties for colors so they work in both dark and light themes. Dark palette: background #09090b, surface #18181b, border #27272a, text #fafafa, muted #a1a1aa. Light palette: background #ffffff, surface #f4f4f5, border #e4e4e7, text #09090b, muted #71717a. Use Tailwind CSS with the dark: modifier.",
      },
      {
        titleEn: "Dark Mode SaaS Landing Page",
        titleZh: "暗黑模式 SaaS 落地页",
        tool: "general",
        prompt:
          "Design a dark mode SaaS landing page with a hero, feature grid, testimonial strip, and pricing CTA. Palette: base background #09090b, alternate section #101013, cards #18181b with 1px borders #27272a. Text: #fafafa for headings, #d4d4d8 for body, #a1a1aa for captions. Use a single accent emerald #10b981 only for the primary CTA, the logo mark, and one highlighted metric per section. Hero headline at 64px with 1.05 line-height and a subtle radial glow behind the accent word. All text must pass WCAG AA contrast.",
      },
      {
        titleEn: "Dark Mode Mobile App for ChatGPT",
        titleZh: "ChatGPT 暗黑模式移动应用",
        tool: "general",
        prompt:
          "Design a dark mode mobile app UI for a habit tracker. Use a true dark palette: background #0b0b0f, surface #15151c, raised surface #1d1d27. Bottom tab bar with 4 icons: active tab in accent violet #8b5cf6, inactive tabs at 40% opacity. Cards have 16px radius and a soft inner highlight (1px top border rgba(255,255,255,0.06)) instead of heavy shadows. Progress rings use the accent over a 12% opacity track. Typography: 17px body, 28px semibold titles. Keep all interactive elements at 44px minimum touch targets and body text at 87% opacity.",
      },
      {
        titleEn: "Dark Mode Login Page for Claude",
        titleZh: "Claude 暗黑模式登录页",
        tool: "claude",
        prompt:
          "Generate a React dark mode authentication page with login and signup states toggled in place. Split layout: the left panel shows a subtle animated gradient (deep blue #1e3a8a fading to black) with the product tagline; the right panel holds the form on background #0a0a0a. Inputs: background #171717, border #262626, focus ring 2px in accent amber #f59e0b, floating labels #a3a3a3. The primary button uses the amber accent with #0a0a0a text; social login buttons are outline style with #404040 borders. Include inline validation states (error #ef4444, success #22c55e) and ensure all form text meets 4.5:1 contrast.",
      },
      {
        titleEn: "Dark Mode Pricing Page for Cursor",
        titleZh: "Cursor 暗黑模式定价页",
        tool: "cursor",
        prompt:
          "Build a Next.js dark mode pricing page with three tiers using Tailwind. Page background #050505, tier cards #111111 with border #1f1f1f. Highlight the middle Pro tier: scale-105, border in accent orange #f97316, and a small Most Popular badge. Price numerals use tabular-nums at 48px; feature lists use check icons in the accent at 70% opacity. Add a monthly/yearly billing toggle with a smooth sliding indicator; yearly prices show the strikethrough monthly equivalent in #525252. Place an FAQ accordion below the tiers with border-t dividers #1f1f1f. All text must be WCAG AA compliant.",
      },
    ],
    useCases: [
      {
        titleEn: "Developer Tools",
        titleZh: "开发者工具",
        descriptionEn: "Code editors, terminal UIs, and dev dashboards where dark mode reduces eye strain during long sessions.",
        descriptionZh: "代码编辑器、终端 UI 和开发者仪表盘，暗色模式在长时间使用时减轻眼疲劳。",
      },
      {
        titleEn: "Media & Entertainment",
        titleZh: "媒体娱乐",
        descriptionEn: "Streaming platforms, music players, and video apps where dark backgrounds make content pop.",
        descriptionZh: "流媒体平台、音乐播放器和视频应用，暗色背景让内容更突出。",
      },
      {
        titleEn: "Finance Apps",
        titleZh: "金融应用",
        descriptionEn: "Trading platforms and banking apps where dark themes convey sophistication and reduce distraction.",
        descriptionZh: "交易平台和银行应用，暗色主题传递精致感并减少干扰。",
      },
      {
        titleEn: "Night-Mode Reading",
        titleZh: "夜间阅读模式",
        descriptionEn: "Reading apps and blogs where dark mode improves comfort in low-light environments.",
        descriptionZh: "阅读应用和博客，暗色模式在低光环境下提升舒适度。",
      },
    ],
    faq: [
      {
        questionEn: "What is dark mode UI design?",
        questionZh: "什么是暗黑模式 UI 设计？",
        answerEn:
          "Dark mode UI design uses dark backgrounds (typically #0a0a0a to #1a1a1a) with light text and carefully chosen accent colors. Unlike simply inverting a light theme, proper dark mode requires adjusting color saturation, using surface elevation through subtle lightness differences, and ensuring all text meets WCAG AA contrast ratios (4.5:1 minimum).",
        answerZh:
          "暗黑模式 UI 设计使用深色背景（通常 #0a0a0a 至 #1a1a1a）配合浅色文字和精心选择的强调色。与简单反转浅色主题不同，正确的暗黑模式需要调整色彩饱和度、通过微妙的明度差异实现表面层级、并确保所有文字满足 WCAG AA 对比度标准（最低 4.5:1）。",
      },
      {
        questionEn: "How to implement dark mode in Tailwind CSS?",
        questionZh: "如何在 Tailwind CSS 中实现暗黑模式？",
        answerEn:
          "Tailwind supports dark mode via the 'dark:' variant. Set darkMode: 'class' in tailwind.config to toggle with a class, or 'media' for system preference. Use CSS custom properties (--background, --foreground) to define theme colors, then reference them in Tailwind config. Toggle by adding/removing the 'dark' class on the html element.",
        answerZh:
          "Tailwind 通过 'dark:' 变体支持暗黑模式。在 tailwind.config 中设置 darkMode: 'class' 通过类名切换，或 'media' 跟随系统偏好。用 CSS 自定义属性（--background, --foreground）定义主题色，然后在 Tailwind 配置中引用。通过在 html 元素上添加/移除 'dark' 类来切换。",
      },
      {
        questionEn: "What are the common mistakes in dark mode design?",
        questionZh: "暗黑模式设计常见错误有哪些？",
        answerEn:
          "Common mistakes: using pure black (#000) backgrounds (causes halation on OLED), insufficient contrast between surface layers, using the same saturation as light mode (colors look too intense on dark backgrounds), white text at full opacity (use 87% opacity for body text), and not adjusting shadows (use lighter, more diffused shadows or subtle borders instead).",
        answerZh:
          "常见错误：使用纯黑（#000）背景（在 OLED 上造成光晕）、表面层之间对比度不足、使用与浅色模式相同的饱和度（颜色在暗色背景上看起来过于刺眼）、白色文字使用 100% 不透明度（正文应使用 87%）、不调整阴影（应使用更浅更分散的阴影或微妙的边框代替）。",
      },
      {
        questionEn: "Should I design dark mode first or light mode first?",
        questionZh: "应该先设计暗黑模式还是浅色模式？",
        answerEn:
          "For developer tools, media apps, and creative platforms, consider dark-first design. For business, e-commerce, and content-heavy sites, light-first is usually better. The key is to design both simultaneously using CSS custom properties / design tokens, so neither mode is an afterthought. StyleKit provides dual-mode tokens for all styles.",
        answerZh:
          "对于开发者工具、媒体应用和创意平台，可以考虑暗色优先。对于商务、电商和内容密集型网站，通常浅色优先更好。关键是使用 CSS 自定义属性 / design tokens 同时设计两种模式，让两者都不是事后补充。StyleKit 为所有风格提供双模式 tokens。",
      },
      {
        questionEn: "What colors work best for dark mode backgrounds?",
        questionZh: "暗黑模式背景用什么颜色最好？",
        answerEn:
          "Avoid pure black (#000000) for large backgrounds — it causes halation on OLED screens and makes elevation impossible. Use a near-black range instead: #0a0a0a to #121212 for the base layer, then raise surfaces in steps (#181818, #1e1e1e, #242424). If you want warmth, add 2-4% of a hue: a blue-tinted dark like #0b0d12 feels cooler, a warm dark like #12100e feels softer. Reserve saturated colors for accents only, and desaturate them 15-20% compared to light mode.",
        answerZh:
          "大面积背景避免使用纯黑（#000000）——在 OLED 屏幕上会产生光晕，且无法实现层级。改用近黑区间：基础层用 #0a0a0a 至 #121212，然后按阶梯抬升表面（#181818、#1e1e1e、#242424）。想要温度感可以加入 2-4% 的色相：带蓝的暗色如 #0b0d12 更冷峻，暖暗色如 #12100e 更柔和。饱和色只留给强调色，且相比浅色模式降低 15-20% 饱和度。",
      },
      {
        questionEn: "How do I make dark mode accessible (WCAG)?",
        questionZh: "如何让暗黑模式满足 WCAG 无障碍标准？",
        answerEn:
          "Three rules cover most failures: body text needs 4.5:1 contrast (large text 3:1) against its surface — on a #121212 background that means at least #a7a7a7; never use pure white at 100% opacity for long body text, 87% opacity (#ffffffde) reduces glare while staying compliant; and do not rely on color alone for states — pair error red with an icon or text label, since 8% of men have some color vision deficiency. Test with the prefers-contrast media query and provide a high-contrast variant if your accent gets close to the limit.",
        answerZh:
          "三条规则覆盖大多数问题：正文文字相对所在表面需要 4.5:1 对比度（大文字 3:1）——在 #121212 背景上意味着至少 #a7a7a7；长正文不要用 100% 不透明度纯白，87% 不透明度（#ffffffde）既减少眩光又保持合规；状态不能仅靠颜色区分——错误红要搭配图标或文字标签，因为 8% 的男性有不同程度的色觉缺陷。用 prefers-contrast 媒体查询测试，如果强调色接近临界值就提供高对比度变体。",
      },
    ],
  },
  {
    slug: "glassmorphism",
    titleEn: "Glassmorphism Design Prompts",
    titleZh: "玻璃拟态设计提示词",
    descriptionEn: "AI prompts for creating frosted glass UI effects with backdrop-blur, transparency, and layered depth.",
    descriptionZh: "用于创建毛玻璃 UI 效果的 AI 提示词，涵盖 backdrop-blur、透明度和层叠深度。",
    keywords: [
      "glassmorphism prompt",
      "glass effect CSS prompt",
      "frosted glass UI",
      "glassmorphism Tailwind",
      "backdrop blur design",
      "glass card design prompt",
    ],
    relatedStyleSlugs: [
      "glassmorphism",
      "liquid-glass",
      "holographic",
      "soft-ui",
      "modern-gradient",
    ],
    introEn:
      "Glassmorphism creates a frosted glass effect using CSS backdrop-filter: blur(), semi-transparent backgrounds, and subtle borders. Popularized by Apple's macOS and iOS interfaces, this style creates depth through layered translucent surfaces. The key to effective glassmorphism is a vibrant background (gradient or image) that shows through the blurred glass, creating visual richness without visual clutter.",
    introZh:
      "玻璃拟态通过 CSS backdrop-filter: blur()、半透明背景和微妙边框创造毛玻璃效果。由 Apple 的 macOS 和 iOS 界面推广，这种风格通过层叠半透明表面创造深度感。有效玻璃拟态的关键是有一个活跃的背景（渐变或图像），透过模糊的玻璃层显现，在不造成视觉杂乱的情况下创造视觉丰富度。",
    prompts: [
      {
        titleEn: "Glass Card Layout",
        titleZh: "玻璃卡片布局",
        tool: "general",
        prompt:
          "Create a glassmorphism card layout over a gradient background. Background: linear-gradient from #667eea to #764ba2. Cards: background rgba(255,255,255,0.15), backdrop-filter blur(12px), border 1px solid rgba(255,255,255,0.2), border-radius 16px. Each card contains an icon, title, and description. Arrange in a 3-column responsive grid. Add subtle box-shadow for depth. Text in white with varying opacity for hierarchy.",
      },
      {
        titleEn: "Glass Dashboard for v0",
        titleZh: "v0 玻璃仪表盘",
        tool: "v0",
        prompt:
          "Build a glassmorphism dashboard using shadcn/ui. Background with a mesh gradient (purple, blue, teal). All cards use backdrop-blur-xl with bg-white/10 borders border-white/20. Include: floating stat cards, a glass navigation bar at the top, and a profile dropdown with glass effect. Use rounded-2xl for all containers. Text hierarchy through white text opacity levels: headings 100%, body 80%, muted 50%.",
      },
      {
        titleEn: "Apple Liquid Glass for Cursor",
        titleZh: "Cursor Apple 液态玻璃",
        tool: "cursor",
        prompt:
          "Implement an Apple-inspired liquid glass design system in Next.js with Tailwind. Create a glass() utility that applies: bg-white/10 dark:bg-black/10, backdrop-blur-2xl, border border-white/20, shadow-lg. Build a modal, dropdown, sidebar, and tooltip using this glass treatment. The background should be a gradient with floating colored orbs (CSS radial-gradient) that create dynamic color through the glass effect.",
      },
      {
        titleEn: "Glass UI for Claude",
        titleZh: "Claude 玻璃 UI",
        tool: "claude",
        prompt:
          "Generate React components with glassmorphism styling. Create GlassCard, GlassButton, GlassInput, GlassModal, and GlassNavbar components. Each uses: backdrop-filter: blur(16px), background: rgba(255,255,255,0.1), border: 1px solid rgba(255,255,255,0.18). Include hover states that increase background opacity. Support both light glass (white-based) and dark glass (black-based) variants. Use Tailwind CSS with custom utility classes.",
      },
      {
        titleEn: "Glass Music Player",
        titleZh: "玻璃质感音乐播放器",
        tool: "general",
        prompt:
          "Design a glassmorphism music player card. The album art fills the card background; the control panel sits on top as a glass layer: background rgba(255,255,255,0.12), backdrop-filter blur(20px) saturate(160%), border 1px solid rgba(255,255,255,0.25), border-radius 24px. Progress bar: 4px track at rgba(255,255,255,0.2) with a solid #ffffff fill and a 12px thumb. Track title 18px semibold white, artist 14px at 70% opacity. Play button: 56px solid white circle with dark icon for contrast; skip buttons are glass circles. Ensure all controls have aria-labels and at least 44px touch targets, and keep text over blur at 4.5:1 contrast by darkening the glass behind it if needed.",
      },
      {
        titleEn: "Glass Pricing Cards for v0",
        titleZh: "v0 玻璃定价卡片",
        tool: "v0",
        prompt:
          "Build a glassmorphism pricing section with shadcn/ui. Background: a fixed mesh gradient of #7c3aed, #2563eb, and #0ea5e9 orbs on #0f0a1e. Three tier cards: backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8, with the Pro tier using bg-white/15 and a brighter border-white/40 plus a solid white CTA button with #1e1b4b text. Price at 48px tabular-nums in white, features as a list with check icons at 80% opacity. Card hover lifts with translate-y-1 and increases background to /15 over 200ms. Keep body copy at white/85 minimum for contrast and give the section a solid fallback background via @supports not (backdrop-filter: blur(1px)).",
      },
      {
        titleEn: "Glass Onboarding Flow for Cursor",
        titleZh: "Cursor 玻璃引导流程",
        tool: "cursor",
        prompt:
          "Create a 3-step onboarding flow in Next.js with a glassmorphism panel centered over an animated gradient (conic-gradient rotating slowly between #f472b6, #818cf8, #34d399, 30s linear, paused under prefers-reduced-motion). Panel: 480px wide, rgba(255,255,255,0.08) with blur(24px), 1px rgba(255,255,255,0.18) border, 28px radius, 40px padding. Step indicator: three 8px dots, active dot stretches to a 24px pill in white. Inputs are darker glass (rgba(0,0,0,0.2)) so white text hits 4.5:1, with white/90 labels above, never placeholder-only. Buttons: primary solid white with dark text, secondary glass outline. Animate step transitions with a 250ms fade and 16px slide.",
      },
      {
        titleEn: "Glass Weather Widget for Claude",
        titleZh: "Claude 玻璃天气组件",
        tool: "claude",
        prompt:
          "Generate a React weather widget with glassmorphism styling and TypeScript props for condition, temperature, and hourly forecast. Container: 360px card, background rgba(255,255,255,0.14), backdrop-filter blur(18px), border 1px solid rgba(255,255,255,0.28), border-radius 20px, over a sky gradient that shifts by condition (clear: #38bdf8 to #0369a1; night: #1e293b to #020617). Temperature at 64px light weight, condition label 16px at 85% opacity, hourly row of 6 glass chips (rgba(255,255,255,0.1), 12px radius) with 13px labels. Use SVG weather icons with 1.5px white strokes. Include role=region with an aria-label like 'Current weather', and a solid rgba(30,41,59,0.9) fallback when backdrop-filter is unsupported.",
      },
    ],
    useCases: [
      {
        titleEn: "Music & Media Players",
        titleZh: "音乐媒体播放器",
        descriptionEn: "Album art shows through glass controls, creating an immersive listening experience.",
        descriptionZh: "专辑封面透过玻璃控件显现，创造沉浸式听觉体验。",
      },
      {
        titleEn: "Weather Apps",
        titleZh: "天气应用",
        descriptionEn: "Weather conditions visible through glass overlays with dynamic sky backgrounds.",
        descriptionZh: "天气状况通过玻璃覆层可见，配合动态天空背景。",
      },
      {
        titleEn: "Hero Overlays",
        titleZh: "Hero 覆层",
        descriptionEn: "Glass cards floating over hero images or video backgrounds on landing pages.",
        descriptionZh: "玻璃卡片浮在落地页的 Hero 图片或视频背景之上。",
      },
      {
        titleEn: "macOS/iOS-Style Apps",
        titleZh: "macOS/iOS 风格应用",
        descriptionEn: "Desktop and mobile apps that follow Apple's design language with translucent panels.",
        descriptionZh: "遵循 Apple 设计语言的桌面和移动应用，使用半透明面板。",
      },
    ],
    faq: [
      {
        questionEn: "What is glassmorphism in web design?",
        questionZh: "什么是网页设计中的玻璃拟态？",
        answerEn:
          "Glassmorphism is a design style that mimics frosted glass using CSS backdrop-filter: blur(), semi-transparent backgrounds (rgba), and subtle light borders. It creates depth through layered translucent surfaces over vibrant backgrounds. The effect became mainstream through Apple's macOS Big Sur and iOS design updates.",
        answerZh:
          "玻璃拟态是一种模拟毛玻璃的设计风格，使用 CSS backdrop-filter: blur()、半透明背景（rgba）和微妙的亮色边框。它通过在活跃背景上层叠半透明表面来创造深度感。这种效果通过 Apple 的 macOS Big Sur 和 iOS 设计更新而成为主流。",
      },
      {
        questionEn: "How to create glassmorphism with Tailwind CSS?",
        questionZh: "如何用 Tailwind CSS 创建玻璃拟态？",
        answerEn:
          "Use these Tailwind classes: 'backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg'. For dark glass: 'backdrop-blur-xl bg-black/10 border border-white/10'. The key is having a colorful background behind the glass element. Add 'backdrop-saturate-150' for richer color bleed-through.",
        answerZh:
          "使用这些 Tailwind 类：'backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg'。暗色玻璃：'backdrop-blur-xl bg-black/10 border border-white/10'。关键是在玻璃元素后面要有彩色背景。添加 'backdrop-saturate-150' 获得更丰富的色彩透出。",
      },
      {
        questionEn: "Does glassmorphism affect performance?",
        questionZh: "玻璃拟态会影响性能吗？",
        answerEn:
          "backdrop-filter can impact rendering performance, especially with large blur values on mobile devices. Mitigation strategies: limit blur to 12-20px, avoid nesting multiple glass layers, use will-change: transform on glass elements, and provide a solid-color fallback for browsers that don't support backdrop-filter. Modern browsers handle it well for typical use cases.",
        answerZh:
          "backdrop-filter 可能影响渲染性能，尤其是在移动设备上使用大模糊值时。缓解策略：限制模糊值为 12-20px、避免嵌套多个玻璃层、在玻璃元素上使用 will-change: transform、为不支持 backdrop-filter 的浏览器提供纯色回退。现代浏览器在典型使用场景下处理良好。",
      },
      {
        questionEn: "How much backdrop blur should I use for glassmorphism?",
        questionZh: "玻璃拟态的 backdrop blur 应该用多大？",
        answerEn:
          "The sweet spot is blur(12px) to blur(24px). Below 8px the background stays legible and competes with foreground text; above 30px the surface reads as solid frosted plastic and you lose the glass illusion while paying the full rendering cost. Scale with element size: small chips and buttons look right at 10-12px, cards at 16-20px, full-screen modals and navbars at 20-24px. Pair blur with saturate(150%-180%) so colors bleeding through stay vivid instead of washing out gray. On mobile, drop one step (e.g. 20px to 12px) to protect frame rate.",
        answerZh:
          "最佳区间是 blur(12px) 到 blur(24px)。低于 8px 时背景仍然清晰可辨，会和前景文字抢注意力；超过 30px 表面就像不透明的磨砂塑料，玻璃错觉消失了，渲染开销却一分不少。按元素尺寸调整：小型标签和按钮 10-12px 合适，卡片 16-20px，全屏弹窗和导航栏 20-24px。将 blur 与 saturate(150%-180%) 搭配，让透出的色彩保持鲜活而不是发灰。移动端整体降一档（如 20px 降到 12px）以保住帧率。",
      },
      {
        questionEn: "Why does my glassmorphism effect look muddy or invisible?",
        questionZh: "为什么我的玻璃拟态效果看起来浑浊或没有效果？",
        answerEn:
          "Three usual causes. First, the background is too flat: glass needs a colorful gradient or image behind it — over solid white or gray, blur has nothing to diffuse, so add gradient orbs or a mesh background. Second, the fill opacity is wrong: rgba(255,255,255,0.4) or higher hides the background entirely; stay in the 0.08-0.2 range. Third, the border is missing: the 1px solid rgba(255,255,255,0.2) edge is what sells the pane of glass — without it, the card melts into the backdrop. Also confirm backdrop-filter is not being ignored because an ancestor sets overflow with a transform, which breaks it in some browsers.",
        answerZh:
          "常见原因有三个。第一，背景太平：玻璃需要背后有彩色渐变或图像——在纯白或纯灰上，blur 没有东西可以扩散，应加入渐变光斑或 mesh 背景。第二，填充不透明度不对：rgba(255,255,255,0.4) 以上会完全遮住背景，应保持在 0.08-0.2 区间。第三，缺少边框：1px solid rgba(255,255,255,0.2) 的边缘正是「玻璃片」质感的来源——没有它卡片会融进背景里。另外确认 backdrop-filter 没有失效：某些浏览器中祖先元素同时设置 overflow 和 transform 会破坏该属性。",
      },
    ],
  },
  {
    slug: "minimalist",
    titleEn: "Minimalist Design Prompts",
    titleZh: "极简设计提示词",
    descriptionEn: "AI prompts for clean, content-focused interfaces with generous whitespace, restrained typography, and subtle interactions.",
    descriptionZh: "用于创建简洁、内容聚焦界面的 AI 提示词，涵盖充足留白、克制排版和微妙交互。",
    keywords: [
      "minimalist web design prompt",
      "minimal UI prompt",
      "clean website design prompt",
      "simple web design AI",
      "whitespace design prompt",
      "minimalist Tailwind",
    ],
    relatedStyleSlugs: [
      "minimalist-flat",
      "scandinavian",
      "wabi-sabi",
      "zen-garden",
      "korean-minimal",
      "monochrome",
    ],
    introEn:
      "Minimalist design strips away decorative elements to let content speak for itself. It relies on typography, whitespace, and subtle contrast rather than heavy graphics or complex layouts. The challenge is achieving visual interest with fewer elements. Each design decision must be intentional: every pixel of spacing, every font weight choice, and every color use should serve a clear purpose.",
    introZh:
      "极简设计去除装饰性元素，让内容自己说话。它依靠排版、留白和微妙的对比度，而非沉重的图形或复杂的布局。挑战在于用更少的元素达到视觉趣味。每一个设计决策都必须有意图：每一像素的间距、每一个字重选择、每一次色彩使用都应服务于明确的目的。",
    prompts: [
      {
        titleEn: "Minimal Portfolio",
        titleZh: "极简作品集",
        tool: "general",
        prompt:
          "Design a minimalist portfolio website. Use a single-column layout, max-width 680px centered. Typography: system serif font for headings, system sans-serif for body, generous line-height (1.8). Color: only black text on white background, with a single accent color for links. Navigation: just 3-4 text links in the header. Project section: image + title + one-line description. Footer: just name and email. No borders, no shadows, no icons. Let the whitespace and typography do all the work.",
      },
      {
        titleEn: "Minimal Blog for v0",
        titleZh: "v0 极简博客",
        tool: "v0",
        prompt:
          "Create a minimal blog layout with shadcn/ui. Single-column content area (max-w-2xl, centered). Header with site name (text only, no logo) and 3 nav links. Post list showing title, date, and a 2-line excerpt. Post page with large serif heading, metadata line, and prose content using the Tailwind Typography plugin. Footer with just copyright text. Entire palette: zinc-950 text, zinc-50 background, zinc-400 for muted text. No cards, no shadows, no decorative elements.",
      },
      {
        titleEn: "Minimal App for Cursor",
        titleZh: "Cursor 极简应用",
        tool: "cursor",
        prompt:
          "Build a minimalist note-taking app in Next.js. Design principles: single sans-serif font family (Inter), 4px base grid, only 3 colors (black, white, one muted gray), no box shadows, no rounded corners larger than 4px, 1px borders only where essential. Layout: narrow sidebar (200px) with text-only navigation, main editor area with generous padding (48px). Transitions: only opacity and transform, 200ms duration. Every element should feel purposeful and calm.",
      },
      {
        titleEn: "Minimal Design for Claude",
        titleZh: "Claude 极简设计",
        tool: "claude",
        prompt:
          "Generate a React component library with strict minimalist principles. Components: Page, Section, Heading, Text, Link, List, Image, Divider. Constraints: maximum 2 font sizes per component, no box shadows, no gradients, border-radius max 4px, only black/white/gray palette. Section spacing should follow a consistent scale (16, 32, 48, 64, 96px). Include a prose/article layout component optimized for long-form reading with comfortable line length (60-75 characters).",
      },
      {
        titleEn: "Minimal Product Landing",
        titleZh: "极简产品落地页",
        tool: "general",
        prompt:
          "Design a minimalist landing page for a single hardware product. Structure: a text-only header (product name left, one Buy link right), a hero that is just the product photo on #fafafa with 120px of vertical padding, one headline at 40px medium weight in Suisse-style grotesque (Inter works), and a 18px #525252 paragraph capped at 55 characters per line. Below: a specs list as a two-column definition table with 1px #e5e5e5 row dividers and 20px row padding, then a single centered black CTA button (#111111, white text, no radius). No icons, no cards, no gradients. Total palette: #fafafa, #111111, #525252, #e5e5e5.",
      },
      {
        titleEn: "Minimal Pricing Page for v0",
        titleZh: "v0 极简定价页",
        tool: "v0",
        prompt:
          "Create a minimalist pricing page with shadcn/ui. Two plans only, presented as side-by-side columns separated by a single 1px vertical zinc-200 divider — no cards, no borders around plans. Plan name 14px uppercase tracking-widest zinc-500, price 56px light weight zinc-950 with 16px /month suffix, features as a plain list with 12px gaps and en-dashes instead of check icons. One black button per plan (the free plan gets an outline button). Page: max-w-3xl centered, 96px top padding, background white. Add a single-line FAQ link at the bottom in zinc-500 underlined. Ensure focus states use a visible 2px zinc-950 outline.",
      },
      {
        titleEn: "Minimal Docs Site for Cursor",
        titleZh: "Cursor 极简文档站",
        tool: "cursor",
        prompt:
          "Build a minimalist documentation site in Next.js. Left sidebar: 220px, text-only links at 14px, current page marked by weight (600) and color #111111 versus #737373 — no background pills. Content: max-w-2xl, 17px/1.75 body in a humanist sans, headings only two sizes (28px and 20px), code blocks in 14px JetBrains Mono on #f5f5f5 with no border and 4px radius. Links underlined with text-underline-offset 3px, one accent #2563eb used only for links. Spacing scale strictly 8/16/24/40/64px. Include keyboard-accessible skip-to-content link and a search input styled as a bare 1px-underline field.",
      },
      {
        titleEn: "Minimal Mobile Habit App for Claude",
        titleZh: "Claude 极简移动习惯应用",
        tool: "claude",
        prompt:
          "Generate a minimalist mobile habit tracker screen as a React component. Background #ffffff, one accent #16a34a used solely for completed states. Header: the date in 15px #737373 over a 32px medium-weight greeting. Habit list: full-width rows 64px tall separated by 1px #f0f0f0 hairlines, each with habit name 17px #111111 and a 28px tap-to-complete circle outline that fills with the accent and a checkmark on completion (150ms ease-out scale). No cards, no shadows, no tab bar icons with labels removed — keep 11px labels under the 3 tab icons for accessibility. All touch targets at least 44px; completed state must also show a strikethrough so color is not the only indicator.",
      },
    ],
    useCases: [
      {
        titleEn: "Writer's Portfolio",
        titleZh: "作家作品集",
        descriptionEn: "Clean, reading-focused layouts that put writing front and center.",
        descriptionZh: "干净、阅读聚焦的布局，让写作内容成为绝对主角。",
      },
      {
        titleEn: "Photography Portfolio",
        titleZh: "摄影作品集",
        descriptionEn: "Minimal UI that lets photographs take center stage without visual competition.",
        descriptionZh: "极简 UI 让摄影作品成为视觉焦点，不与其他元素争抢注意力。",
      },
      {
        titleEn: "Personal Blog",
        titleZh: "个人博客",
        descriptionEn: "Content-first blog design with comfortable reading experience.",
        descriptionZh: "内容优先的博客设计，提供舒适的阅读体验。",
      },
      {
        titleEn: "Product Documentation",
        titleZh: "产品文档",
        descriptionEn: "Clean documentation sites focused on readability and navigation clarity.",
        descriptionZh: "专注于可读性和导航清晰度的干净文档站。",
      },
    ],
    faq: [
      {
        questionEn: "What is minimalist web design?",
        questionZh: "什么是极简网页设计？",
        answerEn:
          "Minimalist web design reduces UI to its essential elements: clear typography, generous whitespace, limited color palette (typically 2-3 colors), and no decorative elements that don't serve a function. It follows the principle of 'less is more' where every element must earn its place on the page.",
        answerZh:
          "极简网页设计将 UI 精简到核心元素：清晰的排版、充足的留白、有限的色板（通常 2-3 种颜色）、不使用无功能性的装饰元素。它遵循「少即是多」的原则，每个元素都必须证明自己在页面上的存在价值。",
      },
      {
        questionEn: "How to achieve minimalist design without looking empty?",
        questionZh: "如何在极简设计中避免看起来空洞？",
        answerEn:
          "Use typography as decoration: vary font weights, sizes, and styles to create visual interest. Employ intentional whitespace (not just empty space). Add subtle micro-interactions on hover. Use high-quality images or illustrations sparingly. The key is making every element count rather than adding more elements.",
        answerZh:
          "将排版作为装饰：变化字重、字号和样式以创造视觉趣味。运用有意图的留白（不仅是空白空间）。添加微妙的 hover 微交互。谨慎使用高质量的图片或插图。关键在于让每个元素都有意义，而不是增加更多元素。",
      },
      {
        questionEn: "Which fonts work best for minimalist design?",
        questionZh: "哪些字体最适合极简设计？",
        answerEn:
          "System fonts (Inter, SF Pro, Segoe UI) are ideal for their clean geometry. For headings, consider clean serif fonts (Playfair Display, Cormorant) for contrast. Monospace fonts (JetBrains Mono, Fira Code) work well for code-centric or technical minimal designs. Limit to 1-2 font families maximum.",
        answerZh:
          "系统字体（Inter、SF Pro、Segoe UI）因其干净的几何形状而理想。标题可考虑干净的衬线字体（Playfair Display、Cormorant）以形成对比。等宽字体（JetBrains Mono、Fira Code）适合代码中心或技术类极简设计。最多限制 1-2 个字体家族。",
      },
      {
        questionEn: "How much whitespace is right for minimalist design?",
        questionZh: "极简设计的留白应该留多少？",
        answerEn:
          "Anchor whitespace to a scale and to type size rather than taste. A workable system: section padding 96-128px vertical on desktop (64px mobile), 40-64px between unrelated blocks, 16-24px between related items, and 8px within a component. Line-height carries micro-whitespace: 1.6-1.8 for body, 1.1-1.2 for large headings. The governing rule is proximity — spacing inside a group must be visibly smaller than spacing between groups, at least a 2:1 ratio, or the layout reads as scattered instead of calm. When something feels empty, tighten the internal spacing before adding elements.",
        answerZh:
          "留白应锚定在一套间距体系和字号上，而不是凭感觉。一套可行的系统：桌面端区块上下内边距 96-128px（移动端 64px），无关块之间 40-64px，相关条目之间 16-24px，组件内部 8px。行高承担微观留白：正文 1.6-1.8，大标题 1.1-1.2。核心规则是亲密性——组内间距必须明显小于组间间距，至少 2:1 的比例，否则布局会显得涣散而不是宁静。当页面感觉空洞时，先收紧组内间距，而不是添加元素。",
      },
      {
        questionEn: "Can minimalist design use color?",
        questionZh: "极简设计可以使用彩色吗？",
        answerEn:
          "Yes — minimalism restricts the number of colors, not color itself. The reliable formula is one dominant neutral pair (e.g. #fafafa background with #171717 text), one gray for secondary text (#737373), and exactly one accent applied to a single job: links, or primary buttons, or completed states — never all three. A saturated accent like #2563eb or #dc2626 gains power precisely because it appears rarely; if the accent shows up in every section it stops being an accent. Bold monochrome backgrounds (a full #1d4ed8 hero with white text) are also legitimately minimalist as long as the composition stays sparse.",
        answerZh:
          "可以——极简限制的是颜色的数量，不是颜色本身。可靠的公式：一对主中性色（如 #fafafa 背景配 #171717 文字），一个次要文字灰（#737373），以及恰好一个强调色，且只承担一种职责：链接、主按钮或完成状态——绝不同时承担三种。#2563eb 或 #dc2626 这样的饱和强调色，正因为出现得少才有力量；如果每个区块都有强调色，它就不再是强调色了。大胆的单色背景（整屏 #1d4ed8 Hero 配白字）同样是正统的极简，只要构图保持克制。",
      },
    ],
  },
  {
    slug: "retro-vintage",
    titleEn: "Retro & Vintage Design Prompts",
    titleZh: "复古设计提示词",
    descriptionEn: "AI prompts for nostalgic web interfaces inspired by Y2K, 80s neon, VHS, retro computing, and vintage aesthetics.",
    descriptionZh: "灵感来自 Y2K、80 年代霓虹、VHS、复古计算和怀旧美学的 AI 提示词。",
    keywords: [
      "retro web design prompt",
      "vintage UI prompt",
      "Y2K design prompt",
      "80s neon design prompt",
      "VHS aesthetic prompt",
      "retro Tailwind design",
    ],
    relatedStyleSlugs: [
      "retro-vintage",
      "y2k",
      "vhs-aesthetic",
      "frutiger-aero",
      "synthwave",
      "arcade-crt",
      "pixel-art",
    ],
    introEn:
      "Retro and vintage design draws from past eras to create nostalgic, distinctive interfaces. From Y2K's bubble gradients and chrome text to 80s synthwave neon grids, each era has its signature visual language. These styles stand out in a sea of modern minimalism, creating memorable experiences that connect with audiences through shared cultural nostalgia.",
    introZh:
      "复古设计从过去的时代中汲取灵感，创造怀旧而独特的界面。从 Y2K 的气泡渐变和金属文字到 80 年代 Synthwave 的霓虹网格，每个时代都有其标志性的视觉语言。这些风格在现代极简主义的海洋中脱颖而出，通过共同的文化怀旧感与受众产生连接。",
    prompts: [
      {
        titleEn: "Y2K Aesthetic Page",
        titleZh: "Y2K 美学页面",
        tool: "general",
        prompt:
          "Design a Y2K-aesthetic landing page. Use bubble gradients (pink to lavender to baby blue), chrome/metallic text effects for headings, star and butterfly decorative elements, rounded bubbly shapes, and translucent panels. Font: futuristic rounded sans-serif. Include a hero with 3D-style text, floating decorative elements, and a pastel gradient background. Cards with glossy borders and subtle inner glow.",
      },
      {
        titleEn: "Synthwave for v0",
        titleZh: "v0 Synthwave",
        tool: "v0",
        prompt:
          "Create a synthwave-themed music app with shadcn/ui. Dark background (#0a0015) with neon accent colors: hot pink (#ff006e), electric cyan (#00f5ff), neon purple (#bf00ff). Include a retro grid perspective background, neon glow text for headings, and card components with neon border glow on hover. Use a sunset gradient (orange to pink to purple) for the hero section. Add retro-futuristic typography and scanline overlay effect.",
      },
      {
        titleEn: "VHS Aesthetic for Cursor",
        titleZh: "Cursor VHS 美学",
        tool: "cursor",
        prompt:
          "Build a VHS-aesthetic portfolio in Next.js. Effects: CRT scanline overlay (repeating-linear-gradient), chromatic aberration on images (CSS filter with offset color channels), VHS tracking distortion on hover (CSS transform skew), noise texture overlay (SVG filter). Color palette: warm beige (#e8dcc8) background, washed-out pastels for accents. Typography: monospace for body, condensed sans-serif for headings. Include a 'PLAY/REC' badge UI element.",
      },
      {
        titleEn: "Retro Computing for Claude",
        titleZh: "Claude 复古计算",
        tool: "claude",
        prompt:
          "Generate React components with a retro computing aesthetic inspired by classic Macintosh and early Windows. Window component with title bar (gradient), close/minimize/maximize buttons, and content area. Use bitmap-style fonts (monospace), a limited 16-color palette, pixel-perfect borders (1px solid), and dithering patterns using CSS background-image. Include: Window, MenuBar, Button (beveled 3D effect), TextField, and ScrollBar components.",
      },
      {
        titleEn: "70s Funk Blog",
        titleZh: "70 年代放克博客",
        tool: "general",
        prompt:
          "Design a 1970s-inspired blog homepage. Palette: burnt orange #d35400, mustard #e1ad01, avocado green #6b8e23, and cream #f5e6c8 as the page background with deep brown #3e2723 text. Typography: a chunky rounded display font (Cooper Black style) for the masthead at 64px, and a readable serif at 18px/1.7 for post excerpts. Use thick 3px brown borders, pill-shaped category tags, a repeating wavy-stripe divider (SVG) between sections, and slightly rotated polaroid-style post thumbnails with tape corners. Keep body text on cream at 7:1 contrast and reserve the loudest colors for headings and tags only.",
      },
      {
        titleEn: "Frutiger Aero Dashboard for v0",
        titleZh: "v0 Frutiger Aero 仪表盘",
        tool: "v0",
        prompt:
          "Create a Frutiger Aero-style personal dashboard with shadcn/ui. Background: a glossy sky gradient from #7ec8e3 to #d0f0fd with a faint grass-green bottom edge #8bc34a and floating bubble highlights (radial-gradient circles at 20% white opacity). Cards: white at 70% opacity with 20px radius, a 1px inner white highlight border, and a glossy top sheen via a linear-gradient overlay from rgba(255,255,255,0.6) to transparent at 40% height. Accent: aqua #00b4d8 for buttons with a subtle bevel. Typography: Segoe UI or Frutiger-like humanist sans, 15px body #1a3c4e. Include a weather widget, media card, and clock, all with soft drop shadows (0 8px 24px rgba(0,60,90,0.15)).",
      },
      {
        titleEn: "Arcade CRT Leaderboard for Cursor",
        titleZh: "Cursor 街机 CRT 排行榜",
        tool: "cursor",
        prompt:
          "Build an arcade CRT-style leaderboard page in Next.js. Background pure #000000 with a scanline overlay (repeating-linear-gradient, 3px period, rgba(255,255,255,0.04)) and a vignette via radial-gradient. Text in phosphor green #33ff33 using the Press Start 2P font: title 24px with a soft text-shadow glow (0 0 8px #33ff3388), score rows 14px with 20px line spacing and dotted leader lines between rank, name, and score. Top 3 ranks get amber #ffb000. Add a blinking INSERT COIN prompt (1s step animation, disabled under prefers-reduced-motion) and a curved-screen effect using a slight border-radius and inner box-shadow. Provide a plain high-contrast fallback list for screen readers.",
      },
      {
        titleEn: "90s Web Revival Page for Claude",
        titleZh: "Claude 90 年代网页复兴",
        tool: "claude",
        prompt:
          "Generate a deliberately 90s-web-revival personal homepage as a React component that stays accessible. Background: a subtle tiled pattern (CSS gradient checker in #c0c0c0 and #d4d4d4). Content in a centered 760px table-like layout with beveled panels: border styles outset 2px, backgrounds #e0e0e0, headings in navy #000080 Times-style serif at 28px. Include an animated-look marquee banner implemented with CSS transform (pausable, honoring prefers-reduced-motion), a visitor counter widget with seven-segment digits, 88x31 pixel badge links in the footer, and a guestbook form with classic gray inset inputs. Keep real link contrast at #0000ee on light gray and all images with alt text.",
      },
    ],
    useCases: [
      {
        titleEn: "Music & Entertainment",
        titleZh: "音乐娱乐",
        descriptionEn: "Artist pages, music players, and event sites that evoke specific musical eras.",
        descriptionZh: "艺术家页面、音乐播放器和活动网站，唤起特定音乐时代的感觉。",
      },
      {
        titleEn: "Gaming Interfaces",
        titleZh: "游戏界面",
        descriptionEn: "Retro game launchers, pixel art showcases, and arcade-inspired UI.",
        descriptionZh: "复古游戏启动器、像素艺术展示和街机风格 UI。",
      },
      {
        titleEn: "Creative Portfolios",
        titleZh: "创意作品集",
        descriptionEn: "Designers and artists using nostalgic aesthetics to stand out from minimal portfolios.",
        descriptionZh: "设计师和艺术家用怀旧美学从极简作品集中脱颖而出。",
      },
      {
        titleEn: "Brand Campaigns",
        titleZh: "品牌活动",
        descriptionEn: "Marketing campaigns leveraging nostalgia for emotional connection with audiences.",
        descriptionZh: "利用怀旧感与受众建立情感连接的营销活动。",
      },
    ],
    faq: [
      {
        questionEn: "What is retro web design?",
        questionZh: "什么是复古网页设计？",
        answerEn:
          "Retro web design references visual styles from past decades (70s, 80s, 90s, Y2K) using era-specific colors, typography, textures, and layout patterns. Popular sub-styles include synthwave (80s neon), Y2K (early 2000s bubble aesthetic), VHS (analog video noise), Frutiger Aero (2000s glossy), and pixel art (8-bit/16-bit era).",
        answerZh:
          "复古网页设计引用过去几十年（70s、80s、90s、Y2K）的视觉风格，使用时代特定的色彩、排版、纹理和布局模式。流行的子风格包括 Synthwave（80 年代霓虹）、Y2K（2000 年代初气泡美学）、VHS（模拟视频噪点）、Frutiger Aero（2000 年代光泽感）和像素艺术（8-bit/16-bit 时代）。",
      },
      {
        questionEn: "How to create neon glow effects in CSS?",
        questionZh: "如何在 CSS 中创建霓虹发光效果？",
        answerEn:
          "Use multiple text-shadow layers for neon text: text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff00de, 0 0 82px #ff00de. For element glow, use box-shadow with spread: box-shadow: 0 0 15px rgba(255,0,222,0.5), 0 0 30px rgba(255,0,222,0.3). Animate with CSS keyframes for a pulsing effect.",
        answerZh:
          "用多层 text-shadow 实现霓虹文字：text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ff00de, 0 0 82px #ff00de。元素发光用 box-shadow 扩展：box-shadow: 0 0 15px rgba(255,0,222,0.5), 0 0 30px rgba(255,0,222,0.3)。用 CSS keyframes 添加脉动动画。",
      },
      {
        questionEn: "Is retro design still trendy?",
        questionZh: "复古设计还流行吗？",
        answerEn:
          "Yes. Retro aesthetics cycle in and out of trend, with Y2K and Frutiger Aero seeing major revivals in 2024-2026. Retro styles work because they create emotional connections through nostalgia and stand out from the sea of clean, modern designs. The key is interpreting retro elements through modern web standards rather than literally recreating old interfaces.",
        answerZh:
          "是的。复古美学不断循环流行，Y2K 和 Frutiger Aero 在 2024-2026 年经历了重大复兴。复古风格有效是因为它们通过怀旧感建立情感连接，并从大量干净的现代设计中脱颖而出。关键是通过现代网页标准来诠释复古元素，而非原封不动地重建旧界面。",
      },
      {
        questionEn: "What fonts should I use for retro web design?",
        questionZh: "复古网页设计应该用什么字体？",
        answerEn:
          "Match the font to the era. 70s: chunky rounded display faces (Cooper Black; Google alternative Chango or Shrikhand). 80s synthwave: chrome-style geometric display like Monoton or Audiowide for titles. Y2K: rounded techno faces such as Orbitron or Comfortaa. Terminal/arcade: VT323 or Press Start 2P. Early GUI: pixel or system-style fonts like Silkscreen. The critical rule: use the era font for headings and logos only, and pair it with a neutral readable body font (16px+ system sans or serif) — full paragraphs in display or pixel fonts fail both readability and accessibility.",
        answerZh:
          "字体要对准年代。70 年代：厚重圆润的展示字体（Cooper Black；Google 替代品 Chango、Shrikhand）。80 年代 Synthwave：Monoton、Audiowide 这类金属感几何标题字体。Y2K：Orbitron、Comfortaa 等圆润科技字体。终端/街机：VT323 或 Press Start 2P。早期 GUI：Silkscreen 这类像素系统字体。关键规则：年代字体只用于标题和 Logo，正文搭配中性易读字体（16px 以上的系统无衬线或衬线）——整段使用展示体或像素体在可读性和无障碍上都不合格。",
      },
      {
        questionEn: "How do I make retro design accessible?",
        questionZh: "如何让复古设计满足无障碍要求？",
        answerEn:
          "Retro palettes and effects often fight WCAG, so audit deliberately. Check every text/background pair against 4.5:1 — neon pink #ff006e on dark #0a0015 passes, but neon on neon fails, so put glowing colors in text-shadow while keeping the fill lighter. Cap flashing or blinking animations at under 3 flashes per second and disable scanlines, glitch, and marquee effects under prefers-reduced-motion. Keep pixel and display fonts out of body text. Chromatic aberration and noise overlays should sit at low opacity (under 0.08) so they never obscure content, and interactive controls still need visible focus rings even inside a CRT aesthetic.",
        answerZh:
          "复古配色和特效经常与 WCAG 冲突，必须刻意审计。每一组文字/背景都要过 4.5:1 检测——霓虹粉 #ff006e 配深底 #0a0015 能通过，但霓虹配霓虹会失败，发光效果应放进 text-shadow 而把填充色调亮。闪烁动画控制在每秒 3 次以下，并在 prefers-reduced-motion 下关闭扫描线、故障和跑马灯效果。像素体和展示体不进正文。色差和噪点覆层保持低不透明度（0.08 以下），确保不遮挡内容；交互控件即使在 CRT 美学里也要有可见的焦点环。",
      },
    ],
  },
  {
    slug: "anime-manga",
    titleEn: "Anime & Manga Style Prompts",
    titleZh: "动漫风格设计提示词",
    descriptionEn: "AI prompts for anime-inspired web interfaces with Japanese aesthetics, vibrant colors, and character-driven design.",
    descriptionZh: "灵感来自动漫的网页界面 AI 提示词，涵盖日式美学、鲜艳色彩和角色驱动设计。",
    keywords: [
      "anime website design prompt",
      "manga style UI prompt",
      "Japanese anime web design",
      "anime landing page prompt",
      "Ghibli style website prompt",
      "anime Tailwind design",
    ],
    relatedStyleSlugs: [
      "ghibli-style",
      "cyber-anime",
      "shoujo-manga",
      "visual-novel",
      "pixel-anime",
      "cel-shading",
      "kawaii-minimal",
    ],
    introEn:
      "Anime and manga-inspired web design brings the energy, color, and storytelling of Japanese animation to digital interfaces. From the warm, painterly feel of Studio Ghibli to the high-energy neon of cyber anime, these styles create immersive experiences that resonate with a global audience. Key elements include expressive typography, bold color palettes, character illustrations, and dynamic compositions that guide the eye.",
    introZh:
      "动漫风格的网页设计将日本动画的活力、色彩和叙事带入数字界面。从吉卜力工作室的温暖手绘感到赛博动漫的高能量霓虹，这些风格创造沉浸式体验，与全球受众产生共鸣。关键元素包括表现力丰富的排版、大胆的色彩配板、角色插画和引导视线的动态构图。",
    prompts: [
      {
        titleEn: "Ghibli-Inspired Landing",
        titleZh: "吉卜力风落地页",
        tool: "general",
        prompt:
          "Design a Studio Ghibli-inspired landing page. Use a warm, watercolor-like color palette: sky blue (#87CEEB), meadow green (#7CB342), warm cream (#FFF8E1), sunset orange (#FF8A65). Typography: rounded, friendly sans-serif with handwritten accents. Hero section with a panoramic illustration background, floating cloud elements with parallax scroll. Cards with soft rounded corners (16px), paper-like texture, and gentle shadow. Navigation as a whimsical ribbon-style bar.",
      },
      {
        titleEn: "Cyber Anime for v0",
        titleZh: "v0 赛博动漫",
        tool: "v0",
        prompt:
          "Create a cyber anime-themed portfolio using shadcn/ui. Dark base (#0d0d0d) with electric accent colors: neon pink (#ff3366), cyber blue (#00ccff), matrix green (#00ff88). Include: glitch text effect for the main heading, a card grid with neon border glow, anime-style speed lines as decorative background elements, and a hamburger menu that slides in with a slash animation. Use bold, condensed typography for headings and clean sans-serif for body text.",
      },
      {
        titleEn: "Visual Novel UI for Cursor",
        titleZh: "Cursor 视觉小说 UI",
        tool: "cursor",
        prompt:
          "Build a visual novel-style interactive story page in Next.js. Include: a full-screen background image area for scenes, a semi-transparent text box at the bottom with character name and dialogue, choice buttons that appear over the scene, a side panel for character status/inventory. Use typewriter text animation for dialogue. Color scheme: deep navy background with soft pink and gold accents. Include a save/load UI overlay with slot cards.",
      },
      {
        titleEn: "Manga Layout for Claude",
        titleZh: "Claude 漫画布局",
        tool: "claude",
        prompt:
          "Generate a React component that creates a manga-panel-style page layout. The layout should arrange content blocks like manga panels: varying sizes, some full-width for dramatic moments, some in 2-3 column grids for dialogue scenes. Each panel has a thick black border (3px), slight rotation on hover (-1 to 1 degree), and supports both image and text content. Include speech bubble components with the classic manga tail style. Use CSS Grid for the panel arrangement.",
      },
      {
        titleEn: "Kawaii Cafe Landing Page",
        titleZh: "可爱风咖啡店落地页",
        tool: "general",
        prompt:
          "Design a kawaii-style landing page for an anime-themed cafe. Palette: strawberry pink #ffb7c5, cream #fff5eb background, mint #a8e6cf, and cocoa brown #6d4c41 for text so contrast stays readable. Typography: a rounded friendly sans (M PLUS Rounded 1c) with headings at 40px and 24px letter-spacing 0.02em. Hero: mascot illustration on the right, wobbly blob background shapes (border-radius 60% 40% 55% 45%), and a pill CTA in pink with a 2px cocoa border and a 2px offset hard shadow. Menu cards: 20px radius, pastel headers, dashed dividers. Add floating sakura petals with a slow CSS drift animation, disabled under prefers-reduced-motion.",
      },
      {
        titleEn: "Shounen Battle Event Page for v0",
        titleZh: "v0 少年热血活动页",
        tool: "v0",
        prompt:
          "Create a high-energy shounen anime event landing page with shadcn/ui. Palette: hero red #e63946, gold #ffb703, ink black #14110f background, off-white #faf3e0 text. The hero headline uses a heavy italic condensed font at 72px, clipped by a diagonal slash (clip-path polygon) with manga speed lines radiating from center as an SVG background. Section breaks are 4-degree skewed bands; countdown timer digits at 56px gold tabular-nums on black cards with 3px red borders. CTA button: gold with black text, hover state shifts 4px with a hard red shadow. Keep all text on black at 4.5:1 contrast and provide static alternatives when prefers-reduced-motion is set.",
      },
      {
        titleEn: "Anime Streaming App for Cursor",
        titleZh: "Cursor 动漫流媒体应用",
        tool: "cursor",
        prompt:
          "Build an anime streaming app home screen in Next.js with Tailwind. Dark cinema base #0f0f13 with cards #1a1a22 and 12px radius. Hero carousel: full-bleed key art with a bottom gradient to #0f0f13, show title in a bold display font at 44px, and genre chips (12px, background rgba(255,255,255,0.08)). Content rows: horizontal scroll with scroll-snap, 2:3 poster cards that scale to 1.05 on hover with a #ff4d6d glow ring, episode progress bars 3px in #ff4d6d. Typography: 15px body #b8b8c4, white titles. Add keyboard navigation for the carousel (arrow keys plus visible focus ring) and lazy-load posters with a blur-up placeholder.",
      },
      {
        titleEn: "Shoujo Manga Blog for Claude",
        titleZh: "Claude 少女漫画博客",
        tool: "claude",
        prompt:
          "Generate a shoujo manga-inspired blog layout as a React component. Palette: blush #fde2e4 background, rose #e56b6f accents, plum #4a2545 text for readable contrast, and gold #d4a373 details. Decorate section corners with sparkle and rose SVG motifs at 10% opacity so they never obscure text. Post cards: white with a 2px rose border, 18px radius, a ribbon-shaped category tag, and a halftone screentone dot pattern (radial-gradient 2px dots) in card headers. Typography: an elegant serif (Cormorant) for 32px titles paired with a 16px/1.7 humanist sans body. Include a featured-post hero with a soft radial glow and hover states that lift cards 4px over 200ms ease-out.",
      },
    ],
    useCases: [
      {
        titleEn: "Fan Community Sites",
        titleZh: "粉丝社区站点",
        descriptionEn: "Anime fan sites, character wikis, and community forums with thematic design.",
        descriptionZh: "动漫粉丝站、角色百科和社区论坛，使用主题化设计。",
      },
      {
        titleEn: "Game Landing Pages",
        titleZh: "游戏落地页",
        descriptionEn: "Visual novel, JRPG, and anime game promotional websites.",
        descriptionZh: "视觉小说、JRPG 和动漫游戏的推广网站。",
      },
      {
        titleEn: "Creative Portfolios",
        titleZh: "创意作品集",
        descriptionEn: "Illustrator and digital artist portfolios showcasing anime-style work.",
        descriptionZh: "插画师和数字艺术家展示动漫风格作品的作品集。",
      },
      {
        titleEn: "E-commerce for Merchandise",
        titleZh: "周边商品电商",
        descriptionEn: "Anime merchandise stores with character-driven product displays.",
        descriptionZh: "以角色驱动产品展示的动漫周边商品店。",
      },
    ],
    faq: [
      {
        questionEn: "How to create an anime-style website?",
        questionZh: "如何创建动漫风格的网站？",
        answerEn:
          "Key elements: vibrant color palette with high saturation, expressive typography (mix bold headlines with clean body text), character illustrations as focal points, dynamic compositions with diagonal lines or asymmetric layouts, and anime-specific UI patterns like speech bubbles, speed lines, and screen tones. Use CSS animations for energy and Tailwind for rapid implementation.",
        answerZh:
          "关键元素：高饱和度的鲜艳色彩配板、富有表现力的排版（混合粗体标题和干净正文）、角色插画作为视觉焦点、对角线或不对称布局的动态构图、以及对话气泡、速度线和网点等动漫特定 UI 模式。用 CSS 动画增加活力，用 Tailwind 快速实现。",
      },
      {
        questionEn: "What is the Ghibli style in web design?",
        questionZh: "网页设计中的吉卜力风格是什么？",
        answerEn:
          "Ghibli-style web design captures the warm, hand-crafted feel of Studio Ghibli films. It uses soft watercolor-like colors, nature-inspired palettes (greens, sky blues, warm earths), rounded friendly shapes, whimsical illustrations, gentle parallax effects, and an overall sense of wonder and nostalgia. It avoids harsh edges, stark contrasts, and overly digital-looking elements.",
        answerZh:
          "吉卜力风格网页设计捕捉吉卜力工作室电影中温暖的手工制作感。它使用柔和的水彩色调、自然灵感的配色（绿色、天空蓝、暖色大地色）、圆润友好的形状、趣味插画、轻柔的视差效果，以及整体的奇幻与怀旧感。它避免生硬的边缘、强烈的对比和过于数字化的元素。",
      },
      {
        questionEn: "Can AI generate anime-style web designs?",
        questionZh: "AI 能生成动漫风格的网页设计吗？",
        answerEn:
          "Yes, AI tools like v0, Cursor, and Claude can generate anime-inspired layouts, color schemes, and component structures. However, they work best with detailed style prompts specifying the exact anime sub-genre (Ghibli, cyberpunk, shoujo, etc.), color palette, and visual elements. StyleKit provides pre-built anime style tokens and prompts that help AI tools generate more authentic anime-style interfaces.",
        answerZh:
          "可以，v0、Cursor 和 Claude 等 AI 工具能生成动漫风格的布局、色彩方案和组件结构。但它们在使用详细的风格提示词时效果最好，需要指定确切的动漫子类型（吉卜力、赛博朋克、少女等）、色彩配板和视觉元素。StyleKit 提供预建的动漫风格 tokens 和提示词，帮助 AI 工具生成更地道的动漫风格界面。",
      },
      {
        questionEn: "What color palettes work for anime-style websites?",
        questionZh: "动漫风格网站适合什么配色？",
        answerEn:
          "Pick the palette by sub-genre, then enforce contrast. Kawaii/shoujo: pastels like #ffb7c5 pink and #a8e6cf mint, but pair them with a dark warm text color (#4a2545 or #6d4c41) instead of white, which fails contrast on pastel. Cyber anime: near-black base #0d0d13 with 2-3 neon accents (#ff3366, #00ccff) used for glows and borders, not body text. Ghibli/natural: desaturated sky #87ceeb, meadow #7cb342, cream #fff8e1. Whatever the genre, limit accents to 3, keep large areas low-saturation, and verify every text pairing at 4.5:1 — high-saturation anime colors are the most common WCAG failure point.",
        answerZh:
          "按子类型选配色，再强制校验对比度。可爱/少女系：#ffb7c5 粉、#a8e6cf 薄荷等粉彩色，但文字要配深暖色（#4a2545 或 #6d4c41）而不是白色——白字在粉彩底上过不了对比度。赛博动漫：近黑底 #0d0d13 配 2-3 个霓虹强调色（#ff3366、#00ccff），只用于发光和边框，不进正文。吉卜力/自然系：低饱和的天空蓝 #87ceeb、草地绿 #7cb342、奶油色 #fff8e1。无论哪种类型，强调色不超过 3 个，大面积区域保持低饱和，每组文字配色都要过 4.5:1——高饱和动漫色是最常见的 WCAG 翻车点。",
      },
      {
        questionEn: "How do I add manga speed lines and screentones with CSS?",
        questionZh: "如何用 CSS 实现漫画速度线和网点效果？",
        answerEn:
          "Screentones (halftone dots) are one line: background-image: radial-gradient(circle, #00000022 1.5px, transparent 1.5px) with background-size: 8px 8px; shrink the size to 4-6px for a finer tone. Radial speed lines use repeating-conic-gradient(from 0deg, #111 0deg 2deg, transparent 2deg 8deg) centered on the focal point, masked with a radial-gradient so the center stays clear for content. Horizontal motion lines: repeating-linear-gradient(90deg, ...) with varied stripe widths. Keep all of these as decorative background layers at 5-15% opacity, mark containers aria-hidden where purely decorative, and never place body text directly on an unmasked pattern.",
        answerZh:
          "网点（半调圆点）一行即可：background-image: radial-gradient(circle, #00000022 1.5px, transparent 1.5px)，background-size: 8px 8px；把尺寸缩到 4-6px 可得到更细腻的网点。放射状速度线用 repeating-conic-gradient(from 0deg, #111 0deg 2deg, transparent 2deg 8deg) 以焦点为圆心，再叠一层 radial-gradient 遮罩让中心留白放内容。水平动势线用 repeating-linear-gradient(90deg, ...) 并变化条纹宽度。这些都应作为 5-15% 不透明度的装饰性背景层，纯装饰容器加 aria-hidden，且绝不把正文直接放在未遮罩的图案上。",
      },
    ],
  },
  {
    slug: "corporate-saas",
    titleEn: "Corporate & SaaS Design Prompts",
    titleZh: "企业与 SaaS 设计提示词",
    descriptionEn: "AI prompts for professional, trustworthy business interfaces with clean layouts, data tables, and conversion-optimized patterns.",
    descriptionZh: "用于创建专业、可信赖的商业界面的 AI 提示词，涵盖简洁布局、数据表格和转化优化模式。",
    keywords: [
      "corporate website prompt",
      "SaaS UI design prompt",
      "professional web design prompt",
      "business website AI prompt",
      "enterprise UI prompt",
      "B2B website design",
    ],
    relatedStyleSlugs: [
      "corporate-clean",
      "stripe-style",
      "github-style",
      "notion-style",
      "minimalist-flat",
    ],
    introEn:
      "Corporate and SaaS design prioritizes trust, clarity, and conversion. These interfaces use established patterns that users instantly recognize: clean navigation, clear hierarchy, professional typography, and restrained color usage. The best corporate designs feel approachable without sacrificing professionalism, using subtle design details like micro-animations and thoughtful spacing to elevate otherwise standard layouts.",
    introZh:
      "企业和 SaaS 设计优先考虑信任感、清晰度和转化率。这些界面使用用户一眼就能识别的成熟模式：清晰的导航、明确的层级、专业的排版和克制的色彩使用。最好的企业设计在不牺牲专业感的前提下保持亲和力，通过微动画和用心的间距等微妙设计细节来提升原本标准的布局。",
    prompts: [
      {
        titleEn: "SaaS Marketing Site",
        titleZh: "SaaS 营销站",
        tool: "general",
        prompt:
          "Design a professional SaaS marketing website. Clean header with logo, product/solutions/pricing/docs nav links, and 'Get Started' CTA button. Hero: clear headline describing the product benefit, subtext, email input with CTA button, and a product screenshot. Sections: feature grid (2x3), integration logos, customer testimonials with company logos, pricing table (3 tiers with annual/monthly toggle), FAQ, footer with sitemap columns. Use Inter font, blue primary color (#2563eb), neutral gray palette, and generous whitespace.",
      },
      {
        titleEn: "Stripe-Style for v0",
        titleZh: "v0 Stripe 风格",
        tool: "v0",
        prompt:
          "Create a Stripe-inspired product page using shadcn/ui. Include: a gradient mesh background for the hero section, clean typography with large heading and clear subtext, animated code snippets showing API usage, interactive pricing calculator, feature comparison table with checkmarks, and a developer-focused footer with API docs links. Use a blue-to-purple gradient accent, white cards with subtle shadows, and system font stack.",
      },
      {
        titleEn: "B2B Platform for Cursor",
        titleZh: "Cursor B2B 平台",
        tool: "cursor",
        prompt:
          "Build a B2B SaaS platform interface in Next.js. Include: top navigation with mega-menu dropdowns for Products and Solutions, a resource center page with filterable blog/case-study cards, a pricing page with feature comparison matrix, and a contact sales form with company size selector. Use professional typography (Inter), blue-600 as primary, gray-50 backgrounds for alternating sections, and 80px vertical section spacing.",
      },
      {
        titleEn: "Enterprise App for Claude",
        titleZh: "Claude 企业应用",
        tool: "claude",
        prompt:
          "Generate a complete enterprise web application shell with React and TypeScript. Include: authenticated layout with top bar (user menu, notifications, org switcher), sidebar navigation with collapsible sections, breadcrumb navigation, page header with action buttons, and a content area. Build reusable components: DataTable with sorting/filtering/pagination, StatCard, PageHeader, EmptyState, and ConfirmDialog. Use Tailwind CSS with a professional blue-gray color scheme.",
      },
      {
        titleEn: "SaaS Pricing Page",
        titleZh: "SaaS 定价页",
        tool: "general",
        prompt:
          "Design a SaaS pricing page that converts. Three tier cards on a #f8fafc section background: cards in #ffffff with 1px #e2e8f0 borders and 12px radius. Highlight the Pro tier with a 2px #2563eb border and a small 'Recommended' badge. Prices in 48px Inter semibold with tabular-nums; per-seat caption in 14px #64748b. Annual/monthly toggle with a 'Save 20%' pill in #dcfce7/#166534. Below the cards, a feature comparison table with sticky header row and check icons in #2563eb. End with an enterprise CTA band on #0f172a with white text. All text must meet WCAG AA 4.5:1 contrast.",
      },
      {
        titleEn: "Docs Site for v0",
        titleZh: "v0 文档站",
        tool: "v0",
        prompt:
          "Build a developer documentation site using shadcn/ui. Three-column layout: left sidebar nav (240px, collapsible groups, active link with blue-600 text and blue-50 background), center content column (max-w-3xl, prose styling with 16px/1.75 body), right 'On this page' outline (200px, scroll-spy highlighting). Code blocks in #0f172a with a copy button and language tab. Callout components for Note/Warning/Danger using blue-50, amber-50, red-50 backgrounds with 4px left borders. Top bar with search trigger (Cmd+K hint) and version selector. Keyboard navigable throughout with visible focus rings in blue-500.",
      },
      {
        titleEn: "Onboarding Flow for Cursor",
        titleZh: "Cursor 引导流程",
        tool: "cursor",
        prompt:
          "Build a SaaS onboarding flow in Next.js with Tailwind. Four steps: workspace name, team invites, integration selection, and a success screen. Centered card (max-w-lg) on gray-50 background, white card with shadow-sm and 16px radius. Progress bar at top: 4px height, blue-600 fill animating width with transition-all duration-500. Inputs with gray-300 borders, focus:ring-2 focus:ring-blue-500. Integration step shows a 3x2 grid of logo cards with checkbox selection (selected state: blue-600 border + blue-50 background). Back link in gray-500, primary button in blue-600 hover:blue-700. Announce step changes with aria-live for screen readers.",
      },
      {
        titleEn: "Customer Portal for Claude",
        titleZh: "Claude 客户门户",
        tool: "claude",
        prompt:
          "Generate a React customer billing portal with TypeScript and Tailwind. Pages: subscription overview (current plan card with usage meters), invoice history (DataTable with status badges: paid #16a34a, pending #d97706, failed #dc2626 — each paired with an icon, never color alone), and payment methods (card list with brand icons and a default indicator). Usage meters: 8px rounded bars, gray-100 track, blue-600 fill, amber-500 above 80%, red-600 above 95%, with exact numbers as text. Typography: Inter, 24px page titles, 14px table text. Layout: max-w-5xl with 32px section spacing. Include empty and loading states for every list.",
      },
    ],
    useCases: [
      {
        titleEn: "SaaS Product Website",
        titleZh: "SaaS 产品官网",
        descriptionEn: "Marketing sites for B2B/B2C software products with pricing and feature pages.",
        descriptionZh: "B2B/B2C 软件产品的营销站，包含定价和功能页。",
      },
      {
        titleEn: "Enterprise Dashboard",
        titleZh: "企业仪表盘",
        descriptionEn: "Internal tools and admin panels for business operations management.",
        descriptionZh: "用于业务运营管理的内部工具和管理面板。",
      },
      {
        titleEn: "Documentation Site",
        titleZh: "文档站点",
        descriptionEn: "API docs, developer guides, and knowledge bases with professional presentation.",
        descriptionZh: "API 文档、开发者指南和知识库，以专业形式呈现。",
      },
      {
        titleEn: "Consulting Firm Website",
        titleZh: "咨询公司官网",
        descriptionEn: "Professional services firms showcasing expertise, case studies, and team.",
        descriptionZh: "专业服务公司展示专业能力、案例研究和团队。",
      },
    ],
    faq: [
      {
        questionEn: "What makes a SaaS website look professional?",
        questionZh: "什么让 SaaS 网站看起来专业？",
        answerEn:
          "Key elements: consistent spacing system (8px grid), professional font family (Inter, system fonts), limited color palette (1 primary + neutrals), clear navigation hierarchy, high-quality product screenshots, social proof (logos, testimonials, stats), and polished micro-interactions. Avoid: stock photos, too many colors, cluttered layouts, and overly creative fonts.",
        answerZh:
          "关键元素：一致的间距系统（8px 网格）、专业字体（Inter、系统字体）、有限色板（1 个主色 + 中性色）、清晰的导航层级、高质量产品截图、社会证明（Logo、评价、数据）和精致的微交互。避免：图库照片、过多颜色、杂乱布局和过度创意的字体。",
      },
      {
        questionEn: "How to design a pricing page for SaaS?",
        questionZh: "如何设计 SaaS 定价页？",
        answerEn:
          "Best practices: show 3 tiers (basic, pro, enterprise), highlight the recommended plan visually, include annual/monthly toggle with savings callout, use a feature comparison table below the cards, add a FAQ section addressing common pricing questions, and include a 'Contact Sales' option for enterprise. The most popular plan should be visually prominent with a different background or border color.",
        answerZh:
          "最佳实践：展示 3 个层级（基础、专业、企业），视觉突出推荐方案，包含年付/月付切换和节省提示，在卡片下方放功能对比表，添加解答常见定价问题的 FAQ，并为企业方案提供「联系销售」选项。最受欢迎的方案应通过不同的背景或边框色在视觉上突出。",
      },
      {
        questionEn: "What is Stripe-style design?",
        questionZh: "什么是 Stripe 风格设计？",
        answerEn:
          "Stripe's design language is characterized by: gradient mesh backgrounds, clean sans-serif typography, generous whitespace, code snippets as visual elements, subtle animations on scroll, and a blue-to-purple color gradient accent. It balances technical credibility (showing real code) with visual polish (smooth gradients, micro-animations). StyleKit's Stripe Style preset captures these patterns.",
        answerZh:
          "Stripe 的设计语言特点是：渐变网格背景、干净的无衬线排版、充足的留白、代码片段作为视觉元素、滚动时的微妙动画、以及蓝到紫的渐变色强调。它在技术可信度（展示真实代码）和视觉精致度（平滑渐变、微动画）之间取得平衡。StyleKit 的 Stripe Style 预设捕捉了这些模式。",
      },
      {
        questionEn: "What fonts do SaaS companies use?",
        questionZh: "SaaS 公司都用什么字体？",
        answerEn:
          "The dominant choice is Inter — used or forked by Figma, Vercel, and GitHub — because its tall x-height stays readable at 13-14px UI sizes. Common alternatives: system font stacks (fastest, zero layout shift), Geist (Vercel), Soehne (Stripe), and IBM Plex Sans. A reliable recipe: Inter for UI and body at 400/500/600 weights, tighter letter-spacing (-0.02em) on headings above 32px, and enable tabular-nums via font-variant-numeric for prices and data tables so digits align vertically.",
        answerZh:
          "主流选择是 Inter——Figma、Vercel、GitHub 都在使用或衍生它——因为较高的 x-height 让它在 13-14px 的 UI 字号下依然清晰。常见替代：系统字体栈（最快、零布局偏移）、Geist（Vercel）、Soehne（Stripe）、IBM Plex Sans。可靠配方：UI 和正文用 Inter 的 400/500/600 字重，32px 以上的标题加 -0.02em 的紧缩字距，价格和数据表格通过 font-variant-numeric 启用 tabular-nums 让数字垂直对齐。",
      },
      {
        questionEn: "How much whitespace should a SaaS landing page have?",
        questionZh: "SaaS 落地页应该留多少留白？",
        answerEn:
          "More than feels comfortable in the editor. Practical values: 96-128px vertical padding between major sections (py-24 to py-32 in Tailwind), 24px minimum gap between cards, 64-80px between a section heading and its content grid, and body copy constrained to 640-720px width (65-75 characters per line). Inside cards, use 24-32px padding. The single most common amateur mistake is 40-48px section spacing — doubling it instantly reads as more premium without changing anything else.",
        answerZh:
          "要比在编辑器里看着舒服的量更多。实用数值：主要区块之间垂直留 96-128px（Tailwind 的 py-24 到 py-32）、卡片间距最少 24px、区块标题与内容网格之间 64-80px、正文宽度限制在 640-720px（每行 65-75 字符）。卡片内部用 24-32px 内边距。最常见的业余错误是区块间距只留 40-48px——把它翻倍，其他什么都不改，页面立刻显得更高级。",
      },
    ],
  },
  {
    slug: "neo-brutalist",
    titleEn: "Neo-Brutalist Design Prompts",
    titleZh: "新野兽派设计提示词",
    descriptionEn: "AI prompts for bold, raw, anti-design interfaces with thick borders, hard shadows, no rounded corners, and high-contrast colors.",
    descriptionZh: "用于创建大胆、原始、反设计界面的 AI 提示词，涵盖粗边框、硬阴影、无圆角和高对比色。",
    keywords: [
      "neo-brutalist design prompt",
      "brutalist web design prompt",
      "bold UI design prompt",
      "anti-design prompt",
      "brutalist Tailwind prompt",
      "raw web design",
    ],
    relatedStyleSlugs: [
      "neo-brutalist",
      "neo-brutalist-soft",
      "neo-brutalist-playful",
      "brutalist-web",
      "anti-design",
    ],
    introEn:
      "Neo-Brutalist design embraces raw, unpolished aesthetics with bold black borders, hard-edge shadows, zero border-radius, high-contrast color combinations, and intentionally 'imperfect' layouts. It rejects the polished, cookie-cutter look of modern web design in favor of personality and directness. Despite its raw appearance, effective neo-brutalist design requires careful attention to hierarchy and usability.",
    introZh:
      "新野兽派设计拥抱原始、未经打磨的美学，使用大胆的黑色粗边框、硬边缘阴影、零圆角、高对比色彩组合和刻意的「不完美」布局。它拒绝现代网页设计中抛光的、千篇一律的外观，转而追求个性和直接感。尽管外观粗犷，有效的新野兽派设计需要对层级和可用性的细心把控。",
    prompts: [
      {
        titleEn: "Brutalist Portfolio",
        titleZh: "野兽派作品集",
        tool: "general",
        prompt:
          "Design a neo-brutalist portfolio website. All elements: 3px solid black borders, no border-radius, hard shadows (4px 4px 0px #000). Background: #ffffff. Accent colors: hot pink (#ff006e) and electric yellow (#ccff00). Typography: monospace for body, bold condensed sans-serif for headings. Layout: intentionally asymmetric grid, overlapping elements, rotated cards (-2 to 2 degrees). Navigation: brutalist text links with underline offset animation. Project cards with image, bold title, and raw HTML-style tags.",
      },
      {
        titleEn: "Brutalist App for v0",
        titleZh: "v0 野兽派应用",
        tool: "v0",
        prompt:
          "Build a neo-brutalist task manager using shadcn/ui with overridden styles. Override all components: border-radius to 0, borders to 2px solid black, shadows to '4px 4px 0px black'. Cards with yellow (#fbbf24) and pink (#f472b6) accent backgrounds. Buttons with black background, white text, and transform: translate(-2px, -2px) on hover with shadow change. Include: task list, add task form, priority tags (raw colored labels), and a drag-to-reorder interface.",
      },
      {
        titleEn: "Brutalist Blog for Cursor",
        titleZh: "Cursor 野兽派博客",
        tool: "cursor",
        prompt:
          "Create a neo-brutalist blog in Next.js. Design tokens: border-width 3px, border-color black, border-radius 0, shadow '5px 5px 0px #000'. Implement a CSS utility .brutal-card that applies the standard brutalist treatment. Header: oversized site title with a colored highlight background. Post cards in a masonry grid with varying accent colors (rotate through: #ff006e, #ccff00, #00d9ff, #ff9500). Each card tilts slightly on hover. Code blocks with monospace font and a visible line-number gutter.",
      },
      {
        titleEn: "Brutalist Components for Claude",
        titleZh: "Claude 野兽派组件",
        tool: "claude",
        prompt:
          "Generate a neo-brutalist React component library with TypeScript. Components: BrutalButton (variants: primary/secondary/danger, all with thick borders and hard shadows), BrutalCard (no radius, thick border, accent color strip at top), BrutalInput (thick bottom border only, monospace placeholder), BrutalBadge (inline-block, uppercase, small, colored background), BrutalModal (centered, thick border, no backdrop blur - use a solid color overlay instead). All interactive elements shift shadow on click (4px 4px to 2px 2px). Use Tailwind CSS.",
      },
      {
        titleEn: "Brutalist Landing Page",
        titleZh: "野兽派落地页",
        tool: "general",
        prompt:
          "Design a neo-brutalist product landing page for a budgeting app. Background #fef6e4, all blocks with 3px solid #000 borders, zero border-radius, shadow 6px 6px 0px #000. Hero: 96px uppercase condensed headline in #000, a sticker-style badge rotated -6deg in #ff006e with white text, and a CTA button in #ccff00 that shifts to 3px 3px shadow on press. Feature section: three cards in alternating #8ecae6, #ffb703, #ffffff backgrounds. Marquee strip of repeating text between sections. Footer as one giant bordered block. Body text 18px monospace; keep contrast at least 4.5:1 — never place #ccff00 text on white.",
      },
      {
        titleEn: "Brutalist Pricing Page for v0",
        titleZh: "v0 野兽派定价页",
        tool: "v0",
        prompt:
          "Build a neo-brutalist pricing page with shadcn/ui, overriding all radii to 0. Three tier cards with 3px black borders and 5px 5px 0px #000 shadows on a #f4f1ea background: Free on #ffffff, Pro on #ffde59 with a 'BEST DEAL' banner strip crossing the top corner at -4deg, Team on #a2d2ff. Prices in 56px black extra-bold; feature rows separated by 2px dashed black dividers with X or check glyphs. Billing toggle styled as a chunky physical switch (2px border, hard shadow, instant snap — no easing). Comparison table below with a solid black header row and white uppercase text. Focus states: 3px offset black outline for keyboard users.",
      },
      {
        titleEn: "Brutalist Mobile App for Cursor",
        titleZh: "Cursor 野兽派移动应用",
        tool: "cursor",
        prompt:
          "Create a neo-brutalist habit tracker mobile UI in Next.js, mobile-first at 390px width. Palette: background #fffbeb, black #111111, accents #f97316 and #22d3ee. Every card: 2px solid black border, 4px 4px 0px #111 shadow, radius 0. Top bar: app name in 24px uppercase monospace with a hand-drawn-style underline SVG. Habit cards as a vertical stack with 16px gaps; tapping toggles a fat 28px checkbox that fills black with a white check, no transition (instant, mechanical). Streak counter in a rotated 3deg badge. Bottom tab bar: 4 equal cells divided by 2px black rules, active cell inverted to black/white. Touch targets minimum 48px.",
      },
      {
        titleEn: "Brutalist Docs Site for Claude",
        titleZh: "Claude 野兽派文档站",
        tool: "claude",
        prompt:
          "Generate a neo-brutalist documentation site in React with TypeScript. Layout: fixed 260px sidebar with a 3px black right border on #e9ff70 background, nav links as uppercase monospace 14px with a solid black square marker for the active page. Content area on #ffffff, max-w-3xl, headings with #ff006e highlight bars behind them. Code blocks: #111111 background, #ccff00 monospace text, 3px black border, 5px 5px 0px #ff006e shadow, and a bordered COPY button top-right. Tables with 2px black borders on every cell. Blockquote-style callouts on #8ecae6 with a bold 'NOTE:' prefix. Skip-to-content link and 3px black focus outlines for accessibility.",
      },
    ],
    useCases: [
      {
        titleEn: "Creative Agency Sites",
        titleZh: "创意机构站点",
        descriptionEn: "Design studios and agencies that want to showcase boldness and creative confidence.",
        descriptionZh: "想要展示大胆和创意自信的设计工作室和机构。",
      },
      {
        titleEn: "Developer Portfolios",
        titleZh: "开发者作品集",
        descriptionEn: "Programmers showcasing projects with a raw, technical aesthetic.",
        descriptionZh: "程序员用原始、技术感的美学展示项目。",
      },
      {
        titleEn: "Indie Products",
        titleZh: "独立产品",
        descriptionEn: "Indie apps and tools that stand out through unconventional, memorable design.",
        descriptionZh: "通过非常规、令人难忘的设计脱颖而出的独立应用和工具。",
      },
      {
        titleEn: "Event & Conference Sites",
        titleZh: "活动与会议站点",
        descriptionEn: "Tech conferences and creative events with bold, eye-catching branding.",
        descriptionZh: "具有大胆、抢眼品牌的科技会议和创意活动。",
      },
    ],
    faq: [
      {
        questionEn: "What is neo-brutalist web design?",
        questionZh: "什么是新野兽派网页设计？",
        answerEn:
          "Neo-brutalism is a design style featuring thick black borders (2-4px), hard-edge drop shadows (no blur), zero border-radius, high-contrast color combinations, monospace or bold typography, and intentionally raw, 'unfinished' aesthetics. It draws from architectural brutalism's philosophy of exposing raw structure rather than decorating it.",
        answerZh:
          "新野兽派是一种设计风格，特点是粗黑边框（2-4px）、硬边缘投影（无模糊）、零圆角、高对比色彩组合、等宽或粗体排版、以及刻意的原始「未完成」美学。它借鉴了建筑野兽派暴露原始结构而非装饰的哲学。",
      },
      {
        questionEn: "How to implement brutalist shadows in Tailwind?",
        questionZh: "如何在 Tailwind 中实现野兽派阴影？",
        answerEn:
          "Add a custom shadow to your Tailwind config: boxShadow: { brutal: '4px 4px 0px #000', 'brutal-sm': '2px 2px 0px #000', 'brutal-lg': '6px 6px 0px #000' }. Then use: 'shadow-brutal hover:shadow-brutal-sm active:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px]' for interactive press effects.",
        answerZh:
          "在 Tailwind 配置中添加自定义阴影：boxShadow: { brutal: '4px 4px 0px #000', 'brutal-sm': '2px 2px 0px #000', 'brutal-lg': '6px 6px 0px #000' }。然后使用：'shadow-brutal hover:shadow-brutal-sm active:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px]' 实现交互按压效果。",
      },
      {
        questionEn: "Is brutalist design accessible?",
        questionZh: "野兽派设计可访问吗？",
        answerEn:
          "Brutalist design can be highly accessible due to its high contrast and clear visual hierarchy. The bold borders and stark color differences actually help users with low vision. However, watch for: sufficient color contrast ratios (especially with bright accent colors), readable font sizes (monospace can be smaller than expected), and clear focus indicators. Avoid rotation or overlap that makes content hard to read.",
        answerZh:
          "由于高对比度和清晰的视觉层级，野兽派设计可以是高度可访问的。大胆的边框和鲜明的色彩差异实际上帮助弱视用户。但需注意：充足的色彩对比度（尤其是明亮的强调色）、可读的字号（等宽字体可能比预期更小）、清晰的焦点指示器。避免使内容难以阅读的旋转或重叠。",
      },
      {
        questionEn: "How thick should neo-brutalist borders be?",
        questionZh: "新野兽派边框应该多粗？",
        answerEn:
          "The sweet spot is 2-4px solid black. Use 2px for dense UI (inputs, table cells, badges), 3px as your default for cards and buttons, and 4-5px only for hero-level containers or the page frame itself. Keep the width consistent per element class — mixing 2px and 3px on sibling cards reads as a bug, not a choice. Match shadow offset to border weight: a 3px border pairs with a 4-6px hard shadow (box-shadow: 5px 5px 0px #000, no blur). Below 2px the style collapses into generic flat design; above 6px it starts eating usable space on mobile.",
        answerZh:
          "最佳区间是 2-4px 的黑色实线。密集 UI（输入框、表格单元、徽标）用 2px，卡片和按钮默认 3px，4-5px 只留给 hero 级容器或页面外框。同类元素的边框粗细要保持一致——同级卡片混用 2px 和 3px 会被读成 bug 而不是设计选择。阴影偏移要与边框粗细匹配：3px 边框配 4-6px 硬阴影（box-shadow: 5px 5px 0px #000，无模糊）。低于 2px 风格会塌成普通扁平设计；超过 6px 在移动端会开始吞掉可用空间。",
      },
      {
        questionEn: "What color palettes work for neo-brutalism?",
        questionZh: "新野兽派适合什么配色？",
        answerEn:
          "Start from a warm off-white base (#fef6e4, #fffbeb, or #f4f1ea — pure white feels too clinical) plus solid black #000 for every border and most text. Then add 2-3 loud accents from this proven set: hot pink #ff006e, acid yellow #ccff00, orange #f97316, sky #8ecae6, lime #a7f432. Rules: accents go on backgrounds and stickers, never on body text; black text sits on every accent (all of these pass 4.5:1 with black); and rotate accents per card rather than mixing several inside one component.",
        answerZh:
          "从暖调米白底色出发（#fef6e4、#fffbeb 或 #f4f1ea——纯白显得太冷冰冰），加上用于所有边框和大部分文字的纯黑 #000。然后从这组验证过的颜色里挑 2-3 个高声量强调色：荧光粉 #ff006e、酸性黄 #ccff00、橙 #f97316、天蓝 #8ecae6、青柠 #a7f432。规则：强调色用于背景和贴纸元素，绝不用于正文文字；每个强调色上都放黑色文字（以上颜色配黑字都能通过 4.5:1）；强调色按卡片轮换，而不是在同一组件里混用多个。",
      },
    ],
  },
  {
    slug: "japanese-aesthetic",
    titleEn: "Japanese Aesthetic Design Prompts",
    titleZh: "日式美学设计提示词",
    descriptionEn: "AI prompts for Zen, Wabi-Sabi, and traditional Japanese-inspired web interfaces with natural materials and mindful spacing.",
    descriptionZh: "灵感来自禅意、侘寂和传统日式美学的网页界面 AI 提示词，涵盖自然材质和用心间距。",
    keywords: [
      "Japanese web design prompt",
      "Zen design prompt",
      "Wabi-Sabi UI prompt",
      "Japanese aesthetic website",
      "minimalist Japanese design",
      "Zen garden design prompt",
    ],
    relatedStyleSlugs: [
      "japanese-fresh",
      "wabi-sabi",
      "zen-garden",
      "ukiyo-e-digital",
      "ink-wash",
      "cyber-wafuu",
    ],
    introEn:
      "Japanese aesthetic design draws from centuries-old principles like Wabi-Sabi (beauty in imperfection), Ma (negative space), and Zen simplicity. In web design, this translates to generous whitespace, natural material textures, muted earth-tone palettes, asymmetric but balanced compositions, and a sense of calm intentionality. Every element has breathing room, creating interfaces that feel meditative rather than busy.",
    introZh:
      "日式美学设计汲取数百年的原则，如侘寂（不完美之美）、间（负空间）和禅的简约。在网页设计中，这体现为充足的留白、自然材质纹理、柔和的大地色调配板、不对称但平衡的构图，以及宁静的有意为之感。每个元素都有呼吸空间，创造出冥想般而非忙碌的界面。",
    prompts: [
      {
        titleEn: "Zen Portfolio",
        titleZh: "禅意作品集",
        tool: "general",
        prompt:
          "Design a Zen-inspired portfolio website. Background: warm off-white (#f5f0e8) resembling washi paper. Accent colors: muted sage green (#8b9a7b) and charcoal (#3a3a3a). Typography: mix of thin sans-serif (heading) and a comfortable serif (body) with extra line-height (2.0). Layout: single column, max-width 720px, extremely generous vertical spacing (120px between sections). Navigation: minimal, horizontal text links with subtle ink-brush underline animation on hover. Images: full-width with natural aspect ratios, no rounded corners.",
      },
      {
        titleEn: "Wabi-Sabi for v0",
        titleZh: "v0 侘寂风格",
        tool: "v0",
        prompt:
          "Create a wabi-sabi-inspired blog using shadcn/ui. Use warm, imperfect aesthetics: off-white background (#faf6f0), slightly uneven border styles (dashed or dotted in muted brown), hand-drawn-feeling dividers (SVG wavy lines). Typography: serif for headings, sans-serif for body, both in warm charcoal (#4a4540). Cards with paper-like backgrounds and subtle texture. No sharp geometric shapes. Include: post list, about page, and a minimal photo gallery with organic masonry layout.",
      },
      {
        titleEn: "Zen Garden for Cursor",
        titleZh: "Cursor 禅意花园",
        tool: "cursor",
        prompt:
          "Build a Zen garden meditation app in Next.js. Color palette: stone (#e8e2d8), moss (#7d8b6e), bamboo (#c4a961), ink (#2d2d2d). Features: animated sand-raking pattern using SVG (CSS animation), daily quote display with fade-in transition, breathing exercise timer with circular animation, ambient sound controls with minimal icon buttons. Use maximum whitespace (Ma principle). All animations should be slow and deliberate (600ms+ duration, ease-in-out). No decorative borders, only subtle dividers.",
      },
      {
        titleEn: "Ink Wash Style for Claude",
        titleZh: "Claude 水墨风格",
        tool: "claude",
        prompt:
          "Generate React components with a Japanese ink wash (sumi-e) design aesthetic. Use: grayscale palette with warm undertones (#1a1a1a to #f5f0e8), ink-brush stroke dividers (SVG paths with organic curves), varying ink opacity for text hierarchy (100%, 70%, 40%). Components: PageSection (with ample Ma spacing), InkDivider (decorative separator), FadeInOnScroll wrapper, QuoteBlock (vertical text option for Japanese quotes). Spacing scale: 16, 32, 64, 96, 128px. All transitions should feel like brush strokes - slightly ease-out with 400ms duration.",
      },
      {
        titleEn: "Ryokan Booking Page",
        titleZh: "旅馆预订页",
        tool: "general",
        prompt:
          "Design a booking landing page for a traditional ryokan. Background: washi off-white #f7f3ec; text: sumi charcoal #2f2b28; accents: indigo #264573 for links and matcha #7d8b6e for the reserve button. Hero: full-bleed photograph with a vertical Japanese title on the right edge and a thin 1px #d8d0c2 rule framing the booking card. Booking card: date and guest fields with underline-only inputs, 48px tall, labels in 13px letter-spaced uppercase. Sections separated by 120px of white space, room cards in a 2-column grid with 4:3 photos and serif titles at 22px. Reserve button must keep 4.5:1 contrast (white text on #5c6b4f, the darkened matcha).",
      },
      {
        titleEn: "Tea Brand Store for v0",
        titleZh: "v0 茶品牌商店",
        tool: "v0",
        prompt:
          "Create a Japanese tea e-commerce storefront with shadcn/ui. Palette: kinari base #f5f0e8, sumi text #1f1d1a, hojicha brown #8a6f52 accents, sakura #e8c4c4 used only for a seasonal badge. Product grid: 3 columns with 48px gaps, square photos on subtle paper-texture cards, product names in a serif at 18px with 0.05em letter-spacing, prices in a light sans. Product page: single column max-w-2xl, brewing instructions as a numbered list with 2.0 line-height, temperature and steep time in a bordered spec table. Cart drawer slides in over 500ms ease-out. Buttons: outlined 1px #1f1d1a, filling on hover over 300ms. Alt text on every product image.",
      },
      {
        titleEn: "Haiku Journal for Cursor",
        titleZh: "Cursor 俳句日记",
        tool: "cursor",
        prompt:
          "Build a haiku journaling app in Next.js. Layout: single centered column, max-width 560px, on #faf7f0. Each entry card: no border, separated only by 96px of vertical space and a small hand-drawn SVG dot ornament. Haiku text: serif 20px, line-height 2.2, centered, ink #33302c at 90% opacity; date below in 12px letter-spaced #9a938a. Compose view: a borderless textarea with a 5-7-5 syllable counter that turns #b0543f only when exceeded (paired with a text hint, not color alone). Save action triggers a slow 700ms ink-fade transition. Optional vertical writing mode using writing-mode: vertical-rl for display. Keyboard shortcuts documented in a minimal help sheet.",
      },
      {
        titleEn: "Zen Meditation Mobile App for Claude",
        titleZh: "Claude 禅意冥想移动应用",
        tool: "claude",
        prompt:
          "Generate a React Native-style mobile meditation UI in React with TypeScript. Screens: today (one session card, nothing else), timer, and history. Palette: stone #ece7dd background, moss #6f7d62, ink #2d2a26, one warm accent kitsune #b39355 for the single primary action per screen. Timer screen: a thin 2px circular progress ring animating over the session length, centered remaining time in a light 48px serif, and nothing else on screen (Ma principle). History: a vertical list where each day is a small filled or hollow circle — include day labels for screen readers. All motion 600-800ms ease-in-out; respect prefers-reduced-motion by replacing animation with opacity fades. Touch targets 48px minimum.",
      },
    ],
    useCases: [
      {
        titleEn: "Tea / Wellness Brands",
        titleZh: "茶道 / 健康品牌",
        descriptionEn: "Tea companies, meditation apps, and wellness brands seeking calm, natural aesthetics.",
        descriptionZh: "茶品公司、冥想应用和健康品牌，追求宁静、自然的美学。",
      },
      {
        titleEn: "Architecture / Interior",
        titleZh: "建筑 / 室内设计",
        descriptionEn: "Japanese-inspired architecture firms and interior design portfolios.",
        descriptionZh: "日式建筑事务所和室内设计作品集。",
      },
      {
        titleEn: "Art Galleries",
        titleZh: "艺术画廊",
        descriptionEn: "Online galleries showcasing traditional or contemporary Japanese art.",
        descriptionZh: "展示传统或当代日本艺术的在线画廊。",
      },
      {
        titleEn: "Restaurant / Hospitality",
        titleZh: "餐饮 / 酒店",
        descriptionEn: "Japanese restaurants, ryokans, and hospitality brands with cultural authenticity.",
        descriptionZh: "具有文化真实感的日本餐厅、旅馆和酒店品牌。",
      },
    ],
    faq: [
      {
        questionEn: "What is Wabi-Sabi in web design?",
        questionZh: "网页设计中的侘寂是什么？",
        answerEn:
          "Wabi-Sabi translates the Japanese philosophy of finding beauty in imperfection to digital design. It uses organic textures (paper, stone, fabric), muted natural colors, asymmetric layouts, handcrafted-feeling typography, and intentional 'imperfections' like slightly irregular borders or hand-drawn elements. It creates warmth and authenticity in contrast to pixel-perfect corporate design.",
        answerZh:
          "侘寂将日本发现不完美之美的哲学转译到数字设计中。它使用有机纹理（纸、石、织物）、柔和的自然色彩、不对称布局、手工制作感的排版、以及刻意的「不完美」如略微不规则的边框或手绘元素。它在像素完美的企业设计的对比下创造温暖感和真实感。",
      },
      {
        questionEn: "How to use Ma (negative space) in web design?",
        questionZh: "如何在网页设计中运用间（负空间）？",
        answerEn:
          "Ma is not empty space but intentional breathing room. Apply it by: using larger margins between sections (80-120px instead of 40-60px), limiting content width (600-720px for reading), avoiding filling every area with content, using generous line-height (1.8-2.0), and leaving visual pause points where the eye can rest. In Tailwind: py-24 md:py-32 for sections, leading-relaxed or leading-loose for text.",
        answerZh:
          "间不是空白空间，而是有意图的呼吸空间。应用方法：使用更大的区块间距（80-120px 而非 40-60px）、限制内容宽度（阅读用 600-720px）、避免用内容填满每个区域、使用充足的行高（1.8-2.0）、留出视觉暂停点让眼睛休息。在 Tailwind 中：区块用 py-24 md:py-32，文字用 leading-relaxed 或 leading-loose。",
      },
      {
        questionEn: "What colors work for Japanese aesthetic design?",
        questionZh: "哪些颜色适合日式美学设计？",
        answerEn:
          "Traditional Japanese colors (Nihon no dentoshoku) offer a rich palette: kinari (raw silk off-white #f5f0e8), sumi (ink black #1a1a1a), matcha (tea green #7d8b6e), sakura (cherry blossom pink #f0c0c0), ai (indigo blue #264573), and kitsune (fox brown #c4a961). Use muted, desaturated versions and pair warm neutrals as the dominant tones.",
        answerZh:
          "日本传统色（日本の伝統色）提供丰富的配色：生成（生丝白 #f5f0e8）、墨（墨黑 #1a1a1a）、抹茶（茶绿 #7d8b6e）、樱（樱花粉 #f0c0c0）、蓝（蓝色 #264573）、狐（狐棕 #c4a961）。使用柔和、低饱和度的版本，以暖中性色作为主导色调。",
      },
      {
        questionEn: "What fonts pair well with Japanese aesthetic web design?",
        questionZh: "哪些字体适合日式美学网页设计？",
        answerEn:
          "For Latin text, pair a light humanist serif for headings (Cormorant Garamond, EB Garamond at 300-400 weight) with a quiet sans for UI (Zen Kaku Gothic New, Noto Sans at 300-400). For Japanese text, Noto Serif JP for editorial content and Zen Kaku Gothic for interfaces; Shippori Mincho adds a classical feel. Key settings matter more than the font itself: line-height 1.9-2.2, letter-spacing 0.02-0.05em on headings, font-weight rarely above 500, and body size 16-18px. Avoid heavy geometric sans faces — their mechanical evenness fights the organic, handcrafted tone.",
        answerZh:
          "拉丁文字部分，标题用轻盈的人文衬线（Cormorant Garamond、EB Garamond 的 300-400 字重），UI 用安静的无衬线（Zen Kaku Gothic New、Noto Sans 的 300-400）。日文部分，编辑内容用 Noto Serif JP，界面用 Zen Kaku Gothic；Shippori Mincho 更具古典气息。关键设置比字体本身更重要：行高 1.9-2.2、标题字距 0.02-0.05em、字重很少超过 500、正文 16-18px。避免厚重的几何无衬线——它们机械的均匀感与有机手工的调性相冲。",
      },
      {
        questionEn: "How is Japanese minimalism different from Western minimalism?",
        questionZh: "日式极简与西方极简有何不同？",
        answerEn:
          "Western minimalism (Swiss/Bauhaus lineage) is about reduction to geometric order: strict grids, pure white #ffffff, sharp black, symmetry, and sans-serif precision. Japanese minimalism is about emptiness with warmth: off-white paper tones (#f5f0e8), asymmetric balance (a hero image offset to one side with Ma filling the rest), organic textures, serifs and brush-like details, and slower, softer motion (500-800ms vs 150-250ms). Practically: Swiss minimal uses a 12-column grid filled edge to edge; Japanese minimal might use one column at 60% width with deliberate empty space carrying as much meaning as the content.",
        answerZh:
          "西方极简（瑞士/包豪斯血统）是向几何秩序做减法：严格网格、纯白 #ffffff、锐利的黑、对称、无衬线的精确。日式极简是带温度的留空：米白纸色（#f5f0e8）、不对称平衡（主图偏向一侧，剩余空间由「间」填满）、有机纹理、衬线与笔触感细节、更慢更柔的动效（500-800ms 对比 150-250ms）。实际来说：瑞士极简用 12 列网格铺满页面；日式极简可能只用一列 60% 宽度，刻意的空白与内容本身承载同等的意义。",
      },
    ],
  },
  {
    slug: "cyberpunk",
    titleEn: "Cyberpunk Design Prompts",
    titleZh: "赛博朋克设计提示词",
    descriptionEn: "AI prompts for futuristic, neon-lit interfaces with glitch effects, HUD elements, and dystopian aesthetics.",
    descriptionZh: "用于创建未来感、霓虹灯光界面的 AI 提示词，涵盖故障效果、HUD 元素和反乌托邦美学。",
    keywords: [
      "cyberpunk UI prompt",
      "neon UI design prompt",
      "futuristic web design prompt",
      "sci-fi HUD prompt",
      "cyberpunk Tailwind",
      "glitch effect design prompt",
    ],
    relatedStyleSlugs: [
      "cyberpunk-neon",
      "neon-tokyo",
      "sci-fi-hud",
      "outrun",
      "synthwave",
      "neon-samurai",
    ],
    introEn:
      "Cyberpunk design draws from science fiction to create immersive, high-tech interfaces with neon-on-dark color schemes, glitch and scanline effects, HUD (heads-up display) elements, futuristic typography, and a gritty urban aesthetic. These designs feel like operating a terminal in a neon-lit city, blending functionality with cinematic visual storytelling.",
    introZh:
      "赛博朋克设计从科幻中汲取灵感，创造沉浸式、高科技的界面，特点是暗底霓虹配色、故障和扫描线效果、HUD（平视显示）元素、未来感排版和粗粝的都市美学。这些设计感觉像在霓虹灯城市中操作终端，将功能性与电影式视觉叙事融为一体。",
    prompts: [
      {
        titleEn: "Cyberpunk Dashboard",
        titleZh: "赛博朋克仪表盘",
        tool: "general",
        prompt:
          "Design a cyberpunk-themed monitoring dashboard. Dark base (#0a0a0f) with neon accents: cyan (#00f0ff), magenta (#ff0080), and warning yellow (#ffe600). Use HUD-style corners on cards (triangular cut corners with neon borders). Monospace font (JetBrains Mono) for all text. Include: real-time data counters with flip-clock animation, hexagonal grid layout for status indicators, glitch effect on headings (CSS animation with clip-path), and scanline overlay on the entire page. Cards have angled/clipped corners using clip-path polygon.",
      },
      {
        titleEn: "Neon Tokyo for v0",
        titleZh: "v0 霓虹东京",
        tool: "v0",
        prompt:
          "Create a Neon Tokyo-themed event page with shadcn/ui. Ultra-dark background (#050510) with neon pink (#ff2d78) and electric blue (#2de2e6) accents. Include: a hero section with large glitched text and animated neon sign effect, event details in HUD-style cards with clip-path corners, a countdown timer with neon digit display, a speaker grid with cyberpunk-frame portraits, and a ticket purchase section with glowing CTA button. Add a subtle rain animation overlay using CSS.",
      },
      {
        titleEn: "Sci-Fi HUD for Cursor",
        titleZh: "Cursor 科幻 HUD",
        tool: "cursor",
        prompt:
          "Build a sci-fi HUD interface in Next.js. Design system: all elements use angular shapes (clip-path for diamond corners), cyan (#00f5ff) primary neon with dark navy (#0a1628) background. Create HUD components: TargetReticle, DataReadout (animated number counter), StatusBar (segmented progress), AlertPanel (blinking border), and RadarChart. Use CSS custom properties for neon glow: --neon-glow: 0 0 10px var(--neon-color), 0 0 20px var(--neon-color), 0 0 40px var(--neon-color). All text in monospace, uppercase with letter-spacing: 0.2em.",
      },
      {
        titleEn: "Glitch UI for Claude",
        titleZh: "Claude 故障 UI",
        tool: "claude",
        prompt:
          "Generate React components with cyberpunk glitch aesthetics. Create: GlitchText (CSS animation that randomly shifts text-shadow in RGB channels), NeonButton (glowing border + text, pulse animation on hover), HUDCard (angular clip-path corners, animated border trace on mount), DataStream (scrolling text ticker with monospace font), and CyberInput (underline-only with blinking cursor and cyan accent). Include a useGlitch() hook that randomly triggers visual glitch effects at intervals. Use Tailwind CSS with custom animations.",
      },
      {
        titleEn: "Cyberpunk Game Landing Page",
        titleZh: "赛博朋克游戏落地页",
        tool: "general",
        prompt:
          "Design a landing page for a cyberpunk video game. Base #05050a with a faint scanline overlay at 3% opacity. Hero: full-viewport keyart with the title in a stencil display font at 96px, cyan #00f0ff outer glow (text-shadow 0 0 20px), and a magenta #ff0080 glitch double-exposure that fires every 6 seconds. Nav: monospace uppercase, 13px, letter-spacing 0.25em, active link with an animated bracket [ ] wrapper. Sections: feature panels with clip-path cut corners and 1px cyan borders, a system-requirements table styled as a terminal readout, and a preorder CTA in solid #ff0080 with black text (7.2:1 contrast). Respect prefers-reduced-motion by disabling glitch and scanline animations.",
      },
      {
        titleEn: "Cyberpunk Music Player for v0",
        titleZh: "v0 赛博朋克音乐播放器",
        tool: "v0",
        prompt:
          "Build a synthwave music player with shadcn/ui. Background: vertical gradient #0a0a14 to #1a0a2e with a perspective grid floor in #ff2d78 at 30% opacity. Player card: clip-path angled corners, 1px #2de2e6 border with 0 0 12px glow. Album art framed by animated corner brackets. Waveform visualizer: 48 bars in a cyan-to-magenta gradient reacting to a mock amplitude array. Controls: circular play button with pulsing neon ring, skip buttons as outlined triangles. Track title in monospace uppercase with a marquee scroll when overflowing. Progress bar: 4px track in #1f1f33, #2de2e6 fill, and a diamond-shaped thumb. Label every control with aria-label since icons are abstract.",
      },
      {
        titleEn: "Cyberpunk Admin Panel for Cursor",
        titleZh: "Cursor 赛博朋克管理后台",
        tool: "cursor",
        prompt:
          "Build a cyberpunk admin panel in Next.js with Tailwind. Shell: left rail 64px wide with icon-only nav, icons in #7dd3fc turning #00f5ff with glow when active; main area on #0a0f1e with an 8px grid. Data tables: monospace 13px, header row with 1px bottom border in #00f5ff at 40% opacity, row hover raising background to #101830. Status chips: ONLINE #39ff14, DEGRADED #ffe600, OFFLINE #ff3b3b — each chip also shows its text label, never color alone. Charts use the neon palette on transparent backgrounds with 1px grid lines at 10% white. Modals slide in as HUD panels with an animated border trace over 400ms. Keep body text #d6e4ff at 14px for 4.5:1 contrast against the navy base.",
      },
      {
        titleEn: "Cyberpunk Portfolio for Claude",
        titleZh: "Claude 赛博朋克作品集",
        tool: "claude",
        prompt:
          "Generate a React portfolio site styled as a hacker terminal. Boot sequence: three lines of monospace text typing out over 2 seconds, skippable with any key press. Layout: max-w-4xl on #050508, all text in JetBrains Mono. Section headers rendered as shell prompts ('> projects --list') in #39ff14. Project cards: 1px #1f2937 border that ignites to #00f5ff with 0 0 16px glow on hover, tags as bracketed tokens in #ffe600. About section as a fake 'whoami' output block. Contact form inputs styled as command-line fields with a blinking block cursor. Include a visible-focus state (2px #ff0080 outline) and a 'disable effects' toggle that turns off all glows and animations.",
      },
    ],
    useCases: [
      {
        titleEn: "Gaming Platforms",
        titleZh: "游戏平台",
        descriptionEn: "Game launcher UIs, cyberpunk game websites, and esports tournament pages.",
        descriptionZh: "游戏启动器 UI、赛博朋克游戏官网和电竞锦标赛页面。",
      },
      {
        titleEn: "Music & Nightlife",
        titleZh: "音乐与夜生活",
        descriptionEn: "Electronic music artists, DJ portfolios, and nightclub event pages.",
        descriptionZh: "电子音乐艺术家、DJ 作品集和夜店活动页面。",
      },
      {
        titleEn: "Tech Product Launches",
        titleZh: "科技产品发布",
        descriptionEn: "Futuristic product reveal pages for hardware, AI tools, and cutting-edge software.",
        descriptionZh: "硬件、AI 工具和前沿软件的未来感产品发布页。",
      },
      {
        titleEn: "Data Visualization",
        titleZh: "数据可视化",
        descriptionEn: "Real-time monitoring dashboards and data exploration interfaces.",
        descriptionZh: "实时监控仪表盘和数据探索界面。",
      },
    ],
    faq: [
      {
        questionEn: "What is cyberpunk UI design?",
        questionZh: "什么是赛博朋克 UI 设计？",
        answerEn:
          "Cyberpunk UI design creates futuristic, high-tech interfaces inspired by sci-fi films (Blade Runner, Ghost in the Shell, Tron). Key elements: dark backgrounds with neon accent colors, glitch and scanline effects, HUD-style angular elements, monospace typography, and data-rich displays. It evokes a dystopian future where technology is omnipresent and visually intense.",
        answerZh:
          "赛博朋克 UI 设计创造灵感来自科幻电影（银翼杀手、攻壳机动队、创）的未来感高科技界面。关键元素：暗色背景配霓虹强调色、故障和扫描线效果、HUD 风格的棱角元素、等宽排版和数据密集的显示。它唤起一个技术无处不在且视觉强烈的反乌托邦未来。",
      },
      {
        questionEn: "How to create glitch effects in CSS?",
        questionZh: "如何在 CSS 中创建故障效果？",
        answerEn:
          "Use CSS animations with clip-path and text-shadow. For text glitch: animate text-shadow between RGB offset positions (e.g., '2px 0 red, -2px 0 cyan'). For visual glitch: use @keyframes to randomly change clip-path: inset() values, creating sliced visual distortions. Combine with mix-blend-mode for color channel separation. Add a pseudo-element with the same text offset for a double-vision effect.",
        answerZh:
          "使用 CSS 动画配合 clip-path 和 text-shadow。文字故障：在 RGB 偏移位置之间动画化 text-shadow（如 '2px 0 red, -2px 0 cyan'）。视觉故障：用 @keyframes 随机改变 clip-path: inset() 值，创造切片式视觉失真。配合 mix-blend-mode 实现色彩通道分离。添加相同文字偏移的伪元素实现重影效果。",
      },
      {
        questionEn: "What neon colors work best for cyberpunk design?",
        questionZh: "哪些霓虹色最适合赛博朋克设计？",
        answerEn:
          "Classic cyberpunk neon palette: cyan (#00f5ff), hot pink/magenta (#ff0080), electric purple (#bf00ff), neon green (#39ff14), and warning yellow (#ffe600). Use these sparingly against dark backgrounds (#0a0a0f to #1a1a2e). Apply glow effects via box-shadow and text-shadow with the same neon color at varying blur levels (10px, 20px, 40px).",
        answerZh:
          "经典赛博朋克霓虹配色：青色（#00f5ff）、玫红/品红（#ff0080）、电紫（#bf00ff）、霓虹绿（#39ff14）和警告黄（#ffe600）。在深色背景（#0a0a0f 至 #1a1a2e）上谨慎使用。通过 box-shadow 和 text-shadow 施加发光效果，使用不同模糊级别（10px、20px、40px）的相同霓虹色。",
      },
      {
        questionEn: "How do I make neon glow effects accessible?",
        questionZh: "如何让霓虹发光效果满足无障碍要求？",
        answerEn:
          "Four rules: first, contrast is measured on the text color itself, not the glow — cyan #00f5ff on #0a0a0f passes easily (13:1), but magenta #ff0080 on dark navy only reaches about 4.6:1, so reserve it for large text or backgrounds with black text. Second, glow blurs text edges; compensate with 500-600 font weight and never glow body text below 18px — glow headings and accents only. Third, wrap flicker and glitch loops in @media (prefers-reduced-motion: reduce) and keep any flashing under 3 flashes per second (WCAG 2.3.1 seizure threshold). Fourth, status colors need text labels, since neon palettes are brutal for color-blind users.",
        answerZh:
          "四条规则：第一，对比度按文字本身颜色计算，不算光晕——#00f5ff 青色在 #0a0a0f 上轻松通过（13:1），但 #ff0080 品红在深藏蓝上只有约 4.6:1，应留给大字或配黑字的背景使用。第二，光晕会模糊文字边缘；用 500-600 字重补偿，且 18px 以下的正文绝不加光晕——只给标题和强调元素发光。第三，闪烁和故障循环要包在 @media (prefers-reduced-motion: reduce) 里，任何闪烁保持每秒 3 次以下（WCAG 2.3.1 癫痫阈值）。第四，状态色必须配文字标签，霓虹配色对色盲用户非常不友好。",
      },
      {
        questionEn: "What fonts are used in cyberpunk interfaces?",
        questionZh: "赛博朋克界面用什么字体？",
        answerEn:
          "Monospace is the backbone: JetBrains Mono, IBM Plex Mono, or Share Tech Mono for data, labels, and body text at 13-15px. For display headings, use angular or stencil faces: Orbitron, Rajdhani, Chakra Petch, or Michroma at 600-700 weight. The signature treatment: uppercase everything structural, letter-spacing 0.15-0.25em on labels, and tabular figures for counters. Pair exactly one display face with one mono — adding a third font breaks the terminal illusion. Avoid rounded humanist fonts (Inter, Nunito); their softness contradicts the hard-edged HUD language.",
        answerZh:
          "等宽字体是骨架：数据、标签和正文用 JetBrains Mono、IBM Plex Mono 或 Share Tech Mono，13-15px。展示型标题用棱角或镂空字体：Orbitron、Rajdhani、Chakra Petch 或 Michroma，600-700 字重。标志性处理：结构性文字全大写、标签字距 0.15-0.25em、计数器用等宽数字。严格搭配一个展示字体加一个等宽字体——引入第三种字体会打破终端幻觉。避免圆润的人文字体（Inter、Nunito），它们的柔和感与硬朗的 HUD 语言相矛盾。",
      },
    ],
  },
  {
    slug: "tailwind-ui",
    titleEn: "Tailwind CSS UI Prompts",
    titleZh: "Tailwind CSS UI 提示词",
    descriptionEn: "AI prompts optimized for Tailwind CSS — responsive layouts, component patterns, design tokens, and utility-first styling.",
    descriptionZh: "为 Tailwind CSS 优化的 AI 提示词 — 响应式布局、组件模式、design tokens 和工具类优先样式。",
    keywords: [
      "Tailwind UI prompt",
      "Tailwind CSS component prompt",
      "Tailwind design prompt",
      "Tailwind layout prompt",
      "shadcn UI prompt",
      "Tailwind responsive design",
    ],
    relatedStyleSlugs: [
      "minimalist-flat",
      "corporate-clean",
      "stripe-style",
      "apple-style",
      "github-style",
      "notion-style",
    ],
    introEn:
      "Tailwind CSS is the most popular utility-first CSS framework for AI-generated code. When prompting AI tools to generate Tailwind code, being specific about classes, breakpoints, spacing values, and component patterns produces dramatically better results. This collection provides optimized prompts that speak Tailwind's language, helping AI tools generate production-ready code with proper responsive design, dark mode support, and accessible markup.",
    introZh:
      "Tailwind CSS 是 AI 生成代码中最流行的工具类优先 CSS 框架。在提示 AI 工具生成 Tailwind 代码时，具体指定类名、断点、间距值和组件模式能产生显著更好的结果。本合集提供使用 Tailwind 语言优化的提示词，帮助 AI 工具生成具备响应式设计、暗黑模式支持和可访问标记的生产就绪代码。",
    prompts: [
      {
        titleEn: "Responsive Navigation",
        titleZh: "响应式导航",
        tool: "general",
        prompt:
          "Build a responsive navigation bar with Tailwind CSS. Desktop: horizontal nav with logo (left), links (center), and CTA button (right) using 'flex items-center justify-between max-w-7xl mx-auto px-6 h-16'. Mobile: hamburger menu button that toggles a full-screen overlay nav using 'fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-8'. Breakpoint: 'md' for the switch. Include smooth transition with 'transition-all duration-300'. Support dark mode with 'dark:bg-zinc-950 dark:text-white'.",
      },
      {
        titleEn: "Component Grid for v0",
        titleZh: "v0 组件网格",
        tool: "v0",
        prompt:
          "Create a responsive card grid using shadcn/ui and Tailwind. Grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'. Each card: shadcn Card with CardHeader (image placeholder, aspect-video), CardContent (title in font-semibold, description in text-sm text-muted-foreground), CardFooter (price badge and action button). Cards should have 'hover:shadow-lg transition-shadow' and 'group' class for hover effects on the image (scale-105). Include skeleton loading state using shadcn Skeleton component.",
      },
      {
        titleEn: "Form Layout for Cursor",
        titleZh: "Cursor 表单布局",
        tool: "cursor",
        prompt:
          "Build a multi-step form with Tailwind CSS in Next.js. Container: 'max-w-2xl mx-auto py-12 px-6'. Step indicator: horizontal dots connected by lines, active step highlighted. Each step: form fields using 'space-y-6' with labels in 'text-sm font-medium' and inputs in 'w-full px-3 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-zinc-900 dark:border-zinc-700'. Navigation: 'flex justify-between mt-8' with Back/Next buttons. Animate step transitions with 'transition-opacity duration-200'.",
      },
      {
        titleEn: "Design Tokens for Claude",
        titleZh: "Claude Design Tokens",
        tool: "claude",
        prompt:
          "Generate a Tailwind CSS configuration with a complete design token system. Include: custom color palette (primary, secondary, accent, success, warning, danger, each with 50-950 shades), spacing scale extending the default (adding 18, 22, 30 for fine-grained control), custom font family stack (sans, serif, mono), border-radius tokens (none, sm, md, lg, xl, full), box-shadow tokens (sm, md, lg, xl, glow), and custom animation tokens (fade-in, slide-up, scale-in). Also create CSS custom properties that mirror the tokens for use in non-Tailwind contexts. Output as a tailwind.config.ts file.",
      },
      {
        titleEn: "Tailwind v4 Theme Setup",
        titleZh: "Tailwind v4 主题配置",
        tool: "general",
        prompt:
          "Set up a Tailwind CSS v4 project theme using the CSS-first configuration (no tailwind.config.js). In globals.css: '@import \"tailwindcss\";' followed by an @theme block defining --color-brand-50 through --color-brand-950 (base #4f46e5), --font-sans: 'Inter', system-ui, --radius-card: 1rem, and --spacing-section: 6rem. Add a custom dark variant with '@custom-variant dark (&:where(.dark, .dark *))'. Demonstrate usage: a hero section with bg-brand-600 text-white, cards using rounded-[--radius-card], and section padding py-[--spacing-section]. Include one @utility definition for a text-balance helper. All interactive elements need focus-visible:ring-2 ring-brand-500.",
      },
      {
        titleEn: "Dashboard Shell for v0",
        titleZh: "v0 仪表盘外壳",
        tool: "v0",
        prompt:
          "Create a responsive dashboard shell with shadcn/ui and Tailwind. Desktop: CSS grid 'grid-cols-[240px_1fr]' with a sidebar (border-r border-zinc-200 dark:border-zinc-800, nav items 'flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800', active item bg-zinc-100 font-medium). Mobile: sidebar becomes a shadcn Sheet triggered from the top bar. Top bar: h-14 with breadcrumbs, a search input (w-64, pl-9 with an absolute icon), and an avatar dropdown. Content: 'p-6 lg:p-8 space-y-6' with a 4-card stat row 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'. Sidebar nav needs aria-current on the active link.",
      },
      {
        titleEn: "Marketing Page Sections for Cursor",
        titleZh: "Cursor 营销页区块",
        tool: "cursor",
        prompt:
          "Build three reusable marketing sections in Next.js with Tailwind. Hero: 'py-24 lg:py-32' with headline 'text-5xl lg:text-6xl font-bold tracking-tight text-balance', subtext 'mt-6 text-lg text-zinc-600 max-w-2xl mx-auto', dual CTAs (primary bg-zinc-900 text-white, secondary ring-1 ring-zinc-300). Logo cloud: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center' with grayscale logos gaining color on hover. Feature bento: 'grid lg:grid-cols-3 gap-4' where the first card spans lg:col-span-2, each 'rounded-2xl bg-zinc-50 p-8 ring-1 ring-zinc-200'. Dark mode via dark: variants throughout; headings must maintain 4.5:1 contrast in both themes.",
      },
      {
        titleEn: "Data Table Component for Claude",
        titleZh: "Claude 数据表格组件",
        tool: "claude",
        prompt:
          "Generate a reusable TypeScript DataTable component styled purely with Tailwind. Wrapper: 'overflow-x-auto rounded-lg ring-1 ring-zinc-200 dark:ring-zinc-800'. Table: 'w-full text-sm', header 'bg-zinc-50 dark:bg-zinc-900 text-left text-xs font-medium uppercase tracking-wide text-zinc-500', cells 'px-4 py-3 border-t border-zinc-100 dark:border-zinc-800'. Features: sortable columns (chevron icons with aria-sort on th), row selection with a checkbox column, zebra striping via odd:bg-zinc-50/50, sticky header with 'sticky top-0', numeric columns right-aligned with tabular-nums, and a pagination footer 'flex items-center justify-between px-4 py-3'. Provide loading skeleton rows and an empty state. Use scope=\"col\" on headers for screen readers.",
      },
    ],
    useCases: [
      {
        titleEn: "Rapid Prototyping",
        titleZh: "快速原型",
        descriptionEn: "Quickly building functional prototypes with utility-first CSS and AI tools.",
        descriptionZh: "用工具类优先 CSS 和 AI 工具快速构建功能原型。",
      },
      {
        titleEn: "Design System Implementation",
        titleZh: "设计系统实现",
        descriptionEn: "Translating Figma designs into Tailwind component libraries.",
        descriptionZh: "将 Figma 设计转化为 Tailwind 组件库。",
      },
      {
        titleEn: "Full-Stack Applications",
        titleZh: "全栈应用",
        descriptionEn: "Building complete Next.js/React applications with consistent Tailwind styling.",
        descriptionZh: "使用一致的 Tailwind 样式构建完整的 Next.js/React 应用。",
      },
      {
        titleEn: "Component Library",
        titleZh: "组件库",
        descriptionEn: "Creating reusable component libraries with Tailwind variants and shadcn/ui.",
        descriptionZh: "使用 Tailwind 变体和 shadcn/ui 创建可复用组件库。",
      },
    ],
    faq: [
      {
        questionEn: "How to write better Tailwind prompts for AI?",
        questionZh: "如何为 AI 写更好的 Tailwind 提示词？",
        answerEn:
          "Be specific about Tailwind classes: mention exact breakpoints (sm, md, lg, xl), spacing values (p-4, gap-6, my-8), colors (zinc-900, blue-500), and layout utilities (flex, grid, grid-cols-3). Reference shadcn/ui components by name when applicable. Specify dark mode requirements (dark: prefix). Include responsive behavior explicitly. StyleKit prompts are pre-optimized with these Tailwind-specific details.",
        answerZh:
          "具体指定 Tailwind 类名：提到精确的断点（sm、md、lg、xl）、间距值（p-4、gap-6、my-8）、颜色（zinc-900、blue-500）和布局工具类（flex、grid、grid-cols-3）。适用时引用 shadcn/ui 组件名称。指定暗黑模式需求（dark: 前缀）。明确包含响应式行为。StyleKit 的提示词已预先用这些 Tailwind 特定细节优化。",
      },
      {
        questionEn: "What is the best way to organize Tailwind in large projects?",
        questionZh: "大型项目中组织 Tailwind 的最佳方式是什么？",
        answerEn:
          "Use design tokens in tailwind.config (custom colors, spacing, shadows), create reusable component classes with @apply only in component CSS modules (not globally), use CSS custom properties for theme values that change (dark mode, user preferences), organize components with consistent naming, and leverage shadcn/ui as a component foundation. Avoid long className strings by extracting repeated patterns into components.",
        answerZh:
          "在 tailwind.config 中使用 design tokens（自定义颜色、间距、阴影），仅在组件 CSS 模块中（非全局）用 @apply 创建可复用组件类，使用 CSS 自定义属性处理会变化的主题值（暗黑模式、用户偏好），用一致的命名组织组件，利用 shadcn/ui 作为组件基础。通过将重复模式提取为组件来避免过长的 className 字符串。",
      },
      {
        questionEn: "How does StyleKit work with Tailwind CSS?",
        questionZh: "StyleKit 如何与 Tailwind CSS 配合？",
        answerEn:
          "StyleKit provides 135 visual styles, each with Tailwind-compatible design tokens (colors, spacing, border-radius, shadows, typography). You can export these tokens directly into your Tailwind workflow, use them as AI prompts for code generation, or copy individual component recipes with Tailwind classes. StyleKit bridges the gap between design intent and Tailwind implementation.",
        answerZh:
          "StyleKit 提供 135 种视觉风格，每种都有 Tailwind 兼容的 design tokens（颜色、间距、圆角、阴影、排版）。你可以把这些 tokens 用于 Tailwind 工作流、AI 代码生成提示词，或复制带有 Tailwind 类名的组件配方。StyleKit 连接了设计意图与 Tailwind 实现之间的桥梁。",
      },
      {
        questionEn: "What changed in Tailwind CSS v4?",
        questionZh: "Tailwind CSS v4 有哪些变化？",
        answerEn:
          "Tailwind v4 moves configuration from tailwind.config.js into CSS: you import with '@import \"tailwindcss\"' and define tokens in an @theme block as CSS variables (--color-brand-500, --font-display, --breakpoint-3xl). Custom utilities use @utility, custom variants use @custom-variant, and every design token is automatically exposed as a native CSS variable you can read with var(). The engine (Oxide) is significantly faster, content detection is automatic (no content array), and arbitrary values plus container queries are built in. Most v3 utility classes work unchanged; the migration mainly touches config, plugins, and @apply usage.",
        answerZh:
          "Tailwind v4 把配置从 tailwind.config.js 移进了 CSS：通过 '@import \"tailwindcss\"' 引入，在 @theme 块中以 CSS 变量定义 tokens（--color-brand-500、--font-display、--breakpoint-3xl）。自定义工具类用 @utility，自定义变体用 @custom-variant，且每个 design token 都自动暴露为原生 CSS 变量，可用 var() 读取。新引擎（Oxide）显著更快，内容检测自动完成（不再需要 content 数组），任意值和容器查询均为内置。大多数 v3 工具类无需改动；迁移主要涉及配置、插件和 @apply 的用法。",
      },
      {
        questionEn: "Should I use @apply in Tailwind?",
        questionZh: "Tailwind 中该不该用 @apply？",
        answerEn:
          "Sparingly. The Tailwind team's guidance: extract repeated patterns into framework components (a React Button), not into @apply classes — components keep markup, logic, and styles together, while @apply recreates the naming and cache-invalidation problems utility CSS was designed to avoid. Legitimate uses: styling third-party markup you cannot edit (rendered markdown, CMS output), and small global primitives like a shared focus ring. In v4, @apply inside separate files needs '@reference \"../app.css\"' to see your theme. If a class string repeats three or more times, reach for a component or a cva() variant map first.",
        answerZh:
          "要克制。Tailwind 团队的指导意见：把重复模式提取为框架组件（比如 React 的 Button），而不是 @apply 类——组件让标记、逻辑和样式聚合在一起，而 @apply 会重新制造工具类 CSS 本来要避免的命名和缓存失效问题。正当用途：给无法编辑的第三方标记设置样式（渲染后的 markdown、CMS 输出），以及共享焦点环这类小型全局基元。v4 中，独立文件里的 @apply 需要 '@reference \"../app.css\"' 才能读到主题。如果一个类名字符串重复三次以上，优先考虑组件或 cva() 变体映射。",
      },
    ],
  },
];
