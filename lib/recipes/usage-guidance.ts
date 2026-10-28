export type UsageGuideComponentId =
  | "button"
  | "card"
  | "input"
  | "nav"
  | "hero"
  | "footer"
  | "others";

export interface LocalizedUsageCopy {
  zh: string;
  en: string;
}

export interface ComponentUsageGuidance {
  componentId: UsageGuideComponentId;
  title: LocalizedUsageCopy;
  whenToUse: LocalizedUsageCopy;
  whenNotToUse: LocalizedUsageCopy;
  semanticsAndInteraction: LocalizedUsageCopy;
  exampleScope: LocalizedUsageCopy;
  motion: LocalizedUsageCopy;
}

export const COMPONENT_USAGE_SETUP = {
  title: {
    zh: "项目接入",
    en: "Project setup",
  },
  stack: {
    zh: "代码片段面向 React 与 Tailwind CSS 4 项目。请把组件源码放进自己的组件目录，并按需从页面导入。",
    en: "These snippets target a React and Tailwind CSS 4 project. Put the component source in your project's component directory and import it where needed.",
  },
  themeBoundary: {
    zh: "当前配方工具生成的是 Tailwind 类名和字面色值，不会自动映射到接入项目的主题 token。主题配置与组件文件是两种交付物：样式设置不会自动生成组件源码；复制后请按项目主题核对颜色和字体。",
    en: "The current recipe utility outputs Tailwind classes and literal color values; it does not automatically map them to the consuming project's theme tokens. Theme setup and component files are separate deliverables: style configuration does not create the component source. Review colors and fonts after copying it.",
  },
  tailwindSetup: {
    zh: "确认项目的全局 CSS 已配置 Tailwind CSS 4。若已经有这行，就保留现有配置，不要重复添加。",
    en: "Make sure the app's global CSS is configured for Tailwind CSS 4. If this line is already present, keep the existing setup and do not add it again.",
  },
  externalAssets: {
    zh: "如果原模板引用了外部字体、图片或本地资源，请一并确认它们的来源和路径；这些资源不会由组件代码或依赖列表自动提供。",
    en: "If the source template references external fonts, images, or local assets, check their source and paths as well; the component code and dependency list do not provide those assets automatically.",
  },
  clientBoundary: {
    static: {
      zh: "静态 JSX 和样式无需添加 `use client`。只有加入事件处理器、state 或客户端 Hook 时，才在承载交互的组件边界添加。",
      en: "Static JSX and styles do not need `use client`. Add it at the component boundary that owns the interaction only when you add event handlers, state, or client-only hooks.",
    },
    interactive: {
      zh: "当前组件包含客户端交互，需要在承载这些行为的组件边界添加 `use client`。",
      en: "This component includes client-side interaction and needs `use client` at the component boundary that owns that behavior.",
    },
  },
  dependencies: {
    zh: "这里只列出组件额外依赖。按项目现有包管理器安装需要的包。",
    en: "Only additional component dependencies are listed here. Add required packages with your project's existing package manager.",
  },
  noDependencies: {
    zh: "这个示例无需额外安装组件库。",
    en: "This example needs no additional component packages.",
  },
  tailwindCssImport: '@import "tailwindcss";',
} as const;

const guidance: Record<UsageGuideComponentId, ComponentUsageGuidance> = {
  button: {
    componentId: "button",
    title: { zh: "按钮", en: "Button" },
    whenToUse: {
      zh: "用按钮执行当前页面上的动作，例如提交、保存、切换或打开对话框。",
      en: "Use a button for an action on the current page, such as submitting, saving, toggling, or opening a dialog.",
    },
    whenNotToUse: {
      zh: "如果操作会前往另一个 URL 或页面，请用带真实 `href` 的链接，而不是用按钮模拟导航。",
      en: "If the action navigates to another URL or page, use a link with a real `href` instead of simulating navigation with a button.",
    },
    semanticsAndInteraction: {
      zh: "使用原生 `<button>` 并明确设置 `type=\"button\"` 或 `type=\"submit\"`。保留键盘可操作和清晰的焦点样式；重要动作不能只靠 hover 才出现，触屏用户也要能直接使用。",
      en: "Use a native `<button>` and set `type=\"button\"` or `type=\"submit\"` explicitly. Keep it keyboard-operable with a visible focus style; essential actions must remain available without hover so touch users can use them directly.",
    },
    exampleScope: {
      zh: "预览展示外观与交互状态；请在业务页面接上真实动作，并按表单场景补充禁用、加载或成功反馈。",
      en: "The preview demonstrates appearance and interaction states. Connect the real action in your page and add disabled, loading, or success feedback where the task needs it.",
    },
    motion: {
      zh: "如果按钮带有过渡或按压动画，尊重系统的减少动态效果设置，并确保状态变化仍清晰可辨。",
      en: "If the button has transitions or press animations, respect the system's reduced-motion preference and keep state changes clear.",
    },
  },
  card: {
    componentId: "card",
    title: { zh: "卡片", en: "Card" },
    whenToUse: {
      zh: "用卡片把相关内容组织成一个易扫读的单元，例如商品、文章摘要或仪表盘指标。",
      en: "Use a card to group related content into an easy-to-scan unit, such as a product, article summary, or dashboard metric.",
    },
    whenNotToUse: {
      zh: "只有纯信息展示时，不要让整张卡片看起来像可点击控件；卡片里有多个独立动作时，也不要把所有内容包进一个点击目标。",
      en: "For informational content, do not make the whole card look interactive. When a card contains multiple independent actions, do not wrap all of them in one click target.",
    },
    semanticsAndInteraction: {
      zh: "若整张卡片只触发一个动作，使用单一原生 `<button>` 或带 `href` 的 `<a>`，避免可点击 `<div>`。它必须支持键盘、显示焦点，并且不能依赖 hover 才显示操作；卡片内部不要嵌套另一个链接或按钮。",
      en: "If the whole card triggers one action, use one native `<button>` or an `<a>` with an `href`; avoid a clickable `<div>`. It must work with a keyboard, show focus, and keep its action available without hover. Do not nest another link or button inside it.",
    },
    exampleScope: {
      zh: "预览展示内容层级与外观。是否整卡可点、点击后去哪里，以及是否包含独立操作，由实际内容决定。",
      en: "The preview shows content hierarchy and appearance. Whether the whole card is clickable, where it leads, and which independent actions it contains depend on the actual content.",
    },
    motion: {
      zh: "如果卡片使用悬停位移、缩放或阴影动画，触屏下仍要有清楚的可操作提示，并尊重系统的减少动态效果设置。",
      en: "If a card uses hover movement, scaling, or shadow animation, keep its action clear on touch devices and respect the system's reduced-motion preference.",
    },
  },
  input: {
    componentId: "input",
    title: { zh: "输入框", en: "Input" },
    whenToUse: {
      zh: "用输入控件收集一项明确的数据，并通过字段标签或周边说明告诉用户预期格式和用途。",
      en: "Use an input to collect one clearly defined piece of data, and explain its purpose and expected format with a field label or nearby help text.",
    },
    whenNotToUse: {
      zh: "选项有限且固定时优先考虑单选或分段选项；长文本内容则使用文本域。",
      en: "For a small fixed set of choices, consider radios or segmented options. Use a textarea for longer text.",
    },
    semanticsAndInteraction: {
      zh: "为每个输入框提供真实且关联的 `<label>`；placeholder 只能示例格式或输入内容，不能替代标签。保留键盘焦点、可读错误提示和合适的 `type`。",
      en: "Give every input a real, associated `<label>`; a placeholder may show an example but must not replace the label. Keep keyboard focus visible, provide readable errors, and choose an appropriate `type`.",
    },
    exampleScope: {
      zh: "预览展示字段外观。实际表单仍需由页面定义名称、校验、错误文案、提交过程和提交结果。",
      en: "The preview demonstrates field styling. The page still needs to define the field name, validation, error copy, submission flow, and result.",
    },
    motion: {
      zh: "输入和错误反馈不应依赖动画才能理解；若有动效，尊重系统减少动态效果设置。",
      en: "Input and error feedback must be understandable without animation. Respect the system's reduced-motion preference when motion is used.",
    },
  },
  nav: {
    componentId: "nav",
    title: { zh: "导航", en: "Navigation" },
    whenToUse: {
      zh: "用导航区域帮助用户在站点或当前产品区域之间移动，并让当前位置容易辨认。",
      en: "Use a navigation region to move between site or product areas and make the current location easy to recognize.",
    },
    whenNotToUse: {
      zh: "页面内的执行动作（如打开菜单、切换面板）用按钮；不要用无效 `href` 或纯文本伪装链接。",
      en: "Use buttons for page actions such as opening a menu or switching a panel. Do not use empty `href` values or plain text to imitate links.",
    },
    semanticsAndInteraction: {
      zh: "用 `<nav>` 包含有意义的链接集合，每个目的地提供真实 `href`，当前页面链接标注 `aria-current=\"page\"`。让 Tab 顺序自然、焦点清楚；菜单不能只靠 hover 打开，触屏也应可操作。",
      en: "Use `<nav>` for a meaningful group of links, give each destination a real `href`, and mark the current page link with `aria-current=\"page\"`. Keep natural Tab order and visible focus. Menus must not open only on hover and should work on touch.",
    },
    exampleScope: {
      zh: "预览展示导航的布局和视觉状态，不代表实际路由、当前页识别或菜单开合逻辑；这些需要接入应用。",
      en: "The preview shows the navigation layout and visual states. It does not define real routes, current-page detection, or menu behavior; connect those in the app.",
    },
    motion: {
      zh: "若菜单或导航项带有展开/切换动画，支持系统减少动态效果设置，并保持焦点位置稳定。",
      en: "If menus or navigation items animate when opening or changing, support reduced motion and keep focus in a predictable place.",
    },
  },
  hero: {
    componentId: "hero",
    title: { zh: "首屏区块", en: "Hero section" },
    whenToUse: {
      zh: "在页面顶部说明产品或页面的核心价值，并给出一条最重要的下一步。",
      en: "Use a hero near the top of a page to explain its main value and present the most important next step.",
    },
    whenNotToUse: {
      zh: "内容不需要强主视觉或页面已经有明确标题时，避免再增加一个抢层级的首屏；一个页面通常只保留一个主标题。",
      en: "Skip a dominant hero when the content does not need one or the page already has a clear heading. A page should usually have one primary heading.",
    },
    semanticsAndInteraction: {
      zh: "用有意义的 `<section>` 和正确的标题层级组织文案。按钮用于页面动作，导航 CTA 使用真实链接；键盘焦点应可见，触屏不能依赖 hover 才显示 CTA。",
      en: "Use a meaningful `<section>` and a correct heading hierarchy. Use a button for an in-page action and a real link for a navigation CTA. Keep keyboard focus visible and do not reveal the CTA only on hover.",
    },
    exampleScope: {
      zh: "替换演示标题、说明、行动文案和图片，让它们对应真实产品及页面目标；外部图片或字体需按原模板单独确认。",
      en: "Replace the sample heading, copy, action text, and imagery with the real product and page goal. Check external images or fonts separately against the source template.",
    },
    motion: {
      zh: "装饰性入场、视差或自动播放效果应尊重系统减少动态效果设置；核心信息和行动入口无需等待动画。",
      en: "Decorative entrances, parallax, or autoplay should respect reduced motion. Core information and actions must not depend on waiting for an animation.",
    },
  },
  footer: {
    componentId: "footer",
    title: { zh: "页脚", en: "Footer" },
    whenToUse: {
      zh: "在页面末尾放置次要导航、联系信息、品牌说明或法律链接，帮助用户继续浏览或完成查找。",
      en: "Use a footer for secondary navigation, contact details, brand context, or legal links that help people continue browsing or find essential information.",
    },
    whenNotToUse: {
      zh: "不要把主任务或唯一重要行动藏在页脚；简单页面也无需为了填满空间堆叠无用栏目。",
      en: "Do not hide the main task or the only important action in the footer. A simple page does not need extra columns just to fill space.",
    },
    semanticsAndInteraction: {
      zh: "使用 `<footer>` 和有名称的链接组；链接提供真实目的地，键盘焦点清楚。页脚链接无需 hover 才可见，触屏也能直接点按。",
      en: "Use `<footer>` with named groups of links and real destinations. Keep keyboard focus visible; links must be visible without hover and easy to tap on touch devices.",
    },
    exampleScope: {
      zh: "替换为项目真实的联系、政策和导航链接；先核对每个链接目标，再决定保留哪些栏目。",
      en: "Replace the sample with the project's real contact, policy, and navigation links. Check each destination before keeping a section.",
    },
    motion: {
      zh: "页脚通常无需复杂动效；若有滚动揭示或装饰动画，尊重系统减少动态效果设置。",
      en: "Footers rarely need elaborate motion. If you use scroll reveals or decorative animation, respect the system's reduced-motion preference.",
    },
  },
  others: {
    componentId: "others",
    title: { zh: "组件", en: "Component" },
    whenToUse: {
      zh: "先确认这段组件对应的具体任务，再沿用其视觉样式，并把内容和行为接到真实页面。",
      en: "Identify the task this component supports, then apply its visual style while connecting its content and behavior to the real page.",
    },
    whenNotToUse: {
      zh: "如果组件的元素类型与用户要做的事不符，不要只为了保留外观而沿用；选择最贴近实际行为的语义元素。",
      en: "Do not keep a component just for its appearance when its element type does not match the user's task; choose semantics that match the actual behavior.",
    },
    semanticsAndInteraction: {
      zh: "交互控件应能通过键盘到达并操作，显示清楚的焦点状态；动作入口在触屏下也必须可见、可用。",
      en: "Interactive controls should be reachable and operable by keyboard with a visible focus state. Actions must also remain visible and usable on touch devices.",
    },
    exampleScope: {
      zh: "示例说明视觉结构，不包含你的应用路由、数据、权限或业务状态；接入时按真实任务补齐。",
      en: "The example describes visual structure, not your app's routes, data, permissions, or business state. Add those according to the real task.",
    },
    motion: {
      zh: "如果组件带有动画，尊重系统减少动态效果设置，并确保不动时仍能理解内容和操作结果。",
      en: "If the component animates, respect reduced motion and make its content and outcome understandable without movement.",
    },
  },
};

const componentAliases: Record<string, UsageGuideComponentId> = {
  button: "button",
  card: "card",
  input: "input",
  field: "input",
  nav: "nav",
  navigation: "nav",
  navbar: "nav",
  hero: "hero",
  footer: "footer",
  others: "others",
};

export function normalizeUsageGuideComponentId(
  componentId: string
): UsageGuideComponentId {
  return componentAliases[componentId.trim().toLowerCase()] ?? "others";
}

export function getComponentUsageGuidance(
  componentId: string
): ComponentUsageGuidance {
  return guidance[normalizeUsageGuideComponentId(componentId)];
}
