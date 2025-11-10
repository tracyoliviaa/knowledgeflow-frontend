import type React from "react"

const Items: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">All Items</h1>
      <p className="text-slate-600 mb-6">Browse and manage all items in your knowledge base.</p>

      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
        <p className="text-slate-500">No items yet. Create your first item to get started.</p>
      </div>
    </div>
  )
}

export default Items
