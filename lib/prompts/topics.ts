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
          "StyleKit provides 130+ visual styles, each with Tailwind-compatible design tokens (colors, spacing, border-radius, shadows, typography). You can export these tokens directly into your tailwind.config, use them as AI prompts for code generation, or copy individual component recipes with Tailwind classes. StyleKit bridges the gap between design intent and Tailwind implementation.",
        answerZh:
          "StyleKit 提供 120+ 种视觉风格，每种都有 Tailwind 兼容的 design tokens（颜色、间距、圆角、阴影、排版）。你可以将这些 tokens 直接导出到 tailwind.config，作为 AI 提示词用于代码生成，或复制包含 Tailwind 类名的单个组件配方。StyleKit 连接了设计意图与 Tailwind 实现之间的桥梁。",
      },
    ],
  },
];
