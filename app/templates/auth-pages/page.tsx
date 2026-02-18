"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

type AuthView = "login" | "register" | "forgot";

export default function AuthPagesTemplate() {
  const [view, setView] = useState<AuthView>("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-white text-2xl font-bold">
            AppName
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Build something<br />amazing today
          </h2>
          <p className="text-indigo-200 text-lg max-w-md">
            Join thousands of developers and designers who trust our platform for their next project.
          </p>
          <div className="mt-8 flex items-center gap-6">
            {[
              { value: "50K+", label: "Users" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-indigo-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute bottom-20 right-40 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 -left-10 w-32 h-32 bg-white/5 rounded-full" />
      </div>

      {/* Right Panel - Forms */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Login */}
          {view === "login" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
              <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="login-email"
                      type="email"
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Remember me
                  </label>
                  <button
                    onClick={() => setView("forgot")}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                  Sign in
                </button>
              </div>

              <div className="mt-6 text-center">
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative bg-gray-50 px-4 text-sm text-gray-400">or</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Google
                  </button>
                  <button className="py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    GitHub
                  </button>
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <button onClick={() => setView("register")} className="text-indigo-600 font-medium hover:text-indigo-700">
                  Sign up
                </button>
              </p>
            </div>
          )}

          {/* Register */}
          {view === "register" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create account</h1>
              <p className="text-gray-500 mb-8">Start your free 14-day trial</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="register-email"
                      type="email"
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="register-password"
                      type="password"
                      placeholder="Min. 8 characters"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 mt-0.5" />
                  <span>I agree to the <a href="#" className="text-indigo-600">Terms of Service</a> and <a href="#" className="text-indigo-600">Privacy Policy</a></span>
                </label>

                <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                  Create account
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button onClick={() => setView("login")} className="text-indigo-600 font-medium hover:text-indigo-700">
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* Forgot Password */}
          {view === "forgot" && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset password</h1>
              <p className="text-gray-500 mb-8">
                Enter your email and we will send you a reset link
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="forgot-email"
                      type="email"
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
                <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                  Send reset link
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-gray-500">
                Remember your password?{" "}
                <button onClick={() => setView("login")} className="text-indigo-600 font-medium hover:text-indigo-700">
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* Footer note */}
          <p className="mt-12 text-center text-xs text-gray-400">
            Part of{" "}
            <Link href="/templates" className="text-gray-500 hover:text-indigo-600 transition-colors">
              StyleKit Templates
            </Link>
          </p>
        </div>
      </div>
      <TemplateBackButton variant="modern" />
    </div>
  );
}
