"use client"

import type React from "react"
import { useAuth } from "../../hooks/useAuth"

export const Header: React.FC = () => {
  const { logout } = useAuth()

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">KnowledgeFlow</h1>
          <p className="text-sm text-slate-500">Manage your knowledge base</p>
        </div>

        <nav className="flex items-center gap-6">
          <a href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 transition">
            Dashboard
          </a>
          <a href="/items" className="text-sm text-slate-600 hover:text-slate-900 transition">
            Items
          </a>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  )
}
