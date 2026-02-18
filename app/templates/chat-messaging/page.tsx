"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  CheckCheck,
  ChevronLeft,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  Search,
  Send,
  Smile,
  Video,
} from "lucide-react";

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
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <Plus className="w-5 h-5" />
            </button>
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

        {/* Chat List */}
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

      {/* Back to Templates */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/templates"
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        >
          &larr; Back to Templates
        </Link>
      </div>
    </div>
  );
}
