"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  Lock,
  Play,
  Star,
  Trophy,
  Users,
} from "lucide-react";

const courses = [
  {
    title: "Advanced TypeScript Patterns",
    instructor: "Sarah Chen",
    progress: 68,
    lessons: 24,
    completed: 16,
    duration: "12h 30m",
    rating: 4.9,
    students: 3420,
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    category: "Programming",
  },
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Marcus Rivera",
    progress: 45,
    lessons: 18,
    completed: 8,
    duration: "8h 15m",
    rating: 4.7,
    students: 5180,
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    category: "Design",
  },
  {
    title: "Machine Learning with Python",
    instructor: "Dr. Yuki Tanaka",
    progress: 22,
    lessons: 32,
    completed: 7,
    duration: "20h 45m",
    rating: 4.8,
    students: 8920,
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
    category: "Data Science",
  },
  {
    title: "Product Management Essentials",
    instructor: "Alex Thompson",
    progress: 90,
    lessons: 15,
    completed: 13,
    duration: "6h 20m",
    rating: 4.6,
    students: 2150,
    gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
    category: "Business",
  },
];

const currentLessons = [
  { title: "Generic Constraints", duration: "18 min", completed: true, current: false },
  { title: "Conditional Types", duration: "22 min", completed: true, current: false },
  { title: "Template Literal Types", duration: "15 min", completed: true, current: false },
  { title: "Mapped Types Deep Dive", duration: "25 min", completed: false, current: true },
  { title: "Discriminated Unions", duration: "20 min", completed: false, current: false },
  { title: "Type Guards & Narrowing", duration: "17 min", completed: false, current: false },
  { title: "Recursive Types", duration: "30 min", completed: false, current: false },
  { title: "Module Augmentation", duration: "12 min", completed: false, current: false },
];

const notes = [
  { text: "Generic constraints limit the types that can be used as type arguments. Use 'extends' keyword.", timestamp: "Lesson 1, 03:45" },
  { text: "Conditional types follow the pattern: T extends U ? X : Y. They are distributive over unions.", timestamp: "Lesson 2, 08:12" },
  { text: "Template literal types can construct new string types. Combine with mapped types for powerful patterns.", timestamp: "Lesson 3, 05:30" },
];

const badges = [
  { name: "Quick Learner", description: "Complete 5 lessons in one day", icon: Trophy, earned: true },
  { name: "Consistent", description: "7-day learning streak", icon: Star, earned: true },
  { name: "Scholar", description: "Complete a full course", icon: GraduationCap, earned: false },
  { name: "Note Taker", description: "Write 20 notes", icon: FileText, earned: false },
];

export default function LearningCourseTemplate() {
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [activeView, setActiveView] = useState<"courses" | "player">("courses");
  const [noteText, setNoteText] = useState("");
  const [userNotes, setUserNotes] = useState(notes);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1, 2]);

  const course = courses[selectedCourse];

  const toggleLesson = (index: number) => {
    setCompletedLessons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    setUserNotes((prev) => [
      { text: noteText, timestamp: `Lesson ${completedLessons.length + 1}, now` },
      ...prev,
    ]);
    setNoteText("");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">LearnHub</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView("courses")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === "courses" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveView("player")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === "player" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Current Lesson
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="font-medium">Level 5</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 text-sm font-bold">J</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Courses View */}
        {activeView === "courses" && (
          <>
            {/* Course Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {courses.map((c, i) => (
                <div
                  key={c.title}
                  onClick={() => {
                    setSelectedCourse(i);
                    setActiveView("player");
                  }}
                  className={`bg-white rounded-xl border overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    selectedCourse === i ? "border-indigo-300 shadow-md" : "border-gray-100"
                  }`}
                >
                  <div className={`h-32 ${c.gradient} flex items-center justify-center relative`}>
                    <Play className="w-10 h-10 text-white/20" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-white text-xs font-medium">
                      {c.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{c.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">{c.instructor}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {c.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {c.students.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-indigo-600">{c.progress}%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      {c.completed}/{c.lessons} lessons
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((b) => (
                  <div
                    key={b.name}
                    className={`p-4 rounded-xl border text-center ${
                      b.earned ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-100 opacity-60"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      b.earned ? "bg-amber-100" : "bg-gray-100"
                    }`}>
                      <b.icon className={`w-6 h-6 ${b.earned ? "text-amber-600" : "text-gray-400"}`} />
                    </div>
                    <p className="text-sm font-semibold">{b.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{b.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Player View */}
        {activeView === "player" && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main: Video + Notes */}
            <main className="flex-1 min-w-0">
              {/* Video Player Placeholder */}
              <div className={`aspect-video rounded-xl ${course.gradient} flex items-center justify-center mb-6 relative`}>
                <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                  <h2 className="text-white font-bold text-lg">{course.title}</h2>
                  <p className="text-white/70 text-sm">{course.instructor}</p>
                </div>
              </div>

              {/* Lesson Info */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
                <h3 className="font-bold text-xl mb-2">
                  Lesson {completedLessons.length + 1}: {currentLessons[3].title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentLessons[3].duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {course.rating}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  In this lesson, we explore mapped types in depth. You will learn how to transform existing types
                  by iterating over their properties, creating powerful type utilities that reduce duplication
                  and improve type safety across your codebase.
                </p>
              </div>

              {/* Notes Section */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  My Notes
                </h3>
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNote()}
                    placeholder="Add a note..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-200 border border-gray-200"
                  />
                  <button
                    onClick={addNote}
                    className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
                <div className="space-y-3">
                  {userNotes.map((n, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.timestamp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </main>

            {/* Sidebar: Lessons */}
            <aside className="lg:w-80 shrink-0">
              <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Lessons</h3>
                  <span className="text-xs text-gray-500">
                    {completedLessons.length}/{currentLessons.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {currentLessons.map((lesson, i) => {
                    const done = completedLessons.includes(i);
                    const isCurrent = lesson.current;
                    return (
                      <button
                        key={i}
                        onClick={() => toggleLesson(i)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                          isCurrent
                            ? "bg-indigo-50 border border-indigo-200"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          done
                            ? "bg-emerald-500 text-white"
                            : isCurrent
                              ? "bg-indigo-500 text-white"
                              : "bg-gray-100 text-gray-400"
                        }`}>
                          {done ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : isCurrent ? (
                            <Play className="w-3 h-3 ml-0.5" />
                          ) : (
                            <Lock className="w-3 h-3" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm truncate ${done ? "text-gray-400 line-through" : "font-medium"}`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-400">{lesson.duration}</p>
                        </div>
                        {isCurrent && (
                          <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Progress */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Course Progress</span>
                    <span className="text-sm font-bold text-indigo-600">
                      {Math.round((completedLessons.length / currentLessons.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${(completedLessons.length / currentLessons.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Certificate */}
                {completedLessons.length === currentLessons.length && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
                    <GraduationCap className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-amber-800">Course Complete!</p>
                    <p className="text-xs text-amber-600 mt-1">Certificate unlocked</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-4 md:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Copyright 2025 LearnHub. Part of{" "}
            <Link href="/templates" className="text-gray-600 hover:text-black transition-colors">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">About</a>
            <a href="#" className="hover:text-gray-600">Help</a>
            <a href="#" className="hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>

      {/* Back to Templates */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/templates"
          className="px-4 py-2.5 bg-black text-white text-sm font-medium rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        >
          Back to Templates
        </Link>
      </div>
    </div>
  );
}
