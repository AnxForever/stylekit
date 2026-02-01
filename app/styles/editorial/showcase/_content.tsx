"use client";

import Link from "next/link";

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a]">
      {/* Navigation */}
      <header className="border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/styles/editorial/showcase" className="font-serif text-lg md:text-xl tracking-[0.3em] uppercase">
              EDITORIAL
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/styles/editorial" className="text-sm tracking-wide text-[#6b7280] hover:text-[#0a0a0a] transition-colors">
                文档
              </Link>
              <Link href="/styles" className="text-sm tracking-wide text-[#6b7280] hover:text-[#0a0a0a] transition-colors">
                返回
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
          <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">设计风格</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6">
            优雅的
            <br />
            <span className="italic">杂志排版</span>
          </h1>
          <p className="text-lg md:text-xl text-[#6b7280] leading-relaxed max-w-md">
            Editorial 风格强调内容至上，通过精致的字体和留白营造高级感。
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">配色方案</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12">色彩系统</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Primary", hex: "#0a0a0a", bg: "bg-[#0a0a0a]", text: "text-white" },
              { name: "Secondary", hex: "#fafafa", bg: "bg-[#fafafa] border", text: "text-[#0a0a0a]" },
              { name: "Accent", hex: "#e63946", bg: "bg-[#e63946]", text: "text-white" },
              { name: "Muted", hex: "#6b7280", bg: "bg-[#6b7280]", text: "text-white" },
              { name: "Border", hex: "#e5e5e5", bg: "bg-[#e5e5e5]", text: "text-[#0a0a0a]" },
            ].map((color) => (
              <div key={color.name} className="border border-[#e5e5e5]">
                <div className={`h-24 md:h-32 ${color.bg}`} />
                <div className="p-3 md:p-4 border-t border-[#e5e5e5]">
                  <p className="text-sm font-medium">{color.name}</p>
                  <p className="text-xs text-[#6b7280]">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">字体排版</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12">Typography</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">衬线标题</p>
              <h3 className="font-serif text-3xl md:text-5xl tracking-tight mb-4">
                The Art of <span className="italic">Typography</span>
              </h3>
              <p className="text-sm text-[#6b7280]">font-serif · tracking-tight · 400 weight</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">无衬线正文</p>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                正文使用无衬线字体，保持良好的可读性。行高 leading-relaxed 确保文字有足够的呼吸空间。
              </p>
              <p className="text-sm text-[#6b7280]">font-sans · leading-relaxed · 400 weight</p>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">交互元素</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12">按钮 Button</h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">Primary</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#0a0a0a] text-[#fafafa] text-sm tracking-wide hover:bg-[#0a0a0a]/90 transition-colors">按钮文字</button>
                <button className="px-6 py-3 bg-[#e63946] text-white text-sm tracking-wide hover:bg-[#e63946]/90 transition-colors">强调按钮</button>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">Outline</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 border border-[#e5e5e5] text-sm tracking-wide hover:border-[#0a0a0a] transition-colors">轮廓按钮</button>
                <button className="px-6 py-3 border border-[#0a0a0a] text-sm tracking-wide hover:bg-[#0a0a0a] hover:text-white transition-colors">深色轮廓</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">内容展示</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12">卡片 Card</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { category: "设计", title: "极简主义的力量", desc: "少即是多的设计哲学" },
              { category: "排版", title: "字体的艺术", desc: "衬线与无衬线的平衡" },
              { category: "留白", title: "呼吸的空间", desc: "负空间让内容更突出" },
            ].map((card, i) => (
              <div key={i} className="border border-[#e5e5e5] hover:border-[#0a0a0a] transition-colors group">
                <div className="aspect-[16/9] bg-zinc-100" />
                <div className="p-6">
                  <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-2">{card.category}</p>
                  <h3 className="font-serif text-xl mb-3 group-hover:text-[#e63946] transition-colors">{card.title}</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">表单设计</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12">表单 Form</h2>
          <div className="space-y-6">
            <div>
              <label className="text-xs tracking-widest uppercase text-[#6b7280] mb-2 block">姓名</label>
              <input type="text" placeholder="请输入..." className="w-full px-4 py-3 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#6b7280]" />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-[#6b7280] mb-2 block">邮箱</label>
              <input type="email" placeholder="example@email.com" className="w-full px-4 py-3 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#6b7280]" />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-[#6b7280] mb-2 block">留言</label>
              <textarea placeholder="请输入您的留言..." rows={4} className="w-full px-4 py-3 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors placeholder:text-[#6b7280] resize-none" />
            </div>
            <button className="w-full px-6 py-3 bg-[#0a0a0a] text-[#fafafa] text-sm tracking-wide hover:bg-[#0a0a0a]/90 transition-colors">提交</button>
          </div>
        </div>
      </section>

      {/* Article Example */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">文章排版</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12">文章示例</h2>
          <article className="prose">
            <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">2024年1月15日 · 设计理念</p>
            <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-6">
              留白的艺术：<span className="italic">为何空间如此重要</span>
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-[#6b7280] mb-6 first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#0a0a0a]">
              在设计中，留白不仅仅是空白区域，它是一种强有力的设计元素。适当的留白能够引导读者的视线，强调重要内容，并创造出优雅的视觉层次。
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[#6b7280]">
              当我们谈论留白时，我们实际上是在讨论内容之间的关系。每一处间距都是经过深思熟虑的决定，它们共同构成了页面的节奏和韵律。
            </p>
          </article>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-[#6b7280] mb-4">设计规范</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12">核心规则</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-xl mb-6 text-[#0a0a0a]">必须遵循</h3>
              <ul className="space-y-3 text-sm text-[#6b7280]">
                <li className="flex items-start gap-3"><span className="text-[#0a0a0a]">—</span><span>标题使用衬线字体 font-serif</span></li>
                <li className="flex items-start gap-3"><span className="text-[#0a0a0a]">—</span><span>正文使用无衬线字体 font-sans</span></li>
                <li className="flex items-start gap-3"><span className="text-[#0a0a0a]">—</span><span>大量留白 py-16 md:py-24</span></li>
                <li className="flex items-start gap-3"><span className="text-[#0a0a0a]">—</span><span>细边框 border border-[#e5e5e5]</span></li>
                <li className="flex items-start gap-3"><span className="text-[#0a0a0a]">—</span><span>小写标签 uppercase tracking-widest text-xs</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-6 text-[#e63946]">禁止事项</h3>
              <ul className="space-y-3 text-sm text-[#6b7280]">
                <li className="flex items-start gap-3"><span className="text-[#e63946]">×</span><span>粗边框或阴影</span></li>
                <li className="flex items-start gap-3"><span className="text-[#e63946]">×</span><span>过多颜色</span></li>
                <li className="flex items-start gap-3"><span className="text-[#e63946]">×</span><span>过多装饰元素</span></li>
                <li className="flex items-start gap-3"><span className="text-[#e63946]">×</span><span>标题使用无衬线字体</span></li>
                <li className="flex items-start gap-3"><span className="text-[#e63946]">×</span><span>元素堆积，缺乏呼吸感</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#6b7280]">StyleKit · Editorial Showcase</p>
            <Link href="/styles/editorial" className="text-sm tracking-wide hover:text-[#e63946] transition-colors">
              查看完整文档 →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
