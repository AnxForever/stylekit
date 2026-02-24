"use client";

import { useState } from "react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
import {
  Home,
  BarChart2,
  Building2,
  Folder,
  Wallet,
  Receipt,
  CreditCard,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  Bell,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  SendHorizontal,
  QrCode,
  Plus,
  ArrowRight,
  ShoppingCart,
  PiggyBank,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Timer,
  AlertCircle,
  LogOut,
  MoveUpRight,
  FileText,
} from "lucide-react";

/* ── Sidebar Data ── */
const sidebarSections = [
  {
    title: "Overview",
    items: [
      { icon: Home, label: "Dashboard" },
      { icon: BarChart2, label: "Analytics" },
      { icon: Building2, label: "Organization" },
      { icon: Folder, label: "Projects" },
    ],
  },
  {
    title: "Finance",
    items: [
      { icon: Wallet, label: "Transactions" },
      { icon: Receipt, label: "Invoices" },
      { icon: CreditCard, label: "Payments" },
    ],
  },
  {
    title: "Team",
    items: [
      { icon: Users2, label: "Members" },
      { icon: Shield, label: "Permissions" },
      { icon: MessagesSquare, label: "Chat" },
      { icon: Video, label: "Meetings" },
    ],
  },
];

type KokonutPage =
  | "Dashboard"
  | "Analytics"
  | "Organization"
  | "Projects"
  | "Transactions"
  | "Invoices"
  | "Payments"
  | "Members"
  | "Permissions"
  | "Chat"
  | "Meetings"
  | "Settings"
  | "Help";

const kokonutPageSummary: Record<KokonutPage, string> = {
  Dashboard: "Overview of account balances, recent activity, and upcoming financial milestones.",
  Analytics: "Track trends, category performance, and month-over-month financial movement.",
  Organization: "Manage teams, roles, and workspace-level finance permissions.",
  Projects: "Review budget usage and expense allocation by active projects.",
  Transactions: "Inspect transaction streams, statuses, and reconciliations.",
  Invoices: "Review outgoing invoices, payment status, and due schedules.",
  Payments: "Manage payment methods, payout flows, and transfer history.",
  Members: "View team members, access levels, and finance responsibilities.",
  Permissions: "Control security policy and role-based permission settings.",
  Chat: "Collaborate with team members on approvals and financial decisions.",
  Meetings: "Track upcoming finance reviews and planning sessions.",
  Settings: "Configure workspace preferences, billing settings, and notifications.",
  Help: "Get support resources, troubleshooting steps, and contact channels.",
};

/* ── Accounts (List01) ── */
const accounts = [
  { id: "1", title: "Main Savings", description: "Personal savings", balance: "$8,459.45", type: "savings" as const },
  { id: "2", title: "Checking Account", description: "Daily expenses", balance: "$2,850.00", type: "checking" as const },
  { id: "3", title: "Investment Portfolio", description: "Stock & ETFs", balance: "$15,230.80", type: "investment" as const },
  { id: "4", title: "Credit Card", description: "Pending charges", balance: "$1,200.00", type: "debt" as const },
  { id: "5", title: "Savings Account", description: "Emergency fund", balance: "$3,000.00", type: "savings" as const },
];

/* ── Transactions (List02) ── */
const transactions = [
  { id: "1", title: "Apple Store Purchase", amount: "$999.00", type: "outgoing" as const, icon: ShoppingCart, timestamp: "Today, 2:45 PM", status: "completed" },
  { id: "2", title: "Salary Deposit", amount: "$4,500.00", type: "incoming" as const, icon: Wallet, timestamp: "Today, 9:00 AM", status: "completed" },
  { id: "3", title: "Netflix Subscription", amount: "$15.99", type: "outgoing" as const, icon: CreditCard, timestamp: "Yesterday", status: "pending" },
  { id: "4", title: "Apple Store Purchase", amount: "$999.00", type: "outgoing" as const, icon: ShoppingCart, timestamp: "Today, 2:45 PM", status: "completed" },
  { id: "5", title: "Supabase Subscription", amount: "$15.99", type: "outgoing" as const, icon: CreditCard, timestamp: "Yesterday", status: "pending" },
  { id: "6", title: "Vercel Subscription", amount: "$15.99", type: "outgoing" as const, icon: CreditCard, timestamp: "Yesterday", status: "pending" },
];

/* ── Events (List03) ── */
const events = [
  { id: "1", title: "Emergency Fund", subtitle: "3 months of expenses saved", icon: PiggyBank, date: "Target: Dec 2024", amount: "$15,000", status: "in-progress" as const, progress: 65 },
  { id: "2", title: "Stock Portfolio", subtitle: "Tech sector investment plan", icon: TrendingUp, date: "Target: Jun 2024", amount: "$50,000", status: "pending" as const, progress: 30 },
  { id: "3", title: "Debt Repayment", subtitle: "Student loan payoff plan", icon: CreditCard, date: "Target: Mar 2025", amount: "$25,000", status: "in-progress" as const, progress: 45 },
];

/* ── Profile ── */
const profileMenuItems = [
  { label: "Subscription", value: "Free Trial", icon: CreditCard },
  { label: "Settings", icon: Settings },
  { label: "Terms & Policies", icon: FileText, external: true },
];

const statusConfig = {
  pending: { icon: Timer, class: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
  "in-progress": { icon: AlertCircle, class: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  completed: { icon: CheckCircle2, class: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
};

function accountIconColor(type: string) {
  if (type === "savings") return "bg-emerald-100 dark:bg-emerald-900/30";
  if (type === "checking") return "bg-blue-100 dark:bg-blue-900/30";
  if (type === "investment") return "bg-purple-100 dark:bg-purple-900/30";
  return "bg-red-100 dark:bg-red-900/30";
}

function AccountIcon({ type }: { type: string }) {
  if (type === "savings") return <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
  if (type === "checking") return <QrCode className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
  if (type === "investment") return <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
  return <CreditCard className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />;
}
export default function KokonutuiDashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activePage, setActivePage] = useState<KokonutPage>("Dashboard");

  return (
    <>
      <TemplateBackButton variant="dark" />
      <div className="min-h-screen bg-white dark:bg-[#0F0F12]">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Sidebar */}
        <nav
          className={`fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out lg:translate-x-0 border-r border-gray-200 dark:border-[#1F1F23] ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 text-sm font-bold">K</div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">KokonutUI</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-4">
              <div className="space-y-6">
                {sidebarSections.map((section) => (
                  <div key={section.title}>
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {section.title}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            setActivePage(item.label as KokonutPage);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                            activePage === item.label
                              ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                          }`}
                        >
                          <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("Settings");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activePage === "Settings"
                      ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("Help");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activePage === "Help"
                      ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                  }`}
                >
                  <HelpCircle className="h-4 w-4 mr-3" />
                  Help
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-[65] lg:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}
        {/* Main content area */}
        <div className="flex min-h-screen min-w-0 flex-col lg:ml-64">
          {/* Top Nav */}
          <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
            <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] h-full">
              <div className="font-medium text-sm hidden sm:flex items-center space-x-1">
                <span className="text-gray-700 dark:text-gray-300">kokonutUI</span>
                <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
                <span className="text-gray-900 dark:text-gray-100">{activePage}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
                <button type="button" className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                </button>
                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-700 dark:text-zinc-200 ring-2 ring-gray-200 dark:ring-[#2B2B30]"
                  >
                    EA
                  </button>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 top-10 z-50 w-72 sm:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg overflow-hidden">
                        <div className="px-6 pt-8 pb-6">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative shrink-0">
                              <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xl font-semibold text-zinc-700 dark:text-zinc-200 ring-4 ring-white dark:ring-zinc-900">
                                EA
                              </div>
                              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                            </div>
                            <div className="flex-1">
                              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Eugene An</h2>
                              <p className="text-zinc-600 dark:text-zinc-400">Prompt Engineer</p>
                            </div>
                          </div>
                          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4" />
                          <div className="space-y-1">
                            {profileMenuItems.map((item) => (
                              <button
                                key={item.label}
                                type="button"
                                className="w-full flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <item.icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
                                </div>
                                <div className="flex items-center">
                                  {item.value && <span className="text-sm text-zinc-500 dark:text-zinc-400 mr-2">{item.value}</span>}
                                  {item.external && <MoveUpRight className="w-4 h-4 text-zinc-400" />}
                                </div>
                              </button>
                            ))}
                            <button type="button" className="w-full flex items-center gap-2 p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors">
                              <LogOut className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Logout</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </header>
          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">
            {activePage === "Dashboard" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Accounts (List01) */}
                  <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
                      Accounts
                    </h2>
                    <div className="flex-1 bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-sm backdrop-blur-xl">
                      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Balance</p>
                        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">$26,540.25</h3>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Your Accounts</h4>
                        </div>
                        <div className="space-y-1">
                          {accounts.map((account) => (
                            <div key={account.id} className="group flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200">
                              <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-lg ${accountIconColor(account.type)}`}>
                                  <AccountIcon type={account.type} />
                                </div>
                                <div>
                                  <h5 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{account.title}</h5>
                                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{account.description}</p>
                                </div>
                              </div>
                              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{account.balance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { icon: Plus, label: "Add" },
                            { icon: SendHorizontal, label: "Send" },
                            { icon: ArrowDownLeft, label: "Top-up" },
                            { icon: ArrowRight, label: "More" },
                          ].map((btn) => (
                            <button
                              key={btn.label}
                              type="button"
                              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm transition-all duration-200"
                            >
                              <btn.icon className="w-3.5 h-3.5" />
                              <span>{btn.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transactions (List02) */}
                  <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <CreditCard className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
                      Recent Transactions
                    </h2>
                    <div className="flex-1 bg-white dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-sm backdrop-blur-xl">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Recent Activity
                            <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400 ml-1">(23 transactions)</span>
                          </h4>
                          <span className="text-xs text-zinc-600 dark:text-zinc-400">This Month</span>
                        </div>
                        <div className="space-y-1">
                          {transactions.map((tx) => (
                            <div key={tx.id} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200">
                              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                                <tx.icon className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                              </div>
                              <div className="flex-1 flex items-center justify-between min-w-0">
                                <div className="space-y-0.5">
                                  <h5 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{tx.title}</h5>
                                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{tx.timestamp}</p>
                                </div>
                                <div className="flex items-center gap-1.5 pl-3">
                                  <span className={`text-xs font-medium ${tx.type === "incoming" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                                    {tx.type === "incoming" ? "+" : "-"}{tx.amount}
                                  </span>
                                  {tx.type === "incoming" ? (
                                    <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-50 dark:to-zinc-200 text-zinc-50 dark:text-zinc-900 hover:from-zinc-800 hover:to-zinc-700 dark:hover:from-zinc-200 dark:hover:to-zinc-300 shadow-sm transition-all duration-200"
                        >
                          <span>View All Transactions</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Events (List03) */}
                <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
                    Upcoming Events
                  </h2>
                  <div className="w-full overflow-x-auto scrollbar-none">
                    <div className="flex gap-3 min-w-full p-1">
                      {events.map((item) => {
                        const sc = statusConfig[item.status];
                        const StatusIcon = sc.icon;
                        return (
                          <div
                            key={item.id}
                            className="flex flex-col w-[280px] shrink-0 bg-white dark:bg-zinc-900/70 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm backdrop-blur-xl"
                          >
                            <div className="p-4 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                  <item.icon className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${sc.bg} ${sc.class}`}>
                                  <StatusIcon className="w-3.5 h-3.5" />
                                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </div>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h5>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{item.subtitle}</p>
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
                                  <span className="text-zinc-900 dark:text-zinc-100">{item.progress}%</span>
                                </div>
                                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full" style={{ width: `${item.progress}%` }} />
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.amount}</span>
                                <span className="text-xs text-zinc-600 dark:text-zinc-400">target</span>
                              </div>
                              <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                <span>{item.date}</span>
                              </div>
                            </div>
                            <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800">
                              <button className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors duration-200">
                                View Details
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{activePage}</h2>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {kokonutPageSummary[activePage]}
                  </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {accounts.slice(0, 3).map((account) => (
                    <div
                      key={account.id}
                      className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-4"
                    >
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{account.description}</p>
                      <p className="mt-2 text-base font-medium text-zinc-900 dark:text-zinc-100">{account.title}</p>
                      <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{account.balance}</p>
                    </div>
                  ))}
                </section>

                <section className="rounded-xl border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-zinc-900/70 p-6">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Recent Items</h3>
                  <div className="mt-4 space-y-3">
                    {transactions.slice(0, 4).map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between rounded-lg border border-zinc-100 dark:border-zinc-800 p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{tx.title}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{tx.timestamp}</p>
                        </div>
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
