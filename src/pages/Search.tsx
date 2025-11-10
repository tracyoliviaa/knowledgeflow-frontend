
import type React from "react"

const Search: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Search</h1>
      <p className="text-slate-600 mb-6">Find items quickly across your knowledge base.</p>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <input
          type="text"
          placeholder="Search your knowledge base..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}

export default Search
