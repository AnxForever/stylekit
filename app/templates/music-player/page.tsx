"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Heart,
  Home,
  Library,
  ListMusic,
  Menu,
  Mic2,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Radio,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Speaker,
  Volume2,
  X,
} from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  liked: boolean;
  color: string;
}

const playlist: Track[] = [
  { id: 1, title: "Midnight City", artist: "M83", album: "Hurry Up, We Are Dreaming", duration: "4:03", liked: true, color: "from-indigo-600 to-purple-700" },
  { id: 2, title: "Electric Feel", artist: "MGMT", album: "Oracular Spectacular", duration: "3:49", liked: false, color: "from-green-500 to-teal-600" },
  { id: 3, title: "Intro", artist: "The xx", album: "xx", duration: "2:07", liked: true, color: "from-gray-700 to-gray-900" },
  { id: 4, title: "Tame Impala", artist: "Let It Happen", album: "Currents", duration: "7:46", liked: false, color: "from-pink-500 to-rose-600" },
  { id: 5, title: "Retrograde", artist: "James Blake", album: "Overgrown", duration: "3:42", liked: false, color: "from-blue-600 to-cyan-700" },
  { id: 6, title: "Crystalised", artist: "The xx", album: "xx", duration: "3:22", liked: true, color: "from-gray-600 to-gray-800" },
  { id: 7, title: "Digital Love", artist: "Daft Punk", album: "Discovery", duration: "4:58", liked: false, color: "from-yellow-500 to-orange-600" },
  { id: 8, title: "Eventually", artist: "Tame Impala", album: "Currents", duration: "5:18", liked: false, color: "from-pink-400 to-rose-500" },
  { id: 9, title: "Something About Us", artist: "Daft Punk", album: "Discovery", duration: "3:52", liked: true, color: "from-amber-500 to-orange-600" },
  { id: 10, title: "Youth", artist: "Daughter", album: "If You Leave", duration: "4:24", liked: false, color: "from-slate-600 to-slate-800" },
];

const recentPlaylists = [
  { name: "Chill Vibes", tracks: 42, color: "from-violet-500 to-purple-600" },
  { name: "Focus Mode", tracks: 28, color: "from-blue-500 to-cyan-600" },
  { name: "Late Night", tracks: 35, color: "from-indigo-600 to-violet-700" },
  { name: "Workout Mix", tracks: 55, color: "from-red-500 to-orange-600" },
];

export default function MusicPlayerTemplate() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(playlist);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(35);

  const track = tracks[currentTrack];

  const toggleLike = (id: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, liked: !t.liked } : t))
    );
  };

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setProgress(0);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-72 bg-gray-900 flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between p-4">
                <span className="font-bold text-lg">Library</span>
                <button onClick={() => setSidebarOpen(false)} aria-label="Close">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <SidebarContent recentPlaylists={recentPlaylists} />
            </aside>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-60 xl:w-72 shrink-0 bg-gray-900 flex-col sticky top-0 h-full border-r border-gray-800">
          <div className="p-5">
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              MusicKit
            </span>
          </div>
          <SidebarContent recentPlaylists={recentPlaylists} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-gray-950/80 backdrop-blur-xl px-4 md:px-6 py-3 flex items-center gap-3">
            <button
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search songs, artists, albums..."
                className="w-full pl-9 pr-4 py-2 bg-gray-800 rounded-full text-sm text-white outline-none focus:ring-2 focus:ring-green-500/50 placeholder:text-gray-500 transition-all"
              />
            </div>
          </div>

          {/* Now Playing Hero */}
          <div className={`mx-4 md:mx-6 mt-2 p-6 md:p-8 rounded-2xl bg-gradient-to-br ${track.color} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Now Playing</p>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{track.title}</h1>
              <p className="text-white/70">{track.artist} &middot; {track.album}</p>
            </div>
          </div>

          {/* Playlist */}
          <div className="px-4 md:px-6 mt-6 pb-32">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Queue</h2>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                See All
              </button>
            </div>
            <div className="space-y-1">
              {tracks.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => playTrack(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left group ${
                    i === currentTrack
                      ? "bg-gray-800/80 text-green-400"
                      : "hover:bg-gray-800/50 text-gray-300"
                  }`}
                >
                  <span className="w-6 text-center text-xs text-gray-500 group-hover:hidden">
                    {i + 1}
                  </span>
                  <span className="w-6 text-center hidden group-hover:block">
                    {i === currentTrack && isPlaying ? (
                      <Pause className="w-3.5 h-3.5 mx-auto" />
                    ) : (
                      <Play className="w-3.5 h-3.5 mx-auto" />
                    )}
                  </span>
                  <div className={`w-10 h-10 rounded bg-gradient-to-br ${t.color} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${i === currentTrack ? "text-green-400" : "text-white"}`}>
                      {t.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{t.artist}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(t.id);
                    }}
                    className="p-1 shrink-0"
                  >
                    <Heart
                      className={`w-4 h-4 ${t.liked ? "text-green-400 fill-green-400" : "text-gray-600 hover:text-gray-400"}`}
                    />
                  </button>
                  <span className="text-xs text-gray-500 shrink-0 w-10 text-right">{t.duration}</span>
                  <button className="p-1 text-gray-600 hover:text-gray-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Player Bar */}
      <div className="bg-gray-900 border-t border-gray-800 px-4 py-3 flex items-center gap-4 z-30">
        {/* Track Info */}
        <div className="flex items-center gap-3 w-48 lg:w-64 shrink-0">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${track.color} shrink-0`} />
          <div className="min-w-0 hidden sm:block">
            <p className="text-sm font-medium text-white truncate">{track.title}</p>
            <p className="text-xs text-gray-400 truncate">{track.artist}</p>
          </div>
          <button
            onClick={() => toggleLike(track.id)}
            className="hidden sm:block shrink-0"
          >
            <Heart
              className={`w-4 h-4 ${track.liked ? "text-green-400 fill-green-400" : "text-gray-500"}`}
            />
          </button>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col items-center max-w-xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
                setProgress(0);
              }}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-gray-900" />
              ) : (
                <Play className="w-4 h-4 text-gray-900 ml-0.5" />
              )}
            </button>
            <button
              onClick={() => {
                setCurrentTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
                setProgress(0);
              }}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] text-gray-500 w-8 text-right">1:24</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full group cursor-pointer">
              <div
                className="h-full bg-white rounded-full relative group-hover:bg-green-400 transition-colors"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-[10px] text-gray-500 w-8">{track.duration}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden lg:flex items-center gap-2 w-48 shrink-0 justify-end">
          <button className="text-gray-400 hover:text-white">
            <Mic2 className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <ListMusic className="w-4 h-4" />
          </button>
          <Volume2 className="w-4 h-4 text-gray-400" />
          <div className="w-24 h-1 bg-gray-700 rounded-full group cursor-pointer">
            <div className="h-full bg-gray-400 rounded-full group-hover:bg-green-400 transition-colors" style={{ width: "70%" }} />
          </div>
        </div>
      </div>

      {/* Back to Templates */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          href="/templates"
          className="px-4 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-gray-700 transition-colors border border-gray-700"
        >
          &larr; Back to Templates
        </Link>
      </div>
    </div>
  );
}

function SidebarContent({ recentPlaylists }: { recentPlaylists: { name: string; tracks: number; color: string }[] }) {
  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto">
      <nav className="space-y-1 mb-6">
        {[
          { icon: Home, label: "Home", active: true },
          { icon: Search, label: "Search", active: false },
          { icon: Library, label: "Your Library", active: false },
          { icon: Radio, label: "Radio", active: false },
        ].map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              item.active
                ? "bg-gray-800 text-white font-medium"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Playlists</h3>
        <button className="p-1 text-gray-500 hover:text-white rounded">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {recentPlaylists.map((pl) => (
          <button
            key={pl.name}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors text-left"
          >
            <div className={`w-10 h-10 rounded bg-gradient-to-br ${pl.color} shrink-0`} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">{pl.name}</p>
              <p className="text-xs text-gray-500">{pl.tracks} tracks</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
