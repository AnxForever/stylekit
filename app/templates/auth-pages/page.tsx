"use client";

export const dynamic = "force-static";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Check,
  AlertCircle,
  Github,
  Sparkles,
  BarChart3,
  Users,
  Zap,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AuthView = "login" | "register" | "forgot";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface RegForm {
  name: string;
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getPasswordStrength(password: string): "weak" | "fair" | "strong" {
  if (password.length < 8) return "weak";
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  if (hasNumber && hasSpecial) return "strong";
  if (hasNumber || hasSpecial) return "fair";
  return "weak";
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  icon: Icon,
  placeholder,
  rightElement,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  icon: React.ElementType;
  placeholder?: string;
  rightElement?: React.ReactNode;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="w-4 h-4 text-gray-400" />
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full pl-10 pr-${rightElement ? "10" : "4"} py-2.5 rounded-xl border text-sm transition-all duration-200 bg-white outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 ${
            error
              ? "border-red-400 bg-red-50/30 focus:ring-red-400/20 focus:border-red-400"
              : "border-gray-200 hover:border-gray-300"
          }`}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function SocialButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm font-medium text-gray-700"
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function PasswordStrengthBar({ password }: { password: string }) {
  if (!password) return null;
  const strength = getPasswordStrength(password);
  const bars = [
    { active: true, color: strength === "weak" ? "bg-red-400" : strength === "fair" ? "bg-yellow-400" : "bg-emerald-500" },
    { active: strength === "fair" || strength === "strong", color: strength === "fair" ? "bg-yellow-400" : "bg-emerald-500" },
    { active: strength === "strong", color: "bg-emerald-500" },
  ];
  const label = strength === "weak" ? "Weak" : strength === "fair" ? "Fair" : "Strong";
  const labelColor = strength === "weak" ? "text-red-500" : strength === "fair" ? "text-yellow-600" : "text-emerald-600";

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1.5">
        {bars.map((bar, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${bar.active ? bar.color : "bg-gray-200"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${labelColor}`}>Password strength: {label}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Left Panel
// ---------------------------------------------------------------------------

function LeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-between relative overflow-hidden p-12 bg-[#0B3B2D]">
      {/* Night glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(232,196,104,0.12),transparent_55%)]" />

      {/* Ring constellation */}
      <div className="absolute top-16 right-14 w-40 h-40 rounded-full border border-white/10" />
      <div className="absolute top-28 right-28 w-64 h-64 rounded-full border border-white/[0.06]" />
      <div className="absolute top-24 right-24 w-2 h-2 rounded-full bg-[#E8C468]" />
      <div className="absolute top-48 right-12 w-1.5 h-1.5 rounded-full bg-white/40" />
      <div className="absolute top-64 right-40 w-1 h-1 rounded-full bg-white/30" />

      {/* Layered hill silhouettes */}
      <div className="absolute -bottom-28 -left-24 right-[-20%] h-72 rounded-[100%] bg-[#0E4736]" />
      <div className="absolute -bottom-40 left-[15%] right-[-30%] h-72 rounded-[100%] bg-[#124F3C]" />
      <div className="absolute -bottom-52 left-[45%] right-[-40%] h-72 rounded-[100%] bg-[#175A44]" />

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/20 bg-white/10">
            <Sparkles className="w-5 h-5 text-[#E8C468]" />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">Arbor</span>
        </div>
      </div>

      {/* Main copy */}
      <div className="relative z-10 space-y-6">
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Grow ideas into
            <br />
            shipped work.
          </h2>
          <p className="mt-4 text-emerald-100/80 text-base leading-relaxed max-w-sm">
            Arbor helps creative teams manage projects, track progress, and ship
            beautiful work — one calm, focused workspace.
          </p>
        </div>

        {/* Stat / testimonial cards */}
        <div className="space-y-3">
          <div className="bg-white/[0.07] border border-white/10 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-emerald-300/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Loved by 40,000+ creators</p>
              <p className="text-emerald-100/60 text-xs mt-0.5">
                &ldquo;Arbor transformed how our studio collaborates on campaigns.&rdquo;
              </p>
            </div>
          </div>

          <div className="bg-white/[0.07] border border-white/10 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-emerald-300/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Projects ship 2x faster</p>
              <p className="text-emerald-100/60 text-xs mt-0.5">
                Real-time dashboards keep every milestone visible and on track.
              </p>
            </div>
          </div>

          <div className="bg-white/[0.07] border border-white/10 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-[#E8C468]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-[#E8C468]" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Free to start, no credit card</p>
              <p className="text-emerald-100/60 text-xs mt-0.5">
                Upgrade when your team is ready. Cancel any time, no questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="relative z-10">
        <p className="text-emerald-100/40 text-xs">
          &copy; {new Date().getFullYear()} Arbor, Inc. &middot; All rights reserved.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Login View
// ---------------------------------------------------------------------------

function LoginView({ onSwitch }: { onSwitch: (v: AuthView) => void }) {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [showPassword, setShowPassword] = useState(false);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
    setTimeout(() => setState("idle"), 2500);
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Welcome back!</h3>
          <p className="text-gray-500 text-sm mt-1">Redirecting you to your workspace...</p>
        </div>
        <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full animate-[progress_2.5s_linear_forwards]" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Sign in to Arbor</h1>
        <p className="text-gray-500 text-sm">Welcome back &mdash; let&apos;s pick up where you left off.</p>
      </div>

      {/* Social buttons */}
      <div className="flex gap-3">
        <SocialButton icon={GoogleIcon} label="Google" onClick={() => {}} />
        <SocialButton icon={Github} label="GitHub" onClick={() => {}} />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-medium">or continue with email</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <InputField
        id="login-email"
        label="Email address"
        type="email"
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
        error={errors.email}
        icon={Mail}
        placeholder="you@example.com"
        autoComplete="email"
      />

      <InputField
        id="login-password"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={(v) => setForm({ ...form, password: v })}
        error={errors.password}
        icon={Lock}
        placeholder="Your password"
        autoComplete="current-password"
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => setForm({ ...form, remember: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-emerald-700 focus:ring-emerald-600"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <button
          type="button"
          onClick={() => onSwitch("forgot")}
          className="text-sm text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {state === "loading" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Signing in...
          </>
        ) : (
          <>
            Sign in
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => onSwitch("register")}
          className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
        >
          Create one free
        </button>
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Register View
// ---------------------------------------------------------------------------

function RegisterView({ onSwitch }: { onSwitch: (v: AuthView) => void }) {
  const [form, setForm] = useState<RegForm>({ name: "", email: "", password: "", confirm: "", terms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    else if (form.name.trim().length < 2) next.name = "Name must be at least 2 characters.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8) next.password = "Password must be at least 8 characters.";
    if (!form.confirm) next.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password) next.confirm = "Passwords do not match.";
    if (!form.terms) next.terms = "You must agree to the terms to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 1600));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-emerald-700" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Account created!</h3>
          <p className="text-gray-500 text-sm mt-1">
            Check your email to verify your account and get started.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="text-emerald-700 hover:text-emerald-800 text-sm font-medium transition-colors"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="text-gray-500 text-sm">Start your free Arbor workspace today.</p>
      </div>

      <InputField
        id="reg-name"
        label="Full name"
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
        error={errors.name}
        icon={User}
        placeholder="Jane Smith"
        autoComplete="name"
      />

      <InputField
        id="reg-email"
        label="Email address"
        type="email"
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
        error={errors.email}
        icon={Mail}
        placeholder="you@example.com"
        autoComplete="email"
      />

      <div className="space-y-2">
        <InputField
          id="reg-password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
          error={errors.password}
          icon={Lock}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />
        <PasswordStrengthBar password={form.password} />
      </div>

      <InputField
        id="reg-confirm"
        label="Confirm password"
        type={showConfirm ? "text" : "password"}
        value={form.confirm}
        onChange={(v) => setForm({ ...form, confirm: v })}
        error={errors.confirm}
        icon={Lock}
        placeholder="Re-enter your password"
        autoComplete="new-password"
        rightElement={
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />

      <div className="space-y-1">
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(e) => setForm({ ...form, terms: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-700 focus:ring-emerald-600 flex-shrink-0"
          />
          <span className="text-sm text-gray-600">
            I agree to Arbor&apos;s{" "}
            <span className="text-emerald-700 font-medium hover:text-emerald-800 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-emerald-700 font-medium hover:text-emerald-800 cursor-pointer">
              Privacy Policy
            </span>
          </span>
        </label>
        {errors.terms && (
          <p className="flex items-center gap-1.5 text-xs text-red-500 pl-6">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {errors.terms}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {state === "loading" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Creating account...
          </>
        ) : (
          <>
            Create account
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Forgot Password View
// ---------------------------------------------------------------------------

function ForgotView({ onSwitch }: { onSwitch: (v: AuthView) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  function validate(): boolean {
    if (!email.trim()) { setError("Email is required."); return false; }
    if (!isValidEmail(email)) { setError("Enter a valid email address."); return false; }
    setError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-emerald-700" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Reset link sent!</h3>
          <p className="text-gray-500 text-sm mt-1">
            Check your inbox at <span className="font-medium text-gray-700">{email}</span> for the reset link.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="text-emerald-700 hover:text-emerald-800 text-sm font-medium transition-colors"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Reset your password</h1>
        <p className="text-gray-500 text-sm">
          No worries — enter your email and we&apos;ll send a reset link right away.
        </p>
      </div>

      <InputField
        id="forgot-email"
        label="Email address"
        type="email"
        value={email}
        onChange={(v) => { setEmail(v); if (error) setError(""); }}
        error={error}
        icon={Mail}
        placeholder="you@example.com"
        autoComplete="email"
      />

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {state === "loading" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send reset link
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        Remembered it?{" "}
        <button
          type="button"
          onClick={() => onSwitch("login")}
          className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
        >
          Back to sign in
        </button>
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------

export default function AuthPagesTemplate() {
  const [view, setView] = useState<AuthView>("login");

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <LeftPanel />

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-14">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-900 text-lg font-bold tracking-tight">Arbor</span>
          </div>

          {/* View switcher tabs */}
          {view !== "forgot" && (
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8">
              {(["login", "register"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    view === v
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {v === "login" ? "Sign in" : "Register"}
                </button>
              ))}
            </div>
          )}

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-200/60 p-8">
            {view === "login" && <LoginView onSwitch={setView} />}
            {view === "register" && <RegisterView onSwitch={setView} />}
            {view === "forgot" && <ForgotView onSwitch={setView} />}
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            Protected by industry-standard encryption.{" "}
            <span className="text-gray-500">Arbor never sells your data.</span>
          </p>
        </div>
      </div>

      <TemplateBackButton variant="modern" />
    </div>
  );
}
