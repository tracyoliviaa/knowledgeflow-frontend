import type React from "react"

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to KnowledgeFlow</h1>
      <p className="text-slate-600 mb-8">Manage your knowledge base efficiently. Use the navigation to get started.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
          </div>
          <p className="text-slate-600 text-sm">View your knowledge base overview and statistics.</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Items</h2>
          </div>
          <p className="text-slate-600 text-sm">Browse and manage all items in your knowledge base.</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Search</h2>
          </div>
          <p className="text-slate-600 text-sm">Quickly find what you need across your knowledge base.</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
