import { DesignStyle } from "./index";

export const materialDesign: DesignStyle = {
  slug: "material-design",
  name: "材料设计",
  nameEn: "Material Design",
  description:
    "Google 推出的设计系统，基于纸张和墨水的隐喻，强调层次、动效、大胆色彩和响应式交互，是现代移动端设计的标准。",
  cover: "/styles/material-design.svg",
  styleType: "visual",
  tags: ["modern", "brand-inspired"],
  category: "modern",
  colors: {
    primary: "#6200ee",
    secondary: "#03dac6",
    accent: ["#ff0266", "#ffde03", "#00c853"],
  },
  keywords: ["Material", "Google", "层次", "动效", "海拔", "涟漪", "卡片"],

  philosophy: `Material Design（材料设计）是 Google 在 2014 年推出的设计语言，将数字界面比作有物理属性的纸张和墨水。

核心理念：
- 材料隐喻：界面如同有厚度的纸张，可堆叠、移动
- 海拔系统：通过阴影表达层次关系
- 大胆色彩：鲜明的主色和强调色
- 有意义的动效：动画传达空间关系和反馈`,

  doList: [
    "使用海拔阴影系统表达层次",
    "应用涟漪效果作为点击反馈",
    "使用大胆鲜明的色彩",
    "保持 8dp 的间距网格",
    "使用 Roboto 字体",
    "添加有意义的微动效",
  ],

  dontList: [
    "禁止使用不一致的阴影深度",
    "禁止使用过于柔和的配色",
    "禁止省略交互反馈",
    "禁止打破 8dp 网格系统",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Material 风格按钮",
      code: `<button className="
  px-6 py-3
  bg-[#6200ee]
  text-white font-medium uppercase tracking-wider text-sm
  rounded-full
  shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]
  hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.2),0_8px_10px_1px_rgba(0,0,0,0.14),0_3px_14px_2px_rgba(0,0,0,0.12)]
  hover:bg-[#7c4dff]
  active:bg-[#651fff]
  transition-all duration-200
  relative overflow-hidden
">
  Click Me
</button>`,
    },
    card: {
      name: "卡片",
      description: "Material 风格卡片",
      code: `<div className="
  bg-white
  rounded-xl
  shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]
  hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]
  transition-shadow duration-300
  overflow-hidden
">
  <div className="h-40 bg-gradient-to-br from-[#6200ee] to-[#b388ff]" />
  <div className="p-6">
    <h3 className="text-xl font-medium text-gray-900 mb-2">
      Material Card
    </h3>
    <p className="text-gray-600">
      Surfaces that cast shadows based on elevation.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Material 风格输入框",
      code: `<div className="relative">
  <input
    type="text"
    placeholder=" "
    className="
      peer w-full px-4 pt-5 pb-2
      bg-gray-100
      border-0 border-b-2 border-gray-300
      rounded-t-lg
      text-gray-900
      focus:outline-none focus:border-[#6200ee]
      focus:bg-gray-50
      transition-all
    "
  />
  <label className="
    absolute left-4 top-4
    text-gray-500 text-sm
    transition-all duration-200
    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
    peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee]
    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs
  ">
    Email Address
  </label>
</div>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Material 风格 Hero",
      code: `<section className="
  min-h-screen
  bg-[#fafafa]
  relative
">
  {/* App Bar */}
  <nav className="fixed top-0 left-0 right-0 h-16 bg-[#6200ee] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)] flex items-center px-6 z-50">
    <h1 className="text-white font-medium text-xl">Material Design</h1>
  </nav>

  <div className="pt-24 px-6 max-w-4xl mx-auto">
    <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] overflow-hidden">
      <div className="h-64 bg-gradient-to-br from-[#6200ee] via-[#7c4dff] to-[#b388ff] flex items-center justify-center">
        <h2 className="text-5xl font-bold text-white">Welcome</h2>
      </div>
      <div className="p-8">
        <p className="text-xl text-gray-700 mb-6">
          Build beautiful, usable products faster with Material Design.
        </p>
        <button className="px-6 py-3 bg-[#03dac6] text-black font-medium rounded-full shadow-md hover:shadow-lg transition-all">
          Get Started
        </button>
      </div>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Material Design 全局样式 */

:root {
  --md-primary: #6200ee;
  --md-primary-variant: #3700b3;
  --md-secondary: #03dac6;
  --md-secondary-variant: #018786;
  --md-background: #fafafa;
  --md-surface: #ffffff;
  --md-error: #b00020;
}

/* 海拔阴影系统 */
.md-elevation-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.md-elevation-2 {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.md-elevation-3 {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.md-elevation-4 {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

/* 涟漪效果基础 */
.md-ripple {
  position: relative;
  overflow: hidden;
}

/* 浮动标签输入框 */
.md-text-field {
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
  border-bottom: 2px solid #9e9e9e;
}

.md-text-field:focus {
  border-bottom-color: var(--md-primary);
}`,

  aiRules: `你是一个 Material Design 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用不一致的阴影深度
- 使用过于柔和暗淡的配色
- 省略交互反馈效果
- 打破 8dp 网格系统

## 必须遵守

- 海拔阴影 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]
- 主色调 bg-[#6200ee] text-white
- 强调色 bg-[#03dac6]
- 圆角卡片 rounded-xl
- 大写按钮文字 uppercase tracking-wider

## 配色

- 主色: #6200ee (紫色)
- 主色变体: #3700b3
- 次要色: #03dac6 (青色)
- 背景: #fafafa
- 表面: #ffffff
- 错误: #b00020

## 间距

- 基于 8dp 网格
- p-2 (8px), p-4 (16px), p-6 (24px), p-8 (32px)`,

  examplePrompts: [
    {
      title: "任务管理应用",
      titleEn: "Task Management App",
      description: "Material 风格的任务管理界面",
      descriptionEn: "Material style task management interface",
      prompt: `用 Material Design 创建一个任务管理应用界面，要求：
1. 顶部应用栏带阴影
2. 浮动操作按钮 (FAB)
3. 卡片列表展示任务
4. 使用海拔阴影系统
5. 紫色主色调，青色强调`,
    },
  ],
};
