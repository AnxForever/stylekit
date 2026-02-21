"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CreditCard,
  Eye,
  EyeOff,
  Globe,
  Key,
  Moon,
  Palette,
  Shield,
  Sun,
  User,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const tabs = [
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Palette, label: "Appearance" },
  { icon: Shield, label: "Security" },
  { icon: CreditCard, label: "Billing" },
];

const INITIAL_PROFILE = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  bio: "Product designer and developer",
  language: "en",
};

const PLAN_OPTIONS = [
  {
    id: "Free",
    price: "$0",
    description: "For individuals and small projects",
    features: ["Up to 3 projects", "1 GB storage", "Community support"],
  },
  {
    id: "Pro",
    price: "$29",
    description: "For professionals and growing teams",
    features: ["Unlimited projects", "50 GB storage", "Priority support", "Advanced analytics"],
  },
  {
    id: "Business",
    price: "$79",
    description: "For teams and organizations",
    features: ["Everything in Pro", "500 GB storage", "Dedicated support", "SSO & audit logs", "Custom integrations"],
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SaveState = "idle" | "loading" | "success" | "error";

export default function SettingsPageTemplate() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false,
  });

  // Profile form state
  const [profileForm, setProfileForm] = useState({ ...INITIAL_PROFILE });
  const [profileErrors, setProfileErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});
  const [profileSaveState, setProfileSaveState] = useState<SaveState>("idle");

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<{
    current?: string;
    newPass?: string;
    confirm?: string;
  }>({});
  const [passwordSaveState, setPasswordSaveState] = useState<SaveState>("idle");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  // Security extras
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Billing state
  const [currentPlan, setCurrentPlan] = useState("Pro");
  const [showChangePlan, setShowChangePlan] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(currentPlan);

  // Derived
  const avatarInitials =
    (profileForm.firstName.charAt(0) || "").toUpperCase() +
    (profileForm.lastName.charAt(0) || "").toUpperCase() || "?";

  // Profile validation
  function validateProfile() {
    const errors: typeof profileErrors = {};
    if (!profileForm.firstName.trim()) errors.firstName = "First name is required.";
    if (!profileForm.lastName.trim()) errors.lastName = "Last name is required.";
    if (!profileForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(profileForm.email)) {
      errors.email = "Enter a valid email address.";
    }
    return errors;
  }

  function handleProfileSave() {
    const errors = validateProfile();
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }
    setProfileErrors({});
    setProfileSaveState("loading");
    setTimeout(() => {
      setProfileSaveState("success");
      setTimeout(() => setProfileSaveState("idle"), 3000);
    }, 1500);
  }

  function handleProfileCancel() {
    setProfileForm({ ...INITIAL_PROFILE });
    setProfileErrors({});
    setProfileSaveState("idle");
  }

  // Password validation
  function validatePassword() {
    const errors: typeof passwordErrors = {};
    if (!passwordForm.current.trim()) errors.current = "Current password is required.";
    if (!passwordForm.newPass) {
      errors.newPass = "New password is required.";
    } else if (passwordForm.newPass.length < 8) {
      errors.newPass = "Password must be at least 8 characters.";
    }
    if (!passwordForm.confirm) {
      errors.confirm = "Please confirm your new password.";
    } else if (passwordForm.confirm !== passwordForm.newPass) {
      errors.confirm = "Passwords do not match.";
    }
    return errors;
  }

  function handlePasswordSave() {
    const errors = validatePassword();
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    setPasswordErrors({});
    setPasswordSaveState("loading");
    setTimeout(() => {
      setPasswordSaveState("success");
      setPasswordForm({ current: "", newPass: "", confirm: "" });
      setTimeout(() => setPasswordSaveState("idle"), 3000);
    }, 1500);
  }

  function handlePlanConfirm() {
    setCurrentPlan(pendingPlan);
    setShowChangePlan(false);
  }

  const planPrice: Record<string, string> = { Free: "$0", Pro: "$29", Business: "$79" };

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
            Back
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

            {/* ── Profile ── */}
            {activeTab === "Profile" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-semibold mb-6">Profile Information</h2>

                {/* Save banner */}
                {profileSaveState === "success" && (
                  <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
                    <span className="font-medium">Changes saved!</span>
                    <span className="text-emerald-600">Your profile has been updated.</span>
                  </div>
                )}
                {profileSaveState === "error" && (
                  <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    Something went wrong. Please try again.
                  </div>
                )}

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 select-none">
                    {avatarInitials}
                  </div>
                  <div>
                    <button className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="settings-first-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      First Name
                    </label>
                    <input
                      id="settings-first-name"
                      type="text"
                      value={profileForm.firstName}
                      onChange={(e) => {
                        setProfileForm({ ...profileForm, firstName: e.target.value });
                        if (profileErrors.firstName) setProfileErrors({ ...profileErrors, firstName: undefined });
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        profileErrors.firstName ? "border-red-400 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {profileErrors.firstName && (
                      <p className="mt-1 text-xs text-red-600">{profileErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="settings-last-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Last Name
                    </label>
                    <input
                      id="settings-last-name"
                      type="text"
                      value={profileForm.lastName}
                      onChange={(e) => {
                        setProfileForm({ ...profileForm, lastName: e.target.value });
                        if (profileErrors.lastName) setProfileErrors({ ...profileErrors, lastName: undefined });
                      }}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                        profileErrors.lastName ? "border-red-400 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {profileErrors.lastName && (
                      <p className="mt-1 text-xs text-red-600">{profileErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="settings-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="settings-email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => {
                      setProfileForm({ ...profileForm, email: e.target.value });
                      if (profileErrors.email) setProfileErrors({ ...profileErrors, email: undefined });
                    }}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                      profileErrors.email ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                  />
                  {profileErrors.email && (
                    <p className="mt-1 text-xs text-red-600">{profileErrors.email}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="settings-bio" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Bio
                  </label>
                  <textarea
                    id="settings-bio"
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="settings-language" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Language
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      id="settings-language"
                      value={profileForm.language}
                      onChange={(e) => setProfileForm({ ...profileForm, language: e.target.value })}
                      className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="en">English</option>
                      <option value="zh">Chinese (Simplified)</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleProfileCancel}
                    className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileSave}
                    disabled={profileSaveState === "loading"}
                    className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-w-[130px] text-center"
                  >
                    {profileSaveState === "loading" ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* ── Notifications ── */}
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

            {/* ── Appearance ── */}
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

            {/* ── Security ── */}
            {activeTab === "Security" && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <h2 className="text-lg font-semibold mb-6">Change Password</h2>

                  {passwordSaveState === "success" && (
                    <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 font-medium">
                      Password updated successfully.
                    </div>
                  )}

                  <div className="space-y-4 max-w-md">
                    {/* Current password */}
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Current Password
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          id="current-password"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordForm.current}
                          onChange={(e) => {
                            setPasswordForm({ ...passwordForm, current: e.target.value });
                            if (passwordErrors.current) setPasswordErrors({ ...passwordErrors, current: undefined });
                          }}
                          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                            passwordErrors.current ? "border-red-400 bg-red-50" : "border-gray-200"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label={showPasswords.current ? "Hide password" : "Show password"}
                        >
                          {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordErrors.current && (
                        <p className="mt-1 text-xs text-red-600">{passwordErrors.current}</p>
                      )}
                    </div>

                    {/* New password */}
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          id="new-password"
                          type={showPasswords.newPass ? "text" : "password"}
                          value={passwordForm.newPass}
                          onChange={(e) => {
                            setPasswordForm({ ...passwordForm, newPass: e.target.value });
                            if (passwordErrors.newPass) setPasswordErrors({ ...passwordErrors, newPass: undefined });
                          }}
                          className={`w-full px-4 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                            passwordErrors.newPass ? "border-red-400 bg-red-50" : "border-gray-200"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, newPass: !showPasswords.newPass })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label={showPasswords.newPass ? "Hide password" : "Show password"}
                        >
                          {showPasswords.newPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordErrors.newPass && (
                        <p className="mt-1 text-xs text-red-600">{passwordErrors.newPass}</p>
                      )}
                      {!passwordErrors.newPass && passwordForm.newPass.length > 0 && passwordForm.newPass.length < 8 && (
                        <p className="mt-1 text-xs text-amber-600">At least 8 characters required ({passwordForm.newPass.length}/8)</p>
                      )}
                    </div>

                    {/* Confirm password */}
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirm-password"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordForm.confirm}
                          onChange={(e) => {
                            setPasswordForm({ ...passwordForm, confirm: e.target.value });
                            if (passwordErrors.confirm) setPasswordErrors({ ...passwordErrors, confirm: undefined });
                          }}
                          className={`w-full px-4 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                            passwordErrors.confirm ? "border-red-400 bg-red-50" : "border-gray-200"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label={showPasswords.confirm ? "Hide password" : "Show password"}
                        >
                          {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordErrors.confirm && (
                        <p className="mt-1 text-xs text-red-600">{passwordErrors.confirm}</p>
                      )}
                      {!passwordErrors.confirm && passwordForm.confirm.length > 0 && passwordForm.newPass === passwordForm.confirm && (
                        <p className="mt-1 text-xs text-emerald-600">Passwords match.</p>
                      )}
                    </div>

                    <button
                      onClick={handlePasswordSave}
                      disabled={passwordSaveState === "loading"}
                      className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-w-[150px]"
                    >
                      {passwordSaveState === "loading" ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>

                {/* 2FA */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <h2 className="text-lg font-semibold mb-2">Two-Factor Authentication</h2>
                  <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                      className={`px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                        twoFAEnabled
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {twoFAEnabled ? "2FA Enabled" : "Enable 2FA"}
                    </button>
                    {twoFAEnabled && (
                      <span className="text-xs text-emerald-600 font-medium">
                        Two-factor authentication is active.
                      </span>
                    )}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 rounded-xl border border-red-100 p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h2>
                  <p className="text-sm text-red-600/70 mb-4">Once you delete your account, there is no going back.</p>

                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Account
                    </button>
                  ) : (
                    <div className="space-y-3 max-w-sm">
                      <p className="text-sm text-red-700 font-medium">
                        Type <span className="font-mono bg-red-100 px-1 rounded">DELETE</span> to confirm account deletion.
                      </p>
                      <input
                        type="text"
                        value={deleteConfirmText}
                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                        placeholder="Type DELETE to confirm"
                        className="w-full px-4 py-2.5 border border-red-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeleteConfirmText("");
                          }}
                          className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          disabled={deleteConfirmText !== "DELETE"}
                          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Confirm Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Billing ── */}
            {activeTab === "Billing" && (
              <div className="space-y-6">
                {/* Current plan */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold">Current Plan</h2>
                      <p className="text-sm text-gray-500 mt-1">You are on the {currentPlan} plan</p>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 rounded-full">
                      {currentPlan}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold">{planPrice[currentPlan]}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <button
                    onClick={() => {
                      setPendingPlan(currentPlan);
                      setShowChangePlan(true);
                    }}
                    className="px-4 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Change Plan
                  </button>
                </div>

                {/* Payment method */}
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

                {/* Billing history */}
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
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {inv.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Change Plan Modal ── */}
      {showChangePlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowChangePlan(false); }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Choose a Plan</h2>
              <button
                onClick={() => setShowChangePlan(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {PLAN_OPTIONS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setPendingPlan(plan.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    pendingPlan === plan.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{plan.id}</span>
                    {currentPlan === plan.id && (
                      <span className="text-xs text-blue-600 font-medium">Current</span>
                    )}
                  </div>
                  <div className="text-xl font-bold mb-1">{plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></div>
                  <p className="text-xs text-gray-500 mb-3">{plan.description}</p>
                  <ul className="space-y-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <span className="text-blue-500 mt-0.5">-</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setShowChangePlan(false)}
                className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePlanConfirm}
                disabled={pendingPlan === currentPlan}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pendingPlan === currentPlan ? "Already on this plan" : `Switch to ${pendingPlan}`}
              </button>
            </div>
          </div>
        </div>
      )}

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
      <TemplateBackButton variant="modern" />
    </div>
  );
}
