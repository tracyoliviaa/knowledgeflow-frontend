import type React from "react"
import { useState } from "react"
import { ItemList } from "../components/items/ItemList"
import { ItemForm } from "../components/items/ItemForm"

const Items: React.FC = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">All Items</h1>
          <p className="text-slate-600">Browse and manage all items in your knowledge base.</p>
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
          {showForm ? 'Cancel' : 'New Item'}
        </button>
      </div>

      {/* Item Form (conditionally shown) */}
      {showForm && (
        <div className="mb-8 animate-fadeIn">
          <ItemForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {/* Filters Section */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
          All
        </button>
        <button className="px-4 py-2 bg-white text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition border border-slate-200">
          Articles
        </button>
        <button className="px-4 py-2 bg-white text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition border border-slate-200">
          Videos
        </button>
        <button className="px-4 py-2 bg-white text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition border border-slate-200">
          Notes
        </button>
        <button className="px-4 py-2 bg-white text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition border border-slate-200">
          Emails
        </button>
        <button className="px-4 py-2 bg-white text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition border border-slate-200">
          Podcasts
        </button>
      </div>

      {/* Item List Component */}
      <ItemList />
    </div>
  )
}

export default Items