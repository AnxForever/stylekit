"use client";

import { useState } from "react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Search,
  Bell,
  Settings,
  Plus,
  Phone,
  Mail,
  Filter,
  Download,
  BarChart3,
  FileText,
  Target,
  Briefcase,
  MessageSquare,
  Database,
  Zap,
  Crown,
  LogOut,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const navMain = [
  { icon: Users, label: "Contacts" },
  { icon: TrendingUp, label: "Analytics" },
  { icon: DollarSign, label: "Sales Pipeline" },
  { icon: Calendar, label: "Calendar" },
  { icon: Target, label: "Campaigns" },
];

const navTools = [
  { icon: FileText, label: "Reports" },
  { icon: Briefcase, label: "Deals" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Database, label: "Data Import" },
  { icon: BarChart3, label: "Forecasting" },
];

const navAdmin = [
  { icon: Settings, label: "Settings" },
  { icon: Zap, label: "Automations" },
];

type CrmPage =
  | "Contacts"
  | "Analytics"
  | "Sales Pipeline"
  | "Calendar"
  | "Campaigns"
  | "Reports"
  | "Deals"
  | "Messages"
  | "Data Import"
  | "Forecasting"
  | "Settings"
  | "Automations";

const crmPageSummary: Record<CrmPage, string> = {
  Contacts: "Manage customer profiles, communication history, and contact value.",
  Analytics: "Track lead flow, conversion trend, and performance by channel.",
  "Sales Pipeline": "Monitor opportunity stages, owner assignment, and expected revenue.",
  Calendar: "Review meetings, follow-ups, and due activity timelines.",
  Campaigns: "Measure campaign delivery and attribution across lifecycle stages.",
  Reports: "Generate executive snapshots and operational drill-down reports.",
  Deals: "Inspect active deals, negotiation status, and close probability.",
  Messages: "Review team and customer communication in one shared workspace.",
  "Data Import": "Import and normalize external contact and deal datasets.",
  Forecasting: "Project upcoming revenue and identify risk gaps early.",
  Settings: "Configure CRM workspace preferences and business rules.",
  Automations: "Manage rule-based workflows, notifications, and task triggers.",
};
const stats = [
  { title: "Total Contacts", value: "2,847", change: "+12%", icon: Users, color: "text-blue-400" },
  { title: "Active Deals", value: "156", change: "+8%", icon: TrendingUp, color: "text-green-400" },
  { title: "Revenue", value: "$89.2K", change: "+23%", icon: DollarSign, color: "text-yellow-400" },
  { title: "Meetings", value: "24", change: "+5%", icon: Calendar, color: "text-purple-400" },
];

const contacts = [
  { name: "Sarah Johnson", phone: "+1 (555) 123-4567", company: "TechCorp Inc.", status: "Active" as const, value: "$12.5K", avatar: "SJ" },
  { name: "Michael Chen", phone: "+1 (555) 987-6543", company: "StartupHub", status: "Prospect" as const, value: "$8.2K", avatar: "MC" },
  { name: "Emily Rodriguez", phone: "+1 (555) 456-7890", company: "Creative Agency", status: "Active" as const, value: "$15.7K", avatar: "ER" },
  { name: "David Kim", phone: "+1 (555) 321-0987", company: "TechSolutions", status: "Inactive" as const, value: "$3.1K", avatar: "DK" },
  { name: "Lisa Thompson", phone: "+1 (555) 654-3210", company: "Design Studio", status: "Active" as const, value: "$9.8K", avatar: "LT" },
];

const quickActions = [
  { icon: Phone, label: "Schedule Call" },
  { icon: Mail, label: "Send Email" },
  { icon: Calendar, label: "Book Meeting" },
  { icon: Plus, label: "Add Note" },
];

const activities = [
  { action: "New contact added", time: "2 min ago", type: "success" },
  { action: "Deal closed", time: "1 hour ago", type: "success" },
  { action: "Meeting scheduled", time: "3 hours ago", type: "info" },
  { action: "Email sent", time: "5 hours ago", type: "default" },
];

const performers = [
  { name: "Alex Smith", deals: 12, avatar: "AS" },
  { name: "Maria Garcia", deals: 9, avatar: "MG" },
  { name: "John Doe", deals: 7, avatar: "JD" },
];

const teams = [
  { name: "Sales Team A", progress: 78, color: "from-blue-400 to-purple-500" },
  { name: "Sales Team B", progress: 62, color: "from-green-400 to-teal-500" },
  { name: "Sales Team C", progress: 54, color: "from-orange-400 to-red-500" },
];

function statusBadgeClass(status: "Active" | "Prospect" | "Inactive") {
  if (status === "Active") return "bg-green-500/20 text-green-400 border border-green-400/30";
  if (status === "Prospect") return "bg-blue-500/20 text-blue-400 border border-blue-400/30";
  return "bg-gray-500/20 text-gray-400 border border-gray-400/30";
}
function GlassCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl ${className}`}>
      {children}
    </div>
  );
}

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2.5 text-base text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 rounded-lg ${
        active ? "bg-white/20 text-white border border-white/30" : ""
      }`}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </button>
  );
}

export default function CrmFrostedGlassPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState<CrmPage>("Contacts");

  return (
    <>
      <TemplateBackButton variant="glass" />
      <div className="h-screen relative overflow-hidden">
        {/* Background gradient instead of external image */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.4),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.3),transparent_50%)]" />
        <div className="bg-black/30 absolute inset-0" />

        <div className="relative z-10 p-6 grid grid-cols-12 gap-6 h-screen">
          {/* Left Sidebar */}
          <GlassCard className="col-span-2 p-6 pb-6 h-fit flex flex-col">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">CRM Pro</h1>
                <p className="text-white/60 text-sm">Customer Management</p>
              </div>

              <div>
                <h4 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-3">Main Menu</h4>
                <nav className="space-y-1">
                  {navMain.map((item) => (
                    <NavButton
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      active={activePage === item.label}
                      onClick={() => setActivePage(item.label as CrmPage)}
                    />
                  ))}
                </nav>
              </div>

              <div>
                <h4 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-3">CRM Tools</h4>
                <nav className="space-y-1">
                  {navTools.map((item) => (
                    <NavButton
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      active={activePage === item.label}
                      onClick={() => setActivePage(item.label as CrmPage)}
                    />
                  ))}
                </nav>
              </div>

              <div>
                <h4 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-3">Administration</h4>
                <nav className="space-y-1">
                  {navAdmin.map((item) => (
                    <NavButton
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      active={activePage === item.label}
                      onClick={() => setActivePage(item.label as CrmPage)}
                    />
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex-shrink-0 space-y-4 pt-4 border-t border-white/10 mt-6">
              <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl p-4">
                <div className="text-center space-y-3">
                  <Crown className="h-8 w-8 text-yellow-400 mx-auto" />
                  <div>
                    <h4 className="text-white font-semibold text-lg">Go Premium</h4>
                    <p className="text-white/70 text-sm">Unlock advanced features</p>
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 px-3 text-sm font-medium bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg transition-all duration-300"
                  >
                    Upgrade Now
                    <ChevronRight className="ml-2 h-3 w-3 inline" />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <NavButton icon={HelpCircle} label="Contact Support" />
                <NavButton icon={LogOut} label="Logout" />
              </div>
            </div>
          </GlassCard>

          {/* Main Content */}
          <div className="col-span-8 space-y-6 h-screen overflow-y-auto scrollbar-none">
            {/* Header */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">{activePage}</h2>
                  <p className="text-white/60">{crmPageSummary[activePage]}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:outline-none transition-colors"
                    />
                  </div>
                  <button type="button" className="p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors">
                    <Bell className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-lg transition-all duration-300"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Contact
                  </button>
                </div>
              </div>
            </GlassCard>
            {activePage === "Contacts" ? (
              <>
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6">
              {stats.map((stat) => (
                <GlassCard key={stat.title} className="p-6 transition-all duration-300 hover:bg-white/15">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Contacts and Sales Target */}
            <div className="grid grid-cols-2 gap-6">
              {/* Recent Contacts */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Recent Contacts</h3>
                  <div className="flex items-center space-x-2">
                    <button type="button" className="flex items-center px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </button>
                    <button type="button" className="flex items-center px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.avatar}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-medium">
                          {contact.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-white text-sm">{contact.name}</p>
                              <p className="text-xs text-white/60">{contact.company} &middot; {contact.phone}</p>
                            </div>
                            <div className="text-right ml-4">
                              <p className="font-bold text-white text-sm">{contact.value}</p>
                              <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${statusBadgeClass(contact.status)}`}>
                                {contact.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
              {/* Sales Target */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Sales Target</h3>
                  <button type="button" className="p-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Monthly Target</span>
                      <span className="text-white font-semibold">$125K</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full" style={{ width: "68%" }} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">$85K achieved</span>
                      <span className="text-white/60">68%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Quarterly Target</span>
                      <span className="text-white font-semibold">$375K</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full" style={{ width: "45%" }} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-400">$168K achieved</span>
                      <span className="text-white/60">45%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Team Performance</h4>
                    <div className="space-y-2">
                      {teams.map((team) => (
                        <div key={team.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">{team.name}</span>
                            <span className="text-white">{team.progress}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className={`bg-gradient-to-r ${team.color} h-2 rounded-full`} style={{ width: `${team.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-white/60 text-sm">Days left in month</p>
                  </div>
                </div>
              </GlassCard>
            </div>
            {/* Premium Banner */}
            <GlassCard className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 border border-white/30 rounded-2xl">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Upgrade to CRM Pro Premium</h3>
                    <p className="text-white/80 text-lg mb-3">Unlock advanced analytics, unlimited contacts, and premium integrations</p>
                    <div className="flex items-center space-x-6 text-sm text-white/70">
                      {["Advanced Reports", "Unlimited Storage", "Priority Support", "API Access"].map((feature, i) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${["bg-green-400", "bg-blue-400", "bg-purple-400", "bg-yellow-400"][i]}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <p className="text-white/60 text-sm">Switch to Annual</p>
                    <p className="text-2xl font-bold text-white">$79/mo &rarr; $63/mo</p>
                    <p className="text-sm font-medium text-amber-300">Save 20%</p>
                  </div>
                  <button
                    type="button"
                    className="px-8 py-3 text-lg font-semibold bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/40 text-white rounded-lg transition-all duration-300"
                  >
                    Upgrade Now
                    <ChevronRight className="ml-2 h-5 w-5 inline" />
                  </button>
                </div>
              </div>
            </GlassCard>
              </>
            ) : (
              <GlassCard className="p-8">
                <h3 className="text-2xl font-semibold text-white">{activePage} Workspace</h3>
                <p className="mt-2 text-white/70">
                  This section is now active. Use the left navigation to switch between CRM modules.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.slice(0, 4).map((stat) => (
                    <div
                      key={stat.title}
                      className="rounded-2xl border border-white/20 bg-white/5 p-4"
                    >
                      <p className="text-xs text-white/60">{stat.title}</p>
                      <p className="mt-1 text-xl font-semibold text-white">{stat.value}</p>
                      <p className={`mt-1 text-sm ${stat.color}`}>{stat.change}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          {/* Right Sidebar */}
          <GlassCard className="col-span-2 p-6 pb-6 h-fit">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-1">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      className="w-full flex items-center px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-300"
                    >
                      <action.icon className="mr-3 h-4 w-4" />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* AI Card */}
              <GlassCard className="p-4">
                <div className="text-center space-y-3">
                  <div className="text-2xl">AI</div>
                  <div>
                    <h4 className="text-white font-semibold">Talk to our new AI</h4>
                    <p className="text-white/70 text-sm">Xperia</p>
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 px-3 text-sm bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/40 text-white rounded-lg transition-all duration-300"
                  >
                    Start Chat
                  </button>
                </div>
              </GlassCard>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "success" ? "bg-green-400" : activity.type === "info" ? "bg-blue-400" : "bg-white/60"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-white">{activity.action}</p>
                        <p className="text-xs text-white/60">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performers */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Top Performers</h3>
                <div className="space-y-3">
                  {performers.map((performer, index) => (
                    <div key={performer.avatar} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                          {performer.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{performer.name}</p>
                          <p className="text-xs text-white/60">{performer.deals} deals</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-white/10 text-white border border-white/20 rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
