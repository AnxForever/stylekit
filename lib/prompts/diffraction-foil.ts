/**
 * Reproduction recipe for the Diffraction Foil style, 2026-11-03.
 * Source: the browser-checked reference at public/experiments/diffraction-foil/index.html,
 * which is page 002 of 1001 Pages (https://yophon.github.io/1001-pages/holo.html).
 * Every number below is read from that reference: grating period, lamp height, color
 * matching fit, tone mapping, spectrum window, spring constants.
 *
 * The prompt asks for a smaller, self-contained subset of the reference (one card and
 * a short component set). The full reference stays downloadable for comparison; this
 * does not claim pixel-identical reproduction across models or devices.
 */
export const diffractionFoilPrompt = {
  en: String.raw`Create one polished, responsive, self-contained HTML file titled “Diffraction Foil”. It must work when opened directly in a modern browser. Use native HTML, CSS, JavaScript, WebGL2, and Canvas 2D only. Do not use libraries, frameworks, modules, build tools, image files, image URLs, or network requests other than one optional web font. Return the complete HTML and nothing else.

The subject is holographic hot-stamping foil rendered by its physics, not a rainbow gradient. Color comes from a diffraction grating lit by a lamp that follows the pointer. Every rule below exists so the foil reads as metal that changes with angle.

1. Page
Use a near-black print sheet (#0c0b10) with faint crop marks. At the top, a wide trading card with a 1.8:1 aspect ratio, about 72% of the stage height, rounded corners at 4.8% of the short side. The brand name “Lumen” is stamped in silver foil across the card; a thin glitter border runs inside the edge. Clicking or pressing Enter flips the card to a back face with a guilloché rosette. Below the card, lay out a compact component sheet on dark panels: a foil swatch row, a foil button, a switch, a slider, a progress bar, a badge, and a round seal. On screens under 680 pixels, use a portrait 63:88 card and a single-column sheet.

2. The lamp
Treat the pointer as a small lamp 300 CSS pixels above the screen plane. Store its position in viewport pixels and ease toward the target every animation frame with factor 1 - exp(-dt * 16), clamping dt to 0..50 ms because frame timestamps can arrive out of order. When the pointer has not moved for 4 seconds, leaves the window, or the device has no hover, let the lamp drift on its own: x = width * (0.5 + 0.42 sin(0.21 t)), y = height * (0.4 + 0.32 sin(0.33 t + 1.2)), easing with 1 - exp(-dt * 2.5). With device orientation available, offset the lamp by up to 35% of the viewport from a slowly re-centering baseline (blend 2% per event toward the current beta and gamma, divide the difference by 25 degrees, clamp to -1..1). With prefers-reduced-motion, park the lamp at 72% x, 22% y and never orbit.

3. Spectral color
Convert wavelength in nanometres to color with the Wyman, Sloan and Shirley 2013 piecewise-Gaussian fit of the CIE 1931 matching functions. X = 1.056 g(l, 599.8, 37.9, 31) + 0.362 g(l, 442, 16, 26.7) - 0.065 g(l, 501.1, 20.4, 26.2); Y = 0.821 g(l, 568.8, 46.9, 40.5) + 0.286 g(l, 530.9, 16.3, 31.1); Z = 1.217 g(l, 437, 11.8, 36) + 0.681 g(l, 459, 26, 13.8), where g(x, m, a, b) uses spread a below the mean and b above it. Return black outside 380..780 nm. Convert to linear sRGB with the standard matrix, pull each channel 34% toward Y so pure spectral colors do not break at the sRGB gamut edge, clamp negatives to zero, and scale by 0.8. Tone-map the final color with the Narkowicz ACES fit and encode to sRGB.

4. Diffraction grating
For a point on the foil, take the unit direction to the lamp and the unit direction to the viewer (straight out of the screen). Project both onto the foil plane and add them; call the 2D sum h. The groove normal k is a unit vector in the plane. With groove period d = 1500 nm, order m reflects wavelength l = d * |dot(h, k)| / m. Sum orders 1, 2 and 3 with weights 1, 0.5 and 0.3, multiply by 1.6, then tone-map. Where |dot(h, k)| is small the foil shows silver; where it grows the bands sweep through violet, blue, green, yellow and red, then repeat in higher orders. Never paint a fixed gradient and animate its position.

5. Materials
Implement each material as a different groove layout feeding the same grating function:
- Film: two crossed gratings (k and k rotated 90 degrees), averaged, over brushed silver.
- Brushed: one straight grating at a chosen angle plus anisotropic brushed-metal streaks along the grooves.
- Star: concentric grooves, so k is the radial direction from the element center; only the radius pointing toward the lamp, and its opposite, lights up.
- Glitter: a field of small facets with random groove angles and tilts on a dark base; a facet flashes only when its grating sends color toward the viewer.
- Pearl: thin-film interference instead of a grating, thickness 300 + 260 noise nm, refractive index 1.38, twelve wavelength samples from 400 to 697 nm, normalized per channel.
Add a soft specular highlight where the lamp reflects and keep the base silver between the colored bands.

6. One WebGL context for every element
Browsers cap simultaneous WebGL contexts, so never create one per element. Create a single hidden WebGL2 canvas and one fragment shader with a material uniform. Each foil element owns a plain 2D canvas sized to its CSS box times devicePixelRatio (capped at 2). For each visible element, resize the shared viewport to that element, set its rectangle, the lamp position relative to it, its material and its current tilt, draw one full-screen triangle, then copy the result into the element canvas with drawImage. Skip elements whose lamp position, size, tilt and texture version have not changed since the last frame. Use IntersectionObserver so offscreen elements cost nothing.

7. CSS fallback
Offer a WebGL / CSS toggle and fall back automatically when WebGL2 is unavailable. Precompute a 1024 by 1 spectrum strip for t from -1.25 to 1.25, coloring each texel with the grating at |t|. For every foil element, compute the vector from the lamp to its center in CSS pixels, set --k to its angle, and select a window of the strip: along k, t(x) = x / sqrt(x^2 + 300^2) at the element center and at both ends, widened 2.6 times so one element shows two or three colors. Paint the strip in a ::before layer rotated by --k with background-size and background-position from that window, blended with screen over a silver gradient (overlay on light variants that carry ink text). Add an ::after layer with a radial highlight at the lamp position and a tiled sparkle texture. Read every element rectangle first, then write all custom properties, to avoid layout thrashing.

8. Touch and press
Pressing a foil control bends its surface: on pointer down, tilt the normal up to 14 degrees toward the pressed point; on release, spring back with stiffness 320 and damping ratio 0.32 so it overshoots once. Toggling a switch or checkbox adds a short angular impulse; dragging the slider tilts toward the drag direction. Only the shading normal changes; the element itself does not move. The card tilts a few degrees toward the pointer and flips on click with a spring.

9. Access and performance
All controls are native buttons and inputs, reachable by keyboard, with visible focus rings. Ink text sits on light foil, never on saturated bands. With reduced motion, stop orbiting, remove spring overshoot, and keep a stable frame. Pause rendering while the document is hidden. Keep the page under one shared WebGL context and redraw only changed elements.

10. Inspect before returning
Check these observable conditions: moving the pointer moves the rainbow bands across every foil element at once, centered on the lamp; leaving the pointer still for four seconds starts a slow orbit; the colors run violet to red as the angle grows and repeat in higher orders; star shows two opposite colored rays; glitter flashes individual facets; there is exactly one WebGL context; the CSS toggle keeps the same layout and still follows the lamp; reduced motion yields a still frame; DPR 2 doubles each element canvas backing store.`,
  zh: String.raw`请制作一个名为“Diffraction Foil”的精致响应式单文件 HTML 页面，直接用现代浏览器打开即可运行。只使用原生 HTML、CSS、JavaScript、WebGL2 和 Canvas 2D。不要使用库、框架、模块、构建工具、图片文件、图片链接，除一款可选的网页字体外不要发起网络请求。最终只返回完整 HTML 文件。

主题是按物理算出来的镭射烫印箔，不是彩虹渐变。颜色来自衍射光栅，光源是一盏跟着指针走的灯。下面每一条都是为了让它看起来像会随角度变色的金属。

1. 页面
近黑的印张（#0c0b10），带浅浅的裁切线。顶部一张宽幅收藏卡，宽高比 1.8:1，约占舞台高度的 72%，圆角是短边的 4.8%。品牌名“Lumen”用银色镭射箔烫在卡面上，卡边内侧一道碎钻边框。点击或按回车，卡片翻到背面，背面是一朵扭索纹圆花。卡片下面是一张紧凑的零件表，放在深色面板上：一排材质样片、镭射按钮、开关、滑杆、进度条、徽章和一枚圆章。屏幕窄于 680 像素时，卡片改成竖向 63:88，零件表改成单列。

2. 灯
把指针当成一盏离屏幕 300 个 CSS 像素高的小灯。灯的位置用视口像素保存，每帧按 1 - exp(-dt × 16) 向目标缓动；dt 夹在 0 到 50 毫秒之间，因为帧时间戳可能乱序。指针 4 秒没动、离开窗口，或者设备没有悬停能力时，灯自己慢慢漂：x = 宽 × (0.5 + 0.42 sin(0.21 t))，y = 高 × (0.4 + 0.32 sin(0.33 t + 1.2))，缓动系数 1 - exp(-dt × 2.5)。有陀螺仪时，按手机倾斜把灯最多挪动视口的 35%：基准每次事件向当前 beta、gamma 靠拢 2%，差值除以 25 度并夹在 -1 到 1。开启减少动态效果时，灯停在 72% x、22% y，不再绕圈。

3. 光谱颜色
波长（纳米）转颜色，用 Wyman、Sloan 和 Shirley 2013 年对 CIE 1931 配色函数的分段高斯拟合：X = 1.056 g(l, 599.8, 37.9, 31) + 0.362 g(l, 442, 16, 26.7) - 0.065 g(l, 501.1, 20.4, 26.2)；Y = 0.821 g(l, 568.8, 46.9, 40.5) + 0.286 g(l, 530.9, 16.3, 31.1)；Z = 1.217 g(l, 437, 11.8, 36) + 0.681 g(l, 459, 26, 13.8)。g(x, m, a, b) 在均值左侧用宽度 a、右侧用宽度 b。380 到 780 纳米以外返回黑色。用标准矩阵转到线性 sRGB，每个通道向 Y 拉近 34%，免得纯光谱色在 sRGB 色域边缘断开；负值截成 0，再乘 0.8。最终颜色用 Narkowicz 的 ACES 拟合做色调映射，再编码成 sRGB。

4. 衍射光栅
膜上一点：取指向灯的单位向量和指向观者的单位向量（垂直屏幕向外），都投影到膜面上再相加，记这个二维和为 h。刻槽法向 k 是膜面内的单位向量。刻槽间距 d = 1500 纳米，第 m 级反射的波长是 l = d × |dot(h, k)| / m。把 1、2、3 级按 1、0.5、0.3 的权重加起来，乘 1.6，再做色调映射。|dot(h, k)| 小的地方是银色，变大时依次扫过紫、蓝、绿、黄、红，高级次再重复一遍。不要画一条固定的渐变再去挪它的位置。

5. 材质
每种材质是一种刻槽排布，都喂给同一个光栅函数：
- 彩虹膜：两组交叉光栅（k 和 k 转 90 度）取平均，底下是拉丝银。
- 拉丝：一组指定角度的直纹光栅，加顺着刻槽方向的各向异性拉丝。
- 星芒：同心圆刻槽，k 是从元素中心出发的径向；只有朝着灯的那条半径和它对面那条亮出彩虹。
- 碎钻：暗底上一片小碎片，每片刻槽角度和倾斜都随机；只有光栅正好把颜色送到观者眼里的那几片会闪。
- 幻彩：用薄膜干涉代替光栅，膜厚 300 + 260 × 噪声纳米，折射率 1.38，在 400 到 697 纳米之间取 12 个波长，每个通道单独归一化。
在灯的反射点加一块柔和的镜面高光，彩虹带之间保留银底。

6. 所有元素共用一个 WebGL 上下文
浏览器限制同时存在的 WebGL 上下文数量，不要每个元素开一个。只建一个隐藏的 WebGL2 画布和一个用材质 uniform 区分分支的片元着色器。每个镭射元素自带一个普通的 2D 画布，尺寸是它的 CSS 盒子乘 devicePixelRatio（上限 2）。对每个可见元素：把共享视口改成它的尺寸，传入它的矩形、灯相对它的位置、材质和当前倾斜，画一个全屏三角形，再用 drawImage 拷进它自己的画布。灯的位置、尺寸、倾斜和贴图版本都没变的元素这一帧跳过。用 IntersectionObserver 让屏幕外的元素不花任何代价。

7. CSS 平替
提供 WebGL / CSS 切换；没有 WebGL2 时自动退回 CSS。预先算一张 1024×1 的光谱条，t 从 -1.25 到 1.25，每个像素的颜色取 |t| 处的光栅颜色。对每个镭射元素，算灯到它中心的向量（CSS 像素），把角度写进 --k，再从光谱条上截一段：沿 k 方向 t(x) = x / sqrt(x² + 300²)，分别取元素中心和两端，把截取范围放宽 2.6 倍，让一个元素上同时看到两三种颜色。光谱条画在 ::before 层里，按 --k 旋转，background-size 和 background-position 取自那段窗口，用 screen 叠在银色渐变上（要印油墨字的浅色款用 overlay）。::after 层放一块位于灯位置的径向高光和一层平铺的闪点。先量完所有元素的矩形，再统一写 CSS 变量，避免反复重排。

8. 触摸和按压
按下镭射控件时膜面会弯：按下瞬间，法线朝按下的位置最多倾斜 14 度；松手后用刚度 320、阻尼比 0.32 的弹簧弹回，过冲一次。切换开关或勾选时加一个短促的角冲量；拖动滑杆时朝拖动方向倾斜。只改着色用的法线，元素本身不动。卡片朝指针微微倾斜几度，点击时用弹簧翻面。

9. 无障碍和性能
所有控件都是原生按钮和输入框，键盘可达，有清晰的焦点环。油墨字只印在浅色箔上，不压在饱和的彩虹带上。减少动态效果时停止绕圈、去掉弹簧过冲、保持稳定画面。页面隐藏时暂停渲染。整页只有一个共享的 WebGL 上下文，每帧只重画有变化的元素。

10. 返回前检查
逐条确认：移动指针时，所有镭射元素上的彩虹带同时移动，并以灯为中心；指针静止 4 秒后开始缓慢绕圈；角度变大时颜色从紫走到红，高级次再重复；星芒是两道相对的彩色光线；碎钻是一颗颗单独闪；页面上只有一个 WebGL 上下文；切到 CSS 后版面不变，彩虹仍跟着灯走；减少动态效果时画面静止；设备像素比为 2 时每个元素画布的缓冲区尺寸翻倍。`,
} as const;
