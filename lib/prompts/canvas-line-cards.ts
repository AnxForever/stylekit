import type { PromptTopic } from "./types";

/**
 * Reproduction recipe, 2026-10-21.
 * Source: the owner's seven-point brief and the browser-checked reference at
 * public/experiments/brand-line-cards/index.html. Path data originates from
 * https://github.com/simple-icons/simple-icons/tree/develop/icons.
 *
 * Original recipe: one fresh Chinese-prompt-only generation was browser-checked.
 * Live scan tracking was added after owner feedback; verify its reference and
 * copied instructions separately from that earlier reproduction exercise.
 * This does not establish general model/device or pixel-identical reproduction.
 * Library delivery: reuse PromptTopic, localize the copied body, and attach the
 * reference rather than introducing a separate effect catalog.
 */
export const canvasLineCardMarks = {
  apple: {
    name: "Apple",
    background: "#eeeeeb",
    ink: "#202220",
    detection: "#267dff",
    seed: 3,
    scale: 0.82,
    path: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
  },
  google: {
    name: "Google",
    background: "#2152e7",
    ink: "#c2dcff",
    detection: "#91dcff",
    seed: 29,
    scale: 0.79,
    path: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
  },
  tesla: {
    name: "Tesla",
    background: "#111212",
    ink: "#ec353e",
    detection: "#4eaeff",
    seed: 51,
    scale: 0.81,
    path: "M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z",
  },
} as const;

function markPayload(locale: "en" | "zh"): string {
  return Object.values(canvasLineCardMarks).map((mark) => {
    const colors = locale === "zh"
      ? `背景 ${mark.background}，线色 ${mark.ink}，检测色 ${mark.detection}`
      : `background ${mark.background}, ink ${mark.ink}, detection ${mark.detection}`;
    return `${mark.name} — seed ${mark.seed}, scale ${mark.scale}, ${colors}\n${mark.path}`;
  }).join("\n\n");
}

export const canvasLineCardsPrompt = {
  en: String.raw`Create one polished, responsive, self-contained HTML file titled “Identity, in lines.” It must work by opening the file directly in a modern browser. Use native HTML, CSS, JavaScript, Canvas 2D, and Path2D only. Do not use libraries, frameworks, modules, build tools, images, image URLs, external SVG files, external fonts, or network requests. Return the complete HTML and nothing else.

1. Page and cards
Build a restrained editorial page with a small “StyleKit / Visual studies” signature and a motion toggle in the top row. The heading is “Identity, in lines.” with the intro “Move through a familiar mark. Find the structure beneath the surface.” Put three brand cards in one desktop row inside a maximum 1,200-pixel content width, with 19-pixel gaps. Cards have a 0.70 width-to-height aspect ratio, a 17-pixel radius, and a minimum height near 460 pixels; stack them on screens at or below 650 pixels. Each card has a small line-drawn mark and brand name at top left. At bottom left use these exact taglines followed by a “Reveal the source →” button: Apple, “Think different.”; Google, “Find your next possibility.”; Tesla, “Accelerate the future.” The footer reads “A study of recognition and reconstruction.” and “One path. A field of light. Four line weights.” Use Georgia/Times serif for the 38–57px main heading and Arial/Helvetica sans-serif for the card text, with 27–37px card taglines. Keep all font stacks local. Apple uses background #eeeeeb and ink #202220; Google uses background #2152e7 and ink #c2dcff; Tesla uses background #111212 and ink #ec353e. Use a blue detection accent per brand as listed in the path payload. The source button opens an accessible dialog showing that brand’s exact path, with a close control. Keep the cards legible, unclipped, and touch friendly.
Give every card perceptible depth without blurred shadows: stack a plate of identical size and radius 6 pixels below the card, with a 1-pixel border of rgba(32,34,32,.12) and 0.7 opacity. Tint the plate from the card's own lightness — darken light cards (mix 16% #202220), lighten dark cards (mix 28% #fafaf8), because darkening a near-black surface is invisible. On pointer hover, lift the card 4 pixels and drop the plate to 12 pixels at full opacity: about 16 pixels of net parallax over 300 ms ease-out. Animate translate only, and keep the card's occupied height identical before and after hover. Never use blur, backdrop-filter, or wide box-shadow to fake volume.

2. One-time path sampling
Use the exact three 24-by-24 Path2D path strings in the payload below. Keep each mark centered with its listed scale: multiply the 300-pixel scratch size by scale divided by 24, translate to the center, then translate the path origin by -12,-12. For each brand, create one detached scratch canvas at 300 by 300 pixels: 60 grid cells times 5 supersampling pixels. Paint it opaque black, then fill the brand Path2D in white. Read image data exactly once. For every 60-by-60 cell, calculate Rec. 709 luminance as 0.2126 R + 0.7152 G + 0.0722 B, divide by 255, average its 5-by-5 source pixels, and store the result in a Float32Array of 3,600 values. Keep only that array and the brand metadata. Set the scratch canvas width and height to zero and let its context and pixel buffer go out of scope. Never sample the path again, including after resize.

3. Quantized vertical-line drawing
Use 60 equally spaced columns and 30 vertical segments per card. Each segment represents the mean luminance of two adjacent grid rows. Quantize that value into exactly four levels using thresholds 0.12, 0.42, and 0.89. Use only these line widths, multiplied by cell size divided by 5.25: 0.38, 1.12, 2.28, and 3.80. Make each segment nearly two cells tall with a 0.7-pixel gap, flat line caps, and opacities 0.15, 0.64, 0.93, and 1 so the marks read as segmented bamboo-like strokes. Group paths by level and stroke each group once per frame. Draw small header marks from the stored luminance table too; never add a logo image or SVG element.

4. Slow, repeatable flowing noise
Create one shared 128-by-128 seeded random lattice once with a deterministic xorshift integer PRNG starting at seed 7319: state ^= state << 13; state ^= state >>> 17; state ^= state << 5. Convert each generated unsigned integer to a value from -1 to 1 by dividing by 4,294,967,295, multiplying by 2, then subtracting 1. Use smooth bilinear value noise, smoothing each local fraction t with t*t*(3-2*t); use each brand’s seed as its horizontal offset. For each segment sample x at column times 0.15 plus the brand seed, and sample y at row times 0.16 minus elapsed seconds times 0.17. This makes the visible pattern drift slowly downward. Set adjusted luminance to luminance times 0.94 plus noise times 0.12 times (0.25 plus luminance times 0.75), then choose the four line levels. The result should make the line weights drift gently while the pointer is idle. Do not use Math.random during animation.

5. Pointer response and spring return
Track pointer coordinates in card-local CSS pixels. Coalesce incoming pointer events: keep the latest client coordinates and read the card bounds once in the next animation frame. Only update the status text when its state changes. When the pointer enters, touches, or travels more than 1.5 pixels from the last impulse position, set a pulse to 1 and give nearby segment positions a brief radial impulse. Use a radius of one quarter of the logo plot width. Let influence be max(0, 1 - distance/radius); square it, multiply by pulse and 25, then use the radial direction for the target offset, with vertical movement scaled by 0.58. Model displacement with a damped spring: stiffness 145, damping 19, and a maximum integration step of 1/30 second. Settle every segment back to its original grid coordinate after the impulse decays; a stationary pointer must not hold the lines apart. Let the pulse decay as exp(-dt * 5.5). Mouse and touch use this spring response; keyboard focus reveals the detection overlay without requiring simulated pointer movement.

6. Deterministic detection callouts
Derive callouts from the current numerical line field, never from an AI service or fixed coordinates computed at initialization. While the overlay is visible, rescan at most every 100ms. Reuse a 60-by-60 Float32Array and clear it for each scan. For each displayed two-row segment, take its current noisy luminance and bilinearly deposit that value into both grid rows at their current spring-displaced positions. Keep using the one-time source table; do not read canvas pixels again. When paused, focus or resize may produce one static rescan, with no continuous scheduling.

Use a summed-area table over this live field to score 7-by-7 windows by mean luminance; pad each selected window by one cell. Ignore an empty field whose best mean is below 0.04. Keep scores at least 48% of the brightest candidate. Apply spatial non-maximum suppression with a 16-cell center distance, relaxing to 12 cells if needed to get at least two regions; retain up to three. For stable ties, add a small spatial prior of 0.025 * exp(-squaredDistanceToPreviousTarget / 128) to candidate ranking. Match new windows to nearby previous targets within 12 cells, keeping identities, velocity and connector order. Only detection targets snap to integer grid cells. Move the displayed boxes with a critically damped spring, stiffness 144 and damping 24, using substeps no larger than 1/120 second. Render fractional grid positions every frame; never round them back to whole cells, which cancels smooth motion. Show the current displayed coordinates to one decimal place while moving, and settle exactly on the target. For an unrelated target, fade the old box below 0.04 opacity before replacing its location, then fade the new one in. Use 1 - exp(-dt * 16) for opacity. Keep at most three slots and fade each connector with the lower endpoint opacity, so links cannot visibly teleport either. While paused, update directly to a stable frame without scheduling fade animation.

Draw blue boxes, faint fills, emphasized corners, x/y coordinates, and thin connectors. Reveal them for pointer or keyboard focus and fade them out on leave. A stable signal may keep a stable box, but noise and pointer deformation must be able to change the detected positions. Never add arbitrary random wandering or claim real AI inference.

7. Canvas quality, motion, and access
Use a visible canvas for each card. Set its backing width and height to the canvas's actual CSS size multiplied by the current devicePixelRatio, rounded to integers, then set the 2D transform so drawing coordinates remain CSS pixels. Clear and redraw on every requestAnimationFrame frame. Use ResizeObserver for card size changes without resampling the marks. A DPR-only change must also update the backing store even when CSS width and height stay unchanged: compare the current DPR with the cached DPR before drawing, or re-arm a resolution matchMedia listener; ResizeObserver alone is insufficient. With motion paused, DPR and resize events must still update and draw one static frame. Verify a DPR 1 to 2 switch at the same CSS viewport size while the sampling count remains three. Keep the line animation smooth on high-density screens. Provide a keyboard-operable motion toggle with an accurate aria-pressed value; honor prefers-reduced-motion by starting still. Cards must be keyboard focusable and have useful accessible names; canvases are decorative and hidden from assistive technology. Handle touch, and keep pointer targets large enough for mobile.

8. Lifecycle and responsive behavior
Pause animation while the document is hidden, a card is offscreen, or a source dialog is open; resume with a reset frame timestamp so a long pause cannot create a large time step. Use IntersectionObserver for offscreen cards. When motion is paused, render a stable frame and stop scheduling continuous frames. On narrow screens, use a single-column card layout while preserving the logo plot and footer spacing. If Canvas 2D or Path2D is unavailable, show a short in-page fallback message without throwing an uncaught error.

9. Inspect before returning
Check the finished file against these observable conditions: it contains exactly three cards and the exact path data below; it makes one pixel read per brand at initialization and zero reads on later frames or resize; each stored table is 60 by 60; each card draws 60 columns by 30 segments with four widths only; idle noise is seeded and moves downward; pointer and touch trigger a spring that returns to rest, while keyboard focus reveals the callouts; up to three grid-snapped callouts are connected and blue; DPR 2 produces a twice-sized backing store; reduced motion starts still; mobile cards stack; every card shows a visible plate layer and lifts on hover without changing its occupied height; the file contains no blur, backdrop-filter, or wide box-shadow; there are no external requests, image elements, or console errors. Do not claim these checks passed unless you actually inspect or run the generated file.

Exact mark payload (preserve the path strings):
${markPayload("en")}`,
  zh: String.raw`请制作一个名为“Identity, in lines.”的精致响应式单文件 HTML 页面，直接用现代浏览器打开即可运行。只使用原生 HTML、CSS、JavaScript、Canvas 2D 和 Path2D。不要使用库、框架、模块、构建工具、图片、图片链接、外部 SVG 文件、外部字体或网络请求。CSS 和脚本全部内联。最终只返回完整 HTML 文件。

1. 页面与卡片
制作克制的编辑式页面：顶部有“StyleKit / Visual studies”小字标识和动效开关。主标题是“Identity, in lines.”，介绍文案是“Move through a familiar mark. Find the structure beneath the surface.”。在最大宽度 1,200 像素的内容区内，桌面端一行排列三张卡片，间距 19 像素；卡片宽高比为 0.70、圆角 17 像素、高度至少约 460 像素。屏幕宽度不超过 650 像素时改为单列。每张卡片左上有用线条绘制的小标志和品牌名，左下依次放置准确标语和“Reveal the source →”按钮：Apple 是“Think different.”；Google 是“Find your next possibility.”；Tesla 是“Accelerate the future.”。页脚分别写“A study of recognition and reconstruction.”与“One path. A field of light. Four line weights.”。主标题使用 Georgia/Times 衬线字体，字号 38–57px；卡片文字使用 Arial/Helvetica 无衬线字体，标语字号 27–37px。字体全部来自本地系统。Apple 背景 #eeeeeb、线色 #202220；Google 背景 #2152e7、线色 #c2dcff；Tesla 背景 #111212、线色 #ec353e。每个品牌的蓝色检测标记颜色见下方路径数据。点击来源按钮时打开无障碍弹窗，展示对应的精确路径，并提供关闭控件。保证卡片内容清晰、不被裁切，并适合触控。
每张卡片必须有可感知的层级，但不能靠模糊阴影：在卡片下方叠一层同尺寸、同圆角的底板，向下偏移 6 像素，1 像素描边 rgba(32,34,32,.12)，不透明度 0.7；底板颜色按卡片明度取，浅底盘压暗（同色混 16% #202220），深底卡提亮（同色混 28% #fafaf8），否则黑底上压暗不可见。指针悬浮时卡片上移 4 像素、底板下移到 12 像素并升到不透明度 1，形成约 16 像素的净视差，过渡 300 毫秒 ease-out。位移只能使用 translate，悬浮前后卡片占位高度必须完全一致。禁止使用 blur、backdrop-filter 或大范围 box-shadow 制造体积。

2. 只采样一次路径
使用下方数据中三个精确的 24×24 Path2D 路径字符串，并使用对应 scale 居中绘制：将 300 像素临时画布乘以 scale 除以 24，平移到中心，再将路径原点平移 -12,-12。每个品牌单独创建一个尺寸为 300×300 的脱离 DOM 的临时 canvas，即 60 个网格单元乘以每格 5 个超采样像素。先填充不透明黑色，再用白色填充品牌 Path2D。只读取一次像素数据。对每个 60×60 网格单元，将来源图像中对应的 5×5 像素按 Rec. 709 公式计算，即 0.2126 R + 0.7152 G + 0.0722 B，再除以 255 并求平均，保存为含 3,600 个数值的 Float32Array。之后只保留该数组和品牌元数据。把临时 canvas 的宽高设为 0，并让 context 和像素缓存离开作用域。包括尺寸变化在内，都不得重新采样路径。

3. 量化竖线绘制
每张卡片绘制 60 根等距竖列，每列 30 段竖线。每一段取相邻两行网格亮度的平均值。使用 0.12、0.42、0.89 三个阈值量化成且仅量化成四档。线宽只使用 0.38、1.12、2.28、3.80，并乘以“网格单元尺寸除以 5.25”。每段接近两个网格单元高，段间留 0.7 像素窄缝，使用平头线帽；四档透明度依次是 0.15、0.64、0.93、1，让标志像一节节竹段。按粗细档分组，每帧每组只描边一次。卡片顶部的小标志也必须根据已存的亮度表绘制；不能加入 Logo 图片或 SVG 元素。

4. 缓慢、可复现的流动噪声
初始化时使用 xorshift 整数 PRNG，以 seed 7319 生成一张共享的 128×128 随机格点表；每轮依次执行 state ^= state << 13、state ^= state >>> 17、state ^= state << 5。把每个无符号整数除以 4,294,967,295，再乘以 2 并减去 1，得到 -1 到 1 的格点值。用平滑双线性 value noise 取样，先把每个局部小数 t 转换为 t*t*(3-2*t)；每个品牌的 seed 作为水平偏移。每段的 x 取“列 × 0.15 + 品牌 seed”，y 取“行 × 0.16 - 经过秒数 × 0.17”，使可见噪声缓慢向下流动。在线宽分档之前，调整后亮度为“亮度 × 0.94 + 噪声 × 0.12 × (0.25 + 亮度 × 0.75)”。鼠标静止时，线条粗细也应轻轻漂移。动画过程中不要调用 Math.random。

5. 指针作用与弹簧复位
用卡片内的 CSS 像素坐标记录指针位置。合并连续指针事件：先保存最新 client 坐标，在下一动画帧中只读一次卡片边界；状态文字只在状态切换时更新。指针进入、触摸或从上一次脉冲位置累计移动超过 1.5 像素时，把脉冲设为 1，让附近线段径向散开。作用半径为 Logo 绘制区域宽度的四分之一。影响系数为 max(0, 1 - 距离/半径)，先平方再乘以脉冲和 25，沿径向产生位移，竖直方向再乘 0.58。位移使用阻尼弹簧模型：刚度 145、阻尼 19，每次积分步长最多 1/30 秒。脉冲按 exp(-dt × 5.5) 衰减后，每段都回到原始网格坐标；即使鼠标停在原处，也不能让线条持续散开。鼠标和触控使用同一套弹簧反馈；键盘聚焦时显示检测框，无须模拟指针移动。

6. 确定性的检测框
检测框必须来自当前的数值线场，不能只在初始化时算出固定坐标，也不调用 AI 服务。覆盖层可见时，扫描间隔至少 100ms。复用一个 60×60 Float32Array，每次扫描先清空；对每段跨两行的可见线条，把当前叠加噪声后的亮度，根据弹簧位移后的位置，用双线性权重分别累积到对应两行网格。仍然只用初始化采样的源数据，不能再次读取画布像素。暂停时，聚焦或尺寸变化可以补做一次静态扫描，但不能连续安排帧。

对这张实时亮度场建立积分图，计算 7×7 窗口的平均亮度，选中后向外扩一格。最亮窗口均值低于 0.04 时不画框；保留得分至少为最亮候选 48% 的区域。空间非极大值抑制使用 16 格中心间距；不足两个区域时放宽为 12 格，最多保留三个。为避免相近分数导致乱跳，可在候选排序中加上 0.025 * exp(-到上一目标的距离平方 / 128) 的小幅连续性权重。将新窗口与 12 格以内的旧目标匹配，保留目标身份、速度和连线顺序。只把检测目标吸附到整数网格，显示框使用刚度 144、阻尼 24 的临界阻尼弹簧逐帧跟随，积分子步长不超过 1/120 秒。绘制时保留小数网格位置，绝不能再次取整抵消平滑动画；移动中的坐标可保留一位小数，停稳后精确落到目标格点。遇到无关的新目标，先把旧框淡出到透明度低于 0.04，再替换位置并淡入新框，透明度缓动使用 1 - exp(-dt * 16)。最多保留三个槽位，连线透明度跟随两个端点中较低者，避免连线突跳。暂停时直接更新为稳定静帧，不连续安排淡入淡出动画。

绘制蓝色框、淡色填充、明显角标、坐标与细连线，指针或键盘聚焦时出现，离开后淡出。信号稳定时框可以稳定，但噪声或鼠标形变必须能改变检测位置；不能靠随机游走制造动态，也不能声称执行了真实 AI 推理。

7. 高清画布、动效与无障碍
每张卡片使用独立可见 canvas。让画布 backing width 和 height 等于画布自身的实际 CSS 尺寸乘以当前 devicePixelRatio 并取整，再设置 2D transform，使绘图坐标仍使用 CSS 像素。每个 requestAnimationFrame 帧都清空并重画。用 ResizeObserver 响应卡片尺寸变化，但不重新采样标志。即使 CSS 宽高未变，单独改变 DPR 也必须更新像素缓冲：绘制前比较当前 DPR 与缓存值，或使用变化后重新绑定的 resolution matchMedia 监听；不能只依赖 ResizeObserver。暂停动效时，DPR 或尺寸变化也应更新画布并补画一个静帧。验收时保持 CSS 视口尺寸不变，将 DPR 从 1 切到 2，确认像素缓冲翻倍且采样次数仍为三次。让高像素密度屏上的线条保持清晰。提供可键盘操作的动效开关，并保持 aria-pressed 状态准确；遵守 prefers-reduced-motion，默认静止。卡片可通过键盘聚焦并有实用的无障碍名称；canvas 仅作装饰，应从辅助技术中隐藏。支持触控，移动端触控目标要足够大。

8. 生命周期与响应式行为
页面不可见、卡片滚出视口或来源弹窗打开时暂停动画；恢复时重置上一帧时间，避免长暂停造成过大的时间步长。用 IntersectionObserver 暂停屏外卡片。当动效暂停时画出稳定静帧并停止连续安排动画帧。窄屏改为单列，同时保留 Logo 绘图区和底部文案间距。如果浏览器不支持 Canvas 2D 或 Path2D，在页面内展示简短提示，不要抛出未捕获异常。

9. 返回前检查
按以下可观察条件检查成品：恰有三张卡片，并包含下方精确路径数据；每个品牌初始化时只读一次像素，后续帧和尺寸变化都不再读取；每张亮度表都是 60×60；每张卡片绘制 60 列、每列 30 段，并且只用四档线宽；空闲噪声使用固定 seed 且向下流动；指针和触控触发弹簧后复位，键盘聚焦可显示检测框；最多三个吸附网格的检测框由蓝色连线连接；DPR 为 2 时 backing store 尺寸翻倍；减少动态效果偏好下默认静止；手机卡片改为单列；每张卡片都有可见的底板层级，悬浮时卡片上移而占位高度不变；全文件不含 blur、backdrop-filter 或大范围 box-shadow；没有外部请求、图片元素或控制台错误。除非确实检查或运行生成的文件，否则不要声称这些检查已通过。

精确标志数据（必须保留路径字符串）：
${markPayload("zh")}`,
} as const;

export const canvasLineCardsTopic = {
  slug: "canvas-line-cards",
  sourceRef: "lib/prompts/canvas-line-cards.ts",
  titleEn: "Canvas 2D Brand Line Cards",
  titleZh: "Canvas 2D 品牌竖线卡片",
  descriptionEn:
    "A reusable single-file prompt for turning three brand paths into sampled, animated line fields with pointer-driven detection overlays.",
  descriptionZh:
    "一条可复用的单文件提示词，把三个品牌路径变成采样亮度、动态竖线和指针检测框效果。",
  keywords: [
    "Canvas 2D animation",
    "brand line art",
    "generative identity",
    "single-file HTML",
    "interactive line drawing",
    "canvas logo effect",
    "竖线品牌卡片",
    "亮度场",
    "竹节线条",
  ],
  relatedStyleSlugs: ["quantized-line-field", "minimalist-flat", "apple-style"],
  introEn:
    "This recipe turns vector paths into sampled luminance tables, then redraws those tables as a restrained motion study. It specifies the grid, line quantization, pointer response, accessible motion controls, and observable checks so a coding assistant has concrete requirements to follow.",
  introZh:
    "这条配方先把矢量路径采样成亮度表，再把亮度表画成克制的动态视觉实验。它写清网格、线宽分档、指针反馈、无障碍动效控制和可检查的验收条件，方便别人按步骤复现。",
  prompts: [
    {
      titleEn: "Three Brand Marks as Quantized Lines",
      titleZh: "把三个品牌标志变成量化竖线",
      tool: "general",
      prompt: canvasLineCardsPrompt.en,
      promptZh: canvasLineCardsPrompt.zh,
      reference: {
        href: "/experiments/brand-line-cards/index.html",
        downloadFileName: "stylekit-brand-line-cards.html",
      },
    },
  ],
  useCases: [
    {
      titleEn: "Brand identity studies",
      titleZh: "品牌视觉实验",
      descriptionEn:
        "Explore how a familiar vector mark can become a responsive, animated line drawing without image assets.",
      descriptionZh:
        "探索如何把熟悉的矢量标志转化为响应式动态线稿，不依赖图片素材。",
    },
    {
      titleEn: "Portfolio interactions",
      titleZh: "作品集交互",
      descriptionEn:
        "Build a self-contained motion detail for a design portfolio, campaign page, or creative coding case study.",
      descriptionZh:
        "为设计作品集、活动页面或创意编程案例制作可独立运行的动效细节。",
    },
    {
      titleEn: "Canvas 2D learning",
      titleZh: "Canvas 2D 学习",
      descriptionEn:
        "Practice offscreen sampling, image-data reduction, deterministic noise, spring motion, and high-DPI drawing in one example.",
      descriptionZh:
        "通过一个完整案例练习离屏采样、像素数据压缩、确定性噪声、弹簧动效和高清画布绘制。",
    },
  ],
  faq: [
    {
      questionEn: "Do the blue boxes use real AI recognition?",
      questionZh: "蓝色检测框真的调用了 AI 识别吗？",
      answerEn:
        "No. The prompt requires a deterministic brightness scan of the sampled grid. The boxes are a visual metaphor and must not be described as real object detection or AI inference.",
      answerZh:
        "没有。提示词要求从采样网格中按亮度确定性地挑选区域。检测框只是视觉表达，不能描述成真实物体识别或 AI 推理。",
    },
    {
      questionEn: "How do I replace a brand path or palette?",
      questionZh: "怎样替换品牌路径或配色？",
      answerEn:
        "Replace that brand’s 24-by-24 Path2D data and update its name, background, ink, detection color, scale, and seed together. Keep the path centered in a 24-by-24 coordinate space so the sampling transform remains predictable.",
      answerZh:
        "同时替换该品牌的 24×24 Path2D 数据、名称、背景色、线色、检测色、scale 和 seed。让新路径仍位于 24×24 坐标范围内，这样采样变换才容易控制。",
    },
    {
      questionEn: "Will the animation replay exactly the same?",
      questionZh: "每次播放的动效都会完全一致吗？",
      answerEn:
        "The seeded noise is repeatable for the same time and input. Callouts follow the current noisy, displaced field rather than fixed initial coordinates. Pointer timing, refresh rate, rasterization, and device-pixel ratio can change exact frames; pixel-identical playback across devices is not promised.",
      answerZh:
        "相同时间和输入下，固定 seed 的噪声可以复现。检测框跟随当前带噪声与形变的线场，不使用初始化时的固定坐标。指针时序、刷新率、栅格化和设备像素比仍影响具体帧，不能保证跨设备逐像素一致。",
    },
    {
      questionEn: "What should happen when reduced motion is enabled?",
      questionZh: "系统开启减少动态效果时应怎样表现？",
      answerEn:
        "Start with motion paused and show a stable frame. Keep the motion toggle available so the visitor can opt in, and stop continuous animation work while motion remains disabled.",
      answerZh:
        "默认暂停动效并显示稳定画面。保留动效开关，让访客可以主动开启；动效关闭时停止持续绘制。",
    },
  ],
} satisfies PromptTopic;
