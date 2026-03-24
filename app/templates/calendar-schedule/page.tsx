"use client";

export const dynamic = "force-static";

import { useState, useMemo, useCallback } from "react";
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
const DAYS_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WORK_HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const EVENT_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500",
  "bg-indigo-500", "bg-teal-500", "bg-violet-500", "bg-red-500", "bg-amber-500",
];

type ViewMode = "day" | "week" | "month";

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

interface NewEventFormData {
  title: string;
  day: string;
  time: string;
  duration: string;
  color: string;
  location: string;
}

const INITIAL_EVENTS: CalendarEvent[] = [
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
  { id: 11, title: "Marketing Sync", time: "9:00 AM", duration: "30m", color: "bg-blue-500", location: "Zoom", attendees: 4, day: 16 },
  { id: 12, title: "Investor Update", time: "1:00 PM", duration: "1h", color: "bg-red-500", location: "Board Room", attendees: 6, day: 16 },
  { id: 13, title: "Engineering All-Hands", time: "3:00 PM", duration: "1h", color: "bg-purple-500", location: "Auditorium", attendees: 40, day: 17 },
  { id: 14, title: "Yoga Class", time: "8:00 AM", duration: "1h", color: "bg-green-500", location: "Gym", day: 22 },
  { id: 15, title: "Quarterly Review", time: "11:00 AM", duration: "2h", color: "bg-orange-500", location: "Board Room", attendees: 15, day: 24 },
  { id: 16, title: "Hackathon Kickoff", time: "9:00 AM", duration: "1h", color: "bg-teal-500", location: "Main Hall", attendees: 50, day: 25 },
  { id: 17, title: "Coffee Chat", time: "3:00 PM", duration: "30m", color: "bg-amber-500", location: "Cafe", day: 23 },
];

function buildMiniCalendarDays(): { day: number; current: boolean }[] {
  const year = 2026;
  const month = 1;
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
}

const miniCalendarDays = buildMiniCalendarDays();

function parseTimeToHour(time: string): number {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 9;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return hour + minute / 60;
}

function parseDurationToHours(duration: string): number {
  const match = duration.match(/^([\d.]+)\s*(h|m)$/i);
  if (!match) return 1;
  const value = parseFloat(match[1]);
  return match[2].toLowerCase() === "m" ? value / 60 : value;
}

function formatHour(hour: number): string {
  if (hour === 0 || hour === 24) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

function getWeekDays(selectedDay: number): number[] {
  const date = new Date(2026, 1, selectedDay);
  const dayOfWeek = date.getDay();
  const startDay = selectedDay - dayOfWeek;
  const daysInMonth = new Date(2026, 2, 0).getDate();
  return Array.from({ length: 7 }, (_, i) => {
    const d = startDay + i;
    if (d < 1 || d > daysInMonth) return d;
    return d;
  });
}

/* ------------------------------------------------------------------ */
/* NewEventModal                                                      */
/* ------------------------------------------------------------------ */

function NewEventModal({
  onClose,
  onSave,
  initialDay,
}: {
  onClose: () => void;
  onSave: (data: NewEventFormData) => void;
  initialDay: number;
}) {
  const [form, setForm] = useState<NewEventFormData>({
    title: "", day: String(initialDay), time: "9:00 AM",
    duration: "30m", color: "bg-blue-500", location: "",
  });

  const updateField = <K extends keyof NewEventFormData>(key: K, value: NewEventFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSave(form);
  };

  const timeOptions = useMemo(() => {
    const opts: string[] = [];
    for (let h = 8; h <= 18; h++) {
      const period = h < 12 ? "AM" : "PM";
      const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      opts.push(`${h12}:00 ${period}`, `${h12}:30 ${period}`);
    }
    return opts;
  }, []);

  const durationOptions = ["15m", "30m", "45m", "1h", "1.5h", "2h", "3h"];
  const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" role="presentation" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">New Event</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close modal">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={form.title} onChange={(e) => updateField("title", e.target.value)}
              placeholder="Event title" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date (February 2026)</label>
            <select value={form.day} onChange={(e) => updateField("day", e.target.value)} className={`${inputCls} bg-white`}>
              {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={String(d)}>
                  February {d}, 2026 ({DAYS_FULL[new Date(2026, 1, d).getDay()]})
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <select value={form.time} onChange={(e) => updateField("time", e.target.value)} className={`${inputCls} bg-white`}>
                {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select value={form.duration} onChange={(e) => updateField("duration", e.target.value)} className={`${inputCls} bg-white`}>
                {durationOptions.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" value={form.location} onChange={(e) => updateField("location", e.target.value)}
              placeholder="Room, Zoom link, etc." className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Color</label>
            <div className="flex flex-wrap gap-2">
              {EVENT_COLORS.map((c) => (
                <button key={c} onClick={() => updateField("color", c)} aria-label={`Select color ${c}`}
                  className={`w-7 h-7 rounded-full ${c} transition-all ${form.color === c ? "ring-2 ring-offset-2 ring-blue-500 scale-110" : "hover:scale-105"}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={!form.title.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DayView                                                            */
/* ------------------------------------------------------------------ */

function DayView({ events, selectedDay }: { events: CalendarEvent[]; selectedDay: number }) {
  const todayEvents = events.filter((e) => e.day === selectedDay);
  const upcomingEvents = events
    .filter((e) => e.day > selectedDay)
    .sort((a, b) => a.day - b.day || parseTimeToHour(a.time) - parseTimeToHour(b.time))
    .slice(0, 3);

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto">
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
              <div key={event.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow flex gap-4">
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
                      <Clock className="w-3.5 h-3.5" />{event.time} ({event.duration})
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
                    )}
                    {event.attendees && (
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{event.attendees} attendees</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {upcomingEvents.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Upcoming</h2>
          <div className="space-y-2">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
                <div className={`w-2 h-2 rounded-full ${event.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900 truncate block">{event.title}</span>
                  <span className="text-xs text-gray-500">{MONTHS[1]} {event.day} &middot; {event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WeekView                                                           */
/* ------------------------------------------------------------------ */

function WeekView({
  events, selectedDay, onSelectDay,
}: {
  events: CalendarEvent[]; selectedDay: number; onSelectDay: (day: number) => void;
}) {
  const weekDays = useMemo(() => getWeekDays(selectedDay), [selectedDay]);
  const daysInMonth = 28;

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-w-[640px]">
        {/* Day headers */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="p-2" />
          {weekDays.map((day, i) => {
            const inMonth = day >= 1 && day <= daysInMonth;
            return (
              <button key={i} onClick={() => inMonth && onSelectDay(day)} disabled={!inMonth}
                className={`p-2 text-center border-l border-gray-100 transition-colors ${inMonth ? "hover:bg-blue-50 cursor-pointer" : "opacity-40"}`}>
                <div className="text-xs text-gray-500 font-medium">{DAYS[i]}</div>
                <div className={`text-lg font-semibold mt-0.5 w-8 h-8 mx-auto flex items-center justify-center rounded-full ${day === selectedDay ? "bg-blue-600 text-white" : "text-gray-900"}`}>
                  {inMonth ? day : ""}
                </div>
              </button>
            );
          })}
        </div>

        {/* Time grid */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)]">
          {WORK_HOURS.map((hour) => (
            <div key={hour} className="contents">
              <div className="h-16 flex items-start justify-end pr-2 pt-0.5">
                <span className="text-[11px] text-gray-400 font-medium">{formatHour(hour)}</span>
              </div>
              {weekDays.map((day, dayIdx) => {
                const dayEvents = events.filter((e) => e.day === day && Math.floor(parseTimeToHour(e.time)) === hour);
                return (
                  <div key={dayIdx} className="h-16 border-l border-t border-gray-100 relative">
                    {dayEvents.map((event) => {
                      const startHour = parseTimeToHour(event.time);
                      const durationHours = parseDurationToHours(event.duration);
                      const topOffset = (startHour - hour) * 64;
                      const height = Math.max(durationHours * 64, 24);
                      return (
                        <div key={event.id}
                          className={`absolute left-0.5 right-0.5 ${event.color} text-white rounded-md px-1.5 py-0.5 overflow-hidden z-10 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                          style={{ top: `${topOffset}px`, height: `${height}px`, minHeight: "24px" }}
                          title={`${event.title} - ${event.time} (${event.duration})`}>
                          <div className="text-[11px] font-semibold truncate leading-tight">{event.title}</div>
                          {height >= 40 && <div className="text-[10px] opacity-90 truncate">{event.time}</div>}
                          {height >= 56 && event.location && <div className="text-[10px] opacity-80 truncate">{event.location}</div>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MonthView                                                          */
/* ------------------------------------------------------------------ */

function MonthView({
  events, selectedDay, onSelectDay,
}: {
  events: CalendarEvent[]; selectedDay: number; onSelectDay: (day: number) => void;
}) {
  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();
    for (const event of events) {
      const list = map.get(event.day) ?? [];
      list.push(event);
      map.set(event.day, list);
    }
    return map;
  }, [events]);

  const selectedDayEvents = events
    .filter((e) => e.day === selectedDay)
    .sort((a, b) => parseTimeToHour(a.time) - parseTimeToHour(b.time));

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {DAYS.map((day) => (
            <div key={day} className="py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {miniCalendarDays.map((d, i) => {
            const isCurrent = d.current;
            const isSelected = isCurrent && d.day === selectedDay;
            const dayEvents = isCurrent ? eventsByDay.get(d.day) ?? [] : [];
            const count = dayEvents.length;
            return (
              <button key={i} onClick={() => isCurrent && onSelectDay(d.day)} disabled={!isCurrent}
                className={`min-h-[80px] md:min-h-[100px] p-2 border-t border-r border-gray-100 text-left transition-colors relative ${
                  isSelected ? "bg-blue-50 ring-2 ring-inset ring-blue-500"
                    : isCurrent ? "hover:bg-gray-50 cursor-pointer" : "bg-gray-50/50"
                } ${i % 7 === 6 ? "border-r-0" : ""}`}>
                <span className={`text-sm font-medium inline-flex items-center justify-center w-7 h-7 rounded-full ${
                  isSelected ? "bg-blue-600 text-white" : isCurrent ? "text-gray-900" : "text-gray-300"
                }`}>{d.day}</span>
                {count > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map((evt) => (
                      <div key={evt.id} className={`${evt.color} text-white text-[10px] px-1.5 py-0.5 rounded truncate leading-tight hidden md:block`}>
                        {evt.title}
                      </div>
                    ))}
                    {count > 2 && <div className="text-[10px] text-gray-500 px-1.5 hidden md:block">+{count - 2} more</div>}
                    <div className="flex gap-0.5 md:hidden">
                      {dayEvents.slice(0, 4).map((evt) => (
                        <span key={evt.id} className={`w-1.5 h-1.5 rounded-full ${evt.color}`} />
                      ))}
                      {count > 4 && <span className="text-[9px] text-gray-400 leading-none">+{count - 4}</span>}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {MONTHS[1]} {selectedDay} &mdash; {DAYS_FULL[new Date(2026, 1, selectedDay).getDay()]}
        </h2>
        {selectedDayEvents.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No events on this day</p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedDayEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl border border-gray-200 p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
                <div className={`w-2 h-8 rounded-full ${event.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-900 block truncate">{event.title}</span>
                  <div className="flex flex-wrap gap-x-3 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time} ({event.duration})</span>
                    {event.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SidebarContent                                                     */
/* ------------------------------------------------------------------ */

function SidebarContent({
  selectedDay, setSelectedDay, events,
}: {
  selectedDay: number; setSelectedDay: (d: number) => void; events: CalendarEvent[];
}) {
  const hasEvent = (day: number) => events.some((e) => e.day === day);

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-sm text-gray-900">February 2026</span>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-3.5 h-3.5 text-gray-400" /></button>
            <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-3.5 h-3.5 text-gray-400" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {DAYS.map((d) => (
            <div key={d} className="text-[10px] font-medium text-gray-400 py-1">{d}</div>
          ))}
          {miniCalendarDays.map((d, i) => (
            <button key={i} onClick={() => d.current && setSelectedDay(d.day)} disabled={!d.current}
              className={`text-xs py-1.5 rounded-lg relative transition-colors ${
                d.current && d.day === selectedDay ? "bg-blue-600 text-white font-bold"
                  : d.current && d.day === 18 ? "bg-blue-50 text-blue-600 font-semibold"
                  : d.current ? "text-gray-700 hover:bg-gray-100" : "text-gray-300"
              }`}>
              {d.day}
              {d.current && hasEvent(d.day) && d.day !== selectedDay && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

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

      <nav className="mt-auto space-y-1 pt-4 border-t border-gray-100">
        {[
          { icon: Settings, label: "Settings" },
          { icon: Bell, label: "Notifications" },
        ].map((item) => (
          <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <item.icon className="w-4 h-4" />{item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function CalendarScheduleTemplate() {
  const [selectedDay, setSelectedDay] = useState(18);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [nextId, setNextId] = useState(INITIAL_EVENTS.length + 1);

  const handleSaveEvent = useCallback((data: NewEventFormData) => {
    const newEvent: CalendarEvent = {
      id: nextId,
      title: data.title.trim(),
      time: data.time,
      duration: data.duration,
      color: data.color,
      location: data.location.trim() || undefined,
      day: parseInt(data.day, 10),
    };
    setEvents((prev) => [...prev, newEvent]);
    setNextId((prev) => prev + 1);
    setShowNewEvent(false);
    setSelectedDay(newEvent.day);
  }, [nextId]);

  const handleNavigateDay = (direction: -1 | 1) => {
    const daysInMonth = 28;
    const step = viewMode === "week" ? 7 : 1;
    if (viewMode === "month") return;
    const next = selectedDay + direction * step;
    if (next >= 1 && next <= daysInMonth) setSelectedDay(next);
  };

  const headerTitle = useMemo(() => {
    if (viewMode === "day") return `${MONTHS[1]} ${selectedDay}, 2026`;
    if (viewMode === "week") {
      const wd = getWeekDays(selectedDay).filter((d) => d >= 1 && d <= 28);
      return `${MONTHS[1]} ${wd[0]} - ${wd[wd.length - 1]}, 2026`;
    }
    return `${MONTHS[1]} 2026`;
  }, [viewMode, selectedDay]);

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
            <SidebarContent selectedDay={selectedDay} setSelectedDay={(d) => { setSelectedDay(d); setSidebarOpen(false); }} events={events} />
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
        <SidebarContent selectedDay={selectedDay} setSelectedDay={setSelectedDay} events={events} />
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => handleNavigateDay(-1)} aria-label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 whitespace-nowrap">{headerTitle}</h1>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => handleNavigateDay(1)} aria-label="Next">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1" />
          <button onClick={() => setSelectedDay(18)} className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
            Today
          </button>
          <div className="hidden sm:flex bg-gray-100 rounded-lg p-0.5">
            {(["day", "week", "month"] as const).map((mode) => (
              <button key={mode} onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === mode ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={() => setShowNewEvent(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" /><span className="hidden sm:inline">New Event</span>
          </button>
        </header>

        {viewMode === "day" && <DayView events={events} selectedDay={selectedDay} />}
        {viewMode === "week" && (
          <WeekView events={events} selectedDay={selectedDay} onSelectDay={(d) => { setSelectedDay(d); setViewMode("day"); }} />
        )}
        {viewMode === "month" && <MonthView events={events} selectedDay={selectedDay} onSelectDay={setSelectedDay} />}
      </main>

      {showNewEvent && <NewEventModal onClose={() => setShowNewEvent(false)} onSave={handleSaveEvent} initialDay={selectedDay} />}
      <TemplateBackButton variant="modern" />
    </div>
  );
}
