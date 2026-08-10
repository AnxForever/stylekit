"use client";

import Link from "next/link";
import { useState } from "react";
import { StyleAdvisor } from "./style-advisor";

export function StyleAdvisorStandalone() {
  const [appliedStyle, setAppliedStyle] = useState<string | null>(null);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="font-mono text-sm tracking-[0.16em] hover:opacity-70">STYLEKIT</Link>
          <div className="flex items-center gap-4 text-sm text-muted">
            <Link href="/workspace" className="hover:text-foreground">项目工作区</Link>
            <span aria-hidden="true">/</span>
            <span>AI Style Advisor</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-20 lg:py-20">
        <section className="flex flex-col justify-center" aria-labelledby="standalone-advisor-title">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Visual compiler / 01</p>
          <h1 id="standalone-advisor-title" className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
            先确定视觉语法，<span className="text-muted">再开始写代码。</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
            用自然语言描述你的产品，AI 会从 StyleKit 的已验证风格中做出选择，并解释为什么。最终代码仍由 StyleKit 的设计系统和生成器负责。
          </p>

          <div className="mt-12 grid max-w-xl gap-4 border-y border-border py-5 text-sm sm:grid-cols-3">
            <div><p className="font-mono text-xs text-muted">01</p><p className="mt-2">描述需求</p></div>
            <div><p className="font-mono text-xs text-muted">02</p><p className="mt-2">匹配风格</p></div>
            <div><p className="font-mono text-xs text-muted">03</p><p className="mt-2">回填项目</p></div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted">
            <span className="border border-border px-3 py-2">StyleIntent JSON</span>
            <span className="border border-border px-3 py-2">StylePack</span>
            <span className="border border-border px-3 py-2">Deterministic Generator</span>
          </div>

          {appliedStyle ? (
            <div className="mt-10 max-w-xl border-l-2 border-foreground pl-4" role="status" aria-live="polite">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Selected for project</p>
              <p className="mt-2 text-sm">已选择 <strong>{appliedStyle}</strong>。进入项目工作区后保存版本即可生成工程。</p>
              <Link href="/workspace" className="mt-3 inline-block text-sm underline underline-offset-4">进入项目工作区 →</Link>
            </div>
          ) : null}
        </section>

        <div className="lg:pt-8">
          <StyleAdvisor
            initialRequest="B2B 风控数据后台，强调清晰层级，需要加载、空数据、错误和成功状态。"
            onApplyStyle={setAppliedStyle}
          />
        </div>
      </div>
    </main>
  );
}
