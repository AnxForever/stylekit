"use client";

import { useState } from "react";
import Link from "next/link";
import {
  NeuButton,
  NeuCard,
  NeuInput,
  NeuTextarea,
  NeuCheckbox,
  NeuRadio,
  NeuToggle,
  NeuProgress,
  NeuSlider,
  NeuAvatar,
  NeuIconButton,
  NeuAlert,
  NeuBadge,
  NeuTabs,
  NeuDivider,
  NeuSection,
  NeuNav,
  NeuLogo,
  NeuSkeleton,
} from "@/components/ui/neumorphism";

export default function ShowcaseContent() {
  const [progress, setProgress] = useState(65);
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="min-h-screen bg-[#e0e5ec]">
      {/* Navigation */}
      <NeuNav>
        <NeuLogo href="/styles/neumorphism/showcase">NEU</NeuLogo>
        <div className="flex gap-3">
          <Link
            href="/styles/neumorphism"
            className="px-4 py-2 rounded-lg text-gray-600 text-sm hover:text-gray-800 shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] transition-all"
          >
            文档
          </Link>
          <Link
            href="/styles"
            className="px-4 py-2 rounded-lg text-gray-600 text-sm hover:text-gray-800 shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] transition-all"
          >
            返回
          </Link>
        </div>
      </NeuNav>

      {/* Hero Section */}
      <NeuSection className="pt-24 md:pt-40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            柔和的
            <br />
            <span className="text-[#6d5dfc]">立体世界</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto mb-8">
            通过精致的双重阴影，创造触手可及的界面体验。18 个组件，一套完整的设计语言。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <NeuButton variant="primary" size="lg">开始使用</NeuButton>
            <NeuButton size="lg">查看文档</NeuButton>
          </div>
        </div>
      </NeuSection>

      {/* Color Palette */}
      <NeuSection>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">配色系统</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Background", hex: "#e0e5ec", bg: "bg-[#e0e5ec]" },
              { name: "Shadow Dark", hex: "#b8bcc2", bg: "bg-[#b8bcc2]" },
              { name: "Accent", hex: "#6d5dfc", bg: "bg-[#6d5dfc]" },
              { name: "Coral", hex: "#ff6b6b", bg: "bg-[#ff6b6b]" },
            ].map((color) => (
              <NeuCard key={color.name}>
                <div className={`h-20 md:h-24 ${color.bg} rounded-xl mb-3`} />
                <p className="font-semibold text-gray-800 text-sm">{color.name}</p>
                <p className="text-gray-500 text-xs font-mono">{color.hex}</p>
              </NeuCard>
            ))}
          </div>
        </div>
      </NeuSection>

      {/* Buttons */}
      <NeuSection>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">按钮 Button</h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm text-gray-500 mb-4">变体 Variants</p>
              <div className="flex flex-wrap gap-4">
                <NeuButton>Default</NeuButton>
                <NeuButton variant="primary">Primary</NeuButton>
                <NeuButton variant="flat">Flat</NeuButton>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">尺寸 Sizes</p>
              <div className="flex flex-wrap gap-4 items-center">
                <NeuButton size="sm">Small</NeuButton>
                <NeuButton size="md">Medium</NeuButton>
                <NeuButton size="lg">Large</NeuButton>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">状态 States</p>
              <div className="flex flex-wrap gap-4">
                <NeuButton loading>Loading</NeuButton>
                <NeuButton disabled>Disabled</NeuButton>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">图标按钮 Icon Buttons</p>
              <div className="flex flex-wrap gap-4">
                <NeuIconButton size="sm">♥</NeuIconButton>
                <NeuIconButton>★</NeuIconButton>
                <NeuIconButton size="lg">◆</NeuIconButton>
              </div>
            </div>
          </div>
        </div>
      </NeuSection>

      {/* Cards */}
      <NeuSection>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">卡片 Card</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <NeuCard variant="raised">
              <h3 className="font-semibold text-gray-800 text-lg mb-2">凸起效果</h3>
              <p className="text-gray-600 text-sm">默认的卡片样式，通过双重阴影从背景中浮起。</p>
            </NeuCard>
            <NeuCard variant="flat">
              <h3 className="font-semibold text-gray-800 text-lg mb-2">扁平效果</h3>
              <p className="text-gray-600 text-sm">无阴影，使用细边框区分区域。</p>
            </NeuCard>
            <NeuCard variant="pressed">
              <h3 className="font-semibold text-gray-800 text-lg mb-2">凹陷效果</h3>
              <p className="text-gray-600 text-sm">内阴影效果，适合展示内容区域。</p>
            </NeuCard>
          </div>
        </div>
      </NeuSection>

      {/* Form Elements */}
      <NeuSection>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">表单 Form</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">输入框 Input</label>
              <NeuInput placeholder="请输入内容..." />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">错误状态</label>
              <NeuInput placeholder="错误输入" error />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">文本域 Textarea</label>
              <NeuTextarea placeholder="请输入详细内容..." rows={4} />
            </div>
            <NeuButton variant="primary" className="w-full">提交</NeuButton>
          </div>
        </div>
      </NeuSection>

      {/* Controls */}
      <NeuSection>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">选择控件</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <NeuCard>
              <h3 className="font-semibold text-gray-800 mb-4">Checkbox</h3>
              <div className="space-y-3">
                <NeuCheckbox label="选项 A" />
                <NeuCheckbox label="选项 B" defaultChecked />
                <NeuCheckbox label="选项 C" />
              </div>
            </NeuCard>
            <NeuCard>
              <h3 className="font-semibold text-gray-800 mb-4">Radio</h3>
              <div className="space-y-3">
                <NeuRadio name="demo" label="选项一" defaultChecked />
                <NeuRadio name="demo" label="选项二" />
                <NeuRadio name="demo" label="选项三" />
              </div>
            </NeuCard>
            <NeuCard>
              <h3 className="font-semibold text-gray-800 mb-4">Toggle</h3>
              <div className="space-y-3">
                <NeuToggle label="启用通知" />
                <NeuToggle label="深色模式" defaultChecked />
                <NeuToggle label="自动保存" />
              </div>
            </NeuCard>
          </div>
        </div>
      </NeuSection>

      {/* Progress & Slider */}
      <NeuSection>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">进度与滑块</h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm text-gray-600 mb-6">进度条 Progress</p>
              <div className="space-y-6">
                <NeuProgress value={progress} color="primary" showValue />
                <NeuProgress value={80} color="success" />
                <NeuProgress value={45} color="default" />
              </div>
              <div className="flex gap-3 mt-4">
                <NeuButton size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</NeuButton>
                <NeuButton size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</NeuButton>
              </div>
            </div>
            <NeuDivider />
            <div>
              <p className="text-sm text-gray-600 mb-6">滑块 Slider</p>
              <NeuSlider
                value={sliderValue}
                onChange={(e) => setSliderValue(Number((e.target as HTMLInputElement).value))}
                showValue
              />
            </div>
          </div>
        </div>
      </NeuSection>

      {/* Alerts & Badges */}
      <NeuSection>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">提示与徽章</h2>
          <div className="space-y-4 mb-8">
            <NeuAlert title="默认提示">这是一条默认提示信息。</NeuAlert>
            <NeuAlert variant="success" title="成功">操作已成功完成！</NeuAlert>
            <NeuAlert variant="warning" title="警告">请注意潜在的问题。</NeuAlert>
            <NeuAlert variant="error" title="错误">操作失败，请重试。</NeuAlert>
            <NeuAlert variant="info" title="信息">这是一条信息提示。</NeuAlert>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-4">徽章 Badges</p>
            <div className="flex flex-wrap gap-3">
              <NeuBadge>默认</NeuBadge>
              <NeuBadge variant="primary">Primary</NeuBadge>
              <NeuBadge variant="success">Success</NeuBadge>
              <NeuBadge variant="warning">Warning</NeuBadge>
              <NeuBadge variant="error">Error</NeuBadge>
            </div>
          </div>
        </div>
      </NeuSection>

      {/* Avatar */}
      <NeuSection>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">头像 Avatar</h2>
          <div className="flex gap-6 items-end">
            <NeuAvatar size="sm" fallback="A" />
            <NeuAvatar size="md" fallback="B" />
            <NeuAvatar size="lg" fallback="C" />
          </div>
        </div>
      </NeuSection>

      {/* Tabs */}
      <NeuSection>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">标签页 Tabs</h2>
          <NeuTabs
            tabs={[
              { id: "overview", label: "概述", content: <p className="text-gray-600">Neumorphism 通过柔和的阴影创造出界面元素的立体感。</p> },
              { id: "install", label: "安装", content: <p className="text-gray-600 font-mono text-sm">npm install @stylekit/neumorphism</p> },
              { id: "usage", label: "使用", content: <p className="text-gray-600 font-mono text-sm">{`import { NeuButton } from "@stylekit/neumorphism"`}</p> },
            ]}
          />
        </div>
      </NeuSection>

      {/* Skeleton */}
      <NeuSection>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">骨架屏 Skeleton</h2>
          <NeuCard>
            <div className="flex gap-4 mb-4">
              <NeuSkeleton variant="circular" />
              <div className="flex-1 space-y-2">
                <NeuSkeleton variant="text" className="w-1/3" />
                <NeuSkeleton variant="text" className="w-1/4" />
              </div>
            </div>
            <NeuSkeleton variant="rectangular" className="mb-4" />
            <div className="space-y-2">
              <NeuSkeleton variant="text" />
              <NeuSkeleton variant="text" className="w-4/5" />
              <NeuSkeleton variant="text" className="w-3/5" />
            </div>
          </NeuCard>
        </div>
      </NeuSection>

      {/* Rules Summary */}
      <NeuSection>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8 md:mb-12">核心规则</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <NeuCard>
              <h3 className="font-semibold text-lg text-[#6d5dfc] mb-4">必须遵循</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 浅色背景 #e0e5ec</li>
                <li>• 双重阴影 (亮+暗)</li>
                <li>• 圆角 rounded-xl 或 rounded-2xl</li>
                <li>• 按下凹陷效果 inset shadow</li>
                <li>• 同色系元素</li>
                <li>• 响应式阴影大小</li>
              </ul>
            </NeuCard>
            <NeuCard>
              <h3 className="font-semibold text-lg text-[#ff6b6b] mb-4">禁止事项</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 纯黑/纯白背景</li>
                <li>• 硬边缘阴影</li>
                <li>• 高对比度配色</li>
                <li>• 粗边框 border-2+</li>
                <li>• 渐变背景</li>
                <li>• 直角 rounded-none</li>
              </ul>
            </NeuCard>
          </div>
        </div>
      </NeuSection>

      {/* Component List */}
      <NeuSection>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold text-2xl md:text-4xl text-gray-800 mb-8">18 个组件</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              "Button", "Card", "Input", "Textarea",
              "Checkbox", "Radio", "Toggle", "Progress",
              "Slider", "Avatar", "IconButton", "Alert",
              "Badge", "Tabs", "Divider", "Section",
              "Nav", "Skeleton",
            ].map((name) => (
              <NeuBadge key={name} variant="primary">{name}</NeuBadge>
            ))}
          </div>
          <NeuButton
            variant="primary"
            size="lg"
            onClick={() => window.location.href = "/styles/neumorphism"}
          >
            查看完整文档
          </NeuButton>
        </div>
      </NeuSection>

      {/* Footer */}
      <div className="bg-[#e0e5ec] py-8 px-6 shadow-[inset_0_1px_0_#b8bcc2]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">StyleKit · Neumorphism Showcase · 18 Components</p>
          <Link href="/styles/neumorphism" className="text-sm text-gray-600 hover:text-[#6d5dfc] transition-colors">
            查看完整文档 →
          </Link>
        </div>
      </div>
    </div>
  );
}
