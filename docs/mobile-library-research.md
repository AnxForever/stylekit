# StyleKit 移动端组件研究

> 核验日期：2026-10-04。结论用于 StyleKit `/mobile` 入口的数据筛选与交互参考。所有仓库许可证、归档状态和最近推送日期来自 GitHub 官方仓库 API；功能、平台和接入边界以官方 README / 文档为准。没有下载仓库或安装候选依赖。

## 筛选方法与 Star 来源

使用已登录账号的 GitHub REST API `GET /user/starred` 分页读取到列表末尾：332 个公开 Star；私有项只排除，不记录名称或元数据。候选判断看目标平台、官方文档和示例、许可证、维护信号与当前 StyleKit 技术栈，不按 Star 数排序。

- 公开 Stars 命中两个适合作为组件资料的项目：ShipSwift、Blossom Carousel。两者都可在官方仓库核对许可证；Blossom 是浏览器 Web 轮播，名称里的 “Native-first” 指保留原生滚动，并不表示 iOS / Android 原生库。
- Happy 也在公开 Stars 中，但它是 Codex / Claude 的移动与 Web 客户端，不是可复用 UI 组件库；只作为移动端会话和跨设备交互的产品参考，不进入组件目录。
- ChunUI 由用户在本轮直接点名，公开 Star API 未命中。它作为单独的 SwiftUI 推荐收录，标记为 requested；项目较新且最低平台、Swift 工具链要求较高。
- Vant、Ant Design Mobile、Ionic、Framework7、Swiper、Radix UI Dialog、React Native Paper、React Native Bottom Sheet、Tamagui 是补充研究候选，均未命中公开 Stars。产品界面不展示个人 Star 来源。

## 12 个候选

| 项目 | 来源 / 平台 | 许可证、维护与用途 | 采用边界 | 官方仓库 / 文档 |
| --- | --- | --- | --- | --- |
| ChunUI | 用户点名；SwiftUI 设计系统 | MIT；未归档，最近推送 2026-09-23。主题令牌、按钮、表单、原生 Sheet、Toast 和 Metal 效果。 | 新兴项目；Package.swift 要求 iOS 18.6 与 Swift tools 6.2；README 的 SPM 示例跟踪 `main`，正式采用前应固定 revision 并验证。适合原生 iOS，不可放进 React DOM。 | [仓库](https://github.com/liseami/ChunUI) · [README / 组件参考](https://github.com/liseami/ChunUI#readme) · [Package.swift](https://github.com/liseami/ChunUI/blob/main/Package.swift) · [MIT LICENSE](https://github.com/liseami/ChunUI/blob/main/LICENSE) |
| ShipSwift | 公开 Star；SwiftUI 组件库 | MIT；未归档，最近推送 2026-08-09。动画、图表、表单反馈、Sheet、Tab、聊天和支付墙等页面材料。 | README 支持本地复制组件；部分全栈配方标为 Pro 并依赖其在线服务。逐个检查要复制的文件、依赖和服务边界。适合参考原生 iOS 画面，不是 Web 包。 | [仓库与组件清单](https://github.com/signerlabs/ShipSwift) · [MIT LICENSE](https://github.com/signerlabs/ShipSwift/blob/main/LICENSE) |
| Blossom Carousel | 公开 Star；Web / React / Vue | Apache-2.0；未归档，最近推送 2026-09-07。基于原生浏览器滚动和 CSS Scroll Snap，在鼠标或触控笔上增加拖动，并提供前后页与圆点控件。 | 对阅读画廊、商品图集适配度高；循环滚动官方仍标为实验功能。优先保留触屏原生滚动。 | [仓库](https://github.com/jespervos/blossom-carousel) · [React / Next.js 文档](https://blossom-carousel.com/docs/framework-guides/react-nextjs) · [Apache-2.0 LICENSE](https://github.com/jespervos/blossom-carousel/blob/main/LICENSE) |
| Ant Design Mobile | 补充研究；React 移动 Web | MIT；未归档，最近推送 2026-09-14。面向 H5 的表单、输入、选择器、动作面板、列表和提示组件。 | 浏览器 React，不是 React Native。可参考或挑选控件；整套默认视觉有明显 Ant Design 风格，不能直接替代 StyleKit 自有品牌。 | [仓库](https://github.com/ant-design/ant-design-mobile) · [官方文档](https://mobile.ant.design/) |
| Vant | 补充研究；Vue 移动 Web | MIT；未归档，最近推送 2026-10-03。表单、单元格、选择器、日历、列表与动作面板，适用于手机 H5 和商城流程。 | 当前主线面向 Vue 3；不是 StyleKit 的 React 页面可直接使用的组件。 | [仓库](https://github.com/youzan/vant) · [官方文档](https://vant-ui.github.io/vant/) |
| Ionic Framework | 补充研究；Web Components / React / Vue | MIT；未归档，最近推送 2026-10-02。提供导航、列表、动作面板、手势和自适应主题；可组成 PWA 或 Capacitor 混合应用。 | 属于完整的移动 UI / 应用工具链。StyleKit 单页借鉴模式即可；原生设备能力和应用商店构建通常涉及 Capacitor。 | [仓库](https://github.com/ionic-team/ionic-framework) · [官方文档](https://ionicframework.com/docs) |
| Framework7 | 补充研究；Web / React / Vue | MIT；未归档，最近推送 2026-09-28。提供 iOS / Material 风格控件、页面结构、路由、动作面板和搜索。 | 更适合独立移动 SPA / 混合应用。会管理应用外壳和路由，不适合为单个 Next.js 预览页整套引入。 | [仓库](https://github.com/framework7io/framework7) · [官方文档](https://framework7.io/docs/) |
| Swiper | 补充研究；Web / React / Vue | MIT；未归档，最近推送 2026-09-28。提供触屏滑块、分页、导航、键盘与多种动效模块。 | 适合确实需要复杂手势或分页的商品图集；普通横向内容条可用原生滚动，避免多余依赖和样式。 | [仓库](https://github.com/nolimits4web/swiper) · [React 官方文档](https://swiperjs.com/react) |
| Radix UI Dialog | 补充研究；React Web | MIT；未归档，最近推送 2026-08-08。提供可组合的模态 / 非模态对话框、焦点管理、键盘关闭和读屏语义。 | 可以把 Dialog 内容样式化为移动端底部面板，但拖动关闭和吸附点需自己实现；这是基础原语，不是现成 Bottom Sheet。 | [仓库](https://github.com/radix-ui/primitives) · [官方 Dialog 文档](https://www.radix-ui.com/primitives/docs/components/dialog) |
| React Native Paper | 补充研究；React Native | MIT；未归档，最近推送 2026-09-29。Material Design 3 主题，包含按钮、卡片、列表、输入、菜单、弹窗和导航。 | RN 原生组件，需要 Provider / 主题；不能直接渲染到 StyleKit 的浏览器 DOM。官方文档同时提供稳定 5.x 与预览 6.x，应锁定稳定版本。 | [仓库](https://github.com/callstack/react-native-paper) · [官方文档](https://callstack.github.io/react-native-paper/) |
| React Native Bottom Sheet | 补充研究；React Native | MIT；未归档，最近推送 2026-05-09。原生多吸附点面板、Modal Sheet、动态高度和键盘 / 滚动协调。 | 需要 Reanimated 与 Gesture Handler，并按原生项目配置；确认各依赖兼容版本。它不是 Next.js 的 DOM 抽屉。 | [仓库](https://github.com/gorhom/react-native-bottom-sheet) · [官方文档](https://gorhom.dev/react-native-bottom-sheet/) |
| Tamagui | 补充研究；Web / React Native | MIT；未归档，最近推送 2026-10-04。跨端 React 设计令牌、主题、基础布局和 UI 控件。 | 适用于同时维护网站与原生 App；需要 Provider / config。原生项目要求 React Native 0.81+ 新架构；只给当前网站补移动样式时，迁移成本偏高。 | [仓库](https://github.com/tamagui/tamagui) · [官方安装文档](https://tamagui.dev/docs/intro/installation) |

## StyleKit 的产品落点

StyleKit 当前是 Next.js / React 网站。`/mobile` 首先做成 Web 上可交互的手机画布，按阅读、购物、任务管理三个场景展示真实可操作的页面，再提供平台筛选和组件资料卡。移动 Web 优先采用语义清楚的 React / CSS 交互；Blossom / Swiper 可用于轮播，Radix Dialog 可作为可访问弹层基础，再按移动断点塑造底部面板。Vant 是 Vue 参考；Paper、Bottom Sheet、ChunUI、ShipSwift、Tamagui 提供原生或跨端资料，不应该被标成同一种可安装的 StyleKit 组件。

Vaul 未列为推荐：官方 README 明确声明项目目前无人维护且近期没有继续维护的计划。GitHub API 显示仓库尚未归档，但仓库归档状态和最后推送日期都不能推翻维护者的直接说明；React Web 的新方案建议从 Radix UI Dialog 这类仍维护的基础原语构建。见 [Vaul 官方 README](https://github.com/emilkowalski/vaul#readme)。

没有为了覆盖列表强行加入 Flutter 方案：本次依据是 Next.js 项目和可核验的 Star / 指定项目，且没有用户要求的 Flutter 仓库证据。也没有把 gluestack-ui 纳入候选：其 GitHub API 未识别到 SPDX license，当前 v5 官方文档明确写着尚不支持 Next.js。许可证或平台边界不清楚的候选不列为直接推荐。
