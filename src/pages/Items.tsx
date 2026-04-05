// Items.tsx → Vollständig (mit Demo-Support)
import type React from "react"
import { useState } from "react"
import { ItemList } from "../components/items/ItemList"
import { ItemForm } from "../components/items/ItemForm"
import { authService } from '../services/authService';  // 🆕

const Items: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all');  // 🆕 Filter State
  const isDemo = authService.isDemoMode();     // 🆕 Demo Check

  return (
    <div className="max-w-7xl mx-auto">
      {/* Demo Banner */}
      {isDemo && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          🎭 **Demo-Modus aktiv** — 6 Beispiel-Items + lokale Speicherung
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Alle Items</h1>
          <p className="text-slate-600">Verwalte deine Wissensbasis</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {showForm ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            )}
          </svg>
          {showForm ? 'Abbrechen' : 'Neues Item'}
        </button>
      </div>

      {/* 🆕 ItemForm */}
      {showForm && (
        <div className="mb-8 animate-fadeIn">
          <ItemForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {/* 🆕 Filter */}
      <div className="mb-6 flex flex-wrap gap-3">
        {['all', 'article', 'video', 'note'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === type
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {type === 'all' ? 'Alle' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* 🆕 ItemList mit Filter */}
      <ItemList filter={filter} />
    </div>
  )
}

export default Items