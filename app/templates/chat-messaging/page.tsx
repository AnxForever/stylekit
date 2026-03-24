"use client";

export const dynamic = "force-static";

import { useState, useRef, useEffect } from "react";
import {
  Check,
  CheckCheck,
  ChevronLeft,
  Mic,
  Moon,
  MoreVertical,
  Paperclip,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Plus,
  Search,
  Send,
  Settings,
  Smile,
  UserPlus,
  Users,
  Video,
  Volume2,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
  read: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

type SidebarTab = "chats" | "contacts" | "calls";

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
}

interface CallRecord {
  id: number;
  name: string;
  avatar: string;
  type: "incoming" | "outgoing" | "missed";
  duration: string;
  time: string;
  isVideo: boolean;
}

const contacts: Contact[] = [
  { id: 1, name: "Sarah Chen", avatar: "SC", status: "Building something cool", online: true },
  { id: 2, name: "Alex Rivera", avatar: "AR", status: "In a meeting", online: false },
  { id: 3, name: "Mika Tanaka", avatar: "MT", status: "Available", online: true },
  { id: 4, name: "David Park", avatar: "DP", status: "On vacation", online: false },
  { id: 5, name: "Emma Wilson", avatar: "EW", status: "Coding...", online: true },
  { id: 6, name: "James Lee", avatar: "JL", status: "Away", online: false },
  { id: 7, name: "Nina Patel", avatar: "NP", status: "Available", online: true },
];

const callHistory: CallRecord[] = [
  { id: 1, name: "Sarah Chen", avatar: "SC", type: "outgoing", duration: "12:34", time: "Today, 2:30 PM", isVideo: false },
  { id: 2, name: "Design Team", avatar: "DT", type: "incoming", duration: "45:12", time: "Today, 11:00 AM", isVideo: true },
  { id: 3, name: "Alex Rivera", avatar: "AR", type: "missed", duration: "", time: "Yesterday, 4:15 PM", isVideo: false },
  { id: 4, name: "Mika Tanaka", avatar: "MT", type: "incoming", duration: "8:22", time: "Yesterday, 1:00 PM", isVideo: true },
  { id: 5, name: "David Park", avatar: "DP", type: "outgoing", duration: "3:45", time: "Mon, 10:30 AM", isVideo: false },
  { id: 6, name: "Emma Wilson", avatar: "EW", type: "missed", duration: "", time: "Mon, 9:00 AM", isVideo: true },
];

const chats: Chat[] = [
  {
    id: 1,
    name: "Design Team",
    avatar: "DT",
    lastMessage: "New mockups are ready for review",
    time: "2m",
    unread: 3,
    online: true,
    messages: [
      { id: 1, sender: "them", text: "Hey team, I just finished the new landing page mockups", time: "10:30 AM", read: true },
      { id: 2, sender: "them", text: "They incorporate all the feedback from last week", time: "10:31 AM", read: true },
      { id: 3, sender: "me", text: "Awesome! Let me take a look at them", time: "10:35 AM", read: true },
      { id: 4, sender: "them", text: "Also updated the component library docs", time: "10:40 AM", read: true },
      { id: 5, sender: "me", text: "The hero section looks great. Can we explore a darker variant too?", time: "10:45 AM", read: true },
      { id: 6, sender: "them", text: "Sure thing, I will put together a dark version by EOD", time: "10:47 AM", read: true },
      { id: 7, sender: "them", text: "New mockups are ready for review", time: "11:02 AM", read: false },
    ],
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "SC",
    lastMessage: "Thanks for the code review!",
    time: "15m",
    unread: 0,
    online: true,
    messages: [
      { id: 1, sender: "them", text: "Hi! Could you review my PR when you get a chance?", time: "9:00 AM", read: true },
      { id: 2, sender: "me", text: "Sure, I will look at it after standup", time: "9:15 AM", read: true },
      { id: 3, sender: "me", text: "Left some comments on the auth module. Looks solid overall", time: "11:30 AM", read: true },
      { id: 4, sender: "them", text: "Thanks for the code review!", time: "11:45 AM", read: true },
    ],
  },
  {
    id: 3,
    name: "Alex Rivera",
    avatar: "AR",
    lastMessage: "Let me check the deployment logs",
    time: "1h",
    unread: 1,
    online: false,
    messages: [
      { id: 1, sender: "me", text: "Hey, the staging env seems to be down", time: "8:00 AM", read: true },
      { id: 2, sender: "them", text: "Let me check the deployment logs", time: "8:30 AM", read: false },
    ],
  },
  {
    id: 4,
    name: "Product Team",
    avatar: "PT",
    lastMessage: "Sprint planning at 2pm",
    time: "3h",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "them", text: "Sprint planning at 2pm", time: "7:00 AM", read: true },
    ],
  },
  {
    id: 5,
    name: "Mika Tanaka",
    avatar: "MT",
    lastMessage: "The API integration is complete",
    time: "5h",
    unread: 0,
    online: true,
    messages: [
      { id: 1, sender: "them", text: "The API integration is complete", time: "6:00 AM", read: true },
    ],
  },
  {
    id: 6,
    name: "David Park",
    avatar: "DP",
    lastMessage: "See you at the demo!",
    time: "1d",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "them", text: "See you at the demo!", time: "Yesterday", read: true },
    ],
  },
];

export default function ChatMessagingTemplate() {
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [chatData, setChatData] = useState<Chat[]>(chats);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("chats");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chatData.find((c) => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages.length]);

  const sendMessage = () => {
    if (!inputValue.trim() || !activeChat) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "me",
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setChatData((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, time: "now" }
          : c
      )
    );
    setInputValue("");
  };

  const filteredChats = chatData.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Chat List Sidebar */}
      <aside
        className={`${
          showSidebar ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 shrink-0 absolute md:relative z-20 h-full`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
        </div>

        {/* Sidebar Tabs */}
        <div className="flex border-b border-gray-100">
          {([
            { key: "chats" as SidebarTab, label: "Chats", count: chatData.reduce((s, c) => s + c.unread, 0) },
            { key: "contacts" as SidebarTab, label: "Contacts", count: 0 },
            { key: "calls" as SidebarTab, label: "Calls", count: 0 },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSidebarTab(tab.key)}
              className={`flex-1 py-2.5 text-xs font-medium text-center transition-colors relative ${
                sidebarTab === tab.key
                  ? "text-indigo-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-4 h-4 bg-indigo-500 text-white text-[9px] font-bold rounded-full">
                  {tab.count}
                </span>
              )}
              {sidebarTab === tab.key && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-indigo-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Chat List */}
        {sidebarTab === "chats" && (
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setActiveChatId(chat.id);
                setShowSidebar(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                chat.id === activeChatId ? "bg-indigo-50" : ""
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900 truncate">{chat.name}</span>
                  <span className="text-xs text-gray-400 shrink-0">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-sm text-gray-500 truncate">{chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span className="ml-2 w-5 h-5 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        )}

        {/* Contacts List */}
        {sidebarTab === "contacts" && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {contacts.length} Contacts
            </span>
            <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400">
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                  {contact.avatar}
                </div>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900">{contact.name}</p>
                <p className="text-xs text-gray-400 truncate">{contact.status}</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400">
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400">
                  <Video className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Call History */}
        {sidebarTab === "calls" && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent</span>
          </div>
          {callHistory.map((call) => (
            <div
              key={call.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {call.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${call.type === "missed" ? "text-red-500" : "text-gray-900"}`}>
                  {call.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {call.type === "incoming" && <PhoneIncoming className="w-3 h-3 text-green-500" />}
                  {call.type === "outgoing" && <PhoneOutgoing className="w-3 h-3 text-blue-500" />}
                  {call.type === "missed" && <PhoneMissed className="w-3 h-3 text-red-400" />}
                  <span className="text-xs text-gray-400">
                    {call.time}{call.duration ? ` \u00B7 ${call.duration}` : ""}
                  </span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                {call.isVideo ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
        )}
      </aside>

      {/* Chat Area */}
      <main className={`${showSidebar ? "hidden" : "flex"} md:flex flex-col flex-1 min-w-0 bg-white`}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3 bg-white">
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setShowSidebar(true)}
                aria-label="Back to chats"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {activeChat.avatar}
                </div>
                {activeChat.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm">{activeChat.name}</h2>
                <p className="text-xs text-gray-500">
                  {activeChat.online ? "Online" : "Offline"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
              {activeChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] sm:max-w-[60%] px-4 py-2.5 rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-indigo-500 text-white rounded-br-md"
                        : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 ${
                        msg.sender === "me" ? "text-indigo-200" : "text-gray-400"
                      }`}
                    >
                      <span className="text-[10px]">{msg.time}</span>
                      {msg.sender === "me" && (
                        msg.read
                          ? <CheckCheck className="w-3 h-3" />
                          : <Check className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full shrink-0">
                  <Plus className="w-5 h-5" />
                </button>
                <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 flex items-end gap-2">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    rows={1}
                    className="flex-1 bg-transparent outline-none text-sm resize-none max-h-24"
                  />
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>
                {inputValue.trim() ? (
                  <button
                    onClick={sendMessage}
                    className="p-2.5 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full shrink-0">
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation to start messaging
          </div>
        )}
      </main>
      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close settings"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-5 space-y-6">
              {/* Profile */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Profile</h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    U
                  </div>
                  <div>
                    <p className="font-semibold">You</p>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Notifications</h3>
                <div className="space-y-3">
                  {[
                    { icon: Volume2, label: "Message sounds", enabled: true },
                    { icon: Phone, label: "Call notifications", enabled: true },
                    { icon: Moon, label: "Do Not Disturb", enabled: false },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <setting.icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{setting.label}</span>
                      </div>
                      <div className={`w-10 h-6 rounded-full relative transition-colors cursor-pointer ${
                        setting.enabled ? "bg-indigo-500" : "bg-gray-300"
                      }`}>
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                          setting.enabled ? "translate-x-4" : "translate-x-0.5"
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Stats */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Stats</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-indigo-500">{chatData.length}</p>
                    <p className="text-[11px] text-gray-500">Chats</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-indigo-500">
                      {chatData.reduce((sum, c) => sum + c.messages.length, 0)}
                    </p>
                    <p className="text-[11px] text-gray-500">Messages</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-green-500">
                      {chatData.filter((c) => c.online).length}
                    </p>
                    <p className="text-[11px] text-gray-500">Online</p>
                  </div>
                </div>
              </div>

              {/* Theme */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Theme</h3>
                <div className="flex gap-3">
                  {[
                    { name: "Indigo", color: "bg-indigo-500", active: true },
                    { name: "Green", color: "bg-green-500", active: false },
                    { name: "Rose", color: "bg-rose-500", active: false },
                    { name: "Orange", color: "bg-orange-500", active: false },
                  ].map((theme) => (
                    <button
                      key={theme.name}
                      className={`w-10 h-10 rounded-full ${theme.color} ${
                        theme.active ? "ring-2 ring-offset-2 ring-gray-400" : ""
                      }`}
                      aria-label={`${theme.name} theme`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <TemplateBackButton variant="dark" />
    </div>
  );
}
