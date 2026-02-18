"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CreditCard,
  Globe,
  Key,
  Moon,
  Palette,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const tabs = [
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Palette, label: "Appearance" },
  { icon: Shield, label: "Security" },
  { icon: CreditCard, label: "Billing" },
];

export default function SettingsPageTemplate() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/templates/settings-page" className="text-xl font-bold">
            Settings
          </Link>
          <Link
            href="/templates"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-2xl font-bold mb-1">Account Settings</h1>
        <p className="text-sm text-gray-500 mb-8">
          Manage your account preferences and configurations
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tab Navigation */}
          <nav className="md:w-56 shrink-0">
            <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.label
                      ? "bg-white shadow-sm text-gray-900 font-medium"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                  }`}
                >
                  <tab.icon className="w-[18px] h-[18px]" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1">
            {/* Profile */}
            {activeTab === "Profile" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-semibold mb-6">Profile Information</h2>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">
                    JD
                  </div>
                  <div>
                    <button className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="settings-first-name" className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                    <input
                      id="settings-first-name"
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="settings-last-name" className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                    <input
                      id="settings-last-name"
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="settings-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    id="settings-email"
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="settings-bio" className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                  <textarea
                    id="settings-bio"
                    rows={3}
                    defaultValue="Product designer and developer"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="settings-language" className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      id="settings-language"
                      defaultValue="en"
                      className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="en">English</option>
                      <option value="zh">Chinese (Simplified)</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "Notifications" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  {[
                    { key: "email" as const, title: "Email Notifications", desc: "Receive notifications via email" },
                    { key: "push" as const, title: "Push Notifications", desc: "Receive push notifications in browser" },
                    { key: "weekly" as const, title: "Weekly Digest", desc: "Get a weekly summary of activity" },
                    { key: "marketing" as const, title: "Marketing Emails", desc: "Receive product updates and offers" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                        className={`w-11 h-6 rounded-full transition-colors relative ${
                          notifications[item.key] ? "bg-blue-600" : "bg-gray-200"
                        }`}
                        role="switch"
                        aria-checked={notifications[item.key]}
                        aria-label={item.title}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            notifications[item.key] ? "translate-x-[22px]" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === "Appearance" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-semibold mb-6">Theme</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "light" as const, icon: Sun, label: "Light" },
                    { value: "dark" as const, icon: Moon, label: "Dark" },
                    { value: "system" as const, icon: Palette, label: "System" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTheme(opt.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        theme === opt.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <opt.icon className={`w-6 h-6 mx-auto mb-2 ${theme === opt.value ? "text-blue-600" : "text-gray-400"}`} />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "Security" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <h2 className="text-lg font-semibold mb-6">Change Password</h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input id="current-password" type="password" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                      <input id="new-password" type="password" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                      <input id="confirm-password" type="password" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                    </div>
                    <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <h2 className="text-lg font-semibold mb-2">Two-Factor Authentication</h2>
                  <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                  <button className="px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Enable 2FA
                  </button>
                </div>
                <div className="bg-red-50 rounded-xl border border-red-100 p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h2>
                  <p className="text-sm text-red-600/70 mb-4">Once you delete your account, there is no going back.</p>
                  <button className="px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Billing */}
            {activeTab === "Billing" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold">Current Plan</h2>
                      <p className="text-sm text-gray-500 mt-1">You are on the Pro plan</p>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full">Pro</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <button className="px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Change Plan
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">Visa ending in 4242</div>
                      <div className="text-xs text-gray-400">Expires 12/2026</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <h2 className="text-lg font-semibold mb-4">Billing History</h2>
                  <div className="space-y-3">
                    {[
                      { date: "Jan 1, 2025", amount: "$29.00", status: "Paid" },
                      { date: "Dec 1, 2024", amount: "$29.00", status: "Paid" },
                      { date: "Nov 1, 2024", amount: "$29.00", status: "Paid" },
                    ].map((inv) => (
                      <div key={inv.date} className="flex items-center justify-between py-2 text-sm">
                        <span className="text-gray-600">{inv.date}</span>
                        <span className="font-medium">{inv.amount}</span>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{inv.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-4 md:px-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            Copyright 2025. Part of{" "}
            <Link href="/templates" className="text-gray-500 hover:text-blue-600 transition-colors">
              StyleKit Templates
            </Link>
          </p>
        </div>
      </footer>
      <TemplateBackButton />
    </div>
  );
}
