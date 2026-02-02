"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BrutalButton,
  BrutalCard,
  BrutalInput,
  BrutalTextarea,
  BrutalTag,
  BrutalBadge,
  BrutalSection,
  BrutalNav,
  BrutalLogo,
  BrutalCheckbox,
  BrutalRadio,
  BrutalToggle,
  BrutalSelect,
  BrutalAlert,
  BrutalProgress,
  BrutalDivider,
  BrutalTable,
  BrutalTableHeader,
  BrutalTableBody,
  BrutalTableRow,
  BrutalTableHead,
  BrutalTableCell,
  BrutalAvatar,
  BrutalTooltip,
  BrutalLink,
  BrutalSkeleton,
  BrutalAccordion,
  BrutalAccordionItem,
  BrutalModal,
  BrutalToast,
  BrutalTabs,
  BrutalCodeBlock,
} from "@/components/ui/brutal";

export default function ShowcaseContent() {
  const [progress, setProgress] = useState(65);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastVariant, setToastVariant] = useState<"default" | "success" | "error">("default");

  const showToast = (variant: "default" | "success" | "error") => {
    setToastVariant(variant);
    setToastVisible(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <BrutalNav>
        <BrutalLogo href="/styles/neo-brutalist/showcase">BRUTAL</BrutalLogo>
        <div className="flex gap-2 md:gap-4">
          <Link
            href="/styles/neo-brutalist"
            className="font-black text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] md:hover:translate-x-[2px] md:hover:translate-y-[2px] hover:bg-brutal-pink transition-all"
          >
            文档
          </Link>
          <Link
            href="/styles"
            className="font-black text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] md:hover:translate-x-[2px] md:hover:translate-y-[2px] hover:bg-brutal-green transition-all"
          >
            返回
          </Link>
        </div>
      </BrutalNav>

      {/* Hero Section */}
      <BrutalSection bgColor="green" className="pt-24 md:pt-40">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-black text-4xl md:text-6xl lg:text-8xl leading-tight tracking-tight mb-4 md:mb-6">
            NEO
            <br />
            BRUTALIST
          </h1>
          <p className="font-mono text-base md:text-xl max-w-xl mb-6 md:mb-8">
            大胆、直接、原始。无圆角、硬边缘阴影、高对比度配色。完整的 30+ 组件库。
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <BrutalButton variant="primary" size="lg">
              开始使用
            </BrutalButton>
            <BrutalButton variant="secondary" size="lg">
              查看文档
            </BrutalButton>
          </div>
        </div>
      </BrutalSection>

      {/* Color Palette */}
      <BrutalSection bgColor="white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">配色系统</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Pink", hex: "#ff006e", bg: "bg-brutal-pink" },
              { name: "Green", hex: "#ccff00", bg: "bg-brutal-green" },
              { name: "Blue", hex: "#00d9ff", bg: "bg-brutal-blue" },
              { name: "Yellow", hex: "#ff9500", bg: "bg-brutal-yellow" },
              { name: "Orange", hex: "#ff6b00", bg: "bg-brutal-orange" },
            ].map((color) => (
              <div key={color.name} className="border-2 md:border-4 border-black">
                <div className={`h-24 md:h-32 ${color.bg}`} />
                <div className="p-3 md:p-4 border-t-2 md:border-t-4 border-black">
                  <p className="font-black text-sm md:text-base">{color.name}</p>
                  <p className="font-mono text-xs text-gray-600">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BrutalSection>

      {/* Buttons */}
      <BrutalSection bgColor="pink">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 text-white">按钮 Button</h2>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-sm text-white/80 mb-4">变体 Variants</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <BrutalButton variant="primary">Primary</BrutalButton>
                <BrutalButton variant="secondary">Secondary</BrutalButton>
                <BrutalButton variant="outline">Outline</BrutalButton>
                <BrutalButton variant="pink">Pink</BrutalButton>
                <BrutalButton variant="green">Green</BrutalButton>
                <BrutalButton variant="blue">Blue</BrutalButton>
                <BrutalButton variant="yellow">Yellow</BrutalButton>
              </div>
            </div>
            <div>
              <p className="font-mono text-sm text-white/80 mb-4">尺寸 Sizes</p>
              <div className="flex flex-wrap gap-3 md:gap-4 items-center">
                <BrutalButton size="sm">Small</BrutalButton>
                <BrutalButton size="md">Medium</BrutalButton>
                <BrutalButton size="lg">Large</BrutalButton>
              </div>
            </div>
            <div>
              <p className="font-mono text-sm text-white/80 mb-4">状态 States</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <BrutalButton loading>Loading</BrutalButton>
                <BrutalButton disabled>Disabled</BrutalButton>
              </div>
            </div>
          </div>
        </div>
      </BrutalSection>

      {/* Cards */}
      <BrutalSection bgColor="white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">卡片 Card</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <BrutalCard hoverColor="pink">
              <h3 className="font-black text-xl md:text-2xl mb-2 md:mb-4">Pink Hover</h3>
              <p className="font-mono text-sm md:text-base text-gray-600">
                悬停时阴影变为粉色，卡片向上位移。
              </p>
            </BrutalCard>
            <BrutalCard hoverColor="green">
              <h3 className="font-black text-xl md:text-2xl mb-2 md:mb-4">Green Hover</h3>
              <p className="font-mono text-sm md:text-base text-gray-600">
                悬停时阴影变为绿色，卡片向上位移。
              </p>
            </BrutalCard>
            <BrutalCard hoverColor="blue">
              <h3 className="font-black text-xl md:text-2xl mb-2 md:mb-4">Blue Hover</h3>
              <p className="font-mono text-sm md:text-base text-gray-600">
                悬停时阴影变为蓝色，卡片向上位移。
              </p>
            </BrutalCard>
          </div>
        </div>
      </BrutalSection>

      {/* Form Elements */}
      <BrutalSection bgColor="blue">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">表单 Form</h2>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="font-black text-sm mb-2 block">输入框 Input</label>
              <BrutalInput placeholder="请输入内容..." />
            </div>
            <div>
              <label className="font-black text-sm mb-2 block">错误状态</label>
              <BrutalInput placeholder="错误提示" error />
            </div>
            <div>
              <label className="font-black text-sm mb-2 block">文本域 Textarea</label>
              <BrutalTextarea placeholder="请输入详细内容..." rows={4} />
            </div>
            <div>
              <label className="font-black text-sm mb-2 block">下拉选择 Select</label>
              <BrutalSelect
                placeholder="请选择..."
                options={[
                  { value: "option1", label: "选项一" },
                  { value: "option2", label: "选项二" },
                  { value: "option3", label: "选项三" },
                ]}
              />
            </div>
            <BrutalButton variant="primary" size="lg" className="w-full">
              提交
            </BrutalButton>
          </div>
        </div>
      </BrutalSection>

      {/* Checkbox, Radio, Toggle */}
      <BrutalSection bgColor="white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">选择控件</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-black text-lg mb-4">Checkbox</h3>
              <div className="space-y-3">
                <BrutalCheckbox label="选项 A" />
                <BrutalCheckbox label="选项 B" defaultChecked />
                <BrutalCheckbox label="选项 C" />
              </div>
            </div>
            <div>
              <h3 className="font-black text-lg mb-4">Radio</h3>
              <div className="space-y-3">
                <BrutalRadio name="demo" label="选项一" defaultChecked />
                <BrutalRadio name="demo" label="选项二" />
                <BrutalRadio name="demo" label="选项三" />
              </div>
            </div>
            <div>
              <h3 className="font-black text-lg mb-4">Toggle</h3>
              <div className="space-y-3">
                <BrutalToggle label="启用通知" />
                <BrutalToggle label="深色模式" defaultChecked />
                <BrutalToggle label="自动保存" />
              </div>
            </div>
          </div>
        </div>
      </BrutalSection>

      {/* Tags & Badges */}
      <BrutalSection bgColor="yellow">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">标签与徽章</h2>
          <div className="space-y-6">
            <div>
              <p className="font-black text-sm mb-4">Tags</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <BrutalTag variant="black">默认标签</BrutalTag>
                <BrutalTag variant="pink">Pink</BrutalTag>
                <BrutalTag variant="green">Green</BrutalTag>
                <BrutalTag variant="blue">Blue</BrutalTag>
                <BrutalTag variant="yellow">Yellow</BrutalTag>
                <BrutalTag variant="orange">Orange</BrutalTag>
              </div>
            </div>
            <div>
              <p className="font-black text-sm mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <BrutalBadge variant="black">1</BrutalBadge>
                <BrutalBadge variant="pink">99+</BrutalBadge>
                <BrutalBadge variant="green">NEW</BrutalBadge>
                <BrutalBadge variant="blue">5</BrutalBadge>
                <BrutalBadge variant="yellow">!</BrutalBadge>
              </div>
            </div>
          </div>
        </div>
      </BrutalSection>

      {/* Alerts */}
      <BrutalSection bgColor="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">提示 Alert</h2>
          <div className="space-y-4">
            <BrutalAlert title="默认提示">
              这是一条默认的提示信息。
            </BrutalAlert>
            <BrutalAlert variant="success" title="成功">
              操作已成功完成！
            </BrutalAlert>
            <BrutalAlert variant="warning" title="警告">
              请注意潜在的问题。
            </BrutalAlert>
            <BrutalAlert variant="error" title="错误">
              操作失败，请重试。
            </BrutalAlert>
            <BrutalAlert variant="info" title="信息">
              这是一条信息提示。
            </BrutalAlert>
          </div>
        </div>
      </BrutalSection>

      {/* Progress */}
      <BrutalSection bgColor="green">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">进度条 Progress</h2>
          <div className="space-y-6">
            <BrutalProgress value={progress} variant="pink" showValue />
            <BrutalProgress value={80} variant="black" />
            <BrutalProgress value={45} variant="blue" showValue />
            <div className="flex gap-3">
              <BrutalButton size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                -10
              </BrutalButton>
              <BrutalButton size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                +10
              </BrutalButton>
            </div>
          </div>
        </div>
      </BrutalSection>

      {/* Table */}
      <BrutalSection bgColor="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">表格 Table</h2>
          <BrutalTable>
            <BrutalTableHeader>
              <BrutalTableRow>
                <BrutalTableHead>组件</BrutalTableHead>
                <BrutalTableHead>类型</BrutalTableHead>
                <BrutalTableHead>状态</BrutalTableHead>
              </BrutalTableRow>
            </BrutalTableHeader>
            <BrutalTableBody>
              <BrutalTableRow>
                <BrutalTableCell>BrutalButton</BrutalTableCell>
                <BrutalTableCell>交互组件</BrutalTableCell>
                <BrutalTableCell><BrutalTag variant="green" size="sm">完成</BrutalTag></BrutalTableCell>
              </BrutalTableRow>
              <BrutalTableRow>
                <BrutalTableCell>BrutalCard</BrutalTableCell>
                <BrutalTableCell>布局组件</BrutalTableCell>
                <BrutalTableCell><BrutalTag variant="green" size="sm">完成</BrutalTag></BrutalTableCell>
              </BrutalTableRow>
              <BrutalTableRow>
                <BrutalTableCell>BrutalModal</BrutalTableCell>
                <BrutalTableCell>覆盖层组件</BrutalTableCell>
                <BrutalTableCell><BrutalTag variant="green" size="sm">完成</BrutalTag></BrutalTableCell>
              </BrutalTableRow>
              <BrutalTableRow>
                <BrutalTableCell>BrutalToast</BrutalTableCell>
                <BrutalTableCell>反馈组件</BrutalTableCell>
                <BrutalTableCell><BrutalTag variant="green" size="sm">完成</BrutalTag></BrutalTableCell>
              </BrutalTableRow>
            </BrutalTableBody>
          </BrutalTable>
        </div>
      </BrutalSection>

      {/* Avatar & Tooltip */}
      <BrutalSection bgColor="pink">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12 text-white">头像与提示</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-black text-lg mb-4 text-white">Avatar</h3>
              <div className="flex gap-4 items-end">
                <BrutalAvatar size="sm" fallback="A" />
                <BrutalAvatar size="md" fallback="B" />
                <BrutalAvatar size="lg" fallback="C" />
              </div>
            </div>
            <div>
              <h3 className="font-black text-lg mb-4 text-white">Tooltip</h3>
              <div className="flex gap-4">
                <BrutalTooltip content="上方提示" position="top">
                  <BrutalButton variant="secondary" size="sm">上</BrutalButton>
                </BrutalTooltip>
                <BrutalTooltip content="下方提示" position="bottom">
                  <BrutalButton variant="secondary" size="sm">下</BrutalButton>
                </BrutalTooltip>
                <BrutalTooltip content="右侧提示" position="right">
                  <BrutalButton variant="secondary" size="sm">右</BrutalButton>
                </BrutalTooltip>
              </div>
            </div>
          </div>
        </div>
      </BrutalSection>

      {/* Tabs */}
      <BrutalSection bgColor="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">标签页 Tabs</h2>
          <BrutalTabs
            tabs={[
              {
                id: "tab1",
                label: "概述",
                content: (
                  <div className="font-mono">
                    <p>Neo-Brutalist 设计风格源于建筑领域的野兽派运动。</p>
                  </div>
                ),
              },
              {
                id: "tab2",
                label: "安装",
                content: (
                  <div className="font-mono">
                    <p>npm install @stylekit/brutal</p>
                  </div>
                ),
              },
              {
                id: "tab3",
                label: "使用",
                content: (
                  <div className="font-mono">
                    <p>import {`{ BrutalButton }`} from &quot;@stylekit/brutal&quot;</p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </BrutalSection>

      {/* Accordion */}
      <BrutalSection bgColor="blue">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">手风琴 Accordion</h2>
          <BrutalAccordion>
            <BrutalAccordionItem title="什么是 Neo-Brutalist?" defaultOpen>
              Neo-Brutalist 是一种设计风格，强调原始、未经修饰的功能美学。
              在 Web 设计中，通过大胆的黑色边框、硬边缘阴影、锐利的直角和高对比度配色来表达。
            </BrutalAccordionItem>
            <BrutalAccordionItem title="核心设计原则">
              功能优先、诚实表达、大胆直接、反对圆滑。每个元素都有明确的目的，
              不掩饰结构，不伪装功能。
            </BrutalAccordionItem>
            <BrutalAccordionItem title="如何使用这个组件库？">
              从 @/components/ui/brutal 导入所需组件，所有组件都遵循相同的设计语言，
              支持响应式设计和无障碍访问。
            </BrutalAccordionItem>
          </BrutalAccordion>
        </div>
      </BrutalSection>

      {/* Modal & Toast */}
      <BrutalSection bgColor="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">弹窗与通知</h2>
          <div className="flex flex-wrap gap-4">
            <BrutalButton onClick={() => setIsModalOpen(true)}>
              打开 Modal
            </BrutalButton>
            <BrutalButton variant="green" onClick={() => showToast("success")}>
              成功 Toast
            </BrutalButton>
            <BrutalButton variant="pink" onClick={() => showToast("error")}>
              错误 Toast
            </BrutalButton>
          </div>
        </div>
      </BrutalSection>

      {/* Code Block */}
      <BrutalSection bgColor="black">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">代码块 CodeBlock</h2>
          <BrutalCodeBlock
            code={`// Neo-Brutalist Button
<BrutalButton variant="primary" size="lg">
  点击我
</BrutalButton>

// 组件特点
- 无圆角 (rounded-none)
- 硬边缘阴影 (shadow-[8px_8px_0px])
- hover 位移效果
- 响应式设计`}
          />
        </div>
      </BrutalSection>

      {/* Skeleton & Links */}
      <BrutalSection bgColor="white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">其他组件</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-black text-lg mb-4">Skeleton 骨架屏</h3>
              <div className="space-y-3">
                <BrutalSkeleton variant="text" />
                <BrutalSkeleton variant="text" className="w-3/4" />
                <BrutalSkeleton variant="text" className="w-1/2" />
              </div>
            </div>
            <div>
              <h3 className="font-black text-lg mb-4">Link 链接</h3>
              <div className="space-y-3">
                <div><BrutalLink href="#">默认链接</BrutalLink></div>
                <div><BrutalLink href="#" variant="underline">下划线链接</BrutalLink></div>
                <div><BrutalLink href="#" variant="button">按钮链接</BrutalLink></div>
              </div>
            </div>
          </div>
        </div>
      </BrutalSection>

      {/* Dividers */}
      <BrutalSection bgColor="green">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">分割线 Divider</h2>
          <div className="space-y-8">
            <div>
              <p className="font-mono text-sm mb-4">Solid</p>
              <BrutalDivider variant="solid" />
            </div>
            <div>
              <p className="font-mono text-sm mb-4">Dashed</p>
              <BrutalDivider variant="dashed" />
            </div>
            <div>
              <p className="font-mono text-sm mb-4">Thick</p>
              <BrutalDivider variant="thick" />
            </div>
          </div>
        </div>
      </BrutalSection>

      {/* Rules Summary */}
      <BrutalSection bgColor="black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl mb-8 md:mb-12">核心规则</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="font-black text-xl md:text-2xl mb-4 text-brutal-green">DO - 必须</h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-gray-300">
                <li>• 无圆角或 rounded-none</li>
                <li>• 硬边缘阴影 shadow-[Xpx_Xpx_0px]</li>
                <li>• 纯黑边框 border-black</li>
                <li>• hover 阴影消失 + 位移</li>
                <li>• 标题 font-black</li>
                <li>• 正文 font-mono</li>
                <li>• 响应式 md: 前缀</li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-xl md:text-2xl mb-4 text-brutal-pink">⛔ 禁止</h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-gray-300">
                <li>• 圆角 rounded-lg/md/xl</li>
                <li>• 模糊阴影 shadow-lg/xl</li>
                <li>• 渐变 bg-gradient-*</li>
                <li>• 灰色边框 border-gray-*</li>
                <li>• 淡入淡出效果</li>
                <li>• 柔和过渡</li>
              </ul>
            </div>
          </div>
        </div>
      </BrutalSection>

      {/* Component List */}
      <BrutalSection bgColor="white" noBorder>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-3xl md:text-5xl mb-8">30+ 组件</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              "Button", "Card", "Input", "Textarea", "Select",
              "Checkbox", "Radio", "Toggle", "Tag", "Badge",
              "Alert", "Progress", "Table", "Avatar", "Tooltip",
              "Link", "Skeleton", "Accordion", "Modal", "Toast",
              "Tabs", "CodeBlock", "Section", "Nav", "Logo",
              "Divider", "Marquee",
            ].map((name) => (
              <BrutalTag key={name} variant="black">{name}</BrutalTag>
            ))}
          </div>
          <Link href="/styles/neo-brutalist">
            <BrutalButton
              variant="primary"
              size="lg"
            >
              查看完整文档 →
            </BrutalButton>
          </Link>
        </div>
      </BrutalSection>

      {/* Footer */}
      <div className="border-t-2 md:border-t-4 border-black py-6 md:py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-gray-600">
            StyleKit · Neo-Brutalist Showcase · 30+ Components
          </p>
          <Link
            href="/styles/neo-brutalist"
            className="font-black text-sm hover:text-brutal-pink transition-colors"
          >
            查看完整文档 →
          </Link>
        </div>
      </div>

      {/* Modal */}
      <BrutalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Neo-Brutalist Modal"
      >
        <div className="space-y-4">
          <p className="font-mono">
            这是一个 Neo-Brutalist 风格的 Modal 弹窗。具有粗边框、硬边缘阴影等特征。
          </p>
          <div className="flex gap-3 justify-end">
            <BrutalButton variant="outline" onClick={() => setIsModalOpen(false)}>
              取消
            </BrutalButton>
            <BrutalButton onClick={() => setIsModalOpen(false)}>
              确认
            </BrutalButton>
          </div>
        </div>
      </BrutalModal>

      {/* Toast */}
      <BrutalToast
        message={
          toastVariant === "success" ? "操作成功！" :
          toastVariant === "error" ? "操作失败！" : "提示信息"
        }
        variant={toastVariant}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
