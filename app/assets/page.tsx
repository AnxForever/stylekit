"use client";

import { useState } from "react";
import { AssetGallery, AssetDownloadDialog } from "@/components/assets";
import { useAssets } from "@/lib/assets/hooks";
import { useI18n } from "@/lib/i18n/context";
import type { AssetMeta } from "@/lib/assets/meta";
import { Check, AlertTriangle, Download, ExternalLink } from "lucide-react";

export default function AssetsPage() {
  const { t } = useI18n();
  const assets = useAssets();
  const [selectedAsset, setSelectedAsset] = useState<AssetMeta | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAssetSelect = (asset: AssetMeta) => {
    setSelectedAsset(asset);
    setIsDialogOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            素材库
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            可爱卡通素材
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            精选由AI工具生成的高质量卡通图案素材。可用于按钮装饰、页面点缀、徽章标记等多种场景。
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <AssetGallery
            assets={assets}
            showSearch
            showFilter
            variant="default"
            onDownload={handleAssetSelect}
          />
        </div>
      </section>

      {/* Generation Tutorial - Professional Workflow */}
      <section className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              AI 驱动工作流
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">从零到数百个图标</h2>
            <p className="text-lg text-muted max-w-3xl">
              本工作流已在多个实战项目中验证，可实现从单体风格探索到数百个图标批量交付的"零风格漂移"控制。
            </p>
          </div>

          <div className="space-y-8">
            {/* Phase 1: Style Anchoring */}
            <div className="border border-border bg-background p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">锚定风格基准</h3>
                  <p className="text-muted mb-6">
                    在进入批量生产前，必须通过单体迭代锁定绝对的风格标准。这是确保后续数百个图标视觉一致性的核心基础。
                  </p>

                  <div className="space-y-6">
                    {/* 1.1 */}
                    <div>
                      <h4 className="font-semibold text-base mb-3">第一步：风格迭代三部曲</h4>
                      <div className="space-y-3 mb-4">
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-1">
                            A
                          </div>
                          <div>
                            <p className="font-medium text-sm">同 Prompt 多抽卡</p>
                            <p className="text-sm text-muted">固定描述词（如 "cute cat icon"），调整 Seed，观察模型的基础表现力</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-1">
                            B
                          </div>
                          <div>
                            <p className="font-medium text-sm">换 Prompt 抽卡</p>
                            <p className="text-sm text-muted">保持 Seed 不变，微调形容词（如 "3d render" vs "flat vector"），对比渲染风格</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-1">
                            C
                          </div>
                          <div>
                            <p className="font-medium text-sm">风格关键词矩阵</p>
                            <p className="text-sm text-muted">测试 "claymorphism"、"pixel art"、"hand-drawn" 等关键词组合</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 1.2 */}
                    <div>
                      <h4 className="font-semibold text-base mb-3">第二步：确立"圣杯"参考图</h4>
                      <p className="text-sm text-muted mb-4">
                        选出最满意的一张结果，将其导出为 <strong>1024×1024 PNG</strong>（透明背景），重命名为 <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs">style_anchor.png</code>。这张图将作为后续所有 AI 生成任务的垫图。
                      </p>
                    </div>

                    {/* 1.3 风格配方表 */}
                    <div>
                      <h4 className="font-semibold text-base mb-3">第三步：建立《风格配方表》</h4>
                      <p className="text-sm text-muted mb-3">
                        记录下生成参考图的所有参数，形成标准文档供团队复现：
                      </p>
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full text-sm border border-border">
                          <thead>
                            <tr className="border-b border-border bg-zinc-100 dark:bg-zinc-800">
                              <th className="px-3 py-2 text-left font-semibold">参数项</th>
                              <th className="px-3 py-2 text-left font-semibold">设定值示例</th>
                              <th className="px-3 py-2 text-left font-semibold">说明</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            <tr>
                              <td className="px-3 py-2">Model</td>
                              <td className="px-3 py-2">Nano Banana v4</td>
                              <td className="px-3 py-2 text-muted text-xs">基础模型版本</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2">Positive Prompt</td>
                              <td className="px-3 py-2 text-xs">cute cream cat, 3d clay render, soft lighting, minimal, pastel colors</td>
                              <td className="px-3 py-2 text-muted text-xs">核心风格词需置顶</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2">Negative Prompt</td>
                              <td className="px-3 py-2 text-xs">low quality, blurry, text, watermark, dark shadows</td>
                              <td className="px-3 py-2 text-muted text-xs">排除干扰项</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2">Steps</td>
                              <td className="px-3 py-2">30</td>
                              <td className="px-3 py-2 text-muted text-xs">采样步数</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2">CFG Scale</td>
                              <td className="px-3 py-2">7.0</td>
                              <td className="px-3 py-2 text-muted text-xs">提示词相关性</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2: Batch Prompt Generation */}
            <div className="border border-border bg-background p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">AI 辅助批量 Prompt 生产</h3>
                  <p className="text-muted mb-6">
                    利用 Claude Code 将自然语言需求转化为机器可读的标准化指令。
                  </p>

                  <div className="space-y-6">
                    {/* 2.1 */}
                    <div>
                      <h4 className="font-semibold text-base mb-3">第一步：梳理需求清单</h4>
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded border border-border">
                        <p className="text-xs font-mono text-muted mb-2">Claude Code 指令：</p>
                        <p className="text-sm text-foreground">
                          "请帮我整理一份功能图标需求清单，包含首页、设置、个人中心、购物车。输出 CSV 格式。"
                        </p>
                      </div>
                    </div>

                    {/* 2.2 */}
                    <div>
                      <h4 className="font-semibold text-base mb-3">第二步：批量生成提示词 CSV</h4>
                      <p className="text-sm text-muted mb-3">上传 <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs">style_anchor.png</code> 并指示 Claude Code：</p>
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded border border-border mb-4">
                        <p className="text-xs font-mono text-muted mb-2">Claude Code 指令：</p>
                        <p className="text-sm text-foreground">
                          "基于清单和参考图风格，生成批量提示词。要求：(1) 主角统一为'cream colored cat'；(2) 场景与清单对应；(3) 风格段落嵌入配方表关键词；(4) 输出 CSV。"
                        </p>
                      </div>
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded border border-border">
                        <p className="text-xs font-mono text-muted mb-2">CSV 输出示例：</p>
                        <pre className="text-xs text-foreground overflow-x-auto">
{`filename,positive_prompt,negative_prompt,seed
icon_home,"cute cream cat sitting in house, 3d clay render, soft lighting...",low quality...,-1
icon_settings,"cute cream cat holding gear, 3d clay render, soft lighting...",low quality...,-1
icon_user,"cute cream cat face close up, 3d clay render, soft lighting...",low quality...,-1`}
                        </pre>
                      </div>
                    </div>

                    {/* 2.3 */}
                    <div>
                      <h4 className="font-semibold text-base mb-3">第三步：批量执行生成</h4>
                      <div className="space-y-2">
                        <div className="flex gap-3">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted">人工抽检 CSV 中 10% 的 Prompt，确认语义准确</p>
                        </div>
                        <div className="flex gap-3">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted">将 CSV 导入 Nano Banana Pro 的 Batch Queue 面板</p>
                        </div>
                        <div className="flex gap-3">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted">设置生成模式为 Grid (4x4) 或 Single，一键启动生成</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3: Auto Slicing & Delivery */}
            <div className="border border-border bg-background p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">AI 自动切图与交付</h3>
                  <p className="text-muted mb-6">
                    AI 生成的通常是包含多个图标的网格图或含留白的大图。使用 Python 脚本实现像素级精度的自动裁剪与格式转换。
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-base mb-3">第一步：让 Claude Code 生成切图脚本</h4>
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded border border-border">
                        <p className="text-xs font-mono text-muted mb-2">Claude Code 指令：</p>
                        <p className="text-sm text-foreground">
                          "这张图里有12个图标，按网格排列。帮我写个 Python 脚本把每个图标单独切出来，保存成独立的背景透明 PNG，按用途命名。还要生成 @2x, @3x 版本。"
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-base mb-3">第二步：质量检测与报告</h4>
                      <p className="text-sm text-muted mb-3">脚本生成的 <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs">slice_report.json</code> 记录关键指标：</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-muted"><strong>关注项：</strong>quality_score &lt; 0.95（需人工修正）</p>
                        </div>
                        <div className="flex gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-muted"><strong>检查项：</strong>trim_box 异常（可能切图漏边）</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-base mb-3">第三步：交付物整理</h4>
                      <p className="text-sm text-muted mb-3">最终交付结构：</p>
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded border border-border text-xs font-mono">
                        <pre className="text-foreground">
{`/delivery
  ├── /ios/          # PDF, PNG @2x, @3x
  ├── /android/      # WebP, Adaptive Icons
  ├── /web/          # SVG (若已转绘), PNG 512px
  ├── style_anchor.png
  ├── recipe.md
  └── slice_report.json`}
                        </pre>
                      </div>
                      <p className="text-sm text-muted mt-3">
                        最后运行 ImageOptim 或 SVGO 进行无损压缩，确保单张素材体积 ≤ 50KB。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4: Quality Assurance */}
            <div className="border border-border bg-background p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">避坑指南与验收标准</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-base mb-4">常见坑点与对策</h4>
                      <div className="space-y-4">
                        <div className="border-l-4 border-red-500 pl-4 py-2">
                          <p className="font-medium text-sm">垫图风格漂移</p>
                          <p className="text-sm text-muted">AI 生成具有随机性，每生成 50 张图，随机抽取 1 张与参考图计算色盘差异 (ΔE)。若 ΔE &gt; 3，需微调 Prompt 权重。</p>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4 py-2">
                          <p className="font-medium text-sm">切图漏边</p>
                          <p className="text-sm text-muted">设置阈值，检测到的透明像素行/列不得 &gt; 2px，否则视为裁剪不干净。</p>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4 py-2">
                          <p className="font-medium text-sm">命名冲突</p>
                          <p className="text-sm text-muted">CSV 中的 filename 必须与代码库资源引用名 100% 匹配。交付前运行 <code className="bg-zinc-100 dark:bg-zinc-800 px-1">lint:icons</code>。</p>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4 py-2">
                          <p className="font-medium text-sm">版权风险</p>
                          <p className="text-sm text-muted">Prompt 中严禁出现特定艺术家姓名。交付前使用反向图片搜索，确保相似度 &lt; 80%。</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-base mb-3">验收清单</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <p className="text-sm text-muted">所有图标视觉重心居中，无明显偏离</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <p className="text-sm text-muted">背景完全透明，无残留噪点</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <p className="text-sm text-muted">文件名符合 <code className="bg-zinc-100 dark:bg-zinc-800 px-1 text-xs">icon_module_name.png</code> 规范</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <p className="text-sm text-muted">压缩后体积达标（≤ 50KB/图）</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked disabled />
                          <p className="text-sm text-muted">风格一致性测试通过（ΔE &lt; 3）</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
            <h4 className="font-semibold text-lg mb-3">核心原则：零风格漂移</h4>
            <p className="text-sm text-muted mb-4">
              本工作流的成功关键在于"一个参考图 + 标准配方表 + AI 批量生成 + 自动化检测"的完整闭环。
            </p>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1.</span>
                <span><strong>锚定风格：</strong>不急着批量生成，先花时间打磨"种子图标"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2.</span>
                <span><strong>标准化：</strong>将参数和提示词文档化，方便团队协作和版本控制</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">3.</span>
                <span><strong>自动化：</strong>用代码替代重复劳动，让 AI 和脚本做机械工作</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">4.</span>
                <span><strong>质控：</strong>每个环节都有检测点，及时发现偏差并纠正</span>
              </li>
            </ul>
          </div>

          {/* Resource Download */}
          <div className="mt-8 p-6 border border-border bg-background rounded">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Download className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">资源下载</h4>
                <p className="text-sm text-muted mb-4">
                  下载完整工程包，包含 Python 切图脚本、CSV 模板、风格配方表 Markdown 模板等工具文件。
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/your-org/ai-icon-workflow-template"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    下载模板仓库
                  </a>
                  <a
                    href="https://github.com/your-org/ai-icon-workflow-template"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    查看 GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guide */}
      <section className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl mb-8">使用指南</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AssetButton */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">按钮组件</h3>
              <p className="text-sm text-muted">
                使用 AssetButton 组件在按钮中集成素材装饰。支持多种位置和大小配置。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`<AssetButton
  asset={asset}
  assetPosition="left"
  variant="primary"
>
  点击我
</AssetButton>`}
              </pre>
            </div>

            {/* AssetBadge */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">徽章组件</h3>
              <p className="text-sm text-muted">
                使用 AssetBadge 组件创建带有素材的徽章。适合标记新品、推荐等。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`<AssetBadge
  asset={asset}
  label="新品"
  variant="success"
/>`}
              </pre>
            </div>

            {/* AssetDecoration */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">装饰组件</h3>
              <p className="text-sm text-muted">
                使用 AssetDecoration 组件在页面中添加装饰元素。支持位置、大小、旋转等配置。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`<AssetDecoration
  asset={asset}
  position="top-right"
  size="lg"
  rotation={-15}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl mb-8">集成示例</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Example 1 */}
            <div className="border border-border p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">样式卡片集成</h3>
              <p className="text-sm text-muted mb-4">
                在样式卡片中添加素材装饰，增强视觉吸引力。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`// 在 StyleCard 中添加
<AssetDecoration
  asset={getRandomAsset()}
  position="top-right"
  size="sm"
  opacity={0.6}
/>`}
              </pre>
            </div>

            {/* Example 2 */}
            <div className="border border-border p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">首页特色展示</h3>
              <p className="text-sm text-muted mb-4">
                在首页展示精选素材，吸引用户注意。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`// 在首页添加
<AssetGallery
  assets={featuredAssets}
  variant="compact"
  showSearch={false}
/>`}
              </pre>
            </div>

            {/* Example 3 */}
            <div className="border border-border p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">导出功能集成</h3>
              <p className="text-sm text-muted mb-4">
                在导出对话框中支持素材选择和打包。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`// 在导出功能中
<AssetPicker
  category="decoration"
  onSelect={handleAssetSelect}
/>`}
              </pre>
            </div>

            {/* Example 4 */}
            <div className="border border-border p-6 rounded">
              <h3 className="text-lg font-semibold mb-4">交互反馈</h3>
              <p className="text-sm text-muted mb-4">
                使用素材增强用户交互反馈体验。
              </p>
              <pre className="bg-background p-3 rounded text-xs overflow-x-auto border border-border">
                {`// 成功提示
<AssetButton
  asset={successAsset}
  variant="primary"
>
  操作成功
</AssetButton>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Import Guide */}
      <section className="border-t border-border bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl mb-8">导入指南</h2>

          <div className="space-y-4">
            <p className="text-sm text-muted">
              在你的组件中导入素材相关的组件和hooks：
            </p>

            <pre className="bg-background p-4 rounded text-sm overflow-x-auto border border-border">
              {`// 导入组件
import {
  AssetCard,
  AssetGallery,
  AssetPicker,
  AssetButton,
  AssetBadge,
  AssetDecoration,
} from "@/components/assets";

// 导入hooks
import {
  useAssets,
  useAssetsByCategory,
  useAssetSearch,
  useAssetFavorites,
} from "@/lib/assets";

// 导入类型
import type { AssetMeta, AssetCategory } from "@/lib/assets";`}
            </pre>
          </div>
        </div>
      </section>

      {/* Best Practices Quick Reference */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl mb-8">最佳实践快速参考</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Workflow Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">工作流时间成本</h3>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-24 text-sm font-mono text-muted">30 min</div>
                  <div>
                    <p className="text-sm font-medium">风格探索</p>
                    <p className="text-xs text-muted">A-B-C 三部曲 + 圣杯参考图</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-sm font-mono text-muted">10 min</div>
                  <div>
                    <p className="text-sm font-medium">提示词生成</p>
                    <p className="text-xs text-muted">12 个标准化提示词</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-sm font-mono text-muted">5 min</div>
                  <div>
                    <p className="text-sm font-medium">批量生成</p>
                    <p className="text-xs text-muted">Gemini 或其他 AI 工具</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-sm font-mono text-muted">1 min</div>
                  <div>
                    <p className="text-sm font-medium">自动化处理</p>
                    <p className="text-xs text-muted">Python 脚本切分</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-sm font-mono text-muted">5 min</div>
                  <div>
                    <p className="text-sm font-medium">质量检测</p>
                    <p className="text-xs text-muted">10% 抽检 + 验收</p>
                  </div>
                </div>
                <div className="border-t pt-3 flex gap-4">
                  <div className="w-24 text-sm font-mono font-bold text-foreground">~50 min</div>
                  <div>
                    <p className="text-sm font-semibold">总耗时（12 个图标）</p>
                    <p className="text-xs text-muted">规模效益：100 个图标 3-4h，1000 个图标 30-40h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">提示词检查清单</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border border-border rounded bg-background">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-sm">指定明确的网格尺寸和单元格大小</p>
                </div>
                <div className="flex items-start gap-3 p-3 border border-border rounded bg-background">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-sm">强调"NO overlapping, NO touching"</p>
                </div>
                <div className="flex items-start gap-3 p-3 border border-border rounded bg-background">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-sm">使用纯色背景（推荐绿幕 #00FF00）</p>
                </div>
                <div className="flex items-start gap-3 p-3 border border-border rounded bg-background">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-sm">明确要求"identical size"和"centered"</p>
                </div>
                <div className="flex items-start gap-3 p-3 border border-border rounded bg-background">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-sm">测试不同 Seed 找到最稳定输出</p>
                </div>
                <div className="flex items-start gap-3 p-3 border border-border rounded bg-background">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-sm">保存《风格配方表》供团队复用</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Guide Download */}
      <section className="border-t border-border bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-xs tracking-widest uppercase text-muted mb-3">完整指南</p>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                《AI 图标批量生成工作流 - 最佳实践》
              </h2>
              <p className="text-lg text-muted mb-6 max-w-2xl">
                54 页完整教程，包含：风格锚定、提示词优化、自动化处理、质控流程、常见问题排查等全套内容。适用于团队协作和规模化生产。
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/docs/AI_ICON_WORKFLOW_GUIDE.md"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download className="w-5 h-5" />
                  下载 Markdown 版本
                </a>
                <a
                  href="/docs/AI_ICON_WORKFLOW_GUIDE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-lg text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  在线查看
                </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg blur opacity-20"></div>
                <div className="relative bg-background p-8 rounded-lg border-2 border-border">
                  <p className="text-4xl font-bold text-foreground">54</p>
                  <p className="text-muted text-sm mt-2">页完整教程</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Dialog */}
      {selectedAsset && (
        <AssetDownloadDialog
          asset={selectedAsset}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </main>
  );
}
