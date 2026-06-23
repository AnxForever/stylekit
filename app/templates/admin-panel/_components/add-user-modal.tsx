"use client";

import { useState } from "react";
import { CheckCircle, X } from "lucide-react";

interface AddUserModalProps {
  onClose: () => void;
}

// Self-contained "Add User" dialog extracted from the main admin-panel
// shell. Owns its own form / errors / success state, validates inline,
// and reports close back to the parent via `onClose`. The parent is
// expected to mount this component conditionally (i.e. only when the
// modal should be open) so the modal unmounts on close, which gives
// the form a clean state on the next open without any reset effect.
export function AddUserModal({ onClose }: AddUserModalProps) {
  const [form, setForm] = useState({ name: "", email: "", role: "Viewer" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const next = { name: "", email: "" };
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    setErrors(next);
    return !next.name && !next.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setTimeout(() => onClose(), 1500);
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">
            Add New User
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {success ? (
          <div className="py-8 flex flex-col items-center gap-3 text-center">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
            <p className="text-sm font-medium text-gray-900">
              User added successfully!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Jane Smith"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors ${
                  errors.name
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-200 focus:border-indigo-400"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="jane@example.com"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors ${
                  errors.email
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-200 focus:border-indigo-400"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors"
              >
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add User
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}