"use client";

import { Edit2 } from "lucide-react";
import { roles } from "../_data";

export function RolesView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Roles</h1>
          <p className="text-sm text-gray-500 mt-1">
            Define access levels and permissions for your team
          </p>
        </div>
        <button className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          + Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {roles.map((role) => (
          <div
            key={role.name}
            className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${role.color}`}
                >
                  {role.name}
                </span>
                <p className="text-sm text-gray-500 mt-2 leading-snug">
                  {role.description}
                </p>
              </div>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors ml-2">
                <Edit2 className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Permissions
            </div>
            <ul className="space-y-1.5">
              {role.permissions.map((perm) => (
                <li key={perm} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0" />
                  {perm}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-3 border-t border-gray-100 text-xs text-gray-400">
              {role.count} user{role.count !== 1 ? "s" : ""} assigned
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}