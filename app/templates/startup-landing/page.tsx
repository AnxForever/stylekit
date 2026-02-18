import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Layers,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const features = [
  { icon: Zap, title: "Blazing Fast", desc: "Sub-second load times with edge deployment" },
  { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade security out of the box" },
  { icon: Code2, title: "Developer First", desc: "Clean APIs and extensive documentation" },
  { icon: Layers, title: "Scalable", desc: "From prototype to millions of users" },
  { icon: Sparkles, title: "AI-Powered", desc: "Built-in intelligence for smart workflows" },
  { icon: Rocket, title: "Ship Faster", desc: "Pre-built components for rapid development" },
];

const steps = [
  { num: "01", title: "Sign Up", desc: "Create your free account in 30 seconds" },
  { num: "02", title: "Configure", desc: "Set up your project with our guided wizard" },
  { num: "03", title: "Deploy", desc: "Go live with a single command" },
];

export default function StartupLandingTemplate() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/templates/startup-landing" className="text-xl font-bold">
            <span className="text-violet-400">Flux</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Features</a>
            <a href="#how" className="text-sm text-white/50 hover:text-white transition-colors">How it works</a>
            <a href="#cta" className="text-sm text-white/50 hover:text-white transition-colors">Get Started</a>
            <button className="px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-full hover:bg-violet-700 transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-4 md:px-8 relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/60">Now in Public Beta</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            The platform for
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              next-gen apps
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
            Build, deploy, and scale modern applications with unprecedented speed.
            One platform, infinite possibilities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/25">
              Start Building
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
              View Demo
            </button>
          </div>

          {/* Metrics */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { value: "10K+", label: "Developers" },
              { value: "50ms", label: "Avg Latency" },
              { value: "99.99%", label: "Uptime" },
            ].map((m) => (
              <div key={m.label}>
                <div className="text-2xl md:text-3xl font-bold text-white">{m.value}</div>
                <div className="text-sm text-white/30 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-white/40 max-w-xl mx-auto">Comprehensive tools for modern development</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold">Three steps to launch</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-5xl font-black text-white/5 mb-4">{step.num}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-white/40">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-violet-600/20 to-cyan-500/10 border border-white/10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build the future?</h2>
            <p className="text-white/50 mb-8">Join our beta and get early access to all features.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500"
              />
              <button className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 transition-colors">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/20">
            Copyright 2025 Flux. Part of{" "}
            <Link href="/templates" className="text-white/30 hover:text-violet-400 transition-colors">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-white/20">
            <a href="#" className="hover:text-white/40">Twitter</a>
            <a href="#" className="hover:text-white/40">GitHub</a>
            <a href="#" className="hover:text-white/40">Discord</a>
          </div>
        </div>
      </footer>
      <TemplateBackButton variant="modern" />
    </div>
  );
}
