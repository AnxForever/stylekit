"use client";

import { useState } from "react";
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  MoreHorizontal,
  Plus,
  Settings,
  Users,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  duration: string;
  color: string;
  location?: string;
  attendees?: number;
  day: number;
}

const events: CalendarEvent[] = [
  { id: 1, title: "Team Standup", time: "9:00 AM", duration: "30m", color: "bg-blue-500", location: "Zoom", attendees: 8, day: 18 },
  { id: 2, title: "Design Review", time: "10:30 AM", duration: "1h", color: "bg-purple-500", location: "Room A", attendees: 5, day: 18 },
  { id: 3, title: "Lunch with Sarah", time: "12:00 PM", duration: "1h", color: "bg-green-500", location: "Cafe", day: 18 },
  { id: 4, title: "Sprint Planning", time: "2:00 PM", duration: "1.5h", color: "bg-orange-500", location: "Zoom", attendees: 12, day: 18 },
  { id: 5, title: "1:1 with Manager", time: "4:00 PM", duration: "30m", color: "bg-pink-500", location: "Office", day: 18 },
  { id: 6, title: "Product Sync", time: "10:00 AM", duration: "45m", color: "bg-indigo-500", attendees: 6, day: 19 },
  { id: 7, title: "Code Review Session", time: "2:00 PM", duration: "1h", color: "bg-teal-500", attendees: 4, day: 19 },
  { id: 8, title: "Workshop: React Patterns", time: "11:00 AM", duration: "2h", color: "bg-violet-500", location: "Auditorium", attendees: 25, day: 20 },
  { id: 9, title: "Client Presentation", time: "3:00 PM", duration: "1h", color: "bg-red-500", location: "Board Room", attendees: 8, day: 20 },
  { id: 10, title: "Team Retro", time: "10:00 AM", duration: "1h", color: "bg-amber-500", location: "Zoom", attendees: 10, day: 21 },
];

const miniCalendarDays = (() => {
  const year = 2026;
  const month = 1; // February (0-indexed)
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const days: { day: number; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, current: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, current: true });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, current: false });
  }
  return days;
})();

export default function CalendarScheduleTemplate() {
  const [selectedDay, setSelectedDay] = useState(18);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const todayEvents = events.filter((e) => e.day === selectedDay);
  const upcomingEvents = events.filter((e) => e.day > selectedDay).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" role="presentation" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold">Calendar</span>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <SidebarContent
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 xl:w-80 shrink-0 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">CalendarKit</span>
          </div>
        </div>
        <SidebarContent selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {MONTHS[1]} {selectedDay}, 2026
            </h1>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1" />

          <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
            Today
          </button>

          <div className="hidden sm:flex bg-gray-100 rounded-lg p-0.5">
            <button className="px-3 py-1.5 text-xs font-medium bg-white shadow-sm rounded-md">Day</button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-500 rounded-md hover:text-gray-700">Week</button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-500 rounded-md hover:text-gray-700">Month</button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Event</span>
          </button>
        </header>

        {/* Day View Content */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Today's Schedule */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Schedule for {MONTHS[1]} {selectedDay}
            </h2>
            {todayEvents.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No events scheduled for this day</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow flex gap-4"
                  >
                    <div className={`w-1 rounded-full ${event.color} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <button className="p-1 hover:bg-gray-100 rounded shrink-0">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {event.time} ({event.duration})
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {event.location}
                          </span>
                        )}
                        {event.attendees && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {event.attendees} attendees
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming */}
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Upcoming
              </h2>
              <div className="space-y-2">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-3 hover:shadow-sm transition-shadow"
                  >
                    <div className={`w-2 h-2 rounded-full ${event.color} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-900 truncate block">{event.title}</span>
                      <span className="text-xs text-gray-500">
                        {MONTHS[1]} {event.day} &middot; {event.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <TemplateBackButton variant="modern" />
    </div>
  );
}

function SidebarContent({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: number;
  setSelectedDay: (d: number) => void;
}) {
  const hasEvent = (day: number) =>
    events.some((e) => e.day === day);

  return (
    <div className="flex-1 flex flex-col p-4">
      {/* Mini Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-sm text-gray-900">February 2026</span>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {DAYS.map((d) => (
            <div key={d} className="text-[10px] font-medium text-gray-400 py-1">{d}</div>
          ))}
          {miniCalendarDays.map((d, i) => (
            <button
              key={i}
              onClick={() => d.current && setSelectedDay(d.day)}
              disabled={!d.current}
              className={`text-xs py-1.5 rounded-lg relative transition-colors ${
                d.current && d.day === selectedDay
                  ? "bg-blue-600 text-white font-bold"
                  : d.current && d.day === 18
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : d.current
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-300"
              }`}
            >
              {d.day}
              {d.current && hasEvent(d.day) && d.day !== selectedDay && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Calendars */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">My Calendars</h3>
        <div className="space-y-2">
          {[
            { name: "Personal", color: "bg-blue-500" },
            { name: "Work", color: "bg-purple-500" },
            { name: "Team Events", color: "bg-green-500" },
            { name: "Reminders", color: "bg-orange-500" },
          ].map((cal) => (
            <label key={cal.name} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <span className={`w-3 h-3 rounded ${cal.color}`} />
              <span className="text-gray-700">{cal.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Nav */}
      <nav className="mt-auto space-y-1 pt-4 border-t border-gray-100">
        {[
          { icon: Settings, label: "Settings" },
          { icon: Bell, label: "Notifications" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
