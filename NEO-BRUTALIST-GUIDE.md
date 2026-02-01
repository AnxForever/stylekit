# Neo-Brutalist 设计风格指南 (AI 友好版)

> 供 Trae / Cursor / Claude 等 AI 编码助手使用的精简版设计规范

---

## 核心约束 (每次 Prompt 必须强调)

```
⛔ 禁止：
- 圆角 (rounded-lg, rounded-md 等)
- 模糊阴影 (shadow-lg, shadow-xl 等)
- 渐变色 (bg-gradient-*)
- 柔和过渡 (ease-in-out 的淡入淡出)
- 灰色边框 (border-gray-*)

✅ 必须：
- 无圆角或 rounded-none
- 硬边缘阴影 shadow-[Xpx_Xpx_0px_0px_rgba(0,0,0,1)]
- 纯黑边框 border-black
- hover 时阴影消失 + 元素位移
- 高对比度配色
```

---

## 1. 色彩系统

### 调色板

| 名称 | HEX | CSS 变量 | Tailwind |
|-----|-----|----------|----------|
| Pink | `#ff006e` | `--accent-pink` | `bg-accent-pink` |
| Green | `#ccff00` | `--accent-green` | `bg-accent-green` |
| Blue | `#00d9ff` | `--accent-blue` | `bg-accent-blue` |
| Yellow | `#ff9500` | `--accent-yellow` | `bg-accent-yellow` |
| Orange | `#ff6b00` | `--accent-orange` | `bg-accent-orange` |

### Tailwind 配置

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'accent-pink': '#ff006e',
        'accent-green': '#ccff00',
        'accent-blue': '#00d9ff',
        'accent-yellow': '#ff9500',
        'accent-orange': '#ff6b00',
      },
    },
  },
}
```

---

## 2. 边框与阴影

### 边框规则

```
移动端: border-2 border-black
桌面端: border-4 border-black
```

### 阴影规则 (硬边缘，无模糊)

```css
/* 小阴影 */
shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]

/* 标准阴影 */
shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]

/* 彩色阴影 */
shadow-[8px_8px_0px_0px_var(--accent-pink)]
```

### 响应式阴影

```tsx
className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
```

---

## 3. 交互效果

### 标准 Hover 效果 (按压感)

```tsx
className="
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-none
  hover:translate-x-[2px] hover:translate-y-[2px]
  transition-all duration-200
"
```

### 卡片 Hover

```tsx
className="
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)]
  hover:-translate-y-1
  transition-all duration-300
"
```

---

## 4. 响应式缩放规则

### 间距

| 属性 | 移动端 | 桌面端 |
|-----|--------|--------|
| Section padding | `py-12` | `md:py-32` |
| 容器顶部 | `pt-20` | `md:pt-32` |
| 元素间距 | `gap-4` | `md:gap-8` |
| 内边距 | `p-4` | `md:p-8` |

### 边框

| 类型 | 移动端 | 桌面端 |
|-----|--------|--------|
| 标准 | `border-2` | `md:border-4` |
| 粗 | `border-4` | `md:border-8` |

### 阴影

| 类型 | 移动端 | 桌面端 |
|-----|--------|--------|
| 标准 | `shadow-[4px_4px_0px]` | `md:shadow-[8px_8px_0px]` |
| 大 | `shadow-[6px_6px_0px]` | `md:shadow-[12px_12px_0px]` |

### 字体

| 类型 | 移动端 | 桌面端 |
|-----|--------|--------|
| 页面标题 | `text-[10vw]` | `md:text-[8vw]` |
| 区块标题 | `text-4xl` | `md:text-6xl` |
| 卡片标题 | `text-xl` | `md:text-3xl` |
| 正文 | `text-sm` | `md:text-base` |

---

## 5. 组件模板

### 5.1 按钮

```tsx
// 主要按钮
<button className="
  bg-black text-white font-black
  px-6 py-3 md:px-8 md:py-4
  border-2 md:border-4 border-black
  shadow-[4px_4px_0px_0px_rgba(0,255,255,1)] md:shadow-[6px_6px_0px_0px_rgba(0,255,255,1)]
  hover:bg-accent-pink hover:shadow-none
  hover:translate-x-[2px] hover:translate-y-[2px]
  transition-all
">
  按钮文字
</button>

// 次要按钮
<button className="
  bg-white text-black font-black
  px-4 py-2 md:px-6 md:py-3
  border-2 md:border-4 border-black
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
  hover:bg-accent-green
  transition-all
">
  按钮文字
</button>
```

### 5.2 卡片

```tsx
<div className="
  bg-white
  p-4 md:p-8
  border-2 md:border-4 border-black
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[6px_6px_0px_0px_rgba(255,0,110,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(255,0,110,1)]
  hover:-translate-y-1 md:hover:-translate-y-2
  transition-all duration-300
">
  <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4">标题</h3>
  <p className="text-sm md:text-base font-mono text-gray-600">描述文字</p>
</div>
```

### 5.3 输入框

```tsx
<input
  type="text"
  className="
    w-full
    py-3 md:py-4 px-4 md:px-6
    text-base md:text-xl font-mono
    border-2 md:border-4 border-black
    focus:outline-none focus:ring-0
    focus:shadow-[4px_4px_0px_0px_rgba(0,255,255,1)]
    transition-shadow
  "
  placeholder="输入内容..."
/>
```

### 5.4 标签

```tsx
// 黑底白字
<span className="bg-black text-white px-2 py-1 text-xs md:text-sm font-bold">
  标签
</span>

// 彩色标签
<span className="bg-accent-yellow text-black px-2 py-1 text-xs md:text-sm font-bold border-2 border-black">
  标签
</span>
```

### 5.5 导航栏

```tsx
<nav className="
  fixed top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-50
  bg-white
  border-2 md:border-4 border-black
  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  px-3 md:px-8 py-2 md:py-4
  flex justify-between items-center
  max-w-7xl mx-auto
">
  {/* Logo */}
  <a href="/" className="
    text-base md:text-2xl font-black
    bg-black text-white px-2 py-1
    rotate-[-2deg]
    hover:scale-105 transition-transform
  ">
    LOGO
  </a>

  {/* 导航链接 */}
  <a href="/page" className="
    font-black text-sm
    px-4 py-2
    border-2 border-black
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
    hover:bg-accent-pink
    transition-all
  ">
    链接
  </a>
</nav>
```

---

## 6. 特殊效果

### 文字描边 (镂空效果)

```css
/* globals.css */
.text-stroke {
  -webkit-text-stroke: 2px black;
  color: transparent;
}

.text-stroke-white {
  -webkit-text-stroke: 2px white;
  color: transparent;
}
```

```tsx
<span className="text-stroke">镂空文字</span>
```

### 倾斜装饰

```tsx
<div className="rotate-[-2deg] bg-accent-pink border-4 border-black px-4 py-2">
  倾斜元素
</div>
```

### 隐藏滚动条

```css
/* globals.css */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

## 7. 推荐依赖

```json
{
  "dependencies": {
    "framer-motion": "^11.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "tailwindcss": "^4.x",
    "@tailwindcss/postcss": "^4.x"
  }
}
```

---

## 8. Prompt 模板

在每次让 AI 生成代码时，可以使用以下 Prompt 前缀：

```
你是一个前端开发者，严格遵循 Neo-Brutalist 设计风格。

【核心规则 - 必须遵守】
1. 禁止圆角：不使用 rounded-* 类
2. 硬边缘阴影：shadow-[Xpx_Xpx_0px_0px_rgba(0,0,0,1)]，禁止 shadow-lg/xl
3. 纯黑边框：只用 border-black，禁止 border-gray-*
4. hover 效果：阴影消失 + translate 位移，禁止发光/渐变
5. 响应式：移动端尺寸约为桌面端的 50%

【配色】
- 主色：黑 #000000、白 #ffffff
- 强调色：Pink #ff006e、Green #ccff00、Blue #00d9ff、Yellow #ff9500

现在请实现 [具体需求]...
```

---

## 9. 检查清单

完成每个组件后，检查以下项目：

- [ ] 无圆角 (`rounded-none` 或不写)
- [ ] 阴影是硬边缘 (`shadow-[Xpx_Xpx_0px_0px]`)
- [ ] 边框是纯黑 (`border-black`)
- [ ] hover 有位移效果
- [ ] 标题用 `font-black`
- [ ] 代码风格文字用 `font-mono`
- [ ] 移动端有独立样式 (`md:` 前缀)
- [ ] 间距/边框/阴影移动端约 50%

---

## 10. 常见错误示例

### ❌ 错误

```tsx
// 用了圆角
<div className="rounded-lg border border-gray-200 shadow-lg">

// 用了模糊阴影
<button className="shadow-xl hover:shadow-2xl">

// 没有响应式
<div className="p-8 border-4">
```

### ✅ 正确

```tsx
// 无圆角，纯黑边框，硬阴影
<div className="border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

// hover 位移效果
<button className="shadow-[4px_4px_0px] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">

// 响应式间距
<div className="p-4 md:p-8 border-2 md:border-4">
```
